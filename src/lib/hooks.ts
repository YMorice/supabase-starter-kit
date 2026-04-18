import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ClientSearchResult, Snapshot, Prompt } from "./types";

/* -------- Client search (debounced fuzzy) -------- */
export function useClientSearch(query: string) {
  return useQuery({
    queryKey: ["client-search", query],
    queryFn: async (): Promise<ClientSearchResult[]> => {
      const trimmed = query.trim();
      let req = supabase
        .from("profil_client")
        .select("client_id, prenom, nom, age, csp")
        .limit(8);

      if (trimmed.length > 0) {
        req = req.or(
          `nom.ilike.%${trimmed}%,prenom.ilike.%${trimmed}%`
        );
      }

      const { data, error } = await req;
      if (error) throw error;
      return (data ?? []) as ClientSearchResult[];
    },
    staleTime: 30_000,
  });
}

/* -------- Single client profile -------- */
export function useClientProfile(clientId: string | null) {
  return useQuery({
    queryKey: ["client-profile", clientId],
    enabled: !!clientId,
    queryFn: async (): Promise<ClientSearchResult | null> => {
      if (!clientId) return null;
      const { data, error } = await supabase
        .from("profil_client")
        .select("client_id, prenom, nom, age, csp")
        .eq("client_id", clientId)
        .maybeSingle();
      if (error) throw error;
      return data as ClientSearchResult | null;
    },
  });
}

/* -------- Snapshots for a client (with realtime) -------- */
export function useClientSnapshots(clientId: string | null) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["snapshots", clientId],
    enabled: !!clientId,
    queryFn: async (): Promise<Snapshot[]> => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("client_snapshots")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Snapshot[];
    },
  });

  useEffect(() => {
    if (!clientId) return;
    const channel = supabase
      .channel(`snapshots-${clientId}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "client_snapshots", filter: `client_id=eq.${clientId}` },
        () => qc.invalidateQueries({ queryKey: ["snapshots", clientId] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId, qc]);

  return query;
}

/* -------- Prompts for a client (with realtime) -------- */
export function useClientPrompts(clientId: string | null) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["prompts", clientId],
    enabled: !!clientId,
    queryFn: async (): Promise<Prompt[]> => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as Prompt[];
    },
  });

  useEffect(() => {
    if (!clientId) return;
    const channel = supabase
      .channel(`prompts-${clientId}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prompts", filter: `client_id=eq.${clientId}` },
        () => qc.invalidateQueries({ queryKey: ["prompts", clientId] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId, qc]);

  return query;
}

/* -------- Restore (duplicate) a snapshot as the latest version -------- */
export async function restoreSnapshot(clientId: string, snapshotId: string) {
  const { data: src, error: fetchErr } = await supabase
    .from("client_snapshots")
    .select("payload, message")
    .eq("id", snapshotId)
    .single();
  if (fetchErr) throw fetchErr;

  const { data, error } = await supabase
    .from("client_snapshots")
    .insert({
      client_id: clientId,
      payload: src.payload ?? {},
      message: src.message ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* -------- Submit prompt -------- */
export async function submitPrompt(clientId: string, content: string) {
  const { data, error } = await supabase
    .from("prompts")
    .insert({ client_id: clientId, content, status: "pending" })
    .select()
    .single();
  if (error) throw error;

  // Optional n8n webhook
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt_id: data.id,
        client_id: clientId,
        content,
      }),
    }).catch((e) => console.warn("n8n webhook failed", e));
  }

  return data as Prompt;
}

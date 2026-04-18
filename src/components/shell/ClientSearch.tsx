import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Search } from "lucide-react";
import { useClientSearch } from "@/lib/hooks";
import { useClientStore } from "@/lib/store";
import type { ClientSearchResult } from "@/lib/types";

interface Props {
  variant: "hero" | "header";
}

function fullName(c: ClientSearchResult) {
  return `${c.prenom ?? ""} ${c.nom ?? ""}`.trim() || c.client_id;
}

export default function ClientSearch({ variant }: Props) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const setSelectedClient = useClientStore((s) => s.setSelectedClient);
  const selectedClientId = useClientStore((s) => s.selectedClientId);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(t);
  }, [query]);

  const { data: results = [], isLoading } = useClientSearch(debounced);
  const showDropdown = open;

  // Reset query when client deselected
  useEffect(() => {
    if (!selectedClientId) {
      setQuery("");
    }
  }, [selectedClientId]);

  const handleSelect = (c: ClientSearchResult) => {
    setSelectedClient(c.client_id);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (variant === "header" && query === "" && selectedClientId) {
        setSelectedClient(null);
      }
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const placeholder = variant === "hero" ? "Rechercher un client…" : "Rechercher un autre client…";
  const heightClass = variant === "hero" ? "h-14 text-base" : "h-10 text-sm";

  return (
    <>
      {/* Backdrop dimming the rest of the page when expanded */}
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-foreground/10 backdrop-blur-[1px] z-40"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}

      <motion.div
        layoutId="search-bar"
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="w-[640px] max-w-full relative z-50"
      >
        <Command
          shouldFilter={false}
          className="bg-surface border border-border rounded-full overflow-visible shadow-sm"
        >
          <div className={`flex items-center px-4 ${heightClass}`}>
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              onKeyDown={handleKey}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-0 outline-none px-3 placeholder:text-muted-foreground"
            />
          </div>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-surface border border-border rounded-2xl shadow-md overflow-hidden z-50">
              <CommandList className="max-h-80">
                {results.length === 0 ? (
                  isLoading ? (
                    <div className="px-4 py-6 text-sm text-muted-foreground text-center">Chargement…</div>
                  ) : (
                    <CommandEmpty>Aucun client trouvé.</CommandEmpty>
                  )
                ) : (
                  <CommandGroup heading={debounced.trim() ? undefined : "Suggestions"}>
                    {results.map((c) => (
                      <CommandItem
                        key={c.client_id}
                        value={c.client_id}
                        onSelect={() => handleSelect(c)}
                        className="cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium">{fullName(c)}</div>
                          <div className="text-xs text-muted-foreground">
                            {[c.age ? `${c.age} ans` : null, c.csp].filter(Boolean).join(" · ") || c.client_id}
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground tabular-nums">{c.client_id}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </div>
          )}
        </Command>
      </motion.div>
    </>
  );
}

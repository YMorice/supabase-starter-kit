-- =========================================
-- PROMPTS TABLE
-- =========================================
CREATE TABLE public.prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_prompts_client_id ON public.prompts(client_id);
CREATE INDEX idx_prompts_created_at ON public.prompts(created_at DESC);

ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read prompts" ON public.prompts FOR SELECT USING (true);
CREATE POLICY "Public insert prompts" ON public.prompts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update prompts" ON public.prompts FOR UPDATE USING (true);
CREATE POLICY "Public delete prompts" ON public.prompts FOR DELETE USING (true);

-- =========================================
-- CLIENT SNAPSHOTS TABLE
-- =========================================
CREATE TABLE public.client_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  message TEXT,
  triggered_by_prompt_id UUID REFERENCES public.prompts(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_client_snapshots_client_id ON public.client_snapshots(client_id);
CREATE INDEX idx_client_snapshots_created_at ON public.client_snapshots(created_at DESC);

ALTER TABLE public.client_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read snapshots" ON public.client_snapshots FOR SELECT USING (true);
CREATE POLICY "Public insert snapshots" ON public.client_snapshots FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update snapshots" ON public.client_snapshots FOR UPDATE USING (true);
CREATE POLICY "Public delete snapshots" ON public.client_snapshots FOR DELETE USING (true);

-- =========================================
-- TIMESTAMP TRIGGER
-- =========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_prompts_updated_at
BEFORE UPDATE ON public.prompts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================
-- ENABLE REALTIME
-- =========================================
ALTER TABLE public.prompts REPLICA IDENTITY FULL;
ALTER TABLE public.client_snapshots REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.prompts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.client_snapshots;

-- =========================================
-- SEED DEMO SNAPSHOTS
-- 2-3 snapshots per existing profil_client row
-- =========================================
INSERT INTO public.client_snapshots (client_id, payload, message, created_at)
SELECT
  pc.client_id,
  jsonb_build_object(
    'components', jsonb_build_array(
      jsonb_build_object(
        'type', 'client_profile',
        'data', jsonb_build_object(
          'name', COALESCE(pc.prenom, '') || ' ' || COALESCE(pc.nom, ''),
          'age', pc.age,
          'job', pc.csp,
          'risk_profile', COALESCE(pc.profil_risque, 'Équilibré')
        )
      ),
      jsonb_build_object(
        'type', 'financial_summary',
        'data', jsonb_build_object(
          'income', COALESCE(pc.revenus_annuels_declares, 45000) / 12,
          'expenses', (COALESCE(pc.revenus_annuels_declares, 45000) / 12) * 0.65,
          'savings', (COALESCE(pc.revenus_annuels_declares, 45000) / 12) * 0.35
        )
      ),
      jsonb_build_object(
        'type', 'loans',
        'data', jsonb_build_object(
          'loans', jsonb_build_array(
            jsonb_build_object('type', 'Immobilier', 'montant', 220000, 'taux', 1.85, 'duree', '20 ans', 'restant', 145000),
            jsonb_build_object('type', 'Auto', 'montant', 18000, 'taux', 3.2, 'duree', '4 ans', 'restant', 8500)
          )
        )
      ),
      jsonb_build_object(
        'type', 'alerts',
        'data', jsonb_build_object(
          'alerts', jsonb_build_array(
            jsonb_build_object('severity', 'warning', 'title', 'Découvert récurrent', 'description', '3 fois ce trimestre, max -340€'),
            jsonb_build_object('severity', 'info', 'title', 'Échéance assurance vie', 'description', 'Versement programmé le 15')
          )
        )
      ),
      jsonb_build_object(
        'type', 'opportunities',
        'data', jsonb_build_object(
          'opportunities', jsonb_build_array(
            jsonb_build_object('title', 'PEA non ouvert', 'rationale', 'Profil compatible, capacité d''épargne suffisante'),
            jsonb_build_object('title', 'Renégociation prêt immo', 'rationale', 'Taux actuel supérieur de 0.6pt au marché')
          )
        )
      )
    )
  ),
  'Vue initiale du client',
  now() - interval '2 days'
FROM public.profil_client pc;

INSERT INTO public.client_snapshots (client_id, payload, message, created_at)
SELECT
  pc.client_id,
  jsonb_build_object(
    'components', jsonb_build_array(
      jsonb_build_object(
        'type', 'client_profile',
        'data', jsonb_build_object(
          'name', COALESCE(pc.prenom, '') || ' ' || COALESCE(pc.nom, ''),
          'age', pc.age,
          'job', pc.csp,
          'risk_profile', COALESCE(pc.profil_risque, 'Équilibré')
        )
      ),
      jsonb_build_object(
        'type', 'financial_summary',
        'data', jsonb_build_object(
          'income', COALESCE(pc.revenus_annuels_declares, 45000) / 12,
          'expenses', (COALESCE(pc.revenus_annuels_declares, 45000) / 12) * 0.62,
          'savings', (COALESCE(pc.revenus_annuels_declares, 45000) / 12) * 0.38
        )
      ),
      jsonb_build_object(
        'type', 'opportunities',
        'data', jsonb_build_object(
          'opportunities', jsonb_build_array(
            jsonb_build_object('title', 'Assurance vie multisupport', 'rationale', 'Diversification UC adaptée au profil'),
            jsonb_build_object('title', 'Crédit travaux', 'rationale', 'Résidence principale acquise il y a 8 ans')
          )
        )
      )
    )
  ),
  'Focus opportunités d''épargne',
  now() - interval '6 hours'
FROM public.profil_client pc;

INSERT INTO public.client_snapshots (client_id, payload, message, created_at)
SELECT
  pc.client_id,
  jsonb_build_object(
    'components', jsonb_build_array(
      jsonb_build_object(
        'type', 'client_profile',
        'data', jsonb_build_object(
          'name', COALESCE(pc.prenom, '') || ' ' || COALESCE(pc.nom, ''),
          'age', pc.age,
          'job', pc.csp,
          'risk_profile', COALESCE(pc.profil_risque, 'Équilibré')
        )
      ),
      jsonb_build_object(
        'type', 'loans',
        'data', jsonb_build_object(
          'loans', jsonb_build_array(
            jsonb_build_object('type', 'Immobilier', 'montant', 220000, 'taux', 1.85, 'duree', '20 ans', 'restant', 142000),
            jsonb_build_object('type', 'Auto', 'montant', 18000, 'taux', 3.2, 'duree', '4 ans', 'restant', 7800),
            jsonb_build_object('type', 'Conso', 'montant', 5000, 'taux', 4.5, 'duree', '2 ans', 'restant', 2100)
          )
        )
      ),
      jsonb_build_object(
        'type', 'alerts',
        'data', jsonb_build_object(
          'alerts', jsonb_build_array(
            jsonb_build_object('severity', 'danger', 'title', 'Endettement élevé', 'description', 'Taux d''endettement à 38%'),
            jsonb_build_object('severity', 'warning', 'title', 'Épargne en baisse', 'description', '-12% sur 3 mois')
          )
        )
      )
    )
  ),
  'Analyse risque et endettement',
  now() - interval '15 minutes'
FROM public.profil_client pc;
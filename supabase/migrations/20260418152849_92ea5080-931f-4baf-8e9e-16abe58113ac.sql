UPDATE public.client_snapshots
SET payload = replace(payload::text, '"title": "AV trop défensive"', '"title": "Anciens prêts réalisés"')::jsonb
WHERE payload::text LIKE '%"title": "AV trop défensive"%';

UPDATE public.client_snapshots
SET payload = replace(payload::text, '"title": "Clause bénéficiaire inadaptée"', '"title": "Apport de 100.00€"')::jsonb
WHERE payload::text LIKE '%"title": "Clause bénéficiaire inadaptée"%';
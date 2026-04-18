
## Objectif
Brancher l'enregistrement audio réel sur le bouton micro et envoyer le fichier au webhook n8n via **POST** (standard pour upload de fichier en `multipart/form-data`).

## Webhook n8n
- URL : `https://n8n-theo.tiro.agency/webhook/2be84cf6-9e18-4ded-9c0c-9d50038b858f`
- Méthode : **POST** (obligatoire pour envoyer un binaire / FormData ; GET ne supporte pas de body).
- Côté n8n, le node "Webhook" doit être configuré en `HTTP Method: POST` et `Binary Data: true` (ou laisser FormData arriver dans `body`).

## Approche

### 1. `src/components/shell/PromptBar.tsx`
- Ajouter refs : `mediaRecorderRef`, `chunksRef`, `streamRef`.
- Au clic micro :
  - Si pas en cours → `getUserMedia({ audio: true })`, créer un `MediaRecorder(stream, { mimeType: 'audio/webm' })`, push des chunks dans `ondataavailable`, `start()`, passer `isRecording = true`.
  - Si déjà en cours → `stop()`, qui déclenche `onstop` : assembler `Blob`, fermer le stream (`getTracks().forEach(t => t.stop())`), appeler `submitAudio(clientId, blob)`, repasser `isRecording = false`, activer `setPromptPending(true)`.
- Erreurs (refus permission, pas de micro) → toast + reset.

### 2. `src/lib/hooks.ts`
Ajouter :
```ts
export async function submitAudio(clientId: string, blob: Blob) {
  const fd = new FormData();
  fd.append("audio", blob, `recording-${Date.now()}.webm`);
  fd.append("client_id", clientId);
  fd.append("timestamp", new Date().toISOString());

  const url = "https://n8n-theo.tiro.agency/webhook/2be84cf6-9e18-4ded-9c0c-9d50038b858f";
  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) throw new Error(`n8n webhook failed: ${res.status}`);
  return res;
}
```
(URL en dur pour démarrer ; pourra être déplacée en variable d'env plus tard.)

### 3. UX
- Toast succès "Audio envoyé" après réponse 2xx.
- Toast erreur en cas d'échec (permission, réseau, n8n).
- `isPending` reste actif jusqu'à arrivée du nouveau snapshot (déjà géré par realtime + timeout 4s existant).

## Fichiers modifiés
- `src/components/shell/PromptBar.tsx`
- `src/lib/hooks.ts`

# Changelog

## [0.11.0] - 2026-06-29

### Ajouté
- **Onglet Synthèse redessiné** : hero avec icône d'action, statut auto intégré (🟢/🔴), bandeau canicule, stat-card *Prochain arrosage* (remplace Phase), mini-barre de progression sur la réserve, bordure colorée selon le niveau de risque, pills contextuelles (phase · ET₀ · pluie attendue)
- **Nouvelle clé de config `entity_objectif_arrosage`** : lit ET₀ et `pluie_demain` depuis `sensor.gazon_intelligent_objectif_d_arrosage`
- **Entités par défaut** : `setConfig` utilise les IDs conventionnels `sensor.gazon_intelligent_*` en fallback — le YAML minimal (`type` + `title`) fonctionne sans aucune autre clé
- **i18n FR/EN** : objet `STRINGS` + helpers `_t()` / `_lblt()` sur toutes les chaînes
- **Éditeur visuel** : `ha-form` avec schéma complet, `getLayoutOptions()`, `getStubConfig()`
- **Préparation HACS** : `hacs.json` corrigé (`iot_class`, sans `country`, HA 2026.1.0+)

### Corrigé
- Échappement HTML sur tous les textes issus des attributs d'entités (XSS)
- `_tab_produits` : états `non_requis` / `not_required` n'affichent plus le hero d'alerte
- `customElements.define` protégé par `customElements.get()` — plus d'erreur en cas de double chargement de la ressource
- Timeline 24h glissante basée sur `entity_dernier_arrosage` (plus dépendante de l'historique brut HA)
- README entièrement réécrit : suppression des mascottes/0.10.x, YAML correct, tableau des clés de config

### Infrastructure
- Architecture monolithique : `src/gazon-intelligent-card.js` → `gazon-intelligent-card.js` (bundle = source)
- `scripts/validate.py` et tests réécrits pour l'architecture monolithique
- 32 tests Python (contrat) + 8 tests jsdom (comportement)

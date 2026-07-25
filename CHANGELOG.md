# Changelog

## [0.12.1] - 2026-07-25

### Corrigé
- **Popup d'arrosage manuel — saisie de la dose impossible** : `set hass` re-rendait la carte à chaque changement d'état dans tout Home Assistant (plusieurs fois par seconde), ce qui recréait le champ de saisie en continu → la valeur tapée était écrasée et le focus perdu, la dose repassait sans cesse à celle conseillée. On ne re-rend plus tant que le popup est ouvert (il tient ses propres durées à jour en direct).

### Modifié
- **Budget hebdomadaire — libellé plus clair** : « dont X mm technique (hors budget) » laissait croire que le technique était compté. Remplacé par « + X mm techniques, non décomptés · total reçu Y mm » — l'eau technique s'**ajoute** au total reçu sans entrer dans le budget de l'auto.

## [0.12.0] - 2026-07-24

### Ajouté
- **Arrosage manuel avec popup de préparation** (onglet *Arrosage*) : le bouton **Configurer…** ouvre une fenêtre où l'on saisit la dose voulue, avec **la durée calculée par zone** (à partir des débits réels de l'intégration, `number.*_debit_zone_N`) et la durée totale, recalculées en direct pendant la saisie. Le popup affiche aussi la réserve **avant → après**, le blocage d'arrosage en cours (en rappelant que le lancement manuel passe outre) et une alerte plein soleil entre 10 h et 18 h. Le bouton de confirmation annonce la dose exacte (« 💧 Lancer 3 mm »). Appelle `gazon_intelligent.start_manual_irrigation`, qui applique la dose telle quelle sans consulter le garde-fou — c'est le moyen de forcer une incorporation de produit quand l'arrosage automatique est bloqué.
- **Budget hebdomadaire** (sous *Dernières sessions*) : jauge `consommé / plafond` avec code couleur (vert → orange à 80 % → rouge au dépassement), plus l'eau **réellement reçue** par le gazon. Les deux chiffres sont distincts et proviennent tous deux de l'intégration : `arrosage_recent_7j` (ce qui compte au budget) et `arrosage_applique_7j` (technique inclus). Sans cet écart affiché, un sur-arrosage durable reste invisible. Nécessite l'intégration ≥ 0.17.0 ; sur une version antérieure, la ligne se masque au lieu d'afficher un chiffre faux.
- **Section « Dernière application »** (onglet *Produits*) : produit, date, type, dose et note de la dernière intervention déclarée.
- **Nouvelle clé de config `entity_fenetre_optimale`** : lit le plafond hebdomadaire (`weekly_guardrail_mm_max`).

### Corrigé
- **Entity ID par défaut liés à la tonte** : `entity_hauteur_conseillee` pointait sur `sensor.gazon_intelligent_hauteur_conseillee` et `entity_switch_tondeuse` sur `input_boolean.gazon_intelligent_tondeuse_auto` — deux entités **inexistantes**. Corrigés vers `sensor.gazon_intelligent_hauteur_de_tonte_conseillee` et `switch.gazon_intelligent_coordination_tondeuse`.
- **Nommage des zones unifié** : la timeline 24 h affichait `Z1/Z2/Z3` alors que la liste des zones et l'historique utilisaient `CH1/CH2/CH3`. Tout est aligné sur `CH*`.
- **Titre « Historique — 7 jours »** renommé **« Dernières sessions »** : la liste est plafonnée aux N dernières sessions, pas à 7 jours — l'imprécision induisait en erreur sur les totaux.

### Modifié
- **Passages regroupés dans l'historique** : un cycle fractionné affichait une puce par zone **et par passage** (6 puces pour 3 zones). Les durées sont désormais cumulées par zone, avec un badge `2 passages`.
- **Arrosages techniques identifiés** : les rafraîchissements du soir et les incorporations post-produit portent un badge `technique` et sont atténués — ils sont exclus du budget hebdomadaire, ce qui n'était pas visible.

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

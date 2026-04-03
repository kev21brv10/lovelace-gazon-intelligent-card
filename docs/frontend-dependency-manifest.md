# Frontend Dependency Manifest

Ce document décrit les dépendances critiques du frontend Lovelace de `gazon-intelligent-card`.

Objectif:
- garder une seule source de vérité par helper ou constante critique
- documenter l’ordre de chargement nécessaire au bundle concaténé
- éviter les dépendances implicites qui provoquent des erreurs runtime dans Home Assistant

## Ordre de bundle attendu

Le bundle final est construit et évalué dans cet ordre:

1. `src/constants.js`
2. `src/utils/formatters.js`
3. `src/renderers/primitives.js`
4. `src/gazon-intelligent-card.js`
5. `src/renderers/layout.js`
6. `src/editor/editor.js`
7. styles inline importés par le build

Règle:
- un fichier ne doit pas dépendre d’un symbole qui n’est pas déjà défini ou injecté avant son évaluation
- toute nouvelle dépendance runtime doit être ajoutée explicitement à `scripts/build.py` et `scripts/validate.py`

## Fichiers critiques

### `src/constants.js`

Rôle:
- source unique des constantes partagées entre le main, les renderers et les formatters

Exports critiques:
- `CARD_TYPE`
- `CARD_NAME`
- `CARD_VERSION`
- `DEFAULT_CONFIG`
- `TAB_DEFS`
- `ENTITY_KEYS`
- `SECTION_DEFS`
- `RENDER_SIGNATURE_ATTRS`
- `STATUS_COLORS`
- `STATUS_LABELS`
- `WEATHER_LABELS`

Dépendances:
- aucune dépendance locale JavaScript

Doit être chargé avant:
- `src/utils/formatters.js`
- `src/gazon-intelligent-card.js`
- `src/renderers/layout.js`
- `src/renderers/primitives.js`
- `src/editor/editor.js`

### `src/utils/formatters.js`

Rôle:
- helpers de formatage et de tonalité
- normalisation des libellés affichés

Imports:
- `src/constants.js`

Exports critiques:
- `isEmpty`
- `isUnavailableState`
- `escapeHtml`
- `asNumber`
- `formatNumber`
- `formatCm`
- `formatMm`
- `formatRecommendationState`
- `formatAuthorizationState`
- `formatStateLabel`
- `formatWeatherConditionLabel`
- `weatherIconForState`
- `weatherToneForState`
- `normalizeDisplayValue`
- `computeTonteTone`
- `computeRisqueTone`
- `computeActionTone`
- `phaseTone`
- `toneToColor`
- `sectionToAccent`
- `splitServiceName`
- `mergeConfig`
- `normalizeConfig`
- `domainMatches`
- `formatDurationHuman`
- `humanDateTimeText`
- `formatPlanType`
- `formatApplicationMode`
- `formatStatusLabel`
- `formatProductUsageMode`
- `formatProductAnnualLimit`
- `formatMonthLabel`
- `formatInterventionStatusPresentation`
- `formatPostApplicationStatusPresentation`
- `formatWateringBlockReason`
- `formatSwitchState`
- `statusTone`

Doit être chargé avant:
- `src/renderers/primitives.js`
- `src/renderers/layout.js`
- `src/gazon-intelligent-card.js`
- `src/editor/editor.js`

Fallback runtime attendu:
- si un libellé manque, renvoyer une chaîne brute ou un libellé neutre plutôt que lever une exception

### `src/renderers/primitives.js`

Rôle:
- primitives visuelles réutilisables pour les pills et les cartes

Imports:
- `src/utils/formatters.js`

Exports critiques:
- `renderIconBox`
- `renderPillIcon`
- `renderPillContent`
- `renderPill`
- `renderCardCore`
- `renderStatusPill`

Doit être chargé avant:
- `src/renderers/layout.js`
- `src/gazon-intelligent-card.js`

Fallback runtime attendu:
- si une icône ou une valeur secondaire est absente, le rendu doit rester minimal et non bloquant

### `src/gazon-intelligent-card.js`

Rôle:
- classe principale de la carte Lovelace
- point d’entrée runtime du frontend

Imports:
- `src/constants.js`
- `src/utils/formatters.js`
- `src/renderers/primitives.js`
- `src/renderers/layout.js`
- `src/styles/card-styles.js`

Responsabilités:
- instancier la carte
- gérer les entités et la configuration
- construire les sections et le rendu final

Règles:
- ne pas redéfinir localement les helpers partagés
- ne pas redéfinir localement les constantes partagées
- les helpers critiques utilisés dans le rendu doivent avoir un fallback runtime si le bundle est dégradé

### `src/renderers/layout.js`

Rôle:
- rendu du header
- rendu des onglets
- rendu des panneaux métier

Imports:
- `src/constants.js`
- `src/utils/formatters.js`
- `src/renderers/primitives.js`

Exports critiques:
- `renderTabNav`
- `renderSectionNav`
- `renderWateringProgressSection`
- `renderHeader`
- `renderOverviewTab`
- `renderWateringTab`
- `renderMowingTab`
- `renderGazonTab`
- `renderProductsTab`
- `renderInterventionTab`
- `renderActiveTab`
- `renderDecisionLayout`

Fallback runtime attendu:
- si une présentation métier manque, utiliser un libellé minimal au lieu de bloquer le rendu

### `src/editor/editor.js`

Rôle:
- éditeur visuel de configuration

Imports:
- `src/constants.js`
- `src/utils/formatters.js`
- `src/styles/editor-styles.js`

Exports critiques:
- `GazonIntelligentCardEditor`

Doit être chargé après:
- `src/constants.js`
- `src/utils/formatters.js`

## Règle de maintenance

Toute nouvelle fonction ou constante critique doit:

1. être définie dans un seul module de vérité
2. être ajoutée explicitement à `scripts/build.py`
3. être ajoutée explicitement à `scripts/validate.py`
4. avoir un fallback runtime si elle est utilisée dans un chemin de render

## Fichiers de contrôle

- `scripts/build.py`
  - construit le bundle final
  - définit l’ordre des modules concaténés
- `scripts/validate.py`
  - bloque les helpers ou constantes manquants
  - bloque les doublons dangereux dans le bundle final
- `scripts/check_bundle_sync.py`
  - compare le bundle du repo et le bundle installé côté HA/HACS


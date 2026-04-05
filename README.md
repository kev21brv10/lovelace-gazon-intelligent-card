# 🌱 Gazon Intelligent Card

![Version](https://img.shields.io/github/v/release/kev21brv10/lovelace-gazon-intelligent-card?color=green)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.3.2+-blue)
![License](https://img.shields.io/github/license/kev21brv10/lovelace-gazon-intelligent-card?style=flat-square)

> Une carte Lovelace claire et premium pour lire les décisions de **Gazon Intelligent** en un coup d'œil.

Gazon Intelligent Card affiche dans Home Assistant les décisions métier les plus utiles de ton intégration Gazon Intelligent :
- navigation par onglets pour séparer clairement synthèse, irrigation, tonte, gazon, produits, intervention et réglages
- barre d’onglets horizontale qui se recentre automatiquement quand elle déborde
- résumé adaptatif qui met en avant l’information vraiment utile selon la situation
- tuiles de la synthèse, de la tonte, du gazon, des produits et des réglages cliquables pour ouvrir le bon `more-info`
- zone produit dédiée pour le catalogue local, le produit d’intervention et la dernière application
- bloc `Intervention` orienté décision avec recommandation automatique, guidage produit et déclaration rapide
- barre de progression visible quand une irrigation est en cours
- fenêtre optimale, objectif d'irrigation et profil d'irrigation bien lisibles
- produit courant et référentiel produits lisibles pour guider les interventions
- bouton unique `Irrigation manuelle immédiate` quand une irrigation est possible
- résumé compact du plan d'irrigation
- contexte utile dans les détails: dernier arrosage, application, phase et risque
- blocage explicite quand aucune action n'est possible
- pied de carte avec le mode du gazon et l'autorisation d'irrigation

---

## 📸 Aperçu

Capture Lovelace à documenter dans une prochaine révision du README.

---

## ✨ Ce que fait la carte

- affiche une lecture claire et hiérarchisée du moteur Gazon Intelligent
- met en avant la fenêtre optimale, l'objectif d'irrigation et l'action manuelle unique
- expose le produit d’intervention sélectionné et le catalogue produit du moteur
- consomme la prochaine intervention recommandée via le `payload` structuré exposé par l’intégration (`schema_version: 3`)
- lit un contrat stable où les champs racine restent présents, avec `null`, `[]` ou `{}` quand l’information manque
- sépare la zone produit du reste du résumé pour éviter les doublons visuels
- affiche la progression d'irrigation en cours dès qu'une session est active
- sépare les usages par onglets: synthèse, irrigation, tonte, gazon, produits, intervention et réglages
- reste lisible même si certaines entités sont absentes
- s’adapte au thème clair ou sombre de Home Assistant
- propose un éditeur visuel simple pour la configuration courante
- garde un mode avancé optionnel dont le contenu suit l’onglet actif

---

## 🧩 Installation via HACS

1. Ajoute ce dépôt dans HACS comme **Frontend / Dashboard card**
2. Installe **Gazon Intelligent Card**
3. Redémarre Home Assistant ou recharge les ressources Lovelace
4. Ajoute la carte dans ton dashboard

### Ressource Lovelace

La ressource réellement utilisée par cette carte via HACS est :

```yaml
/hacsfiles/lovelace-gazon-intelligent-card/gazon-intelligent-card.js
```

Si tu l’ajoutes manuellement :

```yaml
resources:
  - url: /hacsfiles/lovelace-gazon-intelligent-card/gazon-intelligent-card.js
    type: module
```

---

## 🔧 Installation manuelle

1. Copie le fichier `gazon-intelligent-card.js` dans `config/www/gazon-intelligent-card/gazon-intelligent-card.js`.
2. Ajoute cette ressource Lovelace :

```yaml
resources:
  - url: /local/gazon-intelligent-card/gazon-intelligent-card.js
    type: module
```

3. Utilise la carte dans ton dashboard.

---

## 🧠 Compatibilité

- Home Assistant `2026.3.2` ou plus récent
- thème clair / sombre
- dashboard classique et sections
- installations HACS et manuelles
- la carte fournit ses tailles via `getCardSize()` et `getGridOptions()` sans hauteur fixe forcée, avec une largeur par défaut de 12 colonnes et une largeur minimale de 6 colonnes en sections

---

## 🧱 Structure du projet

- `src/gazon-intelligent-card.js` : point d'entrée source de la carte
- `src/renderers/layout.js` : rendu du header, des onglets et des panneaux
- `src/renderers/primitives.js` : primitives communes pour pills et cartes
- `src/utils/formatters.js` : formatage et fonctions de tonalité
- `src/constants.js` : constantes partagées entre les couches
- `src/editor/editor.js` : éditeur visuel de la carte
- `src/styles/card-styles.js` : styles de la carte Lovelace
- `src/styles/editor-styles.js` : styles de l'éditeur
- `gazon-intelligent-card.js` : bundle final consommé par Home Assistant et HACS
- `docs/frontend-dependency-manifest.md` : manifeste léger des dépendances frontend critiques

---

## 🪄 Exemple YAML simple

```yaml
type: custom:gazon-intelligent-card
title: Gazon du jardin
entity_fenetre_optimale: sensor.gazon_intelligent_fenetre_optimale
entity_plan_arrosage: sensor.gazon_intelligent_plan_d_arrosage
entity_dernier_arrosage: sensor.gazon_intelligent_dernier_arrosage_detecte
entity_derniere_application: sensor.gazon_intelligent_derniere_application
entity_catalogue_produits: sensor.gazon_intelligent_catalogue_produits
entity_prochaine_intervention: sensor.gazon_intelligent_prochaine_intervention
entity_produit_intervention: select.gazon_intelligent_produit_d_intervention
entity_mode: select.gazon_intelligent_mode_du_gazon
entity_switch_arrosage_automatique: switch.gazon_intelligent_arrosage_automatique_autorise
entity_arrosage_recommande: binary_sensor.gazon_intelligent_arrosage_recommande
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_type_arrosage: sensor.gazon_intelligent_type_d_arrosage
entity_tonte: sensor.gazon_intelligent_etat_de_tonte
entity_hauteur: sensor.gazon_intelligent_hauteur_de_tonte_conseillee
entity_debit_zone_1: number.gazon_intelligent_debit_zone_1
entity_debit_zone_2: number.gazon_intelligent_debit_zone_2
entity_debit_zone_3: number.gazon_intelligent_debit_zone_3
entity_debit_zone_4: number.gazon_intelligent_debit_zone_4
entity_debit_zone_5: number.gazon_intelligent_debit_zone_5
entity_hauteur_min_tondeuse: number.gazon_intelligent_hauteur_min_tondeuse
entity_hauteur_max_tondeuse: number.gazon_intelligent_hauteur_max_tondeuse
show_advanced_details: false
```

### Dépendances entités

Dans ce README, les noms comme `entity_produit_intervention` ou `entity_conseil` sont des **clés de configuration de la card**, pas des entités Home Assistant.

Exemple:

- `entity_produit_intervention` = champ YAML de la carte
- `select.gazon_intelligent_produit_d_intervention` = vraie entité Home Assistant à sélectionner
- dans l’interface Home Assistant, cette entité apparaît généralement comme **Produit sélectionné**

En pratique, la card est déjà **préremplie automatiquement** avec les entités publiques standard de l’intégration. Si ton backend Gazon Intelligent expose bien les IDs publics par défaut, tu peux souvent partir du YAML minimal.

| Clé de config | Entité réelle par défaut | Usage |
|---|---|---|
| `entity_fenetre_optimale` | `sensor.gazon_intelligent_fenetre_optimale` | synthèse, irrigation |
| `entity_plan_arrosage` | `sensor.gazon_intelligent_plan_d_arrosage` | synthèse, irrigation |
| `entity_prochaine_intervention` | `sensor.gazon_intelligent_prochaine_intervention` | synthèse, intervention |
| `entity_produit_intervention` | `select.gazon_intelligent_produit_d_intervention` | produits, intervention |
| `entity_objectif_arrosage` | `sensor.gazon_intelligent_objectif_d_arrosage` | synthèse, irrigation |
| `entity_tonte` | `sensor.gazon_intelligent_etat_de_tonte` | tonte |
| `entity_hauteur` | `sensor.gazon_intelligent_hauteur_de_tonte_conseillee` | tonte |

Tu ajustes le YAML seulement si:

- ton instance utilise un autre `entity_id`
- tu veux brancher une météo différente via `entity_weather`
- tu veux enrichir la carte avec les entités avancées comme `entity_debug_intervention`, `entity_signal_irrigation` ou `entity_arrosage_en_cours`
- tu veux personnaliser le bouton manuel ou les actions de carte

La liste complète des clés supportées reste plus bas dans `Options principales`.

Même si une entité est absente ou renvoie `unknown` / `unavailable`, la carte garde sa structure et affiche un fallback propre.

### Exemple minimal

```yaml
type: custom:gazon-intelligent-card
title: Gazon Intelligent
```

Cette version affiche la structure complète avec des fallbacks quand les entités ne sont pas encore branchées.

---

## 🧱 Exemple YAML complet

```yaml
type: custom:gazon-intelligent-card
title: Gazon intelligent
show_icons: true
show_header: true
show_background: true
compact: false
minimal_mode: false
show_advanced_details: false
theme_mode: auto
accent_color: ""
icon_size: 24
border_radius: 24
background_style: solid
use_gradient: true
show_secondary_info: true
manual_action_service: gazon_intelligent.start_manual_irrigation
manual_action_label: Irrigation manuelle
tap_action:
  action: more-info
hold_action:
  action: none
double_tap_action:
  action: none
entity_fenetre_optimale: sensor.gazon_intelligent_fenetre_optimale
entity_weather: weather.forecast_home
entity_plan_arrosage: sensor.gazon_intelligent_plan_d_arrosage
entity_arrosage_en_cours: sensor.gazon_intelligent_arrosage_en_cours
entity_dernier_arrosage: sensor.gazon_intelligent_dernier_arrosage_detecte
entity_derniere_application: sensor.gazon_intelligent_derniere_application
entity_catalogue_produits: sensor.gazon_intelligent_catalogue_produits
entity_prochaine_intervention: sensor.gazon_intelligent_prochaine_intervention
entity_produit_intervention: select.gazon_intelligent_produit_d_intervention
entity_conseil: sensor.gazon_intelligent_conseil_principal
entity_action: sensor.gazon_intelligent_action_recommandee
entity_avoid: sensor.gazon_intelligent_action_a_eviter
entity_debug_intervention: sensor.gazon_intelligent_debug_intervention
entity_niveau_pertinence: sensor.gazon_intelligent_niveau_de_pertinence
entity_prochaine_fenetre_optimale: sensor.gazon_intelligent_prochaine_fenetre_optimale
entity_prochain_blocage_attendu: sensor.gazon_intelligent_prochain_blocage_attendu
entity_mode: select.gazon_intelligent_mode_du_gazon
entity_switch_arrosage_automatique: switch.gazon_intelligent_arrosage_automatique_autorise
entity_arrosage_recommande: binary_sensor.gazon_intelligent_arrosage_recommande
entity_arrosage_apres_application_autorise: binary_sensor.gazon_intelligent_arrosage_apres_application_autorise
entity_signal_irrigation: binary_sensor.gazon_intelligent_signal_irrigation
entity_signal_intervention: binary_sensor.gazon_intelligent_signal_intervention
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_type_arrosage: sensor.gazon_intelligent_type_d_arrosage
entity_phase: sensor.gazon_intelligent_phase_dominante
entity_sous_phase: sensor.gazon_intelligent_sous_phase
entity_risque: sensor.gazon_intelligent_risque_gazon
entity_niveau: sensor.gazon_intelligent_niveau_d_action
entity_tonte_autorisee: binary_sensor.gazon_intelligent_tonte_autorisee
entity_tonte: sensor.gazon_intelligent_etat_de_tonte
entity_hauteur: sensor.gazon_intelligent_hauteur_de_tonte_conseillee
entity_debit_zone_1: number.gazon_intelligent_debit_zone_1
entity_debit_zone_2: number.gazon_intelligent_debit_zone_2
entity_debit_zone_3: number.gazon_intelligent_debit_zone_3
entity_debit_zone_4: number.gazon_intelligent_debit_zone_4
entity_debit_zone_5: number.gazon_intelligent_debit_zone_5
entity_hauteur_min_tondeuse: number.gazon_intelligent_hauteur_min_tondeuse
entity_hauteur_max_tondeuse: number.gazon_intelligent_hauteur_max_tondeuse
```

---

## ⚙️ Options principales

- `title`
- `entity_fenetre_optimale`
- `entity_weather`
- `entity_plan_arrosage`
- `entity_arrosage_en_cours`
- `entity_dernier_arrosage`
- `entity_derniere_application`
- `entity_catalogue_produits`
- `entity_prochaine_intervention`
- `entity_produit_intervention`
- `entity_conseil`
- `entity_action`
- `entity_avoid`
- `entity_debug_intervention`
- `entity_niveau_pertinence`
- `entity_prochaine_fenetre_optimale`
- `entity_prochain_blocage_attendu`
- `entity_mode`
- `entity_switch_arrosage_automatique`
- `entity_arrosage_recommande`
- `entity_arrosage_apres_application_autorise`
- `entity_signal_irrigation`
- `entity_signal_intervention`
- `entity_objectif_arrosage`
- `entity_type_arrosage`
- `entity_phase`
- `entity_sous_phase`
- `entity_risque`
- `entity_niveau`
- `entity_tonte_autorisee`
- `entity_tonte`
- `entity_hauteur`
- `entity_debit_zone_1`
- `entity_debit_zone_2`
- `entity_debit_zone_3`
- `entity_debit_zone_4`
- `entity_debit_zone_5`
- `entity_hauteur_min_tondeuse`
- `entity_hauteur_max_tondeuse`
- `show_icons`
- `show_header`
- `show_background`
- `compact`
- `minimal_mode`
- `show_advanced_details`
- `theme_mode`
- `accent_color`
- `manual_action_service`
- `manual_action_label`
- `tap_action`
- `hold_action`
- `double_tap_action`
- `icon_size`
- `border_radius`
- `background_style`
- `use_gradient`
- `show_secondary_info`

---

## 🖊️ Éditeur visuel

La carte expose un éditeur visuel natif dans Home Assistant pour :
- la carte elle-même: titre, style, fond, icônes et bouton manuel
- la synthèse et l’irrigation: fenêtre, plan, objectif, signaux et dernières actions
- la zone produit: catalogue local, produit d’intervention et dernière application
- l’intervention: recommandation, signal métier et debug
- le gazon et la tonte: mode, profil d’irrigation, phase, risque, tonte autorisée et hauteur
- l'onglet Réglages avec le switch auto, les débits et les hauteurs
- les options visuelles de base
- l’affichage optionnel des détails avancés et des écrans de diagnostic

Dans la carte elle-même, l’onglet **Réglages** propose aussi des tuiles cliquables qui ouvrent directement le contrôle Home Assistant des entités associées. C’est le chemin le plus simple pour ajuster un switch, un sélecteur ou un nombre sans quitter la vue.

Même logique pour l’éditeur: il affiche les **clés de config** de la carte, mais tu dois y brancher les **vraies entités Home Assistant**. Par exemple, `entity_produit_intervention` doit pointer vers l’entité visible **Produit sélectionné** (`select.gazon_intelligent_produit_d_intervention`).

Quand `show_advanced_details` est activé, la vue avancée suit l’onglet actif au lieu d’afficher un bloc partagé unique.

Par défaut, le switch d’autorisation pointe vers `switch.gazon_intelligent_arrosage_automatique_autorise`. Si ton instance expose un identifiant différent, ajuste `entity_switch_arrosage_automatique`.

Pour les réglages avancés, l’édition YAML reste la voie la plus directe.

---

## 🚀 Développement local

```bash
python3 scripts/build.py
python3 scripts/validate.py
```

Le fichier distribué est généré à la racine du dépôt :

```text
gazon-intelligent-card.js
gazon-intelligent-card.js.gz
```

---

## 📦 Release GitHub

Process simple :

1. mettre à jour la version dans `package.json`
2. lancer `python3 scripts/build.py`
3. vérifier `python3 scripts/validate.py`
4. créer un tag Git `vX.Y.Z`
5. publier la release GitHub
6. mettre à jour la ressource HACS / Home Assistant avec le bundle publié

Vérification post-release simple :

```bash
python3 scripts/check_bundle_sync.py \
  /Volumes/config/www/community/lovelace-gazon-intelligent-card/gazon-intelligent-card.js \
  /Volumes/config/www/community/lovelace-gazon-intelligent-card/gazon-intelligent-card.js.gz
```

Le workflow CI valide la carte à chaque push et construit l’artefact pour les tags de release.
La release GitHub publie les deux artefacts racine `gazon-intelligent-card.js` et `gazon-intelligent-card.js.gz`, qui correspondent aussi aux fichiers servis par HACS quand la ressource est mise à jour.

---

## 📄 Licence

MIT

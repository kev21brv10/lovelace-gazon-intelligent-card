# 🌱 Gazon Intelligent Card

![Version](https://img.shields.io/github/v/release/kev21brv10/lovelace-gazon-intelligent-card?color=green)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.3.2+-blue)
![License](https://img.shields.io/github/license/kev21brv10/lovelace-gazon-intelligent-card?style=flat-square)

> Une carte Lovelace claire et premium pour lire les décisions de **Gazon Intelligent** en un coup d'œil.

Gazon Intelligent Card affiche dans Home Assistant les décisions métier les plus utiles de ton intégration Gazon Intelligent :
- navigation par onglets pour séparer clairement arrosage, tonte, gazon et configuration
- résumé adaptatif qui met en avant les vraies informations utiles selon la situation
- tuiles du résumé, de la tonte, du gazon et de la configuration cliquables pour ouvrir le bon `more-info`
- barre de progression visible quand un arrosage est en cours
- fenêtre optimale, objectif d'arrosage et type d'arrosage bien lisibles
- bouton unique `Arrosage manuel immédiat` quand un arrosage est possible
- résumé compact du plan d'arrosage
- contexte utile dans les détails: dernier arrosage, application, phase et risque
- blocage explicite quand aucune action n'est possible
- pied de carte avec le mode du gazon et l'autorisation d'arrosage

---

## 📸 Aperçu

> Ajoute ici une capture Lovelace de la carte finalisée.

---

## ✨ Ce que fait la carte

- affiche une lecture claire et hiérarchisée du moteur Gazon Intelligent
- met en avant la fenêtre optimale, l'objectif d'arrosage et l'action manuelle unique
- affiche la progression d'arrosage en cours dès qu'une session est active
- sépare les usages par onglets: arrosage, tonte, configuration et contexte avancé
- reste lisible même si certaines entités sont absentes
- s’adapte au thème clair ou sombre de Home Assistant
- propose un éditeur visuel simple pour la configuration de base
- garde un mode avancé optionnel pour retrouver les détails bruts si besoin

---

## 🧩 Installation via HACS

1. Ajoute ce dépôt dans HACS comme **Frontend / Dashboard card**
2. Installe **Gazon Intelligent Card**
3. Redémarre Home Assistant ou recharge les ressources Lovelace
4. Ajoute la carte dans ton dashboard

### Ressource Lovelace

La ressource réellement utilisée par cette carte via HACS est :

```yaml
/hacsfiles/lovelace-gazon-intelligent-card/dist/gazon-intelligent-card.js
```

Si tu l’ajoutes manuellement :

```yaml
resources:
  - url: /hacsfiles/lovelace-gazon-intelligent-card/dist/gazon-intelligent-card.js
    type: module
```

---

## 🔧 Installation manuelle

1. Copie le fichier `dist/gazon-intelligent-card.js` dans `config/www/gazon-intelligent-card/gazon-intelligent-card.js`.
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
- `dist/gazon-intelligent-card.js` : bundle final consommé par Home Assistant et HACS

---

## 🪄 Exemple YAML simple

```yaml
type: custom:gazon-intelligent-card
title: Gazon du jardin
entity_fenetre_optimale: sensor.gazon_intelligent_fenetre_optimale
entity_plan_arrosage: sensor.gazon_intelligent_plan_d_arrosage
entity_dernier_arrosage: sensor.gazon_intelligent_dernier_arrosage_detecte
entity_derniere_application: sensor.gazon_intelligent_derniere_application
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
card_height: ""
icon_size: 24
border_radius: 24
background_style: solid
use_gradient: true
show_secondary_info: true
tap_action:
  action: more-info
hold_action:
  action: none
double_tap_action:
  action: none
entity_fenetre_optimale: sensor.gazon_intelligent_fenetre_optimale
entity_plan_arrosage: sensor.gazon_intelligent_plan_d_arrosage
entity_dernier_arrosage: sensor.gazon_intelligent_dernier_arrosage_detecte
entity_derniere_application: sensor.gazon_intelligent_derniere_application
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
```

---

## ⚙️ Options principales

- `title`
- `entity_fenetre_optimale`
- `entity_plan_arrosage`
- `entity_arrosage_en_cours`
- `entity_dernier_arrosage`
- `entity_derniere_application`
- `entity_mode`
- `entity_switch_arrosage_automatique`
- `entity_arrosage_recommande`
- `entity_arrosage_apres_application_autorise`
- `entity_objectif_arrosage`
- `entity_type_arrosage`
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
- `tap_action`
- `hold_action`
- `double_tap_action`
- `card_height`
- `icon_size`
- `border_radius`
- `background_style`
- `use_gradient`
- `show_secondary_info`

---

## 🖊️ Éditeur visuel

La carte expose un éditeur visuel natif dans Home Assistant pour :
- le titre
- la fenêtre optimale, le plan et le contexte principal
- le mode du gazon, le type d'arrosage et les réglages de tonte
- l’onglet Config avec le switch auto, les débits et les hauteurs
- les options visuelles de base
- l’affichage optionnel des détails avancés

Dans la carte elle-même, l’onglet **Config** propose aussi des tuiles cliquables qui ouvrent directement le contrôle Home Assistant des entités associées. C’est le chemin le plus simple pour ajuster un switch, un sélecteur ou un nombre sans quitter la vue.

Par défaut, le switch d’autorisation pointe vers `switch.gazon_intelligent_arrosage_automatique_autorise`. Si ton instance expose un identifiant différent, ajuste `entity_switch_arrosage_automatique`.

Pour les réglages avancés, l’édition YAML reste la voie la plus directe.

---

## 🚀 Développement local

```bash
python3 scripts/build.py
python3 scripts/validate.py
```

Le fichier distribué est généré dans :

```text
dist/gazon-intelligent-card.js
```

---

## 📦 Release GitHub

Process simple :

1. mettre à jour la version dans `package.json`
2. lancer `python3 scripts/build.py`
3. vérifier `python3 scripts/validate.py`
4. créer une release GitHub

Le workflow CI valide la carte à chaque push et construit l’artefact pour les tags de release.

---

## 📄 Licence

MIT

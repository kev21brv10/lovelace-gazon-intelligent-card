# 🌱 Gazon Intelligent Card

![Version](https://img.shields.io/github/v/release/kev21brv10/lovelace-gazon-intelligent-card?color=green)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.3.2+-blue)
![License](https://img.shields.io/github/license/kev21brv10/lovelace-gazon-intelligent-card?style=flat-square)

> Une carte Lovelace claire et premium pour lire les décisions de **Gazon Intelligent** en un coup d'œil.

Gazon Intelligent Card affiche dans Home Assistant les décisions métier les plus utiles de ton intégration Gazon Intelligent :
- fenêtre optimale avec résumé lisible et statut coloré
- bouton unique `Arrosage manuel immédiat` quand un arrosage est possible
- résumé compact du plan d'arrosage
- contexte utile: dernier arrosage, risque gazon, température et ETP
- blocage explicite quand aucune action n'est possible
- pied de carte avec le mode du gazon et le type d'arrosage

---

## 📸 Aperçu

> Ajoute ici une capture Lovelace de la carte finalisée.

---

## ✨ Ce que fait la carte

- affiche une lecture claire et hiérarchisée du moteur Gazon Intelligent
- met en avant la fenêtre optimale, le plan d'arrosage et l'action manuelle unique
- reste lisible même si certaines entités sont absentes
- s’adapte au thème clair ou sombre de Home Assistant
- propose un éditeur visuel simple pour la configuration de base
- garde un mode legacy optionnel pour retrouver les détails bruts si besoin

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

1. Copie le contenu du dépôt dans ton dossier `www` ou dans le dossier suivi par HACS si tu préfères le gérer manuellement.
2. Ajoute la ressource Lovelace ci-dessus.
3. Utilise la carte dans ton dashboard.

---

## 🧠 Compatibilité

- Home Assistant `2026.3.2` ou plus récent
- thème clair / sombre
- dashboard classique et sections
- installations HACS et manuelles

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
entity_arrosage_recommande: binary_sensor.gazon_intelligent_arrosage_recommande
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_type_arrosage: sensor.gazon_intelligent_type_d_arrosage
entity_risque: sensor.gazon_intelligent_risque_gazon
show_legacy_details: false
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
show_legacy_details: false
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
entity_arrosage_recommande: binary_sensor.gazon_intelligent_arrosage_recommande
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_type_arrosage: sensor.gazon_intelligent_type_d_arrosage
entity_risque: sensor.gazon_intelligent_risque_gazon
```

---

## ⚙️ Options principales

- `title`
- `entity_fenetre_optimale`
- `entity_plan_arrosage`
- `entity_dernier_arrosage`
- `entity_derniere_application`
- `entity_mode`
- `entity_arrosage_recommande`
- `entity_objectif_arrosage`
- `entity_type_arrosage`
- `entity_risque`
- `show_icons`
- `show_header`
- `show_background`
- `compact`
- `minimal_mode`
- `show_legacy_details`
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
- le mode du gazon et le type d'arrosage
- les options visuelles de base
- l'affichage optionnel des détails legacy

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

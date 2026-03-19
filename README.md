# 🌱 Gazon Intelligent Card

![Version](https://img.shields.io/github/v/release/kev21brv10/lovelace-gazon-intelligent-card?color=green)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.3.2+-blue)
![License](https://img.shields.io/github/license/kev21brv10/lovelace-gazon-intelligent-card?style=flat-square)

> Une carte Lovelace claire et premium pour lire les décisions de **Gazon Intelligent** en un coup d'œil.

Gazon Intelligent Card affiche dans Home Assistant les décisions métier les plus utiles de ton intégration Gazon Intelligent :
- phase dominante
- sous-phase
- conseil principal
- action recommandée
- action à éviter
- niveau d'action
- état de tonte
- hauteur de tonte conseillée
- arrosage recommandé
- objectif d'arrosage
- type d'arrosage
- risque gazon

---

## 📸 Aperçu

> Ajoute ici une capture Lovelace de la carte finalisée.

---

## ✨ Ce que fait la carte

- affiche une lecture claire et hiérarchisée du moteur Gazon Intelligent
- reste lisible même si certaines entités sont absentes
- s’adapte au thème clair ou sombre de Home Assistant
- met en avant la hauteur de tonte conseillée
- propose un éditeur visuel simple pour la configuration de base

---

## 🧩 Installation via HACS

1. Ajoute ce dépôt dans HACS comme **Frontend / Dashboard card**
2. Installe **Gazon Intelligent Card**
3. Redémarre Home Assistant ou recharge les ressources Lovelace
4. Ajoute la carte dans ton dashboard

### Ressource Lovelace

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
entity_phase: sensor.gazon_intelligent_phase_dominante
entity_sous_phase: sensor.gazon_intelligent_sous_phase
entity_conseil: sensor.gazon_intelligent_conseil_principal
entity_action: sensor.gazon_intelligent_action_recommandee
entity_avoid: sensor.gazon_intelligent_action_a_eviter
entity_niveau: sensor.gazon_intelligent_niveau_d_action
entity_tonte: sensor.gazon_intelligent_etat_de_tonte
entity_hauteur: sensor.gazon_intelligent_hauteur_de_tonte_conseillee
entity_arrosage_recommande: binary_sensor.gazon_intelligent_arrosage_recommande
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_type_arrosage: sensor.gazon_intelligent_type_d_arrosage
entity_risque: sensor.gazon_intelligent_risque_gazon
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
entity_phase: sensor.gazon_intelligent_phase_dominante
entity_sous_phase: sensor.gazon_intelligent_sous_phase
entity_conseil: sensor.gazon_intelligent_conseil_principal
entity_action: sensor.gazon_intelligent_action_recommandee
entity_avoid: sensor.gazon_intelligent_action_a_eviter
entity_niveau: sensor.gazon_intelligent_niveau_d_action
entity_tonte: sensor.gazon_intelligent_etat_de_tonte
entity_hauteur: sensor.gazon_intelligent_hauteur_de_tonte_conseillee
entity_arrosage_recommande: binary_sensor.gazon_intelligent_arrosage_recommande
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_type_arrosage: sensor.gazon_intelligent_type_d_arrosage
entity_risque: sensor.gazon_intelligent_risque_gazon
```

---

## ⚙️ Options principales

- `title`
- `entity_phase`
- `entity_sous_phase`
- `entity_conseil`
- `entity_action`
- `entity_avoid`
- `entity_niveau`
- `entity_tonte`
- `entity_hauteur`
- `entity_arrosage_recommande`
- `entity_objectif_arrosage`
- `entity_type_arrosage`
- `entity_risque`
- `show_icons`
- `show_header`
- `show_background`
- `compact`
- `theme_mode`
- `accent_color`
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

La carte expose un éditeur visuel simple dans Home Assistant pour :
- le titre
- les principales entités
- les options visuelles de base

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

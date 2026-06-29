# Gazon Intelligent Card

<p align="center">
  <strong>La carte Lovelace dédiée à l'intégration Home Assistant Gazon Intelligent.</strong><br>
  Un tableau de bord complet pour piloter la tonte, l'arrosage, le gazon et les produits — pensé pour un usage réel.
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/kev21brv10/lovelace-gazon-intelligent-card?color=2f9e44" alt="Version">
  <img src="https://img.shields.io/badge/HACS-Custom-f57c00" alt="HACS">
  <img src="https://img.shields.io/badge/Home%20Assistant-2026.1.0+-1e88e5" alt="Home Assistant">
  <img src="https://img.shields.io/github/license/kev21brv10/lovelace-gazon-intelligent-card" alt="License">
</p>

## 🌱 Pourquoi cette card

Cette card n'est pas une carte d'irrigation générique.

Elle a été conçue comme **frontend dédié** de l'intégration [`Gazon Intelligent`](https://github.com/kev21brv10/gazon_intelligent), pour afficher proprement sa façade publique :

- décision du moment (arroser, attendre, tondre)
- prochain arrosage et fenêtre optimale
- prochaine tonte et état de la machine
- réserve hydrique et risque gazon
- produits et interventions
- réglages et coordination tondeuse

## ✨ Ce que la card apporte

- **6 onglets** : Synthèse · Arrosage · Tonte · Gazon · Produits · Réglages
- **Onglet Synthèse** : hero actionnable avec icône et titre selon la décision du moment, statut Auto intégré, bandeau canicule si actif, 4 stat-cards (réserve + risque + prochain arrosage + prochaine tonte), pills contexte (phase · ET₀ · pluie attendue)
- **Timeline 24h glissante** : barres d'arrosage par zone sur la fenêtre courante
- **Éditeur visuel natif** : `ha-form` avec sélecteurs d'entités HA (`ha-entity-picker`)
- **i18n FR/EN** : langue détectée automatiquement depuis `hass.locale.language`
- **Validation de config** : avertissements console si les zones sont manquantes
- **`getLayoutOptions()`** : support du redimensionnement en mode grille HA
- Support multi-pelouse (plusieurs instances de l'intégration)
- Thèmes clair et sombre natifs HA

## 🔗 Dépendance

Cette card dépend de l'intégration :

- [`Gazon Intelligent`](https://github.com/kev21brv10/gazon_intelligent)

Elle attend les entités publiques exposées par `Gazon Intelligent`. Elle n'est pas conçue pour consommer un schéma arbitraire d'autres intégrations d'arrosage.

## 📦 Installation

### Via HACS

1. Ouvre **HACS → Frontend**
2. Ajoute `https://github.com/kev21brv10/lovelace-gazon-intelligent-card` comme dépôt personnalisé
3. Choisis la catégorie **Dashboard card**
4. Installe `Gazon Intelligent Card`
5. Recharge les ressources Lovelace ou redémarre Home Assistant

### Ressource utilisée

```yaml
/hacsfiles/lovelace-gazon-intelligent-card/gazon-intelligent-card.js
```

### Installation manuelle

1. Copie [`gazon-intelligent-card.js`](gazon-intelligent-card.js) dans `config/www/gazon-intelligent-card/`
2. Ajoute la ressource Lovelace :

```yaml
resources:
  - url: /local/gazon-intelligent-card/gazon-intelligent-card.js
    type: module
```

## ✅ Compatibilité

- Home Assistant `2026.1.0+`
- Installation via HACS ou manuelle
- Thèmes clair et sombre
- Dashboards classiques et sections (grid layout)

## 🧩 Exemple minimal

```yaml
type: custom:gazon-intelligent-card
title: Gazon Intelligent
```

Fonctionne si les entités standard de l'intégration sont présentes et suivent la convention de nommage `sensor.gazon_intelligent_*`.

## 🧱 Exemple YAML complet

<details>
<summary>Voir l'exemple complet (toutes les clés de configuration)</summary>

```yaml
type: custom:gazon-intelligent-card
title: Gazon Principal
subtitle: Pelouse principale

# Entités principales
entity_assistant: sensor.gazon_intelligent_assistant
entity_meteo: weather.forecast_maison
entity_arrosage_en_cours: sensor.gazon_intelligent_arrosage_en_cours
entity_prochain_arrosage: sensor.gazon_intelligent_prochain_arrosage
entity_dernier_arrosage: sensor.gazon_intelligent_dernier_arrosage_detecte
entity_prochaine_tonte: sensor.gazon_intelligent_prochaine_tonte
entity_tonte_autorisee: binary_sensor.gazon_intelligent_tonte_autorisee
entity_etat_hydrique: sensor.gazon_intelligent_etat_hydrique
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_reserve: sensor.gazon_intelligent_reserve_actuelle
entity_risque: sensor.gazon_intelligent_risque_gazon
entity_phase: sensor.gazon_intelligent_phase_dominante
entity_hauteur_conseillee: sensor.gazon_intelligent_hauteur_de_tonte_conseillee
entity_prochaine_intervention: sensor.gazon_intelligent_prochaine_intervention

# Switches
entity_switch_arrosage_auto: switch.gazon_intelligent_arrosage_automatique_autorise
entity_switch_tondeuse: switch.gazon_intelligent_coordination_tondeuse
pompe_switch: switch.pompe_arrosage

# Zones (liste ordonnée)
zones:
  - name: Zone 1
    switch: switch.zone_1_arrosage
    sensor: binary_sensor.zone_1_active
  - name: Zone 2
    switch: switch.zone_2_arrosage
    sensor: binary_sensor.zone_2_active
```

</details>

## ⚙️ Clés de configuration

<details>
<summary>Toutes les clés supportées</summary>

| Clé | Type | Description |
|-----|------|-------------|
| `title` | string | Titre affiché dans l'en-tête de la card |
| `subtitle` | string | Sous-titre optionnel |
| `entity_assistant` | entity | Capteur assistant (action, reason, moment, quantity_mm) |
| `entity_meteo` | entity (weather) | Entité météo pour le widget en-tête |
| `entity_arrosage_en_cours` | entity | Session d'arrosage active |
| `entity_prochain_arrosage` | entity | Prochain arrosage planifié |
| `entity_dernier_arrosage` | entity | Dernier arrosage détecté (avec `derniers_arrosages` pour la timeline) |
| `entity_prochaine_tonte` | entity | Prochaine tonte (avec `target_date`) |
| `entity_tonte_autorisee` | binary_sensor | Tonte autorisée ou non |
| `entity_etat_hydrique` | entity | État hydrique (reserve_available_ratio, reserve_actuelle_mm) |
| `entity_objectif_arrosage` | entity | Objectif d'arrosage (et0_mm, pluie_demain) |
| `entity_reserve` | entity | Réserve sol (fallback si entity_etat_hydrique absent) |
| `entity_risque` | entity | Risque gazon (faible / modéré / élevé / critique) |
| `entity_phase` | entity | Phase dominante du gazon |
| `entity_hauteur_conseillee` | entity | Hauteur de tonte conseillée |
| `entity_prochaine_intervention` | entity | Prochaine intervention produit |
| `entity_switch_arrosage_auto` | switch | Arrosage automatique activé/désactivé |
| `entity_switch_tondeuse` | switch | Coordination tondeuse activée/désactivée |
| `pompe_switch` | switch | Switch pompe (affiché dans l'onglet Arrosage) |
| `zones` | list | Liste des zones avec `name`, `switch`, `sensor` |

</details>

## 🧪 Développement

<details>
<summary>Build, tests et discipline de publication</summary>

```bash
python3 scripts/build.py                             # régénère le bundle depuis src/
python3 -m unittest discover -s tests -p "test_*.py" # tests de contrat
```

La CI (`Validate`) rejoue ces étapes sur chaque push et PR.

- Toujours rebuilder le bundle après modification des sources
- Publier `bundle + sources ensemble`
- Ne jamais publier seulement `src/` ou seulement le bundle

</details>

## 🚫 Ce que la card ne cherche pas à faire

- Remplacer l'intégration backend
- Inventer une logique métier différente du moteur
- Masquer les incohérences du runtime

Son rôle est d'afficher proprement la façade publique de l'intégration, pas de réécrire ses décisions.

## 📄 Licence

Projet publié sous licence MIT. Voir [`LICENSE`](https://github.com/kev21brv10/lovelace-gazon-intelligent-card/blob/main/LICENSE).

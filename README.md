# Gazon Intelligent Card

<p align="center">
  <strong>La carte Lovelace dédiée à l’intégration Home Assistant Gazon Intelligent.</strong><br>
  Une lecture claire de la tonte, de l’arrosage, des phases, des produits et des réglages, pensée pour un usage réel dans Home Assistant.
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/kev21brv10/lovelace-gazon-intelligent-card?color=2f9e44" alt="Version">
  <img src="https://img.shields.io/badge/HACS-Custom-f57c00" alt="HACS">
  <img src="https://img.shields.io/badge/Home%20Assistant-2026.3.2+-1e88e5" alt="Home Assistant">
  <img src="https://img.shields.io/github/license/kev21brv10/lovelace-gazon-intelligent-card" alt="License">
</p>

## 🌱 Pourquoi cette card

Cette card n’est pas une carte d’irrigation générique.

Elle a été conçue comme **frontend dédié** de l’intégration [`Gazon Intelligent`](https://github.com/kev21brv10/gazon_intelligent), pour afficher proprement sa façade publique:

- assistant
- prochain arrosage
- prochaine tonte
- phase dominante
- produits et interventions
- réglages et coordination tondeuse

Le but est simple:

- réduire le bruit
- faire ressortir la bonne information
- garder une lecture exploitable quand l’état devient plus complexe

## ✨ Ce que la version actuelle apporte

- navigation par onglets:
  - synthèse
  - irrigation
  - tonte
  - gazon
  - produits
  - intervention
  - réglages
- vue prioritaire qui met en avant la vraie décision utile du moment
- lecture cohérente de la tonte, de l’arrosage et du contexte gazon
- suivi d’arrosage en temps réel : mm appliqués **par zone** et **surplus** projeté pendant le cycle (0.10.1)
- bandeau **« 🌙 Arrosage du soir prévu »** dès que le créneau recommandé est le soir (rafraîchissement canicule), avec la plage horaire (0.10.2)
- **refonte ludique complète des 7 onglets (0.10.3 → 0.10.5)** : chaque onglet a sa **mascotte animée** dédiée (réservoir d'eau, pelouse savante, robot tondeuse, brin de gazon, flacon, carnet, engrenage) qui change d'expression selon l'état réel ; détails techniques repliés dans un volet, thème vert doux cohérent, barre d'onglets en pastilles
- **mascottes réactives à la météo (0.10.5)** : décor animé derrière la mascotte (ciel jour/nuit, soleil à rayons, nuages qui dérivent, pluie/neige, étoiles, brume de canicule) selon la **température et la condition réelles** ; la mascotte Synthèse met des **lunettes de soleil** quand il fait beau/chaud, sue en canicule, etc. — animations respectant `prefers-reduced-motion`
- **mode sombre natif (0.10.6)** : palette dédiée pour la refonte ludique (plus de plaques claires sur fond noir) qui suit le thème Home Assistant
- **réserve « affichée » + rafraîchissement du soir probable (0.10.6)** : la jauge d'eau suit la descente progressive de la réserve selon le soleil, et la mascotte annonce un rafraîchissement du soir **probable** tant qu'il n'est pas encore déclenché
- **allègement interne (0.10.6)** : ~2 000 lignes de CSS et de code mort de l'ancien design retirées, le rendu actuel est inchangé
- tuiles synthétiques compactes pour les signaux importants
- support des cas multi-pelouse
- gestion propre des textes longs, des blocages et des fallbacks
- bouton d’action manuelle quand il est pertinent
- rendu pensé pour Home Assistant, pas pour une simple démo

## 🧠 Philosophie

La card suit la structure métier de l’intégration:

1. **Le contexte**
   - phase
   - sous-phase
   - risque
   - fenêtre

2. **La décision**
   - quoi faire
   - pourquoi attendre
   - quand reconsidérer

3. **L’exécution**
   - machine prête ou non
   - coordination active ou non
   - action possible ou non

L’objectif est d’éviter les cartes qui disent tout à la fois sans hiérarchie.

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

1. Copie [`gazon-intelligent-card.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/gazon-intelligent-card.js) dans `config/www/gazon-intelligent-card/`
2. Ajoute la ressource Lovelace:

```yaml
resources:
  - url: /local/gazon-intelligent-card/gazon-intelligent-card.js
    type: module
```

## ✅ Compatibilité

- Home Assistant `2026.3.2+`
- installation via HACS ou manuelle
- thèmes clair et sombre
- dashboards classiques et sections

## 🔗 Dépendance importante

Cette card dépend de l’intégration:

- [`Gazon Intelligent`](https://github.com/kev21brv10/gazon_intelligent)

Elle n’est pas conçue pour consommer un schéma arbitraire d’autres intégrations d’arrosage.

Elle attend les entités publiques et attributs exposés par `Gazon Intelligent`, en particulier:

- `sensor.gazon_intelligent_assistant`
- `sensor.gazon_intelligent_prochain_arrosage`
- `sensor.gazon_intelligent_prochaine_tonte`
- `sensor.gazon_intelligent_prochaine_intervention`

## 📊 Ce que la card affiche le mieux

### Synthèse

- décision prioritaire
- assistant
- niveau global
- prochaine tonte
- prochain arrosage
- derniers repères utiles

### Irrigation

- fenêtre optimale
- objectif d’arrosage
- plan calculé
- arrosage en cours
- dernier arrosage

### Tonte

- état de tonte
- machine
- blocage
- prochaine tonte
- hauteur conseillée

### Gazon

- phase dominante
- sous-phase
- risque
- état hydrique

### Produits / intervention

- catalogue
- produit sélectionné
- prochaine intervention
- niveau de pertinence
- debug intervention si activé

### Réglages

- irrigation automatique
- coordination tondeuse
- débits
- hauteurs
- cooldown reprise tonte

## 🔎 Lecture de la décision

La card privilégie ce qui est réellement utile.

Exemples:

- si le gazon est en `Sursemis`, la vue prioritaire doit parler de tonte interdite
- si l’arrosage est bloqué par pluie suffisante, la vue prioritaire doit parler d’attente météo
- si la machine est indisponible, la card doit distinguer:
  - gazon OK
  - machine non prête

Elle ne se contente donc pas d’afficher des entités à plat.

## 🧩 Exemple minimal

```yaml
type: custom:gazon-intelligent-card
title: Gazon Intelligent
```

Cette version fonctionne si les entités publiques standard de l’intégration sont présentes.

## 🧱 Exemple YAML complet

```yaml
type: custom:gazon-intelligent-card
title: Gazon Principal
show_icons: true
show_header: true
show_background: true
minimal_mode: false
show_advanced_details: false
theme_mode: auto
accent_color: ""
icon_size: 24
border_radius: 24
background_style: glass
show_secondary_info: false
manual_action_service: gazon_intelligent.start_manual_irrigation
manual_action_label: Irrigation manuelle
entity_assistant: sensor.gazon_intelligent_assistant
entity_fenetre_optimale: sensor.gazon_intelligent_fenetre_optimale
entity_weather: weather.forecast_maison
entity_plan_arrosage: sensor.gazon_intelligent_plan_d_arrosage
entity_dernier_arrosage_total_zones: sensor.gazon_intelligent_dernier_arrosage_total_zones
entity_prochain_arrosage: sensor.gazon_intelligent_prochain_arrosage
entity_arrosage_en_cours: sensor.gazon_intelligent_arrosage_en_cours
entity_dernier_arrosage: sensor.gazon_intelligent_dernier_arrosage_detecte
entity_derniere_application: sensor.gazon_intelligent_derniere_application
entity_derniere_action_utilisateur: sensor.gazon_intelligent_derniere_action_utilisateur
entity_catalogue_produits: sensor.gazon_intelligent_catalogue_produits
entity_prochaine_intervention: sensor.gazon_intelligent_prochaine_intervention
entity_prochaine_tonte: sensor.gazon_intelligent_prochaine_tonte
entity_produit_intervention: select.gazon_intelligent_produit_d_intervention
entity_conseil: sensor.gazon_intelligent_conseil_principal
entity_action: sensor.gazon_intelligent_action_recommandee
entity_avoid: sensor.gazon_intelligent_action_a_eviter
entity_debug_intervention: sensor.gazon_intelligent_debug_intervention
entity_niveau_pertinence: sensor.gazon_intelligent_niveau_de_pertinence
entity_prochaine_fenetre_optimale: sensor.gazon_intelligent_prochaine_fenetre_optimale
entity_prochain_blocage_attendu: sensor.gazon_intelligent_prochain_blocage_attendu
entity_arrosage_auto_blocage: sensor.gazon_intelligent_arrosage_auto_blocage
entity_mode: select.gazon_intelligent_mode_du_gazon
entity_switch_arrosage_automatique: switch.gazon_intelligent_arrosage_automatique_autorise
entity_arrosage_recommande: binary_sensor.gazon_intelligent_arrosage_recommande
entity_arrosage_apres_application_autorise: binary_sensor.gazon_intelligent_arrosage_apres_application_autorise
entity_signal_irrigation: binary_sensor.gazon_intelligent_signal_irrigation
entity_signal_intervention: binary_sensor.gazon_intelligent_signal_intervention
entity_objectif_arrosage: sensor.gazon_intelligent_objectif_d_arrosage
entity_objectif_legacy: sensor.gazon_intelligent_objectif_legacy
entity_objectif_depletion: sensor.gazon_intelligent_objectif_depletion
entity_reserve_actuelle: sensor.gazon_intelligent_reserve_actuelle
entity_depletion_ratio: sensor.gazon_intelligent_depletion_ratio
entity_etat_hydrique: sensor.gazon_intelligent_etat_hydrique
entity_et0: sensor.gazon_intelligent_et0
entity_etc: sensor.gazon_intelligent_etc
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
entity_hauteur_coupe_tondeuse: number.gazon_intelligent_hauteur_coupe_tondeuse
entity_switch_coordination_tondeuse: switch.gazon_intelligent_coordination_tondeuse
entity_delai_reprise_tonte_apres_arrosage: number.gazon_intelligent_delai_reprise_tonte_apres_arrosage
manual_action_service: gazon_intelligent.start_manual_irrigation
manual_action_label: Irrigation manuelle
tap_action:
  action: more-info
hold_action:
  action: none
double_tap_action:
  action: none
```

## ⚙️ Options principales

Toutes les clés de configuration supportées par la card:

- `title`
- `show_icons`
- `show_header`
- `show_background`
- `minimal_mode`
- `show_advanced_details`
- `theme_mode`
- `accent_color`
- `icon_size`
- `border_radius`
- `background_style`
- `show_secondary_info`
- `entity_assistant`
- `entity_fenetre_optimale`
- `entity_weather`
- `entity_plan_arrosage`
- `entity_dernier_arrosage`
- `entity_dernier_arrosage_total_zones`
- `entity_prochain_arrosage`
- `entity_prochaine_tonte`
- `entity_derniere_application`
- `entity_derniere_action_utilisateur`
- `entity_catalogue_produits`
- `entity_produit_intervention`
- `entity_debug_intervention`
- `entity_niveau_pertinence`
- `entity_prochaine_fenetre_optimale`
- `entity_prochain_blocage_attendu`
- `entity_arrosage_auto_blocage`
- `entity_signal_intervention`
- `entity_signal_irrigation`
- `entity_prochaine_intervention`
- `entity_conseil`
- `entity_action`
- `entity_avoid`
- `entity_mode`
- `entity_switch_arrosage_automatique`
- `entity_switch_coordination_tondeuse`
- `entity_arrosage_recommande`
- `entity_arrosage_apres_application_autorise`
- `entity_tonte_autorisee`
- `entity_objectif_arrosage`
- `entity_objectif_legacy`
- `entity_objectif_depletion`
- `entity_reserve_actuelle`
- `entity_depletion_ratio`
- `entity_etat_hydrique`
- `entity_et0`
- `entity_etc`
- `entity_type_arrosage`
- `entity_risque`
- `entity_phase`
- `entity_sous_phase`
- `entity_niveau`
- `entity_tonte`
- `entity_hauteur`
- `entity_arrosage_en_cours`
- `entity_debit_zone_1`
- `entity_debit_zone_2`
- `entity_debit_zone_3`
- `entity_debit_zone_4`
- `entity_debit_zone_5`
- `entity_hauteur_min_tondeuse`
- `entity_hauteur_max_tondeuse`
- `entity_hauteur_coupe_tondeuse`
- `entity_delai_reprise_tonte_apres_arrosage`
- `manual_action_service`
- `manual_action_label`
- `tap_action`
- `hold_action`
- `double_tap_action`

## 🧱 Structure du projet

- [`src/gazon-intelligent-card.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/src/gazon-intelligent-card.js): point d’entrée source
- [`src/renderers/layout.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/src/renderers/layout.js): rendu du layout et des panneaux
- [`src/renderers/primitives.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/src/renderers/primitives.js): primitives communes
- [`src/utils/formatters.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/src/utils/formatters.js): formatage et tonalités
- [`src/styles/card-styles.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/src/styles/card-styles.js): styles de la carte
- [`src/editor/editor.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/src/editor/editor.js): éditeur visuel
- [`gazon-intelligent-card.js`](/Users/kevin/vs%20code/Github/lovelace-gazon-intelligent-card/gazon-intelligent-card.js): bundle distribué

## 🧪 Développement

Scripts disponibles:

```bash
python3 scripts/build.py
python3 scripts/validate.py
```

La release locale habituelle:

```bash
python3 scripts/build.py
python3 scripts/validate.py
```

Discipline de publication:

- mets à jour les sources
- rebuild le bundle
- valide le dépôt
- publie toujours le `bundle + sources ensemble`
- ne publie jamais seulement `src/` ou seulement `gazon-intelligent-card.js`

## 🚫 Ce que la card ne cherche pas à faire

- remplacer l’intégration backend
- inventer une logique métier différente du moteur
- masquer les incohérences du runtime

Son rôle est d’afficher proprement la façade publique de l’intégration, pas de réécrire ses décisions.

## 📄 Licence

Projet publié sous licence MIT. Voir [`LICENSE`](https://github.com/kev21brv10/lovelace-gazon-intelligent-card/blob/main/LICENSE).

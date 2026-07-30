# Changelog

## [0.21.2] - 2026-07-30

Regroupe **0.15.0 → 0.21.2**, jamais publiées séparément. La carte passe d'un tableau de bord
qui affiche des valeurs à un tableau de bord qui **explique** et **agit**.

### Ajouté
- **Briefing en langage courant** (onglet *Synthèse*) : quatre phrases qui disent ce qui a été
  arrosé, où en est la réserve, pourquoi rien n'est prévu et ce qu'attend la tonte. Écrit pour
  être compris sans connaître le vocabulaire agronomique.
- **Bandeau météo** en en-tête : température, min/max, humidité, vent, pluie attendue, UV et
  point de rosée — l'information manquait entièrement.
- **Hauteur de gazon estimée** (onglet *Tonte*) : jauge verticale, hauteur du jour et reste à
  pousser avant la cible. Elle peut légitimement stagner (chaleur, sol sec) — c'est affiché.
- **Popup « Déclarer un produit appliqué »** (onglet *Produits*) : produit, date, dose et note,
  sans passer par les Outils de développement.
- **Historique produits étendu** : 12 applications, dépliables, avec type, dose et note.
- **Les services de l'intégration dans leur onglet** : chacun là où il sert ; ceux sans place
  naturelle rejoignent *Réglages*, derrière une popup.
- **Actions rapides contextuelles** : « J'ai arrosé à la main », « J'ai tondu », « Annuler la
  dernière application » — affichées seulement quand elles ont un sens.
- **Onglets défilables** avec suivi de la position (`_suivreDefilementOnglets`) : lisible sur
  téléphone sans rogner les libellés.

### Modifié
- **Boutons alignés sur la grammaire visuelle de la carte** (rayon 14 px, bordure 1,5 px, même
  fond que les cartes de zone) — mesuré sur les cartes existantes, pas approximé.
- **Nouveau jeton `--gi-surface-2`** pour les surfaces secondaires, en `color-mix` sur la
  surface principale : suit automatiquement les thèmes clair et sombre.
- **Vocabulaire des zones** : « zone » partout, plus de « CH1 » hérité du matériel.

### Corrigé
- **Motif de tonte tronqué** : `split('.')` coupait sur n'importe quel point, y compris la
  décimale d'une température — « Trop chaud pour tondre (32,0 °C… » devenait « …pour tondre (32 ».
  Le découpage utilise désormais « point suivi d'une espace », comme ailleurs dans le fichier.
- **Espacement doublé dans *Réglages*** : un titre de section maison ajoutait ses propres marges
  par-dessus celles de `.section-title`.

### Outillage
- **Garde mécanique contre l'accent grave dans le bloc CSS** (`scripts/validate.py`). Le CSS vit
  dans un gabarit JavaScript : un seul accent grave le referme, une partie du CSS devient du code,
  et la carte ne s'enregistre plus. `node --check` ne le voit pas — le fichier reste valide.
  Arrivé trois fois ; ne peut plus arriver.

## [0.14.4] - 2026-07-29

### Corrigé
- **Le bandeau « bloqué par la pluie » n'est JAMAIS apparu depuis sa création.** La carte lisait `block_reason_code` sur le capteur « Prochain arrosage », attribut qui n'existe pas là — il n'existe que sur les entités de tonte (`mowing_block_reason_code`). Le code valait donc toujours `''`, le test `includes('pluie')` toujours faux, et la pluie héritait du bandeau orange générique ⏳ au lieu du bandeau bleu 🌧️. Défaut parfaitement muet : aucune erreur, aucun test rouge. L'attribut correct est `block_reason`.

## [0.14.3] - 2026-07-29

### Corrigé
- **Le graphe des 24 h pouvait rester entièrement VIDE malgré des arrosages réels.** Deux causes empilées, toutes deux introduites ou révélées par les correctifs précédents de la journée.
- **L'entité était résolue par `entity_id`, absent des réponses compactées.** Avec `minimal_response=true`, les entrées compactées ne portent pas d'`entity_id` et rien ne garantit que la première de chaque liste l'ait. Le `if (!entityId) return;` abandonnait alors la zone **en silence** : piste déserte, et pire, une liste pouvait être attribuée à la mauvaise zone — ce qui expliquait que la corruption change de zone d'un rafraîchissement à l'autre. Home Assistant renvoyant les listes dans l'ordre de `filter_entity_id`, la **position** est désormais l'information de référence et l'`entity_id` un simple contrôle quand il est présent.
- **Le choix de la source ignorait la fenêtre affichée.** Trancher sur « l'historique brut est-il non vide ? » laissait de vieilles sessions hors fenêtre faire gagner cette source, qui n'avait alors rien à montrer — sans jamais laisser sa chance au repli. La décision porte maintenant sur ce que chaque source dit **de la fenêtre affichée**. Vérifié sur les données réelles des trois zones, dont une à l'historique tronqué : elle bascule proprement sur le repli au lieu de rester vide.

## [0.14.2] - 2026-07-29

### Corrigé
- **Une barre de 144 heures (6 jours) pour une vanne qui n'avait tourné que 52 minutes.** Quand l'historique reçu se termine sur un `on` jamais suivi d'un `off`, le parseur refermait la session à `Date.now()` — fabriquant un aplat qui recouvrait tout le graphe et écrasait les vrais créneaux, pendant que le chip annonçait « 1 sess. ». Une session encore ouverte n'est désormais retenue **que si la vanne est réellement allumée maintenant** ; sinon l'historique est incomplet (entrée synthétique de début de fenêtre, purge du recorder, réponse tronquée) et on ne dessine rien. Une barre manquante se remarque, une barre fausse se croit.
- **Garde-fou de plausibilité sur la durée.** Le plan d'arrosage borne chaque zone à 180 min ; toute session dépassant 6 h, non finie ou de durée négative est écartée. Vérifié : le cas corrompu passe de 144 h à rien, les vraies sessions (2 × 26 min) et un arrosage en cours restent intacts.

## [0.14.1] - 2026-07-29

### Corrigé
- **Le graphe des 24 h dessinait chaque arrosage DEUX FOIS.** Il concaténait l'enregistrement de l'intégration et l'historique brut des vannes sous un commentaire affirmant qu'ils étaient « deduplicated by overlap » — ce que le code ne faisait pas. L'historique brut des vannes est la **vérité terrain** (il date les ouvertures réelles) ; la reconstruction depuis `derniers_arrosages` n'est plus qu'un repli, pour les périodes purgées par le recorder ou les interrupteurs non suivis.
- **La reconstruction ignorait la pause entre passages.** Elle remonte depuis la fin de session en soustrayant les seules durées de zone. Vérifié sur les données réelles du 28/07/2026 : le premier passage était tracé à **04:10 alors qu'il a eu lieu à 03:45** — les 25 minutes de pause manquantes. Le repli reste approximatif par construction, d'où sa rétrogradation.
- **Les barres et les totaux lisaient deux sources différentes.** Les barres venaient des deux sources concaténées, les chips « Z1 52 min · 2 sess. » de la seule reconstruction : un total juste pouvait donc accompagner un tracé faux, sans que rien ne le signale. Source unique désormais, et les totaux sont bornés à la fenêtre affichée — ils étaient calculés sur les 7 jours récupérés, sous un graphe de 24 h.

## [0.14.0] - 2026-07-28

### Corrigé
- **La mise en évidence « canicule » ne se déclenchait JAMAIS.** Les deux conditions étaient mortes : `canicule_active` n'a jamais existé côté intégration, et les codes d'action valent `aucune_action` / `surveiller` / `a_faire` / `critique` — aucun ne contient « canicule ». Le bandeau ne passait donc jamais en rouge, même pendant un arrosage de **survie**. Il s'appuie désormais sur `survie_canicule_active`, exposé par l'intégration ≥ 0.20.3 (vraie canicule : ≥ 32 °C réels **et** réserve quasi vide). Volontairement **pas** basé sur `heat_stress_level`, qui est un score composite disant déjà « severe » dès 30 °C via l'ET0 et l'air sec — il alarmerait pour rien.

### Ajouté
- **Pastille de qualité de l'ET₀**, visible **uniquement en cas de repli**. Depuis que le bilan du sol est piloté par une ET₀ calculée heure par heure (intégration 0.19.0), savoir si elle tourne sur des capteurs réels ou sur des valeurs de repli change la confiance qu'on peut lui accorder : un vent **prévu** au lieu de mesuré donnait 9 mm/j au lieu de 6. « ET₀ approchée » signale un rayonnement ou une pression non mesurés (détail en infobulle), « ET₀ estimée » un calcul horaire indisponible. En marche normale, aucune pastille.

### Supprimé
- **320 Ko de code mort** : `src/constants.js`, `src/renderers/`, `src/utils/`, `src/styles/`, `src/editor/` — vestiges d'un découpage modulaire abandonné (fichiers datés d'avril à juin, alors que la carte livrée est de fin juillet). Le script de build ne copie qu'un seul fichier, le bundle livré n'a **aucun import**, et ni les tests ni les scripts n'y font référence. Ce code fantôme induisait activement en erreur : un audit du contrat d'attributs commencé sur `src/constants.js` analysait une liste qui n'a plus aucun effet. Les 40 tests (8 comportement + 32 contrat) passent à l'identique après suppression.

## [0.13.1] - 2026-07-27

### Corrigé
- **Journal « Dernières sessions » aligné sur la fenêtre 7 jours du budget** : l'en-tête (durée cumulée · N sessions) **et** la liste des sessions retenaient les N derniers enregistrements sans limite de date, alors que la jauge de budget compte une fenêtre de **7 jours calendaires**. Après la correction de cette fenêtre côté intégration (0.18.1), un arrosage à J‑7 pouvait donc apparaître dans le journal tout en étant **exclu du budget** — les deux ne racontaient plus la même histoire (ex. « total reçu 33 mm » vs des sessions listées totalisant plus). Le journal filtre désormais sur la **même règle** (delta ≤ 6, soit 7 jours calendaires). Nécessite l'intégration ≥ 0.18.1 pour une cohérence parfaite ; sur une version antérieure, le filtrage reste correct côté carte.

### Ajouté
- **Prochain jour d'arrosage estimé** (onglets *Synthèse* et *Arrosage*) : quand aucun arrosage n'est dû (réserve en confort), la carte affiche désormais le **jour estimé** du prochain arrosage — « Demain », un jour de semaine au-delà (« mer. 29 juil. »), ou « imminent » — au lieu de n'afficher que la fenêtre horaire. Sur la Synthèse, le stat-card *Prochain arrosage* montre le jour + « estimé · fenêtre » ; sur l'onglet *Arrosage*, un hero *💧 Demain — estimé · à l'aube* apparaît là où il n'y avait rien en confort. Lu depuis les nouveaux attributs `jours_avant_arrosage_estime` / `date_prochain_arrosage_estime` de l'intégration (**≥ 0.18.0**). L'estimation **ne s'affiche pas** quand l'arrosage est bloqué (le blocage prime) ou déjà dû (fenêtre + dose priment). Comme elle ne regarde que la **soif du sol** (réserve → MAD) et non le garde-fou hebdo, la mention « **sous réserve du budget** » est ajoutée quand le budget hebdomadaire est dépassé — pour ne pas sur-promettre un jour où l'arrosage pourrait être retenu. Sans l'intégration ≥ 0.18.0, la carte se comporte comme avant.

### Corrigé
- **En-tête « Dernières sessions » — total 7 jours faux (« 36 min »)** : l'en-tête calculait le temps de vanne en relisant l'historique **brut des interrupteurs** dans le navigateur, ce qui **sous-comptait** lourdement (sur un Sonoff qui passe en `unavailable` à chaque redémarrage, le total tombait à une seule session — « 36 min / 3 activations » alors que la liste en dessous montrait 7 sessions). Il résume désormais fidèlement le **journal des sessions affiché juste en dessous** (mêmes enregistrements de l'intégration) : durée de vanne cumulée + nombre de sessions. Plus de libellé « 7 jours » (la liste est plafonnée aux dernières sessions ; le vrai total 7 j en mm reste la jauge de budget). Bonus : la section « Dernières sessions » (budget + en-tête + journal) ne dépend plus du tout de l'historique navigateur — elle reste correcte et visible même si ce fetch échoue.

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

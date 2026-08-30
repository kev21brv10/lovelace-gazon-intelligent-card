# Changelog

## 0.28.0

**La hauteur de coupe RÉELLE fait référence, et les durées passent en heures.** 36 tests verts.

### La cible était un réglage de lame déguisé en objectif de pousse

`hauteur_tonte_recommandee_cm` est ce que l'intégration **conseille de régler sur la lame** —
le code l'écrit mot pour mot : « ne pas descendre sous X cm ». Ce n'est pas une hauteur que
l'herbe doit atteindre. La carte l'affichait pourtant en « HAUTEUR CIBLE », puis annonçait :

```
5,5 cm de haut aujourd'hui
il lui reste 0,5 cm à pousser avant la cible de 6,0 cm
```

⚠️ **Et cette phrase ne pouvait jamais disparaître.** La lame est réglée à 5,5 cm
(`tondeuse_hauteur_coupe_mm` = 55) et c'est de cette hauteur que l'herbe repart après chaque
tonte. Le gazon était donc **structurellement** à 0,5 cm sous une cible inatteignable, et le
message se réaffichait après chaque tonte, indéfiniment.

⚠️ Le commentaire du code montre que ce cas précis avait déjà été vu le 30/07/2026 — il
affichait alors « déjà à la hauteur voulue », ce qui était faux. Le correctif d'alors a
introduit la formule « il lui reste à pousser ». **Le correctif à moitié appliqué, une fois
de plus.**

**Arbitré par Kévin le 30/08/2026 : la hauteur réelle de la lame fait foi, la recommandation
reste une recommandation.**

- La tuile affiche `5,5 cm · réglée sur la lame · recommandé 6,0 cm`. L'écart devient **visible
  et actionnable** au lieu d'être masqué — et la mention disparaît quand les deux coïncident.
- Le bloc de pousse se compare à la **lame réelle** : « pile à la hauteur de coupe » juste après
  une tonte, « X cm à couper pour revenir à 5,5 cm » quand l'herbe a repoussé.
- La phrase « il lui reste … à pousser avant la cible » est supprimée. Un test vérifie qu'elle
  ne revient pas sur le cas exact de l'écran (herbe 5,5 · lame 5,5 · recommandation 6,0).

### Les durées de tonte en heures

« Tondu aujourd'hui 108 min » et « passe médiane 86 min » demandaient une conversion mentale à
chaque lecture, alors qu'un travail complet dure 4 à 5 h. Elles s'écrivent désormais
**1 h 48** et **1 h 26**. Sous l'heure, les minutes restent (« 12 min »), et l'heure pile ne
s'écrit jamais « 2 h 00 ».

⚠️ **J'avais commencé par écrire un second formateur** avant de voir que `fmtDuration` existait
déjà et faisait exactement la même chose. Doublon supprimé — c'est le défaut n°1 de ce projet,
et il a failli passer dans le correctif qui le documente.

Les **4 mutations** du banc sont détectées par le test visé.

## 0.27.1

**Le bloc « travail de tonte » lisait le mauvais capteur — il ne s'affichait pas.** 30 tests verts.

Livré en 0.27.0, vérifié en rendu, testé… et **invisible sur l'installation**. Les attributs du
travail sont publiés sur `sensor.…_etat_de_tonte`, pas sur le binaire `…_tonte_autorisee` que
le bloc interrogeait.

⚠️ **Mes tests encodaient mon hypothèse, pas la réalité** : ils posaient les attributs sur le
binaire, donc ils passaient tous pendant que la production restait muette. Et le garde
« absence ≠ zéro » a fait exactement son travail — il a masqué le bloc au lieu d'afficher une
rangée de tirets — ce qui était le bon comportement mais **cachait l'erreur**.

- Nouvelle entrée `entity_etat_tonte`, déduite du défaut **résolu** comme les autres (même
  patron qu'en 0.26.5), donc elle suit le préfixe de l'instance.
- **Un test vérifie désormais les deux sens** : le bloc s'affiche avec les attributs sur le
  capteur d'état, et **ne s'affiche pas** quand ils sont sur le binaire. C'est le fait réel
  qui est encodé, plus mon hypothèse.
- Rendu vérifié sur les attributs **copiés tels quels depuis Home Assistant**, pas sur une
  fixture écrite à la main.
- `retour_autonome` ajouté aux motifs de fin de passe — vu en production, il manquait.

## 0.27.0

**La carte montre enfin le TRAVAIL de tonte.** 29 tests verts.

L'intégration publiait la progression du travail, l'état de la déclaration et le bilan de la
journée. La carte n'en lisait **aucun** — on venait y chercher « est-ce qu'elle a fini ? » sans
pouvoir le savoir. Nouveau bloc dans l'onglet Tonte, sous les pastilles :

```
Travail de tonte                        55 % · en cours
████████████░░░░░░░░░░░
Déclaration : Pas encore — travail inachevé
Tondu aujourd'hui 108 min · 2 passes · batterie vide · passe médiane 86 min
```

- **La barre suit `mower_job_progress_pct`**, et l'état dit ce que le chiffre veut dire :
  *en cours*, *terminé*, ou *aucun travail en cours* — parce que 100 % est l'état de **repos**
  entre deux travaux, pas un événement (cf. intégration 0.61.0).
- **La déclaration dit POURQUOI rien n'est inscrit**, pas seulement que rien ne l'est : travail
  inachevé, trop court (avec le plancher en minutes), déjà inscrite, déclaration coupée. ⚠️ Le
  vert est réservé à une tonte **réellement inscrite** — un test vérifie que « travail inachevé »
  ne passe pas pour une réussite alors même que les minutes dépassent l'ancien seuil.
- **Le bilan du jour** : minutes tondues, nombre de passes accordé au singulier, motif de fin de
  la dernière passe, et la médiane du carnet pour situer la journée.
- **⚠️ Absence ≠ zéro.** Sans aucune mesure — tondeuse injoignable — le bloc ne s'affiche pas du
  tout, plutôt qu'une rangée de tirets qui se lirait comme des zéros mesurés.
- Libellés en français et en anglais. Les **6 mutations** du banc sont détectées par le test visé.

## 0.26.6

**Trois défauts remontés par la revue automatique de la PR, tous réels.** 25 tests verts.

**⚠️ Un clic pouvait déclencher SIX appels de service — régression introduite par la 0.26.2.**
Depuis que `_render` **préserve** les blocs dont le HTML n'a pas changé, un élément d'action
survit aux rendus. Or `_bindEvents` lui rajoutait un écouteur à **chacun** : mesuré sur cinq
rendus, un seul clic émettait **six** `switch.toggle`. Même chose pour un arrosage manuel ou
une déclaration de produit. Le garde posé sur la barre d'onglets en 0.26.2 n'avait pas été
étendu aux éléments d'action — le correctif à moitié appliqué, encore une fois.

- Le marqueur est une **propriété JS**, pas un `data-*` : un attribut apparaîtrait dans
  `outerHTML`, que `_render` compare pour décider de préserver — le bloc serait reconstruit à
  chaque rendu, ce qui annulerait justement l'optimisation qu'on protège.
- ⚠️ **Le premier test écrit ne mordait pas** : cinq `set hass` d'affilée produisent un HTML
  identique, donc `_render` sortait par son raccourci de coût et `_bindEvents` ne repassait
  jamais. Le test réécrit reproduit le vrai mécanisme — un rendu relancé pendant que le bloc
  reste identique — et compte **six** appels sans le garde, un avec.

**Trois variables CSS n'existaient pas.** `--gi-line`, `--gi-card` et `--gi-ink` étaient
référencées sans être définies nulle part ; les vraies sont `--gi-border`, `--gi-bg` et
`--gi-text`. Le navigateur jette ces déclarations : le sélecteur de hauteur de coupe retombait
sur les couleurs par défaut de l'agent — illisibles en thème sombre — et le repère de plancher
du budget était carrément **transparent**. Un test compare désormais les variables utilisées à
celles définies.

**« ⏸ Semaine couverte » se calculait au lieu de se lire.** Franchir `weekly_guardrail_mm_min`
ne suffit pas à retenir l'arrosage : la retenue est **conditionnelle** (trois arrosages, le
plancher franchi ET un besoin faible) — le commentaire de la carte le dit lui-même trois lignes
plus bas. La ligne s'affichait donc pendant que l'arrosage restait autorisé, et contredisait le
motif de blocage du hero du même écran. `held` lit maintenant `_budgetOver()`, dont le
commentaire écrivait déjà la règle : **on lit la décision de l'intégration, on ne la recalcule
pas.**

Les **4 mutations ciblées** sont détectées par le test visé. Le garde du `<select>`, posé par
symétrie, n'a **pas** de test dédié : il suit le même patron que celui du clic, qui, lui, est
verrouillé.

## 0.26.5

**Trois entités se déduisaient de la config brute, pas du défaut** — 22 tests verts.

`entity_hauteur_gazon_estimee`, `entity_catalogue_produits` et `entity_derniere_application`
n'ont pas de défaut à elles : elles se déduisent d'une autre entité pour suivre le préfixe de
l'instance (une seconde instance porte un autre préfixe, un `gazon_intelligent_` figé la ferait
lire les valeurs de la première). Mais la déduction lisait `config.entity_…`, la valeur **brute**,
au lieu du défaut résolu. Une carte qui ne déclarait pas la source les laissait donc à
`undefined` — muettes en silence : pas de hauteur du jour dans l'onglet Tonte, pas de dernière
application dans Produits, pas de catalogue dans le popup de déclaration — alors que toutes les
autres entités de la carte, elles, avaient un défaut.

- La source est résolue **une seule fois** avant l'objet de config, défaut compris, et les trois
  déductions partent de là. Une carte sans aucune entité déclarée retombe désormais sur les
  bonnes entités ; une carte qui déclare un autre préfixe le garde.
- `entity_derniere_application` était déclarée **deux fois** dans le même littéral : la seconde
  écrasait la première en silence, et son défaut explicite était mort. Une seule déclaration.
- Trois tests, dont les deux mutations qui comptent : défaut retiré de la déduction, et préfixe
  figé en dur.

Les deux cartes de l'installation déclarent déjà leurs sources : leur rendu est inchangé,
vérifié onglet par onglet sur les valeurs réelles avant et après.

## 0.26.4

**Tour de carte complet du 29/08/2026** — les six onglets rendus avec les valeurs RÉELLES de
l'installation, puis chaque anomalie vérifiée dans le code avant d'être retenue. Deux défauts.

**La version affichée en Réglages était figée à `0.26.0`** pendant les 0.26.1, 0.26.2 et
0.26.3. Son commentaire affirmait pourtant qu'elle était « tenue par `scripts/build.py` depuis
`package.json` » — c'était faux, le script ne l'a jamais touchée. Or l'onglet Réglages est
exactement l'endroit où l'on regarde quelle version le navigateur a réellement chargée après
avoir vidé son cache : **une version qui ment y est pire que pas de version.**

- Le build **injecte** désormais la version de `package.json`, dans la source comme dans le
  bundle, et échoue bruyamment s'il ne trouve pas la constante.
- Deux tests : le bundle doit annoncer la version de `package.json`, et l'onglet Réglages doit
  l'afficher. Les mutations qui comptent sont vérifiées — bump sans rebuild, et build qui
  n'injecte plus rien.

**« 1 sessions »** — le compteur de sessions ne s'accordait pas au singulier. Nouvelle clé
`session_n` dans les deux langues.

⚠️ **Deux fausses pistes écartées avant d'être annoncées**, faute d'être vérifiées : la carte
rendue en anglais (mon banc n'avait pas de langue) et « aucune session récente » (mon jeu de
données était vide). Et une troisième, plus vicieuse : une extraction hâtive annonçait
**42 clés de traduction manquantes** — l'expression régulière ne lisait qu'une indentation
sur deux. Il n'en manque aucune.


## 0.26.3

**La carte ne se redessine plus en entier — « c'est comme si ça s'actualisait ».**

La 0.26.2 avait sauvé la barre d'onglets, mais tout le reste — en-tête, barre météo, contenu —
était encore remplacé d'un bloc. Or la carte affiche **l'heure courante** : chaque minute, tout
le contenu disparaissait et réapparaissait alors que **seule la barre météo** avait changé.

- **Remplacement bloc par bloc** : chaque bloc de premier niveau est comparé à son
  remplaçant, et seuls ceux qui diffèrent sont échangés. Un tic d'horloge ne touche plus au
  contenu ; le défilement de la page reste intact.
- Si la structure change (barre météo qui apparaît, popup qui s'ouvre), rendu complet — mais
  la barre d'onglets est toujours réinjectée vivante.
- **16 tests, 6 mutations** vérifiées.

⚠️ Le banc a montré que la comparaison globale du rendu (0.26.1) était devenue **redondante
pour le comportement** : le remplacement bloc par bloc ne toucherait à rien de toute façon.
Elle est conservée comme raccourci de **coût** — `set hass` arrive plusieurs fois par seconde
et sans elle on analyserait le HTML dans un tampon pour ne rien faire — et elle est désormais
testée pour ce qu'elle est : l'absence de travail, pas l'absence de changement à l'écran.

⚠️ Deuxième test à réécrire en deux versions : « un état qui change reconstruit bien le DOM »
exigeait que la carte ENTIÈRE soit reconstruite. Il décrivait le défaut, pas l'objectif.


## 0.26.2

**La barre d'onglets n'est plus jamais recréée.** La 0.26.1 restaurait sa position après
coup ; retour de Kévin : « c'est un peu mieux ». Un peu, pas assez — et pour une raison que
la restauration ne pouvait pas couvrir.

Recréer l'élément **au milieu d'un geste** tue l'inertie du doigt. Quand on lui rend son
`scrollLeft`, le geste est déjà cassé. Et la carte affiche l'heure courante (`meteo-time`),
donc son rendu change **au moins chaque minute** : la barre était reconstruite en boucle quoi
qu'il arrive.

- **Le nouveau rendu est bâti dans un tampon, puis la barre VIVANTE y est réinjectée** — un
  vrai déplacement de nœud, pas une sérialisation — avant que l'ensemble ne rejoigne la carte.
  La barre traverse l'opération sans jamais être recréée : position **et** geste intacts.
- Seule chose qui change en elle : quel onglet porte la classe `active`.
- **Le branchement des clics devient idempotent.** Sans ce garde, une barre préservée
  accumulait un écouteur par rendu — un seul clic aurait fini par déclencher des dizaines de
  re-rendus. Une mutation le vérifie.
- 14 tests, **5 mutations** vérifiées.

⚠️ Un test de la 0.26.1 est devenu faux et a dû être remplacé : il exigeait que la barre
**soit** recréée, puisqu'il décrivait l'ancien correctif. Il vérifie désormais l'inverse.


## 0.26.1

**La barre d'onglets ne défile plus sur téléphone — corrigé.** Signalé le 26/08/2026 :
« j'arrive pas à la faire défiler, elle revient sans cesse au début ».

`set hass` est appelé à **chaque changement d'état dans tout Home Assistant**, plusieurs fois
par seconde, et `_render()` faisait `card.innerHTML = …` à chaque appel. La quasi-totalité de
ces changements ne concerne pas la carte : on reconstruisait un DOM identique en boucle.

Or la barre d'onglets défile horizontalement sur écran étroit. La détruire et la recréer
remet son `scrollLeft` à zéro — et sur mobile, remplacer l'élément **en plein geste tue
l'inertie du doigt**, d'où l'impression qu'elle ne défile pas du tout.

- **On compare la sortie RÉELLE** avant de toucher au DOM : si le HTML rendu est identique,
  on ne redessine pas. Comparer la sortie plutôt que deviner quelles entités comptent garantit
  qu'aucune mise à jour ne peut être ratée — c'est le rendu qui décide, pas une liste à tenir.
- **La position de défilement est restaurée** quand le rendu change vraiment.
- Trois tests, quatre mutations vérifiées — dont celle qui lit la position *après* le
  remplacement, et celle qui ne redessine plus jamais.

⚠️ Le premier test écrit ne mordait pas : il ne déclenchait pas de vrai re-rendu, donc il
validait un élément jamais remplacé. Il assure désormais que la barre a bien été recréée
avant de vérifier que sa position a survécu.


## [0.26.0] - 2026-08-06

### Corrigé
- **La carte lisait le nouvel état « Retenu » comme « pas bloqué ».** L'intégration 0.48.0
  distingue désormais « Non requis » (le gazon n'a besoin de rien) de « **Retenu** » (l'objectif
  est à 0 *parce qu'*un garde-fou retient l'eau). Les deux tests de blocage de la carte ne
  connaissaient que « Bloqué » : le hero et l'estimation auraient affiché une situation sereine
  pendant que l'eau était retenue. Les deux comparaisons couvrent maintenant les deux états.

## [0.25.1] - 2026-08-04

### Corrigé
- **La liste des sessions affichait l'heure de FIN du cycle.** `recorded_at` est l'instant où
  l'intégration enregistre la session, c'est-à-dire la fermeture de la dernière vanne : un
  arrosage parti à 03:45:13 s'affichait « 05:18 ». Elle lit désormais `started_at`
  (intégration 0.41.0), avec repli sur l'ancien champ pour les sessions plus anciennes.

## [0.25.0] - 2026-08-03

### Ajouté
- **Hauteur de coupe réglable depuis l'onglet Réglages.** Beaucoup de robots — dont celui de
  Kévin — ne publient pas leur hauteur de coupe : elle se saisit à la main. Or c'est le POINT
  ZÉRO du modèle de pousse (`hauteur du gazon = hauteur de coupe + ce qui a poussé depuis`).
  La régler ailleurs qu'à l'endroit où on lit la hauteur, c'est garantir qu'on l'oubliera après
  avoir tourné la molette — et toute l'estimation part alors de travers, sans qu'aucun capteur
  puisse le détecter. Deux boutons, la valeur en cm, bornée par les min/max de l'entité.

### Corrigé
- **« Pas d'arrosage pour l'instant : robot indisponible… »** — le résumé lisait la raison de
  l'ASSISTANT, qui est une chaîne de priorités : quand l'arrosage n'a rien à signaler, elle
  descend sur la tonte. La carte annonçait donc un motif de tondeuse comme raison de ne pas
  arroser, pendant que la tuile juste dessous affichait le vrai motif (« Déjà arrosé
  aujourd'hui »). Deux lignes, un même écran, une vraie et une fausse. Le résumé lit désormais
  le motif de l'entité ARROSAGE.

## [0.24.0] - 2026-08-01

### Ajouté
- **« Le sol réclame toujours X mm »** sous un arrosage retenu. L'entité « Objectif d'arrosage »
  affiche 0 pendant un blocage — c'est juste, rien ne sera versé — mais la carte laissait alors
  croire que le gazon n'avait besoin de rien, réserve sous le seuil comprise. Le besoin réel
  vient du nouvel attribut `besoin_mm` (intégration 0.35.0) ; sans lui, la ligne ne s'affiche
  simplement pas.

### Outillage
- **Le validateur vérifie la syntaxe du fichier construit** (`node --check`). Une virgule
  manquante dans le dictionnaire de chaînes suffit à rendre la carte inchargeable — écran
  blanc, aucun message. Cas réel ce jour : build et validation au vert sur un fichier qui ne
  parsait pas.

## [0.23.1] - 2026-07-31

Deux défauts trouvés en rechargeant le banc avec **toutes** les valeurs réelles de
l'installation, tirées de Home Assistant. Aucun des deux n'apparaissait sur le jeu d'essai
précédent : les attributs concernés y étaient simplement absents, donc les blocs qui les
affichent ne s'affichaient pas.

### Corrigé
- **« 0 % · blocked » dans l'en-tête Produits.** L'état interne de l'intégration, en anglais,
  collé à un score qui ne veut rien dire quand rien n'est recommandé. L'état est traduit
  (« Bloqué », « À préparer », « Recommandé »), et le score n'apparaît que s'il porte une
  information — au-delà de 0.
- **« · 0,0 mm » sans étiquette dans le Bilan.** `pluie_efficace` s'affichait nu, derrière
  l'arrosage 7 j : rien ne disait que c'était de la pluie, et à zéro la mention n'apprend rien.
  Étiquetée, et masquée quand elle vaut zéro.

## [0.23.0] - 2026-07-31

Tour complet des six onglets, avec les vraies valeurs de l'install. Quinze défauts.

### Corrigé — ce qui trompait sur une décision
- **L'onglet Arrosage promettait encore « imminent ».** Le titre disait « ⏳ Garde-fou
  hebdomadaire », le sous-titre juste dessous « estimé imminent · sous réserve du budget ». La
  nuance ne se lit pas : l'œil retient « imminent ». Et l'estimation répondait à une question
  que personne ne pose — « quand le sol aura soif » — pendant que le titre répondait à « est-ce
  que j'arrose ». Les deux sous-titres (héros Arrosage ET tuile Synthèse) disent désormais la
  même chose que la jauge, dans les mêmes mots : « semaine couverte · reprise dès que le besoin
  remonte ».
- **Le même fait était vert en haut et orange en bas.** La règle de la carte — « l'orange est
  une ALERTE, pas un état d'attente » — était violée par la jauge de budget elle-même : `held`
  la peignait en orange pendant que le héros du même écran restait vert. L'orange est rendu à
  ce qu'il signale vraiment : on approche du plafond dur (≥ 80 %).
- **« À surveiller » était collé sur la ligne de la tondeuse.** Ce badge porte `tonte_statut`,
  qui juge LA TONTE (donc le gazon), pas la machine. On lisait « Esperance Jr · À la station ·
  100 % — À surveiller » : la tondeuse avait l'air en défaut alors qu'elle était chargée et
  déclarée disponible. Deux axes, deux badges : la machine porte le sien, le verdict de tonte
  est explicitement étiqueté « Tonte : … ».
- **`confort` et `depletion` s'affichaient bruts, en minuscules.** La table `HYDRIC_LABELS` avait
  été écrite contre un vocabulaire que l'intégration n'utilise plus : elle listait `stress`,
  `optimal`, `charge`, `vide` — quatre entrées mortes — et ne couvrait NI `confort` NI
  `depletion`, les deux états les plus fréquents. Table alignée sur les quatre états réels, et
  le repli capitalise désormais au lieu de rendre la clé telle quelle.

### Ajouté
- **La pousse du jour** (`+ 0,17 cm poussé aujourd'hui`) : l'intégration la calcule heure par
  heure et rien ne l'affichait — c'est la seule preuve visible que le modèle de pousse tourne.
- **L'état du créneau de tonte** (`Créneau : À éviter`) : calculé, utilisé par le flow Node-RED,
  jamais montré.
- **Les deux nombres qui décident**, sur la jauge de réserve : déplétion réelle et seuil de
  déclenchement, à la place d'un « 63 % · 7,6 mm » qui répétait la tuile juste au-dessus.
- **Le critère qui bloque une intervention** est marqué (✓ / ⏳ + gras), via le nouvel attribut
  `application_constraints` de l'intégration 0.33.0. Repli sur l'ancien découpage de chaîne si
  l'intégration est plus ancienne.

### Retiré
- Deux tuiles mortes en bas de l'onglet Produits : « Intervention bloquée : … » répétait le
  héros, « Dernière application » recopiait la première ligne de l'historique, note comprise.
- La pastille « Tondeuse prête/indisponible », qui redisait le badge de la carte machine.
- Le sous-titre « Tonte à reconsidérer le 01/08/2026 » sous une tuile affichant déjà « Demain » :
  l'onglet donnait trois fois le même jour.

### Modifié
- **Séparateur décimal unifié.** La barre météo et les doses de session interpolaient les
  valeurs brutes : « 23.8°C », « 0.3 mm », « 5.1 mm » côtoyaient « 7,6 mm » et « UV 3,8 » sur le
  même écran. Tout passe par `num()`.
- **« Dernières sessions » chapeautait la jauge de budget**, pas les sessions — le compteur
  « 3 h 15 · 3 sessions » se retrouvait orphelin. Chaque bloc a son titre.
- **« Coordination tondeuse » avait deux sous-titres** selon l'onglet. Un seul, désormais.
- **L'onglet Produits n'était pas traduit** : titres, boutons et libellés étaient du français en
  dur, dictionnaire contourné. Idem pour trois `toLocaleDateString('fr-FR')` figés dans
  l'historique et les sessions. (Le `fr-FR` de la détection « arrosé aujourd'hui » est **volontaire**
  et documenté : il compare au format produit par l'intégration, pas à un affichage.)

## [0.22.4] - 2026-07-31

### Modifié
- **« Arrosage retenu au-delà de 21,0 mm » se lisait comme un plafond franchi.** La retenue est
  en réalité CONDITIONNELLE : elle exige trois choses ensemble — au moins 3 arrosages sur la
  fenêtre, 21 mm reçus, ET un besoin actuel faible. Si le gazon avait vraiment soif, l'arrosage
  partirait jusqu'au plafond de 31,6 mm. Le libellé dit désormais ce qu'il en est :
  « ⏸ Semaine couverte (21,0 mm) · reprise dès que le besoin remonte ».
- **La ligne « total reçu » ne s'affiche plus quand elle est redondante.** Sans arrosage
  technique (rafraîchissement du soir, incorporation après produit), elle répétait mot pour mot
  le chiffre déjà lisible dans la jauge juste au-dessus.

## [0.22.3] - 2026-07-31

### Corrigé
- **« Prochain arrosage : imminent » subsistait dans l'onglet *Arrosage*.** Les 0.22.1 et 0.22.2
  n'avaient traité que la tuile de *Synthèse* : l'estimation est affichée à DEUX endroits, et le
  grand bandeau de l'onglet Arrosage continuait d'annoncer « 💧 imminent ». Il porte désormais le
  motif, l'estimation passant en sous-titre.
- **La jauge de budget affichait « 70 %, vert » alors que l'arrosage était retenu.** Elle ne
  connaissait que le PLAFOND (`weekly_guardrail_mm_max`, 31,6 mm), or l'intégration retient
  l'arrosage dès le PLANCHER (`weekly_guardrail_mm_min`, 21 mm). Entre les deux, la jauge
  suggérait une marge inexistante. Le plancher est désormais matérialisé sur la barre, la
  couleur bascule dès qu'il est franchi, et une ligne l'énonce : « Arrosage retenu au-delà de
  21,0 mm ».

## [0.22.2] - 2026-07-31

### Corrigé
- **« Prochain arrosage : imminent » persistait en gros titre.** La 0.22.1 n'avait corrigé que
  le SOUS-TITRE : la tuile continuait d'annoncer « imminent » pendant que le hero du même
  panneau disait « Aucune action ». Le titre ne consultait le blocage que via l'état
  `« Bloqué »` du capteur — or l'état est `« Non requis »` quand le sol n'a pas soif, alors
  qu'un garde-fou retient quand même l'arrosage.
- Le titre porte désormais le **motif** dans ce cas, et l'estimation passe en sous-titre à sa
  juste valeur : « quand le sol aura soif », pas « quand j'arrose ».

## [0.22.1] - 2026-07-31

### Corrigé
- **« Prochain arrosage : imminent » alors que l'arrosage était retenu.** La tuile annonçait un
  arrosage imminent pendant que le hero du même panneau disait « Aucune action — garde-fou
  hebdomadaire ». Cause : `_budgetOver()` RECALCULAIT la décision au lieu de la lire, et ne
  comparait le cumul 7 jours qu'au plafond **dur** (`weekly_guardrail_mm_max`), alors que
  l'intégration retient l'arrosage dès le seuil **bas** (`weekly_guardrail_mm_min`). Entre les
  deux — 22,1 mm consommés pour un plancher à 21 et un plafond à 31,6, cas constaté le
  31/07/2026 — l'arrosage était bloqué sans que la carte le signale.
- La carte lit désormais le `block_reason` de l'intégration ; le calcul sur le plafond dur ne
  sert plus que de repli. Principe : **ne pas recalculer une décision qu'on peut lire**.

## [0.22.0] - 2026-07-30

### Ajouté
- **Bouton « Arrêter l'arrosage »** dans le bandeau *Session en cours* (onglet *Arrosage*).
  Il n'apparaît que pendant un cycle — au repos il n'est pas masqué, il n'est pas rendu du
  tout : il n'y a rien à arrêter. Appelle `gazon_intelligent.stop_irrigation` (intégration
  0.31.0), qui ferme la vanne, enregistre l'eau déjà versée et libère le cycle.
- **Pas de confirmation, volontairement** : un arrêt d'urgence qui demande « êtes-vous
  sûr ? » n'en est pas un, et le geste est réversible — on peut relancer.

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

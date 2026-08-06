// gazon-intelligent-card.js
// Carte Lovelace dédiée à l'intégration Gazon Intelligent

const GI_VERSION = '0.26.0';  // tenu par scripts/build.py depuis package.json — il affichait
                          // « v1.0.0 » en Réglages depuis toujours, donc impossible de
                          // savoir quelle version tournait vraiment dans le navigateur.

// ─── Styles ─────────────────────────────────────────────────────────────────

const STYLES = `
:host {
  display: block;
  --gi-accent:       var(--gazon-accent, #10b981);
  --gi-accent-dark:  #059669;
  --gi-accent-bg:    rgba(16,185,129,0.11);
  --gi-warn:         #f59e0b;
  --gi-danger:       #ef4444;
  --gi-purple:       #7c3aed;
  --gi-bg:           var(--ha-card-background, var(--card-background-color, #fff));
  --gi-surface:      var(--secondary-background-color, #f3f4f6);
  --gi-text:         var(--primary-text-color, #111827);
  --gi-muted:        var(--secondary-text-color, #6b7280);
  --gi-border:       var(--divider-color, rgba(0,0,0,0.1));
  /* Surface secondaire — encarts, bulletin, historique. Elle manquait : les blocs ajoutés le
     30/07/2026 retombaient sur un gris passe-partout étranger au thème de Home Assistant.
     Dérivée de la surface existante, elle suit donc le thème clair comme le sombre. */
  --gi-surface-2:    color-mix(in srgb, var(--gi-surface) 55%, transparent);
  --gi-radius-card:  20px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }

.card {
  background: var(--gi-bg);
  border-radius: var(--gi-radius-card);
  overflow: hidden;
  font-family: var(--paper-font-body1_-_font-family, -apple-system, sans-serif);
  font-size: 14px;
  color: var(--gi-text);
}

/* ── Header ── */
.header { padding: 14px 16px 0; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 9px; }
.logo-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gi-accent); flex-shrink: 0; }
.logo-title { font-size: 15px; font-weight: 500; }
.logo-sub { font-size: 11px; color: var(--gi-muted); }
.header-time { font-size: 12px; color: var(--gi-muted); }

/* ── Tabs ── */
/* La barre d'onglets défile déjà (6 onglets ne tiennent pas sur un téléphone), mais rien ne le
   signalait : un onglet coupé net ressemble à un bug, pas à une invitation. Le dégradé sur le
   bord droit dit « ça continue », et disparaît une fois arrivé au bout.
   Le calage (scroll-snap) pose l'onglet sur le bord après un glissement, jamais à moitié.
   Vérifié le 30/07/2026 : 433 px de contenu pour 362 px visibles sur un écran de 390. */
.tabs {
  display: flex; padding: 10px 16px 0; gap: 3px;
  overflow-x: auto; scrollbar-width: none;
  scroll-snap-type: x proximity; -webkit-overflow-scrolling: touch;
  mask-image: linear-gradient(to right, #000 calc(100% - 26px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 26px), transparent 100%);
}
.tabs.at-end { mask-image: none; -webkit-mask-image: none; }
.tabs > * { scroll-snap-align: start; }
@media (min-width: 560px) { .tabs { mask-image: none; -webkit-mask-image: none; } }
.tabs::-webkit-scrollbar { display: none; }
.tab {
  padding: 6px 13px; font-size: 12px; border-radius: 20px;
  border: none; background: none; color: var(--gi-muted);
  cursor: pointer; white-space: nowrap; font-family: inherit;
  transition: background 0.15s, color 0.15s;
}
.tab.active { background: var(--gi-accent); color: #fff; font-weight: 500; }
.tab:not(.active):hover { background: var(--gi-surface); }

/* ── Content ── */
.content { padding: 12px 14px 16px; display: flex; flex-direction: column; gap: 10px; }

/* ── Hero ── */
.hero {
  background: var(--gi-accent); border-radius: 16px;
  padding: 16px; color: #fff; overflow: hidden; position: relative;
}
.hero.warn    { background: var(--gi-warn); }
.hero.danger  { background: var(--gi-danger); }
.hero.purple  { background: var(--gi-purple); }
.hero.rain    { background: #3b82f6; }
.sess-progress-wrap { margin-top: 10px; height: 5px; border-radius: 4px; background: rgba(255,255,255,.25); overflow: hidden; }
.sess-progress-bar  { height: 100%; border-radius: 4px; background: #fff; transition: width .6s ease; }
.hero-eyebrow { font-size: 10px; opacity: 0.82; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
.hero-header  { display: flex; align-items: center; gap: 12px; }
.hero-icon    { font-size: 28px; line-height: 1; flex-shrink: 0; }
.hero-body    { flex: 1; min-width: 0; }
.hero-title   { font-size: 17px; font-weight: 600; margin-bottom: 2px; }
.hero-sub     { font-size: 12px; opacity: 0.82; }
.hero-foot    { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
.hero-badge   { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,.2); border-radius: 20px; padding: 4px 10px; font-size: 11px; }
.hero-stop    { display: block; width: 100%; margin-top: 10px; padding: 11px 14px; border-radius: 14px;
                border: 1.5px solid rgba(255,255,255,.55); background: rgba(255,255,255,.16);
                color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
                transition: background .15s ease, border-color .15s ease; }
.hero-stop:hover  { background: rgba(255,255,255,.28); border-color: rgba(255,255,255,.8); }
.hero-stop:active { background: rgba(255,255,255,.36); }
.hero-stop:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hero-dot     { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.7); }
.hero-status  { font-size: 10px; opacity: 0.75; display: flex; align-items: center; gap: 4px; }
.hero-status-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.9); }

/* ── Section title ── */
.section-title { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: .07em; color: var(--gi-muted); }

/* ── Stats grid ── */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.stat-card { background: var(--gi-surface); border-radius: 12px; padding: 10px 12px; }
.stat-label { font-size: 10px; color: var(--gi-muted); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 3px; }
.stat-value { font-size: 19px; font-weight: 500; }
.stat-value.sm { font-size: 14px; padding-top: 3px; }
.stat-value.accent { color: var(--gi-accent); }
.stat-value.warn   { color: var(--gi-warn); }
.stat-value.danger { color: var(--gi-danger); }
.stat-sub { font-size: 10px; color: var(--gi-muted); margin-top: 1px; }
.meteo-stat-hot { color: var(--gi-warn); font-weight: 600; }
/* Le « pourquoi » d'un blocage : sans lui, la carte annonce un refus sans le motiver. */
.pourquoi {
  display: flex; gap: 8px; align-items: flex-start;
  margin: 10px 0 2px; padding: 10px 12px;
  background: var(--gi-surface-2);
  border-left: 3px solid var(--gi-warn); border-radius: 0 10px 10px 0;
  font-size: 12.5px; line-height: 1.45; color: var(--gi-text);
}
.pourquoi-mark { flex: none; opacity: .8; }
/* Les conditions d'une intervention, ligne par ligne : « mois compatibles », « température
   compatible »… Elles arrivaient concaténées dans un seul attribut, illisibles d'un bloc. */
.cond-list { display: flex; flex-direction: column; gap: 4px; margin: 10px 0 2px; }
.cond-item {
  font-size: 12px; line-height: 1.4; color: var(--gi-muted);
  padding-left: 16px; position: relative;
}
.cond-item::before { content: '·'; position: absolute; left: 5px; font-weight: 700; opacity: .6; }
/* Le critère qui BLOQUE doit se voir sans lire les quatre. Puce et couleur, pas juste du gras :
   un ton seul ne suffit pas en niveaux de gris ni pour un daltonien. */
.cond-item.ok::before   { content: '✓'; color: var(--gi-accent); opacity: 1; font-size: 11px; }
.cond-item.hold::before { content: '⏳'; opacity: 1; font-size: 10px; left: 3px; }
.cond-item.hold { color: var(--gi-ink); font-weight: 600; }
/* Hauteur réelle du gazon : une petite jauge vaut mieux qu'un nombre isolé — on voit d'un coup
   ce qu'il y a à couper. Le trait clair est la hauteur visée. */
.pousse { display: flex; gap: 14px; align-items: center; margin: 12px 0 4px; padding: 12px 14px;
  background: var(--gi-surface-2); border-radius: 14px; }
.pousse-barre { position: relative; flex: none; width: 26px; height: 54px; border-radius: 5px;
  background: var(--gi-border); overflow: hidden; }
.pousse-herbe { position: absolute; left: 0; right: 0; bottom: 0; border-radius: 5px;
  background: linear-gradient(to top, var(--gi-accent), color-mix(in srgb, var(--gi-accent) 55%, transparent)); }
.pousse-cible { position: absolute; left: -3px; right: -3px; height: 2px; background: var(--gi-text);
  opacity: .55; z-index: 2; }
.pousse-val { font-size: 15px; font-weight: 650; color: var(--gi-text); }
.pousse-lbl { font-size: 12px; font-weight: 400; color: var(--gi-muted); }
.pousse-sub { font-size: 12px; color: var(--gi-muted); margin-top: 2px; }
/* Actions rapides. Elles reprennent le langage des CARTES DE ZONE de la carte — surface,
   bordure 1.5px, rayon 14px, survol qui passe à l'accent — au lieu du style générique que
   j'avais posé (rayon 11, bordure 1px, pointillés). Repéré par Kévin : « tes boutons ne
   ressemblent vraiment pas à l'affichage de ma carte ». */
.actions-rapides { display: flex; flex-wrap: wrap; gap: 6px; }
.action-rapide {
  background: var(--gi-surface); border: 1.5px solid var(--gi-border);
  border-radius: 14px; padding: 10px 13px;
  display: inline-flex; align-items: center; gap: 7px;
  font-family: inherit; font-size: 13px; font-weight: 500; color: var(--gi-text);
  cursor: pointer; transition: border-color .2s, background .2s;
}
.action-rapide:hover { border-color: var(--gi-accent); background: var(--gi-accent-bg); }
.action-rapide:focus-visible { outline: 2px solid var(--gi-accent); outline-offset: 2px; }
.action-rapide.danger { color: var(--gi-danger); }
.action-rapide.danger:hover { border-color: var(--gi-danger); background: color-mix(in srgb, var(--gi-danger) 9%, transparent); }
.champ-bool { display: flex; align-items: center; gap: 9px; margin: 14px 0 2px;
  font-size: 13px; color: var(--gi-text); cursor: pointer; }
/* Historique des applications — l'onglet ne montrait que la PROCHAINE intervention. */
/* La classe sect-label a été retirée : la carte a déjà section-title, sans marges — c'est le
   conteneur qui espace. Ma version en ajoutait, et elles s'additionnaient avec celles du bloc
   suivant : 30 px entre le titre Outils et ses boutons, alors qu'un titre doit coller à ce
   qu'il désigne. Repéré par Kévin sur l'affichage réel.
   ⚠️ JAMAIS d'accent grave dans ce bloc : il vit dans un template JS, le backtick le ferme. */
.hist-list { display: flex; flex-direction: column; }
.hist-row { display: flex; gap: 12px; padding: 9px 0; border-top: 1px solid var(--gi-border); }
.hist-row:first-child { border-top: none; }
.hist-date { flex: none; width: 74px; font-size: 11.5px; color: var(--gi-muted);
  font-variant-numeric: tabular-nums; padding-top: 1px; }
.hist-main { min-width: 0; }
.hist-nom { font-size: 13px; font-weight: 600; color: var(--gi-text); }
.hist-meta { font-size: 11.5px; color: var(--gi-muted); margin-top: 1px; }
.hist-note {
  font-size: 11.5px; color: var(--gi-muted); font-style: italic; margin-top: 3px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; cursor: pointer;
}
.hist-note.ouverte { -webkit-line-clamp: unset; }
.hist-plus { margin-top: 8px; background: none; border: none; cursor: pointer; padding: 4px 0;
  font-size: 12px; color: var(--gi-accent); font-family: inherit; }
.hist-plus:hover { text-decoration: underline; }

/* Déclarer un produit : un seul choix réel, le reste est déduit du catalogue. */
.btn-declare {
  width: 100%; margin-top: 10px; padding: 11px 13px;
  background: var(--gi-surface); border: 1.5px solid var(--gi-border); border-radius: 14px;
  cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 500; color: var(--gi-text);
  transition: border-color .2s, background .2s;
}
.btn-declare:hover { border-color: var(--gi-accent); background: var(--gi-accent-bg); }
.btn-declare:focus-visible { outline: 2px solid var(--gi-accent); outline-offset: 2px; }
.champ-lbl { display: block; font-size: 11.5px; color: var(--gi-muted); margin: 12px 0 5px; }
.champ { width: 100%; padding: 10px 12px; border-radius: 10px; font-family: inherit; font-size: 13.5px;
  border: 1px solid var(--gi-border); background: var(--gi-surface); color: var(--gi-text); }
.champ:focus-visible { outline: 2px solid var(--gi-accent); outline-offset: 1px; }
.champ-aide { font-size: 11.5px; color: var(--gi-muted); margin-top: 5px; line-height: 1.4; }
/* Même grammaire que button.btn-on, la validation principale de la carte. */
.btn-run { width: 100%; margin-top: 16px; padding: 10px 13px; border: none; border-radius: 8px;
  background: var(--gi-accent); color: #fff; font-family: inherit; font-size: 13px;
  font-weight: 500; cursor: pointer; }
.btn-run:hover { filter: brightness(1.06); }
.btn-run.btn-danger { background: var(--gi-danger); }

/* Le bulletin : la carte parle. Ton posé, lecture en diagonale possible grâce au
   gras sur les seuls chiffres et motifs qui comptent. */
.briefing {
  display: flex; gap: 12px; align-items: flex-start;
  margin: 14px 0 4px; padding: 14px 16px;
  background: var(--gi-surface-2);
  border: 1px solid var(--gi-border); border-radius: 14px;
}
.briefing-mark { font-size: 15px; line-height: 1.5; opacity: .65; flex: none; }
.briefing-body { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.briefing-body p { margin: 0; font-size: 13.5px; line-height: 1.5; color: var(--gi-text); }
.briefing-body b { font-weight: 650; }
@media (max-width: 420px) { .briefing { padding: 12px 13px; } .briefing-body p { font-size: 13px; } }

/* Garde-fou agronomique : les bornes affichées sont celles APPLIQUÉES, qui peuvent être plus
   serrées que la config (plancher 4,0 cm / plafond 6,5 cm côté intégration, 0.25.0). Sans ce
   mot d'explication, un « Min 4 » sur une config à 3 reste incompréhensible. */
.guard-mark { opacity: .75; font-size: 9px; }
.stat-note { font-size: 9.5px; line-height: 1.3; color: var(--gi-muted); margin-top: 3px;
  padding-left: 6px; border-left: 2px solid var(--gi-border); }
.stat-mini-bar { margin-top: 8px; height: 4px; border-radius: 4px; background: var(--gi-border); overflow: hidden; }
.stat-mini-bar-fill { height: 100%; border-radius: 4px; transition: width .4s; }
.stat-card.risk-eleve, .stat-card.risk-critique { border-left: 3px solid var(--gi-danger); padding-left: 10px; }
.stat-card.risk-modere { border-left: 3px solid var(--gi-warn); padding-left: 10px; }
.stat-card.risk-faible { border-left: 3px solid var(--gi-accent); padding-left: 10px; }
.synth-banner { display: flex; align-items: center; gap: 8px; background: rgba(239,68,68,.13); border: 1px solid var(--gi-danger); border-radius: 10px; padding: 8px 12px; font-size: 12px; color: var(--gi-danger); font-weight: 500; }
.synth-banner-icon { font-size: 16px; flex-shrink: 0; }
.ctx-pills { display: flex; flex-wrap: wrap; gap: 6px; }
.ctx-pill { display: inline-flex; align-items: center; gap: 4px; background: var(--gi-surface); border-radius: 20px; padding: 4px 10px; font-size: 11px; color: var(--gi-muted); }
/* Pastille de qualité de donnée : discrète mais lisible, elle n'apparaît qu'en cas de repli. */
.ctx-pill.warn { color: var(--gi-warn); background: color-mix(in srgb, var(--gi-warn) 12%, var(--gi-surface)); }

/* ── Zone cards ── */
.zone-card {
  background: var(--gi-surface); border: 1.5px solid var(--gi-border);
  border-radius: 14px; padding: 11px 13px;
  display: flex; align-items: center; gap: 11px; transition: border-color .2s;
}
.zone-card.active { border-color: var(--gi-accent); background: var(--gi-accent-bg); }
.zone-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--gi-border); flex-shrink: 0; }
.zone-dot.on { background: var(--gi-accent); box-shadow: 0 0 0 3px var(--gi-accent-bg); }
.zone-dot.warn { background: var(--gi-warn); }
.zone-dot.purple { background: var(--gi-purple); box-shadow: 0 0 0 3px rgba(124,58,237,.13); }
.zone-info { flex: 1; min-width: 0; }
.zone-name   { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.zone-detail { font-size: 11px; color: var(--gi-muted); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.zone-detail.on  { color: var(--gi-accent-dark); font-weight: 500; }
.zone-timer { font-size: 13px; font-weight: 500; color: var(--gi-accent); font-variant-numeric: tabular-nums; flex-shrink: 0; }
.zone-btns  { display: flex; gap: 5px; flex-shrink: 0; }
/* Active zone expanded */
.zone-card.active { border-color: var(--gi-accent); }
.zone-active-header { display: flex; align-items: center; gap: 8px; }
.zone-active-badge  { margin-left: auto; font-size: 10px; font-weight: 700; color: var(--gi-accent); letter-spacing: .05em; }
.zone-active-timer  { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
.zone-active-clock  { font-size: 11px; color: var(--gi-accent); }
.zone-active-elapsed{ font-size: 22px; font-weight: 700; color: var(--gi-accent); font-variant-numeric: tabular-nums; line-height: 1; }
.zone-active-max    { font-size: 11px; color: var(--gi-muted); margin-left: auto; }
.zone-active-stop   { background: none; color: var(--gi-danger); border: 1.5px solid #fca5a5; border-radius: 8px; padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; }
/* Météo widget (sous le header, au-dessus des onglets) */
.meteo-widget       { padding: 10px 16px 12px; background: var(--gi-surface); border-bottom: 1px solid var(--gi-border); }
.meteo-top          { display: flex; align-items: center; justify-content: space-between; }
.meteo-left         { display: flex; align-items: center; gap: 10px; }
.meteo-icon         { font-size: 32px; line-height: 1; }
.meteo-temp-range   { font-size: 20px; font-weight: 700; color: var(--gi-text); line-height: 1.1; }
.meteo-label        { font-size: 11px; color: var(--gi-muted); margin-top: 1px; }
.meteo-right        { text-align: right; }
.meteo-time         { font-size: 20px; font-weight: 700; color: var(--gi-text); line-height: 1.1; }
.meteo-date         { font-size: 11px; color: var(--gi-muted); margin-top: 1px; }
.meteo-stats        { display: flex; gap: 16px; margin-top: 10px; }
.meteo-stat         { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--gi-muted); }
button.btn-on {
  background: var(--gi-accent); color: #fff; border: none;
  border-radius: 8px; padding: 5px 13px; font-size: 12px; font-weight: 500;
  cursor: pointer; font-family: inherit;
}
button.btn-off {
  background: none; color: var(--gi-danger); border: 1.5px solid #fca5a5;
  border-radius: 8px; padding: 5px 11px; font-size: 12px; font-weight: 500;
  cursor: pointer; font-family: inherit;
}
button.btn-pulse {
  background: none; color: var(--gi-warn); border: 1.5px solid #fcd34d;
  border-radius: 8px; padding: 5px 9px; font-size: 12px;
  cursor: pointer; font-family: inherit;
}

/* ── Budget hebdomadaire ── */
.budget-box {
  background: var(--gi-surface); border: 0.5px solid var(--gi-border);
  border-radius: 10px; padding: 9px 11px; margin-bottom: 8px;
}
.budget-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.budget-lbl { font-size: 12px; font-weight: 500; }
.budget-val { font-size: 12px; color: var(--gi-muted); font-variant-numeric: tabular-nums; }
.budget-val.over { color: var(--gi-danger); font-weight: 600; }
.budget-track { height: 6px; border-radius: 4px; background: var(--gi-border); overflow: hidden; margin: 6px 0 5px; }
.budget-track { position: relative; }
.budget-floor { position: absolute; top: 0; bottom: 0; width: 2px;
                background: var(--gi-ink); opacity: .55; }
/* Attente saine, pas alerte : même raison que la couleur de la barre (voir barCol). */
.budget-held  { margin-top: 5px; font-size: 11px; font-weight: 600; color: var(--gi-muted); }
.budget-bar { height: 100%; border-radius: 4px; }
.budget-sub { font-size: 11px; color: var(--gi-muted); }
/* Hauteur de coupe : deux boutons et une valeur — pas un curseur. Le réglage est discret
   (paliers de 5 mm) et se fait au retour de la tonte, souvent sur mobile. */
.cut-stepper { display: flex; align-items: center; gap: 10px; }
.cut-btn {
  width: 34px; height: 34px; border-radius: 10px; border: 1.5px solid var(--gi-line);
  background: var(--gi-card); color: var(--gi-ink); font-size: 19px; line-height: 1;
  cursor: pointer; font-family: inherit;
}
.cut-btn:disabled { opacity: .35; cursor: default; }
.cut-val { min-width: 58px; text-align: center; font-weight: 600; font-variant-numeric: tabular-nums; }

/* Arrosages techniques (hors budget) : atténués + badge */
.tl-log-entry.tech { opacity: .72; }
.tech-badge, .pass-badge {
  display: inline-block; border-radius: 20px; padding: 1px 7px;
  font-size: 10px; font-weight: 500; vertical-align: middle;
}
.tech-badge { background: var(--gi-border); color: var(--gi-muted); margin-left: 4px; }
.pass-badge { background: var(--gi-border); color: var(--gi-muted); margin-right: 6px; }

/* ── Arrosage manuel : popup de préparation ── */
.manual-run { display: flex; align-items: center; gap: 6px; }
.modal-back {
  position: fixed; inset: 0; z-index: 99;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center; padding: 16px;
}
.modal {
  background: var(--gi-bg); color: var(--gi-text);
  border: 0.5px solid var(--gi-border); border-radius: 16px;
  width: 100%; max-width: 380px; max-height: 86vh; overflow-y: auto;
  padding: 16px; box-shadow: 0 12px 40px rgba(0,0,0,.3);
}
.modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.modal-title { font-size: 15px; font-weight: 600; }
.modal-x {
  background: none; border: none; color: var(--gi-muted);
  font-size: 20px; line-height: 1; cursor: pointer; font-family: inherit; padding: 0 4px;
}
.modal-dose { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
input.manual-mm {
  width: 82px; text-align: right;
  background: var(--gi-surface); color: var(--gi-text);
  border: 0.5px solid var(--gi-border); border-radius: 8px;
  padding: 8px 9px; font-size: 17px; font-weight: 600; font-family: inherit;
}
.manual-unit { font-size: 13px; color: var(--gi-muted); }
.modal-preset {
  background: var(--gi-surface); border: 0.5px solid var(--gi-border);
  border-radius: 20px; padding: 4px 10px; font-size: 11px; color: var(--gi-muted);
  cursor: pointer; font-family: inherit; margin-left: auto;
}
.modal-rows { margin: 10px 0 2px; }
.modal-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0; border-bottom: 0.5px solid var(--gi-border); font-size: 12px;
}
.modal-row:last-child { border-bottom: none; }
.modal-row .lbl { display: flex; align-items: center; gap: 7px; color: var(--gi-text); }
.modal-row .val { color: var(--gi-muted); font-variant-numeric: tabular-nums; }
.modal-row.total .lbl, .modal-row.total .val { font-weight: 600; color: var(--gi-text); }
.modal-note {
  font-size: 11px; color: var(--gi-muted); line-height: 1.45;
  background: var(--gi-surface); border-radius: 8px; padding: 8px 10px; margin-top: 8px;
}
.modal-warn { color: var(--gi-warn); }
.modal-actions { display: flex; gap: 8px; margin-top: 14px; }
.modal-actions button { flex: 1; padding: 9px; border-radius: 10px; font-size: 13px; font-family: inherit; cursor: pointer; }
.modal-cancel { background: none; color: var(--gi-muted); border: 0.5px solid var(--gi-border); }
.modal-go { background: var(--gi-accent); color: #fff; border: none; font-weight: 600; }

/* ── Chips ── */
.chip-row { display: flex; gap: 6px; flex-wrap: wrap; }
.chip {
  background: var(--gi-surface); border: 0.5px solid var(--gi-border);
  border-radius: 20px; padding: 4px 10px; font-size: 11px; color: var(--gi-muted);
  display: flex; align-items: center; gap: 5px;
}
.chip-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

/* ── Timeline ── */
.timeline { background: var(--gi-surface); border-radius: 14px; padding: 12px 14px; }
.tl-ruler  { display: flex; justify-content: space-between; margin-bottom: 7px; }
.tl-ruler span { font-size: 9px; color: var(--gi-muted); }
.tl-row { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.tl-row:last-child { margin-bottom: 0; }
.tl-label { font-size: 10px; color: var(--gi-muted); width: 34px; flex-shrink: 0; text-align: right; }
.tl-track { flex: 1; height: 14px; background: var(--gi-border); border-radius: 4px; position: relative; overflow: hidden; }
.tl-bar   { position: absolute; height: 100%; border-radius: 4px; opacity: .85; }
.tl-now   { position: absolute; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,.5); pointer-events: none; }
.tl-stats { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.tl-stat  { display: flex; align-items: center; gap: 5px; font-size: 11px; background: var(--gi-border); border-radius: 8px; padding: 3px 8px; }
.tl-stat-dot  { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.tl-stat-name { color: var(--gi-muted); font-weight: 600; }
.tl-stat-val  { color: var(--gi-text); font-weight: 700; }
.tl-stat-count{ color: var(--gi-muted); }
/* 7-day header */
.tl-header { display: flex; align-items: baseline; gap: 14px; margin-bottom: 10px; flex-wrap: wrap; }
.tl-h-big  { font-size: 22px; font-weight: 700; color: var(--gi-text); line-height: 1; }
.tl-h-sub  { font-size: 11px; color: var(--gi-muted); }
.tl-h-pill { background: var(--gi-accent-bg); color: var(--gi-accent); border-radius: 8px; padding: 2px 8px; font-size: 11px; font-weight: 600; }
.tl-h-pill.skip { background: rgba(245,158,11,.12); color: var(--gi-warn); }
/* Log */
.tl-empty { font-size: 12px; color: var(--gi-muted); padding: 6px 0; }
.tl-log { margin-top: 12px; display: flex; flex-direction: column; gap: 5px; }
.tl-log-entry  { font-size: 11px; padding: 7px 10px; border-radius: 8px; background: var(--gi-surface); display: flex; flex-direction: column; gap: 5px; }
.tl-log-entry.active { border: 1px solid var(--gi-accent); }
.ch-badge { border-radius: 5px; padding: 1px 5px; font-size: 10px; font-weight: 700; color: #fff; flex-shrink: 0; }
.tl-log-row1   { display: flex; align-items: center; gap: 6px; }
.tl-log-src    { font-weight: 600; color: var(--gi-text); flex: 1; }
.tl-log-when   { color: var(--gi-muted); flex-shrink: 0; font-size: 10px; }
.tl-log-dur    { font-weight: 600; color: var(--gi-accent); flex-shrink: 0; }
.tl-log-zones  { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.tl-log-zdur   { font-size: 10px; color: var(--gi-muted); margin-right: 6px; }
/* Pastille de zone. On y lisait « CH1 » — le numéro de CANAL du boîtier Sonoff, pas le
   vocabulaire de l'utilisateur : côté arrosage on parle de ZONES (demandé par Kévin le
   30/07/2026). Forme courte « Z1 » sur la pastille, « Zone 1 » là où la place le permet. */
.zone-ch { display: inline-block; border-radius: 5px; padding: 1px 5px; font-size: 10px; font-weight: 700; color: #fff; margin-top: 3px; }

/* ── Reserve bar ── */
.reserve-bar-wrap { background: var(--gi-surface); border-radius: 14px; padding: 12px 14px; }
.reserve-bar-label { display: flex; justify-content: space-between; margin-bottom: 7px; }
.reserve-bar-label span { font-size: 11px; color: var(--gi-muted); }
.reserve-bar-track { height: 10px; background: var(--gi-border); border-radius: 5px; overflow: hidden; }
.reserve-bar-fill  { height: 100%; border-radius: 5px; background: var(--gi-accent); transition: width .4s; }
.reserve-bar-fill.warn   { background: var(--gi-warn); }
.reserve-bar-fill.danger { background: var(--gi-danger); }

/* ── Toggle ── */
.toggle-row { background: var(--gi-surface); border-radius: 14px; padding: 11px 13px; display: flex; align-items: center; gap: 11px; }
.toggle-info { flex: 1; }
.toggle-name { font-size: 13px; font-weight: 500; }
.toggle-sub  { font-size: 11px; color: var(--gi-muted); margin-top: 1px; }
button.toggle-sw {
  width: 40px; height: 22px; border-radius: 11px; flex-shrink: 0;
  background: var(--gi-border); border: none; cursor: pointer; position: relative; transition: background .2s;
}
button.toggle-sw.on { background: var(--gi-accent); }
.toggle-knob { position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; top: 2px; left: 2px; transition: transform .2s; }
button.toggle-sw.on .toggle-knob { transform: translateX(18px); }

/* ── Mower card ── */
.mow-card { background: var(--gi-surface); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; }
.mow-icon-wrap { width: 36px; height: 36px; border-radius: 10px; background: var(--gi-accent-bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; }
.mow-info { flex: 1; }
.mow-name   { font-size: 13px; font-weight: 500; }
.mow-detail { font-size: 11px; color: var(--gi-muted); margin-top: 1px; }
.mow-status { font-size: 12px; font-weight: 500; color: var(--gi-accent); flex-shrink: 0; }
.mow-status.warn    { color: var(--gi-warn); }
.mow-status.blocked { color: var(--gi-danger); }

/* ── Misc ── */
.sep   { height: 0.5px; background: var(--gi-border); }
.empty { text-align: center; padding: 24px 16px; color: var(--gi-muted); font-size: 13px; }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ZONE_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

// Durée maximale plausible pour UNE ouverture de vanne. Le plan d'arrosage de l'intégration borne
// chaque zone à 180 min ; on garde une marge large (6 h) pour un arrosage manuel prolongé. Au-delà,
// ce n'est pas un arrosage mais un trou dans l'historique — cf. `_fetchHistory`.
const MAX_PLAUSIBLE_SESSION_MS = 6 * 60 * 60 * 1000;

// Causes d'arrosage TECHNIQUES : exclues du garde-fou hebdomadaire côté intégration
// (cf. water.py::_TECHNICAL_WATERING_CAUSES). Doit rester aligné sur cette liste.
const TECHNICAL_CAUSES = ['rafraichissement_soir', 'post_application'];

// ─── i18n ────────────────────────────────────────────────────────────────────

const STRINGS = {
  fr: {
    // Tabs
    tab_synthese: 'Synthèse', tab_arrosage: 'Arrosage', tab_tonte: 'Tonte',
    tab_gazon: 'Gazon', tab_produits: 'Produits', tab_reglages: 'Réglages',
    // Sections
    section_zones: 'Zones', section_bilan: 'Bilan', section_zones_cfg: 'Zones configurées',
    section_24h: '24 dernières heures', section_history: 'Dernières sessions',
    section_budget: 'Budget de la semaine',
    coord_name: 'Coordination tondeuse', coord_sub: "Bloque la tonte pendant l'arrosage",
    cut_height: 'Hauteur de coupe', cut_height_sub: '\u00c0 r\u00e9gler quand tu tournes la molette',
    // Timeline
    loading: 'Chargement…', no_watering_24h: 'Aucun arrosage sur 24 h',
    no_session_7d: 'Aucune session récente', days_7: '7 jours', sessions: 'sess.',
    sessions_n: 'sessions', runtime_watered: "d'arrosage",
    tomorrow: 'demain', imminent: 'imminent', estimated: 'estimé', estimated_dawn: "estimé · à l'aube", days_unit: 'j',
    // Hero / status
    next_watering: 'Prochain arrosage', session_active: 'Session en cours',
    btn_stop_watering: "\u23F9 Arr\u00eater l'arrosage",
    blocked: 'Bloqué', planned: 'mm planifiés', window_lbl: 'Fenêtre',
    progress: 'Avancement', watering_active: 'Arrosage actif',
    next_intervention: 'Prochaine intervention', no_intervention: 'Aucune intervention recommandée',
    last_application: 'Dernière application',
    // Zones
    no_zones: 'Aucune zone configurée', zone_inactive: 'Inactive',
    zone_active_badge: 'ACTIVE', pump: 'Pompe', pump_active: 'Active', pump_off: 'À l\'arrêt',
    btn_stop: '■ Arrêt', btn_off: 'Arrêt',
    btn_water_now: 'Arroser',
    btn_manual_setup: 'Configurer…',
    manual_launch: 'Lancer',
    manual_watering: 'Arrosage manuel',
    manual_watering_hint: 'Conseillé :',
    manual_watering_free: 'Choisis la dose à appliquer',
    manual_total: 'Durée totale (zones en série)',
    manual_no_rate: 'débit non configuré',
    manual_reserve: 'Réserve :',
    manual_blocked: 'Arrosage auto bloqué :',
    manual_bypass: 'le lancement manuel passe outre.',
    manual_peak_sun: 'Plein soleil : forte évaporation. Préfère tôt le matin.',
    manual_cancel: 'Annuler',
    // Stats
    soil_reserve: 'Réserve sol', lawn_risk: 'Risque gazon', phase: 'Phase',
    next_mow: 'Prochaine tonte', mow_height: 'Hauteur cible', mow_height_lbl: 'Hauteur tonte',
    risk_lbl: 'Risque', reserve_lbl: 'Réserve',
    watering_7d: 'Arrosage 7j', auto_on: 'Auto activé', auto_off: 'Auto désactivé',
    rain_effective: 'pluie',
    itv_recommande: 'Recommand\u00e9', itv_preparation: '\u00c0 pr\u00e9parer',
    itv_blocked: 'Bloqu\u00e9', itv_unavailable: 'Indisponible',
    watering_active_chip: 'Arrosage actif',
    // Action labels
    act_aucune_action: 'Aucune action', act_arroser: 'Arroser',
    act_arroser_application: 'Arroser (post-application)',
    act_arroser_canicule_survie: 'Dose de survie (canicule)',
    act_arroser_canicule_soir: 'Rafraîchissement du soir',
    act_attendre: 'En attente', act_attente_conditions: 'En attente', act_bloquer: 'Bloqué',
    // Hydric labels
    hyd_plein: 'Réserve pleine', hyd_confort: 'Confort',
    hyd_depletion: 'Réserve entamée', hyd_critique: 'Critique',
    // Mow labels
    tonte_autorisee: 'Autorisée', tonte_bloquee: 'Bloquée',
    tonte_a_surveiller: 'À surveiller', tonte_non_pertinent: 'Non applicable',
    // Risk labels
    risk_faible: 'Faible', risk_modere: 'Modéré', risk_eleve: 'Élevé', risk_critique: 'Critique',
    // Session log source labels
    src_auto: 'Auto', src_manuel: 'Manuel', src_rafraich: 'Rafraîch. soir',
    cause_hydrique: 'hydrique', cause_soir: 'soir',
    weekly_budget: 'Budget hebdomadaire',
    budget_floor: 'seuil de retenue',
    budget_held: '\u23F8 Semaine couverte',
    budget_held_end: 'reprise d\u00e8s que le besoin remonte',
    budget_hold_sub: 'semaine couverte \u00b7 reprise d\u00e8s que le besoin remonte',
    need_still: 'le sol r\u00e9clame toujours',
    // Tonte : deux axes distincts (machine / gazon), \u00e0 ne jamais fusionner dans un libell\u00e9
    mower_available: 'Disponible', mower_unavailable: 'Indisponible',
    mowing_lbl: 'Tonte', chip_lawn: 'Gazon', chip_ready: 'pr\u00eat', chip_not_ready: 'pas pr\u00eat',
    growth_today: 'pouss\u00e9 aujourd\'hui', mow_window_lbl: 'Cr\u00e9neau',
    depletion_lbl: 'd\u00e9pl\u00e9tion', mad_lbl: 'seuil de d\u00e9clenchement',
    applied_history: 'Ce que tu as appliqu\u00e9', tap_to_expand: 'Toucher pour tout lire',
    show_less: 'R\u00e9duire', show_older_a: 'Voir les', show_older_b: 'plus anciennes',
    declare_product: 'D\u00e9clarer un produit appliqu\u00e9',
    undo_last_application: 'Annuler la derni\u00e8re application',
    started_at: 'D\u00e9marr\u00e9 \u00e0', started_on: 'D\u00e9marr\u00e9 le', at_time: '\u00e0',
    technical_not_counted: 'techniques, non décomptés', total_received: 'total reçu',
    technical: 'technique', passes: 'passages',
    // Editor
    editor_msg: 'Configurez la carte via l\'éditeur YAML.',
    today: "Aujourd'hui", tomorrow: 'Demain', yesterday: 'Hier',
    _locale: 'fr-FR',
  },
  en: {
    tab_synthese: 'Overview', tab_arrosage: 'Watering', tab_tonte: 'Mowing',
    tab_gazon: 'Lawn', tab_produits: 'Products', tab_reglages: 'Settings',
    section_zones: 'Zones', section_bilan: 'Summary', section_zones_cfg: 'Configured zones',
    section_24h: 'Last 24 hours', section_history: 'Recent sessions',
    section_budget: 'This week\u2019s budget',
    coord_name: 'Mower coordination', coord_sub: 'Blocks mowing while watering',
    cut_height: 'Cutting height', cut_height_sub: 'Update it when you turn the dial',
    loading: 'Loading…', no_watering_24h: 'No watering in 24 h',
    no_session_7d: 'No recent session', days_7: '7 days', sessions: 'sess.',
    sessions_n: 'sessions', runtime_watered: 'of watering',
    tomorrow: 'tomorrow', imminent: 'imminent', estimated: 'estimated', estimated_dawn: 'estimated · at dawn', days_unit: 'd',
    next_watering: 'Next watering', session_active: 'Active session',
    btn_stop_watering: '\u23F9 Stop watering',
    blocked: 'Blocked', planned: 'mm planned', window_lbl: 'Window',
    progress: 'Progress', watering_active: 'Watering active',
    next_intervention: 'Next intervention', no_intervention: 'No intervention recommended',
    last_application: 'Last application',
    no_zones: 'No zones configured', zone_inactive: 'Inactive',
    zone_active_badge: 'ACTIVE', pump: 'Pump', pump_active: 'Active', pump_off: 'Off',
    btn_stop: '■ Stop', btn_off: 'Off',
    btn_water_now: 'Water',
    btn_manual_setup: 'Set up…',
    manual_launch: 'Run',
    manual_watering: 'Manual watering',
    manual_watering_hint: 'Suggested:',
    manual_watering_free: 'Pick the amount to apply',
    manual_total: 'Total time (zones in sequence)',
    manual_no_rate: 'flow rate not set',
    manual_reserve: 'Reserve:',
    manual_blocked: 'Auto watering blocked:',
    manual_bypass: 'a manual run overrides it.',
    manual_peak_sun: 'Peak sun: high evaporation. Prefer early morning.',
    manual_cancel: 'Cancel',
    soil_reserve: 'Soil reserve', lawn_risk: 'Lawn risk', phase: 'Phase',
    next_mow: 'Next mow', mow_height: 'Target height', mow_height_lbl: 'Mow height',
    risk_lbl: 'Risk', reserve_lbl: 'Reserve',
    watering_7d: 'Watering 7d', auto_on: 'Auto on', auto_off: 'Auto off',
    rain_effective: 'rain',
    itv_recommande: 'Recommended', itv_preparation: 'To prepare',
    itv_blocked: 'Blocked', itv_unavailable: 'Unavailable',
    watering_active_chip: 'Watering active',
    act_aucune_action: 'No action', act_arroser: 'Water',
    act_arroser_application: 'Water (post-application)',
    act_arroser_canicule_survie: 'Survival dose (heat wave)',
    act_arroser_canicule_soir: 'Evening cooling',
    act_attendre: 'Waiting', act_attente_conditions: 'Waiting', act_bloquer: 'Blocked',
    hyd_plein: 'Reserve full', hyd_confort: 'Comfortable',
    hyd_depletion: 'Reserve drawn down', hyd_critique: 'Critical',
    tonte_autorisee: 'Allowed', tonte_bloquee: 'Blocked',
    tonte_a_surveiller: 'Monitor', tonte_non_pertinent: 'N/A',
    risk_faible: 'Low', risk_modere: 'Moderate', risk_eleve: 'High', risk_critique: 'Critical',
    src_auto: 'Auto', src_manuel: 'Manual', src_rafraich: 'Evening cool.',
    cause_hydrique: 'hydric', cause_soir: 'evening',
    weekly_budget: 'Weekly budget',
    budget_floor: 'hold threshold',
    budget_held: '\u23F8 Week covered',
    budget_held_end: 'resumes when the need rises',
    budget_hold_sub: 'week covered \u00B7 resumes when the need rises',
    need_still: 'the soil still needs',
    mower_available: 'Available', mower_unavailable: 'Unavailable',
    mowing_lbl: 'Mowing', chip_lawn: 'Lawn', chip_ready: 'ready', chip_not_ready: 'not ready',
    growth_today: 'grown today', mow_window_lbl: 'Window',
    depletion_lbl: 'depletion', mad_lbl: 'trigger threshold',
    applied_history: 'What you applied', tap_to_expand: 'Tap to read in full',
    show_less: 'Show less', show_older_a: 'Show', show_older_b: 'older entries',
    declare_product: 'Declare an applied product',
    undo_last_application: 'Undo last application',
    started_at: 'Started at', started_on: 'Started on', at_time: 'at',
    technical_not_counted: 'technical, not counted', total_received: 'total received',
    technical: 'technical', passes: 'passes',
    editor_msg: 'Configure the card via the YAML editor.',
    today: 'Today', tomorrow: 'Tomorrow', yesterday: 'Yesterday',
    _locale: 'en-US',
  },
};

// Legacy label maps — derived from STRINGS at runtime (see _t / _lbl methods)
const ACTION_LABELS = {
  aucune_action:           'act_aucune_action',
  arroser:                 'act_arroser',
  arroser_application:     'act_arroser_application',
  arroser_canicule_survie: 'act_arroser_canicule_survie',
  arroser_canicule_soir:   'act_arroser_canicule_soir',
  attendre:                'act_attendre',
  attente_conditions:      'act_attente_conditions',
  bloquer:                 'act_bloquer',
};

// ⚠️ ALIGNÉE SUR CE QUE L'INTÉGRATION ÉMET RÉELLEMENT, pas sur un vocabulaire supposé.
// `_hydric_state_from_depletion_ratio` / `_from_reserve_ratio` (sensor.py) ne renvoient que
// quatre états : plein · confort · depletion · critique. La table listait `stress`, `optimal`,
// `charge` et `vide` — quatre entrées mortes — et ne couvrait NI `confort` NI `depletion`,
// c'est-à-dire les deux états les plus fréquents : ils tombaient dans le repli et s'affichaient
// bruts, en minuscules, dans « Bilan » (constaté le 31/07/2026 sur l'install réelle).
const HYDRIC_LABELS = {
  plein: 'hyd_plein', confort: 'hyd_confort',
  depletion: 'hyd_depletion', critique: 'hyd_critique',
};

const TONTE_LABELS = {
  autorisee: 'tonte_autorisee', bloquee: 'tonte_bloquee',
  a_surveiller: 'tonte_a_surveiller', non_pertinent: 'tonte_non_pertinent',
};

// États publiés par `sensor.prochaine_intervention` (`status`). Ils étaient affichés BRUTS.
const INTERVENTION_LABELS = {
  recommande: 'itv_recommande', recommended: 'itv_recommande',
  preparation: 'itv_preparation', possible: 'itv_preparation',
  blocked: 'itv_blocked', bloque: 'itv_blocked',
  unavailable: 'itv_unavailable',
};

const RISQUE_LABELS = {
  faible: 'risk_faible', modere: 'risk_modere', eleve: 'risk_eleve', critique: 'risk_critique',
};

function ent(hass, id) {
  return (id && hass) ? (hass.states[id] || null) : null;
}
function stateOf(hass, id) {
  const e = ent(hass, id); return e ? e.state : null;
}
function attrOf(hass, id, key) {
  const e = ent(hass, id); return (e && e.attributes) ? e.attributes[key] : null;
}
function isOn(hass, id) {
  return stateOf(hass, id) === 'on';
}
function num(v, dec = 0) {
  if (v === null || v === undefined || v === '') return '—';
  const n = parseFloat(v);
  return isNaN(n) ? String(v) : n.toFixed(dec).replace('.', ',');
}
function lbl(map, key, fallback) {
  return (key && map[key]) ? map[key] : (fallback || (key ? String(key).replace(/_/g, ' ') : '—'));
}
function fmtDate(raw, t) {
  if (!raw || raw === 'unavailable' || raw === 'unknown') return '—';
  try {
    const d = new Date(raw);
    if (isNaN(d)) return String(raw);
    const today = new Date(); today.setHours(0,0,0,0);
    const target = new Date(d); target.setHours(0,0,0,0);
    const diff = target - today;
    const loc = (t && t('_locale')) || 'fr-FR';
    if (diff === 0)         return t ? t('today')     : "Aujourd'hui";
    if (diff === 86400000)  return t ? t('tomorrow')  : 'Demain';
    if (diff < 0)           return t ? t('yesterday') : 'Passé';
    return d.toLocaleDateString(loc, { weekday: 'short', day: 'numeric', month: 'short' });
  } catch { return String(raw); }
}
function nowHHMM(locale) {
  return new Date().toLocaleTimeString(locale || 'fr-FR', { hour: '2-digit', minute: '2-digit' });
}
function fmtTimer(ms) {
  const tot = Math.floor(Math.max(0, ms) / 1000);
  const m = Math.floor(tot / 60);
  const s = tot % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}
function fmtDur(ms) {
  const min = Math.round(ms / 60000);
  if (min < 1)  return '< 1 min';
  if (min < 60) return min + ' min';
  return Math.floor(min / 60) + 'h' + String(min % 60).padStart(2, '0');
}
function tonePct(ratio) {
  const p = parseFloat(ratio);
  if (isNaN(p))  return '';
  if (p < 0.25)  return 'danger';
  if (p < 0.5)   return 'warn';
  return 'accent';
}
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Durée lisible : « 12 min », « 1 h 05 ». Null/0 → tiret.
function fmtDuration(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return '—';
  const total = Math.round(minutes);
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
}

// ─── Card ────────────────────────────────────────────────────────────────────

class GazonIntelligentCard extends HTMLElement {
  constructor() {
    super();
    this._tab       = 'synthese';
    this._hass      = null;
    this._config    = {};
    this._shadow    = null;
    this._history   = null;   // map entityId → [{start_ms, end_ms}]
    this._historyTs = 0;      // timestamp of last fetch
    this._forecast  = null;   // daily forecast[0] from weather.get_forecasts
    this._forecastTs= 0;      // timestamp of last forecast fetch
  }

  setConfig(config) {
    if (!config) throw new Error('gazon-intelligent-card: missing configuration');
    if (!config.zones || !Array.isArray(config.zones) || config.zones.length === 0) {
      console.warn('gazon-intelligent-card: no zones configured — add at least one zone with a switch entity');
    }
    config.zones?.forEach((z, i) => {
      if (!z.switch) console.warn(`gazon-intelligent-card: zone[${i}] is missing a "switch" entity`);
    });
    this._config = {
      title:    config.title    || 'Gazon Intelligent',
      subtitle: config.subtitle || null,
      zones:    config.zones    || [],
      pompe_switch:                  config.pompe_switch,
      entity_assistant:              config.entity_assistant              || 'sensor.gazon_intelligent_assistant',
      entity_arrosage_en_cours:      config.entity_arrosage_en_cours      || 'sensor.gazon_intelligent_arrosage_en_cours',
      entity_prochain_arrosage:      config.entity_prochain_arrosage      || 'sensor.gazon_intelligent_prochain_arrosage',
      entity_prochaine_tonte:        config.entity_prochaine_tonte        || 'sensor.gazon_intelligent_prochaine_tonte',
      entity_tonte_autorisee:        config.entity_tonte_autorisee        || 'binary_sensor.gazon_intelligent_tonte_autorisee',
      entity_phase:                  config.entity_phase                  || 'sensor.gazon_intelligent_phase_dominante',
      entity_risque:                 config.entity_risque                 || 'sensor.gazon_intelligent_risque_gazon',
      entity_reserve:                config.entity_reserve                || 'sensor.gazon_intelligent_reserve_actuelle',
      entity_etat_hydrique:          config.entity_etat_hydrique          || 'sensor.gazon_intelligent_etat_hydrique',
      entity_hauteur_conseillee:     config.entity_hauteur_conseillee     || 'sensor.gazon_intelligent_hauteur_de_tonte_conseillee',
      entity_switch_arrosage_auto:   config.entity_switch_arrosage_auto   || 'switch.gazon_intelligent_arrosage_automatique_autorise',
      entity_switch_tondeuse:        config.entity_switch_tondeuse        || 'switch.gazon_intelligent_coordination_tondeuse',
      entity_prochaine_intervention: config.entity_prochaine_intervention || 'sensor.gazon_intelligent_prochaine_intervention',
      entity_derniere_application:   config.entity_derniere_application   || 'sensor.gazon_intelligent_derniere_application',
      entity_meteo:                  config.entity_meteo,
      // Le catalogue produits alimente le popup de déclaration. Absent de la config d'origine
      // (seule la carte « Potager » le déclarait) : on le devine à partir de l'entité
      // « prochaine intervention », qui suit toujours le même préfixe.
      entity_hauteur_gazon_estimee:  config.entity_hauteur_gazon_estimee
        || (config.entity_hauteur_conseillee
            ? String(config.entity_hauteur_conseillee).replace(/hauteur_de_tonte_conseillee$/, 'hauteur_gazon_estimee')
            : undefined),
      entity_catalogue_produits:     config.entity_catalogue_produits
        || (config.entity_prochaine_intervention
            ? String(config.entity_prochaine_intervention).replace(/prochaine_intervention$/, 'catalogue_produits')
            : undefined),
      entity_derniere_application:   config.entity_derniere_application
        || (config.entity_prochaine_intervention
            ? String(config.entity_prochaine_intervention).replace(/prochaine_intervention$/, 'derniere_application')
            : undefined),
      entity_dernier_arrosage:       config.entity_dernier_arrosage       || 'sensor.gazon_intelligent_dernier_arrosage_detecte',
      entity_objectif_arrosage:      config.entity_objectif_arrosage      || 'sensor.gazon_intelligent_objectif_d_arrosage',
      entity_hauteur_coupe:          config.entity_hauteur_coupe          || 'number.gazon_intelligent_hauteur_coupe_tondeuse',
      entity_fenetre_optimale:       config.entity_fenetre_optimale       || 'sensor.gazon_intelligent_fenetre_optimale',
    };
    if (this._shadow) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._shadow) {
      this._shadow = this.attachShadow({ mode: 'open' });
      this._shadow.innerHTML = `<style>${STYLES}</style><div class="card" id="gi-card"></div>`;
    }
    // Pas de re-rendu tant que le popup d'arrosage manuel est ouvert. `set hass` est appelé à
    // CHAQUE changement d'état dans tout Home Assistant (plusieurs fois par seconde) ; un
    // re-rendu recrée le champ de saisie, ce qui écrase la valeur tapée et fait perdre le focus
    // — la dose repassait sans cesse à celle conseillée, impossible d'en choisir une autre.
    // Le popup tient ses propres durées à jour en direct (cf. _bindEvents), il n'a donc pas
    // besoin du rendu global ; les valeurs de contexte se rafraîchissent à sa fermeture.
    if (this._manualOpen) return;
    this._render();
  }

  getCardSize() { return 6; }

  getLayoutOptions() {
    return {
      grid_rows:     6,
      grid_columns:  4,
      grid_min_rows: 3,
      grid_max_rows: 12,
    };
  }

  static getConfigElement() {
    return document.createElement('gazon-intelligent-card-editor');
  }

  static getStubConfig() {
    return { title: 'Gazon Intelligent', zones: [] };
  }

  get _lang() {
    const loc = this._hass?.locale?.language || navigator.language || 'fr';
    return loc.startsWith('fr') ? 'fr' : 'en';
  }

  _t(key) {
    const s = STRINGS[this._lang] || STRINGS.fr;
    return s[key] ?? (STRINGS.fr[key] ?? key);
  }

  _lblt(map, key, fallback) {
    const strKey = key && map[key];
    if (strKey) return this._t(strKey);
    // ⚠️ Le repli rendait la clé BRUTE, en minuscules : « confort » s'affichait tel quel dans
    // « Bilan » parce que la table `HYDRIC_LABELS` avait été écrite contre un vocabulaire que
    // l'intégration n'utilise plus (constaté le 31/07/2026). La table est corrigée, mais le
    // repli doit rester présentable : le jour où l'intégration ajoute un état, il se lira
    // comme un libellé, pas comme un bug.
    if (fallback) return fallback;
    if (!key) return '—';
    const mot = String(key).replace(/_/g, ' ');
    return mot.charAt(0).toUpperCase() + mot.slice(1);
  }

  // Libellé humain du prochain jour d'arrosage ESTIMÉ par l'intégration (déplétion réserve → MAD).
  // jours : entier (0 = imminent, 1 = demain, …) ; isoDate : 'YYYY-MM-DD'. Renvoie '' si absent.
  _nextWateringDayLabel(jours, isoDate) {
    if (jours === null || jours === undefined || !isoDate) return '';
    const n = Number(jours);
    if (!Number.isFinite(n)) return '';
    if (n <= 0) return this._t('imminent');
    if (n === 1) return this._t('tomorrow');
    const d = new Date(`${isoDate}T00:00:00`);
    if (n <= 6 && !Number.isNaN(d.getTime())) {
      const locale = this._lang === 'en' ? 'en-US' : 'fr-FR';
      return d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
    }
    return `~${n} ${this._t('days_unit')}`;
  }

  // Le garde-fou hebdomadaire est-il DÉPASSÉ (eau comptée ≥ plafond) ? Sert à nuancer le jour
  // estimé (« sous réserve du budget ») : l'estimation ne regarde que la soif du sol, pas ce
  // blocage. Les deux chiffres viennent de l'intégration (mêmes que la jauge de budget).
  _budgetOver() {
    const h = this._hass, c = this._config;
    if (!h || !c) return false;
    // ⚠️ On LIT la décision de l'intégration, on ne la RECALCULE pas. Cette fonction ne
    // comparait que le cumul 7 j au plafond DUR (`weekly_guardrail_mm_max`), alors que
    // l'intégration retient l'arrosage dès le seuil BAS (`weekly_guardrail_mm_min`).
    // Entre les deux — 22,1 mm consommés pour un plancher à 21 et un plafond à 31,6, cas
    // constaté le 31/07/2026 — l'arrosage était bloqué sans que la carte le signale : la
    // tuile annonçait « imminent » pendant que le hero disait « garde-fou hebdomadaire ».
    const code = String(ent(h, c.entity_prochain_arrosage)?.attributes?.block_reason || '');
    if (code.includes('garde_fou') || code.includes('guardrail')) return true;
    // Repli : plafond dur atteint alors même qu'aucun motif n'est remonté.
    const used = parseFloat(ent(h, c.entity_reserve)?.attributes?.arrosage_recent_7j);
    const max  = parseFloat(ent(h, c.entity_fenetre_optimale)?.attributes?.weekly_guardrail_mm_max);
    return Number.isFinite(used) && Number.isFinite(max) && max > 0 && used >= max;
  }

  _render() {
    const card = this._shadow && this._shadow.getElementById('gi-card');
    if (!card) return;
    card.innerHTML = this._html();
    this._bindEvents(card);
    this._suivreDefilementOnglets(card);
  }

  // ── Shell ─────────────────────────────────────────────────────────────────

  _html() {
    const h = this._hass; const c = this._config;
    const t = k => this._t(k);
    const TABS = [
      { key: 'synthese', label: t('tab_synthese') },
      { key: 'arrosage', label: t('tab_arrosage') },
      { key: 'tonte',    label: t('tab_tonte')    },
      { key: 'gazon',    label: t('tab_gazon')    },
      { key: 'produits', label: t('tab_produits') },
      { key: 'reglages', label: t('tab_reglages') },
    ];

    const meteoAttr  = ent(h, c.entity_meteo)?.attributes || {};
    const meteoState = stateOf(h, c.entity_meteo);
    const METEO_ICONS = { sunny:'☀️', partlycloudy:'⛅', cloudy:'☁️', rainy:'🌧️', snowy:'❄️', lightning:'⛈️', windy:'💨', fog:'🌫️', clear_night:'🌙' };
    const now2 = Date.now();
    if (c.entity_meteo && now2 - this._forecastTs > 30 * 60 * 1000) this._fetchForecast();
    const meteoBar = c.entity_meteo ? (() => {
      const tUnit   = meteoAttr.temperature_unit || '°C';
      const tCurrent = meteoAttr.temperature ?? null;
      const tMax     = this._forecast?.temperature ?? null;
      const tMin     = this._forecast?.templow ?? null;
      const precip   = this._forecast?.precipitation ?? null;
      // ⚠️ `num()` et pas l'interpolation brute : la barre météo était le SEUL bloc de la
      // carte à afficher des points décimaux (« 23.8°C », « 0.3 mm ») juste à côté de valeurs
      // à la virgule (« UV 3,8 », « 7,6 mm »), sur la même ligne. Constaté le 31/07/2026.
      const rangeStr = (tMin !== null && tMax !== null) ? `${num(tMin, 0)}–${num(tMax, 0)}${tUnit}` : '';
      const now      = new Date();
      const loc      = t('_locale');
      const dateStr  = now.toLocaleDateString(loc, {weekday:'short', day:'numeric', month:'short'});
      return `
      <div class="meteo-widget">
        <div class="meteo-top">
          <div class="meteo-left">
            <div class="meteo-icon">${METEO_ICONS[meteoState] || '🌡️'}</div>
            <div>
              <div class="meteo-temp-range">${tCurrent !== null ? num(tCurrent, 1) + tUnit : '—'}</div>
              ${rangeStr ? `<div class="meteo-label">${rangeStr}</div>` : `<div class="meteo-label">${t('today').toLowerCase()}</div>`}
            </div>
          </div>
          <div class="meteo-right">
            <div class="meteo-time">${nowHHMM(loc)}</div>
            <div class="meteo-date">${dateStr}</div>
          </div>
        </div>
        <div class="meteo-stats">
          ${meteoAttr.humidity   !== undefined ? `<span class="meteo-stat" title="Humidité de l'air">💧 ${num(meteoAttr.humidity, 0)} %</span>` : ''}
          ${meteoAttr.wind_speed !== undefined ? `<span class="meteo-stat">💨 ${num(meteoAttr.wind_speed, 1)} ${meteoAttr.wind_speed_unit || 'km/h'}</span>` : ''}
          ${precip !== null ? `<span class="meteo-stat" title="Pluie attendue aujourd'hui">🌧️ ${num(precip, 1)} mm</span>` : ''}
          ${/* UV et point de rosée : disponibles sur la plupart des intégrations météo et
                utiles POUR UN GAZON — l'UV dit la charge de stress lumineux, le point de rosée
                annonce la rosée du matin, qui retarde la tonte et favorise les maladies.
                Ils dormaient dans l'entité sans jamais être montrés. */''}
          ${meteoAttr.uv_index !== undefined && meteoAttr.uv_index !== null
            ? `<span class="meteo-stat${Number(meteoAttr.uv_index) >= 6 ? ' meteo-stat-hot' : ''}" title="Indice UV — au-delà de 6, le gazon encaisse">☀️ UV ${num(meteoAttr.uv_index, 1)}</span>` : ''}
          ${meteoAttr.dew_point !== undefined && meteoAttr.dew_point !== null
            ? `<span class="meteo-stat" title="Point de rosée — plus il est proche de la température, plus la rosée est probable au petit matin">🌫️ ${num(meteoAttr.dew_point, 0)}${tUnit}</span>` : ''}
        </div>
      </div>`;
    })() : '';

    return `
      <div class="header">
        <div class="logo">
          <div class="logo-dot"></div>
          <div>
            <div class="logo-title">${c.title}</div>
            ${c.subtitle ? `<div class="logo-sub">${c.subtitle}</div>` : ''}
          </div>
        </div>
        ${!c.entity_meteo ? `<div class="header-time">${nowHHMM(t('_locale'))}</div>` : ''}
      </div>
      ${meteoBar}
      <div class="tabs">
        ${TABS.map(t => `<button class="tab${this._tab === t.key ? ' active' : ''}" data-tab="${t.key}">${t.label}</button>`).join('')}
      </div>
      <div class="content">${this._renderTab()}</div>
      ${this._manualModal()}
      ${this._declareOpen ? this._modalDeclare() : ''}
      ${this._modalService()}
    `;
  }

  _renderTab() {
    const fn = this[`_tab_${this._tab}`];
    return fn ? fn.call(this) : '';
  }

  // ── Tab : Synthèse ────────────────────────────────────────────────────────


  /* ── LE BULLETIN ─────────────────────────────────────────────────────────────
     Demandé par Kévin : « que la carte parle », maintenant qu'elle a de quoi dire.
     On compose des PHRASES à partir des valeurs réelles plutôt que d'aligner des
     nombres — l'utilisateur veut savoir où il en est, pas relire un tableau de bord.
     Chaque phrase est conditionnelle : rien à dire = rien d'écrit, jamais de vide
     poli ni de « — ». L'ordre suit celui de l'assistant : eau, tonte, à éviter. */
  /* Minuscule sur la SEULE première lettre : `toLowerCase()` sur toute la chaîne
     écrasait les unités — « 38 °C » devenait « 38 °c ». Repéré en simulant le rendu. */
  _minuscule(txt) {
    const t = String(txt ?? '').trim();
    return t ? t.charAt(0).toLowerCase() + t.slice(1) : '';
  }

  /* Le dégradé de bord ne doit pas voiler le dernier onglet une fois qu'on y est arrivé. */
  _suivreDefilementOnglets(racine) {
    const barre = racine.querySelector('.tabs');
    if (!barre || barre.dataset.suivi) return;
    barre.dataset.suivi = '1';
    const maj = () => {
      const fin = barre.scrollLeft + barre.clientWidth >= barre.scrollWidth - 2;
      barre.classList.toggle('at-end', fin);
    };
    barre.addEventListener('scroll', maj, { passive: true });
    maj();
  }

  /* Un blocage mérite-t-il d'alarmer ? Utilisé par la Synthèse ET par l'onglet Arrosage :
     factorisé exprès, les deux ayant divergé une fois. */
  _blocageMeriteAlerte() {
    const h = this._hass, c = this._config;
    if (!h) return false;
    const risque = String(stateOf(h, c.entity_risque) || '').toLowerCase();
    if (['eleve', 'critique'].includes(risque)) return true;
    const r = parseFloat(stateOf(h, c.entity_reserve));
    const seuil = parseFloat(
      attrOf(h, c.entity_etat_hydrique, 'reserve_minimale_mm')
      ?? attrOf(h, c.entity_reserve, 'reserve_minimale_mm'));
    return !isNaN(r) && !isNaN(seuil) && r < seuil;
  }


  /* Déclarer une application depuis la carte. Le service `declare_intervention` attend le TYPE
     d'intervention ; le catalogue (`products_summary`) porte déjà le type de chaque produit, on
     le déduit donc du produit choisi plutôt que de demander deux fois la même chose. */
  _modalDeclare() {
    const h = this._hass, c = this._config;
    const cat = (attrOf(h, c.entity_catalogue_produits, 'products_summary')
      || attrOf(h, c.entity_prochaine_intervention, 'products_summary') || []);
    const aujourdhui = new Date().toISOString().slice(0, 10);
    const choisi = this._declareProduit || (cat[0] && cat[0].id) || '';
    const fiche = cat.find(x => x.id === choisi) || null;
    return `
      <div class="modal-back" data-action="declare-close">
        <div class="modal" data-action="modal-stop">
          <div class="modal-head">
            <div class="modal-title">🧪 Déclarer un produit</div>
            <button class="modal-x" data-action="declare-close" aria-label="Fermer">✕</button>
          </div>
          ${cat.length ? `
            <label class="champ-lbl" for="gi-decl-prod">Quel produit as-tu mis ?</label>
            <select class="champ" id="gi-decl-prod" data-action="declare-produit">
              ${cat.map(x => `<option value="${esc(x.id)}"${x.id === choisi ? ' selected' : ''}>${esc(x.nom)}</option>`).join('')}
            </select>
            ${fiche ? `<div class="champ-aide">${esc(fiche.type)}${
              fiche.dose_conseillee ? ` · dose conseillée ${esc(fiche.dose_conseillee)}` : ''}</div>` : ''}
            <label class="champ-lbl" for="gi-decl-date">Quand ?</label>
            <input class="champ" id="gi-decl-date" type="date" value="${aujourdhui}" max="${aujourdhui}">
            <label class="champ-lbl" for="gi-decl-note">Une note ? (facultatif)</label>
            <input class="champ" id="gi-decl-note" type="text" placeholder="ex. moitié de la surface">
            <button class="btn-run" data-action="declare-run">Enregistrer</button>
          ` : `<div class="champ-aide">Aucun produit enregistré. Utilise d'abord le service
                <code>register_product</code> pour créer ta fiche produit.</div>`}
        </div>
      </div>`;
  }


  /* LES SERVICES DE L'INTÉGRATION, RENDUS ACCESSIBLES (demandé par Kévin, 30/07/2026).
     Treize services existaient, la carte n'en appelait que deux. Répartition :
     - ceux qui ont un contexte naturel vont dans LEUR onglet (déclarer une tonte → Tonte,
       déclarer un arrosage → Arrosage, déclarer un produit → Produits) ;
     - les autres — mode du gazon, réserve, catalogue — vont dans Réglages, en popup,
       parce qu'ils touchent à la configuration et méritent une confirmation. */
  _actionsRapides(liste) {
    if (!liste.length) return '';
    return `<div class="actions-rapides">${liste.map(a =>
      `<button class="action-rapide${a.danger ? ' danger' : ''}" data-action="svc-open" data-svc="${a.id}">${a.icone} ${a.libelle}</button>`
    ).join('')}</div>`;
  }

  _modalService() {
    const id = this._svcOuvert;
    if (!id) return '';
    const c = this._config;
    const auj = new Date().toISOString().slice(0, 10);
    const D = {
      'declare_mowing': {
        titre: '✂️ Déclarer une tonte', aide: "Enregistre une tonte que tu viens de faire.",
        champs: [{ k: 'date_action', l: 'Quand ?', t: 'date', v: auj }],
        cible: c.entity_tonte_autorisee,
      },
      'declare_watering': {
        titre: '💧 Déclarer un arrosage', aide: "Un arrosage manuel que l'intégration n'a pas vu.",
        champs: [{ k: 'date_action', l: 'Quand ?', t: 'date', v: auj },
                 { k: 'quantite_mm', l: 'Combien de mm ?', t: 'number', v: '5', pas: '0.5' }],
        cible: c.entity_objectif_arrosage,
      },
      'recalibrate_reserve': {
        titre: '🪣 Recaler la réserve du sol',
        aide: "À utiliser après une mesure au tournevis, ou pour corriger une comptabilité faussée.",
        champs: [{ k: 'reserve_mm', l: 'Réserve mesurée (mm)', t: 'number', v: '10', pas: '0.1' },
                 { k: 'figer_la_journee', l: 'Figer la valeur jusqu\'à minuit', t: 'bool', v: true }],
        cible: c.entity_reserve,
      },
      'reset_mode': {
        titre: '↩️ Revenir au mode Normal',
        aide: "Annule la phase en cours (traitement, sursemis…) et repasse en entretien courant.",
        champs: [], cible: c.entity_phase,
      },
      'remove_last_application': {
        titre: '🗑️ Annuler la dernière application',
        aide: "Retire la dernière application déclarée. À utiliser en cas d'erreur de saisie.",
        champs: [], cible: c.entity_prochaine_intervention, danger: true,
      },
    }[id];
    if (!D) return '';
    return `
      <div class="modal-back" data-action="svc-close">
        <div class="modal" data-action="modal-stop">
          <div class="modal-head">
            <div class="modal-title">${D.titre}</div>
            <button class="modal-x" data-action="svc-close" aria-label="Fermer">✕</button>
          </div>
          <div class="champ-aide">${esc(D.aide)}</div>
          ${D.champs.map(f => f.t === 'bool'
            ? `<label class="champ-bool"><input type="checkbox" id="gi-svc-${f.k}"${f.v ? ' checked' : ''}> ${esc(f.l)}</label>`
            : `<label class="champ-lbl" for="gi-svc-${f.k}">${esc(f.l)}</label>
               <input class="champ" id="gi-svc-${f.k}" type="${f.t}" value="${f.v}"${
                 f.pas ? ` step="${f.pas}"` : ''}${f.t === 'date' ? ` max="${auj}"` : ''}>`).join('')}
          <button class="btn-run${D.danger ? ' btn-danger' : ''}" data-action="svc-run">
            ${D.danger ? 'Confirmer la suppression' : 'Enregistrer'}</button>
        </div>
      </div>`;
  }

  _briefing() {
    const h = this._hass, c = this._config;
    if (!h) return '';
    const lignes = [];

    // ── L'eau ────────────────────────────────────────────────────────────────
    const dernier   = stateOf(h, c.entity_dernier_arrosage);
    const quand     = attrOf(h, c.entity_dernier_arrosage, 'last_watering_when');
    const nbZones   = attrOf(h, c.entity_dernier_arrosage, 'zone_count');
    // ⚠️ `fr-FR` VOULU ici, ce n'est PAS un affichage : `last_watering_when` est une chaîne
    // produite par l'intégration, toujours au format « jj/mm/aaaa à hh:mm », quelle que soit
    // la langue de l'interface. On compare donc au MÊME format. Le passer sur la locale de
    // l'utilisateur casserait silencieusement la détection « arrosé aujourd'hui » en anglais.
    const auj       = quand && typeof quand === 'string'
      && quand.startsWith(new Date().toLocaleDateString('fr-FR'));
    if (auj && dernier && parseFloat(dernier) > 0) {
      const heure = String(quand).split(' à ')[1] || '';
      lignes.push(`Tu as arros\u00e9 <b>${num(dernier, 1)} mm</b>${heure ? ` \u00e0 ${esc(heure)}` : ''}${
        nbZones ? `, sur ${nbZones} zone${nbZones > 1 ? 's' : ''}` : ''}.`);
    }

    const reserve = parseFloat(stateOf(h, c.entity_reserve));
    // Le seuil MAD n'est pas porté par la même entité selon la config de la carte :
    // on tente les trois qui l'exposent plutôt que de dépendre d'une seule déclaration.
    const premierNombre = (...vals) => {
      for (const v of vals) { const n = parseFloat(v); if (!isNaN(n)) return n; }
      return NaN;
    };
    const utile = premierNombre(
      attrOf(h, c.entity_reserve, 'reserve_utile_mm'),
      attrOf(h, c.entity_etat_hydrique, 'reserve_utile_mm'), 12);
    const seuil = premierNombre(
      attrOf(h, c.entity_objectif_arrosage, 'reserve_minimale_mm'),
      attrOf(h, c.entity_etat_hydrique, 'reserve_minimale_mm'),
      attrOf(h, c.entity_reserve, 'reserve_minimale_mm'));
    if (!isNaN(reserve)) {
      let etat;
      if (!isNaN(seuil) && reserve < seuil)        etat = 'le sol commence \u00e0 manquer';
      else if (reserve >= utile * 0.85)            etat = 'le sol est bien pourvu';
      else                                          etat = 'le sol est confortable';
      lignes.push(`La r\u00e9serve est \u00e0 <b>${num(reserve, 1)} mm</b> sur ${num(utile, 0)} — ${etat}.`);
    }

    // ── Ce qui est prévu, ou pourquoi rien ───────────────────────────────────
    // ⚠️ LE MOTIF D'ARROSAGE VIENT DE L'ENTITÉ ARROSAGE, pas de l'assistant.
    // L'assistant est une CHAÎNE DE PRIORITÉS : quand l'arrosage n'a rien à signaler, il
    // descend sur la tonte. Sa `reason` parlait donc de la tondeuse, et la carte l'annonçait
    // comme la raison de ne pas arroser. Vu sur l'écran de Kévin le 03/08/2026 :
    //   « Pas d'arrosage pour l'instant : robot indisponible: attendre qu'elle soit prête. »
    // alors que la tuile juste dessous affichait le vrai motif, « Déjà arrosé aujourd'hui ».
    // Deux lignes, un même écran, une vraie et une fausse.
    const motif   = attrOf(h, c.entity_prochain_arrosage, 'block_reason_label');
    const prochain = stateOf(h, c.entity_prochain_arrosage);
    if (motif && String(motif).trim()) {
      lignes.push(`Pas d'arrosage pour l'instant : <b>${esc(this._minuscule(String(motif).replace(/\.$/, '')))}</b>.`);
    } else if (prochain && prochain !== 'Bloqu\u00e9' && prochain !== 'unknown') {
      lignes.push(`Prochain arrosage : <b>${esc(prochain)}</b>.`);
    }

    // ── La tonte : le gazon et la machine sont deux choses distinctes ────────
    const gazonOk   = attrOf(h, c.entity_assistant, 'gazon_permet_tonte');
    const machineOk = attrOf(h, c.entity_assistant, 'machine_permet_tonte');
    const motifTonte = attrOf(h, c.entity_tonte_autorisee, 'raison_blocage_tonte');
    if (gazonOk === false && motifTonte) {
      // `.split('.')` coupait sur N'IMPORTE QUEL point — y compris la décimale d'une
      // température : « Trop chaud pour tondre (32.0 °C… » devenait « …pour tondre (32 ».
      // Même motif robuste qu'en bas (fin de phrase = point SUIVI D'UNE ESPACE).
      const court = String(motifTonte).split(/\s*:\s*/)[0].split(/\.\s/)[0].replace(/\.$/, '');
      lignes.push(`La tonte attend : <b>${esc(this._minuscule(court))}</b>.`);
    } else if (gazonOk === true && machineOk === false) {
      lignes.push(`Le gazon serait pr\u00eat \u00e0 \u00eatre tondu, mais <b>la tondeuse n'est pas disponible</b>.`);
    } else if (gazonOk === true && machineOk === true) {
      lignes.push(`La tonte est <b>possible d\u00e8s maintenant</b>.`);
    }

    if (!lignes.length) return '';
    return `
      <div class="briefing">
        <div class="briefing-mark" aria-hidden="true">\u{1F4AC}</div>
        <div class="briefing-body">${lignes.map(l => `<p>${l}</p>`).join('')}</div>
      </div>`;
  }

  _tab_synthese() {
    const h = this._hass; const c = this._config;

    // ── Assistant ────────────────────────────────────────────────────────────
    const action   = attrOf(h, c.entity_assistant, 'action')  || 'attente';
    const reason   = attrOf(h, c.entity_assistant, 'reason')  || '';
    const moment   = attrOf(h, c.entity_assistant, 'moment')  || '';
    const qty      = attrOf(h, c.entity_assistant, 'quantity_mm');
    const status   = attrOf(h, c.entity_assistant, 'status')  || '';
    // Canicule = arrosage de SURVIE (≥ 32 °C réels + réserve quasi vide), signalé par
    // l'intégration via `survie_canicule_active`. Les deux tests d'origine étaient MORTS :
    // `canicule_active` n'a jamais existé côté intégration, et les codes d'action valent
    // `aucune_action` / `surveiller` / `a_faire` / `critique` — aucun ne contient « canicule ».
    // Le bandeau ne passait donc JAMAIS en rouge, même pendant une intervention d'urgence.
    // On ne se base PAS sur `heat_stress_level` : ce score composite dit déjà « severe » dès
    // 30 °C via l'ET0 et l'air sec, il alarmerait pour rien.
    const canicule = attrOf(h, c.entity_assistant, 'survie_canicule_active') === true
      || action.includes('canicule');

    const isBlocked  = status.includes('block') || action === 'attendre' || action === 'aucune_action' || action === 'attente_conditions';
    const isWatering = action.startsWith('arroser');
    // TON DU BANDEAU — l'orange est une ALERTE, il doit rester rare.
    // Avant : tout blocage passait en orange. Or « déjà arrosé aujourd'hui », « pluie prévue »
    // ou « sol déjà humide » sont des états SAINS : le bandeau criait à l'alerte pendant que
    // le bulletin, juste en dessous, annonçait « le sol est bien pourvu ». Repéré en rendant
    // la carte sur les données réelles du 30/07.
    // On n'alarme donc que si quelque chose demande vraiment de l'attention : le gazon est à
    // risque, ou la réserve est passée sous le seuil de déclenchement.
    const meriteAlerte = this._blocageMeriteAlerte();
    const heroTone   = canicule ? 'danger' : isWatering ? '' : (isBlocked && meriteAlerte) ? 'warn' : '';
    const heroTitleRaw = this._lblt(ACTION_LABELS, action);
    const heroTitle  = heroTitleRaw.charAt(0).toUpperCase() + heroTitleRaw.slice(1);

    const ACTION_ICONS = {
      arroser: '💧', arroser_application: '💧', arroser_canicule_survie: '🔥',
      arroser_canicule_soir: '🌙', attendre: '⏳', attente_conditions: '⏳',
      aucune_action: '✅', tonte: '✂️',
    };
    const heroIcon = ACTION_ICONS[action] || (action.includes('tonte') ? '✂️' : '⏳');

    let badge = '';
    if (moment && moment !== 'attendre') badge += moment;
    if (qty && parseFloat(qty) > 0) badge += (badge ? ' · ' : '') + num(qty, 1) + ' mm';

    // ── Hydric state ─────────────────────────────────────────────────────────
    const hydrAttr    = ent(h, c.entity_etat_hydrique)?.attributes || {};
    const fillRatio   = hydrAttr.reserve_available_ratio ?? attrOf(h, c.entity_reserve, 'reserve_available_ratio') ?? null;
    const reserveMm   = hydrAttr.reserve_actuelle_mm || stateOf(h, c.entity_reserve);
    const fillPct     = fillRatio !== null ? Math.round(parseFloat(fillRatio) * 100) : null;
    const fillClass   = fillRatio !== null ? tonePct(fillRatio) : '';
    const fillBarColor = fillRatio !== null ? (fillRatio < 0.25 ? 'var(--gi-danger)' : fillRatio < 0.5 ? 'var(--gi-warn)' : 'var(--gi-accent)') : 'var(--gi-accent)';

    // ET₀ & pluie attendue (depuis entity_objectif_arrosage si configuré)
    const objAttr       = ent(h, c.entity_objectif_arrosage)?.attributes || {};
    const et0Today      = objAttr.et0_mm ?? hydrAttr.et0_jour_mm ?? hydrAttr.et0_mm ?? null;
    const pluieAttendue = objAttr.pluie_demain ?? null;

    // ── Risk & phase ─────────────────────────────────────────────────────────
    const risqueRaw   = stateOf(h, c.entity_risque) || '';
    const risqueClass = risqueRaw === 'eleve' || risqueRaw === 'critique' ? 'danger' : risqueRaw === 'modere' ? 'warn' : 'accent';
    const phase       = stateOf(h, c.entity_phase) || '';

    // ── Next watering ─────────────────────────────────────────────────────────
    const nextArrAttr   = ent(h, c.entity_prochain_arrosage)?.attributes || {};
    const nextArrWindow = nextArrAttr.watering_window_display || '';
    const nextArrQty    = nextArrAttr.objective_mm;
    // On gate le blocage sur l'ÉTAT réel du capteur (« Bloqué »), pas sur la présence d'un
    // block_reason_label : ce libellé peut « traîner » (ex. « Garde-fou hebdomadaire ») alors
    // que l'état est « Non requis » (rien à arroser, pas réellement bloqué). Sinon l'estimation
    // ne s'afficherait jamais en confort.
    const nextArrState  = stateOf(h, c.entity_prochain_arrosage) || '';
    // « Retenu » (intégration 0.48.0) = l'objectif est à 0 PARCE QU'un garde-fou retient l'eau.
    // Il annonçait auparavant « Non requis », ce qui prétendait que le gazon n'avait besoin de
    // rien alors qu'on lui refusait précisément ce dont il avait besoin. Sans cette ligne, la
    // carte lirait le nouvel état comme « pas bloqué » et afficherait une estimation sereine.
    const nextArrBlocked = nextArrState === 'Bloqué' || nextArrState === 'Retenu';
    const nextArrBlockLbl = nextArrAttr.block_reason_label || '';
    const nextArrDue    = Number(nextArrQty) > 0;
    // Jour estimé du prochain arrosage (fourni par l'intégration : déplétion réserve → MAD).
    // Affiché en priorité en confort (ni bloqué, ni arrosage déjà dû) ; sinon fenêtre horaire.
    const nextArrDayEst = this._nextWateringDayLabel(
      nextArrAttr.jours_avant_arrosage_estime,
      nextArrAttr.date_prochain_arrosage_estime,
    );
    // Le jour estimé ne regarde que la SOIF DU SOL, pas le droit d'arroser. Quand le garde-fou
    // hebdomadaire retient l'arrosage, annoncer « imminent » en gros titre promet un arrosage
    // qui n'aura pas lieu — et contredit le hero du même panneau, qui dit « Aucune action ».
    // Constaté par Kévin le 31/07/2026. Le titre porte alors le MOTIF ; l'estimation reste
    // visible en sous-titre, à sa juste valeur : « quand le sol aura soif », pas « quand j'arrose ».
    const nextArrBudgetOver = this._budgetOver();
    const nextArrVal = nextArrBlocked
      ? (nextArrBlockLbl || nextArrState || '—')
      : nextArrDue
        ? (nextArrWindow || '—')
        : nextArrBudgetOver
          ? (nextArrBlockLbl || nextArrState || '—')
          : (nextArrDayEst || nextArrWindow || '—');
    const nextArrSub = nextArrBlocked
      ? ''
      : nextArrDue
        ? (nextArrQty ? `<div class="stat-sub">${num(nextArrQty, 1)} mm</div>` : '')
        // Retenu par le garde-fou : même règle que le hero de l'onglet Arrosage — pas
        // d'estimation, le sous-titre explique la RETENUE, dans les mots de la jauge.
        : nextArrBudgetOver
          ? `<div class="stat-sub">${this._t('budget_hold_sub')}</div>`
          : nextArrDayEst
            ? `<div class="stat-sub">${this._t('estimated')} ${nextArrDayEst}${
                nextArrWindow ? ` · ${nextArrWindow}` : ''
              }</div>`
            : '';

    // ── Next mow ─────────────────────────────────────────────────────────────
    const nextTonteAttr = ent(h, c.entity_prochaine_tonte)?.attributes || {};
    const nextTonteDate = nextTonteAttr.target_date || stateOf(h, c.entity_prochaine_tonte);

    const autoOn = isOn(h, c.entity_switch_arrosage_auto);
    const active = (c.zones || []).some(z => isOn(h, z.sensor) || isOn(h, z.switch));

    // ── Context pills ─────────────────────────────────────────────────────────
    const ctxPills = [];
    if (phase) ctxPills.push(`<div class="ctx-pill">🌿 ${phase}</div>`);
    if (et0Today !== null) ctxPills.push(`<div class="ctx-pill">☀️ ET₀ ${num(et0Today, 1)} mm</div>`);
    // Qualité de la mesure d'ET₀ : depuis que le bilan du sol est piloté par une ET₀ calculée
    // heure par heure, savoir si elle tourne sur des capteurs RÉELS ou sur des replis change la
    // confiance qu'on peut lui accorder (un vent PRÉVU au lieu de mesuré donnait 9 mm/j au lieu
    // de 6). La pastille n'apparaît QUE lorsqu'un repli est actif — en marche normale, rien.
    const health = attrOf(h, c.entity_reserve, 'sensor_health') || {};
    if (health.eto_hourly_available === false) {
      ctxPills.push(`<div class="ctx-pill warn">⚠️ ET₀ estimée</div>`);
    } else if (health.eto_radiation_measured === false || health.eto_pressure_measured === false) {
      const manquants = [
        health.eto_radiation_measured === false ? 'rayonnement' : null,
        health.eto_pressure_measured === false ? 'pression' : null,
      ].filter(Boolean).join(' + ');
      ctxPills.push(`<div class="ctx-pill warn" title="ET₀ calculée sans ${manquants} mesuré(e)">⚠️ ET₀ approchée</div>`);
    }
    if (pluieAttendue !== null && parseFloat(pluieAttendue) > 0) ctxPills.push(`<div class="ctx-pill">🌧️ ${num(pluieAttendue, 1)} mm attendus</div>`);

    return `
      <div class="hero ${heroTone}">
        <div class="hero-eyebrow">${this._t('tab_synthese')}</div>
        <div class="hero-header">
          <div class="hero-icon">${heroIcon}</div>
          <div class="hero-body">
            <div class="hero-title">${heroTitle}</div>
            ${reason ? `<div class="hero-sub">${esc(reason)}</div>` : ''}
          </div>
        </div>
        <div class="hero-foot">
          ${badge ? `<div class="hero-badge"><div class="hero-dot"></div>${badge}</div>` : '<span></span>'}
          <div class="hero-status">
            <div class="hero-status-dot" style="background:${autoOn ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.35)'}"></div>
            ${autoOn ? this._t('auto_on') : this._t('auto_off')}
            ${active ? ` · ${this._t('watering_active_chip')}` : ''}
          </div>
        </div>
      </div>

      ${this._briefing()}

      ${canicule ? `<div class="synth-banner"><div class="synth-banner-icon">🌡️</div>Mode canicule actif — survie du gazon prioritaire</div>` : ''}

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">${this._t('soil_reserve')}</div>
          <div class="stat-value ${fillClass}">${fillPct !== null ? fillPct + ' %' : '—'}</div>
          ${reserveMm ? `<div class="stat-sub">${num(reserveMm, 1)} mm</div>` : ''}
          ${fillPct !== null ? `<div class="stat-mini-bar"><div class="stat-mini-bar-fill" style="width:${fillPct}%;background:${fillBarColor}"></div></div>` : ''}
        </div>
        <div class="stat-card risk-${risqueRaw || 'faible'}">
          <div class="stat-label">${this._t('lawn_risk')}</div>
          <div class="stat-value sm ${risqueClass}">${this._lblt(RISQUE_LABELS, risqueRaw)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">${this._t('next_watering')}</div>
          <div class="stat-value sm">${nextArrVal}</div>
          ${nextArrSub}
        </div>
        <div class="stat-card">
          <div class="stat-label">${this._t('next_mow')}</div>
          <div class="stat-value sm">${nextTonteDate ? fmtDate(nextTonteDate, k => this._t(k)) : '—'}</div>
        </div>
      </div>

      ${ctxPills.length ? `<div class="ctx-pills">${ctxPills.join('')}</div>` : ''}
    `;
  }

  // ── Tab : Arrosage ────────────────────────────────────────────────────────

  _tab_arrosage() {
    const h = this._hass; const c = this._config;

    const sessAttr    = ent(h, c.entity_arrosage_en_cours)?.attributes || {};
    const sessActive  = sessAttr.active === true;
    const progressPct = sessAttr.progress_percent || 0;
    const remainSecs  = sessAttr.remaining_session_seconds || 0;
    const remainMin   = Math.ceil(remainSecs / 60);
    const startedUtc  = sessAttr.started_at_utc;
    let sessTimeLabel = '';
    if (startedUtc) {
      const d = new Date(startedUtc);
      const today = new Date();
      const isToday = d.toDateString() === today.toDateString();
      // Affichage : suit la langue de la carte. C'était figé sur fr-FR, libellé compris.
      const loc  = this._t('_locale');
      const hhmm = d.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' });
      sessTimeLabel = isToday
        ? `${this._t('started_at')} ${hhmm}`
        : `${this._t('started_on')} ${d.toLocaleDateString(loc, { day: '2-digit', month: '2-digit' })} ${this._t('at_time')} ${hhmm}`;
    }

    // Arrosage manuel : ouvre un popup de préparation (dose + durée par zone) avant de lancer.
    const objMm     = parseFloat(stateOf(h, c.entity_objectif_arrosage)) || 0;
    const manualRow = `
      <div class="toggle-row">
        <div class="toggle-info">
          <div class="toggle-name">${this._t('manual_watering')}</div>
          <div class="toggle-sub">${objMm > 0
            ? `${this._t('manual_watering_hint')} ${num(objMm, 1)} mm`
            : this._t('manual_watering_free')}</div>
        </div>
        <button class="btn-on" data-action="manual-open">${this._t('btn_manual_setup')}</button>
      </div>
      ${/* Inutile pendant une session en cours : l'intégration l'enregistre toute seule. */''}
      ${sessActive ? '' : this._actionsRapides([{ id: 'declare_watering', icone: '💧',
        libelle: "J'ai arrosé à la main" }])}
    `;

    const nextAttr       = ent(h, c.entity_prochain_arrosage)?.attributes || {};
    const nextBlock      = nextAttr.block_reason_label || '';
    // L'attribut s'appelle `block_reason` — `block_reason_code` n'existe PAS sur ce capteur
    // (il n'existe que sur les entités de TONTE, cf. `mowing_block_reason_code` plus bas).
    // Résultat : ce code valait toujours '' et `nextBlockRain` toujours faux, donc le bandeau
    // « bloqué par la pluie » (bleu, 🌧️) n'était JAMAIS affiché depuis sa création — la pluie
    // héritait du bandeau orange générique. Défaut muet : aucune erreur, aucun test rouge.
    const nextBlockCode  = nextAttr.block_reason || '';
    const nextWindow     = nextAttr.watering_window_display || '';
    const nextQty        = nextAttr.objective_mm;
    const nextBlockRain  = nextBlockCode.includes('pluie') || nextBlockCode.includes('rain');
    // Blocage RÉEL = état « Bloqué » (pas la simple présence d'un block_reason_label qui peut
    // traîner en « Non requis »). Sinon le hero « bloqué » masquerait l'estimation en confort.
    const nextBlockedState = stateOf(h, c.entity_prochain_arrosage) || '';
    const nextBlocked    = nextBlockedState === 'Bloqué' || nextBlockedState === 'Retenu';
    const nextDayEst     = this._nextWateringDayLabel(
      nextAttr.jours_avant_arrosage_estime,
      nextAttr.date_prochain_arrosage_estime,
    );
    const nextBudgetOver = this._budgetOver();

    const zones = c.zones || [];
    const zoneCards = zones.length ? zones.map((z, i) => {
      const physOn   = isOn(h, z.sensor) || isOn(h, z.switch);
      const isActive = physOn;
      const color    = ZONE_COLORS[i % ZONE_COLORS.length];
      const sw       = z.switch || '';
      const pompe    = c.pompe_switch || '';

      if (isActive) {
        const lc      = ent(h, sw)?.last_changed;
        const elapsed = lc ? Date.now() - new Date(lc).getTime() : 0;
        return `
          <div class="zone-card active">
            <div class="zone-dot on"></div>
            <div class="zone-info">
              <div class="zone-name">${z.name || 'Zone ' + (i + 1)}</div>
              <div style="display:flex;align-items:center;gap:6px;margin-top:2px">
                <span class="zone-ch" style="background:${color}">Z${i + 1}</span>
                <span class="zone-active-badge">${this._t('zone_active_badge')}</span>
                <span class="zone-active-clock">⏱</span>
                <span class="zone-active-elapsed">${fmtTimer(elapsed)}</span>
                ${z.debit ? `<span class="zone-detail">${num(z.debit, 0)} mm/h</span>` : ''}
              </div>
            </div>
            <div class="zone-btns">
              <button class="zone-active-stop" data-action="zone-off" data-switch="${sw}" data-pompe="${pompe}">${this._t('btn_stop')}</button>
            </div>
          </div>`;
      }

      return `
        <div class="zone-card">
          <div class="zone-dot"></div>
          <div class="zone-info">
            <div class="zone-name">${z.name || 'Zone ' + (i + 1)}</div>
            <div><span class="zone-ch" style="background:${color}">Z${i + 1}</span></div>
            <div class="zone-detail">${z.debit ? z.debit + ' mm/h · ' + this._t('zone_inactive') : this._t('zone_inactive')}</div>
          </div>
          <div class="zone-btns">
            <button class="btn-on"    data-action="zone-on"    data-switch="${sw}" data-pompe="${pompe}">ON</button>
            <button class="btn-pulse" data-action="zone-pulse" data-switch="${sw}" data-pompe="${pompe}">5 min</button>
          </div>
        </div>`;
    }).join('') : `<div class="empty">${this._t('no_zones')}</div>`;

    const pompeOn = isOn(h, c.pompe_switch);
    const pompeCard = c.pompe_switch ? `
      <div class="zone-card${pompeOn ? ' active' : ''}">
        <div class="zone-dot${pompeOn ? ' on' : ''}"></div>
        <div class="zone-info">
          <div class="zone-name">${this._t('pump')}</div>
          <div class="zone-detail${pompeOn ? ' on' : ''}">${pompeOn ? this._t('pump_active') : this._t('pump_off')}</div>
        </div>
        ${pompeOn
          ? `<button class="btn-off" data-action="zone-off" data-switch="${c.pompe_switch || ''}" data-pompe="">${this._t('btn_off')}</button>`
          : `<button class="btn-on"  data-action="zone-on"  data-switch="${c.pompe_switch || ''}" data-pompe="">ON</button>`
        }
      </div>` : '';

    return `
      ${sessActive ? `
        <div class="hero">
          <div class="hero-eyebrow">${this._t('session_active')}</div>
          <div class="hero-title">${this._t('watering_active')}</div>
          <div class="hero-sub">${sessTimeLabel}${remainMin > 0 ? ` · ~${remainMin} min restantes` : ''}</div>
          <div class="sess-progress-wrap">
            <div class="sess-progress-bar" style="width:${Math.min(100, num(progressPct, 0))}%"></div>
          </div>
          <div class="hero-badge" style="margin-top:6px"><div class="hero-dot"></div>${num(progressPct, 0)} %</div>
          ${/* Arrêt d'urgence : rendu SEULEMENT dans ce bandeau, donc seulement quand un cycle
               tourne. Pas de confirmation — un arrêt d'urgence qui demande « êtes-vous sûr ? »
               n'en est pas un, et le geste est réversible (on peut relancer). L'intégration
               ferme la vanne, enregistre l'eau déjà versée et libère le cycle. */''}
          <button class="hero-stop" data-action="stop-irrigation">${this._t('btn_stop_watering')}</button>
        </div>
      ` : nextBlocked ? `
        ${/* Même règle que la Synthèse : l'orange est une ALERTE, pas un état d'attente.
             « Déjà arrosé aujourd'hui », « pluie prévue », « sol déjà humide » sont sains.
             Sans cette cohérence, le MÊME état s'affichait vert en Synthèse et orange ici
             (constaté le 30/07/2026 en rendant les deux onglets côte à côte). */''}
        <div class="hero ${nextBlockRain ? 'rain' : (this._blocageMeriteAlerte() ? 'warn' : '')}">
          <div class="hero-eyebrow">${this._t('next_watering')}</div>
          <div class="hero-title">${nextBlockRain ? '🌧️' : '⏳'} ${esc(nextBlock || this._t('blocked'))}</div>
          ${nextWindow ? `<div class="hero-badge"><div class="hero-dot"></div>${this._t('window_lbl')} : ${nextWindow}</div>` : ''}
        </div>
      ` : (nextQty && parseFloat(nextQty) > 0) ? `
        <div class="hero">
          <div class="hero-eyebrow">${this._t('next_watering')}</div>
          <div class="hero-title">${num(nextQty, 1)} ${this._t('planned')}</div>
          ${nextWindow ? `<div class="hero-badge"><div class="hero-dot"></div>${nextWindow}</div>` : ''}
        </div>
      ` : nextBudgetOver ? `
        ${/* Le garde-fou retient l'arrosage : annoncer « imminent » en gros promettrait un
             arrosage qui n'aura pas lieu. Le titre porte le MOTIF.
             ⚠️ J'avais d'abord laissé l'estimation en sous-titre (« estimé imminent · sous
             réserve du budget ») en croyant la nuancer : l'œil lit « imminent », point. Et
             l'estimation répond à une question que personne ne pose — « quand le sol aura
             soif » — pendant que le titre répond à « est-ce que j'arrose ». Le sous-titre dit
             maintenant la MÊME chose que la jauge de budget, dans les MÊMES mots : un seul
             vocabulaire pour un seul fait. Constaté par Kévin le 31/07/2026, deux fois. */''}
        <div class="hero ${this._blocageMeriteAlerte() ? 'warn' : ''}">
          <div class="hero-eyebrow">${this._t('next_watering')}</div>
          <div class="hero-title">⏳ ${esc(nextAttr.block_reason_label || this._t('blocked'))}</div>
          <div class="hero-sub">${this._t('budget_hold_sub')}</div>
          ${/* BESOIN ≠ DOSE. L'entité « Objectif d'arrosage » affiche 0 pendant un blocage —
               c'est juste, rien ne sera versé. Mais le sol, lui, réclame toujours. Sans ce
               chiffre, la carte laissait croire que le gazon n'avait besoin de rien alors que
               la réserve était sous le seuil (constaté par Kévin le 01/08/2026). Publié par
               l'intégration 0.35.0 ; absent avant, la ligne ne s'affiche simplement pas. */''}
          ${(() => {
            const besoin = parseFloat(attrOf(h, c.entity_objectif_arrosage, 'besoin_mm'));
            return Number.isFinite(besoin) && besoin > 0
              ? `<div class="hero-sub">${this._t('need_still')} <b>${num(besoin, 1)} mm</b></div>` : '';
          })()}
          ${nextWindow ? `<div class="hero-badge"><div class="hero-dot"></div>${nextWindow}</div>` : ''}
        </div>
      ` : nextDayEst ? `
        <div class="hero">
          <div class="hero-eyebrow">${this._t('next_watering')}</div>
          <div class="hero-title">💧 ${nextDayEst}</div>
          <div class="hero-sub">${this._t('estimated_dawn')}</div>
          ${nextWindow ? `<div class="hero-badge"><div class="hero-dot"></div>${nextWindow}</div>` : ''}
        </div>
      ` : ''}

      ${manualRow}

      <div class="section-title">${this._t('section_zones')}</div>
      ${zoneCards}
      ${pompeCard}
      ${this._timeline(zones)}
    `;
  }

  _timeline(zones) {
    if (!zones.length) return '';
    const h          = this._hass;
    const c          = this._config;
    const now        = Date.now();
    const DAY        = 24 * 60 * 60 * 1000;
    const windowStart = now - DAY;  // rolling 24h window

    // Trigger history fetch if stale (>5 min) — async, re-renders when done
    if (now - this._historyTs > 5 * 60 * 1000) this._fetchHistory(zones);

    // Ruler labels: 5 evenly-spaced timestamps across the 24h window
    const hhmm = ms => new Date(ms).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const rulerLabels = [0, 6, 12, 18, 24].map(h => hhmm(windowStart + h * 3600 * 1000));

    // Build per-zone bar segments from derniers_arrosages (sequential zone order within each session)
    const derniersArrosages24 = (ent(h, c.entity_dernier_arrosage)?.attributes?.derniers_arrosages || [])
      .filter(e => new Date(e.recorded_at).getTime() >= windowStart);

    // Per-zone segments: { [switchId]: [{start_ms, end_ms}] }
    const zoneSegments = {};
    derniersArrosages24.forEach(session => {
      const sessionEnd = new Date(session.recorded_at).getTime();
      // Zones run sequentially — walk backwards from session end
      let cursor = sessionEnd;
      const zonesRev = [...(session.zones || [])].reverse();
      zonesRev.forEach(z => {
        const dur = (z.duration_min || 0) * 60 * 1000;
        const end = cursor;
        const start = cursor - dur;
        cursor = start;
        const key = z.entity_id;
        if (!zoneSegments[key]) zoneSegments[key] = [];
        zoneSegments[key].push({ start_ms: start, end_ms: end });
      });
    });

    // Source retenue par zone, calculée UNE fois : les barres et les totaux doivent lire la même
    // chose. Ils divergeaient — barres depuis les deux sources concaténées, totaux depuis la seule
    // reconstruction — de sorte qu'un total juste pouvait accompagner un tracé faux, sans que rien
    // ne le signale.
    // Le choix de la source se fait sur ce que chacune dit DE LA FENÊTRE AFFICHÉE, pas sur le fait
    // qu'elle soit non vide. Trancher sur `raw.length` laissait de vieilles sessions hors fenêtre
    // faire gagner l'historique brut, qui n'avait alors rien à montrer et empêchait le repli : le
    // graphe restait désespérément vide alors que des arrosages avaient bien eu lieu (29/07/2026).
    const inWindow = s => s.end_ms >= windowStart && s.start_ms <= now;
    const resolvedByZone = {};
    zones.forEach(z => {
      const raw = ((this._history && z.switch) ? (this._history[z.switch] || []) : []).filter(inWindow);
      const reconstructed = (zoneSegments[z.switch] || []).filter(inWindow);
      resolvedByZone[z.switch] = raw.length ? raw : reconstructed;
    });

    const rows = zones.map((z, i) => {
      const color = ZONE_COLORS[i % ZONE_COLORS.length];

      // L'historique brut des vannes est la VÉRITÉ TERRAIN : il date les ouvertures réelles.
      // La reconstruction depuis `derniers_arrosages` n'est qu'un REPLI, pour les cas où le
      // recorder a purgé la période ou ne suit pas l'interrupteur.
      //
      // Les deux étaient auparavant CONCATÉNÉES, sous un commentaire affirmant qu'elles étaient
      // « deduplicated by overlap » — ce que le code ne faisait pas : chaque arrosage était donc
      // dessiné deux fois. Et la reconstruction est en plus DÉCALÉE : elle remonte depuis la fin
      // de session en soustrayant les seules durées de zone, sans la pause entre passages. Mesuré
      // le 28/07/2026 : premier passage dessiné à 04:10 alors qu'il a eu lieu à 03:45 — les 25 min
      // de pause manquantes. Le repli reste donc approximatif par construction ; on ne l'utilise
      // que faute de mieux.
      const allSessions = [...(resolvedByZone[z.switch] || [])];

      // Live session: use real session start from entity_arrosage_en_cours
      const sessLiveAttr  = ent(h, c.entity_arrosage_en_cours)?.attributes || {};
      const sessLiveActive = sessLiveAttr.active === true;
      const sessStartUtc  = sessLiveAttr.started_at_utc;
      const sessStartMs   = sessStartUtc ? new Date(sessStartUtc).getTime() : (now - (sessLiveAttr.elapsed_seconds || 60) * 1000);
      const currentlyOn   = isOn(h, z.sensor) || isOn(h, z.switch);
      const inSession     = sessLiveActive && sessLiveAttr.active_zones?.includes(z.switch);
      if (currentlyOn || inSession) {
        const last = allSessions[allSessions.length - 1];
        if (last && last.end_ms >= sessStartMs) {
          allSessions[allSessions.length - 1] = { ...last, end_ms: now };
        } else {
          allSessions.push({ start_ms: sessStartMs, end_ms: now });
        }
      }

      const windowSessions = allSessions.filter(s => s.end_ms >= windowStart && s.start_ms <= now);
      const bars = windowSessions.map(s => {
        const leftPct  = Math.max(0, (s.start_ms - windowStart) / DAY * 100);
        const rightPct = Math.min(100, (s.end_ms   - windowStart) / DAY * 100);
        const widthPct = Math.max(0.5, rightPct - leftPct);
        return `<div class="tl-bar" style="background:${color};left:${leftPct.toFixed(2)}%;width:${widthPct.toFixed(2)}%"></div>`;
      }).join('');

      return `<div class="tl-row"><div class="tl-label">Zone ${i + 1}</div><div class="tl-track">${bars}</div></div>`;
    }).join('');

    // ── 24h stats per zone (dot chips) from derniers_arrosages ──
    const stats = zones.map((z, i) => {
      // MÊME source que les barres, déjà bornée à la fenêtre (cf. `resolvedByZone`) : le total ne
      // peut donc plus annoncer des minutes introuvables sous le graphe, ni contredire le tracé.
      const segs = resolvedByZone[z.switch] || [];
      const totalMs = segs.reduce((s, r) => s + (r.end_ms - r.start_ms), 0);
      const color   = ZONE_COLORS[i % ZONE_COLORS.length];
      if (!segs.length) return '';
      return `<div class="tl-stat"><span class="tl-stat-dot" style="background:${color}"></span><span class="tl-stat-name">Z${i+1}</span><span class="tl-stat-val">${fmtDur(totalMs)}</span><span class="tl-stat-count">${segs.length} ${this._t('sessions')}</span></div>`;
    }).join('');

    // (L'en-tête « Dernières sessions » — durée cumulée + nombre de sessions — est calculé plus
    //  bas, à partir du journal de l'intégration ; voir près de `logHtml`.)

    // ── Session log — depuis derniers_arrosages de l'intégration ──
    const zoneBySwitch = {};
    zones.forEach((z, i) => { if (z.switch) zoneBySwitch[z.switch] = { name: z.name || 'Z'+(i+1), color: ZONE_COLORS[i % ZONE_COLORS.length], idx: i }; });

    const SOURCE_LABELS = { auto_irrigation: this._t('src_auto'), zone_session: this._t('src_manuel'), rafraichissement_soir: this._t('src_rafraich') };
    const CAUSE_LABELS  = { hydrique: this._t('cause_hydrique'), rafraichissement_soir: this._t('cause_soir') };

    // Journal aligné sur la MÊME fenêtre que le budget : 7 jours calendaires (delta <= 6, cf.
    // `arrosage_recent_7j` côté intégration). Sans ce filtre, le résumé « durée · N sessions » et
    // la liste montreraient des arrosages que le budget ne compte plus (ex. J-7) → incohérent avec
    // la jauge juste au-dessus.
    const todayMid = new Date(); todayMid.setHours(0, 0, 0, 0);
    const derniersArrosages = (ent(h, c.entity_dernier_arrosage)?.attributes?.derniers_arrosages || [])
      .filter(e => {
        const raw = e.date || e.recorded_at;
        if (!raw) return true;
        const d = new Date(e.date ? `${e.date}T00:00:00` : e.recorded_at);
        if (Number.isNaN(d.getTime())) return true;
        d.setHours(0, 0, 0, 0);
        return Math.round((todayMid - d) / 86400000) <= 6;
      });
    const logHtml = derniersArrosages.map(e => {
      // ⚠️ LE DÉBUT DU CYCLE, pas sa fin. `recorded_at` est l'instant où l'intégration
      // enregistre la session — donc la fermeture de la dernière vanne. La liste annonçait
      // « 05:18 » pour un arrosage parti à 03:45:13 (04/08/2026, vérifié sur les vannes).
      // `started_at` est publié depuis l'intégration 0.41.0 ; repli sur l'ancien champ pour
      // les sessions plus anciennes, qui ne l'ont pas.
      const d       = new Date(e.started_at || e.recorded_at);
      const dayStr  = d.toLocaleDateString(this._t('_locale'), { weekday: 'short', day: 'numeric', month: 'short' });
      const timeStr = d.toLocaleTimeString(this._t('_locale'), { hour: '2-digit', minute: '2-digit' });
      const srcLabel = SOURCE_LABELS[e.source] || e.source;
      const causeLabel = (e.watering_cause && e.watering_cause !== e.source) ? ` · ${CAUSE_LABELS[e.watering_cause] || e.watering_cause}` : '';
      // Un cycle fractionné répète les mêmes zones (1 entrée par zone ET par passage). On cumule
      // donc la durée par zone et on indique le nombre de passages, au lieu d'aligner 6 puces
      // identiques pour 3 zones.
      const byZone = new Map();
      (e.zones || []).forEach(z => {
        const info = zoneBySwitch[z.entity_id];
        if (!info) return;
        const cur = byZone.get(z.entity_id) || { info, minutes: 0, passes: 0 };
        cur.minutes += Number(z.duration_min) || 0;
        cur.passes  += 1;
        byZone.set(z.entity_id, cur);
      });
      const passes = byZone.size ? Math.max(...[...byZone.values()].map(v => v.passes)) : 0;
      const zoneChips = [...byZone.values()].map(v => {
        const dur = v.minutes >= 1 ? Math.round(v.minutes) + ' min' : Math.round(v.minutes * 60) + ' s';
        return `<span class="ch-badge" style="background:${v.info.color}">Z${v.info.idx + 1}</span><span class="tl-log-zdur">${dur}</span>`;
      }).join('');
      const passChip = passes > 1
        ? `<span class="pass-badge">${passes} ${this._t('passes')}</span>` : '';

      // Les arrosages TECHNIQUES (rafraîchissement du soir, incorporation post-produit) sont
      // exclus du budget hebdomadaire : on les marque pour que le total reste lisible.
      const isTech = TECHNICAL_CAUSES.includes(String(e.watering_cause || '').toLowerCase());
      const mmStr = e.total_mm >= 0.1 ? `${num(e.total_mm, 1)} mm` : `< ${num(0.1, 1)} mm`;
      return `<div class="tl-log-entry${isTech ? ' tech' : ''}">
        <div class="tl-log-row1">
          <span class="tl-log-src">${srcLabel}${causeLabel}${
            isTech ? ` <span class="tech-badge">${this._t('technical')}</span>` : ''}</span>
          <span class="tl-log-when">${dayStr} ${timeStr}</span>
          <span class="tl-log-dur">${mmStr}</span>
        </div>
        ${zoneChips ? `<div class="tl-log-zones">${passChip}${zoneChips}</div>` : ''}
      </div>`;
    }).join('');

    // ── En-tête « Dernières sessions » — résumé fidèle du journal ci-dessous ────────────────
    // Durée d'arrosage cumulée + nombre de sessions, calculés sur les MÊMES enregistrements de
    // l'intégration (`derniers_arrosages`) que la liste affichée en dessous. On ne relit plus
    // l'historique brut des interrupteurs (`this._history`) : sur ce Sonoff, chaque redémarrage
    // (état « unavailable ») coupe la lecture et le total tombait à une seule session (« 36 min »).
    // Pas de libellé « 7 jours » : la liste est plafonnée aux N dernières sessions — le vrai total
    // 7 j en mm est dans le budget juste au-dessus.
    const runtimeMin = derniersArrosages.reduce((sum, e) =>
      sum + (e.zones || []).reduce((zs, z) => zs + (Number(z.duration_min) || 0), 0), 0);
    const sessCount = derniersArrosages.length;
    const header7 = sessCount > 0 ? `
      <div class="tl-header">
        <div><span class="tl-h-big">${fmtDuration(runtimeMin)}</span> <span class="tl-h-sub">${this._t('runtime_watered')}</span></div>
        <div class="tl-h-pill">${sessCount} ${this._t('sessions_n')}</div>
      </div>` : '';

    // ── Budget hebdomadaire ────────────────────────────────────────────────────────────────
    // Les DEUX chiffres viennent de l'intégration, qui seule connaît la vraie fenêtre 7 jours :
    //   `arrosage_recent_7j`   = ce qui COMPTE au budget (technique et externe exclus)
    //   `arrosage_applique_7j` = l'eau RÉELLEMENT reçue (technique inclus)
    // Ne PAS les recalculer depuis `derniers_arrosages` : cette liste est plafonnée aux N
    // dernières sessions, pas à 7 jours — le total serait faux (et peut passer sous le budget,
    // ce qui est impossible). Absent = intégration plus ancienne → on masque la ligne.
    const resAttrs   = ent(h, c.entity_reserve)?.attributes || {};
    const budgetUsed = parseFloat(resAttrs.arrosage_recent_7j);
    const applied    = parseFloat(resAttrs.arrosage_applique_7j);
    const budgetMax  = parseFloat(ent(h, c.entity_fenetre_optimale)?.attributes?.weekly_guardrail_mm_max);
    // ⚠️ Le PLAFOND n'est pas le seuil qui décide. L'intégration retient l'arrosage dès le
    // PLANCHER (`weekly_guardrail_mm_min`) : à 22,1 mm pour un plancher à 21 et un plafond à
    // 31,6, la jauge affichait « 70 %, vert » comme s'il restait de la marge, alors que
    // l'arrosage était déjà bloqué. Constaté par Kévin le 31/07/2026. On matérialise donc le
    // plancher sur la barre et on colore dès qu'il est franchi.
    const budgetMin  = parseFloat(ent(h, c.entity_fenetre_optimale)?.attributes?.weekly_guardrail_mm_min);
    let budgetHtml = '';
    if (Number.isFinite(budgetUsed) && Number.isFinite(budgetMax) && budgetMax > 0) {
      const pct    = Math.round((budgetUsed / budgetMax) * 100);
      const over   = budgetUsed >= budgetMax;
      const held   = Number.isFinite(budgetMin) && budgetMin > 0 && budgetUsed >= budgetMin;
      const minPct = Number.isFinite(budgetMin) && budgetMin > 0
        ? Math.min(100, Math.round((budgetMin / budgetMax) * 100)) : null;
      const barPct = Math.min(100, pct);
      // ⚠️ « Semaine couverte » N'EST PAS une alerte. La règle de la carte, écrite plus bas
      // dans le hero (« l'orange est une ALERTE, pas un état d'attente »), était violée ici :
      // `held` peignait la barre en orange pendant que le hero du MÊME écran restait vert pour
      // le fait identique. Un seul fait, deux couleurs. L'orange est rendu à ce qu'il signale
      // vraiment — on s'approche du plafond DUR (≥ 80 %). La retenue, elle, se lit au repère
      // de plancher sur la barre et à la ligne « ⏸ Semaine couverte ».
      const barCol = over ? 'var(--gi-danger)' : (pct >= 80) ? 'var(--gi-warn)' : 'var(--gi-accent)';
      const tech   = Number.isFinite(applied) ? Math.max(0, applied - budgetUsed) : null;
      budgetHtml = `
        <div class="budget-box">
          <div class="budget-top">
            <span class="budget-lbl">${this._t('weekly_budget')}</span>
            <span class="budget-val${over ? ' over' : ''}">${num(budgetUsed, 1)} / ${num(budgetMax, 1)} mm · ${pct} %</span>
          </div>
          <div class="budget-track">
            <div class="budget-bar" style="width:${barPct}%;background:${barCol}"></div>
            ${minPct !== null ? `<div class="budget-floor" style="left:${minPct}%" title="${this._t('budget_floor')} ${num(budgetMin, 1)} mm"></div>` : ''}
          </div>
          ${/* « au-delà de X mm » se lisait comme un plafond franchi. La retenue est en fait
                CONDITIONNELLE : il faut 3 arrosages, X mm reçus ET un besoin faible. Elle se lève
                d'elle-même dès que le gazon a de nouveau soif — c'est ce que le libellé doit dire. */''}
          ${held && !over ? `<div class="budget-held">${this._t('budget_held')} (${num(budgetMin, 1)} mm) · ${this._t('budget_held_end')}</div>` : ''}
          ${/* Affiché UNIQUEMENT s'il y a de l'eau technique (rafraîchissement du soir,
                incorporation après produit) : sans elle, « total reçu » répète mot pour mot le
                chiffre déjà lisible dans la jauge juste au-dessus. */''}
          ${Number.isFinite(applied) && tech > 0
            ? `<div class="budget-sub">+ <b>${num(tech, 1)} mm</b> ${this._t('technical_not_counted')} · ${this._t('total_received')} <b>${num(applied, 1)} mm</b></div>`
            : ''}
        </div>`;
    }

    const windowHasSessions = derniersArrosages24.length > 0 || zones.some(z => {
      const sess = (this._history && z.switch) ? (this._history[z.switch] || []) : [];
      return sess.some(s => s.end_ms >= windowStart);
    });
    const emptyToday = !this._history
      ? `<div class="tl-empty">${this._t('loading')}</div>`
      : (!windowHasSessions ? `<div class="tl-empty">${this._t('no_watering_24h')}</div>` : '');

    return `
      <div class="section-title">${this._t('section_24h')}</div>
      <div class="timeline">
        <div class="tl-ruler"><span>${rulerLabels[0]}</span><span>${rulerLabels[1]}</span><span>${rulerLabels[2]}</span><span>${rulerLabels[3]}</span><span>${rulerLabels[4]}</span></div>
        <div style="position:relative">
          ${rows}
          <div class="tl-now" style="left:100%"></div>
        </div>
        ${emptyToday}
        ${stats ? `<div class="tl-stats">${stats}</div>` : ''}
      </div>
      ${/* « Dernières sessions » chapeautait la JAUGE DE BUDGET, pas les sessions : le titre
           s'appliquait au mauvais bloc, et le compteur « 3 h 15 · 3 sessions » se retrouvait
           orphelin, sans période lisible. Chaque bloc a désormais son titre, et le compteur
           tombe directement sous le sien. Constaté le 31/07/2026. */''}
      ${budgetHtml ? `<div class="section-title" style="margin-top:12px">${this._t('section_budget')}</div>` : ''}
      ${budgetHtml}
      <div class="section-title" style="margin-top:12px">${this._t('section_history')}</div>
      ${header7}
      ${logHtml ? `<div class="tl-log">${logHtml}</div>` : `<div class="tl-empty">${this._t('no_session_7d')}</div>`}`;
  }

  async _fetchHistory(zones) {
    if (!this._hass) return;
    this._historyTs = Date.now(); // mark fetch in progress to avoid parallel calls
    const requested = zones.map(z => z.switch).filter(Boolean);
    if (!requested.length) return;
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    try {
      const data = await this._hass.callApi('GET',
        `history/period/${start}?filter_entity_id=${requested.join(',')}&minimal_response=true&no_attributes=true`);
      const result = {};
      (data || []).forEach((stateList, listIndex) => {
        if (!stateList.length) return;
        // RÉSOLUTION DE L'ENTITÉ — par POSITION d'abord, `entity_id` seulement en confirmation.
        // Avec `minimal_response=true`, les entrées compactées ne portent PAS d'`entity_id` ;
        // seule la première de chaque liste devrait l'avoir, et ce n'est pas garanti. L'ancien
        // `if (!entityId) return;` abandonnait alors la zone EN SILENCE : son historique restait
        // vide, sa piste du graphe déserte, et — pire — une liste pouvait être attribuée à la
        // mauvaise zone. Constaté le 29/07/2026 : deux des trois zones sans aucune barre malgré
        // des arrosages réels, et la corruption changeant de zone d'un rafraîchissement à l'autre.
        // Home Assistant renvoie les listes dans l'ordre de `filter_entity_id` : la position est
        // donc l'information fiable, l'`entity_id` un simple contrôle quand il est présent.
        const declared = stateList[0].entity_id;
        const entityId = (typeof declared === 'string' && declared) ? declared : requested[listIndex];
        if (!entityId) return;
        const sessions = [];
        let onStart = null;
        for (const s of stateList) {
          const ts = new Date(s.last_changed).getTime();
          if (s.state === 'on' && onStart === null) onStart = ts;
          else if (s.state !== 'on' && onStart !== null) {
            sessions.push({ start_ms: onStart, end_ms: ts });
            onStart = null;
          }
        }
        // Une session encore OUVERTE en fin de liste n'est réelle que si la vanne est ENCORE
        // ouverte maintenant. Sinon l'historique reçu est incomplet — entrée synthétique de début
        // de fenêtre, purge du recorder, réponse tronquée — et la refermer à `Date.now()`
        // FABRIQUE une session fantôme longue de plusieurs jours.
        // Mesuré le 29/07/2026 : barre de 144 h (6 jours) sur une vanne qui n'avait tourné que
        // 52 min, avec le chip annonçant « 1 sess. ». Dans le doute on préfère ne rien dessiner :
        // une barre manquante se remarque, une barre fausse se croit.
        if (onStart !== null && isOn(this._hass, entityId)) {
          sessions.push({ start_ms: onStart, end_ms: Date.now() });
        }
        // GARDE-FOU DE PLAUSIBILITÉ. Le plan d'arrosage borne chaque zone à 180 min ; une session
        // plus longue ne décrit pas un arrosage mais un trou dans les données. On la refuse plutôt
        // que de laisser un aplat couvrir tout le graphe et écraser les vrais créneaux.
        result[entityId] = sessions.filter(
          s => Number.isFinite(s.start_ms) && Number.isFinite(s.end_ms)
            && s.end_ms > s.start_ms
            && (s.end_ms - s.start_ms) <= MAX_PLAUSIBLE_SESSION_MS
        );
      });
      this._history = result;
      this._render();
    } catch (e) {
      console.warn('GazonIntelligent: history fetch failed', e);
    }
  }

  async _fetchForecast() {
    if (!this._hass || !this._config.entity_meteo) return;
    this._forecastTs = Date.now();
    try {
      const result = await this._hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'weather',
        service: 'get_forecasts',
        service_data: { entity_id: this._config.entity_meteo, type: 'daily' },
        return_response: true,
      });
      const fc = result?.response?.[this._config.entity_meteo]?.forecast || [];
      this._forecast = fc[0] || null;
      this._render();
    } catch(e) {
      console.warn('GazonIntelligent: forecast fetch failed', e);
    }
  }

  // ── Tab : Tonte ───────────────────────────────────────────────────────────

  _tab_tonte() {
    const h = this._hass; const c = this._config;

    const tonteAttr   = ent(h, c.entity_tonte_autorisee)?.attributes || {};
    const tonteStatut = tonteAttr.tonte_statut || '';
    const blockLbl    = tonteAttr.mowing_block_reason_label || '';
    const blockCode   = tonteAttr.mowing_block_reason_code  || '';
    const blockRain   = blockCode.includes('pluie') || blockCode.includes('rain');
    const gPermet     = tonteAttr.gazon_permet_tonte;
    const mPermet    = tonteAttr.machine_permet_tonte;
    const bat        = tonteAttr.tondeuse_batterie;
    const nomTonde   = tonteAttr.tondeuse_nom || 'Tondeuse robot';
    const statutLib  = tonteAttr.tondeuse_statut_libelle || '';
    const coordOn    = isOn(h, c.entity_switch_tondeuse);

    // ⚠️ DEUX AXES, DEUX BADGES. `tonte_statut` juge LA TONTE (donc surtout le GAZON) ;
    // `machine_permet_tonte` juge LA MACHINE. Ils étaient fusionnés : le badge du verdict de
    // tonte était collé sur la ligne de la tondeuse. Résultat lu sur l'install le 31/07/2026 —
    // « Esperance Jr · À la station · 100 % — À surveiller » : la machine avait l'air en défaut
    // alors qu'elle était à la station, chargée, et déclarée disponible (`machine_permet_tonte:
    // true`). C'est le gazon qui n'était pas prêt. Ne jamais recoller ces deux axes.
    const statusClass = tonteStatut === 'autorisee' ? '' : tonteStatut === 'a_surveiller' ? 'warn' : 'blocked';
    const machineClass = mPermet === false ? 'blocked' : '';
    const machineLbl   = mPermet === undefined
      ? '' : this._t(mPermet ? 'mower_available' : 'mower_unavailable');

    const nextAttr   = ent(h, c.entity_prochaine_tonte)?.attributes || {};
    const nextDate   = nextAttr.target_date || stateOf(h, c.entity_prochaine_tonte);
    const nextSummary = nextAttr.summary || '';

    const hauteur    = stateOf(h, c.entity_hauteur_conseillee);
    const hautAttr   = ent(h, c.entity_hauteur_conseillee)?.attributes || {};

    return `
      <div class="mow-card">
        <div class="mow-icon-wrap">✂</div>
        <div class="mow-info">
          <div class="mow-name">${nomTonde}</div>
          <div class="mow-detail">${statutLib}${bat !== undefined ? ' · ' + bat + ' %' : ''}</div>
        </div>
        ${machineLbl ? `<div class="mow-status ${machineClass}">${machineLbl}</div>` : ''}
      </div>

      ${/* Le verdict de tonte, explicitement ÉTIQUETÉ « Tonte » : sans ce mot, « À surveiller »
           se lisait comme un état de la machine juste au-dessus. */''}
      ${(tonteStatut || blockLbl || gPermet !== undefined) ? `
        <div class="chip-row">
          ${gPermet !== undefined ? `<div class="chip"><div class="chip-dot" style="background:${gPermet ? 'var(--gi-accent)' : 'var(--gi-muted)'}"></div>${this._t('chip_lawn')} ${this._t(gPermet ? 'chip_ready' : 'chip_not_ready')}</div>` : ''}
          ${tonteStatut ? `<div class="chip"><div class="chip-dot" style="background:${
            statusClass === '' ? 'var(--gi-accent)' : statusClass === 'warn' ? 'var(--gi-warn)' : 'var(--gi-muted)'
          }"></div>${this._t('mowing_lbl')} : ${this._lblt(TONTE_LABELS, tonteStatut)}</div>` : ''}
          ${/* `mowing_window_state` / `_label` : l'intégration dit si le CRÉNEAU actuel est bon
               (« À éviter » à 31 °C, par exemple) et rien ne l'affichait. Le flow Node-RED s'en
               sert déjà pour ne pas lancer la tondeuse ; la carte l'ignorait. */''}
          ${tonteAttr.mowing_window_label ? `<div class="chip" title="${esc(tonteAttr.mowing_window_reason || '')}"><div class="chip-dot" style="background:${
            tonteAttr.mowing_window_state === 'discouraged' ? 'var(--gi-warn)'
              : tonteAttr.mowing_window_state === 'blocked' ? 'var(--gi-muted)' : 'var(--gi-accent)'
          }"></div>${this._t('mow_window_lbl')} : ${esc(tonteAttr.mowing_window_label)}</div>` : ''}
          ${blockLbl ? `<div class="chip"><div class="chip-dot" style="background:${blockRain ? '#3b82f6' : 'var(--gi-warn)'}"></div>${blockRain ? '🌧️ ' : ''}${esc(blockLbl)}</div>` : ''}
        </div>` : ''}

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">${this._t('next_mow')}</div>
          <div class="stat-value sm">${nextDate ? fmtDate(nextDate, k => this._t(k)) : '—'}</div>
          ${/* `summary` = « Tonte à reconsidérer le 01/08/2026 » : la MÊME date que la valeur
               juste au-dessus, en numérique. Avec la pastille de motif qui la répète encore,
               l'onglet affichait trois fois le même jour (31/07/2026). On ne la garde que si
               la tuile n'a pas su humaniser la date. */''}
          ${(nextSummary && !nextDate) ? `<div class="stat-sub">${esc(nextSummary)}</div>` : ''}
        </div>
        <div class="stat-card">
          <div class="stat-label">${this._t('mow_height')}</div>
          <div class="stat-value sm accent">${hauteur ? num(hauteur, 1) + ' cm' : '—'}</div>
          ${(hautAttr.hauteur_tonte_min_cm && hautAttr.hauteur_tonte_max_cm)
            ? `<div class="stat-sub"${hautAttr.hauteur_tonte_garde_fou_label
                  ? ` title="${esc(hautAttr.hauteur_tonte_garde_fou_label)}"` : ''}>Min ${num(hautAttr.hauteur_tonte_min_cm, 1)} · Max ${num(hautAttr.hauteur_tonte_max_cm, 1)} cm${
                  hautAttr.hauteur_tonte_garde_fou_label ? ' <span class="guard-mark">⚑</span>' : ''}</div>`
            : ''}
          ${hautAttr.hauteur_tonte_garde_fou_label
            ? `<div class="stat-note">${esc(hautAttr.hauteur_tonte_garde_fou_label)}</div>`
            : ''}
        </div>
      </div>

      ${/* Deux corrections ici, vues en regardant l'onglet pour de vrai (30/07/2026) :
           - « Gazon bloque » manquait son accent, et « permet / bloque » est du jargon ;
           - surtout, le MOTIF du blocage n'était affiché nulle part sur cet onglet, alors
             que c'est l'information la plus utile et qu'elle est disponible. On lisait
             « Gazon bloque » sans jamais savoir pourquoi. */''}
      ${/* Hauteur réelle estimée : elle existait dans l'intégration mais n'apparaissait nulle
           part. C'est pourtant elle qui explique la consigne — la règle du tiers s'y adosse. */''}
      ${(() => {
        const est = stateOf(h, c.entity_hauteur_gazon_estimee);
        const cible = parseFloat(stateOf(h, c.entity_hauteur_conseillee));
        if (est === null || est === undefined || est === '' || isNaN(parseFloat(est))) return '';
        const e = parseFloat(est);
        const aCouper = (!isNaN(cible) && e > cible) ? (e - cible) : 0;
        return `
        <div class="pousse">
          <div class="pousse-barre" aria-hidden="true">
            <div class="pousse-cible" style="bottom:${Math.max(0, Math.min(100, (cible / Math.max(e, cible) ) * 100))}%"></div>
            <div class="pousse-herbe" style="height:${Math.max(6, Math.min(100, (e / Math.max(e, cible)) * 100))}%"></div>
          </div>
          <div class="pousse-txt">
            <div class="pousse-val">${num(e, 1)} cm <span class="pousse-lbl">de haut aujourd'hui</span></div>
            ${/* Trois cas, et non deux. « Déjà à la hauteur voulue » s'affichait aussi quand
                 le gazon était SOUS la cible — donc faux : vu sur l'install le 30/07/2026,
                 5,5 cm pour une cible de 6,0, annoncé « déjà à la hauteur voulue ». */''}
            ${aCouper > 0.05
              ? `<div class="pousse-sub">soit ${num(aCouper, 1)} cm à couper pour revenir à ${num(cible, 1)} cm</div>`
              : (!isNaN(cible) && cible - e > 0.05)
                ? `<div class="pousse-sub">il lui reste ${num(cible - e, 1)} cm à pousser avant la cible de ${num(cible, 1)} cm</div>`
                : `<div class="pousse-sub">pile à la hauteur voulue</div>`}
            ${/* `gazon_pousse_jour_cm` : l'intégration la calcule heure par heure (pic à 3 h,
                 la feuille s'allonge sur la turgescence, pas sur la lumière) et la carte ne
                 l'affichait NULLE PART. C'est pourtant la seule preuve visible que le modèle
                 de pousse tourne — sans elle, la hauteur a l'air figée. Deux décimales : au
                 dixième, une journée entière de pousse s'affiche « 0,2 cm » ou « 0,0 cm ». */''}
            ${(() => {
              const jour = parseFloat(attrOf(h, c.entity_hauteur_gazon_estimee, 'gazon_pousse_jour_cm'));
              return Number.isFinite(jour) && jour > 0
                ? `<div class="pousse-sub">+ ${num(jour, 2)} cm ${this._t('growth_today')}</div>` : '';
            })()}
          </div>
        </div>`;
      })()}

      ${/* Contextuel : proposer « J'ai tondu » le jour même d'une tonte déjà enregistrée
           n'aurait pas de sens — l'estimation de hauteur repartirait de zéro pour rien.
           On ne le montre donc pas quand la dernière tonte est d'aujourd'hui. */''}
      ${(() => {
        const proch = attrOf(h, c.entity_prochaine_tonte, 'target_date');
        const auj = new Date().toISOString().slice(0, 10);
        const tonteAuj = String(tonteAttr.derniere_tonte_date || '') === auj;
        if (tonteAuj) return '';
        return this._actionsRapides([{ id: 'declare_mowing', icone: '✂️', libelle: "J'ai tondu" }]);
      })()}

      ${/* La pastille « Tondeuse prête/indisponible » disait exactement ce que porte désormais
           le badge de la carte machine, en haut de l'onglet : retirée. Et « Gazon prêt/pas
           prêt » est remontée dans la rangée du haut — seule en bas de page, après le bouton
           « J'ai tondu », elle était orpheline et se lisait comme une info sans rapport. */''}
      ${(() => {
        // Doublon constaté sur l'install le 30/07/2026 : le motif était déjà affiché en
        // pastille sous la tondeuse. On ne le répète donc que s'il n'y est pas.
        const motif = tonteAttr.raison_blocage_tonte || tonteAttr.mowing_block_reason_label;
        if (!motif || gPermet === true) return '';
        if (blockLbl && String(blockLbl).trim()) return '';
        // On coupe à la première phrase : la suite répète la date déjà affichée au-dessus.
        const court = String(motif).split(/\.\s/)[0].replace(/\.$/, '');
        return `<div class="pourquoi"><span class="pourquoi-mark">⏳</span>${esc(court)}.</div>`;
      })()}

      <div class="sep"></div>

      <div class="toggle-row">
        <div class="toggle-info">
          <div class="toggle-name">${this._t('coord_name')}</div>
          <div class="toggle-sub">${this._t('coord_sub')}</div>
        </div>
        <button class="toggle-sw${coordOn ? ' on' : ''}" data-action="toggle" data-entity="${c.entity_switch_tondeuse || ''}">
          <div class="toggle-knob"></div>
        </button>
      </div>
    `;
  }

  // ── Tab : Gazon ───────────────────────────────────────────────────────────

  _tab_gazon() {
    const h = this._hass; const c = this._config;

    const phase      = stateOf(h, c.entity_phase) || '—';
    const risqueRaw  = stateOf(h, c.entity_risque) || '';
    const risqueClass = risqueRaw === 'eleve' || risqueRaw === 'critique' ? 'danger' : risqueRaw === 'modere' ? 'warn' : 'accent';

    const hydrAttr  = ent(h, c.entity_etat_hydrique)?.attributes || {};
    const fillRatio = hydrAttr.reserve_available_ratio ?? null;
    const fillPct   = fillRatio !== null ? Math.round(parseFloat(fillRatio) * 100) : null;
    const fillClass = fillRatio !== null ? tonePct(fillRatio) : 'accent';
    const reserveMm = hydrAttr.reserve_actuelle_mm || stateOf(h, c.entity_reserve);
    const hydrique  = this._lblt(HYDRIC_LABELS, stateOf(h, c.entity_etat_hydrique));
    const hauteur   = stateOf(h, c.entity_hauteur_conseillee);

    const resAttr   = ent(h, c.entity_reserve)?.attributes || {};
    const arros7j   = resAttr.arrosage_recent_7j;
    const pluie     = resAttr.pluie_efficace;

    return `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">${this._t('phase')}</div>
          <div class="stat-value sm">${phase}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">${this._t('risk_lbl')}</div>
          <div class="stat-value sm ${risqueClass}">${this._lblt(RISQUE_LABELS, risqueRaw)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">${this._t('reserve_lbl')}</div>
          <div class="stat-value ${fillClass}">${fillPct !== null ? fillPct + ' %' : (reserveMm ? num(reserveMm, 1) + ' mm' : '—')}</div>
          ${reserveMm ? `<div class="stat-sub">${num(reserveMm, 1)} mm</div>` : ''}
        </div>
        <div class="stat-card">
          <div class="stat-label">${this._t('mow_height_lbl')}</div>
          <div class="stat-value sm">${hauteur ? num(hauteur, 1) + ' cm' : '—'}</div>
        </div>
      </div>

      ${/* La jauge répétait mot pour mot « 63 % · 7,6 mm », déjà lisible dans la tuile Réserve
           150 px plus haut (constaté le 31/07/2026). À la place, elle porte maintenant les deux
           nombres qui DÉCIDENT et qui n'apparaissaient nulle part sur la carte : la déplétion
           réelle et le seuil MAD à partir duquel l'intégration déclenche. */''}
      ${fillPct !== null ? `
        <div class="reserve-bar-wrap">
          <div class="reserve-bar-label">
            <span>${this._t('reserve_lbl')}</span>
            <span>${(() => {
              const dep = parseFloat(hydrAttr.depletion_mm);
              const mad = parseFloat(hydrAttr.reserve_minimale_mm);
              if (!Number.isFinite(dep)) return `${fillPct} % · ${num(reserveMm, 1)} mm`;
              return `${this._t('depletion_lbl')} ${num(dep, 1)} mm${
                Number.isFinite(mad) ? ` · ${this._t('mad_lbl')} ${num(mad, 1)} mm` : ''}`;
            })()}</span>
          </div>
          <div class="reserve-bar-track">
            <div class="reserve-bar-fill ${fillClass}" style="width:${Math.min(fillPct, 100)}%"></div>
          </div>
        </div>` : ''}

      <div class="section-title">${this._t('section_bilan')}</div>
      <div class="mow-card">
        <div class="mow-icon-wrap">🌿</div>
        <div class="mow-info">
          <div class="mow-name">${hydrique}</div>
          <div class="mow-detail">
            ${/* `pluie_efficace` s'affichait en « · 0,0 mm » nu : rien ne disait que c'était
                 de la pluie, et à zéro la mention n'apprend rien. Étiquetée, et masquée à zéro. */''}
            ${arros7j !== undefined ? this._t('watering_7d') + ' : ' + num(arros7j, 1) + ' mm' : ''}
            ${(Number.isFinite(parseFloat(pluie)) && parseFloat(pluie) > 0)
              ? ' · ' + this._t('rain_effective') + ' ' + num(pluie, 1) + ' mm' : ''}
          </div>
        </div>
      </div>
    `;
  }

  // ── Tab : Produits ────────────────────────────────────────────────────────

  _tab_produits() {
    const h = this._hass; const c = this._config;

    const iAttr   = ent(h, c.entity_prochaine_intervention)?.attributes || {};
    const iState  = stateOf(h, c.entity_prochaine_intervention) || '';
    const produit = iAttr.product_name || iAttr.produit_nom || '—';
    const score   = iAttr.score !== undefined ? iAttr.score : null;
    const hint    = iAttr.hint || '';
    const summary = iAttr.summary || '';
    const actionL = iAttr.action_label || '';
    // « Intervention indisponible » sans motif ni date : l'onglet le plus muet de la carte,
    // alors que l'intégration fournit le POURQUOI (`why_now`) et le détail des conditions
    // (`reason`, en segments séparés par « · »). Constaté en le regardant, le 30/07/2026.
    const pourquoi = iAttr.why_now || '';
    // ⚠️ `reason` est la concaténation de TOUS les critères : les quatre puces s'affichaient à
    // l'identique et rien ne disait laquelle retenait l'intervention (Kick Pro, 31/07/2026 —
    // seule la date de réapplication bloquait). L'intégration publie désormais la polarité
    // (`application_constraints`, 0.33.0). Repli sur la chaîne si l'intégration est plus ancienne.
    const conditions = Array.isArray(iAttr.application_constraints) && iAttr.application_constraints.length
      ? iAttr.application_constraints.map(x => ({
          label: String(x.label || ''),
          cls: x.met ? 'ok' : (x.blocking ? 'hold' : ''),
        })).filter(x => x.label)
      : String(iAttr.reason || '')
          .split('·').map(x => ({ label: x.trim(), cls: '' })).filter(x => x.label);

    const isRecommended = iState === 'recommande' || iState === 'recommended';
    const heroTone = isRecommended ? 'purple' : 'warn';
    const INACTIVE_STATES = ['unavailable', 'unknown', 'non_requis', 'not_required', 'none', ''];
    const showHero = iState && !INACTIVE_STATES.includes(iState);

    // Dernière application : l'onglet ne montrait que le « prochain » (prochaine_intervention) et
    // jamais le « dernier », d'où l'impression que le produit qu'on vient d'appliquer disparaissait.
    const laAttr   = ent(h, c.entity_derniere_application)?.attributes || {};
    const laState  = stateOf(h, c.entity_derniere_application) || '';
    const laActive = laState && !['unavailable', 'unknown', 'none', 'non_requis', ''].includes(laState);
    const laDate   = laAttr.last_application_when || laAttr.date || '';
    const laMeta   = [laAttr.type, laAttr.dose].filter(Boolean).join(' · ');
    const laNote   = laAttr.note || '';

    return `
      ${showHero ? `
        <div class="hero ${heroTone}">
          <div class="hero-eyebrow">${this._t('next_intervention')}</div>
          <div class="hero-title">${esc(produit)}</div>
          ${hint ? `<div class="hero-sub">${esc(hint)}</div>` : ''}
          ${/* ⚠️ Ce badge affichait « 0 % · blocked » : l'état INTERNE de l'intégration, en
               anglais, collé à un score qui ne veut rien dire quand rien n'est recommandé.
               Vu le 31/07/2026 en rendant le banc sur la charge réelle — mon jeu d'essai
               précédent n'avait pas de `score`, le badge ne s'affichait donc jamais.
               Le score n'apparaît que s'il porte une information (> 0), et l'état est traduit. */''}
          ${(score !== null && Number(score) > 0)
            ? `<div class="hero-badge"><div class="hero-dot"></div>${esc(score)} % · ${esc(this._lblt(INTERVENTION_LABELS, iState))}</div>`
            : (iState ? `<div class="hero-badge"><div class="hero-dot"></div>${esc(this._lblt(INTERVENTION_LABELS, iState))}</div>` : '')}
        </div>` : ''}
      ${pourquoi ? `<div class="pourquoi"><span class="pourquoi-mark">📅</span>${esc(pourquoi)}</div>` : ''}
      ${conditions.length ? `
        <div class="cond-list">
          ${conditions.map(c2 => `<div class="cond-item ${c2.cls}">${esc(c2.label)}</div>`).join('')}
        </div>` : ''}

      ${/* HISTORIQUE — `application_history` contient toutes les applications déclarées
           (12 sur cette install) mais n'était affiché nulle part : l'onglet ne montrait que
           la PROCHAINE. On ne pouvait pas savoir ce qu'on avait mis, ni quand. */''}
      ${(() => {
        const hist = (laAttr.application_history || []).slice().reverse();
        if (!hist.length) return '';
        const n = this._histTout ? hist.length : 6;
        const fmt = (d) => {
          if (!d) return '';
          const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
          return m ? `${m[3]}/${m[2]}/${m[1]}` : String(d);
        };
        return `
        <div class="sep"></div>
        <div class="section-title">${this._t('applied_history')}${hist.length ? ` · ${hist.length}` : ''}</div>
        <div class="hist-list">
          ${hist.slice(0, n).map(e => `
            <div class="hist-row">
              <div class="hist-date">${esc(fmt(e.date_action || e.date))}</div>
              <div class="hist-main">
                <div class="hist-nom">${esc(e.libelle || e.produit || e.type || '—')}</div>
                <div class="hist-meta">${[e.type, e.dose].filter(Boolean).map(esc).join(' · ')}</div>
                ${/* Les notes de Kévin sont détaillées (dosage, pression, surface, pourquoi la
                     date a bougé) : précieuses, mais quatre lignes par entrée noient la liste.
                     On les replie à deux lignes, dépliables au clic. Rien n'est perdu. */''}
                ${e.note ? `<div class="hist-note" data-action="note-toggle" title="${this._t('tap_to_expand')}">${esc(e.note)}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>
        ${hist.length > 6 ? `<button class="hist-plus" data-action="hist-toggle">${
          this._histTout ? this._t('show_less') : `${this._t('show_older_a')} ${hist.length - 6} ${this._t('show_older_b')}`}</button>` : ''}`;
      })()}

      <div class="sep"></div>
      <button class="btn-declare" data-action="declare-open">➕ ${this._t('declare_product')}</button>
      ${/* L'annulation n'a de sens QUE s'il y a une application à annuler : sans historique,
           le bouton proposerait une action impossible. Carte dynamique = ce qui s'affiche
           dépend de l'état réel, pas d'une liste figée. */''}
      ${(laAttr.application_history || []).length
        ? this._actionsRapides([{ id: 'remove_last_application', icone: '🗑️',
            libelle: this._t('undo_last_application'), danger: true }])
        : ''}

      ${/* DEUX TUILES MORTES retirées ici (constatées le 31/07/2026 en regardant l'onglet
           entier) — toutes deux ajoutées à des moments différents, puis rendues inutiles par
           l'historique ajouté le 30/07 :
           - `summary` : « Intervention bloquée : Kick Pro » répétait le hero, deux écrans plus
             haut, qui dit déjà le produit ET le motif ;
           - `laActive` : « Dernière application · Humuslight · 23/07/2026 » recopiait
             mot pour mot la première ligne de l'historique, note comprise.
           On ne garde la tuile `summary` que si le hero est absent — sinon l'onglet n'aurait
           plus rien à dire du tout. */''}
      ${(!showHero && summary) ? `
        <div class="zone-card">
          <div class="zone-dot purple"></div>
          <div class="zone-info">
            <div class="zone-name">${esc(summary)}</div>
            ${actionL ? `<div class="zone-detail">${esc(actionL)}</div>` : ''}
          </div>
        </div>` : ''}

      ${(!showHero && !summary) ? `<div class="empty">${this._t('no_intervention')}</div>` : ''}

      ${/* Idem : la tuile « dernière application » ne sert que si l'historique est vide
           (intégration plus ancienne, ou tout premier produit déclaré). */''}
      ${(laActive && !(laAttr.application_history || []).length) ? `
        <div class="zone-card" style="margin-top:10px">
          <div class="zone-dot on"></div>
          <div class="zone-info">
            <div class="zone-detail on">${this._t('last_application')}</div>
            <div class="zone-name">${esc(laState)}${laDate ? ` · ${esc(laDate)}` : ''}</div>
            ${laMeta ? `<div class="zone-detail">${esc(laMeta)}</div>` : ''}
            ${laNote ? `<div class="zone-detail" style="white-space:normal">${esc(laNote)}</div>` : ''}
          </div>
        </div>` : ''}
    `;
  }

  // ── Tab : Réglages ────────────────────────────────────────────────────────

  _tab_reglages() {
    const h = this._hass; const c = this._config;
    const autoOn  = isOn(h, c.entity_switch_arrosage_auto);
    const coordOn = isOn(h, c.entity_switch_tondeuse);
    const zones   = c.zones || [];

    return `
      <div class="toggle-row">
        <div class="toggle-info">
          <div class="toggle-name">Arrosage automatique</div>
          <div class="toggle-sub">L'intégration décide quand arroser</div>
        </div>
        <button class="toggle-sw${autoOn ? ' on' : ''}" data-action="toggle" data-entity="${c.entity_switch_arrosage_auto || ''}">
          <div class="toggle-knob"></div>
        </button>
      </div>

      <div class="toggle-row">
        <div class="toggle-info">
          <div class="toggle-name">${this._t('coord_name')}</div>
          <div class="toggle-sub">${this._t('coord_sub')}</div>
        </div>
        <button class="toggle-sw${coordOn ? ' on' : ''}" data-action="toggle" data-entity="${c.entity_switch_tondeuse || ''}">
          <div class="toggle-knob"></div>
        </button>
      </div>

      ${/* HAUTEUR DE COUPE — réglable ici parce que beaucoup de robots (dont celui de Kévin)
           ne l'exposent pas : elle est saisie à la main. Or c'est le POINT ZÉRO du modèle de
           pousse (`hauteur du gazon = hauteur de coupe + ce qui a poussé`). La régler ailleurs
           qu'à l'endroit où on lit la hauteur, c'est garantir qu'on l'oubliera après avoir
           tourné la molette — et toute l'estimation part alors de travers, sans qu'aucun
           capteur puisse le détecter. */''}
      ${(() => {
        const e = ent(h, c.entity_hauteur_coupe);
        if (!e) return '';
        const val = parseFloat(e.state);
        if (!Number.isFinite(val)) return '';
        const a = e.attributes || {};
        const min = Number.isFinite(parseFloat(a.min)) ? parseFloat(a.min) : 20;
        const max = Number.isFinite(parseFloat(a.max)) ? parseFloat(a.max) : 100;
        const pas = Number.isFinite(parseFloat(a.step)) ? parseFloat(a.step) : 5;
        return `
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-name">${this._t('cut_height')}</div>
            <div class="toggle-sub">${this._t('cut_height_sub')}</div>
          </div>
          <div class="cut-stepper">
            <button class="cut-btn" data-action="cut-height" data-value="${Math.max(min, val - pas)}"
                    ${val <= min ? 'disabled' : ''} aria-label="−${pas} mm">−</button>
            <span class="cut-val">${num(val / 10, 1)} cm</span>
            <button class="cut-btn" data-action="cut-height" data-value="${Math.min(max, val + pas)}"
                    ${val >= max ? 'disabled' : ''} aria-label="+${pas} mm">+</button>
          </div>
        </div>`;
      })()}

      ${zones.length ? `
        <div class="sep"></div>
        <div class="section-title">Outils</div>
      ${/* « Annuler la dernière application » a rejoint l'onglet Produits : c'est là qu'on
           voit l'application qu'on veut annuler. La ranger dans Réglages obligeait à changer
           d'onglet pour corriger une saisie qu'on avait sous les yeux. */''}
      ${this._actionsRapides([
        { id: 'recalibrate_reserve', icone: '🪣', libelle: 'Recaler la réserve du sol' },
        { id: 'reset_mode',          icone: '↩️', libelle: 'Revenir au mode Normal' },
      ])}
      <div class="sep"></div>
      <div class="section-title">${this._t('section_zones_cfg')}</div>
        ${zones.map((z, i) => `
          <div class="zone-card">
            <div class="zone-dot" style="background:${ZONE_COLORS[i % ZONE_COLORS.length]}"></div>
            <div class="zone-info">
              <div class="zone-name">${z.name || 'Zone ' + (i + 1)}</div>
              <div class="zone-detail">${z.debit ? z.debit + ' mm/h' : ''}${z.switch ? ' · ' + z.switch : ''}</div>
            </div>
          </div>`).join('')}
      ` : ''}

      <div class="sep"></div>
      <div class="chip-row">
        <div class="chip"><div class="chip-dot" style="background:var(--gi-accent)"></div>v${GI_VERSION}</div>
        <div class="chip">Gazon Intelligent</div>
      </div>
    `;
  }

  // ── Events ────────────────────────────────────────────────────────────────

  _bindEvents(card) {
    // Un <select> ne déclenche pas de clic exploitable : on écoute son changement.
    card.querySelectorAll('select[data-action]').forEach(sel => {
      sel.addEventListener('change', () => {
        if (sel.dataset.action === 'declare-produit') {
          this._declareProduit = sel.value;
          this._render();
        }
      });
    });
    card.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this._tab = btn.dataset.tab;
        this._render();
      });
    });

    // Popup d'arrosage manuel : on met à jour les durées EN PLACE à chaque frappe. Un re-rendu
    // complet de la carte ferait perdre le focus du champ au milieu de la saisie.
    const mmInput = card.querySelector('#gi-manual-mm');
    if (mmInput) {
      const refresh = () => {
        const v = parseFloat(mmInput.value);
        this._manualMm = Number.isFinite(v) ? v : null;
        const rows = card.querySelector('#gi-manual-rows');
        if (rows) rows.innerHTML = this._manualRowsHtml(this._manualMm || 0);
        const go = card.querySelector('#gi-manual-go');
        if (go) {
          const v = this._manualMm;
          go.textContent = `💧 ${this._t('manual_launch')}${v > 0 ? ` ${num(v, 1)} mm` : ''}`;
          go.disabled = !(v > 0);
        }
        const after = card.querySelector('#gi-manual-after');
        if (after) {
          const resAttr  = ent(this._hass, this._config.entity_reserve)?.attributes || {};
          const resNow   = parseFloat(resAttr.reserve_actuelle_mm);
          const resUtile = parseFloat(resAttr.reserve_utile_mm);
          if (Number.isFinite(resNow) && Number.isFinite(resUtile)) {
            after.textContent = num(Math.min(resNow + (this._manualMm || 0), resUtile), 1);
          }
        }
      };
      mmInput.addEventListener('input', refresh);
      mmInput.addEventListener('click', e => e.stopPropagation());
    }

    card.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        const { action, entity } = el.dataset;
        const sw    = el.dataset.switch;
        const pompe = el.dataset.pompe;

        if (action === 'modal-stop') {
          return; // clic dans le popup : ne pas le refermer

        } else if (action === 'svc-open') {
          this._svcOuvert = el.dataset.svc;
          this._render();

        } else if (action === 'svc-close') {
          this._svcOuvert = null;
          this._render();

        } else if (action === 'svc-run') {
          const id = this._svcOuvert;
          const cibles = {
            declare_mowing:            this._config.entity_tonte_autorisee,
            declare_watering:          this._config.entity_objectif_arrosage,
            recalibrate_reserve:       this._config.entity_reserve,
            reset_mode:                this._config.entity_phase,
            remove_last_application:   this._config.entity_prochaine_intervention,
          };
          const data = { entity_id: cibles[id] };
          card.querySelectorAll('[id^="gi-svc-"]').forEach(inp => {
            const cle = inp.id.replace('gi-svc-', '');
            if (inp.type === 'checkbox') { data[cle] = inp.checked; return; }
            if (!inp.value) return;
            // Les dates partent au format attendu par les services : JJ/MM/AAAA.
            data[cle] = (inp.type === 'date') ? inp.value.split('-').reverse().join('/')
                      : (inp.type === 'number') ? parseFloat(inp.value) : inp.value;
          });
          this._call('gazon_intelligent', id, data);
          this._svcOuvert = null;
          this._render();

        } else if (action === 'note-toggle') {
          // Dépliage local, sans re-rendu : un rendu complet replierait toutes les autres.
          el.classList.toggle('ouverte');
          return;

        } else if (action === 'hist-toggle') {
          this._histTout = !this._histTout;
          this._render();

        } else if (action === 'declare-open') {
          this._declareOpen = true;
          this._render();

        } else if (action === 'declare-close') {
          this._declareOpen = false;
          this._render();

        } else if (action === 'declare-produit') {
          // On mémorise sans re-rendre tout de suite : le `change` du select suffit,
          // un rendu ici reconstruirait le champ et perdrait le focus.
          this._declareProduit = el.value;
          this._render();

        } else if (action === 'declare-run') {
          const sel  = card.querySelector('#gi-decl-prod');
          const date = card.querySelector('#gi-decl-date');
          const note = card.querySelector('#gi-decl-note');
          const cat  = (attrOf(this._hass, this._config.entity_catalogue_produits, 'products_summary')
            || attrOf(this._hass, this._config.entity_prochaine_intervention, 'products_summary') || []);
          const fiche = cat.find(x => x.id === (sel && sel.value));
          if (!fiche) return;
          // Le service attend la date en JJ/MM/AAAA ; l'input HTML la donne en AAAA-MM-JJ.
          const d = (date && date.value) ? date.value.split('-').reverse().join('/') : undefined;
          this._call('gazon_intelligent', 'declare_intervention', {
            entity_id: this._config.entity_prochaine_intervention,
            intervention: fiche.type,
            produit_id: fiche.id,
            ...(d ? { date_action: d } : {}),
            ...(note && note.value ? { note: note.value } : {}),
          });
          this._declareOpen = false;
          this._render();

        } else if (action === 'manual-open') {
          this._manualOpen = true;
          this._render();

        } else if (action === 'manual-close') {
          this._manualOpen = false;
          this._render();

        } else if (action === 'manual-preset') {
          this._manualMm = parseFloat(el.dataset.mm) || null;
          this._render();

        } else if (action === 'manual-run') {
          // On relit la valeur DANS le DOM au moment du clic : c'est toujours la dernière saisie.
          const input = card.querySelector('#gi-manual-mm');
          const mm = parseFloat(input && input.value);
          if (!(mm > 0)) return;
          this._manualMm = mm;
          // Cible explicite obligatoire : plusieurs gazons peuvent coexister sur l'installation.
          this._call('gazon_intelligent', 'start_manual_irrigation', {
            entity_id: this._config.entity_objectif_arrosage,
            objectif_mm: mm,
          });
          this._manualOpen = false;
          this._render();

        } else if (action === 'cut-height') {
          // `number.set_value` et non un incrément local : l'entité reste la source de vérité,
          // et la valeur survit au rechargement de la carte.
          const v = parseFloat(el.dataset.value);
          if (Number.isFinite(v)) {
            this._call('number', 'set_value', {
              entity_id: this._config.entity_hauteur_coupe, value: v,
            });
          }

        } else if (action === 'toggle' && entity) {
          this._call('switch', 'toggle', { entity_id: entity });

        } else if (action === 'zone-on' && sw) {
          if (pompe) this._call('switch', 'turn_on', { entity_id: pompe });
          this._call('switch', 'turn_on', { entity_id: sw });

        } else if (action === 'stop-irrigation') {
          this._call('gazon_intelligent', 'stop_irrigation', {
            entity_id: this._config.entity_objectif_arrosage,
            raison: 'Arrêt depuis la carte.',
          });

        } else if (action === 'zone-off' && sw) {
          this._call('switch', 'turn_off', { entity_id: sw });

        } else if (action === 'zone-pulse' && sw) {
          if (pompe) this._call('switch', 'turn_on', { entity_id: pompe });
          this._call('switch', 'turn_on', { entity_id: sw });
          // Arrêt automatique après 5 min (fonctionne tant que le dashboard est ouvert)
          setTimeout(() => this._call('switch', 'turn_off', { entity_id: sw }), 5 * 60 * 1000);
        }
      });
    });
  }

  // Durée par zone pour une dose donnée. Les zones s'enchaînent l'une après l'autre, et chacune
  // doit recevoir la dose complète : durée = dose / débit. Le débit fait autorité côté
  // intégration (number.<prefixe>_debit_zone_N) ; à défaut on prend celui saisi dans la carte.
  _zonePlan(mm) {
    const h = this._hass; const c = this._config;
    const prefix = String(c.entity_objectif_arrosage || '')
      .replace(/^sensor\./, '')
      .replace(/_objectif_d_arrosage$/, '');
    return (c.zones || []).map((z, i) => {
      const fromIntegration = parseFloat(stateOf(h, `number.${prefix}_debit_zone_${i + 1}`));
      const rate = Number.isFinite(fromIntegration) && fromIntegration > 0
        ? fromIntegration
        : (parseFloat(z.debit) || 0);
      return {
        name: z.name || `Zone ${i + 1}`,
        rate,
        minutes: rate > 0 && mm > 0 ? (mm / rate) * 60 : null,
      };
    });
  }

  // Lignes recalculées à chaque frappe (on ne re-rend pas toute la carte : le focus serait perdu).
  _manualRowsHtml(mm) {
    const plan = this._zonePlan(mm);
    if (!plan.length) return `<div class="empty">${this._t('no_zones')}</div>`;
    const total = plan.reduce((s, z) => s + (z.minutes || 0), 0);
    const rows = plan.map((z, i) => `
      <div class="modal-row">
        <div class="lbl">
          <div class="zone-dot" style="background:${ZONE_COLORS[i % ZONE_COLORS.length]}"></div>
          ${esc(z.name)}
        </div>
        <div class="val">${z.rate > 0
          ? `${num(z.rate, 0)} mm/h · <b>${fmtDuration(z.minutes)}</b>`
          : this._t('manual_no_rate')}</div>
      </div>`).join('');
    return `${rows}
      <div class="modal-row total">
        <div class="lbl">${this._t('manual_total')}</div>
        <div class="val">${fmtDuration(total)}</div>
      </div>`;
  }

  _manualModal() {
    if (!this._manualOpen) return '';
    const h = this._hass; const c = this._config;
    const objMm = parseFloat(stateOf(h, c.entity_objectif_arrosage)) || 0;
    const mm    = this._manualMm ?? (objMm > 0 ? objMm : 3);

    const resAttr  = ent(h, c.entity_reserve)?.attributes || {};
    const resNow   = parseFloat(resAttr.reserve_actuelle_mm ?? stateOf(h, c.entity_reserve));
    const resUtile = parseFloat(resAttr.reserve_utile_mm);
    const resAfter = Number.isFinite(resNow) && Number.isFinite(resUtile)
      ? Math.min(resNow + mm, resUtile) : null;

    const blockLabel = ent(h, c.entity_prochain_arrosage)?.attributes?.block_reason_label || '';
    const hour = new Date().getHours();
    const peakSun = hour >= 10 && hour < 18;

    return `
      <div class="modal-back" data-action="manual-close">
        <div class="modal" data-action="modal-stop">
          <div class="modal-head">
            <div class="modal-title">💧 ${this._t('manual_watering')}</div>
            <button class="modal-x" data-action="manual-close">✕</button>
          </div>

          <div class="modal-dose">
            <input class="manual-mm" id="gi-manual-mm" type="number"
                   min="0.5" max="30" step="0.5" value="${mm}"
                   aria-label="${this._t('manual_watering')}">
            <span class="manual-unit">mm</span>
            ${objMm > 0 ? `<button class="modal-preset" data-action="manual-preset"
                 data-mm="${objMm}">${this._t('manual_watering_hint')} ${num(objMm, 1)} mm</button>` : ''}
          </div>

          <div class="modal-rows" id="gi-manual-rows">${this._manualRowsHtml(mm)}</div>

          <div class="modal-note">
            ${Number.isFinite(resAfter) ? `${this._t('manual_reserve')} <b>${num(resNow, 1)}</b> →
               <b id="gi-manual-after">${num(resAfter, 1)}</b> / ${num(resUtile, 1)} mm<br>` : ''}
            ${blockLabel ? `${this._t('manual_blocked')} <b>${esc(blockLabel)}</b> —
               ${this._t('manual_bypass')}<br>` : ''}
            ${peakSun ? `<span class="modal-warn">⚠️ ${this._t('manual_peak_sun')}</span>` : ''}
          </div>

          <div class="modal-actions">
            <button class="modal-cancel" data-action="manual-close">${this._t('manual_cancel')}</button>
            <button class="modal-go" id="gi-manual-go" data-action="manual-run">💧 ${this._t('manual_launch')} ${num(mm, 1)} mm</button>
          </div>
        </div>
      </div>`;
  }

  _call(domain, service, data) {
    if (this._hass) this._hass.callService(domain, service, data);
  }
}

// ─── Editor ──────────────────────────────────────────────────────────────────

class GazonIntelligentCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._updateForm(); }

  set hass(hass) {
    this._hass = hass;
    if (!this._form) this._init();
    this._form.hass = hass;
  }

  connectedCallback() { this._init(); }

  _fire(config) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  _schema() {
    const lang = (navigator.language || 'fr').startsWith('fr') ? 'fr' : 'en';
    const L = {
      fr: { title: 'Titre', sub: 'Sous-titre', assistant: 'Entité assistant',
            meteo: 'Entité météo', arrosage: 'Arrosage en cours',
            prochain: 'Prochain arrosage', dernier: 'Dernier arrosage',
            pompe: 'Switch pompe', phases: 'Phases / risque / réserve',
            tonte: 'Prochaine tonte', tonte_auth: 'Tonte autorisée',
            switch_auto: 'Switch arrosage auto', switch_tondeuse: 'Switch tondeuse',
            intervention: 'Prochaine intervention', hauteur: 'Hauteur conseillée',
            etat_hydrique: 'État hydrique', objectif: 'Objectif d\'arrosage (ET₀/pluie)' },
      en: { title: 'Title', sub: 'Subtitle', assistant: 'Assistant entity',
            meteo: 'Weather entity', arrosage: 'Active watering session',
            prochain: 'Next watering', dernier: 'Last watering',
            pompe: 'Pump switch', phases: 'Phase / risk / reserve',
            tonte: 'Next mowing', tonte_auth: 'Mowing allowed',
            switch_auto: 'Auto watering switch', switch_tondeuse: 'Mower switch',
            intervention: 'Next intervention', hauteur: 'Advised height',
            etat_hydrique: 'Hydric state', objectif: 'Watering objective (ET₀/rain)' },
    }[lang];

    return [
      { name: 'title',                          selector: { text: {} },   label: L.title   },
      { name: 'subtitle',                        selector: { text: {} },   label: L.sub     },
      { name: 'entity_assistant',               selector: { entity: {} }, label: L.assistant },
      { name: 'entity_meteo',                   selector: { entity: { domain: 'weather' } }, label: L.meteo },
      { name: 'entity_arrosage_en_cours',       selector: { entity: {} }, label: L.arrosage },
      { name: 'entity_prochain_arrosage',       selector: { entity: {} }, label: L.prochain },
      { name: 'entity_dernier_arrosage',        selector: { entity: {} }, label: L.dernier  },
      { name: 'pompe_switch',                   selector: { entity: { domain: 'switch' } }, label: L.pompe },
      { name: 'entity_phase',                   selector: { entity: {} }, label: L.phases   },
      { name: 'entity_risque',                  selector: { entity: {} }, label: L.phases   },
      { name: 'entity_reserve',                 selector: { entity: {} }, label: L.phases   },
      { name: 'entity_etat_hydrique',           selector: { entity: {} }, label: L.etat_hydrique },
      { name: 'entity_prochaine_tonte',         selector: { entity: {} }, label: L.tonte    },
      { name: 'entity_tonte_autorisee',         selector: { entity: { domain: 'binary_sensor' } }, label: L.tonte_auth },
      { name: 'entity_hauteur_conseillee',      selector: { entity: {} }, label: L.hauteur  },
      { name: 'entity_switch_arrosage_auto',    selector: { entity: { domain: 'switch' } }, label: L.switch_auto },
      { name: 'entity_switch_tondeuse',         selector: { entity: { domain: 'switch' } }, label: L.switch_tondeuse },
      { name: 'entity_prochaine_intervention',  selector: { entity: {} }, label: L.intervention },
      { name: 'entity_objectif_arrosage',       selector: { entity: {} }, label: L.objectif     },
    ];
  }

  _init() {
    if (this._form) return;
    this._form = document.createElement('ha-form');
    this._form.computeLabel = schema => schema.label || schema.name;
    this._form.addEventListener('value-changed', e => {
      const cfg = { ...this._config, ...e.detail.value };
      this._config = cfg;
      this._fire(cfg);
    });
    this.appendChild(this._form);
    this._updateForm();
    if (this._hass) this._form.hass = this._hass;
  }

  _updateForm() {
    if (!this._form || !this._config) return;
    this._form.schema = this._schema();
    this._form.data   = this._config;
  }
}

// ─── Registration ─────────────────────────────────────────────────────────────

if (!customElements.get('gazon-intelligent-card'))
  customElements.define('gazon-intelligent-card', GazonIntelligentCard);
if (!customElements.get('gazon-intelligent-card-editor'))
  customElements.define('gazon-intelligent-card-editor', GazonIntelligentCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.find(c => c.type === 'gazon-intelligent-card')) {
  window.customCards.push({
    type:        'gazon-intelligent-card',
    name:        'Gazon Intelligent',
    description: 'Tableau de bord pelouse & arrosage',
    preview:     true,
  });
}

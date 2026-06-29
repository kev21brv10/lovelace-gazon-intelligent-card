// gazon-intelligent-card.js
// Carte Lovelace dédiée à l'intégration Gazon Intelligent

const GI_VERSION = '1.0.0';

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
.tabs { display: flex; padding: 10px 16px 0; gap: 3px; overflow-x: auto; scrollbar-width: none; }
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
.hero-eyebrow { font-size: 10px; opacity: 0.82; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
.hero-header  { display: flex; align-items: center; gap: 12px; }
.hero-icon    { font-size: 28px; line-height: 1; flex-shrink: 0; }
.hero-body    { flex: 1; min-width: 0; }
.hero-title   { font-size: 17px; font-weight: 600; margin-bottom: 2px; }
.hero-sub     { font-size: 12px; opacity: 0.82; }
.hero-foot    { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
.hero-badge   { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,.2); border-radius: 20px; padding: 4px 10px; font-size: 11px; }
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
.stat-mini-bar { margin-top: 8px; height: 4px; border-radius: 4px; background: var(--gi-border); overflow: hidden; }
.stat-mini-bar-fill { height: 100%; border-radius: 4px; transition: width .4s; }
.stat-card.risk-eleve, .stat-card.risk-critique { border-left: 3px solid var(--gi-danger); padding-left: 10px; }
.stat-card.risk-modere { border-left: 3px solid var(--gi-warn); padding-left: 10px; }
.stat-card.risk-faible { border-left: 3px solid var(--gi-accent); padding-left: 10px; }
.synth-banner { display: flex; align-items: center; gap: 8px; background: rgba(239,68,68,.13); border: 1px solid var(--gi-danger); border-radius: 10px; padding: 8px 12px; font-size: 12px; color: var(--gi-danger); font-weight: 500; }
.synth-banner-icon { font-size: 16px; flex-shrink: 0; }
.ctx-pills { display: flex; flex-wrap: wrap; gap: 6px; }
.ctx-pill { display: inline-flex; align-items: center; gap: 4px; background: var(--gi-surface); border-radius: 20px; padding: 4px 10px; font-size: 11px; color: var(--gi-muted); }

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
.zone-active-stop   { width: 100%; margin-top: 10px; background: none; color: var(--gi-danger); border: 1.5px solid #fca5a5; border-radius: 10px; padding: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
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
/* Zone CH badge */
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

// ─── i18n ────────────────────────────────────────────────────────────────────

const STRINGS = {
  fr: {
    // Tabs
    tab_synthese: 'Synthèse', tab_arrosage: 'Arrosage', tab_tonte: 'Tonte',
    tab_gazon: 'Gazon', tab_produits: 'Produits', tab_reglages: 'Réglages',
    // Sections
    section_zones: 'Zones', section_bilan: 'Bilan', section_zones_cfg: 'Zones configurées',
    section_24h: '24 dernières heures', section_history: 'Historique — 7 jours',
    // Timeline
    loading: 'Chargement…', no_watering_24h: 'Aucun arrosage sur 24 h',
    no_session_7d: 'Aucune session sur 7 jours', days_7: '7 jours', sessions: 'sess.',
    // Hero / status
    next_watering: 'Prochain arrosage', session_active: 'Session en cours',
    blocked: 'Bloqué', planned: 'mm planifiés', window_lbl: 'Fenêtre',
    progress: 'Avancement', watering_active: 'Arrosage actif',
    next_intervention: 'Prochaine intervention', no_intervention: 'Aucune intervention recommandée',
    // Zones
    no_zones: 'Aucune zone configurée', zone_inactive: 'Inactive',
    zone_active_badge: 'ACTIVE', pump: 'Pompe', pump_active: 'Active', pump_off: 'À l\'arrêt',
    btn_stop: '■ Arrêt', btn_off: 'Arrêt',
    // Stats
    soil_reserve: 'Réserve sol', lawn_risk: 'Risque gazon', phase: 'Phase',
    next_mow: 'Prochaine tonte', mow_height: 'Hauteur cible', mow_height_lbl: 'Hauteur tonte',
    risk_lbl: 'Risque', reserve_lbl: 'Réserve',
    watering_7d: 'Arrosage 7j', auto_on: 'Auto activé', auto_off: 'Auto désactivé',
    watering_active_chip: 'Arrosage actif',
    // Action labels
    act_aucune_action: 'Aucune action', act_arroser: 'Arroser',
    act_arroser_application: 'Arroser (post-application)',
    act_arroser_canicule_survie: 'Dose de survie (canicule)',
    act_arroser_canicule_soir: 'Rafraîchissement du soir',
    act_attendre: 'En attente', act_attente_conditions: 'En attente', act_bloquer: 'Bloqué',
    // Hydric labels
    hyd_plein: 'Plein', hyd_stress: 'Stress', hyd_critique: 'Critique',
    hyd_optimal: 'Optimal', hyd_charge: 'En charge', hyd_vide: 'Vide',
    // Mow labels
    tonte_autorisee: 'Autorisée', tonte_bloquee: 'Bloquée',
    tonte_a_surveiller: 'À surveiller', tonte_non_pertinent: 'Non applicable',
    // Risk labels
    risk_faible: 'Faible', risk_modere: 'Modéré', risk_eleve: 'Élevé', risk_critique: 'Critique',
    // Session log source labels
    src_auto: 'Auto', src_manuel: 'Manuel', src_rafraich: 'Rafraîch. soir',
    cause_hydrique: 'hydrique', cause_soir: 'soir',
    // Editor
    editor_msg: 'Configurez la carte via l\'éditeur YAML.',
    today: "Aujourd'hui", tomorrow: 'Demain', yesterday: 'Hier',
    _locale: 'fr-FR',
  },
  en: {
    tab_synthese: 'Overview', tab_arrosage: 'Watering', tab_tonte: 'Mowing',
    tab_gazon: 'Lawn', tab_produits: 'Products', tab_reglages: 'Settings',
    section_zones: 'Zones', section_bilan: 'Summary', section_zones_cfg: 'Configured zones',
    section_24h: 'Last 24 hours', section_history: 'History — 7 days',
    loading: 'Loading…', no_watering_24h: 'No watering in 24 h',
    no_session_7d: 'No session in 7 days', days_7: '7 days', sessions: 'sess.',
    next_watering: 'Next watering', session_active: 'Active session',
    blocked: 'Blocked', planned: 'mm planned', window_lbl: 'Window',
    progress: 'Progress', watering_active: 'Watering active',
    next_intervention: 'Next intervention', no_intervention: 'No intervention recommended',
    no_zones: 'No zones configured', zone_inactive: 'Inactive',
    zone_active_badge: 'ACTIVE', pump: 'Pump', pump_active: 'Active', pump_off: 'Off',
    btn_stop: '■ Stop', btn_off: 'Off',
    soil_reserve: 'Soil reserve', lawn_risk: 'Lawn risk', phase: 'Phase',
    next_mow: 'Next mow', mow_height: 'Target height', mow_height_lbl: 'Mow height',
    risk_lbl: 'Risk', reserve_lbl: 'Reserve',
    watering_7d: 'Watering 7d', auto_on: 'Auto on', auto_off: 'Auto off',
    watering_active_chip: 'Watering active',
    act_aucune_action: 'No action', act_arroser: 'Water',
    act_arroser_application: 'Water (post-application)',
    act_arroser_canicule_survie: 'Survival dose (heat wave)',
    act_arroser_canicule_soir: 'Evening cooling',
    act_attendre: 'Waiting', act_attente_conditions: 'Waiting', act_bloquer: 'Blocked',
    hyd_plein: 'Full', hyd_stress: 'Stress', hyd_critique: 'Critical',
    hyd_optimal: 'Optimal', hyd_charge: 'Charging', hyd_vide: 'Empty',
    tonte_autorisee: 'Allowed', tonte_bloquee: 'Blocked',
    tonte_a_surveiller: 'Monitor', tonte_non_pertinent: 'N/A',
    risk_faible: 'Low', risk_modere: 'Moderate', risk_eleve: 'High', risk_critique: 'Critical',
    src_auto: 'Auto', src_manuel: 'Manual', src_rafraich: 'Evening cool.',
    cause_hydrique: 'hydric', cause_soir: 'evening',
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

const HYDRIC_LABELS = {
  plein: 'hyd_plein', stress: 'hyd_stress', critique: 'hyd_critique',
  optimal: 'hyd_optimal', charge: 'hyd_charge', vide: 'hyd_vide',
};

const TONTE_LABELS = {
  autorisee: 'tonte_autorisee', bloquee: 'tonte_bloquee',
  a_surveiller: 'tonte_a_surveiller', non_pertinent: 'tonte_non_pertinent',
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
      entity_assistant:              config.entity_assistant,
      entity_arrosage_en_cours:      config.entity_arrosage_en_cours,
      entity_prochain_arrosage:      config.entity_prochain_arrosage,
      entity_prochaine_tonte:        config.entity_prochaine_tonte,
      entity_tonte_autorisee:        config.entity_tonte_autorisee,
      entity_phase:                  config.entity_phase,
      entity_risque:                 config.entity_risque,
      entity_reserve:                config.entity_reserve,
      entity_etat_hydrique:          config.entity_etat_hydrique,
      entity_hauteur_conseillee:     config.entity_hauteur_conseillee,
      entity_switch_arrosage_auto:   config.entity_switch_arrosage_auto,
      entity_switch_tondeuse:        config.entity_switch_tondeuse,
      entity_prochaine_intervention: config.entity_prochaine_intervention,
      entity_meteo:                  config.entity_meteo,
      entity_dernier_arrosage:       config.entity_dernier_arrosage,
      entity_objectif_arrosage:      config.entity_objectif_arrosage,
    };
    if (this._shadow) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._shadow) {
      this._shadow = this.attachShadow({ mode: 'open' });
      this._shadow.innerHTML = `<style>${STYLES}</style><div class="card" id="gi-card"></div>`;
    }
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
    return fallback || (key ? String(key).replace(/_/g, ' ') : '—');
  }

  _render() {
    const card = this._shadow && this._shadow.getElementById('gi-card');
    if (!card) return;
    card.innerHTML = this._html();
    this._bindEvents(card);
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
      const rangeStr = (tMin !== null && tMax !== null) ? `${tMin}–${tMax}${tUnit}` : '';
      const now      = new Date();
      const loc      = t('_locale');
      const dateStr  = now.toLocaleDateString(loc, {weekday:'short', day:'numeric', month:'short'});
      return `
      <div class="meteo-widget">
        <div class="meteo-top">
          <div class="meteo-left">
            <div class="meteo-icon">${METEO_ICONS[meteoState] || '🌡️'}</div>
            <div>
              <div class="meteo-temp-range">${tCurrent !== null ? tCurrent + tUnit : '—'}</div>
              ${rangeStr ? `<div class="meteo-label">${rangeStr}</div>` : `<div class="meteo-label">${t('today').toLowerCase()}</div>`}
            </div>
          </div>
          <div class="meteo-right">
            <div class="meteo-time">${nowHHMM(loc)}</div>
            <div class="meteo-date">${dateStr}</div>
          </div>
        </div>
        <div class="meteo-stats">
          ${meteoAttr.humidity   !== undefined ? `<span class="meteo-stat">💧 ${meteoAttr.humidity} %</span>` : ''}
          ${meteoAttr.wind_speed !== undefined ? `<span class="meteo-stat">💨 ${meteoAttr.wind_speed} ${meteoAttr.wind_speed_unit || 'km/h'}</span>` : ''}
          ${precip !== null ? `<span class="meteo-stat">🌧️ ${precip} mm</span>` : ''}
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
    `;
  }

  _renderTab() {
    const fn = this[`_tab_${this._tab}`];
    return fn ? fn.call(this) : '';
  }

  // ── Tab : Synthèse ────────────────────────────────────────────────────────

  _tab_synthese() {
    const h = this._hass; const c = this._config;

    // ── Assistant ────────────────────────────────────────────────────────────
    const action   = attrOf(h, c.entity_assistant, 'action')  || 'attente';
    const reason   = attrOf(h, c.entity_assistant, 'reason')  || '';
    const moment   = attrOf(h, c.entity_assistant, 'moment')  || '';
    const qty      = attrOf(h, c.entity_assistant, 'quantity_mm');
    const status   = attrOf(h, c.entity_assistant, 'status')  || '';
    const canicule = action.includes('canicule') || attrOf(h, c.entity_assistant, 'canicule_active') === true;

    const isBlocked  = status.includes('block') || action === 'attendre' || action === 'aucune_action' || action === 'attente_conditions';
    const isWatering = action.startsWith('arroser');
    const heroTone   = canicule ? 'danger' : isWatering ? '' : isBlocked ? 'warn' : '';
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
    const nextArrBlock  = nextArrAttr.block_reason_label || '';
    const nextArrVal    = nextArrBlock || nextArrWindow || '—';

    // ── Next mow ─────────────────────────────────────────────────────────────
    const nextTonteAttr = ent(h, c.entity_prochaine_tonte)?.attributes || {};
    const nextTonteDate = nextTonteAttr.target_date || stateOf(h, c.entity_prochaine_tonte);

    const autoOn = isOn(h, c.entity_switch_arrosage_auto);
    const active = (c.zones || []).some(z => isOn(h, z.sensor) || isOn(h, z.switch));

    // ── Context pills ─────────────────────────────────────────────────────────
    const ctxPills = [];
    if (phase) ctxPills.push(`<div class="ctx-pill">🌿 ${phase}</div>`);
    if (et0Today !== null) ctxPills.push(`<div class="ctx-pill">☀️ ET₀ ${num(et0Today, 1)} mm</div>`);
    if (pluieAttendue !== null && parseFloat(pluieAttendue) > 0) ctxPills.push(`<div class="ctx-pill">🌧️ ${num(pluieAttendue, 1)} mm attendus</div>`);

    return `
      <div class="hero ${heroTone}">
        <div class="hero-eyebrow">${this._t('tab_synthese')}</div>
        <div class="hero-header">
          <div class="hero-icon">${heroIcon}</div>
          <div class="hero-body">
            <div class="hero-title">${heroTitle}</div>
            ${reason ? `<div class="hero-sub">${reason}</div>` : ''}
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
          ${nextArrQty && !nextArrBlock ? `<div class="stat-sub">${num(nextArrQty, 1)} mm</div>` : ''}
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

    const sessAttr   = ent(h, c.entity_arrosage_en_cours)?.attributes || {};
    const sessActive = sessAttr.active === true;
    const sessSummary = sessAttr.summary || '';
    const progressPct = sessAttr.progress_percent || 0;

    const nextAttr  = ent(h, c.entity_prochain_arrosage)?.attributes || {};
    const nextBlock = nextAttr.block_reason_label || '';
    const nextWindow = nextAttr.watering_window_display || '';
    const nextQty   = nextAttr.objective_mm;

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
            <div class="zone-active-header">
              <div class="zone-dot on"></div>
              <div class="zone-name" style="flex:1">${z.name || 'Zone ' + (i + 1)}</div>
              <span class="zone-ch" style="background:${color}">CH${i + 1}</span>
              <span class="zone-active-badge">${this._t('zone_active_badge')}</span>
            </div>
            <div class="zone-active-timer">
              <span class="zone-active-clock">⏱</span>
              <span class="zone-active-elapsed">${fmtTimer(elapsed)}</span>
              ${z.debit ? `<span class="zone-active-max">${z.debit} mm/h</span>` : ''}
            </div>
            <button class="zone-active-stop" data-action="zone-off" data-switch="${sw}" data-pompe="${pompe}">${this._t('btn_stop')}</button>
          </div>`;
      }

      return `
        <div class="zone-card">
          <div class="zone-dot"></div>
          <div class="zone-info">
            <div class="zone-name">${z.name || 'Zone ' + (i + 1)}</div>
            <div><span class="zone-ch" style="background:${color}">CH${i + 1}</span></div>
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
          <div class="hero-title">${sessSummary || this._t('watering_active')}</div>
          ${progressPct ? `<div class="hero-sub">${this._t('progress')} : ${progressPct} %</div>` : ''}
        </div>
      ` : nextBlock ? `
        <div class="hero warn">
          <div class="hero-eyebrow">${this._t('next_watering')}</div>
          <div class="hero-title">${this._t('blocked')} · ${nextBlock}</div>
          ${nextWindow ? `<div class="hero-badge"><div class="hero-dot"></div>${this._t('window_lbl')} : ${nextWindow}</div>` : ''}
        </div>
      ` : (nextQty && parseFloat(nextQty) > 0) ? `
        <div class="hero">
          <div class="hero-eyebrow">${this._t('next_watering')}</div>
          <div class="hero-title">${num(nextQty, 1)} ${this._t('planned')}</div>
          ${nextWindow ? `<div class="hero-badge"><div class="hero-dot"></div>${nextWindow}</div>` : ''}
        </div>
      ` : ''}

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

    const rows = zones.map((z, i) => {
      const color = ZONE_COLORS[i % ZONE_COLORS.length];

      // Merge: segments from derniers_arrosages + raw history (deduplicated by overlap)
      const rawSessions = (this._history && z.switch) ? (this._history[z.switch] || []) : [];
      const intSessions = zoneSegments[z.switch] || [];
      const allSessions = [...intSessions, ...rawSessions];

      // If zone is currently active, extend/add bar to now
      const currentlyOn = isOn(h, z.sensor) || isOn(h, z.switch);
      if (currentlyOn) {
        const last = allSessions[allSessions.length - 1];
        if (last && last.end_ms >= now - 60000) {
          allSessions[allSessions.length - 1] = { ...last, end_ms: now };
        } else {
          allSessions.push({ start_ms: now - 60000, end_ms: now });
        }
      }

      const windowSessions = allSessions.filter(s => s.end_ms >= windowStart && s.start_ms <= now);
      const bars = windowSessions.map(s => {
        const leftPct  = Math.max(0, (s.start_ms - windowStart) / DAY * 100);
        const rightPct = Math.min(100, (s.end_ms   - windowStart) / DAY * 100);
        const widthPct = Math.max(0.5, rightPct - leftPct);
        return `<div class="tl-bar" style="background:${color};left:${leftPct.toFixed(2)}%;width:${widthPct.toFixed(2)}%"></div>`;
      }).join('');

      return `<div class="tl-row"><div class="tl-label">Z${i + 1}</div><div class="tl-track">${bars}</div></div>`;
    }).join('');

    // ── 24h stats per zone (dot chips) from derniers_arrosages ──
    const stats = zones.map((z, i) => {
      const segs = zoneSegments[z.switch] || [];
      const totalMs = segs.reduce((s, r) => s + (r.end_ms - r.start_ms), 0);
      const color   = ZONE_COLORS[i % ZONE_COLORS.length];
      if (!segs.length) return '';
      return `<div class="tl-stat"><span class="tl-stat-dot" style="background:${color}"></span><span class="tl-stat-name">Z${i+1}</span><span class="tl-stat-val">${fmtDur(totalMs)}</span><span class="tl-stat-count">${segs.length} ${this._t('sessions')}</span></div>`;
    }).join('');

    // ── 7-day header stats ──
    let total7Ms = 0, total7Count = 0;
    zones.forEach(z => {
      const sess = (this._history && z.switch) ? (this._history[z.switch] || []) : [];
      total7Ms    += sess.reduce((s, r) => s + (r.end_ms - r.start_ms), 0);
      total7Count += sess.length;
    });
    const header7 = (this._history && total7Count > 0) ? `
      <div class="tl-header">
        <div><span class="tl-h-big">${fmtDur(total7Ms)}</span> <span class="tl-h-sub">${this._t('days_7')}</span></div>
        <div class="tl-h-pill">${total7Count} activation${total7Count > 1 ? 's' : ''}</div>
      </div>` : '';

    // ── Session log — depuis derniers_arrosages de l'intégration ──
    const zoneBySwitch = {};
    zones.forEach((z, i) => { if (z.switch) zoneBySwitch[z.switch] = { name: z.name || 'Z'+(i+1), color: ZONE_COLORS[i % ZONE_COLORS.length], idx: i }; });

    const SOURCE_LABELS = { auto_irrigation: this._t('src_auto'), zone_session: this._t('src_manuel'), rafraichissement_soir: this._t('src_rafraich') };
    const CAUSE_LABELS  = { hydrique: this._t('cause_hydrique'), rafraichissement_soir: this._t('cause_soir') };

    const derniersArrosages = ent(h, c.entity_dernier_arrosage)?.attributes?.derniers_arrosages || [];
    const logHtml = derniersArrosages.map(e => {
      const d       = new Date(e.recorded_at);
      const dayStr  = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      const timeStr = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const srcLabel = SOURCE_LABELS[e.source] || e.source;
      const causeLabel = (e.watering_cause && e.watering_cause !== e.source) ? ` · ${CAUSE_LABELS[e.watering_cause] || e.watering_cause}` : '';
      const zoneChips = (e.zones || []).map(z => {
        const info = zoneBySwitch[z.entity_id];
        if (!info) return '';
        const dur = z.duration_min >= 1 ? Math.round(z.duration_min) + ' min' : Math.round(z.duration_min * 60) + ' s';
        return `<span class="ch-badge" style="background:${info.color}">CH${info.idx+1}</span><span class="tl-log-zdur">${dur}</span>`;
      }).join('');
      const mmStr = e.total_mm >= 0.1 ? `${e.total_mm} mm` : '< 0.1 mm';
      return `<div class="tl-log-entry">
        <div class="tl-log-row1">
          <span class="tl-log-src">${srcLabel}${causeLabel}</span>
          <span class="tl-log-when">${dayStr} ${timeStr}</span>
          <span class="tl-log-dur">${mmStr}</span>
        </div>
        ${zoneChips ? `<div class="tl-log-zones">${zoneChips}</div>` : ''}
      </div>`;
    }).join('');

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
      ${this._history ? `
      <div class="section-title" style="margin-top:12px">${this._t('section_history')}</div>
      ${header7}
      ${logHtml ? `<div class="tl-log">${logHtml}</div>` : `<div class="tl-empty">${this._t('no_session_7d')}</div>`}
      ` : ''}`;
  }

  async _fetchHistory(zones) {
    if (!this._hass) return;
    this._historyTs = Date.now(); // mark fetch in progress to avoid parallel calls
    const entityIds = zones.map(z => z.switch).filter(Boolean).join(',');
    if (!entityIds) return;
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    try {
      const data = await this._hass.callApi('GET',
        `history/period/${start}?filter_entity_id=${entityIds}&minimal_response=true&no_attributes=true`);
      const result = {};
      (data || []).forEach(stateList => {
        if (!stateList.length) return;
        const entityId = stateList[0].entity_id;
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
        if (onStart !== null) sessions.push({ start_ms: onStart, end_ms: Date.now() });
        result[entityId] = sessions;
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

    const tonteAttr  = ent(h, c.entity_tonte_autorisee)?.attributes || {};
    const tonteStatut = tonteAttr.tonte_statut || '';
    const blockLbl   = tonteAttr.mowing_block_reason_label || '';
    const gPermet    = tonteAttr.gazon_permet_tonte;
    const mPermet    = tonteAttr.machine_permet_tonte;
    const bat        = tonteAttr.tondeuse_batterie;
    const nomTonde   = tonteAttr.tondeuse_nom || 'Tondeuse robot';
    const statutLib  = tonteAttr.tondeuse_statut_libelle || '';
    const coordOn    = isOn(h, c.entity_switch_tondeuse);

    const statusClass = tonteStatut === 'autorisee' ? '' : tonteStatut === 'a_surveiller' ? 'warn' : 'blocked';

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
        <div class="mow-status ${statusClass}">${this._lblt(TONTE_LABELS, tonteStatut)}</div>
      </div>

      ${blockLbl ? `
        <div class="chip-row">
          <div class="chip"><div class="chip-dot" style="background:var(--gi-warn)"></div>${blockLbl}</div>
        </div>` : ''}

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">${this._t('next_mow')}</div>
          <div class="stat-value sm">${nextDate ? fmtDate(nextDate, k => this._t(k)) : '—'}</div>
          ${nextSummary ? `<div class="stat-sub">${nextSummary}</div>` : ''}
        </div>
        <div class="stat-card">
          <div class="stat-label">${this._t('mow_height')}</div>
          <div class="stat-value sm accent">${hauteur ? num(hauteur, 1) + ' cm' : '—'}</div>
          ${(hautAttr.hauteur_tonte_min_cm && hautAttr.hauteur_tonte_max_cm)
            ? `<div class="stat-sub">Min ${hautAttr.hauteur_tonte_min_cm} · Max ${hautAttr.hauteur_tonte_max_cm} cm</div>`
            : ''}
        </div>
      </div>

      ${(gPermet !== undefined || mPermet !== undefined) ? `
        <div class="chip-row">
          ${gPermet !== undefined ? `<div class="chip"><div class="chip-dot" style="background:${gPermet ? 'var(--gi-accent)' : 'var(--gi-muted)'}"></div>Gazon ${gPermet ? 'permet' : 'bloque'}</div>` : ''}
          ${mPermet !== undefined ? `<div class="chip"><div class="chip-dot" style="background:${mPermet ? 'var(--gi-accent)' : 'var(--gi-muted)'}"></div>Machine ${mPermet ? 'prête' : 'non prête'}</div>` : ''}
        </div>` : ''}

      <div class="sep"></div>

      <div class="toggle-row">
        <div class="toggle-info">
          <div class="toggle-name">Coordination tondeuse</div>
          <div class="toggle-sub">Bloque la tonte si arrosage en cours</div>
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

      ${fillPct !== null ? `
        <div class="reserve-bar-wrap">
          <div class="reserve-bar-label">
            <span>${this._t('reserve_lbl')}</span>
            <span>${fillPct} % · ${num(reserveMm, 1)} mm</span>
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
            ${arros7j !== undefined ? this._t('watering_7d') + ' : ' + num(arros7j, 1) + ' mm' : ''}
            ${pluie    !== undefined ? ' · ' + num(pluie, 1)   + ' mm' : ''}
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

    const isRecommended = iState === 'recommande' || iState === 'recommended';
    const heroTone = isRecommended ? 'purple' : 'warn';
    const showHero = iState && iState !== 'unavailable' && iState !== 'unknown';

    return `
      ${showHero ? `
        <div class="hero ${heroTone}">
          <div class="hero-eyebrow">${this._t('next_intervention')}</div>
          <div class="hero-title">${produit}</div>
          ${hint ? `<div class="hero-sub">${hint}</div>` : ''}
          ${score !== null ? `<div class="hero-badge"><div class="hero-dot"></div>${score} % · ${iState}</div>` : ''}
        </div>` : ''}

      ${summary ? `
        <div class="zone-card">
          <div class="zone-dot purple"></div>
          <div class="zone-info">
            <div class="zone-name">${summary}</div>
            ${actionL ? `<div class="zone-detail">${actionL}</div>` : ''}
          </div>
        </div>` : ''}

      ${(!showHero && !summary) ? `<div class="empty">${this._t('no_intervention')}</div>` : ''}
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
          <div class="toggle-name">Coordination tondeuse</div>
          <div class="toggle-sub">Bloque la tonte pendant l'arrosage</div>
        </div>
        <button class="toggle-sw${coordOn ? ' on' : ''}" data-action="toggle" data-entity="${c.entity_switch_tondeuse || ''}">
          <div class="toggle-knob"></div>
        </button>
      </div>

      ${zones.length ? `
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
    card.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this._tab = btn.dataset.tab;
        this._render();
      });
    });

    card.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        const { action, entity } = el.dataset;
        const sw    = el.dataset.switch;
        const pompe = el.dataset.pompe;

        if (action === 'toggle' && entity) {
          this._call('switch', 'toggle', { entity_id: entity });

        } else if (action === 'zone-on' && sw) {
          if (pompe) this._call('switch', 'turn_on', { entity_id: pompe });
          this._call('switch', 'turn_on', { entity_id: sw });

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

customElements.define('gazon-intelligent-card',        GazonIntelligentCard);
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

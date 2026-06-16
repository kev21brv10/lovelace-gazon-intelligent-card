export const CARD_STYLES = String.raw`
        :host {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          --gi-font-xxs: clamp(0.64rem, 0.60rem + 0.12vw, 0.72rem);
          --gi-font-xs: clamp(0.72rem, 0.68rem + 0.16vw, 0.80rem);
          --gi-font-sm: clamp(0.80rem, 0.76rem + 0.18vw, 0.92rem);
          --gi-font-md: clamp(0.92rem, 0.86rem + 0.22vw, 1.04rem);
          --gi-font-lg: clamp(1.06rem, 0.98rem + 0.32vw, 1.20rem);
          --gi-font-xl: clamp(1.14rem, 1.02rem + 0.44vw, 1.36rem);
          --gi-font-2xl: clamp(1.34rem, 1.18rem + 0.62vw, 1.62rem);
          --gi-label-size: var(--gi-font-xxs);
          --gi-label-spacing: 0.08em;
          --gi-body-line: 1.34;
          --gi-tight-line: 1.18;
          --gi-motion-fast: 180ms;
          --gi-motion-medium: 260ms;
          --gi-ease-standard: cubic-bezier(0.2, 0, 0, 1);
          --gi-ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
          --gi-header-direction: row;
          --gi-header-align: center;
          --gi-header-justify: space-between;
          --gi-header-gap: 10px;
          --gi-header-margin-bottom: 10px;
          --gi-hero-margin: 4px 0 10px;
          --gi-hero-gap: 12px;
          --gi-hero-lead-padding: 16px 18px;
          --gi-hero-lead-gap: 12px;
          --gi-hero-metrics-gap: 10px;
          --gi-inline-direction: row;
          --gi-inline-align: center;
          --gi-inline-justify: space-between;
          --gi-inline-gap: 10px;
          --gi-nav-gap: 8px;
          --gi-nav-margin: 6px 0 10px;
          --gi-nav-item-gap: 7px;
          --gi-nav-item-padding: 9px 13px;
          --gi-grid-template: repeat(2, minmax(0, 1fr));
          --gi-grid-gap: 10px;
          --gi-action-direction: row;
          --gi-action-justify: flex-start;
          --gi-action-width: 100%;
          --gi-action-padding-inline: 18px;
          --gi-action-padding-inline-end: 22px;
          --gi-action-padding-block: 15px;
          --gi-action-min-height: 78px;
          --gi-action-gap: 12px;
          --gi-action-radius: 22px;
          --gi-action-icon-size: 26px;
          --gi-action-icon-glyph-size: 16px;
          --gi-action-icon-bg: rgba(255, 255, 255, 0.2);
          --gi-decision-grid-gap: 10px;
          --gi-tiles-gap: 6px;
          --gi-card-core-gap: 12px;
          --gi-card-core-padding: 13px 15px;
          --gi-card-core-min-height: 82px;
          --gi-card-core-radius: 24px;
          --gi-card-core-icon-size: 22px;
          --gi-card-core-icon-glyph-size: 13px;
          --gi-card-core-secondary-size: 0.74rem;
          /* ── Design tokens v2 (modernisation : à plat, 1 accent, plus d'air) ── */
          /* Échelle d'espacement, base 4px */
          --gi-space-1: 4px;
          --gi-space-2: 8px;
          --gi-space-3: 12px;
          --gi-space-4: 16px;
          --gi-space-5: 24px;
          --gi-space-6: 32px;
          /* Rayons normalisés */
          --gi-radius-sm: 10px;
          --gi-radius-md: 14px;
          --gi-radius-lg: 18px;
          /* Poids typographiques (deux seulement) */
          --gi-weight-regular: 400;
          --gi-weight-medium: 500;
          /* Accent unique, surchargeable (config accent_color → --gazon-brand-accent) */
          --gi-accent: var(--gazon-brand-accent, var(--gazon-section-accent, #58c27d));
          --gi-accent-text: var(--gi-accent);
          --gi-accent-soft: color-mix(in srgb, var(--gi-accent) 14%, transparent);
          /* Surfaces neutres branchées sur le thème HA (clair/sombre automatique) */
          --gi-bg: var(--ha-card-background, var(--card-background-color, var(--secondary-background-color)));
          --gi-surface: color-mix(in srgb, var(--primary-text-color) 4%, var(--gi-bg));
          --gi-surface-2: color-mix(in srgb, var(--primary-text-color) 8%, var(--gi-bg));
          --gi-border: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
          --gi-border-strong: color-mix(in srgb, var(--primary-text-color) 22%, transparent);
          /* Texte : alias du thème HA */
          --gi-text: var(--primary-text-color);
          --gi-text-muted: var(--secondary-text-color);
          --gi-text-faint: color-mix(in srgb, var(--secondary-text-color) 70%, transparent);
          /* Statuts : la couleur ne porte que le sens */
          --gi-status-success: var(--success-color, #4caf50);
          --gi-status-warning: var(--warning-color, #ff9800);
          --gi-status-danger: var(--error-color, #f44336);
          --gi-status-neutral: var(--secondary-text-color);
          /* Élévation : une seule ombre douce */
          --gi-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 1px rgba(0, 0, 0, 0.04);
          /* ── Tokens hérités, ré-câblés à plat sur la base v2 ── */
          --gi-surface-border: var(--gi-border);
          --gi-surface-border-strong: var(--gi-border-strong);
          --gi-surface-fill: var(--gi-surface);
          --gi-surface-fill-accent: var(--gi-surface-2);
          --gi-surface-shadow: var(--gi-shadow-sm);
          --gi-surface-shadow-strong: var(--gi-shadow-sm);
          --gi-tab-accent: var(--gazon-section-accent);
          --gi-tab-companion: var(--gazon-water-color, #5f97a3);
          --gi-tab-glow-color: var(--gazon-section-accent);
          --gi-tab-mist-color: var(--gazon-lawn-color, #8aa06d);
          --gi-tab-shadow: 0 14px 28px color-mix(in srgb, var(--gi-tab-glow-color) 14%, transparent);
        }

        @keyframes gazonPulseSoft {
          0% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--gazon-card-accent) 18%, transparent);
          }
          70% {
            box-shadow: 0 0 0 10px color-mix(in srgb, var(--gazon-card-accent) 0%, transparent);
          }
          100% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--gazon-card-accent) 0%, transparent);
          }
        }

        @keyframes gi-fade-up {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gi-card-ambient {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.72;
          }
          50% {
            transform: translate3d(0, -10px, 0) scale(1.04);
            opacity: 0.92;
          }
        }

        @keyframes gi-panel-reveal {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.988);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .tabs-layout {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 10px;
        }

        .gi-card,
        .gi-panel,
        .gi-tab,
        .gi-progress__bar {
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            opacity var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard),
            filter var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .gi-row {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .gi-icon {
          display: grid;
          place-items: center;
          width: 20px;
          height: 20px;
          flex: none;
          flex-shrink: 0;
          line-height: 1;
          overflow: visible;
          --mdc-icon-size: 16px;
        }

        .gi-icon--sm {
          width: 18px;
          height: 18px;
          --mdc-icon-size: 13px;
        }

        .gi-icon--pill {
          width: 14px;
          height: 14px;
          --mdc-icon-size: 14px;
        }

        .gi-icon ha-icon {
          display: block;
          width: 16px;
          height: 16px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
        }

        .gi-icon--sm ha-icon {
          display: block;
          width: 13px;
          height: 13px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
        }

        .gi-icon--pill ha-icon {
          display: block;
          width: 14px;
          height: 14px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
          transform: none;
        }

        .gi-tabs,
        .tab-nav,
        .section-nav {
          display: flex;
          gap: var(--gi-nav-gap);
          flex-wrap: nowrap;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-padding-inline: 10px;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
          max-width: 100%;
          scrollbar-width: none;
          padding-inline: 10px;
          padding-bottom: 2px;
          margin: var(--gi-nav-margin);
          scroll-snap-type: x proximity;
        }

        @media (min-width: 760px) {
          .gi-tabs,
          .tab-nav,
          .section-nav {
            flex-wrap: wrap;
            overflow-x: visible;
            scroll-snap-type: none;
          }

          .gi-tab,
          .tab-nav__item,
          .section-nav__item {
            min-width: 0;
          }
        }

        .gi-tabs::-webkit-scrollbar,
        .tab-nav::-webkit-scrollbar,
        .section-nav::-webkit-scrollbar {
          display: none;
        }

        .gi-tab,
        .tab-nav__item,
        .section-nav__item {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--gi-nav-item-gap);
          flex: 0 0 auto;
          min-width: 0;
          border: 1px solid var(--gi-surface-border);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 20%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 96%, white) 100%);
          color: var(--secondary-text-color);
          border-radius: 12px;
          padding: var(--gi-nav-item-padding);
          font-size: var(--gi-font-xs);
          font-weight: 700;
          line-height: 1.15;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          box-shadow: var(--gi-surface-shadow);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
          scroll-snap-align: start;
          overflow: hidden;
        }

        .gi-tab::before,
        .tab-nav__item::before,
        .section-nav__item::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--gi-tab-companion) 22%, transparent) 0%, transparent 28%),
            linear-gradient(135deg, color-mix(in srgb, var(--gi-tab-accent) 16%, transparent) 0%, transparent 100%);
          opacity: 0;
          transition: opacity var(--gi-motion-fast) var(--gi-ease-standard);
          pointer-events: none;
        }

        .gi-tab:hover,
        .tab-nav__item:hover,
        .section-nav__item:hover {
          background: color-mix(in srgb, var(--secondary-background-color) 52%, var(--gi-tab-accent) 48%);
          border-color: var(--gi-surface-border-strong);
          box-shadow: var(--gi-surface-shadow-strong);
          transform: translateY(-1px);
        }

        .gi-tab:hover::before,
        .tab-nav__item:hover::before,
        .section-nav__item:hover::before {
          opacity: 1;
        }

        .gi-tab .gi-icon,
        .tab-nav__item .gi-icon,
        .section-nav__item .gi-icon {
          width: 18px;
          height: 18px;
        }

        .gi-tab--active,
        .tab-nav__item--active,
        .section-nav__item--active {
          color: var(--primary-text-color);
          border-color: var(--gi-surface-border-strong);
          background:
            radial-gradient(circle at 16% 18%, color-mix(in srgb, var(--gi-tab-companion) 18%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 48%, transparent) 0%, transparent 100%),
            color-mix(in srgb, var(--secondary-background-color) 94%, white);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.16),
            0 0 0 1px color-mix(in srgb, var(--gi-tab-glow-color) 28%, transparent),
            0 0 34px color-mix(in srgb, var(--gi-tab-glow-color) 20%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transform: translateY(-1px) scale(1.01);
          font-weight: 700;
        }

        .gi-tab--active::before,
        .tab-nav__item--active::before,
        .section-nav__item--active::before {
          opacity: 1;
        }

        /* Onglets façon texte souligné (cible maquette) — scopé à la nav d'onglets */
        .tab-nav {
          gap: 22px;
          border-bottom: 1px solid var(--gi-border);
          padding-inline: 2px;
          padding-bottom: 0;
          margin: 2px 0 18px;
          align-items: stretch;
        }

        .tab-nav .tab-nav__item {
          border: none;
          border-bottom: 2px solid transparent;
          border-radius: 0;
          background: none;
          box-shadow: none;
          color: var(--gi-text-muted);
          padding: 9px 1px;
          margin-bottom: -1px;
          font-weight: var(--gi-weight-medium);
          font-size: var(--gi-font-sm);
          transform: none;
          overflow: visible;
        }

        .tab-nav .tab-nav__item::before {
          content: none;
        }

        .tab-nav .tab-nav__item .gi-icon {
          display: none;
        }

        .tab-nav .tab-nav__item:hover {
          background: none;
          box-shadow: none;
          transform: none;
          color: var(--gi-text);
        }

        .tab-nav .tab-nav__item--active {
          background: none;
          box-shadow: none;
          transform: none;
          color: var(--gi-text);
          border-bottom-color: var(--gi-accent);
        }

        .tab-panel,
        .gi-panel {
          display: flex;
          flex-direction: column;
          gap: var(--gi-space-4);
          animation: gi-fade-up var(--gi-motion-fast) var(--gi-ease-soft);
          will-change: transform, opacity;
        }

        .tab-panel > * {
          animation: gi-panel-reveal 420ms var(--gi-ease-soft) both;
        }

        .tab-panel > *:nth-child(1) { animation-delay: 0ms; }
        .tab-panel > *:nth-child(2) { animation-delay: 40ms; }
        .tab-panel > *:nth-child(3) { animation-delay: 80ms; }
        .tab-panel > *:nth-child(4) { animation-delay: 120ms; }
        .tab-panel > *:nth-child(5) { animation-delay: 160ms; }

        .tab-panel__hero,
        .tab-panel__section,
        .tab-panel__block {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--gi-surface-border);
          border-radius: 24px;
          background: var(--gi-surface-fill);
          padding: 20px 22px;
          box-shadow: none;
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .tab-panel__hero {
          gap: 10px;
          border-color: var(--gi-surface-border-strong);
          background: var(--gi-surface-fill-accent);
          box-shadow: inset 3px 0 0 var(--gi-accent);
        }

        .tab-panel--intervention .tab-panel__hero {
          gap: 10px;
        }

        .tab-panel--intervention .tab-panel__hero-next {
          font-size: var(--gi-font-xl);
          font-weight: 900;
          line-height: 1.18;
        }

        .tab-panel--intervention .tab-panel__hero-hint {
          max-width: 68ch;
        }

        .tab-panel__hero--pulse {
          animation: gazonPulseSoft 2.8s ease-in-out infinite;
        }

        .tab-panel__hero-top,
        .tab-panel__header,
        .tab-panel__section-head {
          display: flex;
          flex-direction: var(--gi-inline-direction);
          align-items: var(--gi-inline-align);
          justify-content: var(--gi-inline-justify);
          gap: var(--gi-inline-gap);
          min-width: 0;
          padding-bottom: 4px;
          margin-bottom: 2px;
          border-bottom: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          position: relative;
        }

        .tab-panel__hero-top::before,
        .tab-panel__header::before,
        .tab-panel__section-head::before {
          content: "";
          position: absolute;
          inset-inline-start: 0;
          inset-block-start: -1px;
          width: 42px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--gi-tab-companion), var(--gi-tab-mist-color), var(--gi-tab-accent));
          opacity: 0.92;
          pointer-events: none;
        }

        .tab-panel__hero-summary,
        .tab-panel__title,
        .tab-panel__section-summary,
        .tab-panel__block-value {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .tab-panel__hero-summary {
          font-size: var(--gi-label-size);
          text-transform: uppercase;
          letter-spacing: var(--gi-label-spacing);
          font-weight: var(--gi-weight-medium);
          line-height: 1.2;
          color: var(--secondary-text-color);
        }

        .tab-panel__hero-next,
        .tab-panel__hero-hint,
        .tab-panel__block-hint,
        .tab-panel__section-hint,
        .tab-panel__section-meta,
        .tab-panel__section-title,
        .tab-panel__eyebrow,
        .tab-panel__stat-secondary,
        .tab-panel__empty {
          color: var(--secondary-text-color);
        }

        .tab-panel__hero-next,
        .tab-panel__hero-hint,
        .tab-panel__block-hint,
        .tab-panel__section-hint,
        .tab-panel__header-hint,
        .tab-panel__stat-secondary,
        .tab-panel__empty {
          font-size: var(--gi-font-sm);
          line-height: var(--gi-body-line);
        }

        .tab-panel__hero-next {
          font-size: var(--gi-font-2xl);
          font-weight: var(--gi-weight-medium);
          line-height: var(--gi-tight-line);
          color: var(--primary-text-color);
          letter-spacing: -0.01em;
        }

        .tab-panel__hero-hint {
          max-width: 72ch;
        }

        .tab-panel__section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-color: var(--gi-surface-border);
        }

        .tab-panel__section--overview-facts,
        .tab-panel__section--mowing-summary,
        .tab-panel__section--intervention-overview,
        .tab-panel__section--intervention-technical {
          gap: 8px;
        }

        .tab-panel--overview .tab-panel__summary-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .tab-panel--overview .tab-panel__summary-row {
          padding: 12px 12px 13px;
          border: 1px solid var(--gi-border);
          border-radius: 18px;
          background: var(--gi-surface);
          box-shadow: none;
        }

        .tab-panel--overview .tab-panel__summary-row--action:hover {
          background: var(--gi-surface-2);
          border-color: var(--gi-border-strong);
        }

        .tab-panel--overview .tab-panel__summary-row--action:focus-visible {
          border-color: color-mix(in srgb, var(--gi-surface-border) 86%, transparent);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 0 0 1px color-mix(in srgb, var(--gazon-section-accent) 18%, transparent);
        }

        .tab-panel--overview .tab-panel__summary-row:first-child {
          padding-top: 12px;
        }

        .tab-panel__history-foldout {
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          border-radius: 20px;
          overflow: hidden;
        }

        .tab-panel__history-foldout[open] {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 18%, var(--divider-color));
        }

        .tab-panel__history-foldout-summary {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px 14px;
          cursor: pointer;
          list-style: none;
          user-select: none;
        }

        .tab-panel__history-foldout-summary::-webkit-details-marker {
          display: none;
        }

        .tab-panel__history-foldout-head {
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .tab-panel__history-foldout-body {
          padding: 0 14px 14px;
        }

        .tab-panel__history-rail {
          gap: 10px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          border-radius: 20px;
          overflow: hidden;
        }

        .tab-panel__history-inline {
          margin-top: 8px;
          border-top: 1px solid color-mix(in srgb, var(--gi-surface-border) 74%, transparent);
          padding-top: 8px;
        }

        .tab-panel__history-inline-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
        }

        .tab-panel__history-inline-meta {
          font-size: var(--gi-font-xxs);
          line-height: 1.25;
          color: var(--secondary-text-color);
          text-align: right;
        }

        .tab-panel__history-rail-body {
          max-height: 320px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 14px 14px;
          scrollbar-width: thin;
          scrollbar-color: color-mix(in srgb, var(--gazon-section-accent) 24%, transparent) transparent;
        }

        .tab-panel__history-rail-body::-webkit-scrollbar {
          width: 7px;
        }

        .tab-panel__history-rail-body::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: color-mix(in srgb, var(--gazon-section-accent) 22%, transparent);
        }

        .tab-panel__history-rail-body--inline {
          max-height: 160px;
          padding: 0 4px 0 0;
        }

        .tab-panel__history-rail-track {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .tab-panel__history-rail-item {
          padding: 6px 0;
          border-top: 1px solid color-mix(in srgb, var(--gi-surface-border) 82%, transparent);
          background: transparent;
        }

        .tab-panel__history-rail-item:first-child {
          padding-top: 0;
          border-top: 0;
        }

        .tab-panel__history-inline .tab-panel__summary-label {
          font-size: var(--gi-font-xxs);
          line-height: 1.15;
          margin-bottom: 1px;
        }

        .tab-panel__history-inline .tab-panel__summary-value {
          font-size: var(--gi-font-xs);
          line-height: 1.08;
        }

        .tab-panel__history-inline .tab-panel__summary-note {
          font-size: var(--gi-font-xxs);
          line-height: 1.18;
          margin-top: 1px;
        }

        .tab-panel__decision-strip--overview {
          margin-top: 2px;
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 22px 28px;
          padding: 4px 4px 8px;
        }

        .tab-panel__decision-strip--overview .gi-pill {
          width: 100%;
          min-width: 0;
          background: transparent;
          border: none;
          padding: 0;
          min-height: 0;
        }

        .tab-panel__decision-strip--overview .gi-pill__icon {
          display: none;
        }

        .tab-panel__decision-strip--overview .gi-pill__label {
          margin-bottom: 5px;
        }

        .tab-panel__decision-strip--overview .gi-pill__value {
          font-size: var(--gi-font-lg);
          color: var(--primary-text-color);
        }

        .tab-panel__history-foldout-preview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 8px;
          margin-top: 2px;
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-list {
          display: contents;
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-row {
          padding: 10px 11px 11px;
          border: 1px solid color-mix(in srgb, var(--gi-surface-border) 84%, transparent);
          border-radius: 16px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 98%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 93%, black) 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-label {
          font-size: var(--gi-font-xxs);
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-value {
          font-size: var(--gi-font-sm);
          line-height: 1.15;
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-note {
          font-size: var(--gi-font-xxs);
          line-height: 1.28;
        }

        .tab-panel__section-title {
          font-size: var(--gi-label-size);
          text-transform: uppercase;
          letter-spacing: var(--gi-label-spacing);
          line-height: 1.15;
        }

        .tab-panel__header-hint {
          margin-top: 4px;
          color: var(--secondary-text-color);
          font-size: var(--gi-font-xs);
          line-height: var(--gi-body-line);
        }

        .tab-panel__section-summary {
          font-size: var(--gi-font-md);
          font-weight: 750;
          line-height: 1.28;
          letter-spacing: -0.01em;
        }

        .tab-panel__summary-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          min-width: 0;
        }

        .tab-panel__summary-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          width: 100%;
          min-width: 0;
          padding: 12px 0;
          border: 0;
          border-top: 1px solid color-mix(in srgb, var(--gi-surface-border) 82%, transparent);
          background: transparent;
          text-align: left;
          box-sizing: border-box;
          --tab-panel-summary-value-color: var(--primary-text-color);
        }

        .tab-panel__summary-row:first-child {
          padding-top: 0;
          border-top: 0;
        }

        .tab-panel__summary-row--action {
          cursor: pointer;
          font: inherit;
          color: inherit;
          appearance: none;
          -webkit-appearance: none;
          border-radius: 14px;
        }

        .tab-panel__summary-row--action:hover {
          background: color-mix(in srgb, var(--gazon-card-accent) 6%, transparent);
        }

        .tab-panel__summary-row--action:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 28%, transparent);
          border-radius: 14px;
        }

        .tab-panel__summary-row--success {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--warning {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-warning-color, #f2c94c) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--danger {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-danger-color, #f15f69) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--accent {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-accent-tone-color, #6fb3ff) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--neutral {
          --tab-panel-summary-value-color: var(--primary-text-color);
        }

        .tab-panel__summary-label {
          font-size: var(--gi-label-size);
          text-transform: uppercase;
          letter-spacing: var(--gi-label-spacing);
          color: var(--secondary-text-color);
          line-height: 1.15;
        }

        .tab-panel__summary-value {
          min-width: 0;
          font-size: var(--gi-font-md);
          font-weight: 800;
          line-height: 1.22;
          letter-spacing: -0.01em;
          color: var(--tab-panel-summary-value-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__summary-note {
          min-width: 0;
          font-size: var(--gi-font-xs);
          line-height: var(--gi-body-line);
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .tab-panel__field-label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--secondary-text-color);
        }

        .tab-panel__workflow {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
        }

        .tab-panel__workflow-step {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          padding: 6px 10px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 10%, var(--gi-surface-border));
          border-radius: 14px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 7%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 97%, black) 100%);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
          color: var(--secondary-text-color);
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .tab-panel__workflow-step--active {
          color: var(--primary-text-color);
          border-color: var(--gi-surface-border-strong);
        }

        .tab-panel__workflow-step--done {
          color: var(--primary-text-color);
          border-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 30%, var(--gi-surface-border-strong));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 9%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 96%, black) 100%);
        }

        .tab-panel__workflow-index {
          display: inline-grid;
          place-items: center;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          color: var(--primary-text-color);
          font-size: 10px;
          font-weight: 900;
          flex: none;
        }

        .tab-panel__workflow-connector {
          flex: 1 1 auto;
          height: 1px;
          border-radius: 999px;
          background: linear-gradient(90deg, color-mix(in srgb, var(--gazon-section-accent) 22%, transparent), color-mix(in srgb, var(--gazon-section-accent) 6%, transparent));
          min-width: 12px;
        }

        .tab-panel__workflow-label {
          white-space: nowrap;
        }

        .tab-panel__intervention-workflow {
          gap: 10px;
        }

        .tab-panel__decision-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 2px;
        }

        .tab-panel__intervention-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 12px;
          align-items: stretch;
        }

        .tab-panel__intervention-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
          padding: 14px 15px;
          border-radius: 20px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 96%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, black) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 8px 18px rgba(0, 0, 0, 0.10);
        }

        .tab-panel__intervention-card--picker {
          border-color: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 10% 12%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 7%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__intervention-card--action {
          justify-content: center;
          border-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 8% 12%, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 6%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 3%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 93%, black) 100%);
        }

        .tab-panel__intervention-card .tab-panel__section-head {
          margin-bottom: 0;
        }

        .tab-panel__intervention-card .tab-panel__section-summary {
          font-size: var(--gi-font-sm);
        }

        .tab-panel__intervention-card .tab-panel__section-hint {
          font-size: var(--gi-font-xs);
        }

        .tab-panel__intervention-card--picker .tab-panel__section-summary,
        .tab-panel__intervention-card--picker .tab-panel__section-hint {
          color: color-mix(in srgb, var(--primary-text-color) 88%, var(--gazon-water-color, #44c8ea));
        }

        .tab-panel__intervention-card--action .tab-panel__section-summary,
        .tab-panel__intervention-card--action .tab-panel__section-hint {
          color: color-mix(in srgb, var(--primary-text-color) 88%, var(--gazon-success-color, #4fc38c));
        }

        .tab-panel__intervention-card--picker .tab-panel__section-meta {
          color: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 42%, var(--secondary-text-color));
        }

        .tab-panel__intervention-card--action .tab-panel__section-meta {
          color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 42%, var(--secondary-text-color));
        }

        .tab-panel__temperature-constraint {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 8px 10px;
          margin-top: 4px;
          padding: 12px 14px;
          border: 1px solid var(--gi-surface-border);
          border-radius: 18px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 96%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, black) 100%);
        }

        .tab-panel__temperature-constraint--success {
          border-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 12% 50%, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 6%, transparent) 0%, transparent 20%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 95%, black) 100%);
        }

        .tab-panel__temperature-constraint--warning {
          border-color: color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 12% 50%, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 6%, transparent) 0%, transparent 20%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 95%, black) 100%);
        }

        .tab-panel__temperature-constraint--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color, #e16b73) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 12% 50%, color-mix(in srgb, var(--gazon-danger-color, #e16b73) 6%, transparent) 0%, transparent 20%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-danger-color, #e16b73) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 95%, black) 100%);
        }

        .tab-panel__temperature-copy {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1 1 220px;
        }

        .tab-panel__temperature-detail {
          font-size: var(--gi-font-xs);
          line-height: 1.35;
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__temperature-hint {
          font-size: var(--gi-font-xxs);
          line-height: 1.32;
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__intervention-card--action .tab-panel__cta {
          width: 100%;
          min-height: 76px;
          border-radius: 14px;
        }

        .tab-panel__select-shell {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 0;
          border: 1px solid color-mix(in srgb, var(--gazon-water-color, #44c8ea) 16%, var(--gi-surface-border-strong));
          border-radius: 16px;
          padding: 7px 12px 7px 10px;
          background:
            radial-gradient(circle at 18% 50%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 7%, transparent) 0%, transparent 16%),
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 97%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, black) 100%);
          box-shadow: var(--gi-surface-shadow);
          gap: 10px;
          min-height: 52px;
        }

        .tab-panel__select-prefix {
          display: inline-grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 12%, transparent);
          color: var(--primary-text-color);
          flex: none;
        }

        .tab-panel__select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 100%;
          min-width: 0;
          min-height: 32px;
          border: 0;
          border-radius: 0;
          padding: 4px 34px 4px 0;
          background: transparent;
          color: var(--primary-text-color);
          box-shadow: none;
          font: inherit;
          font-size: var(--gi-font-sm);
          font-weight: 700;
          line-height: 1.2;
          cursor: pointer;
          outline: none;
        }

        .tab-panel__select:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .tab-panel__select:focus-visible {
          border-color: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 42%, var(--gi-surface-border-strong));
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 24%, transparent),
            var(--gi-surface-shadow-strong);
        }

        .tab-panel__intervention-card--action .tab-panel__cta {
          letter-spacing: 0.015em;
        }

        .tab-panel__select-chevron {
          position: absolute;
          inset-inline-end: 12px;
          pointer-events: none;
          color: var(--secondary-text-color);
          opacity: 0.88;
        }

        .tab-panel__section--intervention-picker,
        .tab-panel__section--application-history {
          gap: 10px;
        }

        .tab-panel__debug-foldout[open] {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 16%, var(--divider-color));
        }

        .tab-panel__debug-foldout-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 14px;
          cursor: pointer;
          list-style: none;
          user-select: none;
        }

        .tab-panel__debug-foldout-summary::-webkit-details-marker {
          display: none;
        }

        .tab-panel__debug-foldout-meta {
          min-width: 0;
          text-align: right;
          font-size: var(--gi-font-xs);
          line-height: 1.3;
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__debug-foldout-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0 14px 14px;
        }

        .tab-panel__grid {
          display: grid;
          grid-template-columns: var(--gi-grid-template);
          gap: var(--gi-grid-gap);
          align-items: stretch;
          grid-auto-rows: 1fr;
          align-content: start;
        }

        .tab-panel__grid--priority,
        .tab-panel__grid--featured,
        .tab-panel__grid--decision-board {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-flow: dense;
        }

        .tab-panel__grid--priority > *,
        .tab-panel__grid--featured > *,
        .tab-panel__grid--decision-board > * {
          min-width: 0;
        }

        .tab-panel__grid--priority > *:first-child,
        .tab-panel__grid--featured > *:first-child,
        .tab-panel__grid--decision-board > *:first-child {
          grid-column: 1 / -1;
        }

        .tab-panel__grid--priority > *:first-child .gi-card-core,
        .tab-panel__grid--featured > *:first-child .gi-card-core,
        .tab-panel__grid--decision-board > *:first-child .gi-card-core {
          min-height: 106px;
        }

        .tab-panel__grid--priority > *:first-child .gi-card-core__value,
        .tab-panel__grid--featured > *:first-child .gi-card-core__value,
        .tab-panel__grid--decision-board > *:first-child .gi-card-core__value {
          font-size: var(--gi-font-xl);
        }

        .tab-panel__facts-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--gi-space-3);
          align-items: stretch;
        }

        .tab-panel__facts-grid > * {
          min-width: 0;
        }

        .tab-panel__facts-grid .gi-card-core {
          min-height: 92px;
        }

        .tab-panel__facts-grid--overview .gi-card-core,
        .tab-panel__facts-grid--watering .gi-card-core,
        .tab-panel__facts-grid--mowing .gi-card-core {
          min-height: 96px;
        }

        .tab-panel__metric-rail {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .tab-panel__metric-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-width: 0;
          padding: 12px 14px;
          border: 1px solid color-mix(in srgb, var(--gi-surface-border) 88%, transparent);
          border-radius: 18px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 98%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 6px 16px rgba(0,0,0,0.06);
          text-align: left;
          box-sizing: border-box;
        }

        button.tab-panel__metric-row {
          cursor: pointer;
          font: inherit;
          color: inherit;
          appearance: none;
          -webkit-appearance: none;
        }

        button.tab-panel__metric-row:hover {
          transform: translateY(-1px);
          border-color: var(--gi-surface-border-strong);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 10px 22px rgba(0,0,0,0.10);
        }

        button.tab-panel__metric-row:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 24%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 8px 18px rgba(0,0,0,0.08);
        }

        .tab-panel__metric-row--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 24%, var(--gi-surface-border));
        }

        .tab-panel__metric-row--warning {
          border-color: color-mix(in srgb, var(--gazon-warning-color) 24%, var(--gi-surface-border));
        }

        .tab-panel__metric-row--success {
          border-color: color-mix(in srgb, var(--gazon-success-color) 24%, var(--gi-surface-border));
        }

        .tab-panel__metric-row--accent {
          border-color: color-mix(in srgb, var(--gazon-accent-tone-color) 24%, var(--gi-surface-border));
        }

        .tab-panel__metric-rail--mowing .tab-panel__metric-row,
        .tab-panel__metric-rail--gazon .tab-panel__metric-row {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 28%, var(--gi-surface-border));
          background:
            radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 22%),
            radial-gradient(circle at 10% 82%, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 8%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 7%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__metric-rail--mowing .tab-panel__metric-row--success,
        .tab-panel__metric-rail--gazon .tab-panel__metric-row--success {
          background:
            radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 16%, transparent) 0%, transparent 22%),
            radial-gradient(circle at 10% 82%, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 9%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__metric-rail--mowing .tab-panel__metric-row--warning,
        .tab-panel__metric-rail--gazon .tab-panel__metric-row--warning {
          background:
            radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 16%, transparent) 0%, transparent 22%),
            radial-gradient(circle at 10% 82%, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 9%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__metric-rail--mowing .tab-panel__metric-row--danger,
        .tab-panel__metric-rail--gazon .tab-panel__metric-row--danger,
        .tab-panel__metric-rail--mowing .tab-panel__metric-row--critical,
        .tab-panel__metric-rail--gazon .tab-panel__metric-row--critical {
          background:
            radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--gazon-danger-color, #f15f69) 14%, transparent) 0%, transparent 22%),
            radial-gradient(circle at 10% 82%, color-mix(in srgb, var(--gazon-section-accent) 8%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-danger-color, #f15f69) 8%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__metric-rail--mowing .tab-panel__metric-row--accent,
        .tab-panel__metric-rail--gazon .tab-panel__metric-row--accent {
          background:
            radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--gazon-accent-tone-color, #44c8ea) 16%, transparent) 0%, transparent 22%),
            radial-gradient(circle at 10% 82%, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-accent-tone-color, #44c8ea) 9%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__metric-rail--mowing .tab-panel__metric-row--neutral,
        .tab-panel__metric-rail--gazon .tab-panel__metric-row--neutral {
          background:
            radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--gazon-section-accent) 14%, transparent) 0%, transparent 22%),
            radial-gradient(circle at 10% 82%, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 10%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 8%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__metric-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tab-panel__metric-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          min-width: 0;
        }

        .tab-panel__metric-label {
          font-size: var(--gi-label-size);
          text-transform: uppercase;
          letter-spacing: var(--gi-label-spacing);
          color: var(--secondary-text-color);
          line-height: 1.14;
          flex: 0 1 auto;
          min-width: 0;
        }

        .tab-panel__metric-value {
          font-size: var(--gi-font-md);
          font-weight: 800;
          line-height: 1.18;
          color: var(--primary-text-color);
          text-align: right;
          flex: 0 1 auto;
          min-width: 0;
          white-space: normal;
          overflow-wrap: anywhere;
        }

        .tab-panel__metric-note {
          font-size: var(--gi-font-xs);
          line-height: var(--gi-body-line);
          color: var(--secondary-text-color);
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .tab-panel__metric-icon {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          color: color-mix(in srgb, var(--gazon-section-accent) 72%, var(--primary-text-color));
          opacity: 0.92;
        }

        .tab-panel__grid--config {
          grid-template-columns: var(--gi-grid-template);
          gap: var(--gi-grid-gap);
        }

        .tab-panel__grid--products {
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .tab-panel__catalogue-slider {
          min-width: 0;
        }

        .tab-panel__card-slider {
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 2px;
          scrollbar-width: thin;
          scrollbar-color: color-mix(in srgb, var(--gazon-section-accent) 24%, transparent) transparent;
        }

        .tab-panel__card-slider::-webkit-scrollbar {
          height: 7px;
        }

        .tab-panel__card-slider::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: color-mix(in srgb, var(--gazon-section-accent) 22%, transparent);
        }

        .tab-panel__card-slider-track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(220px, 1fr);
          gap: 10px;
          align-items: stretch;
        }

        .tab-panel__card-slider-item {
          min-width: 0;
        }

        .tab-panel__card-slider-item > * {
          height: 100%;
        }

        .tab-panel__card-slider--catalogue .tab-panel__card-slider-track {
          grid-auto-columns: minmax(240px, 280px);
        }

        .tab-panel__card-slider--config .tab-panel__card-slider-track {
          grid-auto-columns: minmax(260px, 320px);
        }

        .tab-panel__card-slider--config .gi-card-core--stat {
          min-height: 96px;
          padding: 12px 14px;
        }

        .tab-panel__card-slider--config .gi-card-core__label {
          -webkit-line-clamp: 1;
        }

        .tab-panel__card-slider--config .gi-card-core__value {
          font-size: var(--gi-font-lg);
          -webkit-line-clamp: 3;
        }

        .tab-panel__card-slider--config .gi-card-core__secondary {
          -webkit-line-clamp: 2;
        }

        .tab-panel__products-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
          gap: 12px;
          align-items: start;
        }

        .tab-panel__products-layout > .tab-panel__section {
          min-width: 0;
        }

        .tab-panel__products-layout .tab-panel__section--products-scope {
          grid-column: 1 / -1;
        }

        .tab-panel--products .tab-panel__hero {
          position: relative;
          overflow: hidden;
        }

        .tab-panel--products .tab-panel__hero::after {
          content: "";
          position: absolute;
          inset-inline: 0;
          inset-block-end: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 45%, transparent), transparent);
          pointer-events: none;
        }

        .tab-panel--products .tab-panel__hero-next {
          max-width: 58ch;
        }

        .tab-panel--products .tab-panel__hero-hint {
          max-width: 66ch;
        }

        .tab-panel--products .tab-panel__section--catalogue-reference {
          gap: 8px;
        }

        .tab-panel--products .tab-panel__grid--products {
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        }

        .tab-panel--products .tab-panel__section--catalogue-reference .tab-panel__section-summary,
        .tab-panel--products .tab-panel__section--application-history .tab-panel__section-summary {
          font-size: var(--gi-font-md);
          line-height: 1.16;
        }

        .tab-panel--products .tab-panel__section--catalogue-reference .tab-panel__section-hint,
        .tab-panel--products .tab-panel__section--application-history .tab-panel__section-hint {
          font-size: var(--gi-font-xs);
          line-height: 1.24;
        }

        .tab-panel--products .tab-panel__section--catalogue-reference .tab-panel__section-head,
        .tab-panel--products .tab-panel__section--application-history .tab-panel__section-head {
          margin-bottom: 2px;
        }

        .tab-panel__grid--featured {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .tab-panel__grid--config-top,
        .tab-panel__grid--config-debits {
          grid-template-columns: var(--gi-grid-template);
          grid-auto-rows: 1fr;
          align-content: start;
        }

        .tab-panel__grid--config-top {
          gap: var(--gi-grid-gap);
        }

        .tab-panel__grid--config-debits {
          gap: var(--gi-grid-gap);
        }

        .tab-panel__section--config-debits {
          gap: 10px;
        }

        .tab-panel__section--config-quick {
          gap: 10px;
        }

        .tab-panel--config .tab-panel__section {
          background:
            radial-gradient(circle at 84% 6%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 10%, transparent) 0%, transparent 26%),
            radial-gradient(circle at 10% 88%, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 8%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 28%, var(--divider-color));
        }

        .tab-panel--config .tab-panel__section-head,
        .tab-panel--config .tab-panel__header {
          border-bottom-color: color-mix(in srgb, var(--gazon-section-accent) 18%, transparent);
        }

        .tab-panel--config .tab-panel__section-title {
          color: color-mix(in srgb, var(--primary-text-color) 84%, var(--gazon-section-accent));
        }

        .tab-panel__section--products {
          gap: 6px;
        }

        .tab-panel__section--products .gi-card-core--stat {
          min-height: 58px;
        }

        .tab-panel__section--application-history,
        .tab-panel__section--catalogue-reference {
          min-height: 0;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .tab-panel__card-slider-track {
          grid-auto-columns: minmax(210px, 240px);
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core--stat {
          padding: 10px 12px;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core__label {
          font-size: var(--gi-font-xxs);
          line-height: 1.12;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core__value {
          font-size: var(--gi-font-sm);
          line-height: 1.1;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core__secondary {
          font-size: var(--gi-font-xxs);
          line-height: 1.2;
        }

        .tab-panel--intervention .tab-panel__hero {
          position: relative;
          overflow: hidden;
        }

        .tab-panel--intervention .tab-panel__hero::after {
          content: "";
          position: absolute;
          inset-inline: 0;
          inset-block-end: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 24%, transparent), transparent);
          pointer-events: none;
        }

        .tab-panel--intervention .tab-panel__hero-next {
          max-width: 62ch;
        }

        .tab-panel--intervention .tab-panel__hero-hint {
          max-width: 66ch;
        }

        .tab-panel--intervention .tab-panel__decision-strip {
          padding: 10px 12px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          border-radius: 18px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 2%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, white) 100%);
        }

        .tab-panel--intervention .tab-panel__intervention-layout {
          gap: 14px;
        }

        .tab-panel__intervention-layout--workflow {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .tab-panel__intervention-layout--workflow .tab-panel__intervention-card--proposed {
          grid-column: 1 / -1;
        }

        .tab-panel__intervention-card--proposed {
          border-color: color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 8% 14%, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 6%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 3%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__intervention-card--proposed .tab-panel__section-summary,
        .tab-panel__intervention-card--proposed .tab-panel__section-hint {
          color: color-mix(in srgb, var(--primary-text-color) 90%, var(--gazon-warning-color, #d6a34f));
        }

        .tab-panel__intervention-card--proposed .tab-panel__section-meta {
          color: color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 42%, var(--secondary-text-color));
        }

        .tab-panel__chips {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          align-content: flex-start;
          gap: 8px;
          margin-top: 2px;
        }

        .tab-progress {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tab-panel__watering-zone {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          max-width: 100%;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: var(--gi-font-sm);
          font-weight: 700;
          line-height: 1.2;
          color: color-mix(in srgb, var(--primary-text-color) 92%, var(--gazon-water-color, #44c8ea));
          background: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--gazon-water-color, #44c8ea) 22%, transparent);
          box-shadow: inset 0 1px 0 color-mix(in srgb, white 32%, transparent);
          overflow-wrap: anywhere;
        }

        .tab-progress__bar,
        .gi-progress {
          height: 9px;
          border-radius: 999px;
          overflow: hidden;
          background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
        }

        .tab-progress__bar span,
        .gi-progress__bar {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 88%, white), var(--gazon-section-accent), color-mix(in srgb, var(--gazon-lawn-color, #80da67) 90%, white));
          transition:
            width var(--gi-motion-medium) var(--gi-ease-soft),
            background var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
          box-shadow: 0 0 12px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 18%, transparent);
        }

        .tab-panel--gazon .tab-progress {
          padding: 8px 10px 10px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 26%, var(--gi-surface-border));
          border-radius: 18px;
          background:
            radial-gradient(circle at 88% 14%, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 10%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 97%, black) 100%);
        }

        .tab-panel--gazon .tab-progress__bar,
        .tab-panel--gazon .gi-progress {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 7%, #f7f9f3) 0%, color-mix(in srgb, #f1f5ea 92%, var(--gazon-lawn-color, #80da67) 8%) 100%);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 16%, transparent);
          box-shadow: inset 0 1px 2px rgba(80, 104, 62, 0.05);
        }

        .tab-panel--gazon .tab-progress__meta {
          color: color-mix(in srgb, #000000 64%, var(--secondary-text-color));
        }

        .gi-progress__bar--critical {
          background: linear-gradient(90deg, color-mix(in srgb, #ff5a5f 70%, white), #ff5a5f);
          box-shadow: 0 0 12px rgba(255, 90, 95, 0.28);
        }

        .tab-progress__meta {
          font-size: var(--gi-font-xs);
          color: var(--secondary-text-color);
        }

        .tab-panel__section--hydric {
          gap: 12px;
        }

        .tab-panel__hydric-hero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 22%, var(--gi-surface-border));
          background:
            radial-gradient(circle at 84% 10%, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 10%, transparent) 0%, transparent 28%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 7%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 97%, black) 100%);
          box-shadow: inset 0 1px 0 color-mix(in srgb, white 28%, transparent);
        }

        .tab-panel__hydric-hero--success {
          border-color: color-mix(in srgb, var(--gazon-success-color, #8fb56b) 28%, var(--gi-surface-border));
        }

        .tab-panel__hydric-hero--warning {
          border-color: color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 28%, var(--gi-surface-border));
        }

        .tab-panel__hydric-hero--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color, #d76b73) 28%, var(--gi-surface-border));
        }

        .tab-panel__hydric-hero--critical {
          border-color: color-mix(in srgb, var(--gazon-critical-color, #d94f57) 34%, var(--gi-surface-border));
        }

        .tab-panel__hydric-hero-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .tab-panel__hydric-hero-label {
          font-size: var(--gi-font-xs);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: color-mix(in srgb, var(--secondary-text-color) 78%, var(--primary-text-color));
        }

        .tab-panel__hydric-hero-value {
          font-size: clamp(1.38rem, 4.3vw, 2.18rem);
          line-height: 1.02;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--primary-text-color);
          word-break: break-word;
        }

        .tab-panel__hydric-hero-note {
          font-size: var(--gi-font-xs);
          line-height: 1.32;
          color: var(--secondary-text-color);
        }

        .tab-panel__hydric-hero-badge {
          flex: 0 0 auto;
          align-self: flex-start;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: var(--gi-font-xs);
          font-weight: 800;
          line-height: 1;
          color: color-mix(in srgb, var(--primary-text-color) 90%, var(--gazon-section-accent));
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 20%, transparent);
        }

        .tab-panel__hydric-meter {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-inline: 2px;
        }

        .tab-panel__hydric-meter-bar {
          position: relative;
          height: 12px;
          overflow: hidden;
          border-radius: 999px;
          background: color-mix(in srgb, var(--secondary-text-color) 11%, transparent);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 16%, transparent);
          box-shadow: inset 0 1px 2px rgba(80, 104, 62, 0.05);
        }

        .tab-panel__hydric-meter-bar-useful,
        .tab-panel__hydric-meter-bar-surplus,
        .tab-panel__hydric-meter-bar-cap {
          position: absolute;
          inset-block: 0;
          display: block;
          border-radius: inherit;
        }

        .tab-panel__hydric-meter-bar-useful {
          inset-inline-start: 0;
          background: linear-gradient(90deg, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 68%, white), color-mix(in srgb, var(--gazon-section-accent) 82%, white));
          box-shadow: 0 0 10px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 18%, transparent);
        }

        .tab-panel__hydric-meter-bar-surplus {
          background: linear-gradient(90deg, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 84%, white), color-mix(in srgb, var(--gazon-lawn-color, #80da67) 58%, var(--gazon-water-color, #44c8ea)));
          opacity: 0.82;
        }

        .tab-panel__hydric-meter-bar-cap {
          inset-inline-start: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 100%);
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .tab-panel__hydric-meter-meta {
          font-size: var(--gi-font-xs);
          line-height: 1.25;
          color: var(--secondary-text-color);
        }

        .tab-panel__metric-rail--watering-hydric .tab-panel__metric-row {
          min-height: 76px;
        }

        .tab-panel__metric-rail--watering-hydric .tab-panel__metric-value {
          font-size: calc(var(--gi-font-sm) * 1.05);
        }

        .tab-panel__metric-rail--watering-hydric .tab-panel__metric-note {
          font-size: var(--gi-font-xs);
        }

        .gi-action--primary {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: var(--gi-action-gap);
          width: var(--gi-action-width);
          min-height: 72px;
          padding-inline: var(--gi-action-padding-inline) var(--gi-action-padding-inline-end);
          padding-block: var(--gi-action-padding-block);
          border: 1px solid var(--gi-surface-border-strong);
          border-radius: 20px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 900;
          font-size: var(--gi-font-lg);
          letter-spacing: 0.01em;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-card-accent) 95%, white) 0%, color-mix(in srgb, var(--gazon-section-accent) 88%, black) 100%);
          box-shadow:
            0 16px 30px rgba(0, 0, 0, 0.18),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent),
            0 0 24px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 16%, transparent);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
          position: relative;
          overflow: hidden;
        }

        .gi-action--primary::after {
          content: "›";
          margin-left: auto;
          font-size: var(--gi-font-2xl);
          line-height: 1;
          opacity: 0.94;
          flex: none;
        }

        .gi-action--primary .gi-icon {
          width: var(--gi-action-icon-size);
          height: var(--gi-action-icon-size);
          border-radius: 999px;
          background: var(--gi-action-icon-bg);
        }

        .gi-action--primary .gi-icon ha-icon {
          width: var(--gi-action-icon-glyph-size);
          height: var(--gi-action-icon-glyph-size);
        }

        .gi-action--primary:disabled {
          cursor: not-allowed;
          color: var(--secondary-text-color);
          text-shadow: none;
          background:
            linear-gradient(
              135deg,
              color-mix(in srgb, var(--card-background-color, #ffffff) 96%, var(--gazon-card-accent) 4%) 0%,
              color-mix(in srgb, var(--card-background-color, #ffffff) 88%, var(--divider-color, #d8dde3) 12%) 100%
            );
          border-color: color-mix(in srgb, var(--divider-color, #d8dde3) 78%, transparent);
          box-shadow: none;
          filter: grayscale(0.15);
          opacity: 0.84;
        }

        .gi-action--primary:disabled .gi-icon {
          background: color-mix(in srgb, var(--divider-color, #d8dde3) 48%, transparent);
        }

        .gi-action--danger {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: var(--gi-action-gap);
          width: var(--gi-action-width);
          min-height: 72px;
          padding-inline: var(--gi-action-padding-inline) var(--gi-action-padding-inline-end);
          padding-block: var(--gi-action-padding-block);
          border: 1px solid color-mix(in srgb, var(--gazon-danger-color, #f15f69) 54%, var(--gi-surface-border-strong));
          border-radius: 20px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 900;
          font-size: var(--gi-font-lg);
          letter-spacing: 0.01em;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-danger-color, #f15f69) 97%, white) 0%, color-mix(in srgb, var(--gazon-danger-color, #c62828) 86%, black) 100%);
          box-shadow:
            0 16px 30px rgba(0, 0, 0, 0.18),
            0 0 0 1px color-mix(in srgb, var(--gazon-danger-color, #f15f69) 18%, transparent),
            0 0 24px color-mix(in srgb, var(--gazon-danger-color, #f15f69) 14%, transparent);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
          position: relative;
          overflow: hidden;
        }

        .gi-action--danger::after {
          content: "›";
          margin-left: auto;
          font-size: var(--gi-font-2xl);
          line-height: 1;
          opacity: 0.94;
          flex: none;
        }

        .gi-action--danger .gi-icon {
          width: var(--gi-action-icon-size);
          height: var(--gi-action-icon-size);
          border-radius: 999px;
          background: var(--gi-action-icon-bg);
        }

        .gi-action--danger .gi-icon ha-icon {
          width: var(--gi-action-icon-glyph-size);
          height: var(--gi-action-icon-glyph-size);
        }

        .gi-action--danger:disabled {
          cursor: not-allowed;
          opacity: 0.62;
          filter: grayscale(0.2);
          box-shadow: none;
        }

        @media (hover: hover) {
          .gi-action--primary:hover {
              border-color: color-mix(in srgb, var(--gazon-card-accent) 52%, var(--divider-color));
            box-shadow:
              0 18px 34px rgba(0, 0, 0, 0.22),
              0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent);
          }
          .gi-action--danger:hover:not(:disabled) {
            border-color: color-mix(in srgb, var(--gazon-danger-color, #f15f69) 60%, var(--divider-color));
            box-shadow:
              0 18px 34px rgba(0, 0, 0, 0.22),
              0 0 0 1px color-mix(in srgb, var(--gazon-danger-color, #f15f69) 18%, transparent);
          }
        }

        .gi-action {
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .gi-config-action {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          text-align: inherit;
        }

        .gi-config-action .gi-card-core {
          width: 100%;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 24%, var(--divider-color));
          background:
            radial-gradient(circle at 85% 10%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 9%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 9%, transparent) 0%, transparent 100%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 96%, white) 100%);
        }

        @media (hover: hover) {
          .gi-config-action:hover .gi-card-core {
              box-shadow: var(--gi-surface-shadow-strong);
          }
        }

        .gi-config-action:focus-visible {
          outline: none;
        }

        .gi-config-action:focus-visible .gi-card-core {
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 38%, transparent),
            var(--gi-surface-shadow-strong);
        }

        .gi-overview-action {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          text-align: inherit;
        }

        .gi-overview-action .gi-card-core {
          width: 100%;
        }

        @media (hover: hover) {
          .gi-overview-action:hover .gi-card-core {
              box-shadow: var(--gi-surface-shadow-strong);
          }
        }

        .gi-overview-action:focus-visible {
          outline: none;
        }

        .gi-overview-action:focus-visible .gi-card-core {
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 32%, transparent),
            var(--gi-surface-shadow-strong);
        }

        .gi-action .gi-icon {
          width: 20px;
          height: 20px;
        }

        .gi-info {
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          background:
            radial-gradient(circle at 94% 8%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, white) 100%);
          box-shadow: var(--gi-surface-shadow);
        }

        .gi-info--main {
          border-color: var(--gi-surface-border);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 10%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 9%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, white) 100%);
          box-shadow: var(--gi-surface-shadow-strong);
        }

        .gi-info--secondary {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 6%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 3%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
        }

        .gi-alert--critical {
          animation: gi-pulse 1.8s ease-out infinite;
        }

        .tab-panel__block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tab-panel__block--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 22%, transparent);
        }

        .tab-panel__block--neutral {
          border-color: rgba(127, 127, 127, 0.15);
        }

        .decision-hero,
        .decision-plan,
        .decision-context,
        .decision-block,
        .decision-footer {
          border: 1px solid var(--gi-surface-border);
          border-radius: 22px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 6%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          padding: 14px 16px;
          box-shadow: var(--gi-surface-shadow);
        }

        .decision-hero {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-color: var(--gi-surface-border-strong);
        }

        .decision-hero--pulse {
          animation: gazonPulseSoft 2.8s ease-in-out infinite;
        }

        .decision-hero__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }

        .decision-hero__summary {
          font-size: var(--gi-font-sm);
          text-transform: uppercase;
          letter-spacing: 0.10em;
          font-weight: 800;
          line-height: 1.2;
          min-width: 0;
          overflow-wrap: anywhere;
          color: var(--secondary-text-color);
        }

        .decision-hero__next {
          font-size: var(--gi-font-xl);
          font-weight: 900;
          line-height: 1.18;
          color: var(--primary-text-color);
          letter-spacing: -0.01em;
        }

        .decision-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border-radius: 999px;
          font-size: var(--gi-font-xs);
          font-weight: 700;
          white-space: nowrap;
          background: color-mix(in srgb, var(--gazon-card-accent) 14%, transparent);
          color: var(--primary-text-color);
        }

        .decision-status .gi-icon {
          width: 14px;
          height: 14px;
        }

        .decision-status--danger {
          background: color-mix(in srgb, var(--gazon-danger-color) 14%, transparent);
        }

        .decision-status--warning {
          background: color-mix(in srgb, var(--gazon-warning-color) 16%, transparent);
        }

        .decision-status--success {
          background: color-mix(in srgb, var(--gazon-success-color) 16%, transparent);
        }

        .decision-status--neutral {
          background: color-mix(in srgb, var(--gazon-neutral-color) 12%, transparent);
        }

        .decision-hero__next,
        .decision-hero__hint {
          color: var(--secondary-text-color);
          font-size: var(--gi-font-sm);
          line-height: 1.3;
        }

        .decision-plan__label,
        .decision-context__label,
        .decision-block__label {
          font-size: var(--gi-label-size);
          text-transform: uppercase;
          letter-spacing: var(--gi-label-spacing);
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .decision-plan {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-color: var(--gi-surface-border);
        }

        .decision-plan__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          min-width: 0;
        }

        .decision-plan__meta {
          font-size: var(--gi-font-xs);
          color: var(--secondary-text-color);
          white-space: normal;
          overflow-wrap: anywhere;
          min-width: 0;
          flex: 1 1 320px;
          text-align: left;
        }

        .decision-plan__summary {
          font-size: var(--gi-font-md);
          font-weight: 800;
          line-height: 1.24;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .decision-plan__chips,
        .decision-context__grid {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          align-content: flex-start;
          gap: 8px;
        }

        .gi-pill {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          vertical-align: middle;
          min-height: 28px;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1px solid var(--gi-border);
          background: var(--gi-surface-2);
          min-width: 0;
          box-sizing: border-box;
        }

        .gi-pill--status {
          gap: 8px;
          min-height: 32px;
          padding: 4px 12px 4px 8px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 15%, transparent) 0%, color-mix(in srgb, var(--gazon-card-accent) 7%, transparent) 100%);
          color: var(--primary-text-color);
        }

        .gi-pill--context {
          gap: 8px;
          min-height: 32px;
          padding: 4px 12px 4px 8px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 15%, transparent) 0%, color-mix(in srgb, var(--gazon-card-accent) 7%, transparent) 100%);
          color: var(--primary-text-color);
        }

        .gi-pill__icon {
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          overflow: visible;
          line-height: 0;
          border-radius: 999px;
          background: transparent;
        }

        .gi-pill__icon .gi-icon--pill {
          width: 14px;
          height: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          overflow: visible;
          color: inherit;
          line-height: 0;
        }

        .gi-pill__icon .gi-icon--pill ha-icon {
          display: block;
          width: 14px;
          height: 14px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
          --mdc-icon-size: 14px;
        }

        .gi-pill__content {
          min-width: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 4px;
          line-height: 1.12;
          overflow: hidden;
        }

        .gi-pill--context .gi-pill__content {
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .gi-pill__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          line-height: 1.1;
        }

        .gi-pill__value {
          font-size: var(--gi-font-xs);
          font-weight: var(--gi-weight-medium);
          line-height: 1.12;
          overflow-wrap: anywhere;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gi-pill--danger {
          background: color-mix(in srgb, var(--gi-status-danger) 14%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-danger) 30%, transparent);
          color: var(--gi-status-danger);
        }

        .gi-pill--critical {
          background: color-mix(in srgb, var(--gi-status-danger) 18%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-danger) 38%, transparent);
          color: var(--gi-status-danger);
        }

        .gi-pill--warning {
          background: color-mix(in srgb, var(--gi-status-warning) 14%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-warning) 30%, transparent);
          color: var(--gi-status-warning);
        }

        .gi-pill--success {
          background: color-mix(in srgb, var(--gi-status-success) 14%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-success) 30%, transparent);
          color: var(--gi-status-success);
        }

        .gi-pill--accent {
          background: var(--gi-accent-soft);
          border-color: color-mix(in srgb, var(--gi-accent) 30%, transparent);
          color: var(--gi-accent);
        }

        .gi-pill--neutral {
          background: var(--gi-surface-2);
          border-color: var(--gi-border);
          color: var(--gi-text-muted);
        }

        .decision-context {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tab-panel__section--debug-intervention {
          gap: 12px;
        }

        .tab-panel__debug-foldout {
          margin-top: 12px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          border-radius: 20px;
          overflow: hidden;
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 34%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
          box-shadow: var(--gi-surface-shadow-strong);
        }

        .tab-panel__debug-columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 10px;
        }

        .tab-panel__debug-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 8px;
        }

        .decision-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .decision-block--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 22%, transparent);
        }

        .decision-block__value {
          font-size: var(--gi-font-sm);
          font-weight: 700;
          line-height: 1.32;
          overflow-wrap: anywhere;
        }

        .decision-block__hint {
          color: var(--secondary-text-color);
          font-size: var(--gi-font-sm);
          line-height: 1.3;
        }

        .decision-footer {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .decision-advanced {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 6px;
        }

        .advanced-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 14px;
          border-radius: calc(var(--gazon-border-radius) - 8px);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 16%, var(--divider-color));
          background:
            radial-gradient(circle at 92% 10%, color-mix(in srgb, var(--gi-tab-companion) 12%, transparent) 0%, transparent 28%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 8%, transparent), transparent 36%),
            color-mix(in srgb, var(--card-background-color) 86%, var(--gi-tab-accent) 4%);
        }

        .advanced-group__head {
          display: grid;
          gap: 4px;
        }

        .advanced-group__eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
        }

        .advanced-group__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary-text-color);
        }

        .advanced-group__meta {
          font-size: var(--gi-font-sm);
          line-height: 1.4;
          color: var(--secondary-text-color);
          max-width: 72ch;
        }

        .advanced-group__grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        * {
          box-sizing: border-box;
        }

        .card {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          border-radius: var(--gazon-border-radius);
          color: var(--primary-text-color);
          background: var(--gi-bg, var(--secondary-background-color));
          border: 1px solid var(--gi-border);
          box-shadow: var(--gi-shadow-sm);
          overflow: hidden;
          padding: var(--gazon-card-padding);
          position: relative;
          isolation: isolate;
          container-type: inline-size;
        }

        ha-card {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }

        .card > * {
          position: relative;
          z-index: 1;
        }

        .card[data-background="false"] {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        .card::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 4px;
          background: var(--gi-accent);
          opacity: 0.5;
          z-index: 0;
        }

        .card--gradient::after {
          content: none;
        }

        .card--solid {
          background: transparent;
        }

        .card--glass {
          background: var(--gi-bg, var(--secondary-background-color));
        }

        .card--minimal {
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .card--pulse-critical {
          animation: gazonCriticalPulse 1.8s ease-in-out infinite;
        }

        @keyframes gazonCriticalPulse {
          0% {
            box-shadow:
              0 12px 30px rgba(0, 0, 0, 0.10),
              0 0 0 0 color-mix(in srgb, var(--gazon-critical-color) 0%, transparent),
              0 1px 0 rgba(255, 255, 255, 0.04) inset,
              var(--ha-card-box-shadow, none);
          }
          70% {
            box-shadow:
              0 12px 30px rgba(0, 0, 0, 0.10),
              0 0 0 10px color-mix(in srgb, var(--gazon-critical-color) 18%, transparent),
              0 1px 0 rgba(255, 255, 255, 0.04) inset,
              var(--ha-card-box-shadow, none);
          }
          100% {
            box-shadow:
              0 12px 30px rgba(0, 0, 0, 0.10),
              0 0 0 0 color-mix(in srgb, var(--gazon-critical-color) 0%, transparent),
              0 1px 0 rgba(255, 255, 255, 0.04) inset,
              var(--ha-card-box-shadow, none);
          }
        }

        @keyframes gi-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 90, 95, 0.34);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(255, 90, 95, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 90, 95, 0);
          }
        }

        .header {
          display: flex;
          flex-direction: var(--gi-header-direction);
          justify-content: var(--gi-header-justify);
          align-items: var(--gi-header-align);
          gap: var(--gi-header-gap);
          margin-bottom: var(--gi-header-margin-bottom);
        }

        .header--clickable,
        .hero__lead[data-action-target="primary"] {
          cursor: pointer;
        }

        .card,
        .gi-card,
        .header,
        .gi-action,
        .hero__lead,
        .gi-tab,
        .tab-nav__item,
        .gi-info,
        .gi-pill--status,
        .gi-pill--context,
        .gi-panel,
        .gi-progress__bar {
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard);
        }

        @media (hover: hover) {
          .hero__lead:hover,
          .gi-action:hover,
          .gi-tab:hover,
          .tab-nav__item:hover {
          }

          .tab-panel__hero:hover,
          .tab-panel__section:hover,
          .advanced-group:hover,
          .gi-card-core:hover,
          .hero__lead:hover {
            transform: translateY(-2px);
            box-shadow:
              var(--gi-surface-shadow-strong),
              0 0 0 1px color-mix(in srgb, var(--gi-tab-glow-color) 10%, transparent);
          }
        }

        .header__title-wrap {
          display: flex;
          gap: 10px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }

        .header__meta {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 6px;
          min-width: 0;
          margin-left: auto;
        }

        .header__weather {
          max-width: min(240px, 100%);
          width: 100%;
        }

        .header__weather .gi-pill__value {
          font-size: var(--gi-font-xxs);
          font-weight: 650;
        }

        .header__action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 30px;
          padding: 4px 11px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--gazon-success-color) 26%, var(--divider-color));
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-success-color) 18%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--gazon-water-color) 12%, var(--secondary-background-color)) 100%) !important;
          color: var(--primary-text-color) !important;
          box-shadow:
            0 6px 14px rgba(0, 0, 0, 0.10),
            0 0 0 1px color-mix(in srgb, var(--gazon-success-color) 8%, transparent);
          font-size: var(--gi-font-xxs);
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
          width: auto;
          flex: 0 0 auto;
          width: 100%;
          max-width: 184px;
          overflow: hidden;
          text-shadow: none;
        }

        .header__action .gi-icon {
          width: 11px;
          height: 11px;
          flex: none;
          background: color-mix(in srgb, var(--gazon-success-color) 10%, transparent);
        }

        .header__action::after {
          content: none;
        }

        .header__action span:last-child {
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .card--theme-light .header__action {
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-success-color) 14%, white) 0%, color-mix(in srgb, var(--gazon-water-color) 10%, white) 100%) !important;
          border-color: color-mix(in srgb, var(--gazon-success-color) 24%, var(--divider-color)) !important;
          box-shadow:
            0 6px 14px rgba(0, 0, 0, 0.06),
            0 0 0 1px color-mix(in srgb, var(--gazon-success-color) 10%, transparent);
          color: var(--primary-text-color) !important;
        }

        .card--theme-dark .header__action {
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-success-color) 18%, #141b1a) 0%, color-mix(in srgb, var(--gazon-water-color) 10%, #141b1a) 100%) !important;
          border-color: color-mix(in srgb, var(--gazon-success-color) 20%, rgba(255, 255, 255, 0.10)) !important;
          box-shadow:
            0 6px 14px rgba(0, 0, 0, 0.18),
            0 0 0 1px color-mix(in srgb, var(--gazon-success-color) 10%, transparent);
          color: #f7fff7 !important;
        }

        @media (max-width: 600px) {
          .header__action {
            max-width: 144px;
            padding: 4px 8px;
            font-size: var(--gi-font-xxs);
          }
        }

        .card--theme-light .header__weather {
          background: #ffffff;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(0, 0, 0, 0.08));
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.05);
        }

        .card--theme-dark .header__weather {
          background: #000000;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(255, 255, 255, 0.10));
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
        }

        .header__icon {
          width: calc(var(--gazon-icon-size) * 1.2);
          height: calc(var(--gazon-icon-size) * 1.2);
          border-radius: 999px;
          display: grid;
          place-items: center;
          color: white;
          background: linear-gradient(145deg, color-mix(in srgb, var(--gi-tab-accent) 68%, white), color-mix(in srgb, var(--gi-tab-companion) 72%, var(--gi-tab-mist-color)));
          box-shadow:
            0 8px 18px color-mix(in srgb, var(--gi-tab-glow-color) 18%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
          flex: none;
        }

        .header__icon--warning { background: var(--gazon-warning-color, #7e9a3c); }
        .header__icon--danger { background: var(--gazon-danger-color, #c62828); }
        .header__icon--success { background: var(--gazon-success-color, #4f8f3a); }
        .header__icon--neutral { background: var(--gazon-neutral-color, #607d8b); }
        .header__icon--accent { background: var(--gazon-accent-tone-color, #2b8c7c); }
        .header__icon--critical { background: var(--gazon-critical-color, #ff1744); }

        .header__icon .gi-icon {
          width: 14px;
          height: 14px;
        }

        .header__titles {
          min-width: 0;
        }

        .header__title {
          font-size: var(--gi-font-xl);
          font-weight: 900;
          line-height: 1.14;
          letter-spacing: -0.01em;
        }

        .header__subtitle {
          color: var(--secondary-text-color);
          font-size: var(--gi-font-xs);
          line-height: var(--gi-body-line);
        }

        .header__subtitle::before {
          content: "";
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          margin-right: 6px;
          vertical-align: middle;
          background: var(--gazon-card-tone-color);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--gazon-card-tone-color) 14%, transparent);
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(280px, 1.05fr) minmax(0, 1.5fr);
          min-width: 0;
          gap: var(--gi-hero-gap);
          align-items: stretch;
          margin: var(--gi-hero-margin);
        }

        .hero__lead {
          min-width: 0;
          border-radius: 24px;
          padding: var(--gi-hero-lead-padding);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 26%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gi-tab-companion) 7%, transparent) 0%, transparent 26%),
            linear-gradient(135deg, color-mix(in srgb, var(--gi-tab-accent) 8%, transparent) 0%, color-mix(in srgb, var(--gi-tab-companion) 6%, transparent) 100%),
            color-mix(in srgb, var(--secondary-background-color) 76%, transparent);
          box-shadow:
            0 8px 18px rgba(0, 0, 0, 0.12),
            0 0 0 1px color-mix(in srgb, var(--gi-tab-accent) 6%, transparent);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--gi-hero-lead-gap);
          flex: 1 1 260px;
        }

        .hero__metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          min-width: 0;
          gap: var(--gi-hero-metrics-gap);
          align-content: start;
        }

        .hero__metrics .gi-card-core {
          min-height: 88px;
        }

        .hero__metrics .gi-card-core:first-child {
          grid-column: 1 / -1;
          min-height: 108px;
        }

        .hero__lead-icon {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          flex: none;
          color: var(--gazon-section-accent);
          background: color-mix(in srgb, var(--gazon-section-accent) 20%, transparent);
        }

        .hero__lead-icon .gi-icon {
          width: 12px;
          height: 12px;
        }

        .hero__label {
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          font-weight: 800;
          color: var(--secondary-text-color);
          margin-bottom: 6px;
        }

        .hero__value {
          font-size: var(--gi-font-lg);
          font-weight: 900;
          line-height: 1.18;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hero__lead--danger {
          color: var(--gazon-danger-color, #c62828);
        }

        .lead--empty {
          color: var(--secondary-text-color);
          font-weight: 500;
        }

        .lead--danger {
          color: var(--gazon-danger-color, #c62828);
        }

        .decision-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          gap: 8px;
          margin: 4px 0 10px;
        }

        .decision {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1 1 150px;
          border-radius: 18px;
          padding: 11px 12px;
          border: 1px solid rgba(127, 127, 127, 0.15);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 92%, white) 0%, var(--secondary-background-color) 100%);
          box-shadow: none;
        }

        .decision--action {
          border-color: color-mix(in srgb, var(--gazon-success-color) 20%, transparent);
        }

        .decision--avoid {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 18%, transparent);
        }

        .decision__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .decision__value {
          font-weight: 600;
          line-height: 1.28;
        }

        .tiles {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          min-width: 0;
          gap: var(--gi-tiles-gap);
          margin-top: 4px;
        }

        .gi-card-core {
          display: flex;
          align-items: stretch;
          gap: var(--gi-card-core-gap);
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          border-radius: var(--gi-card-core-radius);
          min-height: var(--gi-card-core-min-height);
          height: 100%;
          padding: var(--gi-card-core-padding);
          position: relative;
          border: 1px solid var(--gi-border);
          background: var(--gi-surface);
          box-shadow: none;
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        /* Synthèse : pas de boîtes imbriquées — hero & sections coulent sur la carte */
        .tab-panel--overview .tab-panel__hero,
        .tab-panel--overview .tab-panel__section,
        .tab-panel--overview .tab-panel__block {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        .gi-card-core--stat,
        .gi-card-core--tile,
        .gi-card-core--metric {
          min-height: 80px;
        }

        .gi-card-core--metric {
          min-height: 76px;
          padding: 12px 13px;
        }

        .gi-card-core--interactive {
          padding-right: 42px;
        }

        .gi-card-core--tile {
          border: 1px solid var(--gi-border);
          background: var(--gi-surface);
        }

        .gi-card-core__icon {
          width: var(--gi-card-core-icon-size);
          height: var(--gi-card-core-icon-size);
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          flex: none;
          overflow: visible;
          line-height: 0;
          background: var(--gi-accent-soft);
          color: var(--gi-accent);
        }

        .gi-card-core--tile .gi-card-core__icon {
          background: color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 12%, transparent);
          color: var(--gazon-tile-accent, var(--gazon-section-accent));
        }

        .gi-card-core__icon .gi-icon {
          width: var(--gi-card-core-icon-glyph-size);
          height: var(--gi-card-core-icon-glyph-size);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          transform: none;
          line-height: 0;
        }

        .gi-card-core__icon .gi-icon ha-icon {
          width: var(--gi-card-core-icon-glyph-size);
          height: var(--gi-card-core-icon-glyph-size);
          display: block;
          margin: 0;
          transform: none;
        }

        .gi-card-core--metric .gi-card-core__icon {
          width: 18px;
          height: 18px;
          align-self: center;
        }

        .gi-card-core--metric .gi-card-core__icon .gi-icon {
          width: 11px;
          height: 11px;
          transform: none;
        }

        .gi-card-core--metric .gi-card-core__icon .gi-icon ha-icon {
          width: 11px;
          height: 11px;
          transform: none;
        }

        .tiles .gi-card-core {
          flex: 1 1 118px;
        }

        .gi-card-core__icon--empty {
          background: transparent;
        }

        .gi-card-core__content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          overflow: hidden;
        }

        .gi-card-core__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--secondary-text-color);
          line-height: 1.1;
          min-height: 1.1em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .gi-card-core__value {
          font-weight: var(--gi-weight-medium);
          min-width: 0;
          overflow-wrap: break-word;
          word-break: normal;
          hyphens: auto;
          font-size: var(--gi-font-md);
          line-height: 1.18;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .gi-card-core--metric .gi-card-core__value {
          order: 1;
          font-size: clamp(1.18rem, 1.08rem + 0.44vw, 1.42rem);
          line-height: 1.02;
          font-weight: var(--gi-weight-medium);
        }

        .gi-card-core--metric .gi-card-core__label {
          order: 2;
          margin-top: 2px;
        }

        .gi-card-core--metric .gi-card-core__secondary {
          order: 3;
        }

        .gi-card-core--metric .gi-card-core__content {
          gap: 1px;
        }

        .gi-card-core--success .gi-card-core__value {
          color: var(--gazon-success-color, #4fc38c);
        }

        .gi-card-core--warning .gi-card-core__value {
          color: var(--gazon-warning-color, #d6a34f);
        }

        .gi-card-core--danger .gi-card-core__value {
          color: var(--gazon-danger-color, #f15f69);
        }

        .gi-card-core--accent .gi-card-core__value {
          color: var(--gazon-accent-tone-color, #31b8d4);
        }

        .gi-card-core--critical .gi-card-core__value {
          color: var(--gazon-critical-color, #ff5a5f);
        }

        .gi-card-core--neutral .gi-card-core__value {
          color: var(--primary-text-color);
        }

        .gi-card-core__secondary {
          font-size: var(--gi-font-xs);
          line-height: 1.3;
          color: var(--secondary-text-color);
          min-height: 1.15em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .gi-card-core__secondary--empty {
          visibility: hidden;
        }

        .gi-card-core__affordance {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          color: color-mix(in srgb, var(--gazon-section-accent) 90%, var(--secondary-text-color));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
          opacity: 0.9;
          pointer-events: none;
        }

        .gi-card-core--interactive:hover .gi-card-core__affordance {
          background: color-mix(in srgb, var(--gazon-section-accent) 16%, transparent);
          opacity: 1;
        }

        .footer {
          margin-top: 8px;
          color: var(--secondary-text-color);
          font-size: var(--gi-font-xs);
        }

        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
          border: 1px dashed var(--divider-color);
          border-radius: 16px;
        }

        .card--editor-preview .gi-panel,
        .card--editor-preview .gi-tab,
        .card--editor-preview .gi-pill--status,
        .card--editor-preview .gi-pill--context,
        .card--editor-preview .gi-action,
        .card--editor-preview .gi-info,
        .card--editor-preview .gi-progress__bar {
          animation: none !important;
        }

        .card--editor-preview {
          box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.16),
            0 0 0 1px color-mix(in srgb, var(--gazon-section-accent) 16%, transparent),
            var(--ha-card-box-shadow, none);
        }

        .card--theme-light {
          --gi-theme-base: #ffffff;
          --gi-theme-base-strong: #ffffff;
          --gi-theme-base-soft: #fbfcf8;
          --gi-theme-border-override: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(0, 0, 0, 0.10));
          --gi-theme-shadow-override: 0 10px 24px rgba(28, 38, 28, 0.08);
        }

        .card--theme-dark {
          --gi-theme-base: #0f1418;
          --gi-theme-base-strong: #0b1014;
          --gi-theme-base-soft: #151c21;
          --gi-warning-ink: #c7d0d7;
          --gi-warning-border: color-mix(in srgb, var(--gi-uniform-tone) 24%, rgba(255, 255, 255, 0.14));
          --gi-warning-surface: #171c20;
          --gi-theme-border-override: color-mix(in srgb, var(--gazon-section-accent) 24%, rgba(255, 255, 255, 0.12));
          --gi-theme-shadow-override: 0 16px 28px rgba(0, 0, 0, 0.34);
          --gi-surface-fill: #12181d;
          --gi-surface-fill-accent: #151d23;
          --gi-surface-border: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(255, 255, 255, 0.09));
          --gi-surface-border-strong: color-mix(in srgb, var(--gazon-section-accent) 34%, rgba(255, 255, 255, 0.16));
          --gi-surface-shadow: 0 10px 20px rgba(0, 0, 0, 0.28);
          --gi-surface-shadow-strong: 0 16px 30px rgba(0, 0, 0, 0.38);
        }

        .card.card--theme-light {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(0, 0, 0, 0.08));
        }

        .card.card--theme-dark {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(255, 255, 255, 0.08));
        }

        .card.card--theme-dark {
          background: var(--gi-theme-base);
        }

        .card.card--theme-light.card--solid,
        .card.card--theme-dark.card--solid {
          background: transparent;
        }

        .card.card--theme-light::before {
          background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.045) 48%, transparent 100%);
        }

        .card.card--theme-dark::before {
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.04) 48%, transparent 100%);
        }

        .card.card--theme-light.card--gradient::after,
        .card.card--theme-dark.card--gradient::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, transparent 100%);
          opacity: 0;
          z-index: 0;
        }

        .card--theme-light :is(.tab-panel__hero, .tab-panel__section, .tab-panel__block, .gi-info, .gi-info--main, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .decision-block, .decision-footer, .gi-card-core, .gi-tab, .tab-nav__item, .hero__lead, .decision) {
          background:
            radial-gradient(circle at 84% 0%, color-mix(in srgb, var(--gi-tab-companion) 12%, transparent) 0%, transparent 20%),
            radial-gradient(circle at 8% 94%, color-mix(in srgb, var(--gi-tab-mist-color) 14%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 6%, #ffffff) 0%, color-mix(in srgb, #ffffff 92%, var(--gazon-lawn-color) 8%) 100%);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(0, 0, 0, 0.08));
          box-shadow: var(--gi-theme-shadow-override);
        }

        .card--theme-dark :is(.tab-panel__hero, .tab-panel__section, .tab-panel__block, .gi-info, .gi-info--main, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .decision-block, .decision-footer, .gi-card-core, .gi-tab, .tab-nav__item, .hero__lead, .decision) {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.005) 100%),
            var(--gi-surface-fill);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 24%, rgba(255, 255, 255, 0.12));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            0 14px 24px rgba(0, 0, 0, 0.32);
        }

        .card--theme-light :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background:
            radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--gazon-section-accent) 6%, transparent) 0%, transparent 18%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 3%, #ffffff) 0%, color-mix(in srgb, #ffffff 96%, var(--gazon-lawn-color) 4%) 100%);
        }

        .card--theme-dark :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.014) 0%, rgba(255, 255, 255, 0.004) 100%),
            #151d23;
        }

        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .tab-panel__hero-next,
        .card--theme-light .tab-panel__hero-hint,
        .card--theme-light .tab-panel__block-hint,
        .card--theme-light .tab-panel__section-hint,
        .card--theme-light .tab-panel__section-meta,
        .card--theme-light .tab-panel__section-title,
        .card--theme-light .tab-panel__eyebrow,
        .card--theme-light .tab-panel__stat-secondary,
        .card--theme-light .tab-panel__empty,
        .card--theme-light .tab-panel__header-hint,
        .card--theme-light .decision-hero__next,
        .card--theme-light .decision-hero__hint,
        .card--theme-light .decision-plan__meta,
        .card--theme-light .gi-pill__label,
        .card--theme-light .gi-pill__value,
        .card--theme-light .gi-card-core__label,
        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .header__subtitle,
        .card--theme-light .footer {
          color: color-mix(in srgb, #000000 68%, var(--secondary-text-color));
        }

        .card--theme-light :is(.gi-pill--neutral) {
          background: color-mix(in srgb, #ffffff 94%, var(--gazon-section-accent) 6%);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(0, 0, 0, 0.08));
        }

        .card--theme-light .header__icon--warning { background: color-mix(in srgb, var(--gazon-warning-color) 74%, white); }
        .card--theme-light .header__icon--danger { background: color-mix(in srgb, var(--gazon-danger-color) 74%, white); }
        .card--theme-light .header__icon--success { background: color-mix(in srgb, var(--gazon-success-color) 74%, white); }
        .card--theme-light .header__icon--neutral { background: color-mix(in srgb, var(--gazon-neutral-color) 74%, white); }
        .card--theme-light .header__icon--accent { background: color-mix(in srgb, var(--gazon-accent-tone-color) 74%, white); }
        .card--theme-light .header__icon--critical { background: color-mix(in srgb, var(--gazon-critical-color) 74%, white); }

        .card--theme-dark .gi-card-core__secondary,
        .card--theme-dark .tab-panel__hero-hint,
        .card--theme-dark .tab-panel__block-hint,
        .card--theme-dark .tab-panel__section-hint,
        .card--theme-dark .tab-panel__section-meta,
        .card--theme-dark .tab-panel__section-title,
        .card--theme-dark .tab-panel__eyebrow,
        .card--theme-dark .tab-panel__stat-secondary,
        .card--theme-dark .tab-panel__empty,
        .card--theme-dark .tab-panel__header-hint,
        .card--theme-dark .decision-hero__hint,
        .card--theme-dark .decision-plan__meta,
        .card--theme-dark .gi-pill__label,
        .card--theme-dark .gi-pill__value,
        .card--theme-dark .gi-card-core__label,
        .card--theme-dark .gi-card-core__secondary,
        .card--theme-dark .header__subtitle,
        .card--theme-dark .footer {
          color: color-mix(in srgb, #ffffff 72%, var(--secondary-text-color));
        }

        .card--theme-dark .tab-panel__hero-next,
        .card--theme-dark .decision-hero__next,
        .card--theme-dark .decision-plan__summary,
        .card--theme-dark .tab-panel__section-summary,
        .card--theme-dark .tab-panel__summary-value,
        .card--theme-dark .tab-panel__metric-value,
        .card--theme-dark .header__title {
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__hero-summary,
        .card--theme-dark .tab-panel__summary-label,
        .card--theme-dark .tab-panel__metric-label,
        .card--theme-dark .decision-plan__label,
        .card--theme-dark .tab-panel__section-title,
        .card--theme-dark .tab-panel__eyebrow {
          color: color-mix(in srgb, #ffffff 58%, var(--secondary-text-color));
        }

        .card--theme-dark .advanced-group {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.012) 0%, rgba(255, 255, 255, 0.004) 100%),
            #13191e;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(255, 255, 255, 0.10));
        }

        .card--theme-dark :is(.gi-pill--neutral) {
          background: #141b20;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 18%, rgba(255, 255, 255, 0.12));
        }

        .card--theme-dark .gi-pill--warning,
        .card--theme-dark .decision-status--warning {
          background: transparent;
          border-color: var(--gi-warning-border);
          color: var(--gi-warning-ink);
        }

        .card--theme-dark .gi-pill--warning .gi-pill__value,
        .card--theme-dark .gi-pill--warning .gi-pill__label,
        .card--theme-dark .decision-status--warning {
          color: var(--gi-warning-ink);
        }

        .card--theme-dark .gi-pill--success .gi-pill__label,
        .card--theme-dark .gi-pill--success .gi-pill__value,
        .card--theme-dark .gi-pill--accent .gi-pill__label,
        .card--theme-dark .gi-pill--accent .gi-pill__value {
          color: color-mix(in srgb, #ffffff 90%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__intervention-card--proposed,
        .card--theme-dark .tab-panel__temperature-constraint--warning {
          border-color: var(--gi-warning-border);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.008) 0%, rgba(255, 255, 255, 0.003) 100%),
            #12181d;
        }

        .card--theme-dark .tab-panel__intervention-card--proposed .tab-panel__section-summary,
        .card--theme-dark .tab-panel__intervention-card--proposed .tab-panel__section-hint,
        .card--theme-dark .tab-panel__temperature-constraint--warning .tab-panel__temperature-detail {
          color: color-mix(in srgb, #ffffff 88%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__intervention-card--proposed .tab-panel__section-meta,
        .card--theme-dark .tab-panel__temperature-constraint--warning .tab-panel__temperature-hint,
        .card--theme-dark .tab-panel__metric-row--warning .tab-panel__metric-note {
          color: color-mix(in srgb, #ffffff 72%, var(--secondary-text-color));
        }

        .card--theme-dark .tab-panel__summary-row--warning {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gi-warning-ink) 88%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__metric-row--warning {
          border-color: var(--gi-warning-border);
        }

        .card--theme-dark .tab-panel--intervention .tab-panel__decision-strip {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.003) 100%),
            #12181d;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 18%, rgba(255, 255, 255, 0.10));
        }

        .card--theme-dark .tab-panel__intervention-card {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.012) 0%, rgba(255, 255, 255, 0.004) 100%),
            #131a1f;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 18%, rgba(255, 255, 255, 0.10));
        }

        .card--theme-dark .tab-panel__intervention-card--picker {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.012) 0%, rgba(255, 255, 255, 0.004) 100%),
            #131b20;
          border-color: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 20%, rgba(255, 255, 255, 0.10));
        }

        .card--theme-dark .tab-panel__intervention-card--picker .tab-panel__section-summary,
        .card--theme-dark .tab-panel__intervention-card--picker .tab-panel__section-hint,
        .card--theme-dark .tab-panel__intervention-card--picker .tab-panel__section-meta {
          color: color-mix(in srgb, #ffffff 88%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__intervention-card--action {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.012) 0%, rgba(255, 255, 255, 0.004) 100%),
            #141c18;
          border-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 20%, rgba(255, 255, 255, 0.10));
        }

        .card--theme-dark .tab-panel__intervention-card--action .tab-panel__section-summary,
        .card--theme-dark .tab-panel__intervention-card--action .tab-panel__section-hint,
        .card--theme-dark .tab-panel__intervention-card--action .tab-panel__section-meta {
          color: color-mix(in srgb, #ffffff 88%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel--intervention .tab-panel__workflow-step,
        .card--theme-dark .tab-panel--intervention .tab-panel__workflow-step--active,
        .card--theme-dark .tab-panel--intervention .tab-panel__workflow-step--done,
        .card--theme-dark .tab-panel--intervention .tab-panel__workflow-label,
        .card--theme-dark .tab-panel--intervention .tab-panel__section-meta,
        .card--theme-dark .tab-panel--intervention .tab-panel__select,
        .card--theme-dark .tab-panel--intervention .tab-panel__select-chevron,
        .card--theme-dark .tab-panel--intervention .tab-panel__select-prefix,
        .card--theme-dark .tab-panel--intervention .gi-action--primary,
        .card--theme-dark .tab-panel--intervention .gi-action--primary span,
        .card--theme-dark .tab-panel--intervention .gi-action--primary::after {
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel--intervention .tab-panel__workflow-step {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.003) 100%),
            #141b20;
        }

        .card--theme-dark .tab-panel--intervention .gi-pill--context,
        .card--theme-dark .tab-panel--intervention .gi-pill--context .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--context .gi-pill__value {
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel--intervention .gi-pill--warning,
        .card--theme-dark .tab-panel--intervention .gi-pill--warning .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--warning .gi-pill__value,
        .card--theme-dark .tab-panel--intervention .gi-pill--success,
        .card--theme-dark .tab-panel--intervention .gi-pill--success .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--success .gi-pill__value,
        .card--theme-dark .tab-panel--intervention .gi-pill--accent,
        .card--theme-dark .tab-panel--intervention .gi-pill--accent .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--accent .gi-pill__value,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--proposed .tab-panel__section-summary,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--proposed .tab-panel__section-hint,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--proposed .tab-panel__section-meta,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--picker .tab-panel__section-summary,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--picker .tab-panel__section-hint,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--picker .tab-panel__section-meta,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--action .tab-panel__section-summary,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--action .tab-panel__section-hint,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--action .tab-panel__section-meta {
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color)) !important;
        }

        .card--theme-dark .tab-panel--intervention .tab-panel__select-prefix {
          background: rgba(255, 255, 255, 0.06);
        }

        .card--theme-dark .tab-panel--intervention .gi-action--primary:disabled,
        .card--theme-dark .tab-panel--intervention .gi-action--primary:disabled span,
        .card--theme-dark .tab-panel--intervention .gi-action--primary:disabled::after {
          color: color-mix(in srgb, #ffffff 82%, var(--secondary-text-color));
          opacity: 1;
        }

        .card--theme-dark .tab-panel__metric-row {
          background: var(--gi-surface);
          border-color: var(--gi-border);
          box-shadow: none;
        }

        .card--theme-dark button.tab-panel__metric-row:hover {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 24%, rgba(255, 255, 255, 0.14));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.03),
            0 14px 28px rgba(0,0,0,0.30);
        }

        .card--theme-dark button.tab-panel__metric-row:focus-visible {
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 24%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.03),
            0 12px 24px rgba(0,0,0,0.28);
        }

        .card--theme-dark .header__icon--warning { background: color-mix(in srgb, var(--gazon-warning-color) 74%, black); }
        .card--theme-dark .header__icon--danger { background: color-mix(in srgb, var(--gazon-danger-color) 74%, black); }
        .card--theme-dark .header__icon--success { background: color-mix(in srgb, var(--gazon-success-color) 74%, black); }
        .card--theme-dark .header__icon--neutral { background: color-mix(in srgb, var(--gazon-neutral-color) 74%, black); }
        .card--theme-dark .header__icon--accent { background: color-mix(in srgb, var(--gazon-accent-tone-color) 74%, black); }
        .card--theme-dark .header__icon--critical { background: color-mix(in srgb, var(--gazon-critical-color) 74%, black); }

        @media (prefers-reduced-motion: reduce) {
          .card,
          .gi-card,
          .tab-panel,
          .tab-panel > *,
          .gi-panel,
          .gi-tab,
          .tab-nav__item,
          .gi-pill,
          .gi-action,
          .gi-info,
          .gi-progress__bar,
          .tab-progress__bar,
          .card--pulse-critical,
          .gi-alert--critical,
          .card--gradient::after {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 600px) {
          :host {
            --gi-header-gap: 8px;
            --gi-header-margin-bottom: 8px;
            --gi-hero-margin: 2px 0 6px;
            --gi-hero-gap: 8px;
            --gi-hero-lead-padding: 10px 11px;
            --gi-hero-lead-gap: 6px;
            --gi-hero-metrics-gap: 6px;
            --gi-inline-gap: 8px;
            --gi-nav-gap: 5px;
            --gi-nav-margin: 4px 0 6px;
            --gi-nav-item-padding: 6px 9px;
            --gi-grid-gap: 6px;
            --gi-grid-template: 1fr;
            --gi-action-padding-inline: 16px;
            --gi-action-padding-block: 14px;
            --gi-action-padding-inline-end: 18px;
            --gi-action-gap: 10px;
            --gi-action-min-height: 78px;
            --gi-action-icon-size: 24px;
            --gi-action-icon-glyph-size: 15px;
            --gi-card-core-gap: 8px;
            --gi-card-core-padding: 11px 13px;
            --gi-card-core-min-height: 72px;
            --gi-card-core-radius: 14px;
            --gi-card-core-icon-size: 18px;
            --gi-card-core-icon-glyph-size: 11px;
            --gi-decision-grid-gap: 6px;
            --gi-tiles-gap: 6px;
            --gi-surface-shadow: 0 8px 18px rgba(0, 0, 0, 0.07);
            --gi-surface-shadow-strong: 0 12px 24px rgba(0, 0, 0, 0.12);
          }

          .hero {
            grid-template-columns: 1fr;
          }

          .tab-panel__section--products {
            gap: 6px;
          }

          .tab-panel__section--products .tab-panel__section-summary {
            font-size: var(--gi-font-sm);
            line-height: 1.25;
          }

          .tab-panel__section--products .gi-card-core--stat {
            min-height: 68px;
          }

          .tab-panel__intervention-layout {
            grid-template-columns: 1fr;
          }

          .tab-panel__intervention-card {
            padding: 11px 12px;
          }

          .tab-panel__workflow {
            gap: 6px;
          }

          .tab-panel__workflow-step {
            padding: 6px 8px;
          }

          .tab-panel__select-shell {
            min-height: 48px;
          }

          .tab-panel__intervention-card--action .tab-panel__cta {
            min-height: 70px;
          }

          .tab-panel__history-inline-head {
            flex-direction: column;
            align-items: flex-start;
          }

          .tab-panel__history-inline-meta {
            text-align: left;
          }
        }

        @media (max-width: 1400px) {
          .tab-panel__products-layout,
          .tab-panel__intervention-layout,
          .tab-panel__intervention-layout--workflow,
          .tab-panel__grid--priority,
          .tab-panel__grid--featured,
          .tab-panel__grid--decision-board,
          .tab-panel__facts-grid {
            grid-template-columns: 1fr;
          }

          .tab-panel__intervention-layout--workflow .tab-panel__intervention-card--proposed,
          .tab-panel__products-layout .tab-panel__section--products-scope {
            grid-column: auto;
          }

          .tab-panel__decision-strip--overview {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 400px) {
          :host {
            --gi-header-gap: 6px;
            --gi-header-margin-bottom: 8px;
            --gi-hero-margin: 1px 0 4px;
            --gi-hero-gap: 6px;
            --gi-hero-lead-padding: 9px 10px;
            --gi-hero-lead-gap: 6px;
            --gi-hero-metrics-gap: 4px;
            --gi-card-core-gap: 8px;
            --gi-card-core-padding: 10px 12px;
            --gi-card-core-min-height: 70px;
            --gi-card-core-icon-size: 18px;
            --gi-card-core-icon-glyph-size: 11px;
          }

          .header {
            align-items: stretch;
          }

          .header__title-wrap {
            width: 100%;
            gap: 8px;
          }

          .tab-panel__decision-strip--overview {
            grid-template-columns: 1fr;
          }

          .header__meta {
            width: 100%;
            gap: 6px;
            margin-left: 0;
          }

          .header__weather {
            align-self: flex-end;
          }

          .header__icon {
            width: calc(var(--gazon-icon-size) * 1.02);
            height: calc(var(--gazon-icon-size) * 1.02);
          }

          .header__icon .gi-icon {
            width: 11px;
            height: 11px;
          }

          .header__title {
            font-size: var(--gi-font-md);
            line-height: 1.14;
          }

          .header__subtitle {
            font-size: var(--gi-font-xs);
            line-height: 1.22;
          }

          .header__action {
            align-self: flex-end;
          }

          .hero {
            gap: 6px;
            margin: 1px 0 4px;
          }

          .hero__lead {
            padding: 9px 10px;
            gap: 6px;
            flex-basis: 220px;
          }

          .hero__lead-icon {
            width: 18px;
            height: 18px;
          }

          .hero__lead-icon .gi-icon {
            width: 11px;
            height: 11px;
          }

          .hero__label {
            margin-bottom: 2px;
          }

          .hero__value {
            font-size: var(--gi-font-sm);
            line-height: 1.16;
            -webkit-line-clamp: 1;
          }

          .hero__metrics {
            gap: 4px;
          }

          .hero__metrics {
            grid-template-columns: repeat(auto-fit, minmax(122px, 1fr));
          }

          .hero__metrics .gi-card-core {
            flex-basis: 100px;
            min-height: 70px;
          }

          .tab-panel--products .tab-panel__hero-top,
          .tab-panel--products .tab-panel__section-head,
          .tab-panel--intervention .tab-panel__hero-top,
          .tab-panel--intervention .tab-panel__section-head,
          .tab-panel__history-foldout-head,
          .tab-panel--intervention .tab-panel__debug-foldout-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .tab-panel--products .tab-panel__status,
          .tab-panel--intervention .tab-panel__status,
          .tab-panel--intervention .tab-panel__debug-foldout-meta {
            width: 100%;
            text-align: left;
            max-width: 100%;
          }

          .tab-panel__products-layout {
            grid-template-columns: 1fr;
          }

          .tab-panel__grid--priority,
          .tab-panel__grid--featured,
          .tab-panel__grid--decision-board {
            grid-template-columns: 1fr;
          }

          .tab-panel__hero {
            padding: 11px 12px;
          }

          .tab-panel__hero-summary {
            font-size: var(--gi-font-xs);
            line-height: 1.16;
          }

          .tab-panel__hero-next,
          .tab-panel__hero-hint {
            font-size: var(--gi-font-sm);
            line-height: 1.24;
          }

          .tab-panel--products .gi-card-core--stat {
            min-height: 64px;
          }

          .tab-panel__grid--priority > *:first-child .gi-card-core,
          .tab-panel__grid--featured > *:first-child .gi-card-core,
          .tab-panel__grid--decision-board > *:first-child .gi-card-core {
            min-height: 78px;
          }

          .tab-panel--products .tab-panel__section-summary,
          .tab-panel--products .tab-panel__section-hint {
            font-size: var(--gi-font-sm);
            line-height: 1.22;
          }

          .tab-panel__decision-strip--overview {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .tab-panel__facts-grid {
            grid-template-columns: 1fr;
          }

          .tab-panel__hydric-hero {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 12px 13px;
          }

          .tab-panel__hydric-hero-value {
            font-size: clamp(1.5rem, 7.2vw, 2rem);
          }

          .tab-panel__hydric-hero-badge {
            width: fit-content;
          }

          .tab-panel__hydric-meter-bar {
            height: 10px;
          }

          .tab-panel__metric-rail--watering-hydric .tab-panel__metric-row {
            min-height: 70px;
          }

          .tab-panel__metric-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }

          .tab-panel__metric-value {
            text-align: left;
          }

          .tab-panel__history-foldout-preview {
            grid-template-columns: 1fr;
          }

          .tab-panel__card-slider-track {
            grid-auto-columns: min(84vw, 260px);
          }

          .tab-panel__card-slider--config .tab-panel__card-slider-track {
            grid-auto-columns: min(88vw, 300px);
          }

          .tab-panel__card-slider-item {
            scroll-snap-align: start;
          }

          .tab-panel__card-slider {
            scroll-snap-type: x proximity;
            scroll-padding-inline: 6px;
            -webkit-overflow-scrolling: touch;
          }

          .tab-panel__history-foldout-summary {
            padding: 11px 12px;
          }

          .tab-panel__history-foldout-body {
            padding: 0 12px 12px;
          }

          .tab-panel--intervention .tab-panel__decision-strip {
            flex-direction: column;
            align-items: stretch;
          }

          .tab-panel--intervention .tab-panel__decision-strip {
            padding: 8px 10px;
          }

          .tab-panel--intervention .tab-panel__intervention-layout {
            gap: 8px;
            grid-template-columns: 1fr;
          }

          .tab-panel--intervention .tab-panel__intervention-card {
            padding: 10px 11px;
            gap: 8px;
          }

          .tab-panel--intervention .tab-panel__intervention-card .tab-panel__section-summary,
          .tab-panel--intervention .tab-panel__intervention-card .tab-panel__section-hint {
            font-size: var(--gi-font-xs);
            line-height: 1.22;
          }

          .tab-panel--intervention .tab-panel__select-shell {
            min-height: 44px;
            padding: 6px 10px 6px 8px;
            gap: 8px;
          }

          .tab-panel--intervention .tab-panel__select {
            padding-right: 30px;
          }

          .tab-panel--intervention .tab-panel__select-prefix {
            width: 26px;
            height: 26px;
          }

          .tab-panel--intervention .tab-panel__select-chevron {
            inset-inline-end: 10px;
          }

          .tab-panel--intervention .tab-panel__intervention-card--action .tab-panel__cta {
            min-height: 64px;
            border-radius: 12px;
          }
        }

        /* ===== Refonte v0.4 (gz2) — header + nav + Synthèse, à plat & aéré ===== */
        .gz2-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
        }
        .gz2-header__id { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .gz2-header__titles { min-width: 0; }
        .gz2-header__name { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .gz2-title-dot { width: 8px; height: 8px; border-radius: 50%; flex: 0 0 auto; }
        .gz2-header__title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
        .gz2-header__icon {
          width: 40px; height: 40px; flex: 0 0 auto;
          border-radius: 12px;
          background: var(--gi-accent-soft);
          color: var(--gi-accent);
          display: flex; align-items: center; justify-content: center;
        }
        .gz2-header__title {
          font-size: var(--gi-font-lg);
          font-weight: var(--gi-weight-medium);
          color: var(--gi-text);
          line-height: 1.2;
        }
        .gz2-header__sub {
          display: flex; align-items: center; gap: 6px;
          font-size: var(--gi-font-sm);
          color: var(--gi-text-muted);
        }
        .gz2-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; flex: 0 0 auto; }
        .gz2-header__meta { display: flex; align-items: center; gap: 12px; flex: 0 0 auto; }
        .gz2-weather {
          display: flex; align-items: center; gap: 6px;
          font-size: var(--gi-font-sm); color: var(--gi-text-muted); white-space: nowrap;
        }
        .gz2-btn {
          display: inline-flex; align-items: center; gap: 7px;
          border: 1px solid transparent;
          background: var(--gi-accent-soft);
          color: var(--gi-accent);
          border-radius: 999px;
          padding: 8px 14px;
          font: inherit;
          font-size: var(--gi-font-sm);
          font-weight: var(--gi-weight-medium);
          cursor: pointer; white-space: nowrap;
          transition: background-color var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .gz2-btn:hover { background: color-mix(in srgb, var(--gi-accent) 24%, transparent); }

        .gz2-nav {
          display: flex; gap: 22px;
          border-bottom: 1px solid var(--gi-border);
          margin-bottom: 18px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .gz2-nav::-webkit-scrollbar { display: none; }
        .gz2-nav__item {
          appearance: none; -webkit-appearance: none;
          background: none; border: none;
          border-bottom: 2px solid transparent;
          color: var(--gi-text-muted);
          padding: 10px 1px;
          margin-bottom: -1px;
          font: inherit;
          font-size: var(--gi-font-sm);
          font-weight: var(--gi-weight-medium);
          cursor: pointer; white-space: nowrap; flex: 0 0 auto;
          transition: color var(--gi-motion-fast) var(--gi-ease-standard), border-color var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .gz2-nav__item:hover { color: var(--gi-text); }
        .gz2-nav__item--active { color: var(--gi-text); border-bottom-color: var(--gi-accent); }

        .gz2-overview { display: flex; flex-direction: column; }
        .gz2-eyebrow {
          font-size: var(--gi-font-xs);
          text-transform: uppercase; letter-spacing: 0.08em;
          font-weight: var(--gi-weight-medium);
          color: var(--gi-text-faint);
          margin-bottom: 12px;
        }
        /* Accent de marque sur l'amorce du héro pour donner du peps. */
        .gz2-hero .gz2-eyebrow { color: var(--gi-accent); }
        .gz2-hero { margin-bottom: 22px; }
        .gz2-hero__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
        .gz2-hero__title {
          font-size: var(--gi-font-2xl);
          font-weight: var(--gi-weight-medium);
          color: var(--gi-text);
          line-height: 1.18; margin-top: 4px;
          letter-spacing: -0.01em;
        }
        .gz2-hero__sub { font-size: var(--gi-font-sm); color: var(--gi-text-muted); line-height: 1.5; margin-top: 10px; }

        .gz2-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: var(--gi-font-xs); font-weight: var(--gi-weight-medium);
          padding: 5px 11px; border-radius: 999px; white-space: nowrap; flex: 0 0 auto;
        }
        .gz2-chip--success { background: color-mix(in srgb, var(--gi-status-success) 14%, transparent); color: var(--gi-status-success); }
        .gz2-chip--warning { background: color-mix(in srgb, var(--gi-status-warning) 14%, transparent); color: var(--gi-status-warning); }
        .gz2-chip--danger  { background: color-mix(in srgb, var(--gi-status-danger) 14%, transparent); color: var(--gi-status-danger); }
        .gz2-chip--critical{ background: color-mix(in srgb, var(--gi-status-danger) 18%, transparent); color: var(--gi-status-danger); }
        .gz2-chip--accent  { background: var(--gi-accent-soft); color: var(--gi-accent); }
        .gz2-chip--neutral { background: var(--gi-surface-2); color: var(--gi-text-muted); }

        .gz2-reperes { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 22px; margin-bottom: 22px; }
        .gz2-rep__label { font-size: var(--gi-font-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--gi-text-faint); margin-bottom: 7px; }
        .gz2-rep__value { font-size: var(--gi-font-lg); font-weight: var(--gi-weight-medium); color: var(--gi-text); overflow-wrap: anywhere; }

        .gz2-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .gz2-card {
          appearance: none; -webkit-appearance: none;
          text-align: left; font: inherit; color: inherit;
          background: var(--gi-surface);
          border: 1px solid var(--gi-border);
          border-radius: var(--gi-radius-md);
          padding: 14px 16px;
          cursor: pointer; min-width: 0;
          transition: border-color var(--gi-motion-fast) var(--gi-ease-standard), background-color var(--gi-motion-fast) var(--gi-ease-standard), transform var(--gi-motion-fast) var(--gi-ease-soft), box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .gz2-card:hover { border-color: var(--gi-border-strong); background: var(--gi-surface-2); transform: translateY(-1px); box-shadow: var(--gi-shadow-sm); }
        .gz2-card:active { transform: translateY(0); }
        .gz2-card__label { font-size: var(--gi-font-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--gi-text-faint); margin-bottom: 8px; }
        .gz2-card__value { font-size: var(--gi-font-lg); font-weight: var(--gi-weight-medium); color: var(--gi-text); line-height: 1.15; overflow-wrap: anywhere; }
        .gz2-card__value--success { color: var(--gi-status-success); }
        .gz2-card__value--warning { color: var(--gi-status-warning); }
        .gz2-card__value--danger  { color: var(--gi-status-danger); }
        .gz2-card__value--critical{ color: var(--gi-status-danger); }
        .gz2-card__sub { font-size: var(--gi-font-xs); color: var(--gi-text-muted); margin-top: 6px; line-height: 1.4; }

        .gz2-eyebrow--section { margin-top: 26px; display: flex; align-items: center; gap: 9px; }
        /* Petit trait d'accent en tête de section (langage « sections cartes »). */
        .gz2-eyebrow--section::before { content: ""; width: 16px; height: 2px; border-radius: 999px; background: var(--gi-accent); flex: 0 0 auto; }
        .gz2-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
        .gz2-card--static { cursor: default; }
        .gz2-empty { font-size: var(--gi-font-sm); color: var(--gi-text-muted); padding: 8px 0; }
        .gz2-field { margin-bottom: 16px; }
        .gz2-field__label { display: block; font-size: var(--gi-font-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--gi-text-faint); margin-bottom: 7px; }
        .gz2-select {
          appearance: none; -webkit-appearance: none;
          width: 100%;
          background: var(--gi-surface); color: var(--gi-text);
          border: 1px solid var(--gi-border); border-radius: var(--gi-radius-sm);
          padding: 10px 12px; font: inherit; font-size: var(--gi-font-sm); cursor: pointer;
        }
        .gz2-select:hover { border-color: var(--gi-border-strong); }
        .gz2-btn--block { width: 100%; justify-content: center; }
        .gz2-btn:disabled { opacity: 0.5; cursor: default; }
        .gz2-meter { margin-bottom: 18px; }
        .gz2-meter__top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 9px; }
        .gz2-meter__value { font-size: var(--gi-font-xl); font-weight: var(--gi-weight-medium); color: var(--gi-text); }
        .gz2-meter__badge { font-size: var(--gi-font-xs); color: var(--gi-text-muted); white-space: nowrap; }
        .gz2-meter__track { position: relative; height: 8px; border-radius: 999px; background: var(--gi-surface-2); overflow: hidden; }
        .gz2-meter__fill { position: absolute; left: 0; top: 0; height: 100%; border-radius: 999px; background: var(--gi-accent); }
        .gz2-meter__surplus { position: absolute; top: 0; height: 100%; border-radius: 999px; background: color-mix(in srgb, var(--gi-status-success) 55%, transparent); }
        .gz2-meter__meta { font-size: var(--gi-font-xs); color: var(--gi-text-muted); margin-top: 9px; line-height: 1.4; }
        /* Repère MAD : niveau de réserve sous lequel l'arrosage se déclenche. */
        .gz2-meter__mad { position: absolute; top: 0; height: 100%; width: 2px; transform: translateX(-1px); background: var(--gi-text); opacity: 0.72; pointer-events: none; }
        .gz2-meter__legend { display: flex; align-items: center; gap: var(--gi-space-2); font-size: var(--gi-font-xxs); color: var(--gi-text-muted); margin-top: 6px; }
        .gz2-meter__legend-mark { display: inline-block; width: 2px; height: 11px; background: var(--gi-text); opacity: 0.72; border-radius: 999px; flex: 0 0 auto; }

        /* Actions secondaires (ex. recaler la réserve). */
        .gz2-actions { display: flex; flex-wrap: wrap; gap: var(--gi-space-2); margin-top: var(--gi-space-3); }

        /* Bandeau « pourquoi l'arrosage est bloqué ». */
        .gz2-blockage { display: flex; flex-direction: column; gap: var(--gi-space-1); margin: var(--gi-space-3) 0; padding: var(--gi-space-3); border-radius: var(--gi-radius-md); border: 1px solid color-mix(in srgb, var(--gi-status-warning) 30%, transparent); background: color-mix(in srgb, var(--gi-status-warning) 12%, transparent); }
        .gz2-blockage--danger { border-color: color-mix(in srgb, var(--gi-status-danger) 32%, transparent); background: color-mix(in srgb, var(--gi-status-danger) 13%, transparent); }
        .gz2-blockage--success { border-color: color-mix(in srgb, var(--gi-status-success) 30%, transparent); background: color-mix(in srgb, var(--gi-status-success) 12%, transparent); }
        .gz2-blockage__head { display: flex; align-items: center; gap: var(--gi-space-2); font-weight: 600; font-size: var(--gi-font-sm); color: var(--gi-text); }
        .gz2-blockage__why { font-size: var(--gi-font-xs); color: var(--gi-text); line-height: 1.45; }
        .gz2-blockage__how { display: flex; align-items: flex-start; gap: var(--gi-space-2); font-size: var(--gi-font-xs); color: var(--gi-text-muted); line-height: 1.45; }

        /* Basé sur la largeur de la CARTE (pas du navigateur) : header lisible
           même quand la carte est étroite dans un dashboard large. */
        @container (max-width: 560px) {
          .gz2-header { flex-wrap: wrap; }
          .gz2-header__meta { width: 100%; justify-content: space-between; }
        }
`;

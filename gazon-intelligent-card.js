const CARD_STYLES = String.raw`
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
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--gi-text-faint);
          margin-bottom: 12px;
        }
        .gz2-hero { margin-bottom: 20px; }
        .gz2-hero__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
        .gz2-hero__title {
          font-size: var(--gi-font-2xl);
          font-weight: var(--gi-weight-medium);
          color: var(--gi-text);
          line-height: 1.25; margin-top: 2px;
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
          border: 1px solid transparent;
          border-radius: 14px;
          padding: 14px 16px;
          cursor: pointer; min-width: 0;
          transition: border-color var(--gi-motion-fast) var(--gi-ease-standard), background-color var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .gz2-card:hover { border-color: var(--gi-border); background: var(--gi-surface-2); }
        .gz2-card__label { font-size: var(--gi-font-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--gi-text-faint); margin-bottom: 8px; }
        .gz2-card__value { font-size: var(--gi-font-md); font-weight: var(--gi-weight-medium); color: var(--gi-text); line-height: 1.2; overflow-wrap: anywhere; }
        .gz2-card__value--success { color: var(--gi-status-success); }
        .gz2-card__value--warning { color: var(--gi-status-warning); }
        .gz2-card__value--danger  { color: var(--gi-status-danger); }
        .gz2-card__value--critical{ color: var(--gi-status-danger); }
        .gz2-card__sub { font-size: var(--gi-font-xs); color: var(--gi-text-muted); margin-top: 6px; line-height: 1.4; }

        .gz2-eyebrow--section { margin-top: 24px; }
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
        .gz2-meter__value { font-size: var(--gi-font-lg); font-weight: var(--gi-weight-medium); color: var(--gi-text); }
        .gz2-meter__badge { font-size: var(--gi-font-xs); color: var(--gi-text-muted); white-space: nowrap; }
        .gz2-meter__track { position: relative; height: 8px; border-radius: 999px; background: var(--gi-surface-2); overflow: hidden; }
        .gz2-meter__fill { position: absolute; left: 0; top: 0; height: 100%; border-radius: 999px; background: var(--gi-accent); }
        .gz2-meter__surplus { position: absolute; top: 0; height: 100%; border-radius: 999px; background: color-mix(in srgb, var(--gi-status-success) 55%, transparent); }
        .gz2-meter__meta { font-size: var(--gi-font-xs); color: var(--gi-text-muted); margin-top: 9px; line-height: 1.4; }

        /* Basé sur la largeur de la CARTE (pas du navigateur) : header lisible
           même quand la carte est étroite dans un dashboard large. */
        @container (max-width: 560px) {
          .gz2-header { flex-wrap: wrap; }
          .gz2-header__meta { width: 100%; justify-content: space-between; }
        }
`;
const EDITOR_STYLES = String.raw`
        :host {
          display: block;
          --editor-border: var(--divider-color, rgba(127,127,127,0.2));
          --editor-focus: color-mix(in srgb, var(--primary-color) 26%, transparent);
          --editor-focus-ring: color-mix(in srgb, var(--primary-color) 18%, transparent);
          --editor-surface: linear-gradient(
            180deg,
            color-mix(in srgb, var(--card-background-color) 98%, white) 0%,
            color-mix(in srgb, var(--card-background-color) 95%, black) 100%
          );
          --editor-surface-soft: linear-gradient(
            180deg,
            color-mix(in srgb, var(--secondary-background-color) 97%, white) 0%,
            color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%
          );
          --editor-surface-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
          --editor-surface-shadow-strong: 0 12px 28px rgba(0, 0, 0, 0.10);
        }
        .editor {
          padding: 16px;
          display: grid;
          gap: 16px;
          color: var(--primary-text-color);
        }
        .section {
          display: grid;
          gap: 12px;
          padding: 14px;
          border: 1px solid var(--editor-border);
          border-radius: 16px;
          background: var(--editor-surface);
          box-shadow:
            var(--editor-surface-shadow),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition:
            transform 160ms ease,
            box-shadow 160ms ease,
            border-color 160ms ease,
            background-color 160ms ease;
        }

        .section--sub {
          padding: 12px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--secondary-background-color) 96%, transparent);
          box-shadow: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .section:hover {
            border-color: color-mix(in srgb, var(--primary-color) 14%, var(--editor-border));
            box-shadow:
              var(--editor-surface-shadow-strong),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
            transform: translateY(-1px);
          }
        }
        .section h3 {
          margin: 0 0 4px 0;
          font-size: 1rem;
        }
        .section p {
          margin: 0;
          color: var(--secondary-text-color);
          font-size: 0.88rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }
        .field {
          display: grid;
          gap: 6px;
          font-size: 0.9rem;
        }

        .field > span,
        .field--checkbox > span {
          color: var(--secondary-text-color);
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1.15;
          transition:
            color 160ms ease,
            transform 160ms ease,
            letter-spacing 160ms ease;
        }

        .field:focus-within > span,
        .field--checkbox:focus-within > span {
          color: var(--primary-text-color);
          letter-spacing: 0.015em;
          transform: translateY(-0.5px);
        }

        .field input,
        .field select {
          width: 100%;
          box-sizing: border-box;
          min-height: 44px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--editor-border);
          background: var(--editor-surface-soft);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.03);
          color: var(--primary-text-color);
          line-height: 1.2;
          font: inherit;
          outline: none;
          transition:
            transform 160ms ease,
            border-color 140ms ease,
            box-shadow 140ms ease,
            background-color 140ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .field input:hover,
          .field select:hover {
            border-color: color-mix(in srgb, var(--primary-color) 18%, var(--editor-border));
            background:
              linear-gradient(
                180deg,
                color-mix(in srgb, var(--secondary-background-color) 99%, white) 0%,
                color-mix(in srgb, var(--secondary-background-color) 96%, black) 100%
              );
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.06),
              0 4px 10px rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
          }
        }

        .field input:focus,
        .field select:focus {
          border-color: color-mix(in srgb, var(--primary-color) 44%, var(--editor-border));
          box-shadow:
            0 0 0 1px var(--editor-focus),
            0 0 0 4px var(--editor-focus-ring),
            0 8px 18px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        .field input:focus-visible,
        .field select:focus-visible {
          border-color: color-mix(in srgb, var(--primary-color) 50%, var(--editor-border));
          box-shadow:
            0 0 0 1px var(--editor-focus),
            0 0 0 4px var(--editor-focus-ring),
            0 8px 18px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        .field input::placeholder {
          color: color-mix(in srgb, var(--secondary-text-color) 72%, transparent);
        }

        .field--checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .field--checkbox input {
          width: auto;
        }
        .hint {
          font-size: 0.84rem;
          color: var(--secondary-text-color);
        }
        .row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }

        @media (max-width: 540px) {
          .row {
            grid-template-columns: 1fr;
          }
        }

        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
        }`;

const CARD_TYPE = "gazon-intelligent-card";
const CARD_NAME = "Gazon Intelligent Card";
const CARD_VERSION = "0.5.7";

const DEFAULT_CONFIG = {
  title: "Gazon Intelligent",
  show_icons: true,
  show_header: true,
  show_background: true,
  minimal_mode: false,
  show_advanced_details: false,
  theme_mode: "auto",
  accent_color: "",
  icon_size: 24,
  border_radius: 24,
  background_style: "solid",
  show_secondary_info: true,
  entity_assistant: "sensor.gazon_intelligent_assistant",
  entity_fenetre_optimale: "sensor.gazon_intelligent_fenetre_optimale",
  entity_weather: "weather.forecast_home",
  entity_plan_arrosage: "sensor.gazon_intelligent_plan_d_arrosage",
  entity_dernier_arrosage: "sensor.gazon_intelligent_dernier_arrosage_detecte",
  entity_dernier_arrosage_total_zones: "sensor.gazon_intelligent_dernier_arrosage_total_zones",
  entity_prochain_arrosage: "sensor.gazon_intelligent_prochain_arrosage",
  entity_prochaine_tonte: "sensor.gazon_intelligent_prochaine_tonte",
  entity_derniere_application: "sensor.gazon_intelligent_derniere_application",
  entity_derniere_action_utilisateur: "sensor.gazon_intelligent_derniere_action_utilisateur",
  entity_catalogue_produits: "sensor.gazon_intelligent_catalogue_produits",
  entity_produit_intervention: "select.gazon_intelligent_produit_d_intervention",
  entity_debug_intervention: "sensor.gazon_intelligent_debug_intervention",
  entity_niveau_pertinence: "sensor.gazon_intelligent_niveau_de_pertinence",
  entity_prochaine_fenetre_optimale: "sensor.gazon_intelligent_prochaine_fenetre_optimale",
  entity_prochain_blocage_attendu: "sensor.gazon_intelligent_prochain_blocage_attendu",
  entity_signal_intervention: "binary_sensor.gazon_intelligent_signal_intervention",
  entity_signal_irrigation: "binary_sensor.gazon_intelligent_signal_irrigation",
  entity_prochaine_intervention: "sensor.gazon_intelligent_prochaine_intervention",
  entity_conseil: "sensor.gazon_intelligent_conseil_principal",
  entity_action: "sensor.gazon_intelligent_action_recommandee",
  entity_avoid: "sensor.gazon_intelligent_action_a_eviter",
  entity_mode: "select.gazon_intelligent_mode_du_gazon",
  entity_switch_arrosage_automatique: "switch.gazon_intelligent_arrosage_automatique_autorise",
  entity_switch_coordination_tondeuse: "switch.gazon_intelligent_coordination_tondeuse",
  entity_arrosage_recommande: "binary_sensor.gazon_intelligent_arrosage_recommande",
  entity_arrosage_apres_application_autorise: "binary_sensor.gazon_intelligent_arrosage_apres_application_autorise",
  entity_tonte_autorisee: "binary_sensor.gazon_intelligent_tonte_autorisee",
  entity_objectif_arrosage: "sensor.gazon_intelligent_objectif_d_arrosage",
  entity_objectif_legacy: "sensor.gazon_intelligent_objectif_legacy",
  entity_objectif_depletion: "sensor.gazon_intelligent_objectif_depletion",
  entity_reserve_actuelle: "sensor.gazon_intelligent_reserve_actuelle",
  entity_depletion_ratio: "sensor.gazon_intelligent_depletion_ratio",
  entity_etat_hydrique: "sensor.gazon_intelligent_etat_hydrique",
  entity_et0: "sensor.gazon_intelligent_et0",
  entity_etc: "sensor.gazon_intelligent_etc",
  entity_type_arrosage: "sensor.gazon_intelligent_type_d_arrosage",
  entity_risque: "sensor.gazon_intelligent_risque_gazon",
  entity_phase: "sensor.gazon_intelligent_phase_dominante",
  entity_sous_phase: "sensor.gazon_intelligent_sous_phase",
  entity_niveau: "sensor.gazon_intelligent_niveau_d_action",
  entity_tonte: "sensor.gazon_intelligent_etat_de_tonte",
  entity_hauteur: "sensor.gazon_intelligent_hauteur_de_tonte_conseillee",
  entity_arrosage_en_cours: "sensor.gazon_intelligent_arrosage_en_cours",
  entity_debit_zone_1: "number.gazon_intelligent_debit_zone_1",
  entity_debit_zone_2: "number.gazon_intelligent_debit_zone_2",
  entity_debit_zone_3: "number.gazon_intelligent_debit_zone_3",
  entity_debit_zone_4: "number.gazon_intelligent_debit_zone_4",
  entity_debit_zone_5: "number.gazon_intelligent_debit_zone_5",
  entity_hauteur_min_tondeuse: "number.gazon_intelligent_hauteur_min_tondeuse",
  entity_hauteur_max_tondeuse: "number.gazon_intelligent_hauteur_max_tondeuse",
  entity_hauteur_coupe_tondeuse: "number.gazon_intelligent_hauteur_coupe_tondeuse",
  entity_delai_reprise_tonte_apres_arrosage: "number.gazon_intelligent_delai_reprise_tonte_apres_arrosage",
  manual_action_service: "gazon_intelligent.start_manual_irrigation",
  manual_action_label: "Irrigation manuelle",
  tap_action: { action: "more-info" },
  hold_action: { action: "none" },
  double_tap_action: { action: "none" },
};

function createStubConfig() {
  return {
    type: `custom:${CARD_TYPE}`,
    ...DEFAULT_CONFIG,
  };
}

// Public backend/card contract kept intentionally narrow and explicit.
// These entities carry the core decision surface that the card must preserve
// across UI refactors and backend evolutions.
const MINIMAL_PUBLIC_CONTRACT_ENTITY_KEYS = [
  "entity_assistant",
  "entity_prochain_arrosage",
  "entity_prochaine_tonte",
  "entity_prochaine_intervention",
  "entity_signal_irrigation",
  "entity_signal_intervention",
];

const MINIMAL_PUBLIC_CONTRACT_REQUIRED_ATTRIBUTES = {
  entity_assistant: ["action", "status", "reason"],
  entity_prochain_arrosage: ["target_window_label", "next_action", "summary", "block_reason"],
  entity_prochaine_tonte: ["target_display", "block_reason", "reason", "summary"],
  entity_prochaine_intervention: ["recommended_action", "summary", "hint"],
  entity_signal_irrigation: ["reason_kind", "action_label", "summary"],
  entity_signal_intervention: ["recommended_action", "summary"],
};

const TAB_DEFS = [
  { key: "overview", label: "Synthèse", icon: "mdi:view-dashboard" },
  { key: "watering", label: "Irrigation", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "gazon", label: "Gazon", icon: "mdi:grass" },
  { key: "products", label: "Produits", icon: "mdi:package-variant-closed" },
  { key: "intervention", label: "Intervention", icon: "mdi:spray-bottle" },
  { key: "config", label: "Réglages", icon: "mdi:cog-outline" },
];

const ENTITY_KEYS = [
  { key: "entity_assistant", label: "Assistant", icon: "mdi:account-tie-hat-outline", domain: ["sensor"] },
  { key: "entity_fenetre_optimale", label: "Fenêtre d'action", icon: "mdi:clock-outline", domain: ["sensor"] },
  { key: "entity_plan_arrosage", label: "Plan d'irrigation", icon: "mdi:timer-outline", domain: ["sensor"] },
  { key: "entity_arrosage_en_cours", label: "Irrigation en cours", icon: "mdi:progress-clock", domain: ["sensor"] },
  { key: "entity_dernier_arrosage", label: "Dernier arrosage", icon: "mdi:water-check", domain: ["sensor"] },
  { key: "entity_dernier_arrosage_total_zones", label: "Dernier arrosage cumulé", icon: "mdi:water-sync", domain: ["sensor"] },
  { key: "entity_prochain_arrosage", label: "Prochain arrosage", icon: "mdi:clock-water-outline", domain: ["sensor"] },
  { key: "entity_prochaine_tonte", label: "Prochaine tonte", icon: "mdi:calendar-clock", domain: ["sensor"] },
  { key: "entity_derniere_application", label: "Dernière application", icon: "mdi:spray-bottle", domain: ["sensor"] },
  { key: "entity_derniere_action_utilisateur", label: "Dernière exécution", icon: "mdi:gesture-tap-button", domain: ["sensor"] },
  { key: "entity_catalogue_produits", label: "Référentiel produits", icon: "mdi:package-variant-closed", domain: ["sensor"] },
  { key: "entity_produit_intervention", label: "Produit sélectionné", icon: "mdi:package-variant", domain: ["select"] },
  { key: "entity_debug_intervention", label: "Debug métier", icon: "mdi:bug-outline", domain: ["sensor"] },
  { key: "entity_niveau_pertinence", label: "Niveau de pertinence", icon: "mdi:signal", domain: ["sensor"] },
  { key: "entity_prochaine_fenetre_optimale", label: "Prochaine fenêtre optimale", icon: "mdi:clock-outline", domain: ["sensor"] },
  { key: "entity_prochain_blocage_attendu", label: "Prochain blocage attendu", icon: "mdi:alert-circle-outline", domain: ["sensor"] },
  { key: "entity_prochaine_intervention", label: "À préparer", icon: "mdi:spray-bottle", domain: ["sensor"] },
  { key: "entity_conseil", label: "Conseil principal", icon: "mdi:message-text-outline", domain: ["sensor"] },
  { key: "entity_action", label: "Action recommandée", icon: "mdi:check-circle-outline", domain: ["sensor"] },
  { key: "entity_avoid", label: "Action à éviter", icon: "mdi:alert-circle-outline", domain: ["sensor"] },
  { key: "entity_mode", label: "Mode du gazon", icon: "mdi:grass", domain: ["select"] },
  { key: "entity_switch_arrosage_automatique", label: "Irrigation automatique", icon: "mdi:switch", domain: ["switch"] },
  { key: "entity_switch_coordination_tondeuse", label: "Coordination tondeuse", icon: "mdi:robot-mower", domain: ["switch"] },
  { key: "entity_arrosage_apres_application_autorise", label: "Post-application", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_signal_irrigation", label: "Signal irrigation", icon: "mdi:sprinkler", domain: ["binary_sensor"] },
  { key: "entity_tonte_autorisee", label: "Gazon permet la tonte", icon: "mdi:content-cut", domain: ["binary_sensor"] },
  { key: "entity_signal_intervention", label: "Signal intervention", icon: "mdi:spray-bottle", domain: ["binary_sensor"] },
  { key: "entity_phase", label: "Phase dominante", icon: "mdi:grass", domain: ["sensor"] },
  { key: "entity_sous_phase", label: "Sous-phase", icon: "mdi:sprout", domain: ["sensor"] },
  { key: "entity_niveau", label: "Niveau d'action", icon: "mdi:signal", domain: ["sensor"] },
  { key: "entity_tonte", label: "État de tonte", icon: "mdi:content-cut", domain: ["sensor"] },
  { key: "entity_hauteur", label: "Hauteur de tonte conseillée", icon: "mdi:ruler-square", domain: ["sensor"] },
  { key: "entity_arrosage_recommande", label: "Irrigation", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_objectif_arrosage", label: "Objectif d'irrigation", icon: "mdi:water-percent", domain: ["sensor"] },
  { key: "entity_objectif_legacy", label: "Objectif legacy", icon: "mdi:water-minus", domain: ["sensor"] },
  { key: "entity_objectif_depletion", label: "Objectif déplétion", icon: "mdi:water-sync", domain: ["sensor"] },
  { key: "entity_reserve_actuelle", label: "Réserve actuelle", icon: "mdi:cup-water", domain: ["sensor"] },
  { key: "entity_depletion_ratio", label: "Déplétion", icon: "mdi:gauge", domain: ["sensor"] },
  { key: "entity_etat_hydrique", label: "État hydrique", icon: "mdi:water-percent-alert", domain: ["sensor"] },
  { key: "entity_et0", label: "ET0", icon: "mdi:weather-sunny", domain: ["sensor"] },
  { key: "entity_etc", label: "ETc", icon: "mdi:grass", domain: ["sensor"] },
  { key: "entity_type_arrosage", label: "Profil d'irrigation", icon: "mdi:sprinkler", domain: ["sensor"] },
  { key: "entity_risque", label: "Risque gazon", icon: "mdi:shield-alert-outline", domain: ["sensor"] },
  { key: "entity_debit_zone_1", label: "Débit zone 1", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_2", label: "Débit zone 2", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_3", label: "Débit zone 3", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_4", label: "Débit zone 4", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_5", label: "Débit zone 5", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_hauteur_min_tondeuse", label: "Hauteur min tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
  { key: "entity_hauteur_max_tondeuse", label: "Hauteur max tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
  { key: "entity_hauteur_coupe_tondeuse", label: "Hauteur coupe tondeuse", icon: "mdi:ruler-square-compass", domain: ["number"] },
  { key: "entity_delai_reprise_tonte_apres_arrosage", label: "Cooldown tonte après arrosage", icon: "mdi:timer-cog-outline", domain: ["number"] },
];

const SECTION_DEFS = [
  { key: "overview", label: "Synthèse", icon: "mdi:view-dashboard" },
  { key: "watering", label: "Irrigation", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "details", label: "Avancé", icon: "mdi:dots-horizontal" },
];

const SECTION_FIELDS = {
  overview: [
    "entity_assistant",
    "entity_conseil",
    "entity_action",
    "entity_avoid",
    "entity_hauteur",
    "entity_niveau_pertinence",
    "entity_prochaine_fenetre_optimale",
    "entity_prochain_blocage_attendu",
    "entity_arrosage_recommande",
    "entity_arrosage_apres_application_autorise",
    "entity_tonte_autorisee",
    "entity_objectif_arrosage",
    "entity_type_arrosage",
    "entity_mode",
    "entity_fenetre_optimale",
    "entity_plan_arrosage",
    "entity_prochain_arrosage",
    "entity_prochaine_tonte",
    "entity_dernier_arrosage",
    "entity_derniere_application",
    "entity_debug_intervention",
    "entity_prochaine_intervention",
    "entity_switch_arrosage_automatique",
    "entity_switch_coordination_tondeuse",
  ],
  watering: [
    "entity_fenetre_optimale",
    "entity_prochain_arrosage",
    "entity_dernier_arrosage",
    "entity_arrosage_recommande",
    "entity_objectif_arrosage",
    "entity_type_arrosage",
    "entity_arrosage_apres_application_autorise",
    "entity_signal_irrigation",
  ],
  mowing: [
    "entity_tonte",
    "entity_prochaine_tonte",
    "entity_hauteur",
    "entity_tonte_autorisee",
  ],
  details: ENTITY_KEYS.map((field) => field.key),
};

// Accent unique de marque : un seul vert pour tous les onglets (fini l'arc-en-ciel).
// Surchargeable côté thème/config via --gazon-brand-accent.
const BRAND_ACCENT = "#58c27d";
const SECTION_ACCENTS = {
  overview: BRAND_ACCENT,
  watering: BRAND_ACCENT,
  mowing: BRAND_ACCENT,
  products: BRAND_ACCENT,
  details: BRAND_ACCENT,
};

const LEGACY_ENTITY_KEYS = [
  "entity_assistant",
  "entity_conseil",
  "entity_action",
  "entity_avoid",
  "entity_tonte",
  "entity_hauteur",
];

const OVERVIEW_ENTITY_KEYS = new Set([
  ...LEGACY_ENTITY_KEYS,
  "entity_niveau_pertinence",
  "entity_prochaine_fenetre_optimale",
  "entity_prochain_blocage_attendu",
  "entity_arrosage_recommande",
  "entity_arrosage_apres_application_autorise",
  "entity_tonte_autorisee",
  "entity_objectif_arrosage",
  "entity_type_arrosage",
  "entity_mode",
  "entity_fenetre_optimale",
  "entity_plan_arrosage",
  "entity_prochain_arrosage",
  "entity_prochaine_tonte",
  "entity_dernier_arrosage",
  "entity_derniere_application",
  "entity_switch_arrosage_automatique",
  "entity_switch_coordination_tondeuse",
]);

const RENDER_SIGNATURE_ATTRS = {
  entity_assistant: ["action", "moment", "quantity_mm", "status", "reason"],
  entity_fenetre_optimale: [
    "status",
    "summary",
    "watering_cause",
    "next_action",
    "auto_irrigation_enabled",
    "window_reason_summary",
    "watering_window_display",
    "optimal_window_display",
    "evening_window_display",
    "watering_evening_allowed",
    "confidence_score",
    "application_post_watering_status",
    "watering_window_profile",
    "heat_stress_level",
  ],
  entity_niveau_pertinence: ["score", "score_level", "summary", "tone", "source_entity"],
  entity_prochaine_fenetre_optimale: ["source_entity", "source_state", "block_reason", "confidence_score", "phase", "month", "temperature", "summary"],
  entity_prochain_arrosage: ["target_date", "target_display", "target_datetime", "optimal_target_datetime", "target_window", "target_window_label", "next_action", "summary", "objective_mm", "type_arrosage", "watering_cause", "block_reason", "block_reason_label", "confidence_score", "confidence_reasons", "forecast_pluie_j2", "forecast_pluie_3j", "forecast_probabilite_max_3j", "watering_window_display", "optimal_window_display"],
  entity_prochaine_tonte: ["target_date", "target_display", "target_datetime", "target_datetime_display", "action_possible", "tonte_statut", "block_reason", "reason", "summary"],
  entity_prochain_blocage_attendu: ["source_entity", "source_status", "block_reason", "block_label", "confidence_score", "phase", "month", "temperature", "summary"],
  entity_plan_arrosage: ["summary", "duration_human", "zone_count", "objective_mm", "plan_type", "passages", "fractionation", "total_duration_min"],
  entity_arrosage_en_cours: ["active", "started_at_utc", "last_activity_at_utc", "active_zone_count", "zone_count", "progress_percent", "active_zones", "active_zone_labels", "current_passage", "passage_count", "source", "watering_cause"],
  entity_dernier_arrosage: ["source", "date_action", "detected_at", "zone_count", "summary", "watering_cause", "total_mm"],
  entity_derniere_application: ["source", "application_requires_watering_after", "application_post_watering_mm", "application_irrigation_block_hours", "application_irrigation_delay_minutes", "application_block_active", "application_block_remaining_minutes", "application_post_watering_pending", "application_post_watering_delay_remaining_minutes", "application_post_watering_ready", "application_post_watering_remaining_mm", "application_post_watering_status"],
  entity_catalogue_produits: ["products_count", "product_ids", "product_names", "products_summary", "summary"],
  entity_produit_intervention: ["selected_product_id", "selected_product_name", "summary", "products_count"],
  entity_debug_intervention: ["score", "status", "recommended_action", "product_id", "product_name", "summary", "reason", "why_now", "reasons", "constraints", "blocking_constraints", "non_blocking_constraints", "missing_requirements", "context", "ready_to_declare", "selected_product_ready", "ui_summary", "ui_hint"],
  entity_signal_intervention: ["source_entity", "source_status", "recommended_action", "product_id", "product_name", "ready_to_declare", "selected_product_ready", "trigger_kind", "summary"],
  entity_signal_irrigation: ["source_entities", "source_status", "application_post_watering_status", "watering_cause", "type_arrosage", "trigger_kind", "reason_kind", "action_label", "summary", "watering_blocked_by_mower", "watering_block_reason_code", "watering_block_reason_label"],
  entity_prochaine_intervention: [
    "recommended_action",
    "priority",
    "score",
    "reason",
    "why_now",
    "product_id",
    "product_name",
    "ready_to_declare",
    "selected_product_ready",
    "month_match",
    "current_phase",
    "current_month",
    "opportunity_level",
    "summary",
    "hint",
    "action_label",
  ],
  entity_conseil: ["action_recommandee", "action_a_eviter", "niveau_action", "niveau_action_hydrique", "fenetre_optimale", "risque_gazon", "objectif_mm", "type_arrosage", "watering_cause", "summary"],
  entity_objectif_arrosage: [
    "temperature",
    "etp",
    "phase_active",
    "phase_dominante",
    "sous_phase",
    "hydric_balance_level",
    "hydric_strategy",
    "hydric_state",
    "reserve_actuelle_mm",
    "reserve_stock_mm",
    "reserve_stock_max_mm",
    "reserve_surplus_mm",
    "reserve_fill_ratio",
    "reserve_available_ratio",
    "reserve_minimale_mm",
    "depletion_mm",
    "depletion_ratio",
    "depletion_allowed_mm",
    "mad_ratio",
    "et0_mm",
    "et0_source",
    "kc_gazon",
    "etc_mm",
  ],
  entity_arrosage_recommande: ["objectif_mm", "type_arrosage", "watering_cause", "watering_blocked_by_mower", "watering_block_reason_code", "watering_block_reason_label"],
  entity_arrosage_apres_application_autorise: ["application_requires_watering_after", "application_post_watering_mm", "application_irrigation_block_hours", "application_irrigation_delay_minutes", "application_block_active", "application_block_remaining_minutes", "application_post_watering_pending", "application_post_watering_delay_remaining_minutes", "application_post_watering_ready", "application_post_watering_remaining_mm", "application_post_watering_status"],
  entity_tonte: ["tondeuse_statut", "tondeuse_statut_libelle", "tondeuse_prete", "tondeuse_batterie", "tondeuse_prochain_depart_display", "tondeuse_hauteur_coupe_mm", "mower_coordination_enabled", "mower_coordination_ready", "mower_presence_state", "mower_presence_label", "mower_operation_state", "mower_operation_label", "mower_is_docked", "mower_is_outside", "mower_is_safe_for_watering", "mower_reason_code", "mower_reason_label", "mowing_blocked_by_watering", "mowing_block_reason_code", "mowing_block_reason_label", "mowing_cooldown_remaining_minutes", "mowing_post_application_active", "gazon_permet_tonte", "machine_permet_tonte", "action_possible"],
  entity_tonte_autorisee: ["phase_active", "tonte_statut", "niveau_action", "fenetre_optimale", "risque_gazon", "hauteur_tonte_recommandee_cm", "hauteur_tonte_min_cm", "hauteur_tonte_max_cm", "tondeuse_statut", "tondeuse_statut_libelle", "tondeuse_prete", "tondeuse_batterie", "tondeuse_prochain_depart_display", "tondeuse_hauteur_coupe_mm", "mower_coordination_enabled", "mower_coordination_ready", "mower_presence_state", "mower_presence_label", "mower_operation_state", "mower_operation_label", "mower_is_docked", "mower_is_outside", "mower_is_safe_for_watering", "mower_reason_code", "mower_reason_label", "mowing_blocked_by_watering", "mowing_block_reason_code", "mowing_block_reason_label", "mowing_cooldown_remaining_minutes", "mowing_post_application_active", "gazon_permet_tonte", "machine_permet_tonte", "action_possible"],
  entity_niveau: ["niveau_action_hydrique"],
  entity_sous_phase: ["sous_phase_progression", "sous_phase_detail"],
  entity_phase: ["phase_dominante_source", "pluie_demain_source"],
  entity_et0: ["et0_source", "temperature", "forecast_temperature_today", "temperature_reference_hydrique"],
  entity_etc: ["et0_mm", "kc_gazon", "phase_dominante", "sous_phase"],
  entity_reserve_actuelle: ["reserve_utile_mm", "reserve_stock_mm", "reserve_stock_max_mm", "reserve_surplus_mm", "reserve_fill_ratio", "reserve_available_ratio", "reserve_minimale_mm", "depletion_mm", "depletion_ratio", "hydric_state"],
  entity_depletion_ratio: ["depletion_ratio_raw", "hydric_state"],
  entity_etat_hydrique: ["reserve_actuelle_mm", "reserve_stock_mm", "reserve_stock_max_mm", "reserve_surplus_mm", "reserve_fill_ratio", "reserve_available_ratio", "reserve_minimale_mm", "depletion_mm", "depletion_ratio", "hydric_state"],
  entity_objectif_legacy: ["objectif_mm", "mm_final_recommande", "use_depletion_logic", "type_arrosage", "comparison_mode"],
  entity_objectif_depletion: ["reserve_actuelle_mm", "reserve_stock_mm", "reserve_stock_max_mm", "reserve_surplus_mm", "reserve_fill_ratio", "reserve_available_ratio", "reserve_minimale_mm", "depletion_mm", "depletion_ratio", "use_depletion_logic", "comparison_mode"],
  entity_weather: ["temperature", "dew_point", "humidity", "uv_index", "pressure", "wind_speed", "wind_bearing", "precipitation"],
  entity_hauteur: ["hauteur_tonte_min_cm", "hauteur_tonte_max_cm", "tondeuse_statut", "tondeuse_statut_libelle", "tondeuse_hauteur_coupe_mm"],
  entity_switch_coordination_tondeuse: [],
  entity_delai_reprise_tonte_apres_arrosage: [],
};

const STATUS_COLORS = {
  danger: "#f15f69",
  warning: "#f3ba4b",
  success: "#4fc38c",
  neutral: "#7a8c9d",
  accent: "#49cfd0",
  critical: "#ff4d78",
};

const STATUS_LABELS = {
  auto: "Auto",
  hydrique: "Hydrique",
  recommended: "Recommandé",
  possible: "À préparer",
  ready: "Prêt à déclarer",
  blocked: "Bloqué",
  unavailable: "Non disponible",
  en_attente: "En attente",
  action_required: "Action requise",
  bloque: "Bloqué",
  attendre: "Attendre",
  maintenant: "Maintenant",
  ce_matin: "Ce matin",
  demain_matin: "Demain matin",
  apres_pluie: "Après la pluie",
  no_need: "Aucun besoin",
  waiting: "Attendre",
  post_application: "Post-produit",
  application_technique: "Arrosage post-produit",
  application_technique_auto: "Arrosage post-produit auto",
  aucune_action: "Aucune action",
  hydric_need: "Besoin hydrique",
  plein: "Plein",
  excédentaire: "Excédentaire",
  a_faire: "À faire",
  a_surveiller: "À surveiller",
  autorisee: "Autorisée",
  autorise: "Autorisé",
  autorisee_avec_precaution: "Autorisée avec précaution",
  interdite: "Interdite",
  deconseillee: "Déconseillée",
  non_requis: "Non requis",
  non_autorise: "Non autorisé",
  indisponible: "Non disponible",
  critique: "Critique",
  modere: "Modéré",
  faible: "Faible",
  normal: "Normal",
  enracinement: "Enracinement",
  manuel_frequent: "Manuel fréquent",
};

const WEATHER_LABELS = {
  "clear-night": "Nuit claire",
  cloudy: "Nuageux",
  exceptional: "Exceptionnel",
  fog: "Brumeux",
  hail: "Grêle",
  lightning: "Orageux",
  "lightning-rainy": "Orageux",
  partlycloudy: "Partiellement nuageux",
  pouring: "Averses",
  rainy: "Pluvieux",
  snowy: "Neigeux",
  "snowy-rainy": "Neige et pluie",
  sunny: "Ensoleillé",
  windy: "Venteux",
  "windy-variant": "Venteux",
};



function isEmpty(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function isUnavailableState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "" || normalized === "unknown" || normalized === "unavailable" || normalized === "none";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value, digits = 1) {
  const number = asNumber(value);
  if (number === null) {
    return null;
  }
  const maximumFractionDigits = Math.max(0, Number.isFinite(digits) ? Math.floor(digits) : 0);
  const minimumFractionDigits = Math.min(maximumFractionDigits, Number.isInteger(number) ? 0 : 1);
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(number);
}

function formatCm(value) {
  const formatted = formatNumber(value, 1);
  return formatted === null ? "—" : `${formatted} cm`;
}

function formatMm(value) {
  const number = asNumber(value);
  if (number === null) {
    return "—";
  }
  if (number <= 0) {
    return "Non requis";
  }
  const formatted = formatNumber(number, 1);
  return `${formatted} mm`;
}

function formatRecommendationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Recommandée";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non requise";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function formatAuthorizationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Autorisé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non autorisé";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function formatStateLabel(value) {
  if (isEmpty(value)) {
    return "Non disponible";
  }
  const normalized = String(value).trim().toLowerCase();
  const labels = typeof STATUS_LABELS !== "undefined" && STATUS_LABELS ? STATUS_LABELS : {};
  if (labels[normalized]) {
    return labels[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Non disponible";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function formatWeatherConditionLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Météo";
  }
  const labels = typeof WEATHER_LABELS !== "undefined" && WEATHER_LABELS ? WEATHER_LABELS : {};
  if (labels[normalized]) {
    return labels[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Météo";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function weatherIconForState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "mdi:weather-partly-cloudy";
  }
  if (normalized.includes("lightning")) {
    return "mdi:weather-lightning-rainy";
  }
  if (normalized.includes("pour")) {
    return "mdi:weather-pouring";
  }
  if (normalized.includes("rain")) {
    return "mdi:weather-rainy";
  }
  if (normalized.includes("snow")) {
    return "mdi:weather-snowy";
  }
  if (normalized.includes("fog")) {
    return "mdi:weather-fog";
  }
  if (normalized.includes("wind")) {
    return "mdi:weather-windy";
  }
  if (normalized.includes("cloud")) {
    return normalized.includes("partly") ? "mdi:weather-partly-cloudy" : "mdi:weather-cloudy";
  }
  if (normalized.includes("clear") || normalized.includes("sun")) {
    return "mdi:weather-sunny";
  }
  return "mdi:weather-partly-cloudy";
}

function weatherToneForState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "neutral";
  }
  if (normalized.includes("lightning") || normalized.includes("pour") || normalized.includes("rain") || normalized.includes("snow")) {
    return "warning";
  }
  if (normalized.includes("sun") || normalized.includes("clear")) {
    return "success";
  }
  return "neutral";
}

function normalizeDisplayValue(value) {
  if (isUnavailableState(value)) {
    return "Non disponible";
  }
  return String(value);
}

function computeTonteTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("interdit")) {
    return "danger";
  }
  if (normalized.includes("autor") || normalized.includes("possible")) {
    return "success";
  }
  if (normalized.includes("surveil") || normalized.includes("prud")) {
    return "warning";
  }
  return "neutral";
}

function computeRisqueTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("crit")) {
    return "critical";
  }
  if (normalized.includes("eleve") || normalized.includes("élev")) {
    return "danger";
  }
  if (normalized.includes("moyen")) {
    return "warning";
  }
  if (normalized.includes("faible")) {
    return "success";
  }
  return "neutral";
}

function computeActionTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("crit")) {
    return "critical";
  }
  if (normalized.includes("a_faire") || normalized.includes("à faire")) {
    return "warning";
  }
  if (normalized.includes("aucune")) {
    return "success";
  }
  if (normalized.includes("surve")) {
    return "accent";
  }
  return "neutral";
}

function phaseTone(value) {
  if (isEmpty(value)) {
    return "neutral";
  }
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("sursem")) {
    return "warning";
  }
  if (normalized.includes("trait")) {
    return "danger";
  }
  if (normalized.includes("hivern")) {
    return "neutral";
  }
  if (normalized.includes("fert")) {
    return "accent";
  }
  return "success";
}

function toneToColor(tone) {
  const colors = typeof STATUS_COLORS !== "undefined" && STATUS_COLORS ? STATUS_COLORS : { neutral: "#7a8c9d" };
  return colors[tone] || colors.neutral;
}

function sectionToAccent(section) {
  return (
    {
      overview: "#58c27d",
      watering: "#31b8d4",
      mowing: "#97c84b",
      details: "#7b8da0",
    }[section] || "#58c27d"
  );
}

function splitServiceName(service) {
  const parts = String(service ?? "").split(".");
  if (parts.length !== 2) {
    return null;
  }
  return { domain: parts[0], service: parts[1] };
}

function mergeConfig(base, update) {
  return { ...base, ...update };
}

function normalizeConfig(config) {
  return { ...config };
}

function domainMatches(entity, acceptedDomains) {
  if (!acceptedDomains || acceptedDomains.length === 0) {
    return true;
  }
  const domain = String(entity?.entity_id ?? "").split(".")[0];
  return acceptedDomains.includes(domain);
}

function formatDurationHuman(totalMinutes) {
  const number = asNumber(totalMinutes);
  if (number === null || number <= 0) {
    return "0 min";
  }
  const totalSeconds = Math.max(0, Math.round(number * 60));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds === 0) {
    return `${minutes} min`;
  }
  return `${minutes} min ${String(seconds).padStart(2, "0")}`;
}

function humanDateTimeText(value) {
  if (isEmpty(value)) {
    return "";
  }
  const parsed = Date.parse(String(value).trim());
  if (!Number.isFinite(parsed)) {
    return String(value).trim();
  }
  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(parsed));
  } catch (_error) {
    return String(value).trim();
  }
}

function formatPlanType(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized || normalized === "no_plan") {
    return "Aucun plan";
  }
  if (normalized === "single_zone") {
    return "Zone unique";
  }
  if (normalized === "multi_zone") {
    return "Multi-zone";
  }
  return String(value);
}

function formatApplicationMode(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Non disponible";
  }
  if (normalized === "auto") {
    return "Auto";
  }
  if (normalized === "manuel" || normalized === "manual") {
    return "Manuel";
  }
  if (normalized === "suggestion") {
    return "Suggestion";
  }
  return formatStateLabel(value);
}

function formatWateringCauseLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Cause non disponible";
  }
  if (normalized === "post_application") {
    return "Post-produit";
  }
  if (normalized === "hydrique") {
    return "Hydrique";
  }
  return formatStateLabel(value);
}

function formatWateringTypeLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Non disponible";
  }
  if (normalized === "application_technique_auto") {
    return "Arrosage post-produit auto";
  }
  if (normalized === "application_technique") {
    return "Arrosage post-produit";
  }
  return formatStateLabel(value);
}

function formatIrrigationSignalLabel({ actionLabel, summary, reasonKind } = {}) {
  const normalizedAction = String(actionLabel ?? "").trim();
  if (normalizedAction) {
    return normalizedAction;
  }
  const normalizedSummary = String(summary ?? "").trim();
  if (normalizedSummary) {
    return normalizedSummary;
  }
  const normalizedReason = String(reasonKind ?? "").trim().toLowerCase();
  if (normalizedReason === "blocked") {
    return "Irrigation bloquée";
  }
  if (normalizedReason === "waiting") {
    return "Attendre";
  }
  if (["post_application", "hydric_need"].includes(normalizedReason)) {
    return "Irrigation prête";
  }
  return "Signal irrigation";
}

function formatIrrigationSignalTone({ reasonKind, triggerKind } = {}) {
  const normalizedReason = String(reasonKind ?? "").trim().toLowerCase();
  const normalizedTrigger = String(triggerKind ?? "").trim().toLowerCase();
  if (normalizedReason === "blocked") {
    return "danger";
  }
  if (normalizedReason === "waiting") {
    return "warning";
  }
  if (["post_application", "hydric_need"].includes(normalizedReason)) {
    return "success";
  }
  if (["recommended", "ready", "post_application", "hydrique"].includes(normalizedTrigger)) {
    return "success";
  }
  if (normalizedTrigger === "soft") {
    return "warning";
  }
  return "neutral";
}

const MOWER_REASON_LABELS = {
  mower_mowing: "Tondeuse en cours de tonte",
  mowing: "Tondeuse en cours de tonte",
  mower_returning: "Tondeuse en retour station",
  returning: "Tondeuse en retour station",
  mower_not_stowed: "Tondeuse non rangée",
  not_stowed: "Tondeuse non rangée",
  mower_unreliable: "Coordination tondeuse indisponible",
  unreliable: "Coordination tondeuse indisponible",
  ambiguous: "Tondeuse ambiguë: plusieurs robots détectés, configuration requise",
  mower_ambiguous: "Tondeuse ambiguë: plusieurs robots détectés, configuration requise",
  missing: "Tondeuse manquante",
  mower_missing: "Tondeuse manquante",
  configured_missing: "Tondeuse configurée introuvable",
  mower_configured_missing: "Tondeuse configurée introuvable",
  error: "Tondeuse en erreur",
  disconnected: "Tondeuse indisponible",
};

function formatMowerReasonLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Aucune contrainte tondeuse";
  }
  if (MOWER_REASON_LABELS[normalized]) {
    return MOWER_REASON_LABELS[normalized];
  }
  return formatStateLabel(value);
}

const MOWING_BLOCK_REASON_LABELS = {
  post_application_active: "Post-produit actif",
  watering_in_progress: "Arrosage en cours",
  watering_cooldown: "Cooldown tonte après arrosage",
  phase_sursemis: "Phase Sursemis",
  phase_traitement: "Phase Traitement",
  phase_hivernage: "Phase Hivernage",
  mowing_spacing: "Espacement tonte",
  recent_watering: "Arrosage récent",
  wet_grass: "Herbe mouillée",
  rosee_persistante: "Rosée persistante",
  soil_wet: "Sol humide",
  machine_unavailable: "Machine indisponible",
};

function formatMowingBlockReason(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Aucun blocage";
  }
  if (MOWING_BLOCK_REASON_LABELS[normalized]) {
    return MOWING_BLOCK_REASON_LABELS[normalized];
  }
  return formatStateLabel(value);
}

function formatStatusLabel(status) {
  return formatStateLabel(status);
}

function sanitizePublicDecisionText(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }
  return text
    .replace(
      /\s*\((?=[^)]*(?:phase=|meteo[_a-z0-9-]*|espacement=|forecast_|source_entity=|source_status=|trigger_kind=|reason_kind=|runtime_probe=))[^)]*\)\s*$/i,
      "",
    )
    .replace(/\s+[·•]\s*$/u, "")
    .trim();
}

function compactDecisionText(value, { maxLength = 140, preferFirstSentence = true } = {}) {
  const text = sanitizePublicDecisionText(value);
  if (!text) {
    return "";
  }
  if (preferFirstSentence) {
    const firstSentence = text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim();
    if (firstSentence && firstSentence.length <= maxLength) {
      return firstSentence;
    }
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function iconForField(field) {
  if (!field) {
    return "mdi:information-outline";
  }
  if (typeof field === "object") {
    if (field.icon) {
      return String(field.icon);
    }
    if (field.key) {
      return iconForField(field.key);
    }
  }
  const key = String(field ?? "").trim();
  if (!key) {
    return "mdi:information-outline";
  }
  const keys = typeof ENTITY_KEYS !== "undefined" && Array.isArray(ENTITY_KEYS) ? ENTITY_KEYS : [];
  const match = keys.find((entry) => entry.key === key);
  return String(match?.icon || "mdi:information-outline");
}

const PRODUCT_USAGE_MODE_LABELS = {
  preventif: "Préventif",
  curatif: "Curatif",
  entretien: "Entretien",
  rattrapage: "Rattrapage",
};

function formatProductUsageMode(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  return PRODUCT_USAGE_MODE_LABELS[normalized] || formatStateLabel(value);
}

function formatProductAnnualLimit(value) {
  const number = asNumber(value);
  if (number === null || number <= 0) {
    return null;
  }
  const limit = Math.max(1, Math.floor(number));
  return `${limit}/an`;
}

const MONTH_LABELS = {
  1: "Janvier",
  2: "Février",
  3: "Mars",
  4: "Avril",
  5: "Mai",
  6: "Juin",
  7: "Juillet",
  8: "Août",
  9: "Septembre",
  10: "Octobre",
  11: "Novembre",
  12: "Décembre",
};

function formatMonthLabel(value) {
  const number = asNumber(value);
  if (number === null) {
    return isUnavailableState(value) ? "Non disponible" : String(value ?? "").trim() || "Non disponible";
  }
  const month = Math.trunc(number);
  return MONTH_LABELS[month] || String(month);
}

function renderIconBoxFallback(icon, size = "md") {
  if (!icon) {
    return "";
  }
  const sizeClass = size === "sm" ? "gi-icon--sm" : size === "pill" ? "gi-icon--pill" : "";
  const iconSize = size === "sm" ? "13px" : size === "pill" ? "14px" : "16px";
  return `<span class="gi-icon ${sizeClass}"><ha-icon style="--mdc-icon-size:${iconSize};" icon="${escapeHtml(icon)}"></ha-icon></span>`;
}

function renderStatusPillFallback(text, tone = "neutral", icon = null, extraClass = "") {
  const classes = ["gi-pill", "gi-pill--status", `gi-pill--${tone}`];
  if (extraClass) {
    classes.push(extraClass);
  }
  const iconHtml = icon ? `<span class="gi-pill__icon">${renderIconBoxFallback(icon, "pill")}</span>` : "";
  return `
    <div class="${classes.join(" ")}">
      ${iconHtml}
      <div class="gi-pill__content">
        <span class="gi-pill__value">${escapeHtml(text)}</span>
      </div>
    </div>
  `;
}

function monthLabelFallback(value) {
  const number = asNumber(value);
  if (number === null) {
    return isUnavailableState(value) ? "Non disponible" : String(value ?? "").trim() || "Non disponible";
  }
  const month = Math.trunc(number);
  return MONTH_LABELS[month] || String(month);
}

function weatherConditionLabelFallback(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Météo";
  }
  const labels = typeof WEATHER_LABELS !== "undefined" && WEATHER_LABELS ? WEATHER_LABELS : {};
  if (labels[normalized]) {
    return labels[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Météo";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function safeRenderIconBox(icon, size = "md") {
  if (typeof renderIconBox === "function") {
    return renderIconBox(icon, size);
  }
  return renderIconBoxFallback(icon, size);
}

function safeRenderStatusPill(text, tone = "neutral", icon = null, extraClass = "") {
  if (typeof renderStatusPill === "function") {
    return renderStatusPill(text, tone, icon, extraClass);
  }
  return renderStatusPillFallback(text, tone, icon, extraClass);
}

function safeFormatMonthLabel(value) {
  if (typeof formatMonthLabel === "function") {
    return formatMonthLabel(value);
  }
  return monthLabelFallback(value);
}

function safeFormatWeatherConditionLabel(value) {
  if (typeof formatWeatherConditionLabel === "function") {
    return formatWeatherConditionLabel(value);
  }
  return weatherConditionLabelFallback(value);
}

const INTERVENTION_STATUS_PRESENTATIONS = {
  recommended: {
    title: "Recommandé",
    badge: "Recommandé",
    tone: "success",
    icon: "mdi:spray-bottle",
    summary: "Recommandé",
    hint: "La prochaine intervention est prête à être déclarée.",
    actionLabel: "Déclarer maintenant",
    selectionSummary: "Produit sélectionné",
    selectionHint: "Le produit sélectionné alimente la déclaration.",
    declarationSummary: "Prêt à déclarer",
    declarationHint: "La déclaration peut être lancée maintenant.",
    historySummary: "Dernière application",
    historyHint: "Historique local des applications enregistrées.",
  },
  possible: {
    title: "À préparer",
    badge: "À préparer",
    tone: "warning",
    icon: "mdi:spray-bottle",
    summary: "À préparer",
    hint: "La prochaine intervention est à préparer.",
    actionLabel: "Choisir le produit",
    selectionSummary: "Produit à sélectionner",
    selectionHint: "Le produit sélectionné alimente la déclaration.",
    declarationSummary: "À préparer",
    declarationHint: "La déclaration n’est pas encore prête.",
    historySummary: "Dernière application",
    historyHint: "Historique local des applications enregistrées.",
  },
  preparation: {
    title: "À envisager",
    badge: "À envisager",
    tone: "warning",
    icon: "mdi:spray-bottle",
    summary: "À envisager",
    hint: "La prochaine intervention reste possible, mais le contexte actuel limite sa pertinence.",
    actionLabel: "Choisir le produit",
    selectionSummary: "Produit à sélectionner",
    selectionHint: "Le produit peut être préparé, mais la recommandation reste prudente.",
    declarationSummary: "À envisager",
    declarationHint: "La déclaration n’est pas encore prioritaire dans le contexte actuel.",
    historySummary: "Dernière application",
    historyHint: "Historique local des applications enregistrées.",
  },
  ready: {
    title: "Prêt à déclarer",
    badge: "Prêt à déclarer",
    tone: "success",
    icon: "mdi:spray-bottle",
    summary: "Prêt à déclarer",
    hint: "Le produit peut être déclaré maintenant.",
    actionLabel: "Déclarer",
    selectionSummary: "Produit sélectionné",
    selectionHint: "Le produit sélectionné est prêt à être confirmé.",
    declarationSummary: "Prêt à déclarer",
    declarationHint: "La déclaration peut être lancée maintenant.",
    historySummary: "Dernière application",
    historyHint: "Historique local des applications enregistrées.",
  },
  blocked: {
    title: "Bloqué",
    badge: "Bloqué",
    tone: "danger",
    icon: "mdi:cancel",
    summary: "Bloqué",
    hint: "Une contrainte bloque la prochaine intervention.",
    actionLabel: "Attendre",
    selectionSummary: "Produit sélectionné",
    selectionHint: "La sélection reste disponible, mais la déclaration est bloquée.",
    declarationSummary: "Bloqué",
    declarationHint: "Une contrainte bloque la déclaration.",
    historySummary: "Dernière application",
    historyHint: "Historique local des applications enregistrées.",
  },
  unavailable: {
    title: "Non disponible",
    badge: "Non disponible",
    tone: "neutral",
    icon: "mdi:package-variant-closed",
    summary: "Non disponible",
    hint: "Aucun statut exploitable n’est disponible.",
    actionLabel: "Non disponible",
    selectionSummary: "Aucun produit disponible",
    selectionHint: "Sélectionne un produit dans la liste pour préparer la déclaration.",
    declarationSummary: "Non disponible",
    declarationHint: "Aucune recommandation n’est disponible pour l’instant.",
    historySummary: "Dernière application",
    historyHint: "Historique local des applications enregistrées.",
  },
};

function formatInterventionStatusPresentation(status) {
  const normalized = String(status ?? "").trim().toLowerCase();
  if (normalized === "recommended") {
    return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.recommended };
  }
  if (normalized === "possible") {
    return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.possible };
  }
  if (normalized === "preparation") {
    return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.preparation };
  }
  if (normalized === "ready") {
    return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.ready };
  }
  if (normalized === "blocked") {
    return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.blocked };
  }
  if (normalized === "unavailable" || normalized === "non_disponible") {
    return { status: normalized || "unavailable", ...INTERVENTION_STATUS_PRESENTATIONS.unavailable };
  }
  return { status: normalized || "unavailable", ...INTERVENTION_STATUS_PRESENTATIONS.unavailable };
}

const POST_APPLICATION_STATUS_PRESENTATIONS = {
  autorise: { label: "Autorisé", tone: "success", active: true, kind: "autorise" },
  en_attente: { label: "En attente", tone: "warning", active: false, kind: "en_attente" },
  bloque: { label: "Bloqué", tone: "danger", active: false, kind: "bloque" },
  non_requis: { label: "Non requis", tone: "neutral", active: false, kind: "non_requis" },
  non_autorise: { label: "Non autorisé", tone: "danger", active: false, kind: "non_autorise" },
  indisponible: { label: "Non disponible", tone: "neutral", active: false, kind: "unavailable" },
  non_disponible: { label: "Non disponible", tone: "neutral", active: false, kind: "unavailable" },
};

function formatPostApplicationStatusPresentation(status) {
  const normalized = String(status ?? "").trim().toLowerCase();
  return POST_APPLICATION_STATUS_PRESENTATIONS[normalized] || POST_APPLICATION_STATUS_PRESENTATIONS.indisponible;
}

const WATERING_BLOCK_REASON_LABELS = {
  sol_deja_humide: "Sol déjà humide",
  cooldown_24h: "Délai de 24 h",
  pluie_proche: "Pluie proche",
  pluie_significative: "Pluie significative",
  pluie: "Pluie",
  application: "Bloc application",
  post_application: "Bloc post-application",
  temperature: "Température",
  meteorologie: "Météo",
  meteo: "Météo",
  weather: "Météo",
  mower_mowing: "Tondeuse en cours de tonte",
  mower_returning: "Tondeuse en retour station",
  mower_not_stowed: "Tondeuse non rangée",
  mower_unreliable: "Coordination tondeuse indisponible",
};

function formatWateringBlockReason(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Blocage";
  }
  if (WATERING_BLOCK_REASON_LABELS[normalized]) {
    return WATERING_BLOCK_REASON_LABELS[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Blocage";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function formatSwitchState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Autorisé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Désactivé";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function statusTone(status) {
  const normalized = String(status ?? "").trim().toLowerCase();
  if (normalized === "bloque") {
    return "danger";
  }
  if (normalized === "en_attente") {
    return "warning";
  }
  if (normalized === "auto") {
    return "success";
  }
  return "neutral";
}

function formatHydricUxState({ depletionRatio, reserveStock, reserveStockMax, reserveActuelle, reserveUsefulMax }) {
  const stock = asNumber(reserveStock);
  const stockMax = asNumber(reserveStockMax);
  const useful = asNumber(reserveActuelle);
  const usefulMax = asNumber(reserveUsefulMax);
  const depletion = asNumber(depletionRatio);
  const fillRatio = stock !== null && stockMax !== null && stockMax > 0
    ? Math.max(0, Math.min(1, stock / stockMax))
    : useful !== null && usefulMax !== null && usefulMax > 0
      ? Math.max(0, Math.min(1, useful / usefulMax))
      : depletion !== null
        ? Math.max(0, Math.min(1, 1 - depletion))
        : null;
  if (fillRatio === null) return { label: "Lecture hydrique", tone: "neutral", fillRatio: null };
  if (fillRatio >= 0.9) return { label: "Plein", tone: "success", fillRatio };
  if (fillRatio >= 0.7) return { label: "Confort", tone: "success", fillRatio };
  if (fillRatio >= 0.45) return { label: "Surveillance", tone: "warning", fillRatio };
  if (fillRatio >= 0.2) return { label: "Stress", tone: "danger", fillRatio };
  return { label: "Critique", tone: "critical", fillRatio };
}



function renderIconBox(icon, size = "md") {
  if (!icon) {
    return "";
  }
  const sizeClass = size === "sm" ? "gi-icon--sm" : size === "pill" ? "gi-icon--pill" : "";
  const iconSize = size === "sm" ? "13px" : size === "pill" ? "14px" : "16px";
  return `<span class="gi-icon ${sizeClass}"><ha-icon style="--mdc-icon-size:${iconSize};" icon="${escapeHtml(icon)}"></ha-icon></span>`;
}

function renderPillIcon(icon) {
  if (!icon) {
    return "";
  }
  return `<span class="gi-pill__icon">${safeRenderIconBox(icon, "pill")}</span>`;
}

function renderPillContent({ label = "", value = "", compact = false }) {
  if (compact) {
    return `<span class="gi-pill__value">${escapeHtml(value)}</span>`;
  }
  return `
    <span class="gi-pill__label">${escapeHtml(label)}</span>
    <span class="gi-pill__value">${escapeHtml(value)}</span>
  `;
}

function renderPill({
  label = "",
  value = "",
  tone = "neutral",
  icon = null,
  compact = false,
  extraClass = "",
}) {
  const classes = ["gi-pill", compact ? "gi-pill--status" : "gi-pill--context", `gi-pill--${tone}`];
  if (extraClass) {
    classes.push(extraClass);
  }
  return `
    <div class="${classes.join(" ")}">
      ${renderPillIcon(icon)}
      <div class="gi-pill__content">
        ${renderPillContent({ label, value, compact })}
      </div>
    </div>
  `;
}

function renderCardCore({
  kind,
  label,
  value,
  tone = "neutral",
  icon = null,
  iconSize = "md",
  secondary = "",
  interactive = false,
  style = "",
}) {
  const classes = ["gi-card-core", `gi-card-core--${kind}`];
  if (tone) {
    classes.push(`gi-card-core--${tone}`);
  }
  if (interactive) {
    classes.push("gi-card-core--interactive");
  }
  const iconHtml = icon ? safeRenderIconBox(icon, iconSize) : "";
  const secondaryValue = isEmpty(secondary) ? "&nbsp;" : escapeHtml(secondary);
  const affordanceHtml = interactive
    ? `<div class="gi-card-core__affordance" aria-hidden="true">${safeRenderIconBox("mdi:chevron-right", "sm")}</div>`
    : "";
  return `
    <section class="${classes.join(" ")}"${style ? ` style="${escapeHtml(style)}"` : ""}>
      <div class="gi-card-core__icon ${iconHtml ? "" : "gi-card-core__icon--empty"}">
        ${iconHtml || ""}
      </div>
      <div class="gi-card-core__content">
        <div class="gi-card-core__label">${escapeHtml(label)}</div>
        <div class="gi-card-core__value">${escapeHtml(value)}</div>
        <div class="gi-card-core__secondary ${isEmpty(secondary) ? "gi-card-core__secondary--empty" : ""}">${secondaryValue}</div>
      </div>
      ${affordanceHtml}
    </section>
  `;
}

function renderStatusPill(text, tone = "neutral", icon = null, extraClass = "") {
  return renderPill({ value: text, tone, icon, compact: true, extraClass });
}



function normalizeOptionalDisplayValue(value) {
  const normalized = normalizeDisplayValue(value);
  return normalized === "Non disponible" ? "" : normalized;
}


// Shared constants are imported from ./constants.js.

class GazonIntelligentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._lastRenderSignature = null;
    this._activeTab = "overview";
    this._activeSection = "overview";
    this._wateringProgressTimer = null;
    this._cardActionTimer = null;
    this._holdActionTimer = null;
    this._holdActionTriggered = false;
    this._pendingInterventionSelection = null;
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onPointerCancel = this._onPointerCancel.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  static getStubConfig() {
    return createStubConfig();
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "show_header", selector: { boolean: {} } },
        { name: "show_icons", selector: { boolean: {} } },
        { name: "show_background", selector: { boolean: {} } },
        { name: "minimal_mode", selector: { boolean: {} } },
        { name: "show_secondary_info", selector: { boolean: {} } },
        { name: "show_advanced_details", selector: { boolean: {} } },
        { name: "tap_action", selector: { action: {} } },
        { name: "hold_action", selector: { action: {} } },
        { name: "double_tap_action", selector: { action: {} } },
        { name: "theme_mode", selector: { select: { options: ["auto", "light", "dark"] } } },
        { name: "accent_color", selector: { text: {} } },
        { name: "icon_size", selector: { number: { min: 16, mode: "box", step: 1 } } },
        { name: "border_radius", selector: { number: { min: 0, mode: "box", step: 1 } } },
        { name: "background_style", selector: { select: { options: ["solid", "glass", "minimal"] } } },
        { name: "entity_assistant", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_weather", selector: { entity: { domain: ["weather"] } } },
        { name: "entity_plan_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage_total_zones", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochain_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochaine_tonte", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_application", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_action_utilisateur", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_catalogue_produits", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_produit_intervention", selector: { entity: { domain: ["select"] } } },
        { name: "entity_prochaine_intervention", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_conseil", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_action", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_avoid", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_niveau_pertinence", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochaine_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochain_blocage_attendu", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_mode", selector: { entity: { domain: ["select"] } } },
        { name: "entity_switch_arrosage_automatique", selector: { entity: { domain: ["switch"] } } },
        { name: "entity_switch_coordination_tondeuse", selector: { entity: { domain: ["switch"] } } },
        { name: "entity_arrosage_recommande", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_arrosage_apres_application_autorise", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_debug_intervention", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_signal_irrigation", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_tonte_autorisee", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_signal_intervention", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_objectif_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_objectif_legacy", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_objectif_depletion", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_reserve_actuelle", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_depletion_ratio", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_etat_hydrique", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_et0", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_etc", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_type_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_phase", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_sous_phase", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_risque", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_niveau", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_arrosage_en_cours", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_debit_zone_1", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_2", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_3", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_4", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_5", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_min_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_max_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_coupe_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_delai_reprise_tonte_apres_arrosage", selector: { entity: { domain: ["number"] } } },
        { name: "entity_tonte", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_hauteur", selector: { entity: { domain: ["sensor"] } } },
        { name: "manual_action_service", selector: { text: {} } },
        { name: "manual_action_label", selector: { text: {} } },
      ],
    };
  }

  setConfig(config) {
    if (!config || config.type !== `custom:${CARD_TYPE}`) {
      throw new Error(`Invalid configuration for ${CARD_NAME}.`);
    }
    this._clearWateringProgressTimer();
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, config));
    this._lastRenderSignature = null;
    this._activeTab = "overview";
    this._activeSection = "overview";
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._syncPendingInterventionSelection();
    this._render();
  }

  getCardSize() {
    if (!this._config) {
      return 6;
    }
    if (this._isMinimalMode()) {
      return this._config.show_header ? 4 : 3;
    }
    let size = 8;
    if (!this._config.show_header) {
      size -= 1;
    }
    if (this._config.show_advanced_details) {
      size += 3;
    }
    return Math.max(4, size);
  }

  getGridOptions() {
    const size = this.getCardSize();
    const rows = Math.max(3, Math.ceil((size * 50 + 8) / 64));
    const viewportWidth =
      window?.innerWidth ||
      document?.documentElement?.clientWidth ||
      1440;
    const minColumns = viewportWidth < 1500 ? 12 : 6;
    return {
      rows,
      columns: 12,
      min_rows: rows,
      min_columns: minColumns,
    };
  }

  getConfigElement() {
    return document.createElement(`${CARD_TYPE}-editor`);
  }

  connectedCallback() {
    this._render();
    this._syncWateringProgressTimer();
  }

  disconnectedCallback() {
    this._clearWateringProgressTimer();
    this._clearCardActionTimer();
    this._clearHoldActionTimer();
    this.shadowRoot?.removeEventListener("click", this._onClick);
    this.shadowRoot?.removeEventListener("pointerdown", this._onPointerDown);
    this.shadowRoot?.removeEventListener("pointerup", this._onPointerUp);
    this.shadowRoot?.removeEventListener("pointercancel", this._onPointerCancel);
    this.shadowRoot?.removeEventListener("pointerleave", this._onPointerCancel);
    this.shadowRoot?.removeEventListener("change", this._onChange);
    this.shadowRoot?.removeEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot?.removeEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot?.removeEventListener("keydown", this._onKeyDown);
  }

  _entity(entityKey) {
    if (!this._config || !this._hass) {
      return null;
    }
    const entityId = this._config[entityKey];
    if (isEmpty(entityId)) {
      return null;
    }
    return this._hass.states?.[entityId] ?? null;
  }

  _entityId(entityKey) {
    return isEmpty(this._config?.[entityKey]) ? null : this._config[entityKey];
  }

  _defaultActionEntityId() {
    for (const key of ["entity_weather", ...ENTITY_KEYS.map((entry) => entry.key)]) {
      const entityId = this._entityId(key);
      if (entityId) {
        return entityId;
      }
    }
    return null;
  }

  _entityState(entityKey, fallback = "Non disponible") {
    const entity = this._entity(entityKey);
    if (!entity) {
      return fallback;
    }
    const state = entity.state;
    if (isUnavailableState(state)) {
      return fallback;
    }
    return state;
  }

  _entityNumber(entityKey, attr = null) {
    const entity = this._entity(entityKey);
    if (!entity) {
      return null;
    }
    const raw = attr ? entity.attributes?.[attr] : entity.state;
    return asNumber(raw);
  }

  _entityAttribute(entityKey, attr, fallback = null) {
    const entity = this._entity(entityKey);
    if (!entity) {
      return fallback;
    }
    const value = entity.attributes?.[attr];
    return value === undefined ? fallback : value;
  }

  _normalizeWateringCause(value, fallback = null) {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (["hydrique", "post_application"].includes(normalized)) {
      return normalized;
    }
    return fallback;
  }

  _inferWateringCause({ entity = null, attrs = null, typeArrosage = "", source = "" } = {}) {
    const resolvedEntity = entity && typeof entity === "object" ? entity : null;
    const resolvedAttrs = attrs && typeof attrs === "object" ? attrs : resolvedEntity?.attributes || {};
    const explicitCause = this._normalizeWateringCause(resolvedAttrs.watering_cause);
    if (explicitCause) {
      return explicitCause;
    }
    const postStatus = String(resolvedAttrs.application_post_watering_status || "").trim().toLowerCase();
    if (["bloque", "en_attente", "autorise"].includes(postStatus)) {
      return "post_application";
    }
    const normalizedType = String(typeArrosage || resolvedAttrs.type_arrosage || "").trim().toLowerCase();
    if (["application_technique", "application_technique_auto"].includes(normalizedType)) {
      return "post_application";
    }
    const normalizedSource = String(source || resolvedAttrs.source || "").trim().toLowerCase();
    if (["application_technique", "application_technique_auto", "manual_application"].includes(normalizedSource)) {
      return "post_application";
    }
    return "hydrique";
  }

  _wateringSourceLabel(source, fallbackCause = "hydrique") {
    const normalized = String(source ?? "").trim().toLowerCase();
    if (normalized === "application_technique_auto") {
      return "Post-produit auto";
    }
    if (normalized === "manual_application") {
      return "Post-produit manuel";
    }
    if (normalized === "application_technique") {
      return "Post-produit";
    }
    if (normalized === "zone_session") {
      return fallbackCause === "post_application" ? "Post-produit" : "Hydrique";
    }
    if (!normalized) {
      return formatWateringCauseLabel(fallbackCause);
    }
    return formatStateLabel(source);
  }

  _postApplicationState(entity = null) {
    const application = entity && typeof entity === "object" ? entity : this._entity("entity_arrosage_apres_application_autorise");
    if (!application) {
      return {
        status: "unavailable",
        kind: "unavailable",
        label: "Non disponible",
        tone: "neutral",
        active: false,
      };
    }

    const rawState = String(application.state ?? "").trim().toLowerCase();
    if (isUnavailableState(rawState)) {
      return {
        status: "unavailable",
        kind: "unavailable",
        label: "Non disponible",
        tone: "neutral",
        active: false,
      };
    }

    const attrs = application.attributes ?? {};
    const explicitStatus = String(attrs.application_post_watering_status ?? "").trim().toLowerCase();
    const normalizedStatus = explicitStatus || (["autorise", "en_attente", "bloque", "non_requis", "non_autorise", "indisponible", "non_disponible"].includes(rawState) ? rawState : "indisponible");
    const presentation = typeof formatPostApplicationStatusPresentation === "function"
      ? formatPostApplicationStatusPresentation(normalizedStatus)
      : {
          kind: normalizedStatus || "indisponible",
          label: isEmpty(normalizedStatus) ? "Non disponible" : formatStateLabel(normalizedStatus),
          tone: "neutral",
          active: false,
        };
    return {
      status: normalizedStatus,
      kind: presentation.kind,
      label: presentation.label,
      tone: presentation.tone,
      active: presentation.active,
      value: explicitStatus || "Non disponible",
      rawStatus: rawState,
    };
  }

  _possibleValues(entityKey) {
    const entity = this._entity(entityKey);
    const possibleValues = entity?.attributes?.possible_values;
    if (Array.isArray(possibleValues) && possibleValues.length > 0) {
      return possibleValues;
    }
    return null;
  }

  _phaseTone() {
    return phaseTone(this._entityState("entity_phase"));
  }

  _riskTone() {
    const tone = computeRisqueTone(this._entityState("entity_risque"));
    return tone || "neutral";
  }

  _actionTone() {
    const tone = computeActionTone(this._entityState("entity_niveau"));
    return tone || "neutral";
  }

  _sectionAccent(section = this._activeSection) {
    return sectionToAccent(section);
  }

  _tabAccent(tab = this._activeTab) {
    switch (tab) {
      case "watering":
        return SECTION_ACCENTS.watering;
      case "mowing":
        return SECTION_ACCENTS.mowing;
      case "gazon":
        return "#4f8f3a";
      case "products":
        return SECTION_ACCENTS.products;
      case "config":
        return SECTION_ACCENTS.details;
      default:
        return SECTION_ACCENTS.overview;
    }
  }

  _tabPalette(tab = this._activeTab) {
    const accent = this._tabAccent(tab);
    switch (tab) {
      case "watering":
        return {
          accent,
          companion: "#88e4ff",
          glow: "#31b8d4",
          mist: "#58cfd6",
        };
      case "mowing":
        return {
          accent,
          companion: "#e6cf73",
          glow: "#a6cb58",
          mist: "#c8d86b",
        };
      case "gazon":
        return {
          accent,
          companion: "#9fd874",
          glow: "#5bb56e",
          mist: "#7ec788",
        };
      case "products":
        return {
          accent,
          companion: "#d9bf73",
          glow: "#57c18d",
          mist: "#8ecf90",
        };
      case "intervention":
        return {
          accent,
          companion: "#f1b86f",
          glow: "#5ac7b0",
          mist: "#93d3a4",
        };
      case "config":
        return {
          accent,
          companion: "#8eb8d8",
          glow: "#7b8da0",
          mist: "#a5b3bf",
        };
      case "overview":
      default:
        return {
          accent,
          companion: "#7fd6b6",
          glow: "#58c27d",
          mist: "#75cfd2",
        };
    }
  }

  _normalizedActionConfig(action) {
    if (typeof action === "string") {
      return { action };
    }
    if (action && typeof action === "object") {
      return action;
    }
    return { action: "none" };
  }

  _configuredAction(actionKey) {
    return this._normalizedActionConfig(this._config?.[actionKey] ?? DEFAULT_CONFIG[actionKey]);
  }

  _hasConfiguredAction(actionKey) {
    const action = this._configuredAction(actionKey);
    return String(action.action || "none").trim().toLowerCase() !== "none";
  }

  _hasCardAction() {
    return this._hasConfiguredAction("tap_action")
      || this._hasConfiguredAction("hold_action")
      || this._hasConfiguredAction("double_tap_action");
  }

  _isActionEventCandidateTarget(target) {
    if (!(target instanceof Element)) {
      return false;
    }
    if (!target.closest("ha-card")) {
      return false;
    }
    return !target.closest(
      "[data-gazon-action], [data-more-info-entity], [data-tab], [data-section], button, select, input, textarea, a, summary",
    );
  }

  _clearCardActionTimer() {
    if (this._cardActionTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(this._cardActionTimer);
    }
    this._cardActionTimer = null;
  }

  _clearHoldActionTimer() {
    if (this._holdActionTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(this._holdActionTimer);
    }
    this._holdActionTimer = null;
  }

  _actionEventName(actionKey) {
    return String(actionKey || "").replace(/_action$/, "");
  }

  _actionConfigForEvent(actionKey, action, fallbackEntityId) {
    const normalized = { ...this._normalizedActionConfig(action) };
    let actionName = String(normalized.action || "none").trim().toLowerCase();
    if (actionName === "more_info") {
      actionName = "more-info";
    }
    if (actionName === "perform_action" || actionName === "call-service") {
      actionName = "perform-action";
    }
    if (actionName === "none") {
      return null;
    }

    const eventConfig = {
      [actionKey]: {
        ...normalized,
        action: actionName,
      },
    };
    const actionConfig = eventConfig[actionKey];
    const targetEntityId = actionConfig.entity || actionConfig.entity_id || fallbackEntityId || null;

    if (actionConfig.service && !actionConfig.perform_action) {
      actionConfig.perform_action = actionConfig.service;
    }
    if (actionConfig.service_name && !actionConfig.perform_action) {
      actionConfig.perform_action = actionConfig.service_name;
    }
    if (actionConfig.service_data !== undefined && actionConfig.data === undefined) {
      actionConfig.data = actionConfig.service_data;
    }
    if (actionConfig.path && actionConfig.navigation_path === undefined) {
      actionConfig.navigation_path = actionConfig.path;
    }
    if (actionConfig.url && actionName === "navigate" && actionConfig.navigation_path === undefined) {
      actionConfig.navigation_path = actionConfig.url;
    }
    if (actionConfig.url && actionName === "url" && actionConfig.url_path === undefined) {
      actionConfig.url_path = actionConfig.url;
    }

    delete actionConfig.service;
    delete actionConfig.service_name;
    delete actionConfig.service_data;
    delete actionConfig.path;
    delete actionConfig.url;
    delete actionConfig.entity_id;

    if (actionName === "perform-action" && targetEntityId && actionConfig.target === undefined) {
      actionConfig.target = { entity_id: targetEntityId };
    }
    if (actionName !== "perform-action" && targetEntityId && eventConfig.entity === undefined) {
      eventConfig.entity = targetEntityId;
    }

    return eventConfig;
  }

  _performConfiguredAction(actionKey, fallbackEntityId = this._defaultActionEntityId()) {
    const config = this._actionConfigForEvent(actionKey, this._configuredAction(actionKey), fallbackEntityId);
    if (!config) {
      return;
    }
    const event = new Event("hass-action", {
      bubbles: true,
      composed: true,
    });
    event.detail = {
      config,
      action: this._actionEventName(actionKey),
    };
    this.dispatchEvent(event);
  }

  _handleCardTapAction(fallbackEntityId) {
    const hasTapAction = this._hasConfiguredAction("tap_action");
    const hasDoubleTapAction = this._hasConfiguredAction("double_tap_action");
    if (!hasTapAction && !hasDoubleTapAction) {
      return;
    }
    if (!hasDoubleTapAction) {
      this._performConfiguredAction("tap_action", fallbackEntityId);
      return;
    }
    if (this._cardActionTimer !== null) {
      this._clearCardActionTimer();
      this._performConfiguredAction("double_tap_action", fallbackEntityId);
      return;
    }
    this._cardActionTimer = window.setTimeout(() => {
      this._cardActionTimer = null;
      if (hasTapAction) {
        this._performConfiguredAction("tap_action", fallbackEntityId);
      }
    }, 250);
  }

  _primaryTone() {
    const actionTone = this._actionTone();
    const tonteTone = computeTonteTone(this._entityState("entity_tonte"));
    const riskTone = this._riskTone();
    const phase = this._phaseTone();

    if (phase !== "success") {
      return phase;
    }
    if (riskTone === "danger") {
      return riskTone;
    }
    if (tonteTone === "danger") {
      return tonteTone;
    }
    if (actionTone === "danger") {
      return actionTone;
    }
    if (tonteTone === "warning" || actionTone === "warning" || riskTone === "warning") {
      return "warning";
    }
    if (this._entityState("entity_arrosage_recommande") === "on") {
      return "accent";
    }
    return "neutral";
  }

  _cardTone() {
    const actionTone = this._actionTone();
    const riskTone = this._riskTone();

    if (actionTone === "critical") {
      return "critical";
    }
    if (riskTone && riskTone !== "neutral") {
      return riskTone;
    }
    if (actionTone && actionTone !== "neutral") {
      return actionTone;
    }
    return "neutral";
  }

  _tabTone(tab = this._activeTab) {
    if (tab === "watering") {
      return this._windowState().tone;
    }
    if (tab === "mowing") {
      return computeTonteTone(this._entityState("entity_tonte"));
    }
    if (tab === "gazon") {
      const actionTone = this._actionTone();
      const riskTone = this._riskTone();
      const phaseToneValue = this._phaseTone();
      if (phaseToneValue !== "success") {
        return phaseToneValue;
      }
      if (riskTone === "danger") {
        return riskTone;
      }
      if (actionTone === "danger") {
        return actionTone;
      }
      if (actionTone === "warning" || riskTone === "warning") {
        return "warning";
      }
      return "success";
    }
    if (tab === "products") {
      const selection = this._productSelectionState();
      const catalogue = this._catalogueState();
      if (selection.selectedProductId) {
        return "success";
      }
      if (catalogue.hasProducts) {
        return "accent";
      }
      return "neutral";
    }
    if (tab === "intervention") {
      const selection = this._productSelectionState();
      const catalogue = this._catalogueState();
      if (selection.selectedProductId) {
        return "success";
      }
      if (catalogue.hasProducts) {
        return "accent";
      }
      return "neutral";
    }
    if (tab === "config") {
      const autoState = String(this._entityState("entity_switch_arrosage_automatique", "")).trim().toLowerCase();
      if (["on", "true", "yes", "1", "oui"].includes(autoState)) {
        return "success";
      }
      if (["off", "false", "no", "0", "non"].includes(autoState)) {
        return "danger";
      }
      return "neutral";
    }
    return this._primaryTone();
  }

  _windowEntity() {
    return this._entity("entity_fenetre_optimale");
  }

  _assistantEntity() {
    return this._entity("entity_assistant");
  }

  _planEntity() {
    return this._entity("entity_plan_arrosage");
  }

  _weatherEntity() {
    return this._entity("entity_weather");
  }

  _lastWateringEntity() {
    return this._entity("entity_dernier_arrosage");
  }

  _applicationEntity() {
    return this._entity("entity_derniere_application");
  }

  _lastUserActionEntity() {
    return this._entity("entity_derniere_action_utilisateur");
  }

  _catalogueEntity() {
    return this._entity("entity_catalogue_produits");
  }

  _productSelectionEntity() {
    return this._entity("entity_produit_intervention");
  }

  _interventionRecommendationEntity() {
    return this._entity("entity_prochaine_intervention");
  }

  _catalogueState() {
    const entity = this._catalogueEntity();
    const attrs = entity?.attributes || {};
    const count = asNumber(attrs.products_count ?? entity?.state);
    const summary = String(attrs.summary || "").trim();
    const productNames = String(attrs.product_names || "").trim();
    const productIds = String(attrs.product_ids || "").trim();
    return {
      entity,
      count: count ?? 0,
      summary: summary || (count === 0 ? "Aucun produit enregistré" : count === 1 ? "1 produit enregistré" : `${count} produits enregistrés`),
      productNames,
      productIds,
      hasProducts: (count ?? 0) > 0,
    };
  }

  _productSelectionState() {
    const entity = this._productSelectionEntity();
    const attrs = entity?.attributes || {};
    const pendingSelection = this._pendingInterventionSelection;
    const selectedProductId = String(attrs.selected_product_id || pendingSelection?.id || "").trim();
    const entityState = String(entity?.state || "").trim();
    const selectedProductName = String(
      attrs.selected_product_name || pendingSelection?.name || (isUnavailableState(entityState) ? "" : entityState) || "",
    ).trim();
    const selectedProductMonths = attrs.selected_product_months ?? pendingSelection?.months ?? [];
    const selectedProductMonthsLabel = String(attrs.selected_product_months_label || pendingSelection?.monthsLabel || "").trim();
    const selectedProductUsageMode = String(attrs.selected_product_usage_mode || pendingSelection?.usageMode || "").trim();
    const selectedProductUsageModeLabel = String(attrs.selected_product_usage_mode_label || pendingSelection?.usageModeLabel || "").trim();
    const selectedProductMaxApplicationsPerYear = asNumber(
      attrs.selected_product_max_applications_per_year ?? pendingSelection?.maxApplicationsPerYear,
    );
    const selectedProductMaxApplicationsPerYearLabel = String(
      attrs.selected_product_max_applications_per_year_label || pendingSelection?.maxApplicationsPerYearLabel || "",
    ).trim();
    const summary = String(attrs.summary || "").trim();
    const productsCount = asNumber(attrs.products_count ?? this._catalogueState().count) ?? 0;
    return {
      entity,
      selectedProductId: selectedProductId || null,
      selectedProductName: selectedProductName || null,
      selectedProductMonths: Array.isArray(selectedProductMonths) ? selectedProductMonths : [],
      selectedProductMonthsLabel: selectedProductMonthsLabel || null,
      selectedProductUsageMode: selectedProductUsageMode || null,
      selectedProductUsageModeLabel:
        selectedProductUsageModeLabel ||
        formatProductUsageMode(selectedProductUsageMode),
      selectedProductMaxApplicationsPerYear: selectedProductMaxApplicationsPerYear,
      selectedProductMaxApplicationsPerYearLabel:
        selectedProductMaxApplicationsPerYearLabel ||
        formatProductAnnualLimit(selectedProductMaxApplicationsPerYear),
      summary:
        summary ||
        (selectedProductName
          ? `Produit sélectionné : ${selectedProductName}`
          : productsCount > 0
            ? "Aucun produit sélectionné"
            : "Aucun produit enregistré"),
      productsCount,
      label: selectedProductName || "Aucun produit sélectionné",
    };
  }

  _syncPendingInterventionSelection() {
    if (!this._pendingInterventionSelection) {
      return;
    }
    const entity = this._productSelectionEntity();
    const attrs = entity?.attributes || {};
    const selectedProductId = String(attrs.selected_product_id || "").trim();
    const selectedProductName = String(attrs.selected_product_name || "").trim();
    const entityState = String(entity?.state || "").trim();
    const pending = this._pendingInterventionSelection;
    const hasConfirmedSelection =
      (selectedProductId && pending.id && selectedProductId === pending.id)
      || (selectedProductName && pending.name && selectedProductName === pending.name)
      || (entityState && pending.optionLabel && entityState === pending.optionLabel);
    if (hasConfirmedSelection) {
      this._pendingInterventionSelection = null;
    }
  }

  _catalogueProducts() {
    const entity = this._catalogueEntity();
    const products = entity?.attributes?.products_summary;
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    return products.filter((product) => product && typeof product === "object");
  }

  _catalogueProductOptions() {
    const products = this._catalogueProducts();
    if (!products.length) {
      return [];
    }
    const nameCounts = new Map();
    for (const product of products) {
      const productName = String(product.nom || product.id || "").trim();
      if (!productName) {
        continue;
      }
      const key = productName.toLocaleLowerCase();
      nameCounts.set(key, (nameCounts.get(key) || 0) + 1);
    }
    return products
      .map((product) => {
        const id = String(product.id || "").trim();
        if (!id) {
          return null;
        }
        const name = String(product.nom || id || "").trim() || id;
        const monthsLabel = String(product.application_months_label || "").trim();
        const usageMode = String(product.usage_mode || "").trim();
        const usageModeLabel = formatProductUsageMode(usageMode);
        const annualLimit = asNumber(product.max_applications_per_year);
        const annualLimitLabel = formatProductAnnualLimit(annualLimit);
        const duplicateCount = nameCounts.get(name.toLocaleLowerCase()) || 0;
        const baseLabel = duplicateCount > 1 && id ? `${name} — ${id}` : name;
        const labelParts = [baseLabel];
        if (monthsLabel) {
          labelParts.push(monthsLabel);
        }
        if (usageModeLabel) {
          labelParts.push(`Mode ${usageModeLabel}`);
        }
        if (annualLimitLabel) {
          labelParts.push(`Max ${annualLimitLabel}`);
        }
        return {
          id,
          name,
          label: labelParts.join(" · "),
          monthsLabel: String(product.application_months_label || "").trim() || null,
          usageMode: usageMode || null,
          usageModeLabel: usageModeLabel || null,
          maxApplicationsPerYear: annualLimit,
          maxApplicationsPerYearLabel: annualLimitLabel,
        };
      })
      .filter(Boolean);
  }

  _interventionRecommendationState() {
    const entity = this._interventionRecommendationEntity();
    const attrs = entity?.attributes || {};
    const payload = attrs.payload && typeof attrs.payload === "object" ? attrs.payload : attrs;
    const catalogue = this._catalogueState();
    const pertinenceEntity = this._entity("entity_niveau_pertinence");
    const product = payload.product && typeof payload.product === "object" ? payload.product : {};
    const selection = payload.selection && typeof payload.selection === "object" ? payload.selection : {};
    const context = payload.context && typeof payload.context === "object" ? payload.context : {};
    const state = String(payload.status || entity?.state || attrs.state || "").trim().toLowerCase();
    const normalizedState = state || "unavailable";
    const score = asNumber(payload.score ?? attrs.score ?? pertinenceEntity?.attributes?.score) ?? 0;
    const scoreLevel = String(
      payload.score_level
        || attrs.score_level
        || pertinenceEntity?.attributes?.score_level
        || pertinenceEntity?.state
        || "",
    ).trim().toLowerCase();
    const hasHighScore = ["élevé", "eleve", "high", "haut"].includes(scoreLevel) || score >= 71;
    const fallbackPresentation = {
      status: normalizedState,
      title: "Intervention",
      badge: "Non disponible",
      tone: "neutral",
      icon: "mdi:spray-bottle",
      summary: "Non disponible",
      hint: "Aucune recommandation exploitable n’est disponible.",
      actionLabel: "Non disponible",
      selectionSummary: "Aucun produit identifié",
      selectionHint: "Aucune recommandation exploitable n’est disponible.",
      declarationSummary: "Non disponible",
      declarationHint: "Aucune recommandation exploitable n’est disponible.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    };
    const lowScorePresentation = {
      status: normalizedState,
      title: "À surveiller",
      badge: "Score insuffisant",
      tone: "neutral",
      icon: "mdi:chart-line-variant",
      summary: "Aucune intervention proposée",
      hint: "L’intervention n’est proposée que lorsque le score est élevé.",
      actionLabel: "Surveiller",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "La sélection reste possible, mais aucune intervention n’est proposée tant que le score n’est pas élevé.",
      declarationSummary: "Pas de proposition",
      declarationHint: "Aucune intervention n’est proposée tant que le score n’est pas élevé.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    };
    const lowScoreCandidatePresentation = {
      status: normalizedState,
      title: "À envisager",
      badge: "Pertinence faible",
      tone: "warning",
      icon: "mdi:spray-bottle",
      summary: "Intervention non prioritaire",
      hint: "Un candidat existe, mais le contexte actuel limite sa pertinence.",
      actionLabel: "Choisir le produit",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "La sélection reste possible pour préparer la déclaration.",
      declarationSummary: "À envisager",
      declarationHint: "La déclaration reste possible, mais elle n’est pas prioritaire tant que la pertinence est faible.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    };
    const basePresentation = typeof formatInterventionStatusPresentation === "function"
      ? formatInterventionStatusPresentation(normalizedState)
      : (function mapFallbackInterventionStatus(status) {
          const normalized = String(status ?? "").trim().toLowerCase();
          if (normalized === "recommended") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.recommended };
          }
          if (normalized === "possible") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.possible };
          }
          if (normalized === "preparation") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.preparation };
          }
          if (normalized === "ready") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.ready };
          }
          if (normalized === "blocked") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.blocked };
          }
          if (normalized === "unavailable" || normalized === "non_disponible") {
            return { status: normalized || "unavailable", ...INTERVENTION_STATUS_PRESENTATIONS.unavailable };
          }
          return fallbackPresentation;
        })(normalizedState);
    const presentation = hasHighScore || ["blocked", "unavailable", "non_disponible"].includes(normalizedState)
      ? basePresentation
      : ["preparation", "possible"].includes(normalizedState)
        ? lowScoreCandidatePresentation
        : lowScorePresentation;
    const reason = String(payload.reason || "").trim();
    const whyNow = String(payload.why_now || "").trim();
    const title = presentation.title;
    const badge = presentation.badge;
    const tone = presentation.tone;
    const icon = presentation.icon;
    const summary = presentation.summary;
    const hint = reason || whyNow || presentation.hint;
    const actionLabel = presentation.actionLabel;
    const reasons = Array.isArray(payload.reasons) ? payload.reasons.filter(Boolean).map((reason) => String(reason)) : [];
    const constraints = Array.isArray(payload.constraints)
      ? payload.constraints
          .filter((constraint) => constraint && typeof constraint === "object")
          .map((constraint) => ({
            code: String(constraint.code || "").trim() || null,
            label: String(constraint.label || "").trim() || "",
            value: constraint.value ?? null,
            hint: String(constraint.hint || "").trim() || null,
            met: Boolean(constraint.met),
            blocking: Boolean(constraint.blocking),
          }))
      : [];
    const selectedProductId = String(selection.id || attrs.selected_product_id || "").trim() || null;
    const selectedProductName = String(selection.name || attrs.selected_product_name || "").trim() || null;
    const selectedProductMonths = Array.isArray(selection.months) ? selection.months : [];
    const selectedProductMonthsLabel = String(selection.months_label || attrs.selected_product_months_label || "").trim() || null;
    const selectedProductUsageMode = String(selection.usage_mode || attrs.selected_product_usage_mode || "").trim() || null;
    const selectedProductUsageModeLabel = String(selection.usage_mode_label || attrs.selected_product_usage_mode_label || "").trim() || null;
    const selectedProductMaxApplicationsPerYear = asNumber(
      selection.max_applications_per_year ?? attrs.selected_product_max_applications_per_year,
    );
    const selectedProductMaxApplicationsPerYearLabel = String(
      selection.max_applications_per_year_label || attrs.selected_product_max_applications_per_year_label || "",
    ).trim() || null;
    const recommendedProductMonths = Array.isArray(product.months) ? product.months : [];
    const recommendedProductMonthsLabel = String(product.months_label || attrs.recommended_product_months_label || "").trim() || null;
    const recommendedProductId = String(product.id || payload.product_id || attrs.product_id || attrs.recommended_product_id || "").trim() || null;
    const recommendedProductName = String(product.name || payload.product_name || attrs.product_name || attrs.recommended_product_name || "").trim() || null;
    const recommendedProductType = String(product.type || payload.product_type || attrs.product_type || attrs.recommended_product_type || "").trim() || null;
    const readyToDeclare = Boolean(payload.ready_to_declare) && hasHighScore;
    return {
      entity,
      payload,
      schemaVersion: asNumber(payload.schema_version) ?? null,
      status: normalizedState,
      recommendedAction: String(payload.recommended_action || "").trim() || null,
      priority: String(payload.priority || "").trim() || null,
      score,
      scoreLevel: scoreLevel || null,
      scoreHigh: hasHighScore,
      reason: String(payload.reason || "").trim() || "",
      whyNow: String(payload.why_now || "").trim() || "",
      reasons,
      constraints,
      missingRequirements: Array.isArray(payload.missing_requirements)
        ? payload.missing_requirements.filter(Boolean).map((value) => String(value))
        : [],
      monthMatch: Boolean(payload.month_match),
      readyToDeclare,
      product: {
        id: recommendedProductId,
        name: recommendedProductName,
        type: recommendedProductType,
        months: recommendedProductMonths,
        monthsLabel: recommendedProductMonthsLabel,
        phaseCompatible: Array.isArray(product.phase_compatible) ? product.phase_compatible : [],
        latestApplicationDate: String(product.latest_application_date || "").trim() || null,
        nextReapplicationDate: String(product.next_reapplication_date || "").trim() || null,
        nextReapplicationDisplay: String(product.next_reapplication_display || "").trim() || null,
        due: Boolean(product.due),
        phaseMatch: Boolean(product.phase_match),
        monthMatch: Boolean(product.month_match),
      },
      selection: {
        id: selectedProductId,
        name: selectedProductName,
        type: String(selection.type || attrs.selected_product_type || "").trim() || null,
        months: selectedProductMonths,
        monthsLabel: selectedProductMonthsLabel,
        usageMode: selectedProductUsageMode,
        usageModeLabel: selectedProductUsageModeLabel || formatProductUsageMode(selectedProductUsageMode),
        maxApplicationsPerYear: selectedProductMaxApplicationsPerYear,
        maxApplicationsPerYearLabel:
          selectedProductMaxApplicationsPerYearLabel ||
          formatProductAnnualLimit(selectedProductMaxApplicationsPerYear),
        ready: Boolean(payload.selected_product_ready || selection.ready),
        selected: Boolean(selectedProductId || selectedProductName),
      },
      context: {
        catalogueCount: asNumber(context.catalogue_count ?? attrs.catalogue_count ?? catalogue.count) ?? catalogue.count ?? 0,
        eligibleCount: asNumber(context.eligible_count ?? attrs.eligible_count) ?? 0,
        blockedProductsCount: asNumber(context.blocked_products_count ?? attrs.blocked_products_count) ?? 0,
        currentMonth: asNumber(context.current_month ?? attrs.current_month) ?? null,
        currentPhase: String((context.current_phase ?? attrs.current_phase) || "").trim() || null,
        currentSubPhase: String((context.current_sub_phase ?? attrs.current_sub_phase) || "").trim() || null,
      },
      ui: {
        title,
        badge,
        tone,
        icon,
        summary,
        hint,
        actionLabel,
        selectionSummary: presentation.selectionSummary,
        selectionHint: presentation.selectionHint,
        declarationSummary: presentation.declarationSummary,
        declarationHint: reason || whyNow || presentation.declarationHint,
        historySummary: presentation.historySummary,
        historyHint: presentation.historyHint,
      },
    };
  }

  _selectedProductOptionLabel() {
    const options = this._catalogueProductOptions();
    if (!options.length) {
      return null;
    }
    const selection = this._productSelectionState();
    if (selection.selectedProductId) {
      const match = options.find((option) => option.id === selection.selectedProductId);
      if (match) {
        return match.label;
      }
    }
    if (selection.selectedProductName) {
      const normalizedName = String(selection.selectedProductName).trim().toLocaleLowerCase();
      const match = options.find((option) => option.name.toLocaleLowerCase() === normalizedName);
      if (match) {
        return match.label;
      }
    }
    if (options.length === 1) {
      return options[0].label;
    }
    return null;
  }

  _selectedProductRecord() {
    const selectedProductId = this._productSelectionState().selectedProductId;
    const products = this._catalogueProducts();
    if (products.length === 0) {
      return null;
    }
    if (selectedProductId) {
      const normalizedSelectedProductId = String(selectedProductId).trim();
      const record = products.find((product) => String(product.id || "").trim() === normalizedSelectedProductId);
      if (record) {
        return record;
      }
    }
    if (products.length === 1) {
      return products[0];
    }
    return null;
  }

  _todayIsoDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  _todayDisplayDate() {
    try {
      return new Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date());
    } catch (_error) {
      return this._todayIsoDate();
    }
  }

  _selectedProductInterventionState() {
    const record = this._selectedProductRecord();
    const selectedName = String(record?.nom || record?.id || "").trim();
    const type = String(record?.type || "").trim();
    const optionLabel = this._selectedProductOptionLabel();
    if (!record || !type) {
      return {
        record: null,
        disabled: true,
        label: "Sélectionne un produit",
        summary: "Aucune intervention rapide possible sans produit sélectionné.",
        optionLabel,
        actionLabel: "Déclarer l'intervention",
      };
    }
    return {
      record,
      disabled: false,
      label: selectedName || "Produit sélectionné",
      summary: `${formatStatusLabel(type)} · ${this._todayDisplayDate()}`,
      dateActionLabel: this._todayDisplayDate(),
      optionLabel,
      actionLabel: `Déclarer ${formatStatusLabel(type)}`,
    };
  }

  _lastApplicationState() {
    const entity = this._applicationEntity();
    const rawState = String(entity?.state || "").trim();
    const normalizedState = rawState.toLowerCase();
    const hasApplication =
      Boolean(entity)
      && !isUnavailableState(rawState)
      && !["aucune application", "aucune application détectée"].includes(normalizedState);
    const attrs = entity?.attributes || {};
    const summary = String(attrs.summary || "").trim();
    const when = String(attrs.last_application_when || "").trim() || (attrs.declared_at ? humanDateTimeText(attrs.declared_at) : "");
    const detailParts = [];
    if (when) {
      detailParts.push(when);
    }
    if (attrs.application_type) {
      detailParts.push(`Type: ${formatStatusLabel(attrs.application_type)}`);
    }
    if (attrs.application_irrigation_mode) {
      detailParts.push(`Mode: ${formatStatusLabel(attrs.application_irrigation_mode)}`);
    }
    let history = Array.isArray(attrs.application_history)
      ? attrs.application_history.filter((item) => item && typeof item === "object")
      : [];
    if (!history.length && hasApplication) {
      history = [
        {
          libelle: String(attrs.libelle || attrs.produit || rawState || "Application").trim(),
          produit: String(attrs.produit || attrs.libelle || rawState || "Application").trim(),
          type: String(attrs.type || attrs.application_type || "").trim(),
          dose: String(attrs.dose || "").trim(),
          application_type: String(attrs.application_type || "").trim(),
          application_irrigation_mode: String(attrs.application_irrigation_mode || "").trim(),
          note: String(attrs.note || "").trim(),
          date_action: String(attrs.date_action || attrs.date || "").trim(),
          date: String(attrs.date || "").trim(),
          declared_at: attrs.declared_at || null,
        },
      ];
    }
    return {
      entity,
      hasApplication,
      label: hasApplication ? rawState : "Aucune application",
      summary: summary || (hasApplication ? "Dernière application enregistrée" : "Aucune application enregistrée"),
      detail: detailParts.join(" · "),
      productId: String(attrs.produit_id || "").trim() || null,
      productName: String(attrs.produit || attrs.libelle || "").trim() || null,
      when,
      history,
    };
  }

  _lastUserActionState() {
    const entity = this._lastUserActionEntity();
    const attrs = entity?.attributes || {};
    const summary = String(attrs.summary || "").trim();
    const when = String(attrs.last_action_when || "").trim();
    const action = String(attrs.execution_action || "").trim();
    const reason = String(attrs.execution_reason || "").trim();
    const state = String(attrs.execution_state || entity?.state || "").trim();
    if (!entity || isUnavailableState(String(entity?.state || ""))) {
      return { entity, summary: "", when: "", action: "", reason: "", state: "" };
    }
    return {
      entity,
      summary: summary || action || state || "",
      when,
      action,
      reason,
      state,
    };
  }

  _objectiveEntity() {
    return this._entity("entity_objectif_arrosage");
  }

  _objectiveMm() {
    return this._entityNumber("entity_objectif_arrosage");
  }

  _assistantState() {
    const entity = this._assistantEntity();
    const attrs = entity?.attributes || {};
    const action = String(attrs.action || entity?.state || "").trim().toLowerCase();
    const actionLabel = formatStatusLabel(action || entity?.state || "non disponible");
    const moment = String(attrs.moment || "").trim().toLowerCase();
    const momentLabel = moment ? formatStatusLabel(moment) : "";
    const status = String(attrs.status || "").trim().toLowerCase();
    const reason = String(attrs.reason || "").trim();
    const quantityMm = asNumber(attrs.quantity_mm);
    const normalizedReason = reason.toLowerCase();
    const isMowingBusy = status === "blocked" && action === "tonte" && (
      normalizedReason.includes("déjà en cours")
      || normalizedReason.includes("en cours")
      || normalizedReason.includes("mower_mowing")
    );
    let tone = "neutral";
    if (status === "action_required") {
      tone = action.includes("arros") ? "accent" : "success";
    } else if (isMowingBusy) {
      tone = "warning";
    } else if (status.includes("block") || normalizedReason.includes("bloqu")) {
      tone = "danger";
    } else if (action.includes("surveil")) {
      tone = "warning";
    }
    const isPassiveState = action === "aucune_action" && moment === "attendre";
    const isBlockedByConditions = action === "aucune_action" && status === "blocked_due_to_conditions";
    const isBlockedMowing = status === "blocked" && action === "tonte" && (
      normalizedReason.includes("déjà en cours")
      || normalizedReason.includes("en cours")
      || normalizedReason.includes("mower_mowing")
    );
    const summary = isBlockedByConditions
      ? (momentLabel && moment !== "attendre"
          ? `Attendre ${momentLabel.toLowerCase()}`
          : "Attendre conditions favorables")
      : isPassiveState
      ? "Aucune action immédiate"
      : isBlockedMowing
        ? "Tonte en cours"
      : [
          actionLabel,
          momentLabel && moment !== "maintenant" ? momentLabel.toLowerCase() : moment === "maintenant" ? "maintenant" : "",
        ].filter(Boolean).join(" ");
    return {
      entity,
      action,
      actionLabel,
      moment,
      momentLabel,
      status,
      reason,
      quantityMm,
      tone,
      summary: summary || actionLabel,
      detail: reason || (quantityMm !== null && quantityMm > 0 ? `${formatMm(quantityMm)} demandés` : ""),
    };
  }

  _mowerState() {
    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const tonteAttrs = tonteEntity?.attributes || {};
    const fallbackAttrs = tonteAutoriseeEntity?.attributes || {};
    const attrs = tonteAttrs.mower_operation_state
      || tonteAttrs.mower_operation_label
      || tonteAttrs.tondeuse_statut
      || tonteAttrs.tondeuse_statut_libelle
      ? tonteAttrs
      : fallbackAttrs;
    const status = String(
      attrs.mower_operation_state
      || attrs.tondeuse_statut
      || "",
    ).trim().toLowerCase();
    const operationLabel = normalizeOptionalDisplayValue(
      attrs.mower_operation_label
      || attrs.tondeuse_statut_libelle
      || formatStatusLabel(status || "non disponible"),
    );
    const battery = asNumber(attrs.tondeuse_batterie);
    const nextDeparture = normalizeOptionalDisplayValue(
      attrs.tondeuse_prochain_depart_display
      || humanDateTimeText(attrs.tondeuse_prochain_depart)
      || "",
    );
    const cuttingHeightMm = asNumber(attrs.tondeuse_hauteur_coupe_mm);
    const reason = normalizeOptionalDisplayValue(
      attrs.mower_reason_label
      || formatMowerReasonLabel(attrs.mower_reason_code)
      || attrs.tondeuse_raison
      || attrs.tondeuse_erreur_libelle
      || "",
    );
    const reasonCode = String(attrs.mower_reason_code || "").trim().toLowerCase();
    const hardBlockReason = ["ambiguous", "mower_ambiguous", "missing", "mower_missing", "configured_missing", "mower_configured_missing"].includes(reasonCode);
    const name = String(attrs.tondeuse_nom || "").trim();
    const ready = attrs.tondeuse_prete;
    const connected = attrs.tondeuse_connectee;
    const coordinationEnabled = attrs.mower_coordination_enabled;
    const coordinationReady = attrs.mower_coordination_ready;
    const presenceState = String(attrs.mower_presence_state || "").trim().toLowerCase();
    let presenceLabel = normalizeOptionalDisplayValue(attrs.mower_presence_label || formatStatusLabel(presenceState || "non disponible"));
    if (presenceState === "dockee") {
      presenceLabel = "À la station";
    }
    const safeForWatering = attrs.mower_is_safe_for_watering;
    let label = operationLabel || "Non disponible";
    if (presenceState === "dockee" && presenceLabel) {
      label = presenceLabel;
    } else if (!operationLabel && presenceLabel) {
      label = presenceLabel;
    }

    if (
      !status
      && !operationLabel
      && battery === null
      && !nextDeparture
      && cuttingHeightMm === null
      && !reason
      && !presenceState
    ) {
      return {
        present: false,
      };
    }

    let tone = "neutral";
    if (hardBlockReason || ["error", "erreur", "indisponible", "pluie", "unknown"].includes(status) || coordinationReady === false) {
      tone = "danger";
    } else if (["charging", "en_charge", "retour_station", "retour", "transit", "paused", "pause"].includes(status) || presenceState === "retour") {
      tone = "warning";
    } else if (["mowing", "tonte", "tonte_en_cours"].includes(status)) {
      tone = "accent";
    } else if ((status === "idle" || status === "au_repos") && ready !== false) {
      tone = "success";
    }

    return {
      present: true,
      name,
      status,
      label: hardBlockReason ? (reason || label || "Non disponible") : (label || "Non disponible"),
      operationLabel: operationLabel || "Non disponible",
      tone,
      battery,
      nextDeparture,
      cuttingHeightMm,
      reason,
      reasonCode,
      ready,
      connected,
      coordinationEnabled,
      coordinationReady,
      presenceState,
      presenceLabel: presenceLabel || "Non disponible",
      safeForWatering: hardBlockReason && safeForWatering === undefined ? false : safeForWatering,
      sourceEntity: String(attrs.tondeuse_source_entity || "").trim(),
    };
  }

  _mowingBlockState() {
    const predictiveEntity = this._entity("entity_prochaine_tonte");
    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const predictiveAttrs = predictiveEntity?.attributes || {};
    const tonteAttrs = tonteEntity?.attributes || {};
    const fallbackAttrs = tonteAutoriseeEntity?.attributes || {};
    const attrs = tonteAttrs.mowing_block_reason_code
      || tonteAttrs.mowing_block_reason_label
      || tonteAttrs.mowing_blocked_by_watering
      || tonteAttrs.mowing_cooldown_remaining_minutes !== undefined
      ? tonteAttrs
      : fallbackAttrs;
    const predictiveBlocked = predictiveAttrs.action_possible === false && Boolean(predictiveAttrs.block_reason || predictiveAttrs.reason || predictiveAttrs.summary);
    const blocked = predictiveBlocked || attrs.mowing_blocked_by_watering === true || Boolean(attrs.mowing_block_reason_code || attrs.mowing_block_reason_label);
    const reasonCode = String(predictiveAttrs.block_reason || attrs.mowing_block_reason_code || "").trim().toLowerCase();
    const reasonLabel = String(formatMowingBlockReason(reasonCode)).trim();
    const reasonDetail = String(
      predictiveAttrs.reason
      || predictiveAttrs.summary
      || attrs.mowing_block_reason_label
      || reasonLabel,
    ).trim();
    const cooldownRemainingMinutes = asNumber(attrs.mowing_cooldown_remaining_minutes);
    const postApplicationActive = attrs.mowing_post_application_active === true;
    const detail = [
      reasonDetail,
      cooldownRemainingMinutes !== null && cooldownRemainingMinutes > 0 ? `Encore ${formatDurationHuman(cooldownRemainingMinutes)}` : "",
    ].filter(Boolean).join(" · ");
    let tone = "neutral";
    if (blocked) {
      tone = reasonCode === "watering_cooldown" ? "warning" : "danger";
    } else if (cooldownRemainingMinutes !== null && cooldownRemainingMinutes > 0) {
      tone = "warning";
    }
    return {
      blocked,
      reasonCode,
      reasonLabel,
      reasonDetail,
      cooldownRemainingMinutes,
      postApplicationActive,
      detail,
      tone,
    };
  }

  _windowState() {
    const entity = this._windowEntity();
    const attrs = entity?.attributes || {};
    const publicState = String(entity?.state || "").trim().toLowerCase();
    const status = String(attrs.status || publicState).trim().toLowerCase();
    const summary = String(attrs.summary || entity?.state || "Irrigation prévue").trim();
    const reasonSummary = String(attrs.window_reason_summary || "").trim();
    const nextAction = String(attrs.next_action || "").trim();
    const nextActionDisplay = String(attrs.next_action_display || "").trim();
    const nextActionDate = String(attrs.next_action_date || "").trim();
    const blockReason = String(attrs.block_reason || "").trim();
    const blockReasonLabel = formatWateringBlockReason(blockReason);
    const objective = this._objectiveMm() ?? 0;
    const typeArrosage = String(this._entityState("entity_type_arrosage", "") || "").trim();
    const wateringCause = this._inferWateringCause({ entity, attrs, typeArrosage });
    const isPostApplication = wateringCause === "post_application";
    const wateringWindowDisplay = String(attrs.watering_window_display || "").trim();
    const optimalWindowDisplay = String(attrs.optimal_window_display || "").trim();
    const eveningWindowDisplay = String(attrs.evening_window_display || "").trim();
    const isAwaiting = status === "en_attente" || (!isPostApplication && publicState === "attendre");
    const showManualAction = isPostApplication ? status === "autorise" : objective > 0 && status === "auto";
    const isBlocked = status === "bloque";
    const isNoActionRequired = !isPostApplication && !isBlocked && !isAwaiting && !showManualAction && objective <= 0;
    const displaySummary = isBlocked
      ? (isPostApplication ? "Arrosage post-produit bloqué" : "Irrigation bloquée")
      : (reasonSummary || summary);
    const normalizedBlockedAction = String(nextActionDisplay || nextAction || "").trim().toLowerCase();
    const blockedFallbackAction = publicState === "apres_pluie"
      ? "Attendre après la pluie"
      : blockReasonLabel
        ? `Attendre: ${blockReasonLabel}`
        : "Attendre des conditions favorables";
    const displayNextAction = isBlocked
      ? (
          !normalizedBlockedAction
          || normalizedBlockedAction === "attendre la fin du bloc"
            ? blockedFallbackAction
            : (nextActionDisplay || nextAction)
        )
      : nextActionDisplay || nextAction || "";
    let tone = statusTone(status);
    if (isPostApplication) {
      if (status === "auto" || status === "autorise") {
        tone = "success";
      } else if (isAwaiting) {
        tone = "warning";
      } else if (isBlocked) {
        tone = "danger";
      } else {
        tone = "neutral";
      }
    } else if (isNoActionRequired) {
      tone = "neutral";
    } else if (["maintenant", "ce_matin"].includes(publicState)) {
      tone = "success";
    } else if (["demain_matin", "apres_pluie", "soir"].includes(publicState)) {
      tone = "accent";
    } else if (publicState === "attendre") {
      tone = objective > 0 ? "warning" : "neutral";
    }
    let statusLabel = formatStatusLabel(publicState || status);
    if (isPostApplication) {
      if (status === "auto") {
        statusLabel = "Post-produit auto";
      } else if (status === "autorise") {
        statusLabel = "Post-produit autorisé";
      } else if (status === "en_attente") {
        statusLabel = "Post-produit en attente";
      } else if (status === "bloque") {
        statusLabel = "Post-produit bloqué";
      } else {
        statusLabel = formatWateringCauseLabel(wateringCause);
      }
    }
    return {
      entity,
      status,
      publicState,
      wateringCause,
      isPostApplication,
      summary,
      reasonSummary,
      displaySummary,
      nextAction,
      nextActionDisplay,
      displayNextAction,
      nextActionDate,
      blockReason,
      blockReasonLabel,
      objective,
      wateringWindowDisplay,
      optimalWindowDisplay,
      eveningWindowDisplay,
      wateringEveningAllowed: Boolean(attrs.watering_evening_allowed),
      showManualAction,
      isAwaiting,
      isBlocked,
      isNoActionRequired,
      tone,
      statusLabel,
      rawStatus: attrs.status,
      autoIrrigationEnabled: attrs.auto_irrigation_enabled,
    };
  }

  _planState() {
    const entity = this._planEntity();
    const attrs = entity?.attributes || {};
    const summary = String(attrs.summary || entity?.state || "").trim();
    const durationHuman = String(attrs.duration_human || "").trim();
    const zoneCount = asNumber(attrs.zone_count);
    const objectiveMm = asNumber(attrs.objective_mm);
    const planType = String(attrs.plan_type || "").trim();
    const passages = asNumber(attrs.passages);
    const planState = {
      entity,
      summary: summary || "Aucun plan d'arrosage",
      durationHuman: durationHuman || formatDurationHuman(attrs.total_duration_min ?? entity?.state),
      zoneCount: zoneCount ?? 0,
      objectiveMm: objectiveMm ?? 0,
      planType: planType || "no_plan",
      passages: passages ?? 1,
      fractionation: Boolean(attrs.fractionation),
      isRuntimeFallback: false,
    };
    const wateringProgress = this._wateringProgressState();
    if (!wateringProgress.active || planState.planType !== "no_plan") {
      return planState;
    }
    const progressEntity = this._wateringProgressEntity();
    const progressAttrs = progressEntity?.attributes || {};
    const runtimeZoneCount = asNumber(progressAttrs.zone_count) ?? wateringProgress.zoneCount ?? 0;
    const runtimePassages = asNumber(progressAttrs.passage_count) ?? 1;
    const currentPassage = asNumber(progressAttrs.current_passage);
    const plannedTotalSeconds = asNumber(progressAttrs.planned_total_seconds) ?? 0;
    const targetMm = asNumber(progressAttrs.target_mm);
    const summaryParts = [
      runtimeZoneCount > 0 ? `${runtimeZoneCount} zone${runtimeZoneCount > 1 ? "s" : ""}` : "",
      runtimePassages > 1 && currentPassage ? `Passage ${currentPassage}/${runtimePassages}` : "Cycle en cours",
    ].filter(Boolean);
    return {
      ...planState,
      summary: summaryParts.join(" · ") || "Cycle en cours",
      durationHuman: plannedTotalSeconds > 0 ? formatDurationHuman(plannedTotalSeconds / 60.0) : planState.durationHuman,
      zoneCount: runtimeZoneCount,
      objectiveMm: targetMm ?? planState.objectiveMm,
      planType: runtimeZoneCount > 1 ? "multi_zone" : runtimeZoneCount === 1 ? "single_zone" : planState.planType,
      passages: runtimePassages,
      fractionation: runtimePassages > 1,
      isRuntimeFallback: true,
    };
  }

  _weatherState() {
    const entity = this._weatherEntity();
    if (!entity || isUnavailableState(entity.state)) {
      return null;
    }
    const condition = String(entity.state || "").trim().toLowerCase();
    const temperature = asNumber(entity.attributes?.temperature);
    const temperatureLabel = temperature === null ? "" : `${formatNumber(temperature, 1)} °C`;
    const label = formatWeatherConditionLabel(condition);
    const summary = [label, temperatureLabel].filter(Boolean).join(" · ");
    if (!summary) {
      return null;
    }
    return {
      entity,
      condition,
      label,
      summary,
      icon: weatherIconForState(condition),
      tone: weatherToneForState(condition),
      temperature,
      temperatureLabel,
    };
  }

  _wateringProgressEntity() {
    return this._entity("entity_arrosage_en_cours");
  }

  _friendlyZoneLabel(zoneId) {
    const entityId = String(zoneId || "").trim();
    if (!entityId) {
      return "Zone";
    }
    const stateObj = this._hass?.states?.[entityId];
    const friendlyName = String(stateObj?.attributes?.friendly_name || "").trim();
    if (friendlyName) {
      return friendlyName;
    }
    const objectId = entityId.includes(".") ? entityId.split(".").slice(1).join(".") : entityId;
    const zoneMatch = objectId.match(/zone[_-]?(\d+)/i);
    if (zoneMatch) {
      return `Zone ${zoneMatch[1]}`;
    }
    return objectId
      .replace(/[_-]+/g, " ")
      .trim()
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || entityId;
  }

  _activeZoneLabels(attrs) {
    const labelValue = attrs.active_zone_labels;
    if (Array.isArray(labelValue)) {
      const labels = labelValue.map((item) => String(item || "").trim()).filter(Boolean);
      if (labels.length) {
        return labels;
      }
    }
    const activeValue = attrs.active_zones;
    if (Array.isArray(activeValue)) {
      return activeValue.map((zoneId) => this._friendlyZoneLabel(zoneId)).filter(Boolean);
    }
    return [];
  }

  _estimatedWateringTotalSeconds() {
    const entity = this._planEntity();
    const attrs = entity?.attributes || {};
    const zones = Array.isArray(attrs.zones) ? attrs.zones : [];
    let totalSeconds = 0;
    for (const zone of zones) {
      if (!zone || typeof zone !== "object") {
        continue;
      }
      const durationSeconds = asNumber(zone.duration_seconds);
      if (durationSeconds !== null && durationSeconds > 0) {
        totalSeconds += durationSeconds;
        continue;
      }
      const durationMin = asNumber(zone.duration_min);
      if (durationMin !== null && durationMin > 0) {
        totalSeconds += durationMin * 60.0;
      }
    }
    if (totalSeconds <= 0) {
      const totalDurationMin = asNumber(attrs.total_duration_min);
      if (totalDurationMin !== null && totalDurationMin > 0) {
        totalSeconds = totalDurationMin * 60.0;
      }
    }
    const passages = Math.max(1, asNumber(attrs.passages) ?? 1);
    const pauseMinutes = Math.max(0, asNumber(attrs.pause_between_passages_minutes) ?? 0);
    if (totalSeconds > 0 && passages > 1) {
      totalSeconds = (totalSeconds * passages) + (pauseMinutes * 60.0 * (passages - 1));
    }
    return totalSeconds > 0 ? totalSeconds : 0;
  }

  _wateringProgressState() {
    const entity = this._wateringProgressEntity();
    const attrs = entity?.attributes || {};
    const active = Boolean(attrs.active);
    if (!entity || !active) {
      return {
        active: false,
        progressPercent: 0,
        summary: "Aucune irrigation en cours",
        detail: "Aucune session active",
      };
    }

    const startedAtRaw = String(attrs.started_at_utc || "").trim();
    const startedAt = startedAtRaw ? Date.parse(startedAtRaw) : NaN;
    const totalSeconds = this._estimatedWateringTotalSeconds();
    const elapsedSeconds = Number.isFinite(startedAt)
      ? Math.max(0, (Date.now() - startedAt) / 1000)
      : asNumber(attrs.elapsed_seconds) ?? 0;
    const progressPercent = totalSeconds > 0
      ? Math.min(100, (elapsedSeconds / totalSeconds) * 100)
      : asNumber(attrs.progress_percent) ?? asNumber(entity.state) ?? 0;
    const remainingSeconds = totalSeconds > 0 ? Math.max(totalSeconds - elapsedSeconds, 0) : asNumber(attrs.remaining_seconds) ?? 0;
    const activeZoneCount = asNumber(attrs.active_zone_count) ?? 0;
    const zoneCount = asNumber(attrs.zone_count) ?? activeZoneCount;
    const activeZoneLabels = this._activeZoneLabels(attrs);
    const startedAtLabel = String(attrs.started_at || "").trim() || (startedAtRaw ? humanDateTimeText(startedAtRaw) : "");
    const currentPassage = asNumber(attrs.current_passage);
    const passageCount = asNumber(attrs.passage_count);
    const plannedTotalSeconds = asNumber(attrs.planned_total_seconds) ?? 0;
    const detailParts = [];
    if (startedAtLabel) {
      detailParts.push(`Démarré ${startedAtLabel}`);
    }
    detailParts.push(`${activeZoneCount} zone${activeZoneCount > 1 ? "s" : ""} active${activeZoneCount > 1 ? "s" : ""}`);
    if (activeZoneLabels.length) {
      const zonePrefix = activeZoneLabels.length > 1 ? "Zones en cours" : "Zone en cours";
      detailParts.push(`${zonePrefix} ${activeZoneLabels.join(", ")}`);
    }
    if (currentPassage && passageCount && passageCount > 1) {
      detailParts.push(`Passage ${currentPassage}/${passageCount}`);
    }
    if (totalSeconds > 0) {
      detailParts.push(`Restant ${formatDurationHuman(remainingSeconds / 60.0)}`);
    }
    const summary = `Irrigation en cours ${formatNumber(progressPercent, 0) || 0}%`;
    return {
      active: true,
      progressPercent,
      remainingSeconds,
      elapsedSeconds,
      summary,
      detail: detailParts.join(" · "),
      startedAtLabel,
      activeZoneCount,
      activeZoneLabels,
      zoneCount,
      currentPassage,
      passageCount: passageCount ?? 1,
      plannedTotalSeconds,
      critical: progressPercent >= 90,
    };
  }

  _hasActiveWateringProgress() {
    return this._wateringProgressState().active;
  }

  _clearWateringProgressTimer() {
    if (this._wateringProgressTimer !== null) {
      window.clearInterval(this._wateringProgressTimer);
      this._wateringProgressTimer = null;
    }
  }

  _syncWateringProgressTimer() {
    if (typeof window === "undefined") {
      return;
    }
    if (this._hasActiveWateringProgress()) {
      if (this._wateringProgressTimer === null) {
        this._wateringProgressTimer = window.setInterval(() => {
          if (!this.isConnected) {
            return;
          }
          this._refreshWateringProgressSection();
        }, 5000);
      }
      return;
    }
    this._clearWateringProgressTimer();
  }

  _refreshWateringProgressSection() {
    if (!this.shadowRoot) {
      return;
    }
    const progressState = this._wateringProgressState();
    const sections = Array.from(this.shadowRoot.querySelectorAll('[data-watering-progress="section"]'));
    if (!sections.length) {
      return;
    }
    if (!progressState.active) {
      this._render();
      return;
    }
    const percent = Math.max(0, Math.min(100, asNumber(progressState.progressPercent) ?? 0));
    const remainingSeconds = Math.max(0, asNumber(progressState.remainingSeconds) ?? 0);
    const remainingLabel =
      progressState.remainingSeconds !== undefined && progressState.remainingSeconds !== null
        ? formatDurationHuman(remainingSeconds / 60.0)
        : "0 min";
    const summary = String(progressState.summary || "Irrigation en cours").trim();
    const detail = String(progressState.detail || "").trim();
    const activeZoneLabels = Array.isArray(progressState.activeZoneLabels) ? progressState.activeZoneLabels.filter(Boolean) : [];
    const activeZoneLabel = activeZoneLabels.join(" · ");
    const metaParts = [];
    if (progressState.startedAtLabel) {
      metaParts.push(progressState.startedAtLabel);
    }
    if (detail) {
      metaParts.push(detail);
    }
    if (remainingSeconds > 0) {
      metaParts.push(`${remainingLabel} restants`);
    }
    const metaText = metaParts.join(" · ") || "Session active";
    sections.forEach((section) => {
      const percentNode = section.querySelector('[data-watering-progress="percent"]');
      if (percentNode) {
        percentNode.textContent = `${Math.round(percent)} %`;
      }
      const summaryNode = section.querySelector('[data-watering-progress="summary"]');
      if (summaryNode) {
        summaryNode.textContent = summary;
      }
      const zoneNode = section.querySelector('[data-watering-progress="zone"]');
      if (zoneNode) {
        if (activeZoneLabel) {
          zoneNode.hidden = false;
          zoneNode.textContent = `Zone active · ${activeZoneLabel}`;
        } else {
          zoneNode.hidden = true;
          zoneNode.textContent = "";
        }
      }
      const progressNode = section.querySelector('[data-watering-progress="progress"]');
      if (progressNode) {
        progressNode.setAttribute("aria-label", summary);
      }
      const barNode = section.querySelector('[data-watering-progress="bar"]');
      if (barNode) {
        barNode.style.width = `${percent}%`;
        barNode.classList.toggle("gi-progress__bar--critical", Boolean(progressState.critical));
      }
      const metaNode = section.querySelector('[data-watering-progress="meta"]');
      if (metaNode) {
        metaNode.textContent = metaText;
      }
    });
  }

  _lastWateringState() {
    const entity = this._lastWateringEntity();
    if (!entity) {
      return {
        label: "Aucune irrigation détectée",
        detail: "Historique vide",
        value: null,
      };
    }
    const rawValue = asNumber(entity.state);
    const source = String(entity.attributes?.source || "").trim();
    const wateringCause = this._inferWateringCause({ entity, source });
    const dateAction = String(entity.attributes?.date_action || entity.attributes?.detected_at || "").trim();
    const zoneCount = asNumber(entity.attributes?.zone_count);
    if (source === "none" || rawValue === null || rawValue <= 0) {
      return {
        label: "Aucune irrigation détectée",
        detail: "Historique vide",
        value: null,
      };
    }
    const fragments = [];
    const sourceLabel = this._wateringSourceLabel(source, wateringCause);
    if (sourceLabel) {
      fragments.push(sourceLabel);
    }
    if (dateAction) {
      fragments.push(dateAction);
    }
    if (zoneCount !== null) {
      fragments.push(`${zoneCount} zone${zoneCount > 1 ? "s" : ""}`);
    }
    return {
      label: formatMm(rawValue),
      detail: fragments.join(" · "),
      value: rawValue,
      source,
      wateringCause,
    };
  }

  _lastWateringTotalState() {
    const entity = this._entity("entity_dernier_arrosage_total_zones");
    if (!entity) {
      return { label: "", detail: "", value: null };
    }
    const rawValue = asNumber(entity.state);
    const summary = String(entity.attributes?.summary || "").trim();
    const zoneCount = asNumber(entity.attributes?.zone_count);
    if (rawValue === null || rawValue <= 0) {
      return { label: "", detail: "", value: null };
    }
    return {
      label: formatMm(rawValue),
      detail: [
        zoneCount !== null ? `${zoneCount} zone${zoneCount > 1 ? "s" : ""}` : "",
        summary,
      ].filter(Boolean).join(" · "),
      value: rawValue,
    };
  }

  _nextMowingState() {
    const predictiveEntity = this._entity("entity_prochaine_tonte");
    if (predictiveEntity) {
      const attrs = predictiveEntity.attributes || {};
      const actionPossible = attrs.action_possible !== undefined ? Boolean(attrs.action_possible) : null;
      const normalized = (value) => {
        const text = String(value || "").trim();
        if (!text) {
          return "";
        }
        return text.toLowerCase() === "unavailable" ? "" : text;
      };
      const sensorState = normalized(predictiveEntity.state);
      const label = String(
        normalized(attrs.target_datetime_display)
        || normalized(attrs.target_display)
        || normalized(attrs.target_date)
        || sensorState
        || "",
      ).trim();
      const detail = compactDecisionText(String(attrs.reason || attrs.summary || "").trim(), { maxLength: 132 });
      const blockReason = String(attrs.block_reason || attrs.reason || "").trim().toLowerCase();
      const tone = actionPossible === true
        ? "success"
        : blockReason
          ? (blockReason.startsWith("phase_") ? "danger" : "warning")
          : "neutral";
      if (label) {
        return {
          label,
          detail,
          tone,
          value: label,
        };
      }
    }

    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const tonteAttrs = tonteEntity?.attributes || tonteAutoriseeEntity?.attributes || {};
    const mowerState = this._mowerState();
    const mowingBlock = this._mowingBlockState();
    const gazonPermetTonte = tonteAttrs.gazon_permet_tonte !== undefined
      ? Boolean(tonteAttrs.gazon_permet_tonte)
      : this._entityState("entity_tonte_autorisee", null) === "on";
    const machinePermetTonte = tonteAttrs.machine_permet_tonte !== undefined
      ? Boolean(tonteAttrs.machine_permet_tonte)
      : mowerState.present ? mowerState.ready === true : false;
    const actionPossible = tonteAttrs.action_possible !== undefined
      ? Boolean(tonteAttrs.action_possible)
      : gazonPermetTonte && machinePermetTonte && !mowingBlock.blocked;
    const nextDisplay = String(
      tonteAttrs.next_mowing_display
      || tonteAttrs.next_mowing_date
      || mowerState.nextDeparture
      || "",
    ).trim();
    if (actionPossible) {
      return {
        label: "Maintenant",
        detail: mowerState.present ? (mowerState.reason || "Terrain et machine prêts") : "Terrain prêt",
        tone: "success",
        value: "now",
      };
    }
    if (nextDisplay) {
      return {
        label: nextDisplay,
        detail: mowingBlock.reasonLabel || mowingBlock.detail || mowerState.reason || "",
        tone: mowingBlock.blocked ? "warning" : "neutral",
        value: nextDisplay,
      };
    }
    return {
      label: "À estimer",
      detail: mowingBlock.reasonLabel || mowerState.reason || "Aucune fenêtre de tonte calculée",
      tone: mowingBlock.blocked ? "warning" : "neutral",
      value: null,
    };
  }

  _nextWateringState() {
    const predictiveEntity = this._entity("entity_prochain_arrosage");
    if (predictiveEntity) {
      const attrs = predictiveEntity.attributes || {};
      const normalized = (value) => {
        const text = String(value || "").trim();
        if (!text) {
          return "";
        }
        return text.toLowerCase() === "unavailable" ? "" : text;
      };
      const stateValue = normalized(predictiveEntity.state);
      const lowerState = stateValue.toLowerCase();
      const hasBlock = String(attrs.block_reason || "").trim().length > 0;
      const noAction = lowerState.includes("non requis");
      const label = String(
        noAction || hasBlock
          ? stateValue
          : (
            normalized(attrs.target_display)
            || normalized(attrs.target_datetime)
            || normalized(attrs.target_window_label)
            || normalized(attrs.target_window)
            || stateValue
            || ""
          ),
      ).trim();
      const detail = String(
        attrs.summary
        || attrs.next_action
        || attrs.block_reason_label
        || attrs.block_reason
        || "",
      ).trim();
      const isNoAction = noAction || detail.toLowerCase().includes("aucun arrosage nécessaire");
      const tone = isNoAction
        ? "neutral"
        : hasBlock
          ? "warning"
          : lowerState.includes("maintenant") || lowerState.includes("en cours")
            ? "accent"
            : "neutral";
      if (label) {
        return {
          label,
          detail,
          tone,
          value: label,
        };
      }
    }

    const nextWindowEntity = this._entity("entity_prochaine_fenetre_optimale");
    const windowState = this._windowState();
    const wateringProgress = this._wateringProgressState();
    if (wateringProgress.active) {
      return {
        label: "En cours",
        detail: wateringProgress.detail || wateringProgress.summary,
        tone: "accent",
        value: "active",
      };
    }
    const nextWindowState = String(nextWindowEntity?.state || "").trim().toLowerCase();
    const nextWindowLabel = formatStatusLabel(nextWindowState);
    const nextWindowSummary = String(nextWindowEntity?.attributes?.summary || "").trim();
    const nextActionDate = String(windowState.nextActionDate || "").trim();
    const windowLabel = windowState.optimalWindowDisplay || windowState.wateringWindowDisplay || "";
    if (windowState.isNoActionRequired) {
      return {
        label: "Non requis",
        detail: windowState.displaySummary || nextWindowSummary || "Aucun arrosage nécessaire",
        tone: "neutral",
        value: null,
      };
    }
    if (nextActionDate || windowLabel || nextWindowState) {
      return {
        label: nextActionDate || windowLabel || nextWindowLabel,
        detail: compactDecisionText(windowState.displayNextAction || nextWindowSummary || windowState.summary, { maxLength: 120 }),
        tone: windowState.tone,
        value: nextActionDate || windowLabel || nextWindowState,
      };
    }
    return {
      label: windowState.statusLabel || "À définir",
      detail: compactDecisionText(windowState.displaySummary || windowState.summary || "Aucune fenêtre d'arrosage calculée", { maxLength: 120 }),
      tone: windowState.tone,
      value: null,
    };
  }

  _objectiveContext() {
    const entity = this._objectiveEntity();
    const temperature = asNumber(entity?.attributes?.temperature);
    const etp = asNumber(entity?.attributes?.etp);
    const risk = this._entityState("entity_risque", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    const hydricState = String(entity?.attributes?.hydric_state || "").trim();
    const hydricStrategy = String(entity?.attributes?.hydric_strategy || "").trim();
    const hydricBalanceLevel = String(entity?.attributes?.hydric_balance_level || "").trim();
    const reserveActuelle = asNumber(entity?.attributes?.reserve_actuelle_mm);
    const reserveStock = asNumber(entity?.attributes?.reserve_stock_mm);
    const reserveStockMax = asNumber(entity?.attributes?.reserve_stock_max_mm);
    const reserveUsefulMax = asNumber(entity?.attributes?.reserve_utile_max_mm ?? entity?.attributes?.reserve_utile_mm);
    const reserveSurplus = asNumber(entity?.attributes?.reserve_surplus_mm);
    const depletionMm = asNumber(entity?.attributes?.depletion_mm);
    const depletionRatio = asNumber(entity?.attributes?.depletion_ratio);
    const et0 = asNumber(entity?.attributes?.et0_mm);
    const etc = asNumber(entity?.attributes?.etc_mm);
    const kc = asNumber(entity?.attributes?.kc_gazon);
    return {
      entity,
      temperature,
      etp,
      risk,
      mode,
      typeArrosage,
      hydricState,
      hydricStrategy,
      hydricBalanceLevel,
      reserveActuelle,
      reserveStock,
      reserveStockMax,
      reserveUsefulMax,
      reserveSurplus,
      depletionMm,
      depletionRatio,
      et0,
      etc,
      kc,
    };
  }

  _irrigationSignalState() {
    const entity = this._entity("entity_signal_irrigation");
    const attrs = entity?.attributes || {};
    const reasonKind = String(attrs.reason_kind || "").trim().toLowerCase();
    const actionLabel = formatIrrigationSignalLabel({
      actionLabel: attrs.action_label,
      summary: attrs.summary,
      reasonKind,
    });
    const summary = String(attrs.summary || "").trim() || actionLabel || "Non disponible";
    const sourceStatus = String(attrs.source_status || "").trim();
    const triggerKind = String(attrs.trigger_kind || "").trim();
    const typeArrosage = String(attrs.type_arrosage || "").trim();
    const applicationStatus = String(attrs.application_post_watering_status || "").trim();
    const wateringBlockedByMower = attrs.watering_blocked_by_mower === true;
    const wateringBlockReasonCode = String(attrs.watering_block_reason_code || "").trim().toLowerCase();
    const wateringBlockReasonLabel = String(
      attrs.watering_block_reason_label
      || formatWateringBlockReason(wateringBlockReasonCode),
    ).trim();
    const wateringCause = this._inferWateringCause({ entity, attrs, typeArrosage });
    return {
      entity,
      reasonKind,
      actionLabel,
      summary,
      sourceStatus,
      triggerKind,
      wateringCause,
      typeArrosage,
      applicationStatus,
      wateringBlockedByMower,
      wateringBlockReasonCode,
      wateringBlockReasonLabel,
      tone: formatIrrigationSignalTone({ reasonKind, triggerKind }),
    };
  }

  _manualActionService() {
    const service = String(this._config?.manual_action_service || "").trim();
    if (!service) {
      return "gazon_intelligent.start_manual_irrigation";
    }
    return service;
  }

  _serviceTargetEntityId() {
    return (
      this._entityId("entity_assistant") ||
      this._entityId("entity_mode") ||
      this._entityId("entity_conseil") ||
      this._entityId("entity_tonte")
    );
  }

  _manualActionLabel() {
    const label = String(this._config?.manual_action_label || "").trim();
    if (!label || label.toLowerCase() === "lancer l'arrosage manuel") {
      return "Irrigation manuelle";
    }
    return label;
  }

  _manualActionStyle() {
    return [
      "background: linear-gradient(135deg, color-mix(in srgb, var(--gazon-success-color) 88%, white) 0%, color-mix(in srgb, var(--gazon-water-color) 84%, white) 100%)",
      "border: 1px solid color-mix(in srgb, var(--gazon-success-color) 52%, var(--divider-color))",
      "color: var(--primary-text-color)",
      "box-shadow: 0 12px 24px color-mix(in srgb, var(--gazon-success-color) 22%, transparent), 0 0 0 1px color-mix(in srgb, var(--gazon-success-color) 16%, transparent)",
    ].join("; ");
  }

  _canShowLegacyDetails() {
    return Boolean(this._config?.show_advanced_details);
  }

  _isPreviewMode() {
    if (typeof window === "undefined") {
      return false;
    }
    const pathname = String(window.location?.pathname || "");
    return pathname.includes("/config/lovelace");
  }

  _applyHostVariables({ accent, activeTone, sectionAccent, borderRadius, iconSize, tabPalette }) {
    if (!this.style) {
      return;
    }
    const palette = tabPalette || this._tabPalette(this._activeTab);
    const vars = {
      "--gazon-accent-color": accent,
      "--gazon-card-accent": accent,
      "--gazon-card-tone-color": accent,
      "--gazon-card-tone": activeTone,
      "--gazon-section-accent": sectionAccent,
      "--gazon-lawn-color": `color-mix(in srgb, ${sectionAccent} 62%, #80da67)`,
      "--gazon-water-color": `color-mix(in srgb, ${accent} 42%, #44c8ea)`,
      "--gazon-moss-color": `color-mix(in srgb, ${sectionAccent} 74%, #4d9f58)`,
      "--gi-soil-color": `color-mix(in srgb, ${accent} 18%, #b8865d)`,
      "--gi-tab-accent": palette.accent,
      "--gi-tab-companion": palette.companion,
      "--gi-tab-glow-color": palette.glow,
      "--gi-tab-mist-color": palette.mist,
      "--gi-tab-shadow": `0 18px 36px color-mix(in srgb, ${palette.glow} 16%, transparent)`,
      "--gazon-danger-color": STATUS_COLORS.danger,
      "--gazon-warning-color": STATUS_COLORS.warning,
      "--gazon-success-color": STATUS_COLORS.success,
      "--gazon-neutral-color": STATUS_COLORS.neutral,
      "--gazon-accent-tone-color": STATUS_COLORS.accent,
      "--gazon-critical-color": STATUS_COLORS.critical,
      "--gazon-border-radius": borderRadius,
      "--gazon-icon-size": iconSize,
      "--gazon-card-gap": this._config?.compact ? "10px" : "16px",
      "--gazon-card-padding": this._config?.compact ? "12px" : "18px",
    };

    Object.entries(vars).forEach(([name, value]) => {
      if (value === undefined || value === null || value === "") {
        this.style.removeProperty(name);
        return;
      }
      this.style.setProperty(name, String(value));
    });
  }

  _renderSignature() {
    if (!this._config) {
      return "no-config";
    }

    const keys = new Set([
      ...MINIMAL_PUBLIC_CONTRACT_ENTITY_KEYS,
      "entity_phase",
      "entity_sous_phase",
      "entity_tonte",
      "entity_hauteur",
      "entity_arrosage_en_cours",
      "entity_arrosage_recommande",
      "entity_arrosage_apres_application_autorise",
      "entity_debug_intervention",
      "entity_tonte_autorisee",
      "entity_niveau",
      "entity_risque",
      "entity_fenetre_optimale",
      "entity_weather",
      "entity_plan_arrosage",
      "entity_dernier_arrosage",
      "entity_derniere_application",
      "entity_conseil",
      "entity_action",
      "entity_avoid",
      "entity_objectif_arrosage",
      "entity_objectif_legacy",
      "entity_objectif_depletion",
      "entity_reserve_actuelle",
      "entity_depletion_ratio",
      "entity_etat_hydrique",
      "entity_et0",
      "entity_etc",
      "entity_type_arrosage",
      "entity_mode",
      "entity_switch_arrosage_automatique",
      "entity_switch_coordination_tondeuse",
      "entity_arrosage_en_cours",
      "entity_debit_zone_1",
      "entity_debit_zone_2",
      "entity_debit_zone_3",
      "entity_debit_zone_4",
      "entity_debit_zone_5",
      "entity_hauteur_min_tondeuse",
      "entity_hauteur_max_tondeuse",
      "entity_delai_reprise_tonte_apres_arrosage",
      "entity_catalogue_produits",
      "entity_produit_intervention",
    ]);

    if (this._canShowLegacyDetails()) {
      LEGACY_ENTITY_KEYS.forEach((key) => keys.add(key));
      ENTITY_KEYS.forEach((field) => keys.add(field.key));
    } else {
      if (this._activeTab === "mowing") {
        ["entity_tonte", "entity_hauteur", "entity_tonte_autorisee", "entity_fenetre_optimale"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "gazon") {
        ["entity_assistant", "entity_phase", "entity_sous_phase", "entity_niveau", "entity_risque", "entity_conseil", "entity_action", "entity_avoid"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "products") {
        ["entity_catalogue_produits", "entity_produit_intervention", "entity_derniere_application"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "config") {
        [
          "entity_switch_arrosage_automatique",
          "entity_switch_coordination_tondeuse",
          "entity_arrosage_apres_application_autorise",
          "entity_tonte_autorisee",
          "entity_mode",
          "entity_debit_zone_1",
          "entity_debit_zone_2",
          "entity_debit_zone_3",
          "entity_debit_zone_4",
          "entity_debit_zone_5",
          "entity_hauteur_min_tondeuse",
          "entity_hauteur_max_tondeuse",
          "entity_delai_reprise_tonte_apres_arrosage",
        ].forEach((key) => keys.add(key));
      } else {
        [
          "entity_fenetre_optimale",
          "entity_plan_arrosage",
          "entity_dernier_arrosage",
          "entity_derniere_application",
          "entity_debug_intervention",
          "entity_assistant",
          "entity_conseil",
          "entity_action",
          "entity_avoid",
          "entity_objectif_arrosage",
          "entity_objectif_legacy",
          "entity_objectif_depletion",
          "entity_reserve_actuelle",
          "entity_depletion_ratio",
          "entity_etat_hydrique",
          "entity_et0",
          "entity_etc",
          "entity_type_arrosage",
          "entity_arrosage_en_cours",
          "entity_arrosage_recommande",
          "entity_arrosage_apres_application_autorise",
          "entity_tonte_autorisee",
          "entity_phase",
          "entity_sous_phase",
          "entity_niveau",
          "entity_tonte",
          "entity_hauteur",
        ].forEach((key) => keys.add(key));
      }
    }

    const snapshot = {
      activeTab: this._activeTab,
      activeSection: this._activeSection,
      preview: this._isPreviewMode(),
      config: {
        title: this._config.title,
        show_icons: Boolean(this._config.show_icons),
        show_header: Boolean(this._config.show_header),
        show_background: Boolean(this._config.show_background),
        minimal_mode: Boolean(this._config.minimal_mode),
        show_secondary_info: Boolean(this._config.show_secondary_info),
        show_advanced_details: Boolean(this._config.show_advanced_details),
        theme_mode: this._config.theme_mode,
        accent_color: this._config.accent_color,
        icon_size: this._config.icon_size,
        border_radius: this._config.border_radius,
        background_style: this._config.background_style,
      },
      entities: {},
    };

    [...keys].sort().forEach((key) => {
      const entity = this._entity(key);
      if (!entity) {
        snapshot.entities[key] = null;
        return;
      }
      const attrs = RENDER_SIGNATURE_ATTRS[key];
      const attributes = {};
      if (Array.isArray(attrs) && attrs.length > 0) {
        attrs.forEach((attr) => {
          if (entity.attributes?.[attr] !== undefined) {
            attributes[attr] = entity.attributes[attr];
          }
        });
      }
      snapshot.entities[key] = {
        state: entity.state,
        attributes,
      };
    });

    return JSON.stringify(snapshot);
  }

  _statusIcon(status) {
    switch (status) {
      case "bloque":
        return "mdi:cancel";
      case "en_attente":
        return "mdi:clock-outline";
      case "auto":
        return "mdi:check-circle-outline";
      default:
        return "mdi:information-outline";
    }
  }

  _renderTabNav() {
    return renderTabNav(this);
  }

  _renderStatCard(label, value, tone = "neutral", icon = null, secondary = "", interactive = false) {
    return renderCardCore({
      kind: "stat",
      label,
      value,
      tone,
      icon: this._config?.show_icons ? icon : null,
      secondary,
      interactive,
    });
  }

  _overviewFacts() {
    const windowState = this._windowState();
    const planState = this._planState();
    const assistant = this._assistantState();
    const conseil = this._entityState("entity_conseil", null);
    const irrigationSignal = this._irrigationSignalState();
    const intervention = this._interventionRecommendationState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const switchState = this._configSwitchState();
    const tonte = this._entityState("entity_tonte", null);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const risk = this._entityState("entity_risque", null);
    const afterApplication = this._entity("entity_arrosage_apres_application_autorise");
    const afterApplicationInfo = this._postApplicationState(afterApplication);
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    const wateringCause = irrigationSignal.wateringCause || windowState.wateringCause || this._inferWateringCause({ typeArrosage });
    const niveauHydrique = String(this._entityAttribute("entity_niveau", "niveau_action_hydrique", "") || "").trim();
    const lastWatering = this._lastWateringState();
    const nextWatering = this._nextWateringState();
    const nextMowing = this._nextMowingState();
    const nextMowingEntity = this._entity("entity_prochaine_tonte");
    const nextMowingBlockReason = String(nextMowingEntity?.attributes?.block_reason || "").trim().toLowerCase();
    const height = this._entity("entity_hauteur");
    const heightValue = height ? formatCm(height.state) : "Non disponible";
    const heightSecondary =
      height && height.attributes?.hauteur_tonte_min_cm !== undefined && height.attributes?.hauteur_tonte_max_cm !== undefined
        ? `${formatCm(height.attributes.hauteur_tonte_min_cm)} → ${formatCm(height.attributes.hauteur_tonte_max_cm)}`
        : "";
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);

    const facts = [];
    const addFact = ({ label, value, tone = "neutral", icon = null, secondary = "", entityKey = null }) => {
      if (isEmpty(value)) {
        return;
      }
      facts.push({ label, value, tone, icon, secondary, entityKey });
    };

    const wateringFocus = objective > 0 || arrosageRecommande === "on" || windowState.isAwaiting || windowState.showManualAction || wateringCause === "post_application";
    const mowingFocus =
      computeTonteTone(tonte) !== "neutral" ||
      computeRisqueTone(risk) !== "neutral" ||
      tonteAutorisee === "off" ||
      !isEmpty(phase) ||
      !isEmpty(subPhase);
    const strongMowingFocus =
      nextMowingBlockReason.startsWith("phase_")
      || computeTonteTone(tonte) === "danger"
      || computeTonteTone(tonte) === "critical";
    const configFocus =
      switchState.tone !== "success" ||
      ["bloque", "en_attente", "non_autorise"].includes(afterApplicationInfo.kind) ||
      !isEmpty(mode);
    const stableState = !wateringFocus && !mowingFocus && !configFocus;

    const priorityGroup = [
      {
        label: "Assistant",
        value: assistant.summary || conseil || "Non disponible",
        tone: assistant.tone || computeActionTone(this._entityState("entity_niveau", null)),
        icon: "mdi:account-tie-hat-outline",
        secondary: assistant.detail || conseil || "",
        entityKey: "entity_assistant",
      },
      {
        label: "Niveau global",
        value: formatStatusLabel(this._entityState("entity_niveau", null)),
        tone: computeActionTone(this._entityState("entity_niveau", null)),
        icon: "mdi:signal",
        secondary: niveauHydrique ? `Hydrique: ${formatStatusLabel(niveauHydrique)}` : "",
        entityKey: "entity_niveau",
      },
    ];

    const waterGroup = [
      {
        label: "Irrigation",
        value: irrigationSignal.actionLabel || irrigationSignal.summary || formatRecommendationState(arrosageRecommande),
        tone: irrigationSignal.tone || (arrosageRecommande === "on" ? "success" : windowState.tone),
        icon: "mdi:sprinkler",
        secondary: [
          irrigationSignal.summary || windowState.displaySummary || planState.summary || objectiveLabel,
          wateringCause ? `Cause: ${formatWateringCauseLabel(wateringCause)}` : "",
        ].filter(Boolean).join(" · "),
        entityKey: "entity_signal_irrigation",
      },
      {
        label: "Prochain arrosage",
        value: nextWatering.label,
        tone: nextWatering.tone,
        icon: "mdi:clock-water-outline",
        secondary: nextWatering.detail,
        entityKey: "entity_prochain_arrosage",
      },
      {
        label: "Dernier arrosage",
        value: lastWatering.label,
        tone: lastWatering.value !== null ? "success" : "neutral",
        icon: "mdi:water-check",
        secondary: lastWatering.detail,
        entityKey: "entity_dernier_arrosage",
      },
    ];

    const mowingGroup = [
      {
        label: "Tonte",
        value: formatStatusLabel(tonte),
        tone: computeTonteTone(tonte),
        icon: "mdi:content-cut",
        secondary: heightValue !== "Non disponible" ? `Hauteur: ${heightValue}` : "",
        entityKey: "entity_tonte",
      },
      {
        label: "Prochaine tonte",
        value: nextMowing.label,
        tone: nextMowing.tone,
        icon: "mdi:calendar-clock",
        secondary: nextMowing.detail,
        entityKey: "entity_prochaine_tonte",
      },
      {
        label: "Risque",
        value: formatStatusLabel(risk),
        tone: computeRisqueTone(risk),
        icon: "mdi:shield-alert-outline",
        secondary: subPhase ? `Sous-phase: ${formatStatusLabel(subPhase)}` : "",
        entityKey: "entity_risque",
      },
      {
        label: "Hauteur",
        value: heightValue,
        tone: this._phaseTone(),
        icon: "mdi:ruler-square",
        secondary: heightSecondary,
        entityKey: "entity_hauteur",
      },
      {
        label: "Sous-phase",
        value: formatStatusLabel(subPhase),
        tone: phaseTone(phase),
        icon: "mdi:sprout",
        secondary: phase ? `Phase: ${formatStatusLabel(phase)}` : "",
        entityKey: "entity_sous_phase",
      },
    ];

    const configGroup = [
      {
        label: "Réglages",
        value: switchState.label,
        tone: switchState.tone,
        icon: "mdi:switch",
        secondary: !isEmpty(mode)
          ? `Mode: ${formatApplicationMode(mode)}`
          : afterApplication
            ? `Post-application: ${afterApplicationInfo.label}`
            : "",
        entityKey: "entity_switch_arrosage_automatique",
      },
      {
        label: "Dernier arrosage",
        value: lastWatering.label,
        tone: lastWatering.value !== null ? "success" : "neutral",
        icon: "mdi:water-check",
        secondary: lastWatering.detail,
        entityKey: "entity_dernier_arrosage",
      },
    ];

    const pushGroup = (group) => {
      for (const item of group) {
        if (facts.length >= 4) {
          return;
        }
        addFact(item);
      }
    };

    pushGroup(priorityGroup);

    if (strongMowingFocus) {
      pushGroup(mowingGroup);
      if (facts.length < 4) {
        pushGroup(waterGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    } else if (wateringFocus) {
      pushGroup(waterGroup);
      if (facts.length < 4) {
        pushGroup(mowingGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    } else if (mowingFocus) {
      pushGroup(mowingGroup);
      if (facts.length < 4) {
        pushGroup(waterGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    } else if (configFocus) {
      pushGroup(configGroup);
      if (facts.length < 4) {
        pushGroup(waterGroup);
      }
      if (facts.length < 4) {
        pushGroup(mowingGroup);
      }
    } else if (stableState) {
      pushGroup(waterGroup);
      if (facts.length < 4) {
        pushGroup(mowingGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    }

    if (facts.length < 4) {
      pushGroup([
        {
          label: "Intervention",
          value: intervention.entity ? (intervention.ui?.summary || "Intervention") : "Aucune intervention",
          tone: intervention.entity ? (intervention.ui?.tone || "neutral") : "neutral",
          icon: intervention.entity ? (intervention.ui?.icon || "mdi:spray-bottle") : "mdi:spray-bottle",
          secondary: intervention.entity ? (intervention.ui?.hint || intervention.reason || "") : "",
          entityKey: "entity_prochaine_intervention",
        },
      ]);
    }

    if (facts.length < 4) {
      pushGroup([
        {
          label: "Réglages",
          value: switchState.label,
          tone: switchState.tone,
          icon: "mdi:switch",
          secondary: !isEmpty(mode) ? `Mode: ${formatApplicationMode(mode)}` : "",
          entityKey: "entity_switch_arrosage_automatique",
        },
        {
          label: "Dernier arrosage",
          value: lastWatering.label,
          tone: lastWatering.value !== null ? "success" : "neutral",
          icon: "mdi:water-check",
          secondary: lastWatering.detail,
          entityKey: "entity_dernier_arrosage",
        },
      ]);
    }

    return facts.slice(0, 4);
  }

  _renderWateringProgressSection(progressState) {
    return renderWateringProgressSection(this, progressState);
  }

  _overviewProposal() {
    const windowState = this._windowState();
    const planState = this._planState();
    const assistant = this._assistantState();
    const irrigationSignal = this._irrigationSignalState();
    const intervention = this._interventionRecommendationState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const switchState = this._configSwitchState();
    const mowerState = this._mowerState();
    const tonte = this._entityState("entity_tonte", null);
    const risk = this._entityState("entity_risque", null);
    const conseil = this._entityState("entity_conseil", null);
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const arrosageApresApplication = this._entity("entity_arrosage_apres_application_autorise");
    const afterApplicationInfo = this._postApplicationState(arrosageApresApplication);
    const wateringCause = irrigationSignal.wateringCause || windowState.wateringCause || this._inferWateringCause({ typeArrosage: this._entityState("entity_type_arrosage", null) });
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const tonteEntity = this._entity("entity_tonte");
    const prochaineTonteEntity = this._entity("entity_prochaine_tonte");
    const tonteAttrs = tonteEntity?.attributes || {};
    const nextMowingBlockReason = String(prochaineTonteEntity?.attributes?.block_reason || "").trim().toLowerCase();
    const tonteReason = String(
      prochaineTonteEntity?.attributes?.reason
      || prochaineTonteEntity?.attributes?.summary
      || tonteEntity?.attributes?.raison_blocage_tonte
      || tonteEntity?.attributes?.summary
      || "",
    ).trim();
    const assistantReason = String(assistant.reason || "").trim();
    const tonteNextMowing = String(
      mowerState.nextDeparture
      || tonteEntity?.attributes?.next_mowing_display
      || this._entity("entity_tonte_autorisee")?.attributes?.next_mowing_display
      || "",
    ).trim();
    const tonteStatusLabel = formatStatusLabel(tonte);
    const tonteTone = computeTonteTone(tonte);
    const strongMowingBlock =
      nextMowingBlockReason.startsWith("phase_")
      || tonteTone === "danger"
      || tonteTone === "critical";
    const interventionSignal = this._entity("entity_signal_intervention");
    const actionTone = this._actionTone();

    let title = "Vue d’ensemble";
    let hint = compactDecisionText(conseil || planState.summary || windowState.summary || "Les paramètres restent cohérents.", { maxLength: 150 });
    let tone = "neutral";
    let icon = "mdi:check-circle-outline";
    const mowingBusy = assistant.status === "blocked" && assistant.action === "tonte" && (
      assistantReason.toLowerCase().includes("déjà en cours")
      || assistantReason.toLowerCase().includes("en cours")
      || tonteReason.toLowerCase().includes("déjà en cours")
      || tonteReason.toLowerCase().includes("en cours")
      || mowerState.tone === "accent"
      || mowerState.operationLabel === "Tonte en cours"
    );
    const mowingActionPossible = tonteAttrs.action_possible !== undefined
      ? Boolean(tonteAttrs.action_possible)
      : tonteAutorisee === "on" && mowerState.ready === true;

    if (strongMowingBlock) {
      title = tonteStatusLabel || "Tonte interdite";
      hint = compactDecisionText(tonteReason || avoid || "Tonte déconseillée dans les conditions actuelles.", { maxLength: 150 });
      tone = tonteTone === "critical" ? "critical" : "danger";
      icon = "mdi:content-cut";
    } else if (wateringCause === "post_application" && irrigationSignal.reasonKind === "blocked") {
      title = "Post-produit bloqué";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Un blocage empêche l’arrosage post-produit.", { maxLength: 150 });
      tone = "danger";
      icon = "mdi:cancel";
    } else if (wateringCause === "post_application" && irrigationSignal.reasonKind === "waiting") {
      title = "Post-produit en attente";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Le post-arrosage reste en attente.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (wateringCause === "post_application" && ["post_application", "hydric_need"].includes(irrigationSignal.reasonKind)) {
      title = irrigationSignal.actionLabel || "Post-produit prêt";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Le post-arrosage est prêt.", { maxLength: 150 });
      tone = "success";
      icon = "mdi:sprinkler";
    } else if (assistant.entity && assistant.status === "action_required") {
      title = assistant.summary || assistant.actionLabel;
      hint = compactDecisionText(conseil || assistant.reason || irrigationSignal.summary || planState.summary || windowState.displaySummary, { maxLength: 150 });
      tone = assistant.tone || "success";
      icon = assistant.action.includes("arros") ? "mdi:sprinkler" : assistant.action.includes("tonte") ? "mdi:content-cut" : "mdi:account-tie-hat-outline";
    } else if (irrigationSignal.reasonKind === "blocked") {
      title = irrigationSignal.actionLabel || "Irrigation bloquée";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Un blocage empêche l’arrosage.", { maxLength: 150 });
      tone = "danger";
      icon = "mdi:cancel";
    } else if (irrigationSignal.reasonKind === "waiting" && objective > 0) {
      title = irrigationSignal.actionLabel || "Attendre";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Le prochain créneau n’est pas encore ouvert.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (windowState.isAwaiting && objective > 0) {
      title = "Irrigation prévue demain matin";
      hint = compactDecisionText(`${windowState.nextAction || "Attendre le créneau prévu."}${planState.summary ? ` · ${planState.summary}` : ""}`, { maxLength: 150 });
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (windowState.showManualAction && objective > 0) {
      title = "Irrigation manuelle possible";
      hint = `${objectiveLabel} à déclencher maintenant.${conseil ? ` ${conseil}` : ""}`.trim();
      tone = actionTone === "critical" ? "critical" : "success";
      icon = "mdi:water-pump";
    } else if (windowState.isBlocked) {
      title = "Irrigation bloquée";
      hint = windowState.nextAction || windowState.summary || "Le créneau prévu n’est pas encore ouvert.";
      tone = "danger";
      icon = "mdi:cancel";
    } else if (mowingBusy) {
      title = "Tonte en cours";
      hint = compactDecisionText(assistant.reason || tonteReason || "La tondeuse est déjà en train de tondre.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:content-cut";
    } else if (assistant.status === "blocked" && assistant.action === "tonte") {
      title = assistant.reason || assistant.summary || "Tonte différée";
      hint = compactDecisionText(assistant.reason || tonteReason || conseil || planState.summary || windowState.displaySummary, { maxLength: 150 });
      tone = assistant.tone === "danger" ? "danger" : "warning";
      icon = "mdi:content-cut";
    } else if (mowingActionPossible) {
      title = "Tonte possible";
      hint = compactDecisionText(assistant.reason || tonteReason || conseil || planState.summary || windowState.displaySummary, { maxLength: 150 });
      tone = "success";
      icon = "mdi:content-cut";
    } else if (tonteTone === "danger" || tonteTone === "critical") {
      title = tonteStatusLabel || "Tonte interdite";
      hint = compactDecisionText(tonteReason || avoid || "Tonte déconseillée dans les conditions actuelles.", { maxLength: 150 });
      tone = tonteTone === "critical" ? "critical" : "danger";
      icon = "mdi:content-cut";
    } else if (tonteTone === "warning") {
      title = tonteStatusLabel || "Tonte à surveiller";
      const mowerHint = mowerState.present && mowerState.nextDeparture
        ? `Prochain départ programmé le ${mowerState.nextDeparture}.`
        : "";
      hint = compactDecisionText([
        tonteReason,
        mowerHint || (tonteNextMowing ? `Prochaine tonte estimée le ${tonteNextMowing}.` : ""),
      ].filter(Boolean).join(" ") || conseil || "Attendre une meilleure fenêtre de tonte.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:content-cut";
    } else if (computeRisqueTone(risk) === "danger" || computeRisqueTone(risk) === "critical") {
      title = "Risque gazon élevé";
      hint = action || conseil || "Ouvrir l’onglet Gazon pour voir les détails avancés.";
      tone = computeRisqueTone(risk);
      icon = "mdi:shield-alert-outline";
    } else if (arrosageRecommande === "on") {
      title = "Irrigation recommandée";
      hint = `${conseil || planState.summary || objectiveLabel}${
        ["bloque", "en_attente", "non_autorise"].includes(afterApplicationInfo.kind)
          ? ` · Post-application ${afterApplicationInfo.label.toLowerCase()}`
          : ""
      }`;
      tone = "success";
      icon = "mdi:water-check";
    } else if (switchState.tone === "danger") {
      title = "Irrigation automatique désactivée";
      hint = "L’onglet Réglages permet de vérifier l’autorisation et les débits.";
      tone = "danger";
      icon = "mdi:switch-off";
    } else if (conseil) {
      const normalizedAdvice = String(conseil).trim().toLowerCase();
      const interventionTrigger = String(interventionSignal?.attributes?.trigger_kind || "").trim().toLowerCase();
      hint = conseil;
      if (normalizedAdvice.startsWith("tonte")) {
        title = mowingActionPossible ? "Tonte possible" : "Tonte en cours";
        tone = mowingActionPossible ? "success" : "warning";
        icon = "mdi:content-cut";
      } else if (normalizedAdvice.startsWith("intervention")) {
        title = interventionTrigger === "ready" ? "Intervention prête" : interventionTrigger === "recommended" ? "Intervention recommandée" : "Intervention à préparer";
        tone = interventionTrigger === "ready" || interventionTrigger === "recommended" ? "success" : "warning";
        icon = "mdi:spray-bottle";
      } else if (normalizedAdvice.startsWith("traitement")) {
        title = normalizedAdvice.includes("bloqué") || normalizedAdvice.includes("bloque") ? "Traitement bloqué" : "Traitement conseillé";
        tone = normalizedAdvice.includes("bloqué") || normalizedAdvice.includes("bloque") ? "warning" : "success";
        icon = "mdi:flask-outline";
      } else if (normalizedAdvice.startsWith("pas d'arrosage") || normalizedAdvice.startsWith("n'arrose pas")) {
        title = "Aucune irrigation requise";
        tone = "neutral";
        icon = "mdi:water-off";
      }
    } else if (intervention.entity) {
      title = intervention.ui?.summary || intervention.ui?.title || "Intervention";
      hint = intervention.ui?.hint || intervention.reason || intervention.whyNow || "Intervention disponible";
      tone = intervention.ui?.tone || "neutral";
      icon = intervention.ui?.icon || "mdi:spray-bottle";
    }

    return { title, hint, tone, icon };
  }

  _planTypeTone(planType) {
    const normalized = String(planType ?? "").trim().toLowerCase();
    if (normalized === "multi_zone") {
      return "accent";
    }
    if (normalized === "single_zone") {
      return "success";
    }
    if (normalized === "no_plan") {
      return "neutral";
    }
    return "neutral";
  }

  _configSwitchState() {
    const state = String(this._entityState("entity_switch_arrosage_automatique", "")).trim().toLowerCase();
    if (["on", "true", "yes", "1", "oui"].includes(state)) {
      return { label: "Autorisé", tone: "success" };
    }
    if (["off", "false", "no", "0", "non"].includes(state)) {
      return { label: "Désactivé", tone: "danger" };
    }
    return { label: "Non disponible", tone: "neutral" };
  }

  _mowerCoordinationSwitchState() {
    const state = String(this._entityState("entity_switch_coordination_tondeuse", "")).trim().toLowerCase();
    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const tonteAttrs = tonteEntity?.attributes || {};
    const fallbackAttrs = tonteAutoriseeEntity?.attributes || {};
    const attrs = tonteAttrs.mower_coordination_ready !== undefined
      || tonteAttrs.mower_reason_label
      || tonteAttrs.mower_reason_code
      ? tonteAttrs
      : fallbackAttrs;
    const coordinationReady = attrs.mower_coordination_ready;
    const reasonCode = String(attrs.mower_reason_code || "").trim().toLowerCase();
    const reasonLabel = String(
      attrs.mower_reason_label
      || formatMowerReasonLabel(reasonCode),
    ).trim();
    const hardBlockReason = ["ambiguous", "mower_ambiguous", "missing", "mower_missing", "configured_missing", "mower_configured_missing"].includes(reasonCode);
    if (hardBlockReason) {
      return { label: reasonLabel || "Tondeuse à vérifier", tone: "danger" };
    }
    if (["on", "true", "yes", "1", "oui"].includes(state)) {
      if (coordinationReady === false) {
        const tone = reasonCode === "error" ? "danger" : "warning";
        return { label: reasonLabel || "À surveiller", tone };
      }
      return { label: "Active", tone: "success" };
    }
    if (["off", "false", "no", "0", "non"].includes(state)) {
      return { label: "Désactivée", tone: "danger" };
    }
    return { label: "Non disponible", tone: "neutral" };
  }

  _zoneDebitEntries() {
    return [
      { key: "entity_debit_zone_1", label: "Débit zone 1" },
      { key: "entity_debit_zone_2", label: "Débit zone 2" },
      { key: "entity_debit_zone_3", label: "Débit zone 3" },
      { key: "entity_debit_zone_4", label: "Débit zone 4" },
      { key: "entity_debit_zone_5", label: "Débit zone 5" },
    ];
  }

  _renderConfigValue(entityKey, suffix = "") {
    const entity = this._entity(entityKey);
    if (!entity) {
      return { value: "Non disponible", tone: "neutral", secondary: "" };
    }
    const raw = entity.state;
    const numeric = asNumber(raw);
    if (numeric !== null) {
      const digits = suffix === "min" ? 0 : 1;
      return {
        value: suffix ? `${formatNumber(numeric, digits)} ${suffix}` : formatNumber(numeric, digits) || String(raw),
        tone: "accent",
        secondary: "",
      };
    }
    return {
      value: normalizeDisplayValue(raw),
      tone: String(raw).toLowerCase() === "on" ? "success" : String(raw).toLowerCase() === "off" ? "danger" : "neutral",
      secondary: "",
    };
  }

  _renderDecisionLayout() {
    return renderDecisionLayout(this);
  }

  _setActiveSection(section) {
    if (!SECTION_FIELDS[section] || this._activeSection === section) {
      return;
    }
    this._activeSection = section;
    this._render();
  }

  _sectionForTab(tab) {
    switch (tab) {
      case "watering":
        return "watering";
      case "mowing":
        return "mowing";
      case "gazon":
      case "config":
        return "details";
      case "overview":
      default:
        return "overview";
    }
  }

  _setActiveTab(tab) {
    if (!TAB_DEFS.some((entry) => entry.key === tab) || this._activeTab === tab) {
      return;
    }
    this._activeTab = tab;
    if (this._canShowLegacyDetails()) {
      this._activeSection = this._sectionForTab(tab);
    }
    this._render();
  }

  _scrollTabNavIntoView() {
    if (typeof window === "undefined" || !this.shadowRoot) {
      return;
    }

    const sync = (navSelector, activeSelector) => {
      const nav = this.shadowRoot.querySelector(navSelector);
      const active = this.shadowRoot.querySelector(activeSelector);
      if (!nav || !active || typeof active.scrollIntoView !== "function") {
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      if (activeRect.left < navRect.left || activeRect.right > navRect.right) {
        active.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    };

    sync(".tab-nav", ".tab-nav__item--active");
    sync(".section-nav", ".section-nav__item--active");
  }

  _fieldSection(fieldKey) {
    if (OVERVIEW_ENTITY_KEYS.has(fieldKey)) {
      return "overview";
    }
    if ([
      "entity_arrosage_recommande",
      "entity_objectif_arrosage",
      "entity_objectif_legacy",
      "entity_objectif_depletion",
      "entity_type_arrosage",
      "entity_signal_irrigation",
      "entity_reserve_actuelle",
      "entity_depletion_ratio",
      "entity_etat_hydrique",
      "entity_et0",
      "entity_etc",
    ].includes(fieldKey)) {
      return "watering";
    }
    if (["entity_tonte", "entity_hauteur"].includes(fieldKey)) {
      return "mowing";
    }
    return "details";
  }

  _fieldAccent(fieldKey, tone = "neutral") {
    if (tone && tone !== "neutral") {
      return toneToColor(tone);
    }
    return this._sectionAccent(this._fieldSection(fieldKey));
  }

  _isMinimalMode() {
    return Boolean(this._config?.minimal_mode);
  }

  _heroMetricIcon(fieldKey, value) {
    const normalized = String(value ?? "").toLowerCase();

    if (fieldKey === "entity_niveau_pertinence") {
      return "mdi:signal";
    }

    if (fieldKey === "entity_prochaine_fenetre_optimale") {
      return "mdi:clock-outline";
    }

    if (fieldKey === "entity_prochain_blocage_attendu") {
      return "mdi:alert-circle-outline";
    }

    if (fieldKey === "entity_phase") {
      if (normalized.includes("sursem")) return "mdi:sprout";
      if (normalized.includes("hivern")) return "mdi:snowflake";
      if (normalized.includes("trait")) return "mdi:flask-outline";
      if (normalized.includes("fert")) return "mdi:leaf";
      return "mdi:grass";
    }

    if (fieldKey === "entity_sous_phase") {
      if (normalized.includes("germin")) return "mdi:seed";
      if (normalized.includes("enracin")) return "mdi:sprout";
      if (normalized.includes("reprise")) return "mdi:autorenew";
      return "mdi:sprout";
    }

    if (fieldKey === "entity_tonte") {
      if (normalized.includes("interdit")) return "mdi:content-cut";
      if (normalized.includes("surveil") || normalized.includes("prud")) return "mdi:content-cut";
      return "mdi:content-cut";
    }

    if (fieldKey === "entity_arrosage_recommande") {
      return ["on", "true", "yes", "1", "oui"].includes(normalized) ? "mdi:water-check" : "mdi:water-off";
    }

    if (fieldKey === "entity_tonte_autorisee") {
      return ["on", "true", "yes", "1", "oui"].includes(normalized) ? "mdi:content-cut" : "mdi:content-cut";
    }

    if (fieldKey === "entity_arrosage_apres_application_autorise") {
      return ["on", "true", "yes", "1", "oui"].includes(normalized) ? "mdi:water-check" : "mdi:water-off";
    }

    if (fieldKey === "entity_signal_irrigation") {
      return "mdi:sprinkler";
    }

    if (fieldKey === "entity_signal_intervention") {
      return "mdi:spray-bottle";
    }

    if (fieldKey === "entity_hauteur") {
      return "mdi:ruler-square";
    }

    return "mdi:information-outline";
  }

  _renderMetric(label, value, tone = "neutral", icon = null) {
    if (isEmpty(value)) {
      return "";
    }
    return renderCardCore({
      kind: "metric",
      label,
      value,
      tone,
      icon,
      iconSize: "sm",
      secondary: "",
    });
  }

  _renderTile(field) {
    const entityId = this._entityId(field.key);
    if (!entityId) {
      return "";
    }
    const entity = this._entity(field.key);
    const value = this._formatFieldValue(field, entity);
    const tone = this._toneForField(field, entity);
    const secondary = this._secondaryFieldText(field, entity);
    const icon = this._config?.show_icons
      ? (typeof iconForField === "function" ? iconForField(field) : "mdi:help-circle-outline")
      : null;
    const accent = this._fieldAccent(field.key, tone);

    return renderCardCore({
      kind: "tile",
      label: field.label,
      value,
      tone,
      icon,
      secondary: this._config?.show_secondary_info ? secondary : "",
      style: accent ? `--gazon-tile-accent: ${accent};` : "",
    });
  }

  _renderAdvancedGroup(title, meta, keys, eyebrow = "Détail") {
    const fields = keys
      .map((key) => ENTITY_KEYS.find((field) => field.key === key))
      .filter(Boolean)
      .filter((field) => this._entityId(field.key));
    if (!fields.length) {
      return "";
    }
    const cards = fields.map((field) => {
      const entity = this._entity(field.key);
      const value = this._formatFieldValue(field, entity);
      const tone = this._toneForField(field, entity);
      const secondary = this._config?.show_secondary_info ? this._secondaryFieldText(field, entity) : "";
      const eid = this._entityId(field.key);
      const vTone = ["success", "warning", "danger", "critical"].includes(tone) ? ` gz2-card__value--${tone}` : "";
      return `
        <button type="button" class="gz2-card" data-more-info-entity="${escapeHtml(eid)}">
          <div class="gz2-card__label">${escapeHtml(field.label)}</div>
          <div class="gz2-card__value${vTone}">${escapeHtml(value)}</div>
          ${secondary ? `<div class="gz2-card__sub">${escapeHtml(secondary)}</div>` : ""}
        </button>`;
    }).join("");
    return `
      <div class="gz2-eyebrow gz2-eyebrow--section">${escapeHtml(title)}</div>
      <div class="gz2-cards">${cards}</div>
    `;
  }

  _buildAdvancedContent(tab = this._activeTab) {
    const groupsByTab = {
      overview: [
        {
          title: "Pilotage global",
          meta: "Les signaux les plus utiles pour comprendre la priorité du moment.",
          eyebrow: "Synthèse",
          keys: ["entity_assistant", "entity_conseil", "entity_niveau", "entity_risque", "entity_phase", "entity_sous_phase"],
        },
        {
          title: "Priorités dérivées",
          meta: "Ce qui fait évoluer la recommandation globale.",
          eyebrow: "Priorité",
          keys: ["entity_niveau_pertinence", "entity_prochaine_fenetre_optimale", "entity_prochain_blocage_attendu", "entity_prochaine_intervention"],
        },
      ],
      watering: [
        {
          title: "Conduite d'irrigation",
          meta: "Besoin hydrique, fenêtre et plan à exécuter.",
          eyebrow: "Hydrique",
          keys: [
            "entity_fenetre_optimale",
            "entity_objectif_arrosage",
            "entity_type_arrosage",
            "entity_plan_arrosage",
            "entity_arrosage_recommande",
            "entity_arrosage_apres_application_autorise",
            "entity_signal_irrigation",
            "entity_arrosage_en_cours",
            "entity_dernier_arrosage",
          ],
        },
        {
          title: "Observabilité hydrique",
          meta: "Suivi avancé du contexte hydrique sans alourdir la façade publique.",
          eyebrow: "Diagnostic",
          keys: [
            "entity_etat_hydrique",
            "entity_reserve_actuelle",
            "entity_depletion_ratio",
            "entity_et0",
            "entity_etc",
            "entity_objectif_legacy",
            "entity_objectif_depletion",
          ],
        },
        {
          title: "Réglages irrigation",
          meta: "Paramètres qui influencent directement les cycles.",
          eyebrow: "Configuration",
          keys: [
            "entity_switch_arrosage_automatique",
            "entity_debit_zone_1",
            "entity_debit_zone_2",
            "entity_debit_zone_3",
            "entity_debit_zone_4",
            "entity_debit_zone_5",
          ],
        },
      ],
      mowing: [
        {
          title: "Décision tonte",
          meta: "Statut courant, autorisation et hauteur conseillée.",
          eyebrow: "Tonte",
          keys: ["entity_tonte", "entity_tonte_autorisee", "entity_hauteur", "entity_phase", "entity_sous_phase", "entity_risque"],
        },
        {
          title: "Réglages tonte",
          meta: "Bornes de coupe et délai de reprise après arrosage.",
          eyebrow: "Configuration",
          keys: ["entity_hauteur_min_tondeuse", "entity_hauteur_max_tondeuse", "entity_delai_reprise_tonte_apres_arrosage"],
        },
      ],
      gazon: [
        {
          title: "État du gazon",
          meta: "Lecture métier de la phase, du niveau d'action et du risque.",
          eyebrow: "Gazon",
          keys: ["entity_assistant", "entity_conseil", "entity_niveau", "entity_risque", "entity_phase", "entity_sous_phase", "entity_action", "entity_avoid"],
        },
        {
          title: "Contexte hydrique",
          meta: "Ce qui nourrit l'analyse sans surcharger le résumé principal.",
          eyebrow: "Contexte",
          keys: ["entity_objectif_arrosage", "entity_type_arrosage", "entity_fenetre_optimale", "entity_etat_hydrique", "entity_reserve_actuelle"],
        },
      ],
      products: [
        {
          title: "Catalogue",
          meta: "Référentiel local disponible pour la saison.",
          eyebrow: "Produits",
          keys: ["entity_catalogue_produits", "entity_produit_intervention", "entity_derniere_application"],
        },
      ],
      intervention: [
        {
          title: "Recommandation intervention",
          meta: "Produit ciblé, statut et préparation de déclaration.",
          eyebrow: "Intervention",
          keys: [
            "entity_prochaine_intervention",
            "entity_signal_intervention",
            "entity_produit_intervention",
            "entity_catalogue_produits",
            "entity_derniere_application",
            "entity_niveau_pertinence",
            "entity_prochaine_fenetre_optimale",
            "entity_prochain_blocage_attendu",
          ],
        },
        {
          title: "Debug métier",
          meta: "Lecture détaillée du moteur quand il faut investiguer.",
          eyebrow: "Debug",
          keys: ["entity_debug_intervention"],
        },
      ],
      config: [
        {
          title: "Paramètres actifs",
          meta: "Configuration effectivement utilisée par le moteur.",
          eyebrow: "Réglages",
          keys: [
            "entity_mode",
            "entity_switch_arrosage_automatique",
            "entity_switch_coordination_tondeuse",
            "entity_delai_reprise_tonte_apres_arrosage",
            "entity_debit_zone_1",
            "entity_debit_zone_2",
            "entity_debit_zone_3",
            "entity_debit_zone_4",
            "entity_debit_zone_5",
            "entity_hauteur_min_tondeuse",
            "entity_hauteur_max_tondeuse",
          ],
        },
      ],
    };
    const groups = groupsByTab[tab] || groupsByTab.overview;
    return groups
      .map((group) => this._renderAdvancedGroup(group.title, group.meta, group.keys, group.eyebrow))
      .filter(Boolean)
      .join("");
  }

  _toneForField(field, entity) {
    if (!entity) {
      return "neutral";
    }
    if (field.key === "entity_assistant") {
      return this._assistantState().tone || "neutral";
    }
    if (field.key === "entity_niveau_pertinence") {
      const tone = String(entity.attributes?.tone || "").trim().toLowerCase();
      if (tone === "success" || tone === "warning" || tone === "neutral") {
        return tone;
      }
      const level = String(entity.state || entity.attributes?.score_level || "").trim().toLowerCase();
      if (level === "élevé" || level === "eleve") {
        return "success";
      }
      if (level === "moyen") {
        return "warning";
      }
      return "neutral";
    }
    if (field.key === "entity_prochaine_fenetre_optimale") {
      const status = String(entity.state || "").trim().toLowerCase();
      if (status === "attendre") {
        return "warning";
      }
      if (["maintenant", "ce_matin"].includes(status)) {
        return "success";
      }
      if (["demain_matin", "apres_pluie", "soir"].includes(status)) {
        return "accent";
      }
      return "neutral";
    }
    if (field.key === "entity_prochain_blocage_attendu") {
      return isEmpty(entity.state) ? "neutral" : "danger";
    }
    if (field.key === "entity_fenetre_optimale") {
      return this._windowState().tone;
    }
    if (field.key === "entity_tonte") {
      return computeTonteTone(entity.state);
    }
    if (field.key === "entity_tonte_autorisee") {
      return String(entity.state).toLowerCase() === "on" ? "success" : "danger";
    }
    if (field.key === "entity_niveau") {
      return computeActionTone(entity.state);
    }
    if (field.key === "entity_risque") {
      return computeRisqueTone(entity.state);
    }
    if (field.key === "entity_arrosage_recommande") {
      return String(entity.state).toLowerCase() === "on" ? "success" : "neutral";
    }
    if (field.key === "entity_switch_coordination_tondeuse") {
      return String(entity.state).toLowerCase() === "on" ? "success" : String(entity.state).toLowerCase() === "off" ? "danger" : "neutral";
    }
    if (field.key === "entity_delai_reprise_tonte_apres_arrosage") {
      return asNumber(entity.state) !== null ? "accent" : "neutral";
    }
    if (field.key === "entity_arrosage_apres_application_autorise") {
      return this._postApplicationState(entity).tone;
    }
    if (field.key === "entity_signal_intervention") {
      const triggerKind = String(entity.attributes?.trigger_kind || "").trim().toLowerCase();
      if (["recommended", "ready"].includes(triggerKind)) {
        return "success";
      }
      if (triggerKind === "soft") {
        return "warning";
      }
      return String(entity.state).toLowerCase() === "on" ? "success" : "neutral";
    }
    if (field.key === "entity_signal_irrigation") {
      return this._irrigationSignalState().tone;
    }
    if (field.key === "entity_phase") {
      return phaseTone(entity.state);
    }
    if (field.key === "entity_hauteur") {
      return this._phaseTone();
    }
    if (field.key === "entity_objectif_arrosage") {
      const hydricState = String(entity.attributes?.hydric_state || "").trim().toLowerCase();
      if (hydricState === "plein") {
        return "success";
      }
      if (hydricState.includes("surveil")) {
        return "warning";
      }
      return asNumber(entity.state) > 0 ? "accent" : "neutral";
    }
    return "neutral";
  }

  _formatFieldValue(field, entity) {
    if (!entity) {
      return "Non disponible";
    }
    if (field.key === "entity_assistant") {
      return this._assistantState().summary || "Non disponible";
    }
    if (field.key === "entity_niveau_pertinence") {
      return formatStatusLabel(entity.state);
    }
    if (field.key === "entity_prochaine_fenetre_optimale") {
      return formatStatusLabel(entity.state);
    }
    if (field.key === "entity_prochain_blocage_attendu") {
      return String(entity.attributes?.block_label || entity.attributes?.summary || formatStatusLabel(entity.state)).trim() || "Non disponible";
    }
    if (field.key === "entity_fenetre_optimale") {
      return this._windowState().statusLabel;
    }
    if (field.key === "entity_arrosage_recommande") {
      return formatRecommendationState(entity.state);
    }
    if (field.key === "entity_arrosage_apres_application_autorise" || field.key === "entity_tonte_autorisee") {
      if (field.key === "entity_arrosage_apres_application_autorise") {
        return this._postApplicationState(entity).label;
      }
      return formatAuthorizationState(entity.state);
    }
    if (field.key === "entity_objectif_arrosage") {
      const numeric = asNumber(entity.state);
      return formatMm(numeric);
    }
    if (field.key === "entity_hauteur") {
      const numeric = asNumber(entity.state);
      return formatCm(numeric);
    }
    if (field.key === "entity_switch_arrosage_automatique") {
      return formatSwitchState(entity.state);
    }
    if (field.key === "entity_switch_coordination_tondeuse") {
      return formatSwitchState(entity.state);
    }
    if (field.key === "entity_delai_reprise_tonte_apres_arrosage") {
      const numeric = asNumber(entity.state);
      return numeric === null ? "Non disponible" : `${formatNumber(numeric, 0)} min`;
    }
    if (field.key === "entity_tonte") {
      return formatStatusLabel(entity.state);
    }
    if (field.key === "entity_signal_irrigation") {
      return this._irrigationSignalState().actionLabel || "Non disponible";
    }
    if (field.key === "entity_signal_intervention") {
      return String(entity.attributes?.summary || formatStatusLabel(entity.state)).trim() || "Non disponible";
    }
    if (field.key === "entity_prochaine_intervention") {
      return String(entity.attributes?.summary || entity.state || "").trim() || "Non disponible";
    }
    if (field.key === "entity_niveau" || field.key === "entity_phase" || field.key === "entity_sous_phase") {
      return formatStatusLabel(entity.state);
    }
    return normalizeDisplayValue(entity.state);
  }

  _secondaryFieldText(field, entity) {
    if (!entity) {
      return "";
    }
    if (field.key === "entity_assistant") {
      const assistant = this._assistantState();
      return [
        assistant.reason,
        assistant.momentLabel ? `Moment: ${assistant.momentLabel}` : "",
        assistant.status ? `Statut: ${formatStatusLabel(assistant.status)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (["entity_niveau_pertinence", "entity_prochaine_fenetre_optimale", "entity_prochain_blocage_attendu", "entity_signal_intervention", "entity_signal_irrigation"].includes(field.key)) {
      const parts = [];
      const summary = String(entity.attributes?.summary || "").trim();
      const triggerKind = String(entity.attributes?.trigger_kind || "").trim();
      const sourceStatus = String(entity.attributes?.source_status || "").trim();
      const score = asNumber(entity.attributes?.score);
      const scoreLevel = String(entity.attributes?.score_level || "").trim();
      if (summary) {
        parts.push(summary);
      }
      if (score !== null) {
        parts.push(`Score: ${formatNumber(score, 0)}/100`);
      }
      if (scoreLevel) {
        parts.push(`Niveau: ${formatStatusLabel(scoreLevel)}`);
      }
      if (triggerKind) {
        parts.push(`Déclencheur: ${formatStatusLabel(triggerKind)}`);
      }
      if (sourceStatus && sourceStatus !== summary) {
        parts.push(`Statut source: ${formatStatusLabel(sourceStatus)}`);
      }
      if (field.key === "entity_signal_irrigation") {
        const reasonKind = String(entity.attributes?.reason_kind || "").trim();
        const actionLabel = String(entity.attributes?.action_label || "").trim();
        const typeArrosage = String(entity.attributes?.type_arrosage || "").trim();
        const wateringBlockReason = String(entity.attributes?.watering_block_reason_label || "").trim();
        if (actionLabel && actionLabel !== summary) {
          parts.unshift(actionLabel);
        }
        if (reasonKind) {
          parts.push(`Raison: ${formatStatusLabel(reasonKind)}`);
        }
        if (typeArrosage) {
          parts.push(`Profil: ${formatWateringTypeLabel(typeArrosage)}`);
        }
        if (wateringBlockReason) {
          parts.push(`Blocage: ${wateringBlockReason}`);
        }
      }
      return parts.join(" · ");
    }
    if (field.key === "entity_fenetre_optimale") {
      const windowState = this._windowState();
      return [
        windowState.reasonSummary || windowState.summary,
        windowState.optimalWindowDisplay ? `Optimal: ${windowState.optimalWindowDisplay}` : "",
        windowState.wateringWindowDisplay ? `Créneau: ${windowState.wateringWindowDisplay}` : "",
        windowState.eveningWindowDisplay ? `Soir: ${windowState.eveningWindowDisplay}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (field.key === "entity_hauteur") {
      const min = asNumber(entity.attributes?.hauteur_tonte_min_cm);
      const max = asNumber(entity.attributes?.hauteur_tonte_max_cm);
      if (min === null || max === null) {
        return "";
      }
      return `${formatCm(min)} → ${formatCm(max)}`;
    }
    if (field.key === "entity_tonte" || field.key === "entity_tonte_autorisee") {
      const mowerLabel = String(entity.attributes?.mower_operation_label || entity.attributes?.tondeuse_statut_libelle || "").trim();
      const mowingBlockReason = String(entity.attributes?.mowing_block_reason_label || "").trim();
      const cooldown = asNumber(entity.attributes?.mowing_cooldown_remaining_minutes);
      return [
        mowerLabel ? `Robot: ${mowerLabel}` : "",
        mowingBlockReason ? `Blocage: ${mowingBlockReason}` : "",
        cooldown !== null && cooldown > 0 ? `Cooldown: ${formatDurationHuman(cooldown)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (field.key === "entity_delai_reprise_tonte_apres_arrosage") {
      const numeric = asNumber(entity.state);
      return numeric === null ? "" : `Valeur active: ${formatNumber(numeric, 0)} min`;
    }
    if (field.key === "entity_objectif_arrosage") {
      return [
        entity.attributes?.hydric_state ? `État: ${formatStatusLabel(entity.attributes.hydric_state)}` : "",
        entity.attributes?.hydric_strategy ? `Stratégie: ${formatStatusLabel(entity.attributes.hydric_strategy)}` : "",
        asNumber(entity.attributes?.reserve_actuelle_mm) !== null ? `Réserve: ${formatNumber(entity.attributes.reserve_actuelle_mm, 1)} mm` : "",
        asNumber(entity.attributes?.depletion_ratio) !== null ? `Déplétion: ${formatNumber(entity.attributes.depletion_ratio, 3)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (field.key === "entity_niveau") {
      const hydric = String(entity.attributes?.niveau_action_hydrique || "").trim();
      return hydric ? `Hydrique: ${formatStatusLabel(hydric)}` : "";
    }
    if (field.key === "entity_conseil") {
      const hydric = String(entity.attributes?.niveau_action_hydrique || "").trim();
      return hydric ? `Hydrique: ${formatStatusLabel(hydric)}` : "";
    }
    if (field.key === "entity_prochaine_intervention") {
      return [
        String(entity.attributes?.hint || "").trim(),
        String(entity.attributes?.action_label || "").trim(),
        String(entity.attributes?.opportunity_level || "").trim() ? `Opportunité: ${formatStatusLabel(entity.attributes.opportunity_level)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (["entity_etat_hydrique", "entity_reserve_actuelle", "entity_depletion_ratio", "entity_et0", "entity_etc", "entity_objectif_legacy", "entity_objectif_depletion"].includes(field.key)) {
      return Object.entries(entity.attributes || {})
        .slice(0, 4)
        .map(([key, value]) => `${formatStatusLabel(key)}: ${normalizeDisplayValue(value)}`)
        .join(" · ");
    }
    return "";
  }

  _visibleFields(section = this._activeSection) {
    if (this._isMinimalMode()) {
      section = "overview";
    }
    const wanted = SECTION_FIELDS[section] || SECTION_FIELDS.overview;
    return ENTITY_KEYS.filter((field) => this._config?.[field.key] && wanted.includes(field.key));
  }

  _buildHeader() {
    return renderHeader(this);
  }

  _buildDecisionBlocks() {
    if (!this._canShowLegacyDetails() || this._isMinimalMode()) {
      return "";
    }
    if (!["overview", "gazon"].includes(this._activeTab)) {
      return "";
    }
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    if (!action && !avoid) {
      return "";
    }
    return `
      <div class="gz2-eyebrow gz2-eyebrow--section">Décision</div>
      <div class="gz2-cards">
        ${action ? `<div class="gz2-card gz2-card--static"><div class="gz2-card__label">À faire</div><div class="gz2-card__value">${escapeHtml(action)}</div></div>` : ""}
        ${avoid ? `<div class="gz2-card gz2-card--static"><div class="gz2-card__label">À éviter</div><div class="gz2-card__value">${escapeHtml(avoid)}</div></div>` : ""}
      </div>
    `;
  }

  _buildContent() {
    const section = this._isMinimalMode() ? "overview" : this._activeSection;
    if (this._canShowLegacyDetails()) {
      return this._buildAdvancedContent(this._activeTab);
    }
    const tiles = this._visibleFields(section).map((field) => this._renderTile(field)).filter(Boolean);
    if (tiles.length === 0) {
      return "";
    }
    return `
      <section class="tiles tiles--${section} ${this._isMinimalMode() ? "tiles--minimal" : ""}">
        ${tiles.join("")}
      </section>
    `;
  }

  _buildFooter() {
    if (!this._canShowLegacyDetails() || this._isMinimalMode()) {
      return "";
    }
    if (!["overview", "gazon"].includes(this._activeTab)) {
      return "";
    }
    const phaseSource = this._entity("entity_phase")?.attributes?.phase_dominante_source;
    const pluieSource = this._entity("entity_phase")?.attributes?.pluie_demain_source;
    const parts = [];
    if (!isEmpty(phaseSource)) {
      parts.push(`Source phase: ${phaseSource}`);
    }
    if (!isEmpty(pluieSource)) {
      parts.push(`Pluie demain: ${pluieSource}`);
    }
    if (parts.length === 0) {
      return "";
    }
    return `<footer class="gi-info gi-info--secondary footer">${parts.map((part) => `<span>${escapeHtml(part)}</span>`).join(" · ")}</footer>`;
  }

  _ensureStyles() {
    // Injecte la feuille de style UNE seule fois (adoptedStyleSheets) au lieu de
    // la ré-injecter à chaque rendu → plus de re-parse CSS = plus de clignotement.
    if (!this.shadowRoot) {
      return false;
    }
    try {
      const supportsAdopted =
        typeof CSSStyleSheet === "function"
        && typeof CSSStyleSheet.prototype.replaceSync === "function"
        && "adoptedStyleSheets" in this.shadowRoot;
      if (!supportsAdopted) {
        return false;
      }
      if (!this._styleSheet) {
        this._styleSheet = new CSSStyleSheet();
        this._styleSheet.replaceSync(CARD_STYLES);
      }
      if (!this.shadowRoot.adoptedStyleSheets.includes(this._styleSheet)) {
        this.shadowRoot.adoptedStyleSheets = [this._styleSheet];
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }
    try {
      if (!this._config) {
        if (this._lastRenderSignature === "no-config") {
          return;
        }
        this._lastRenderSignature = "no-config";
        this.shadowRoot.innerHTML = `<div class="empty">Configuration manquante.</div>`;
        return;
      }

      const renderSignature = this._renderSignature();
      if (renderSignature === this._lastRenderSignature) {
        return;
      }

      const activeTone = this._cardTone();
      const accent = this._config.accent_color || this._accentColorFromTone(activeTone);
      const sectionAccent = this._tabAccent(this._activeTab);
      const tabPalette = this._tabPalette(this._activeTab);
      const background = this._config.show_background ? "true" : "false";
      const backgroundStyle = this._config.background_style || "solid";
      const themeMode = this._config.theme_mode || "auto";
      const resolvedThemeMode = themeMode === "auto" ? (this._hass?.themes?.darkMode ? "dark" : "light") : themeMode;
      const borderRadius = `${this._config.border_radius ?? 24}px`;
      const iconSize = `${this._config.icon_size ?? 24}px`;
      const actionCritical = this._actionTone() === "critical";
      const isPreview = this._isPreviewMode();
      const hasCardAction = this._hasCardAction();

      this._applyHostVariables({
        accent,
        activeTone,
        sectionAccent,
        borderRadius,
        iconSize,
        tabPalette,
      });

      const rootClass = [
        "card",
        backgroundStyle ? `card--${backgroundStyle}` : "",
        resolvedThemeMode ? `card--theme-${resolvedThemeMode}` : "",
        actionCritical ? "card--pulse-critical" : "",
        isPreview ? "card--editor-preview" : "",
      ]
        .filter(Boolean)
        .join(" ");

      const stylesAdopted = this._ensureStyles();
      const styleBlock = stylesAdopted ? "" : `<style>\n${CARD_STYLES}\n        </style>`;
      this.shadowRoot.innerHTML = `
        ${styleBlock}

          <ha-card
            class="gi-card ${rootClass}"
            aria-label="${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}"
            data-background="${background}"
            data-tone="${activeTone}"
            data-active-tab="${escapeHtml(this._activeTab)}"
            ${hasCardAction ? 'role="button" tabindex="0"' : ""}
          >
          ${this._buildHeader()}
          ${this._renderDecisionLayout()}
        </ha-card>
      `;

      this._bindMoreInfoButtons();
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(() => {
          if (!this.isConnected) {
            return;
          }
          this._scrollTabNavIntoView();
        });
      }

      this.shadowRoot.removeEventListener("click", this._onClick);
      this.shadowRoot.removeEventListener("pointerdown", this._onPointerDown);
      this.shadowRoot.removeEventListener("pointerup", this._onPointerUp);
      this.shadowRoot.removeEventListener("pointercancel", this._onPointerCancel);
      this.shadowRoot.removeEventListener("pointerleave", this._onPointerCancel);
      this.shadowRoot.removeEventListener("change", this._onChange);
      this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
      this.shadowRoot.removeEventListener("dblclick", this._onDoubleClick);
      this.shadowRoot.removeEventListener("keydown", this._onKeyDown);
      this.shadowRoot.addEventListener("click", this._onClick);
      this.shadowRoot.addEventListener("pointerdown", this._onPointerDown);
      this.shadowRoot.addEventListener("pointerup", this._onPointerUp);
      this.shadowRoot.addEventListener("pointercancel", this._onPointerCancel);
      this.shadowRoot.addEventListener("pointerleave", this._onPointerCancel);
      this.shadowRoot.addEventListener("change", this._onChange);
      this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
      this.shadowRoot.addEventListener("dblclick", this._onDoubleClick);
      this.shadowRoot.addEventListener("keydown", this._onKeyDown);
      this._syncWateringProgressTimer();
      // Ne valider la signature qu'APRÈS un rendu réussi : si le rendu échoue,
      // la prochaine mise à jour HA réessaiera au lieu de rester bloquée.
      this._lastRenderSignature = renderSignature;
    } catch (error) {
      console.error("[gazon-intelligent-card] render failed", error);
      // Erreur (souvent transitoire, entité momentanément indisponible) : on
      // réinitialise la signature pour forcer un nouveau rendu à la prochaine
      // mise à jour (auto-réparation, plus besoin de recharger).
      this._lastRenderSignature = null;
      this.shadowRoot.innerHTML = `
        <div class="empty">
          <strong>Carte indisponible.</strong>
          <div>Le rendu de la carte a rencontré un problème. Recharge la ressource Lovelace si besoin.</div>
        </div>
      `;
    }
  }

  _bindMoreInfoButtons() {
    if (!this.shadowRoot) {
      return;
    }
    const buttons = this.shadowRoot.querySelectorAll("[data-more-info-entity]");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this._clearCardActionTimer();
        event.preventDefault();
        event.stopPropagation();
        this._openEntityMoreInfo(button.dataset.moreInfoEntity);
      });
    });
  }

  _accentColorFromTone(tone) {
    switch (tone) {
      case "danger":
        return "var(--gazon-danger-color, #f15f69)";
      case "warning":
        return "var(--gazon-warning-color, #f3ba4b)";
      case "success":
        return "var(--gazon-success-color, #4fc38c)";
      case "accent":
        return "var(--gazon-accent-tone-color, #49cfd0)";
      default:
        return "var(--gazon-success-color, #4fc38c)";
    }
  }

  _onClick(event) {
    const manualTarget = event.target.closest("[data-gazon-action='manual-irrigation']");
    if (manualTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerManualIrrigation();
      return;
    }
    const declareTarget = event.target.closest("[data-gazon-action='declare-product-intervention']");
    if (declareTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerSelectedProductIntervention();
      return;
    }
    const removeLastApplicationTarget = event.target.closest("[data-gazon-action='remove-last-application']");
    if (removeLastApplicationTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerRemoveLastApplication();
      return;
    }
    const tabTarget = event.target.closest("[data-tab]");
    if (tabTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._setActiveTab(tabTarget.dataset.tab);
      return;
    }
    const sectionTarget = event.target.closest("[data-section]");
    if (sectionTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._setActiveSection(sectionTarget.dataset.section);
      return;
    }
    if (!this._isActionEventCandidateTarget(event.target)) {
      this._clearCardActionTimer();
      return;
    }
    if (this._holdActionTriggered) {
      this._holdActionTriggered = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this._handleCardTapAction(this._defaultActionEntityId());
  }

  _onChange(event) {
    const selectTarget = event.target?.closest?.("[data-gazon-action='select-intervention-product']");
    if (selectTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerInterventionProductSelection(selectTarget.value);
    }
  }

  _onPointerDown(event) {
    if (!this._hasConfiguredAction("hold_action")) {
      return;
    }
    if (event.button !== 0 || !this._isActionEventCandidateTarget(event.target)) {
      return;
    }
    this._clearHoldActionTimer();
    this._holdActionTriggered = false;
    this._holdActionTimer = window.setTimeout(() => {
      this._holdActionTimer = null;
      this._holdActionTriggered = true;
      this._clearCardActionTimer();
      this._performConfiguredAction("hold_action", this._defaultActionEntityId());
    }, 500);
  }

  _onPointerUp() {
    this._clearHoldActionTimer();
  }

  _onPointerCancel() {
    this._clearHoldActionTimer();
  }

  _onContextMenu(event) {
    this._clearHoldActionTimer();
    if (!this._hasConfiguredAction("hold_action") || !this._isActionEventCandidateTarget(event.target)) {
      return;
    }
    this._clearCardActionTimer();
    event.preventDefault();
    event.stopPropagation();
    this._performConfiguredAction("hold_action", this._defaultActionEntityId());
  }

  _onDoubleClick(event) {
    if (!this._hasConfiguredAction("double_tap_action") || !this._isActionEventCandidateTarget(event.target)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  _onKeyDown(event) {
    const target = event.target;
    if (target && ["SELECT", "INPUT", "TEXTAREA"].includes(String(target.tagName || "").toUpperCase())) {
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    if (target instanceof Element && target.tagName === "HA-CARD" && this._hasConfiguredAction("tap_action")) {
      event.preventDefault();
      event.stopPropagation();
      this._clearCardActionTimer();
      this._performConfiguredAction("tap_action", this._defaultActionEntityId());
      return;
    }
    event.preventDefault();
  }

  _openEntityMoreInfo(entityId) {
    if (!entityId) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _triggerManualIrrigation() {
    if (!this._hass) {
      return;
    }
    const objective = this._objectiveMm();
    if (objective === null || objective <= 0) {
      return;
    }
    const service = splitServiceName(this._manualActionService());
    if (!service) {
      return;
    }
    const targetEntityId = this._serviceTargetEntityId();
    if (!targetEntityId) {
      return;
    }
    this._hass.callService(service.domain, service.service, {
      entity_id: targetEntityId,
      objectif_mm: objective,
    });
  }

  _triggerSelectedProductIntervention() {
    if (!this._hass) {
      return;
    }
    const state = this._selectedProductInterventionState();
    if (!state.record || state.disabled) {
      return;
    }
    const intervention = String(state.record.type || "").trim();
    const productId = String(state.record.id || "").trim();
    const productName = String(state.record.nom || state.record.id || "").trim();
    if (!intervention || !productId) {
      return;
    }
    const service = splitServiceName("gazon_intelligent.declare_intervention");
    if (!service) {
      return;
    }
    const targetEntityId = this._serviceTargetEntityId();
    if (!targetEntityId) {
      return;
    }
    const payload = {
      entity_id: targetEntityId,
      intervention,
      date_action: this._todayIsoDate(),
      produit_id: productId,
      produit: productName,
      note: "Déclaration rapide depuis la carte",
    };
    this._hass.callService(service.domain, service.service, payload);
  }

  _triggerInterventionProductSelection(optionLabel) {
    if (!this._hass) {
      return;
    }
    const value = String(optionLabel || "").trim();
    if (!value) {
      return;
    }
    const service = splitServiceName("select.select_option");
    if (!service) {
      return;
    }
    const targetEntityId = this._entityId("entity_produit_intervention");
    if (!targetEntityId) {
      return;
    }
    const selectedOption = this._catalogueProductOptions().find((option) => option.label === value) || null;
    this._pendingInterventionSelection = selectedOption
      ? {
          optionLabel: value,
          id: selectedOption.id || null,
          name: selectedOption.name || null,
          months: [],
          monthsLabel: selectedOption.monthsLabel || null,
          usageMode: selectedOption.usageMode || null,
          usageModeLabel: selectedOption.usageModeLabel || null,
          maxApplicationsPerYear: selectedOption.maxApplicationsPerYear ?? null,
          maxApplicationsPerYearLabel: selectedOption.maxApplicationsPerYearLabel || null,
        }
      : null;
    this._lastRenderSignature = null;
    this._render();
    this._hass.callService(service.domain, service.service, {
      entity_id: targetEntityId,
      option: value,
    });
  }

  _triggerRemoveLastApplication() {
    if (!this._hass) {
      return;
    }
    const lastApplication = this._lastApplicationState();
    if (!lastApplication.hasApplication) {
      return;
    }
    const confirmationLabel = lastApplication.productName || lastApplication.label || "la dernière application";
    const confirmationDetails = [];
    if (lastApplication.when) {
      confirmationDetails.push(`Date: ${lastApplication.when}`);
    }
    if (lastApplication.productId) {
      confirmationDetails.push(`Produit: ${lastApplication.productName || lastApplication.productId}`);
    }
    if (lastApplication.summary) {
      confirmationDetails.push(lastApplication.summary);
    }
    if (lastApplication.detail) {
      confirmationDetails.push(lastApplication.detail);
    }
    const confirmationMessage = [
      `Supprimer ${confirmationLabel} ? Cette action supprimera la dernière application enregistrée et ne peut pas être annulée.`,
      ...confirmationDetails.map((line) => `\n${line}`),
    ].join("");
    const confirmed = window.confirm(
      confirmationMessage,
    );
    if (!confirmed) {
      return;
    }
    const service = splitServiceName("gazon_intelligent.remove_last_application");
    if (!service) {
      return;
    }
    const targetEntityId = this._serviceTargetEntityId();
    if (!targetEntityId) {
      return;
    }
    this._hass.callService(service.domain, service.service, {
      entity_id: targetEntityId,
    });
  }

}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, GazonIntelligentCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: "Carte Lovelace pour les décisions de gazon intelligent.",
    documentationURL:
      "https://github.com/kev21brv10/lovelace-gazon-intelligent-card",
  });
}



function renderGz2Hero(eyebrow, title, sub = "") {
  return `
        <div class="gz2-hero">
          <div class="gz2-eyebrow">${escapeHtml(eyebrow)}</div>
          <div class="gz2-hero__title">${escapeHtml(title)}</div>
          ${sub ? `<div class="gz2-hero__sub">${escapeHtml(sub)}</div>` : ""}
        </div>`;
}

function renderGz2Cards(card, items) {
  const showSub = card._config?.show_secondary_info !== false;
  return items.map((f) => {
    const eid = f.entityKey ? card._entityId(f.entityKey) : null;
    const vTone = ["success", "warning", "danger", "critical"].includes(f.tone) ? ` gz2-card__value--${f.tone}` : "";
    const inner = `
        <div class="gz2-card__label">${escapeHtml(f.label)}</div>
        <div class="gz2-card__value${vTone}">${escapeHtml(f.value)}</div>
        ${showSub && f.secondary ? `<div class="gz2-card__sub">${escapeHtml(f.secondary)}</div>` : ""}`;
    return eid
      ? `<button type="button" class="gz2-card" data-more-info-entity="${escapeHtml(eid)}">${inner}</button>`
      : `<div class="gz2-card gz2-card--static">${inner}</div>`;
  }).join("");
}

function renderGz2Chips(items) {
  return items.map((c) => {
    const tone = ["success", "warning", "danger", "critical", "accent", "neutral"].includes(c.tone) ? c.tone : "neutral";
    return `<span class="gz2-chip gz2-chip--${tone}">${escapeHtml(c.value)}</span>`;
  }).join("");
}

function renderTabNav(card) {
  return `
      <nav class="gz2-nav" aria-label="Domaines de la carte">
        ${TAB_DEFS.map((tab) => {
          const active = tab.key === card._activeTab;
          return `<button type="button" class="gz2-nav__item ${active ? "gz2-nav__item--active" : ""}" data-tab="${escapeHtml(tab.key)}" aria-pressed="${active ? "true" : "false"}">${escapeHtml(tab.label)}</button>`;
        }).join("")}
      </nav>
    `;
}

function formatTemperatureRangeConstraint(constraint) {
  if (!constraint || typeof constraint !== "object") {
    return null;
  }
  const value = constraint.value && typeof constraint.value === "object" ? constraint.value : {};
  const current = asNumber(value.current ?? value.temperature ?? value.current_temperature ?? value.temperature_current);
  const min = asNumber(value.min ?? value.temperature_min);
  const max = asNumber(value.max ?? value.temperature_max);
  const currentLabel = current === null ? null : `${formatNumber(current, 1)} °C`;
  let expectedLabel = null;
  if (min !== null && max !== null) {
    expectedLabel = `${formatNumber(min, 1)} à ${formatNumber(max, 1)} °C`;
  } else if (min !== null) {
    expectedLabel = `au moins ${formatNumber(min, 1)} °C`;
  } else if (max !== null) {
    expectedLabel = `au plus ${formatNumber(max, 1)} °C`;
  }
  const tone = Boolean(constraint.blocking)
    ? "danger"
    : Boolean(constraint.met)
      ? "success"
      : "warning";
  const icon = Boolean(constraint.blocking)
    ? "mdi:thermometer-alert"
    : Boolean(constraint.met)
      ? "mdi:thermometer-check"
      : "mdi:thermometer";
  const title = Boolean(constraint.blocking)
    ? "Température bloquante"
    : Boolean(constraint.met)
      ? "Température compatible"
      : "Température hors plage";
  const detailParts = [];
  if (currentLabel) {
    detailParts.push(`Actuelle: ${currentLabel}`);
  }
  if (expectedLabel) {
    detailParts.push(`Attendu: ${expectedLabel}`);
  }
  const detail = detailParts.length ? detailParts.join(" · ") : "Température non disponible";
  const hint = String(constraint.hint || "").trim() || null;
  return {
    code: String(constraint.code || "").trim() || null,
    title,
    tone,
    icon,
    detail,
    hint,
    current,
    min,
    max,
    met: Boolean(constraint.met),
    blocking: Boolean(constraint.blocking),
  };
}

function formatDebugRecommendedAction(action) {
  const normalized = String(action ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Non disponible";
  }
  if (normalized === "select_product") {
    return "Sélectionner le produit";
  }
  if (normalized === "declare_intervention") {
    return "Déclarer maintenant";
  }
  if (normalized === "wait") {
    return "Attendre";
  }
  if (normalized === "add_product") {
    return "Ajouter un produit";
  }
  return formatStatusLabel(normalized);
}

function formatDebugConstraintImpact(constraint) {
  const impact = String(constraint?.impact || "").trim().toLowerCase();
  if (impact === "bloquant") {
    return {
      label: "Bloquant",
      tone: "danger",
      icon: "mdi:alert-circle-outline",
    };
  }
  if (impact === "dégradant" || impact === "degradant") {
    return {
      label: "Dégradant",
      tone: "warning",
      icon: "mdi:shield-alert-outline",
    };
  }
  return {
    label: "Neutre",
    tone: "neutral",
    icon: "mdi:check-circle-outline",
  };
}

function resolveInterventionStatusPresentation(status) {
  if (typeof formatInterventionStatusPresentation === "function") {
    return formatInterventionStatusPresentation(status);
  }
  const normalized = String(status ?? "").trim().toLowerCase();
  const presentations = {
    recommended: {
      title: "Recommandé",
      badge: "Recommandé",
      tone: "success",
      icon: "mdi:spray-bottle",
      summary: "Recommandé",
      hint: "La prochaine intervention est prête à être déclarée.",
      actionLabel: "Déclarer maintenant",
      selectionSummary: "Produit sélectionné",
      selectionHint: "Le produit sélectionné alimente la déclaration.",
      declarationSummary: "Prêt à déclarer",
      declarationHint: "La déclaration peut être lancée maintenant.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    possible: {
      title: "À préparer",
      badge: "À préparer",
      tone: "warning",
      icon: "mdi:spray-bottle",
      summary: "À préparer",
      hint: "La prochaine intervention est à préparer.",
      actionLabel: "Choisir le produit",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "Le produit sélectionné alimente la déclaration.",
      declarationSummary: "À préparer",
      declarationHint: "La déclaration n’est pas encore prête.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    preparation: {
      title: "À envisager",
      badge: "À envisager",
      tone: "warning",
      icon: "mdi:spray-bottle",
      summary: "À envisager",
      hint: "La prochaine intervention reste possible, mais le contexte actuel limite sa pertinence.",
      actionLabel: "Choisir le produit",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "Le produit peut être préparé, mais la recommandation reste prudente.",
      declarationSummary: "À envisager",
      declarationHint: "La déclaration n’est pas encore prioritaire dans le contexte actuel.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    ready: {
      title: "Prêt à déclarer",
      badge: "Prêt à déclarer",
      tone: "success",
      icon: "mdi:spray-bottle",
      summary: "Prêt à déclarer",
      hint: "Le produit peut être déclaré maintenant.",
      actionLabel: "Déclarer",
      selectionSummary: "Produit sélectionné",
      selectionHint: "Le produit sélectionné est prêt à être confirmé.",
      declarationSummary: "Prêt à déclarer",
      declarationHint: "La déclaration peut être lancée maintenant.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    blocked: {
      title: "Bloqué",
      badge: "Bloqué",
      tone: "danger",
      icon: "mdi:cancel",
      summary: "Bloqué",
      hint: "Une contrainte bloque la prochaine intervention.",
      actionLabel: "Attendre",
      selectionSummary: "Produit sélectionné",
      selectionHint: "La sélection reste disponible, mais la déclaration est bloquée.",
      declarationSummary: "Bloqué",
      declarationHint: "Une contrainte bloque la déclaration.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    unavailable: {
      title: "Non disponible",
      badge: "Non disponible",
      tone: "neutral",
      icon: "mdi:package-variant-closed",
      summary: "Non disponible",
      hint: "Aucun statut exploitable n’est disponible.",
      actionLabel: "Non disponible",
      selectionSummary: "Aucun produit disponible",
      selectionHint: "Sélectionne un produit dans la liste pour préparer la déclaration.",
      declarationSummary: "Non disponible",
      declarationHint: "Aucune recommandation n’est disponible pour l’instant.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
  };
  return {
    status: normalized || "unavailable",
    ...(presentations[normalized] || presentations.unavailable),
  };
}

function renderDebugConstraintCards(card, constraints, emptyText) {
  const items = Array.isArray(constraints) ? constraints : [];
  if (!items.length) {
    return `<div class="tab-panel__empty">${escapeHtml(emptyText)}</div>`;
  }
  return items
    .map((constraint) => {
      if (!constraint || typeof constraint !== "object") {
        return "";
      }
      const code = String(constraint.code || "").trim() || "contrainte";
      const label = String(constraint.label || "").trim() || "Sans libellé";
      const hint = String(constraint.hint || "").trim();
      const impact = formatDebugConstraintImpact(constraint);
      const metLabel = constraint.met === false ? "Non satisfaite" : "Satisfaite";
      const secondaryParts = [
        `Code: ${code}`,
        `Impact: ${impact.label}`,
        `État: ${metLabel}`,
      ];
      if (hint) {
        secondaryParts.push(hint);
      }
      return card._renderStatCard(
        code,
        label,
        impact.tone,
        impact.icon,
        secondaryParts.join(" · "),
      );
    })
    .filter(Boolean)
    .join("");
}

function renderCompactSummaryList(items, emptyText = "Aucune information supplémentaire.") {
  const rows = Array.isArray(items)
    ? items.filter(Boolean).map((item) => {
        if (typeof item === "string") {
          return { label: "", value: item, note: "", tone: "neutral", entityKey: null };
        }
        if (!item || typeof item !== "object") {
          return null;
        }
        return {
          label: String(item.label || "").trim(),
          value: String(item.value || "").trim(),
          note: String(item.note || "").trim(),
          tone: String(item.tone || "neutral").trim().toLowerCase() || "neutral",
          entityKey: String(item.entityKey || "").trim() || null,
        };
      }).filter(Boolean)
    : [];
  if (!rows.length) {
    return `<div class="tab-panel__empty">${escapeHtml(emptyText)}</div>`;
  }
  return `
    <div class="tab-panel__summary-list">
      ${rows
        .map(
          (row) => `
            ${
              row.entityKey
                ? `
                  <button
                    type="button"
                    class="tab-panel__summary-row tab-panel__summary-row--action tab-panel__summary-row--${escapeHtml(row.tone || "neutral")}"
                    data-more-info-entity="${escapeHtml(row.entityKey)}"
                    aria-label="${escapeHtml(row.label ? `Ouvrir ${row.label}` : row.value || "Ouvrir le détail")}"
                  >
                    ${row.label ? `<div class="tab-panel__summary-label">${escapeHtml(row.label)}</div>` : ""}
                    <div class="tab-panel__summary-value">${escapeHtml(row.value || "Non disponible")}</div>
                    ${row.note ? `<div class="tab-panel__summary-note">${escapeHtml(row.note)}</div>` : ""}
                  </button>
                `
                : `
                  <div class="tab-panel__summary-row tab-panel__summary-row--${escapeHtml(row.tone || "neutral")}">
                    ${row.label ? `<div class="tab-panel__summary-label">${escapeHtml(row.label)}</div>` : ""}
                    <div class="tab-panel__summary-value">${escapeHtml(row.value || "Non disponible")}</div>
                    ${row.note ? `<div class="tab-panel__summary-note">${escapeHtml(row.note)}</div>` : ""}
                  </div>
                `
            }
          `,
        )
        .join("")}
    </div>
  `;
}

function getDebugInterventionState(card) {
  const entity = card._entity("entity_debug_intervention");
  if (!entity) {
    return null;
  }
  const attrs = entity.attributes || {};
  const payload = attrs.payload && typeof attrs.payload === "object" ? attrs.payload : attrs;
  const status = String(payload.status || entity.state || attrs.status || "").trim().toLowerCase() || "unavailable";
  const presentation = resolveInterventionStatusPresentation(status);
  const product = payload.product && typeof payload.product === "object" ? payload.product : {};
  const selection = payload.selection && typeof payload.selection === "object" ? payload.selection : {};
  const context = payload.context && typeof payload.context === "object" ? payload.context : {};
  const rawConstraints = Array.isArray(payload.constraints) ? payload.constraints : Array.isArray(attrs.constraints) ? attrs.constraints : [];
  const normalizeConstraint = (constraint) => {
    const item = { ...constraint };
    const impact = String(item.impact || "").trim().toLowerCase();
    if (!impact) {
      item.impact = item.blocking ? "bloquant" : item.met === false ? "dégradant" : "neutre";
    }
    return item;
  };
  const constraints = rawConstraints.filter((constraint) => constraint && typeof constraint === "object").map(normalizeConstraint);
  const blockingConstraints = Array.isArray(payload.blocking_constraints)
    ? payload.blocking_constraints.filter((constraint) => constraint && typeof constraint === "object")
    : constraints.filter((constraint) => String(constraint.impact || "").trim().toLowerCase() === "bloquant");
  const nonBlockingConstraints = Array.isArray(payload.non_blocking_constraints)
    ? payload.non_blocking_constraints.filter((constraint) => constraint && typeof constraint === "object")
    : constraints.filter((constraint) => String(constraint.impact || "").trim().toLowerCase() !== "bloquant");
  const reasons = Array.isArray(payload.reasons)
    ? payload.reasons.filter(Boolean).map((value) => String(value).trim()).filter(Boolean)
    : [];
  const missingRequirements = Array.isArray(payload.missing_requirements)
    ? payload.missing_requirements
        .filter(Boolean)
        .map((value) => {
          if (typeof value === "string") {
            return value.trim();
          }
          if (typeof value !== "object") {
            return "";
          }
          return String(value.label || value.code || "").trim();
        })
        .filter(Boolean)
    : [];
  const productId = String(payload.product_id || product.id || "").trim() || null;
  const productName = String(payload.product_name || product.name || "").trim() || null;
  const productType = String(product.type || "").trim() || null;
  const temperature = context.temperature ?? product.temperature_value ?? context.current_temperature ?? null;
  const month = context.month ?? context.current_month ?? null;
  return {
    entity,
    status,
    statusLabel: presentation.badge || presentation.summary || "Non disponible",
    statusTone: presentation.tone || "neutral",
    statusIcon: presentation.icon || "mdi:bug-outline",
    summary: String(payload.summary || attrs.summary || presentation.summary || "").trim() || presentation.summary || "Recommandation disponible",
    reason: String(payload.reason || attrs.reason || "").trim(),
    whyNow: String(payload.why_now || attrs.why_now || "").trim(),
    recommendedAction: String(payload.recommended_action || attrs.recommended_action || "").trim() || null,
    recommendedActionLabel: formatDebugRecommendedAction(payload.recommended_action || attrs.recommended_action),
    score: asNumber(payload.score ?? attrs.score) ?? 0,
    productId,
    productName,
    productType,
    product: {
      id: productId,
      name: productName,
      type: productType,
      months: Array.isArray(product.months) ? product.months : [],
      monthsLabel: String(product.months_label || "").trim() || null,
    },
    selection: {
      id: String(selection.id || "").trim() || null,
      name: String(selection.name || "").trim() || null,
      months: Array.isArray(selection.months) ? selection.months : [],
      monthsLabel: String(selection.months_label || "").trim() || null,
      ready: Boolean(payload.selected_product_ready || selection.ready),
    },
    context: {
      phase: String(context.current_phase || context.phase || "").trim() || null,
      month,
      temperature,
      temperatureSource: String(context.temperature_source || product.temperature_source || "").trim() || null,
    },
    constraints,
    blockingConstraints,
    nonBlockingConstraints,
    reasons,
    missingRequirements,
    readyToDeclare: Boolean(payload.ready_to_declare),
    selectedProductReady: Boolean(payload.selected_product_ready),
    uiSummary: String(payload.ui_summary || attrs.ui_summary || "").trim(),
    uiHint: String(payload.ui_hint || attrs.ui_hint || "").trim(),
  };
}

function renderDebugInterventionSection(card, debug, wrapped = true) {
  if (!debug || !debug.entity) {
    return "";
  }

  const score = debug.score === null || debug.score === undefined ? 0 : formatNumber(debug.score, 0);
  const presentation = resolveInterventionStatusPresentation(debug.status);
  const statusLabel = debug.statusLabel || presentation.badge || presentation.summary || "Non disponible";
  const statusTone = debug.statusTone || presentation.tone || "neutral";
  const statusIcon = debug.statusIcon || presentation.icon || "mdi:bug-outline";
  const summary = debug.summary || presentation.summary || "Recommandation disponible";
  const nextReason = debug.reason || debug.uiSummary || summary;
  const detailHintParts = [];
  if (debug.context?.phase) {
    detailHintParts.push(`Phase actuelle: ${formatStatusLabel(debug.context.phase)}`);
  }
  if (debug.context?.month !== null && debug.context?.month !== undefined) {
    detailHintParts.push(`Mois: ${formatMonthLabel(debug.context.month)}`);
  }
  if (debug.context?.temperature !== null && debug.context?.temperature !== undefined) {
    detailHintParts.push(`Température: ${formatNumber(debug.context.temperature, 1)} °C`);
  }
  const detailHint = detailHintParts.join(" · ") || debug.uiHint || "Lecture directe du moteur décisionnel.";
  const productName = debug.productName || "Aucun produit identifié";
  const productHeadingLabel =
    debug.status === "recommended" || debug.status === "ready"
      ? "Produit retenu"
      : debug.status === "possible" || debug.status === "preparation"
        ? "Produit candidat"
        : "Produit évalué";
  const productType = debug.productType ? formatStatusLabel(debug.productType) : null;
  const productId = debug.productId ? `ID: ${debug.productId}` : "";
  const actionLabel = debug.recommendedActionLabel || formatDebugRecommendedAction(debug.recommendedAction);
  const contextPills = [];
  if (debug.context?.phase) {
    contextPills.push(renderStatusPill(`Phase: ${formatStatusLabel(debug.context.phase)}`, "neutral", "mdi:grass", "debug-chip"));
  }
  if (debug.context?.month !== null && debug.context?.month !== undefined) {
    contextPills.push(renderStatusPill(`Mois: ${formatMonthLabel(debug.context.month)}`, "neutral", "mdi:calendar-month", "debug-chip"));
  }
  if (debug.context?.temperature !== null && debug.context?.temperature !== undefined) {
    contextPills.push(
      renderStatusPill(`Température: ${formatNumber(debug.context.temperature, 1)} °C`, "neutral", "mdi:thermometer", "debug-chip"),
    );
  }
  if (debug.context?.temperatureSource) {
    contextPills.push(
      renderStatusPill(`Source: ${formatStatusLabel(debug.context.temperatureSource)}`, "neutral", "mdi:database", "debug-chip"),
    );
  }
  const reasons = Array.isArray(debug.reasons) ? debug.reasons.filter(Boolean).map((value) => String(value).trim()).filter(Boolean) : [];
  const missingRequirements = Array.isArray(debug.missingRequirements)
    ? debug.missingRequirements.filter(Boolean).map((value) => String(value).trim()).filter(Boolean)
    : [];
  const blockingConstraints = Array.isArray(debug.blockingConstraints) ? debug.blockingConstraints : [];
  const nonBlockingConstraints = Array.isArray(debug.nonBlockingConstraints) ? debug.nonBlockingConstraints : [];

  const inner = `
        <div class="tab-panel__section-head">
          <div class="tab-panel__eyebrow">Analyse moteur</div>
          <div class="tab-panel__section-meta">${escapeHtml(statusLabel)}</div>
        </div>

        <div class="decision-hero">
          <div class="decision-hero__top">
            <div class="decision-hero__summary">Score ${escapeHtml(String(score))}</div>
            ${renderStatusPill(statusLabel, statusTone, statusIcon, `decision-status decision-status--${statusTone}`)}
          </div>
          <div class="decision-hero__next">${escapeHtml(nextReason)}</div>
          <div class="decision-hero__hint">${escapeHtml(detailHint)}</div>
        </div>

        <div class="decision-plan">
          <div class="decision-plan__header">
            <div class="decision-plan__label">${escapeHtml(productHeadingLabel)}</div>
            <div class="decision-plan__meta">${escapeHtml(actionLabel)}</div>
          </div>
          <div class="decision-plan__summary">${escapeHtml(productName)}</div>
          <div class="decision-plan__chips">
            ${productId ? renderStatusPill(productId, "neutral", "mdi:identifier", "debug-chip") : ""}
            ${productType ? renderStatusPill(`Type: ${productType}`, "neutral", "mdi:package-variant", "debug-chip") : ""}
            ${contextPills.join("")}
          </div>
        </div>

        <div class="tab-panel__debug-columns">
          <div class="decision-context">
            <div class="decision-plan__header">
              <div class="decision-plan__label">Contraintes bloquantes</div>
              <div class="decision-plan__meta">${escapeHtml(String(blockingConstraints.length))}</div>
            </div>
            <div class="tab-panel__debug-grid">
              ${renderDebugConstraintCards(card, blockingConstraints, "Aucune contrainte bloquante.")}
            </div>
          </div>

          <div class="decision-context">
            <div class="decision-plan__header">
              <div class="decision-plan__label">Contraintes non bloquantes</div>
              <div class="decision-plan__meta">${escapeHtml(String(nonBlockingConstraints.length))}</div>
            </div>
            <div class="tab-panel__debug-grid">
              ${renderDebugConstraintCards(card, nonBlockingConstraints, "Aucune contrainte non bloquante.")}
            </div>
          </div>
        </div>

        <div class="decision-plan">
          <div class="decision-plan__header">
            <div class="decision-plan__label">Signaux retenus</div>
            <div class="decision-plan__meta">${escapeHtml(String(reasons.length))}</div>
          </div>
          <div class="decision-plan__chips">
            ${
              reasons.length
                ? reasons.map((reason) => renderStatusPill(reason, "neutral", "mdi:check-circle-outline", "debug-chip")).join("")
                : renderStatusPill("Aucune raison détaillée", "neutral", "mdi:check-circle-outline", "debug-chip")
            }
          </div>
          <div class="decision-plan__header" style="margin-top: 10px;">
            <div class="decision-plan__label">Pré-requis manquants</div>
            <div class="decision-plan__meta">${escapeHtml(String(missingRequirements.length))}</div>
          </div>
          <div class="decision-plan__chips">
            ${
              missingRequirements.length
                ? missingRequirements
                    .map((requirement) => renderStatusPill(requirement, "warning", "mdi:alert-circle-outline", "debug-chip"))
                    .join("")
                : renderStatusPill("Aucun manque déclaré", "success", "mdi:check-circle-outline", "debug-chip")
            }
          </div>
        </div>
    `;

  if (!wrapped) {
    return `<div class="tab-panel__debug-foldout-body">${inner}</div>`;
  }

  return `
      <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--debug-intervention">
        ${inner}
      </section>
    `;
}

function renderInterventionOverviewSection(
  card,
  recommendation,
  {
    quickAction,
    hasProductOptions,
    canDeclare,
    ui,
    recommendationTone,
    recommendationIcon,
  },
) {
  const proposedProductValue = recommendation.product.name || ui.summary || "Aucun produit retenu";
  const productOptions = card._catalogueProductOptions();
  const selectedProductOptionLabel = quickAction.optionLabel || (productOptions.length === 1 ? productOptions[0].label : "");
  const selectionMeta = quickAction.record
    ? "Sélection active"
    : hasProductOptions
      ? "Produit à sélectionner"
      : "Aucun produit disponible";
  const selectionValue = quickAction.record ? quickAction.label : "Aucun produit sélectionné";
  const selectionSecondary = [
    quickAction.summary || "",
    hasProductOptions && !quickAction.record ? "Sélection nécessaire avant déclaration." : "",
  ].filter(Boolean).join(" · ");
  const declarationMeta = ui.badge || formatStatusLabel(recommendation.status) || "Non disponible";
  const declarationActionLabel = canDeclare
    ? quickAction.actionLabel || "Déclarer le produit"
    : `Action : ${ui.actionLabel || "Choisir le produit"}`;
  const declarationValue = canDeclare ? "Déclaration possible" : `Action : ${ui.actionLabel || "Choisir le produit"}`;
  const declarationSecondary = [
    ui.declarationSummary || "",
    ui.declarationHint || "",
  ].filter(Boolean).join(" · ");
  const productSecondary = [
    recommendation.product.type ? formatStatusLabel(recommendation.product.type) : "",
    recommendation.product.monthsLabel || "",
    recommendation.score !== null && recommendation.score !== undefined
      ? `Score ${formatNumber(recommendation.score, 0)}/100`
      : "",
  ].filter(Boolean).join(" · ");
  const chips = [
    { label: "Recommandation", value: ui.badge || "Non disponible", tone: recommendationTone },
    { label: "Sélection", value: quickAction.record ? "Active" : selectionMeta, tone: quickAction.record ? "success" : hasProductOptions ? "warning" : "neutral" },
    { label: "Déclaration", value: canDeclare ? "Possible" : declarationMeta, tone: canDeclare ? "success" : recommendationTone },
  ];
  return `
      <div class="gz2-eyebrow gz2-eyebrow--section">Pilotage intervention</div>
      <div class="gz2-chips">${renderGz2Chips(chips)}</div>
      <div class="gz2-cards" style="grid-template-columns: 1fr;">
        ${renderGz2Cards(card, [{ label: "Produit proposé", value: proposedProductValue, tone: "neutral", secondary: productSecondary || ui.hint || "" }])}
      </div>
      <div class="gz2-field">
        <span class="gz2-field__label">Produit à déclarer</span>
        <select
          class="gz2-select"
          data-gazon-action="select-intervention-product"
          aria-label="Choisir le produit d'intervention"
          ${hasProductOptions ? "" : "disabled"}
        >
          <option value="">${escapeHtml(hasProductOptions ? "Choisir un produit" : "Aucun produit disponible")}</option>
          ${productOptions
            .map((option) => `<option value="${escapeHtml(option.label)}" ${option.label === selectedProductOptionLabel ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
            .join("")}
        </select>
        ${selectionSecondary ? `<div class="gz2-card__sub" style="margin-top: 7px;">${escapeHtml(selectionSecondary)}</div>` : ""}
      </div>
      <button
        type="button"
        class="gz2-btn gz2-btn--block"
        data-gazon-action="declare-product-intervention"
        ${canDeclare ? "" : "disabled"}
        aria-label="${escapeHtml(canDeclare ? (quickAction.actionLabel || "Déclarer le produit") : (ui.actionLabel || "Choisir le produit"))}"
      >
        ${renderIconBox("mdi:spray-bottle", "sm")}<span>${escapeHtml(declarationActionLabel)}</span>
      </button>
      ${declarationSecondary ? `<div class="gz2-card__sub" style="margin-top: 8px;">${escapeHtml(declarationSecondary)}</div>` : ""}
    `;
}

function renderInterventionTechnicalSummary(card, recommendation, debug) {
  const lastUserAction = card._lastUserActionState();
  const scoreValue = recommendation.score !== null && recommendation.score !== undefined
    ? `${formatNumber(recommendation.score, 0)}/100`
    : "—";
  const blockingConstraints = Array.isArray(debug?.blockingConstraints)
    ? debug.blockingConstraints.length
    : Array.isArray(recommendation.constraints)
      ? recommendation.constraints.filter((constraint) => constraint?.blocking).length
      : 0;
  const nonBlockingConstraints = Array.isArray(debug?.nonBlockingConstraints)
    ? debug.nonBlockingConstraints.length
    : Array.isArray(recommendation.constraints)
      ? recommendation.constraints.filter((constraint) => !constraint?.blocking).length
      : 0;
  const missingRequirements = Array.isArray(debug?.missingRequirements)
    ? debug.missingRequirements.length
    : Array.isArray(recommendation.missingRequirements)
      ? recommendation.missingRequirements.length
      : 0;
  const scoreTone = recommendation.scoreHigh ? "success" : recommendation.status === "blocked" ? "danger" : "warning";
  const techCards = [
    { label: "Score", value: scoreValue, tone: scoreTone, secondary: `Niveau ${formatStatusLabel(recommendation.scoreLevel || "neutral")}` },
    { label: "Bloquantes", value: String(blockingConstraints), tone: blockingConstraints > 0 ? "danger" : "success", secondary: blockingConstraints > 0 ? "Une ou plusieurs contraintes bloquent la déclaration." : "Aucune contrainte bloquante." },
    { label: "Non bloquantes", value: String(nonBlockingConstraints), tone: nonBlockingConstraints > 0 ? "warning" : "neutral", secondary: nonBlockingConstraints > 0 ? "Signaux dégradants ou neutres pris en compte." : "Aucun signal secondaire détaillé." },
    { label: "Manquants", value: String(missingRequirements), tone: missingRequirements > 0 ? "warning" : "success", secondary: missingRequirements > 0 ? "Des étapes restent à compléter avant déclaration." : "Aucun pré-requis manquant." },
    ...(lastUserAction.summary
      ? [{ label: "Dernière exécution", value: lastUserAction.action || lastUserAction.state || "Exécution", tone: "neutral", secondary: [lastUserAction.when, lastUserAction.reason].filter(Boolean).join(" · ") || lastUserAction.summary }]
      : []),
  ];
  return `
      <div class="gz2-eyebrow gz2-eyebrow--section">Repères techniques</div>
      <div class="gz2-cards">${renderGz2Cards(card, techCards)}</div>
    `;
}

function renderWateringProgressSection(card, progressState) {
  try {
    if (!progressState?.active) {
      return "";
    }
    const percent = Math.max(0, Math.min(100, asNumber(progressState.progressPercent) ?? 0));
    const remainingSeconds = Math.max(0, asNumber(progressState.remainingSeconds) ?? 0);
    const remainingLabel =
      progressState.remainingSeconds !== undefined && progressState.remainingSeconds !== null
        ? formatDurationHuman(remainingSeconds / 60.0)
        : "0 min";
    const summary = String(progressState.summary || "Irrigation en cours").trim();
    const detail = String(progressState.detail || "").trim();
    const activeZoneLabels = Array.isArray(progressState.activeZoneLabels) ? progressState.activeZoneLabels.filter(Boolean) : [];
    const activeZoneLabel = activeZoneLabels.join(" · ");
    const metaParts = [];
    if (progressState.startedAtLabel) {
      metaParts.push(progressState.startedAtLabel);
    }
    if (detail) {
      metaParts.push(detail);
    }
    if (remainingSeconds > 0) {
      metaParts.push(`${remainingLabel} restants`);
    }
    return `
        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--watering-progress" data-watering-progress="section">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Irrigation en cours</div>
            <div class="tab-panel__section-meta" data-watering-progress="percent">${escapeHtml(`${Math.round(percent)} %`)}</div>
          </div>
          <div class="tab-panel__section-summary" data-watering-progress="summary">${escapeHtml(summary)}</div>
          ${activeZoneLabel ? `<div class="tab-panel__watering-zone" data-watering-progress="zone">Zone active · ${escapeHtml(activeZoneLabel)}</div>` : `<div class="tab-panel__watering-zone" data-watering-progress="zone" hidden></div>`}
          <div class="tab-progress" data-watering-progress="progress" aria-label="${escapeHtml(summary)}">
            <div class="tab-progress__bar gi-progress">
              <span class="gi-progress__bar ${progressState.critical ? "gi-progress__bar--critical" : ""}" data-watering-progress="bar" style="width:${escapeHtml(String(percent))}%;"></span>
            </div>
            <div class="tab-progress__meta" data-watering-progress="meta">${escapeHtml(metaParts.join(" · ") || "Session active")}</div>
          </div>
        </section>
      `;
  } catch (error) {
    console.error("[gazon-intelligent-card] progress render failed", error);
    return `
        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--watering-progress">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Irrigation en cours</div>
            <div class="tab-panel__section-meta">—</div>
          </div>
          <div class="tab-panel__section-summary">Suivi de progression indisponible</div>
          <div class="tab-progress">
            <div class="tab-progress__bar gi-progress">
              <span class="gi-progress__bar" style="width:0%;"></span>
            </div>
            <div class="tab-progress__meta">La session reste active.</div>
          </div>
        </section>
      `;
  }
}

function renderCatalogueProductCards(card) {
  const products = card._catalogueProducts();
  const selection = card._productSelectionState();
  const selectedProductId = String(selection.selectedProductId || "").trim().toLowerCase();
  if (!products.length) {
    return `<div class="gz2-empty">Aucun produit enregistré.</div>`;
  }
  const items = products.map((product) => {
    const productId = String(product.id || "").trim();
    const productName = String(product.nom || productId || "").trim() || "Produit";
    const productType = String(product.type || "").trim();
    const usageMode = String(product.usage_mode || "").trim();
    const monthsLabel = String(product.application_months_label || "").trim();
    const requiresWateringAfter = Boolean(product.application_requires_watering_after);
    const isSelected = selectedProductId && productId.toLowerCase() === selectedProductId;
    const secondaryParts = [
      usageMode ? `Mode ${formatProductUsageMode(usageMode)}` : "",
      monthsLabel,
      requiresWateringAfter ? "Arrosage après application" : "",
    ].filter(Boolean);
    return {
      label: productType ? formatStatusLabel(productType) : "Produit",
      value: productName,
      tone: isSelected ? "success" : "neutral",
      secondary: secondaryParts.join(" · "),
    };
  });
  return `<div class="gz2-cards">${renderGz2Cards(card, items)}</div>`;
}

function buildApplicationHistoryRows(items) {
  return Array.isArray(items)
    ? items
        .filter((item) => item && typeof item === "object")
        .slice()
        .reverse()
        .map((item) => {
          const productLabel = String(item.libelle || item.produit || item.type || "Application").trim();
          const whenLabel = humanDateTimeText(item.date_action || item.date || item.declared_at) || String(item.date || "").trim() || "";
          const detailParts = [];
          const typeLabel = String(item.type || "").trim();
          const dose = String(item.dose || "").trim();
          const applicationType = String(item.application_type || "").trim();
          const irrigationMode = String(item.application_irrigation_mode || "").trim();
          const note = String(item.note || "").trim();
          if (typeLabel) {
            detailParts.push(formatStatusLabel(typeLabel));
          }
          if (dose) {
            detailParts.push(dose);
          }
          if (applicationType) {
            detailParts.push(formatStatusLabel(applicationType));
          }
          if (irrigationMode) {
            detailParts.push(`Mode ${formatApplicationMode(irrigationMode)}`);
          }
          if (note) {
            detailParts.push(note);
          }
          return {
            label: whenLabel || "Application",
            value: productLabel,
            note: detailParts.join(" · "),
            tone: "neutral",
          };
        })
    : [];
}

function renderApplicationHistoryItems(items) {
  const rows = buildApplicationHistoryRows(items);
  if (!rows.length) {
    return `<div class="tab-panel__empty">Aucune application enregistrée dans l’historique local.</div>`;
  }
  return renderCompactSummaryList(rows, "Aucune application enregistrée dans l’historique local.");
}

function renderApplicationHistoryPreview(items, limit = 2) {
  const rows = buildApplicationHistoryRows(items).slice(0, Math.max(0, limit));
  if (!rows.length) {
    return "";
  }
  return `
    <div class="tab-panel__history-foldout-preview">
      ${renderCompactSummaryList(rows, "Aucune application enregistrée dans l’historique local.")}
    </div>
  `;
}

function renderApplicationHistoryFoldout(items) {
  const history = Array.isArray(items) ? items.filter((item) => item && typeof item === "object") : [];
  if (!history.length) {
    return "";
  }
  const countLabel = history.length > 1 ? `${history.length} applications enregistrées` : "1 application enregistrée";
  const rows = buildApplicationHistoryRows(history);
  return `
      <section class="tab-panel__history-rail gi-info gi-info--secondary">
        <div class="tab-panel__section-head tab-panel__history-foldout-head">
          <div class="tab-panel__eyebrow">Historique complet</div>
          <div class="tab-panel__section-meta">${escapeHtml(countLabel)}</div>
        </div>
        <div class="tab-panel__section-hint">Défilement vertical, de la plus récente à la plus ancienne.</div>
        <div class="tab-panel__history-rail-body">
          <div class="tab-panel__history-rail-track">
            ${rows
              .map(
                (row) => `
                  <div class="tab-panel__history-rail-item tab-panel__summary-row tab-panel__summary-row--${escapeHtml(row.tone || "neutral")}">
                    ${row.label ? `<div class="tab-panel__summary-label">${escapeHtml(row.label)}</div>` : ""}
                    <div class="tab-panel__summary-value">${escapeHtml(row.value || "Non disponible")}</div>
                    ${row.note ? `<div class="tab-panel__summary-note">${escapeHtml(row.note)}</div>` : ""}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
}

function renderApplicationHistoryInline(items) {
  const history = Array.isArray(items) ? items.filter((item) => item && typeof item === "object") : [];
  if (!history.length) {
    return "";
  }
  const countLabel = history.length > 1 ? `${history.length} applications enregistrées` : "1 application enregistrée";
  const rows = buildApplicationHistoryRows(history);
  return `
      <div class="tab-panel__history-inline">
        <div class="tab-panel__history-inline-head">
          <div class="tab-panel__eyebrow">Historique</div>
          <div class="tab-panel__history-inline-meta">${escapeHtml(countLabel)} · plus récente en haut</div>
        </div>
        <div class="tab-panel__history-rail-body tab-panel__history-rail-body--inline">
          <div class="tab-panel__history-rail-track">
            ${rows
              .map(
                (row) => `
                  <div class="tab-panel__history-rail-item tab-panel__summary-row tab-panel__summary-row--${escapeHtml(row.tone || "neutral")}">
                    ${row.label ? `<div class="tab-panel__summary-label">${escapeHtml(row.label)}</div>` : ""}
                    <div class="tab-panel__summary-value">${escapeHtml(row.value || "Non disponible")}</div>
                    ${row.note ? `<div class="tab-panel__summary-note">${escapeHtml(row.note)}</div>` : ""}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
}

function renderProductsTab(card) {
  const selection = card._productSelectionState();
  const catalogue = card._catalogueState();
  const application = card._applicationEntity();
  const lastApplication = card._lastApplicationState();
  const hasApplication = Boolean(lastApplication.hasApplication);
  const applicationHistory = Array.isArray(lastApplication.history) ? lastApplication.history : [];
  const hasProductData = Boolean(
    selection.selectedProductId || selection.selectedProductName || catalogue.hasProducts || application,
  );
  const emptyStateMessage = "Aucune donnée produit disponible";
  const productsTone = hasProductData
    ? selection.selectedProductId || catalogue.hasProducts
      ? "success"
      : "accent"
    : "neutral";
  const productsSummary = hasProductData
    ? selection.selectedProductName
      ? `Produit actif : ${selection.selectedProductName}`
      : catalogue.hasProducts
        ? "Aucun produit n’est sélectionné"
        : "Aucun produit enregistré"
    : emptyStateMessage;
  const productsHintParts = [
    selection.selectedProductMonthsLabel ? `Période: ${selection.selectedProductMonthsLabel}` : "",
    selection.usageModeLabel ? `Mode: ${selection.usageModeLabel}` : "",
    selection.maxApplicationsPerYearLabel ? `Max/an: ${selection.maxApplicationsPerYearLabel}` : "",
  ].filter(Boolean);
  const productsHint = hasProductData
    ? productsHintParts.join(" · ") || "Le référentiel produit alimente la prochaine recommandation."
    : emptyStateMessage;
  const lastApplicationSummary = hasApplication ? lastApplication.summary : "Aucune application enregistrée.";
  const lastApplicationHint = hasApplication
    ? lastApplication.detail || "Dernière application détectée."
    : "Aucune application enregistrée dans l’historique local.";
  const applicationHistorySummary = hasApplication
    ? applicationHistory.length > 1
      ? `${applicationHistory.length} applications enregistrées`
      : "1 application enregistrée"
    : "Aucune application enregistrée";

  return `
      <section class="gz2-overview" aria-label="Produits">
        ${renderGz2Hero("Référentiel produit", productsSummary, productsHint)}
        <div class="gz2-eyebrow gz2-eyebrow--section">Catalogue</div>
        <div class="gz2-card__sub" style="margin:0 0 12px;">${escapeHtml(catalogue.summary || "Catalogue local")}</div>
        ${renderCatalogueProductCards(card)}
        <div class="gz2-eyebrow gz2-eyebrow--section">Dernière application</div>
        <div class="gz2-card__sub" style="margin:0 0 12px;">${escapeHtml(hasApplication ? lastApplicationSummary : lastApplicationHint)}</div>
        ${renderApplicationHistoryInline(applicationHistory)}
      </section>
    `;
}

function renderInterventionTab(card) {
  const recommendation = card._interventionRecommendationState();
  const debug = getDebugInterventionState(card);
  const quickAction = card._selectedProductInterventionState();
  const ui = recommendation.ui || {};
  const hasProductOptions = card._catalogueProductOptions().length > 0;
  const canDeclare = Boolean(quickAction.record && !quickAction.disabled);
  const recommendationTone = ui.tone || formatIrrigationSignalTone({
    reasonKind: recommendation.status,
    triggerKind: recommendation.triggerKind,
  }) || "neutral";
  const recommendationIcon = ui.icon || "mdi:spray-bottle";
  const recommendationLabel = formatIrrigationSignalLabel({
    actionLabel: ui.actionLabel,
    summary: ui.summary,
    reasonKind: recommendation.status,
  });
  const temperatureConstraint = (Array.isArray(recommendation.constraints)
    ? recommendation.constraints.find((constraint) => constraint?.code === "temperature_range")
    : null);
  const temperatureConstraintState = formatTemperatureRangeConstraint(temperatureConstraint);

  return `
      <section class="gz2-overview" aria-label="Intervention">
        ${renderGz2Hero(ui.title || "Intervention", ui.summary || "Non disponible", ui.hint || "")}
        ${
          temperatureConstraintState
            ? `
              <div class="tab-panel__temperature-constraint tab-panel__temperature-constraint--${temperatureConstraintState.tone}">
                ${renderStatusPill(
                  temperatureConstraintState.title,
                  temperatureConstraintState.tone,
                  temperatureConstraintState.icon,
                  `tab-panel__status tab-panel__status--${temperatureConstraintState.tone}`,
                )}
                <div class="tab-panel__temperature-copy">
                  <div class="tab-panel__temperature-detail">${escapeHtml(temperatureConstraintState.detail)}</div>
                  ${
                    temperatureConstraintState.hint
                      ? `<div class="tab-panel__temperature-hint">${escapeHtml(temperatureConstraintState.hint)}</div>`
                      : ""
                  }
                </div>
              </div>
            `
            : ""
        }

        ${renderInterventionOverviewSection(card, recommendation, {
          quickAction,
          hasProductOptions,
          canDeclare,
          ui,
          recommendationTone,
          recommendationIcon,
        })}

        ${renderInterventionTechnicalSummary(card, recommendation, debug)}

        <details class="tab-panel__debug-foldout">
          <summary class="tab-panel__debug-foldout-summary">
            <span class="tab-panel__eyebrow">Analyse moteur</span>
            <span class="tab-panel__debug-foldout-meta">${escapeHtml(
              debug
                ? `Score ${formatNumber(debug.score ?? 0, 0)} · ${debug.blockingConstraints?.length ?? 0} bloquante(s) · ${debug.nonBlockingConstraints?.length ?? 0} signal(s) · ${debug.missingRequirements?.length ?? 0} manquant(s)`
                : `${declarationMeta} · Analyse moteur`,
            )}</span>
          </summary>
          ${renderDebugInterventionSection(card, debug, false)}
        </details>
      </section>
    `;
}

function renderHeader(card) {
  if (!card._config?.show_header) {
    return "";
  }
  const phase = card._entityState("entity_phase", null);
  const subPhase = card._entityState("entity_sous_phase", null);
  const normalizedPhase = String(phase ?? "").trim().toLowerCase();
  const normalizedSubPhase = String(subPhase ?? "").trim().toLowerCase();
  const subtitleParts = [phase ? escapeHtml(phase) : "Phase non disponible"];
  if (subPhase && normalizedSubPhase !== normalizedPhase) {
    subtitleParts.push(escapeHtml(subPhase));
  }
  const weather = card._weatherState();
  const manualActionLabel = card._manualActionLabel();
  const tone = card._cardTone();
  const dotToneMap = { success: "success", warning: "warning", danger: "danger", critical: "danger", accent: "success", neutral: "neutral" };
  const dotTone = dotToneMap[tone] || "neutral";
  return `
      <header class="gz2-header">
        <div class="gz2-header__id">
          <div class="gz2-header__icon">${card._config.show_icons ? renderIconBox("mdi:grass", "md") : ""}</div>
          <div class="gz2-header__titles">
            <div class="gz2-header__name">
              <div class="gz2-header__title">${escapeHtml(card._config.title || "Gazon Intelligent")}</div>
              <span class="gz2-title-dot" style="background: var(--gi-status-${dotTone});" title="État global de la carte" aria-hidden="true"></span>
            </div>
            <div class="gz2-header__sub">${subtitleParts.join(" · ")}</div>
          </div>
        </div>
        <div class="gz2-header__meta">
          ${weather ? `<span class="gz2-weather">${weather.icon ? renderIconBox(weather.icon, "sm") : ""}${escapeHtml(weather.summary)}</span>` : ""}
          <button
            type="button"
            class="gz2-btn"
            data-gazon-action="manual-irrigation"
            aria-label="${escapeHtml(manualActionLabel)}"
          >
            ${card._config?.show_icons ? renderIconBox("mdi:water-pump", "sm") : ""}<span>${escapeHtml(manualActionLabel)}</span>
          </button>
        </div>
      </header>
    `;
}

function renderOverviewTab(card) {
  const windowState = card._windowState();
  const proposal = card._overviewProposal();
  const facts = card._overviewFacts();
  const nextWatering = card._nextWateringState();
  const nextMowing = card._nextMowingState();
  const lastWatering = card._lastWateringState();
  const titleText = proposal.hint || "Vue d’ensemble du gazon.";
  let heroSub = compactDecisionText(card._entityState("entity_conseil", "") || "", { maxLength: 130 });
  if (!heroSub || heroSub === titleText) {
    heroSub = "";
  }
  const reperes = [
    { label: "Fenêtre", value: windowState.statusLabel },
    { label: "Prochain arrosage", value: nextWatering.label },
    { label: "Prochaine tonte", value: nextMowing.label },
    { label: "Dernier arrosage", value: lastWatering.label },
  ];

  return `
      <section class="gz2-overview" aria-label="Synthèse">
        <div class="gz2-hero">
          <div class="gz2-eyebrow">Conseil du jour</div>
          <div class="gz2-hero__title">${escapeHtml(titleText)}</div>
          ${heroSub ? `<div class="gz2-hero__sub">${escapeHtml(heroSub)}</div>` : ""}
        </div>

        <div class="gz2-reperes" aria-label="Repères">
          ${reperes.map((r) => `
            <div class="gz2-rep">
              <div class="gz2-rep__label">${escapeHtml(r.label)}</div>
              <div class="gz2-rep__value">${escapeHtml(r.value || "—")}</div>
            </div>
          `).join("")}
        </div>

        <div class="gz2-eyebrow">Essentiel</div>
        <div class="gz2-cards">
          ${facts.map((f) => {
            const eid = card._entityId(f.entityKey);
            const vTone = ["success", "warning", "danger", "critical"].includes(f.tone) ? ` gz2-card__value--${f.tone}` : "";
            return `
              <button type="button" class="gz2-card"${eid ? ` data-more-info-entity="${escapeHtml(eid)}"` : ""}>
                <div class="gz2-card__label">${escapeHtml(f.label)}</div>
                <div class="gz2-card__value${vTone}">${escapeHtml(f.value)}</div>
                ${f.secondary ? `<div class="gz2-card__sub">${escapeHtml(f.secondary)}</div>` : ""}
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
}

function renderWateringTab(card) {
  const windowState = card._windowState();
  const irrigationSignal = card._irrigationSignalState();
  const mowerState = card._mowerState();
  const mowerCoordinationState = card._mowerCoordinationSwitchState();
  const context = card._objectiveContext();
  const nextWatering = card._nextWateringState();
  const lastWatering = card._lastWateringState();
  const lastWateringTotal = card._lastWateringTotalState();
  const nextActionText = windowState.displayNextAction || windowState.nextActionDisplay || windowState.nextAction;
  const planState = card._planState();
  const objective = windowState.objective;
  const objectiveLabel = formatMm(objective);
  const tone = irrigationSignal.tone || windowState.tone;
  const windowIcon = card._statusIcon(windowState.status);
  const windowStatusIcon = card._config?.show_icons ? windowIcon : null;
  const isBlocked = windowState.isBlocked;
  const isAwaiting = windowState.isAwaiting;
  const noActionText = windowState.isNoActionRequired ? "Non requis" : "";
  const noActionHint = windowState.isNoActionRequired ? windowState.displaySummary || windowState.summary || "Non requis" : "";
  const blockHint = isBlocked
    ? windowState.blockReasonLabel || windowState.displayNextAction || windowState.nextAction || ""
    : isAwaiting
      ? windowState.nextAction || "Attendre le créneau prévu"
      : [
          noActionHint,
          windowState.optimalWindowDisplay ? `Optimal: ${windowState.optimalWindowDisplay}` : "",
          windowState.wateringWindowDisplay ? `Créneau: ${windowState.wateringWindowDisplay}` : "",
        ].filter(Boolean).join(" · ");
  const heroNextText = String(windowState.reasonSummary || nextActionText || "").trim();
  const heroHintText = String(blockHint || "").trim();
  const normalizedHeroNext = heroNextText.toLowerCase();
  const normalizedHeroHint = heroHintText.toLowerCase();
  const shouldShowHeroHint = Boolean(heroHintText)
    && (isBlocked || isAwaiting)
    && normalizedHeroHint !== normalizedHeroNext
    && !normalizedHeroHint.startsWith(`${normalizedHeroNext} ·`)
    && !normalizedHeroNext.startsWith(`${normalizedHeroHint} ·`);
  const planTypeLabel = formatPlanType(planState.planType);
  const wateringCauseLabel = formatWateringCauseLabel(windowState.wateringCause || irrigationSignal.wateringCause || "hydrique");
  const wateringTypeLabel = formatWateringTypeLabel(irrigationSignal.typeArrosage || context.typeArrosage);

  const hydricUx = formatHydricUxState({
    depletionRatio: context.depletionRatio,
    reserveStock: context.reserveStock,
    reserveStockMax: context.reserveStockMax,
    reserveActuelle: context.reserveActuelle,
    reserveUsefulMax: context.reserveUsefulMax,
  });
  const reserveTotalValue = context.reserveStock != null
    ? (context.reserveStockMax != null && context.reserveStockMax > 0
        ? `${formatNumber(context.reserveStock, 1)} / ${formatNumber(context.reserveStockMax, 1)} mm`
        : `${formatNumber(context.reserveStock, 1)} mm`)
    : "Non disponible";
  const reserveUsefulValue = context.reserveActuelle != null
    ? (context.reserveUsefulMax != null && context.reserveUsefulMax > 0
        ? `${formatNumber(context.reserveActuelle, 1)} / ${formatNumber(context.reserveUsefulMax, 1)} mm`
        : `${formatNumber(context.reserveActuelle, 1)} mm`)
    : "Non disponible";
  const surplusHydriqueValue = context.reserveSurplus != null
    ? `${formatNumber(context.reserveSurplus, 1)} mm`
    : "—";
  const depletionUsefulValue = context.depletionRatio != null
    ? `${formatNumber(Math.max(0, context.depletionRatio) * 100, 0)} %`
    : "Non disponible";
  const hydricUsefulWidth = (
    context.reserveStockMax != null && context.reserveStockMax > 0 && context.reserveActuelle != null
      ? Math.max(0, Math.min(100, (context.reserveActuelle / context.reserveStockMax) * 100))
      : 0
  );
  const hydricSurplusWidth = (
    context.reserveStockMax != null && context.reserveStockMax > 0 && context.reserveSurplus != null
      ? Math.max(0, Math.min(100, (context.reserveSurplus / context.reserveStockMax) * 100))
      : 0
  );
  const hydricFillWidth = hydricUsefulWidth + hydricSurplusWidth;
  const reserveHydricFacts = [
    {
      label: "Réserve utile",
      value: reserveUsefulValue,
      secondary: "Part exploitable par le gazon",
      tone: hydricUx.tone,
      icon: "mdi:water-percent",
      entityKey: "entity_reserve_actuelle",
    },
    {
      label: "Surplus",
      value: surplusHydriqueValue,
      secondary: "Au-dessus de la réserve utile",
      tone: context.reserveSurplus != null && context.reserveSurplus > 0 ? "success" : "neutral",
      icon: "mdi:water-plus",
      entityKey: "entity_reserve_actuelle",
    },
    {
      label: "Déplétion",
      value: depletionUsefulValue,
      secondary: context.depletionMm != null ? `${formatNumber(context.depletionMm, 1)} mm consommés` : "Part consommée de la réserve utile",
      tone: context.depletionRatio != null && context.depletionRatio > 0 ? "warning" : "success",
      icon: "mdi:water-minus",
      entityKey: "entity_reserve_actuelle",
    },
  ];

  const wateringProgress = card._wateringProgressState();
  const decisionFacts = [
    {
      label: "Fenêtre",
      value: windowState.statusLabel,
      secondary: windowState.displaySummary || windowState.summary || "",
      tone: windowState.tone,
      icon: "mdi:clock-outline",
    },
    {
      label: "Signal",
      value: irrigationSignal.actionLabel || "Non disponible",
      secondary: irrigationSignal.summary || "",
      tone,
      icon: "mdi:sprinkler",
    },
    {
      label: "Cause",
      value: wateringCauseLabel,
      secondary: windowState.reasonSummary || "",
      tone: windowState.isPostApplication ? "accent" : "neutral",
      icon: "mdi:source-branch",
    },
    {
      label: "Type",
      value: wateringTypeLabel,
      secondary: planState.summary || "",
      tone: isEmpty(irrigationSignal.typeArrosage || context.typeArrosage) ? "neutral" : "accent",
      icon: "mdi:water-sync",
    },
  ];
  const contextFacts = [
    context.hydricState ? {
      label: "État hydrique",
      value: formatStatusLabel(context.hydricState),
      secondary: context.reserveActuelle !== null ? `${formatNumber(context.reserveActuelle, 1)} mm disponibles` : "",
      tone: context.hydricState === "plein" ? "success" : "warning",
      icon: "mdi:water-percent-alert",
    } : null,
    context.temperature !== null ? {
      label: "Température",
      value: `${formatNumber(context.temperature, 1)} °C`,
      secondary: context.etp !== null ? `ETP ${formatNumber(context.etp, 1)} mm` : "",
      tone: context.temperature >= 24 ? "warning" : "neutral",
      icon: "mdi:thermometer",
    } : null,
    {
      label: "Coordination",
      value: mowerCoordinationState.label,
      secondary: irrigationSignal.wateringBlockedByMower ? (irrigationSignal.wateringBlockReasonLabel || "Blocage robot actif") : (mowerState.reason || ""),
      tone: irrigationSignal.wateringBlockedByMower ? "danger" : mowerCoordinationState.tone,
      icon: "mdi:robot-mower",
    },
    {
      label: "Plan",
      value: planTypeLabel,
      secondary: planState.durationHuman,
      tone: "accent",
      icon: "mdi:timer-outline",
    },
    {
      label: "Prochain arrosage",
      value: nextWatering.label,
      secondary: nextWatering.detail,
      tone: nextWatering.tone,
      icon: "mdi:clock-water-outline",
    },
    {
      label: "Dernier arrosage",
      value: lastWatering.label,
      secondary: lastWatering.detail,
      tone: lastWatering.value !== null ? "success" : "neutral",
      icon: "mdi:water-check",
    },
    lastWateringTotal.value !== null ? {
      label: "Arrosage cumulé",
      value: lastWateringTotal.label,
      secondary: lastWateringTotal.detail,
      tone: "neutral",
      icon: "mdi:water-sync",
    } : null,
  ].filter(Boolean);

  const reperes = [
    { label: "Objectif", value: objectiveLabel },
    { label: "Type", value: wateringTypeLabel },
    { label: "Prochain arrosage", value: nextWatering.label },
    { label: "Dernier arrosage", value: lastWatering.label },
  ];
  const heroTitle = heroNextText || irrigationSignal.summary || windowState.summary || "Irrigation";
  const heroSub = shouldShowHeroHint ? heroHintText : "";
  const renderGz2Cards = (items) => items.map((f) => {
    const eid = card._entityId(f.entityKey);
    const vTone = ["success", "warning", "danger", "critical"].includes(f.tone) ? ` gz2-card__value--${f.tone}` : "";
    return `
      <button type="button" class="gz2-card"${eid ? ` data-more-info-entity="${escapeHtml(eid)}"` : ""}>
        <div class="gz2-card__label">${escapeHtml(f.label)}</div>
        <div class="gz2-card__value${vTone}">${escapeHtml(f.value)}</div>
        ${f.secondary ? `<div class="gz2-card__sub">${escapeHtml(f.secondary)}</div>` : ""}
      </button>`;
  }).join("");

  return `
      <section class="gz2-overview" aria-label="Irrigation">
        <div class="gz2-hero">
          <div class="gz2-eyebrow">Décision eau</div>
          <div class="gz2-hero__title">${escapeHtml(heroTitle)}</div>
          ${heroSub ? `<div class="gz2-hero__sub">${escapeHtml(heroSub)}</div>` : ""}
        </div>

        ${renderWateringProgressSection(card, wateringProgress)}

        <div class="gz2-reperes" aria-label="Repères">
          ${reperes.map((r) => `
            <div class="gz2-rep">
              <div class="gz2-rep__label">${escapeHtml(r.label)}</div>
              <div class="gz2-rep__value">${escapeHtml(r.value || "—")}</div>
            </div>
          `).join("")}
        </div>

        ${
          card._config?.show_secondary_info
            ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Réserve hydrique</div>
        <div class="gz2-meter">
          <div class="gz2-meter__top">
            <div class="gz2-meter__value">${escapeHtml(reserveTotalValue)}</div>
            <div class="gz2-meter__badge">${escapeHtml(hydricUx.label)}</div>
          </div>
          <div class="gz2-meter__track" aria-label="Répartition de la réserve hydrique">
            <span class="gz2-meter__fill" style="width:${escapeHtml(String(hydricUsefulWidth))}%;"></span>
            ${hydricSurplusWidth > 0
              ? `<span class="gz2-meter__surplus" style="left:${escapeHtml(String(hydricUsefulWidth))}%; width:${escapeHtml(String(hydricSurplusWidth))}%;"></span>`
              : ""}
          </div>
          <div class="gz2-meter__meta">${escapeHtml(`Réserve utile ${reserveUsefulValue} · Surplus ${surplusHydriqueValue} · Déplétion ${depletionUsefulValue}`)}</div>
        </div>
        <div class="gz2-cards">${renderGz2Cards(reserveHydricFacts)}</div>

        <div class="gz2-eyebrow gz2-eyebrow--section">Décision</div>
        <div class="gz2-cards">${renderGz2Cards(decisionFacts)}</div>

        <div class="gz2-eyebrow gz2-eyebrow--section">Contexte terrain</div>
        <div class="gz2-cards">${renderGz2Cards(contextFacts)}</div>
            `
            : ""
        }
      </section>
    `;
}

function renderGazonTab(card) {
  const assistant = card._assistantState();
  const phase = card._entityState("entity_phase", null);
  const subPhase = card._entityState("entity_sous_phase", null);
  const risk = card._entityState("entity_risque", null);
  const action = card._entityState("entity_niveau", null);
  const hydricLevel = String(card._entityAttribute("entity_niveau", "niveau_action_hydrique", "") || "").trim();
  const progress = asNumber(card._entity("entity_sous_phase")?.attributes?.sous_phase_progression);
  const progressDetail = card._entity("entity_sous_phase")?.attributes?.sous_phase_detail || "";
  const progressLabel = progress === null ? "Progression non disponible" : `${formatNumber(progress, 0)} %`;
  const progressWidth = progress === null ? 0 : Math.max(0, Math.min(100, progress));
  // Sans sous-phase réelle, le backend renvoie "Normal" : il n'y a alors rien à
  // suivre, on masque la section de progression plutôt que d'afficher une barre.
  const hasSubPhase = !isEmpty(subPhase) && String(subPhase).trim().toLowerCase() !== "normal";
  const gazonStatusIcon = card._config?.show_icons ? "mdi:grass" : null;
  const gazonSummary = [
    phase ? `Phase ${formatStatusLabel(phase)}` : "",
    subPhase ? `Sous-phase ${formatStatusLabel(subPhase)}` : "",
  ].filter(Boolean).join(" · ") || "Contexte gazon";
  const gazonHint = [
    risk ? `Risque ${formatStatusLabel(risk)}` : "",
    action ? `Action ${formatStatusLabel(action)}` : "",
  ].filter(Boolean).join(" · ") || "Les détails avancés suivent l’onglet actif.";
  const gazonFacts = [
    {
      label: "Assistant",
      value: assistant.summary || "Non disponible",
      tone: assistant.tone || computeActionTone(action),
      icon: "mdi:account-tie-hat-outline",
      secondary: assistant.reason || "",
      entityKey: "entity_assistant",
    },
    {
      label: "Phase dominante",
      value: formatStatusLabel(phase),
      tone: phaseTone(phase),
      icon: "mdi:grass",
      secondary: "",
      entityKey: "entity_phase",
    },
    ...(hasSubPhase ? [{
      label: "Sous-phase",
      value: formatStatusLabel(subPhase),
      tone: phaseTone(phase),
      icon: "mdi:sprout",
      secondary: progressDetail || "",
      entityKey: "entity_sous_phase",
    }] : []),
    {
      label: "Risque gazon",
      value: formatStatusLabel(risk),
      tone: computeRisqueTone(risk),
      icon: "mdi:shield-alert-outline",
      secondary: "",
      entityKey: "entity_risque",
    },
    {
      label: "Niveau d'action",
      value: formatStatusLabel(action),
      tone: computeActionTone(action),
      icon: "mdi:signal",
      secondary: hydricLevel ? `Hydrique: ${formatStatusLabel(hydricLevel)}` : "",
      entityKey: "entity_niveau",
    },
  ];

  return `
      <section class="gz2-overview" aria-label="Gazon">
        ${renderGz2Hero("Gazon", formatStatusLabel(phase) || "Gazon", gazonHint)}
        <div class="gz2-cards">${renderGz2Cards(card, gazonFacts)}</div>
        ${hasSubPhase ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Progression de la sous-phase</div>
        <div class="gz2-meter">
          <div class="gz2-meter__top"><div class="gz2-meter__value">${escapeHtml(progressLabel)}</div></div>
          <div class="gz2-meter__track" aria-label="${escapeHtml(progressLabel)}"><span class="gz2-meter__fill" style="width:${escapeHtml(String(progressWidth))}%;"></span></div>
          ${progressDetail ? `<div class="gz2-meter__meta">${escapeHtml(progressDetail)}</div>` : ""}
        </div>
        ` : ""}
      </section>
    `;
}

function renderMowingTab(card) {
  const tonte = card._entity("entity_tonte");
  const tonteAutorisee = card._entityState("entity_tonte_autorisee", null);
  const tonteAutoriseeEntity = card._entity("entity_tonte_autorisee");
  const height = card._entity("entity_hauteur");
  const mowerCutHeightValue = card._renderConfigValue("entity_hauteur_coupe_tondeuse", "mm");
  const windowState = card._windowState();
  const mowerState = card._mowerState();
  const mowingBlock = card._mowingBlockState();
  const tonteAttrs = tonte?.attributes || tonteAutoriseeEntity?.attributes || {};
  const gazonPermetTonte = tonteAttrs.gazon_permet_tonte !== undefined ? Boolean(tonteAttrs.gazon_permet_tonte) : tonteAutorisee === "on";
  const machinePermetTonte = tonteAttrs.machine_permet_tonte !== undefined
    ? Boolean(tonteAttrs.machine_permet_tonte)
    : mowerState.present ? mowerState.ready === true : false;
  const actionPossible = tonteAttrs.action_possible !== undefined
    ? Boolean(tonteAttrs.action_possible)
    : gazonPermetTonte && machinePermetTonte;
  // Coordination tondeuse désactivée : la machine n'est pas surveillée. À distinguer
  // d'une vraie indisponibilité (coordination active mais machine non prête).
  const coordinationDisabled = mowerState.coordinationEnabled === false;
  const tonteValue = tonte ? formatStatusLabel(tonte.state) : "Non disponible";
  const heightValue = height ? formatCm(height.state) : "Non disponible";
  const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
  const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
  const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
  const windowSummary = windowState.entity ? windowState.displaySummary || windowState.summary : "Fenêtre optimale non disponible";
  const nextMowing = card._nextMowingState();
  const mowingStatusIcon = card._config?.show_icons ? "mdi:content-cut" : null;
  const mowingDecisionSummary = actionPossible
    ? "Tonte lançable."
    : mowingBlock.blocked
      ? compactDecisionText(mowingBlock.reasonDetail || mowingBlock.detail || mowerState.reason || "Tonte bloquée par conditions.", { maxLength: 132 })
      : mowerState.present
      ? mowerState.reason || "Machine non prête pour une nouvelle tonte."
      : "Tondeuse non disponible.";
  const mowingDecisionPills = [
    {
      label: "Gazon",
      value: tonteAutorisee === "on" ? "Permet la tonte" : "Bloque la tonte",
      tone: tonteAutorisee === "on" ? "success" : "danger",
      icon: "mdi:grass",
    },
    {
      label: "Machine",
      value: coordinationDisabled ? "Coordination désactivée" : machinePermetTonte ? "Prête" : "Non prête",
      tone: coordinationDisabled ? "neutral" : machinePermetTonte ? "success" : mowerState.present ? "danger" : "neutral",
      icon: mowerState.present ? "mdi:robot-mower" : "mdi:robot-mower-off",
    },
    {
      label: "Action",
      value: actionPossible ? "Possible" : "Impossible",
      tone: actionPossible ? "success" : "warning",
      icon: "mdi:check-circle-outline",
    },
  ];
  const mowingSummaryItems = [
    {
      label: "État de tonte",
      value: tonteValue,
      note: mowerState.present ? mowerState.label : "",
      tone: computeTonteTone(tonteValue),
    },
    {
      label: "Machine",
      value: !mowerState.present
        ? "Absente"
        : coordinationDisabled
        ? "Coordination désactivée"
        : machinePermetTonte
        ? "Prête"
        : "Indisponible",
      // Note vide quand la coordination est désactivée : la valeur le dit déjà.
      note: !mowerState.present ? "Tondeuse non disponible" : coordinationDisabled ? "" : mowerState.reason || "",
      tone: !mowerState.present ? "neutral" : coordinationDisabled ? "neutral" : machinePermetTonte ? "success" : "danger",
    },
    {
      label: "Blocage",
      value: mowingBlock.blocked ? mowingBlock.reasonLabel || "Actif" : "Aucun",
      note: mowingBlock.blocked ? compactDecisionText(mowingBlock.reasonDetail || mowingBlock.detail || "", { maxLength: 118 }) : "Aucun frein hydrique ou post-produit.",
      tone: mowingBlock.blocked ? "danger" : "success",
    },
    {
      label: "Fenêtre",
      value: windowSummary,
      note: windowState.reasonSummary || windowState.nextActionDisplay || windowState.nextAction || "",
      tone: windowState.tone,
    },
    {
      label: "Prochaine tonte",
      value: nextMowing.label,
      note: compactDecisionText(nextMowing.detail || "Aucune date de reprise calculée.", { maxLength: 118 }),
      tone: nextMowing.tone,
    },
    {
      label: "Hauteur conseillée",
      value: heightValue,
      note: heightSecondary || "Lecture agronomique stable.",
      tone: card._phaseTone(),
    },
  ];
  if (mowerState.present) {
    mowingSummaryItems.push({
      label: "Batterie tondeuse",
      value: mowerState.battery === null ? "Non disponible" : `${mowerState.battery} %`,
      note: mowerState.nextDeparture || "",
      tone: mowerState.battery === null ? "neutral" : mowerState.battery < 25 ? "danger" : "success",
    });
  }
  if (mowerCutHeightValue.value && mowerCutHeightValue.value !== "Non disponible") {
    mowingSummaryItems.push({
      label: "Hauteur réglée",
      value: mowerCutHeightValue.value,
      note: "Réglage réel de la machine.",
      tone: "accent",
    });
  }

  const mowingCards = mowingSummaryItems.map((item) => ({
    label: item.label,
    value: item.value,
    secondary: item.note,
    tone: item.tone,
    entityKey:
      item.label === "État de tonte" ? "entity_tonte"
        : item.label === "Fenêtre" ? "entity_fenetre_optimale"
          : item.label === "Prochaine tonte" ? "entity_prochaine_tonte"
            : item.label === "Hauteur conseillée" ? "entity_hauteur"
              : item.label === "Hauteur réglée" ? "entity_hauteur_coupe_tondeuse"
                : item.label === "Machine" ? "entity_tonte_autorisee"
                  : null,
  }));

  return `
      <section class="gz2-overview" aria-label="Tonte">
        ${renderGz2Hero("Tonte", tonteValue, mowingDecisionSummary)}
        <div class="gz2-chips">${renderGz2Chips(mowingDecisionPills)}</div>
        <div class="gz2-eyebrow gz2-eyebrow--section">Lecture rapide</div>
        <div class="gz2-cards">${renderGz2Cards(card, mowingCards)}</div>
      </section>
    `;
}

function renderConfigTab(card) {
  const switchState = card._configSwitchState();
  const mowerCoordinationState = card._mowerCoordinationSwitchState();
  const afterApplication = card._entity("entity_arrosage_apres_application_autorise");
  const afterApplicationInfo = card._postApplicationState(afterApplication);
  const tonteAutorisee = card._entityState("entity_tonte_autorisee", null);
  const mode = card._entityState("entity_mode", null);
  const modeTone = phaseTone(mode);
  const heightMin = card._renderConfigValue("entity_hauteur_min_tondeuse", "cm");
  const heightMax = card._renderConfigValue("entity_hauteur_max_tondeuse", "cm");
  const mowingCooldown = card._renderConfigValue("entity_delai_reprise_tonte_apres_arrosage", "min");
  const controlItems = [
    { label: "Irrigation automatique", value: switchState.label, tone: switchState.tone, entityKey: "entity_switch_arrosage_automatique" },
    { label: "Coordination tondeuse", value: mowerCoordinationState.label, tone: mowerCoordinationState.tone, entityKey: "entity_switch_coordination_tondeuse" },
    { label: "Post-application", value: afterApplicationInfo.label, tone: afterApplicationInfo.tone, entityKey: "entity_arrosage_apres_application_autorise" },
    { label: "Gazon permet la tonte", value: formatAuthorizationState(tonteAutorisee), tone: tonteAutorisee === "on" ? "success" : "danger", entityKey: "entity_tonte_autorisee" },
    { label: "Mode du gazon", value: formatApplicationMode(mode), tone: modeTone, entityKey: "entity_mode" },
    { label: "Cooldown tonte après arrosage", value: mowingCooldown.value, tone: mowingCooldown.tone, entityKey: "entity_delai_reprise_tonte_apres_arrosage" },
  ];
  const zoneItems = card._zoneDebitEntries().map((entry) => {
    const config = card._renderConfigValue(entry.key, "mm/h");
    return { label: entry.label, value: config.value, tone: config.tone, entityKey: entry.key };
  });
  const heightItems = [
    { label: "Hauteur min tondeuse", value: heightMin.value, tone: heightMin.tone, entityKey: "entity_hauteur_min_tondeuse" },
    { label: "Hauteur max tondeuse", value: heightMax.value, tone: heightMax.tone, entityKey: "entity_hauteur_max_tondeuse" },
  ];

  return `
      <section class="gz2-overview" aria-label="Réglages">
        ${renderGz2Hero("Réglages", "Autorisations & contrôles", "Touchez une tuile pour ouvrir le contrôle Home Assistant.")}
        <div class="gz2-eyebrow gz2-eyebrow--section">Autorisations & coordination</div>
        <div class="gz2-cards">${renderGz2Cards(card, controlItems)}</div>
        ${zoneItems.length ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Débits des zones</div>
        <div class="gz2-cards">${renderGz2Cards(card, zoneItems)}</div>` : ""}
        <div class="gz2-eyebrow gz2-eyebrow--section">Hauteurs de tondeuse</div>
        <div class="gz2-cards">${renderGz2Cards(card, heightItems)}</div>
      </section>
    `;
}

function renderActiveTab(card) {
  // Isolation par onglet : si le rendu d'un onglet échoue (ex. entité
  // momentanément indisponible), on affiche un repli pour CET onglet au lieu
  // de faire tomber toute la carte. Le reste (header, nav) reste fonctionnel.
  try {
    switch (card._activeTab) {
      case "overview":
        return renderOverviewTab(card);
      case "mowing":
        return renderMowingTab(card);
      case "gazon":
        return renderGazonTab(card);
      case "products":
        return renderProductsTab(card);
      case "intervention":
        return renderInterventionTab(card);
      case "config":
        return renderConfigTab(card);
      case "watering":
      default:
        return renderWateringTab(card);
    }
  } catch (error) {
    console.error("[gazon-intelligent-card] tab render failed", card._activeTab, error);
    return `<section class="gz2-overview" aria-label="Onglet indisponible"><div class="gz2-empty">Cet onglet est momentanément indisponible. Il se rechargera à la prochaine mise à jour.</div></section>`;
  }
}

function renderDecisionLayout(card) {
  return `
      <section class="tabs-layout">
        ${renderTabNav(card)}
        ${renderActiveTab(card)}
        ${
          card._canShowLegacyDetails()
            ? `<section class="decision-advanced">
                ${card._buildDecisionBlocks()}
                ${card._buildContent()}
                ${card._buildFooter()}
              </section>`
            : ""
        }
      </section>
    `;
}



const ENTITY_FIELD_DOMAINS = {
  entity_weather: ["weather"],
  ...Object.fromEntries(
    ENTITY_KEYS.map((field) => [field.key, field.domain || null]),
  ),
};

const ACTION_OPTIONS = [
  { value: "none", label: "Aucune action" },
  { value: "more-info", label: "More-info" },
  { value: "toggle", label: "Basculer" },
  { value: "perform-action", label: "Exécuter une action" },
  { value: "navigate", label: "Naviguer" },
  { value: "url", label: "Ouvrir une URL" },
  { value: "assist", label: "Assist" },
];

class GazonIntelligentCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._handleInput = this._handleInput.bind(this);
  }

  setConfig(config) {
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, config || {}));
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  connectedCallback() {
    this._render();
  }

  getStubConfig() {
    return createStubConfig();
  }

  _entityOptions(domainFilter = null) {
    return Object.entries(this._hass?.states || {})
      .map(([entityId, stateObj]) => ({ entity_id: entityId, stateObj }))
      .filter(({ stateObj }) => {
        if (!domainFilter) {
          return true;
        }
        return domainMatches(stateObj, domainFilter);
      })
      .sort((a, b) => a.entity_id.localeCompare(b.entity_id));
  }

  _getConfigValue(key) {
    return String(key || "")
      .split(".")
      .filter(Boolean)
      .reduce((value, segment) => value?.[segment], this._config);
  }

  _cloneBranch(value) {
    if (Array.isArray(value)) {
      return [...value];
    }
    if (value && typeof value === "object") {
      return { ...value };
    }
    return {};
  }

  _pruneEmptyObjects(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value && typeof value === "object") {
      const next = {};
      Object.entries(value).forEach(([key, child]) => {
        const prunedChild = this._pruneEmptyObjects(child);
        if (prunedChild !== undefined) {
          next[key] = prunedChild;
        }
      });
      return Object.keys(next).length ? next : undefined;
    }
    return value === undefined ? undefined : value;
  }

  _setConfigValue(config, key, value) {
    const path = String(key || "").split(".").filter(Boolean);
    if (!path.length) {
      return config;
    }
    const next = { ...config };
    let cursor = next;
    let sourceCursor = config;
    for (let index = 0; index < path.length - 1; index += 1) {
      const segment = path[index];
      const sourceValue = sourceCursor?.[segment];
      cursor[segment] = this._cloneBranch(sourceValue);
      cursor = cursor[segment];
      sourceCursor = sourceValue;
    }
    const leaf = path[path.length - 1];
    if (value === undefined) {
      delete cursor[leaf];
    } else {
      cursor[leaf] = value;
    }
    return this._pruneEmptyObjects(next) || {};
  }

  _handleInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const key = target.dataset.configKey;
    if (!key || !this._config) {
      return;
    }

    let value;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      value = target.value === "" ? "" : Number(target.value);
    } else {
      value = target.value;
    }

    const shouldDelete = value === "" && !["title"].includes(key);
    const next = this._setConfigValue(this._config, key, shouldDelete ? undefined : value);
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, next));
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _bindInputs() {
    this.shadowRoot.querySelectorAll("[data-config-key]").forEach((element) => {
      element.removeEventListener("input", this._handleInput);
      element.removeEventListener("change", this._handleInput);
      element.addEventListener("input", this._handleInput);
      element.addEventListener("change", this._handleInput);
    });
  }

  _renderCheckbox(field, label) {
    const checked = Boolean(this._getConfigValue(field));
    return `
      <label class="field field--checkbox">
        <input data-config-key="${escapeHtml(field)}" type="checkbox" ${checked ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }

  _renderTextInput(field, label, placeholder = "") {
    const value = this._getConfigValue(field) ?? "";
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
        />
      </label>
    `;
  }

  _renderNumberInput(field, label, min = 0) {
    const value = this._getConfigValue(field);
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="number"
          min="${escapeHtml(String(min))}"
          step="1"
          value="${escapeHtml(value ?? "")}"
        />
      </label>
    `;
  }

  _renderSelect(field, label, options) {
    const value = String(this._getConfigValue(field) ?? "");
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <select data-config-key="${escapeHtml(field)}">
          ${options
            .map(
              (option) => `
                <option value="${escapeHtml(option.value)}" ${option.value === value ? "selected" : ""}>
                  ${escapeHtml(option.label)}
                </option>
              `,
            )
            .join("")}
        </select>
      </label>
    `;
  }

  _renderEntityInput(field, label, placeholder = "sensor.gazon_intelligent_...", domainFilter = undefined, hint = "") {
    const value = this._getConfigValue(field) ?? "";
    const domains = domainFilter === undefined ? ENTITY_FIELD_DOMAINS[field] || null : domainFilter;
    const listId = `gazon-intelligent-card-entities-${field.replaceAll(".", "-")}`;
    const options = this._entityOptions(domains)
      .map(({ entity_id }) => `<option value="${escapeHtml(entity_id)}"></option>`)
      .join("");
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          list="${escapeHtml(listId)}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
        />
        <datalist id="${escapeHtml(listId)}">${options}</datalist>
        ${hint ? `<small class="hint">${escapeHtml(hint)}</small>` : ""}
      </label>
    `;
  }

  _renderActionEditor(actionKey, title) {
    const actionType = String(this._getConfigValue(`${actionKey}.action`) || DEFAULT_CONFIG[actionKey]?.action || "none");
    const rows = [
      this._renderSelect(`${actionKey}.action`, title, ACTION_OPTIONS),
      this._renderEntityInput(`${actionKey}.entity`, "Entité", "sensor.exemple", null),
    ];

    if (actionType === "perform-action") {
      rows.push(this._renderTextInput(`${actionKey}.perform_action`, "Action Home Assistant", "light.turn_on"));
    }
    if (actionType === "navigate") {
      rows.push(this._renderTextInput(`${actionKey}.navigation_path`, "Chemin de navigation", "/lovelace/gazon"));
    }
    if (actionType === "url") {
      rows.push(this._renderTextInput(`${actionKey}.url_path`, "URL", "https://www.home-assistant.io"));
    }
    if (actionType === "assist") {
      rows.push(this._renderTextInput(`${actionKey}.pipeline_id`, "Pipeline Assist", "preferred"));
      rows.push(this._renderCheckbox(`${actionKey}.start_listening`, "Démarrer l'écoute"));
    }

    return `
      <div class="section section--sub">
        <h3>${escapeHtml(title)}</h3>
        <div class="grid">
          ${rows.join("")}
        </div>
      </div>
    `;
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }
    if (!this._config) {
      this.shadowRoot.innerHTML = `<div class="editor empty">Chargement de l'éditeur…</div>`;
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
${EDITOR_STYLES}
      </style>

      <div class="editor">
        <section class="section">
          <h3>Carte</h3>
          <div class="grid">
            ${this._renderTextInput("title", "Titre", "Gazon Intelligent")}
            ${this._renderSelect("background_style", "Mode de fond", [
              { value: "solid", label: "solid" },
              { value: "glass", label: "glass" },
              { value: "minimal", label: "minimal" },
            ])}
            ${this._renderTextInput("accent_color", "Couleur d'accent", "var(--primary-color)")}
            ${this._renderSelect("theme_mode", "Mode thème", [
              { value: "auto", label: "auto" },
              { value: "light", label: "light" },
              { value: "dark", label: "dark" },
            ])}
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_header", "Afficher l'en-tête")}
            ${this._renderCheckbox("show_icons", "Afficher les icônes")}
            ${this._renderCheckbox("show_background", "Afficher le fond")}
            ${this._renderCheckbox("minimal_mode", "Mode minimal")}
            ${this._renderCheckbox("show_secondary_info", "Afficher les infos secondaires")}
            ${this._renderCheckbox("show_advanced_details", "Afficher les détails avancés")}
          </div>
          <div class="row">
            ${this._renderNumberInput("icon_size", "Taille des icônes (px)", 16)}
            ${this._renderNumberInput("border_radius", "Rayon des bords (px)", 0)}
          </div>
          <div class="row">
            ${this._renderTextInput("manual_action_service", "Service du bouton manuel", "gazon_intelligent.start_manual_irrigation")}
            ${this._renderTextInput("manual_action_label", "Libellé du bouton manuel", "Irrigation manuelle")}
          </div>
          <div class="hint">L’éditeur filtre les entités par domaine quand la carte connaît le type attendu.</div>
        </section>

        <section class="section">
          <h3>Actions de la carte</h3>
          <p>Ces actions s’appliquent au fond de la carte, hors boutons internes et sélecteurs dédiés.</p>
          ${this._renderActionEditor("tap_action", "Tap")}
          ${this._renderActionEditor("hold_action", "Hold")}
          ${this._renderActionEditor("double_tap_action", "Double tap")}
        </section>

        <section class="section">
          <h3>Synthèse et irrigation</h3>
          <p>Ces entités alimentent la synthèse principale et l'onglet Irrigation.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_assistant", "Assistant")}
            ${this._renderEntityInput("entity_fenetre_optimale", "Fenêtre optimale")}
            ${this._renderEntityInput("entity_weather", "Météo")}
            ${this._renderEntityInput("entity_plan_arrosage", "Plan d'irrigation")}
            ${this._renderEntityInput("entity_objectif_arrosage", "Objectif d'irrigation")}
            ${this._renderEntityInput("entity_niveau_pertinence", "Niveau de pertinence")}
            ${this._renderEntityInput("entity_prochaine_fenetre_optimale", "Prochaine fenêtre optimale")}
            ${this._renderEntityInput("entity_prochain_blocage_attendu", "Prochain blocage attendu")}
            ${this._renderEntityInput("entity_arrosage_recommande", "Irrigation")}
            ${this._renderEntityInput("entity_arrosage_apres_application_autorise", "Post-application")}
            ${this._renderEntityInput("entity_signal_irrigation", "Signal irrigation")}
            ${this._renderEntityInput("entity_prochain_arrosage", "Prochain arrosage")}
            ${this._renderEntityInput("entity_dernier_arrosage", "Dernier arrosage")}
            ${this._renderEntityInput("entity_dernier_arrosage_total_zones", "Arrosage cumulé")}
            ${this._renderEntityInput("entity_niveau", "Niveau d'action")}
          </div>
        </section>

        <section class="section">
          <h3>Référentiel produit</h3>
          <p>Ces entités séparent la recommandation, le catalogue et l’historique local. Pour le produit courant, branche l’entité Home Assistant visible comme “Produit sélectionné”.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_catalogue_produits", "Référentiel produits")}
            ${this._renderEntityInput(
              "entity_produit_intervention",
              "Produit sélectionné",
              "select.gazon_intelligent_produit_d_intervention",
              undefined,
              "Entité attendue dans Home Assistant: Produit sélectionné (select.gazon_intelligent_produit_d_intervention).",
            )}
            ${this._renderEntityInput("entity_prochaine_intervention", "Prochaine intervention")}
            ${this._renderEntityInput("entity_derniere_application", "Dernière intervention")}
            ${this._renderEntityInput("entity_signal_intervention", "Signal intervention")}
          </div>
        </section>

        <section class="section">
          <h3>Gazon et tonte</h3>
          <p>Ces entités alimentent les onglets Gazon et Tonte.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_mode", "Mode du gazon")}
            ${this._renderEntityInput("entity_type_arrosage", "Profil d'irrigation")}
            ${this._renderEntityInput("entity_phase", "Phase dominante")}
            ${this._renderEntityInput("entity_sous_phase", "Sous-phase")}
            ${this._renderEntityInput("entity_risque", "Risque gazon")}
            ${this._renderEntityInput("entity_tonte", "État de tonte")}
            ${this._renderEntityInput("entity_tonte_autorisee", "Gazon permet la tonte")}
            ${this._renderEntityInput("entity_prochaine_tonte", "Prochaine tonte")}
            ${this._renderEntityInput("entity_hauteur", "Hauteur de tonte conseillée")}
            ${this._renderEntityInput("entity_hauteur_coupe_tondeuse", "Hauteur coupe tondeuse")}
          </div>
        </section>

        <section class="section">
          <h3>Réglages</h3>
          <p>Ces entités alimentent l'onglet Réglages pour l'autorisation, la coordination tondeuse, les débits et les hauteurs.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_switch_arrosage_automatique", "Irrigation automatique")}
            ${this._renderEntityInput("entity_switch_coordination_tondeuse", "Coordination tondeuse")}
            ${this._renderEntityInput("entity_delai_reprise_tonte_apres_arrosage", "Cooldown tonte après arrosage")}
            ${this._renderEntityInput("entity_debit_zone_1", "Débit zone 1")}
            ${this._renderEntityInput("entity_debit_zone_2", "Débit zone 2")}
            ${this._renderEntityInput("entity_debit_zone_3", "Débit zone 3")}
            ${this._renderEntityInput("entity_debit_zone_4", "Débit zone 4")}
            ${this._renderEntityInput("entity_debit_zone_5", "Débit zone 5")}
            ${this._renderEntityInput("entity_hauteur_min_tondeuse", "Hauteur min tondeuse")}
            ${this._renderEntityInput("entity_hauteur_max_tondeuse", "Hauteur max tondeuse")}
          </div>
        </section>

        <section class="section">
          <h3>Détails avancés</h3>
          <p>Ces champs alimentent les vues détaillées et les écrans de diagnostic.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_conseil", "Conseil principal")}
            ${this._renderEntityInput("entity_action", "Action recommandée")}
            ${this._renderEntityInput("entity_avoid", "Action à éviter")}
            ${this._renderEntityInput("entity_derniere_action_utilisateur", "Dernière exécution")}
            ${this._renderEntityInput("entity_debug_intervention", "Debug métier")}
            ${this._renderEntityInput("entity_arrosage_en_cours", "Irrigation en cours")}
            ${this._renderEntityInput("entity_etat_hydrique", "État hydrique")}
            ${this._renderEntityInput("entity_reserve_actuelle", "Réserve actuelle")}
            ${this._renderEntityInput("entity_depletion_ratio", "Déplétion")}
            ${this._renderEntityInput("entity_et0", "ET0")}
            ${this._renderEntityInput("entity_etc", "ETc")}
            ${this._renderEntityInput("entity_objectif_legacy", "Objectif legacy")}
            ${this._renderEntityInput("entity_objectif_depletion", "Objectif déplétion")}
          </div>
        </section>
      </div>
    `;

    this._bindInputs();
  }
}

if (!customElements.get(`${CARD_TYPE}-editor`)) {
  customElements.define(`${CARD_TYPE}-editor`, GazonIntelligentCardEditor);
}

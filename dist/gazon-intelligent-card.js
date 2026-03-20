const CARD_STYLES = String.raw`
        :host {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          --gi-motion-fast: 180ms;
          --gi-motion-medium: 260ms;
          --gi-ease-standard: cubic-bezier(0.2, 0, 0, 1);
          --gi-ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
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

        .decision-layout {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
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

        .tabs-layout {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
        }

        .gi-card,
        .gi-panel,
        .gi-tab,
        .gi-tile,
        .gi-primary-action,
        .gi-progress__bar,
        .gi-status-pill {
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
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          flex: none;
          flex-shrink: 0;
          line-height: 0;
          overflow: hidden;
        }

        .gi-icon--sm {
          width: 20px;
          height: 20px;
        }

        .gi-icon--pill {
          width: 18px;
          height: 18px;
          overflow: visible;
        }

        .gi-icon ha-icon,
        .gi-icon svg {
          display: block;
          width: 18px;
          height: 18px;
          transform: translateY(-0.5px);
        }

        .gi-icon--sm ha-icon,
        .gi-icon--sm svg {
          width: 14px;
          height: 14px;
          transform: translateY(-0.5px);
        }

        .gi-icon--pill ha-icon,
        .gi-icon--pill svg {
          width: 14px;
          height: 14px;
          transform: none;
        }

        .gi-tabs,
        .tab-nav,
        .section-nav {
          display: flex;
          gap: 6px;
          flex-wrap: nowrap;
          overflow-x: auto;
          max-width: 100%;
          scrollbar-width: none;
          padding-bottom: 2px;
          scroll-snap-type: x proximity;
        }

        .gi-tabs::-webkit-scrollbar,
        .tab-nav::-webkit-scrollbar,
        .section-nav::-webkit-scrollbar {
          display: none;
        }

        .gi-tab,
        .tab-nav__item,
        .section-nav__item {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          border: 1px solid color-mix(in srgb, var(--gazon-card-tone-color) 18%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-tone-color) 8%, var(--secondary-background-color)) 0%, var(--secondary-background-color) 100%);
          color: var(--secondary-text-color);
          border-radius: 12px;
          padding: 7px 10px;
          font-size: 0.78rem;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
          scroll-snap-align: start;
        }

        .gi-tab:hover,
        .tab-nav__item:hover,
        .section-nav__item:hover {
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--secondary-background-color) 78%, var(--gazon-section-accent) 22%);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 34%, var(--divider-color));
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.09);
        }

        .gi-tab .gi-icon,
        .tab-nav__item .gi-icon,
        .section-nav__item .gi-icon {
          width: 20px;
          height: 20px;
        }

        .gi-tab--active,
        .tab-nav__item--active,
        .section-nav__item--active {
          color: var(--primary-text-color);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 14%, transparent) 0%, transparent 100%),
            var(--secondary-background-color);
          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transform: translateY(-1px);
        }

        .tab-panel,
        .gi-panel {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: gi-fade-up var(--gi-motion-fast) var(--gi-ease-soft);
          will-change: transform, opacity;
        }

        .tab-panel__hero,
        .tab-panel__section,
        .tab-panel__block,
        .tab-panel__action {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(127, 127, 127, 0.15);
          border-radius: 18px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 8%, transparent) 0%, transparent 100%),
          color-mix(in srgb, var(--secondary-background-color) 92%, white);
          padding: 12px 14px;
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .tab-panel__hero {
          gap: 7px;
          border-color: color-mix(in srgb, var(--gazon-card-accent) 24%, var(--divider-color));
        }

        .tab-panel__hero--pulse,
        .tab-panel__action--pulse {
          animation: gazonPulseSoft 2.8s ease-in-out infinite;
        }

        .tab-panel__hero-top,
        .tab-panel__header,
        .tab-panel__section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }

        .tab-panel__hero-summary,
        .tab-panel__title,
        .tab-panel__section-summary,
        .tab-panel__action-title,
        .tab-panel__block-value {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .tab-panel__hero-summary {
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 800;
          line-height: 1.22;
        }

        .tab-panel__hero-status,
        .tab-panel__status,
        .gi-pill,
        .gi-status-pill {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          min-height: 28px;
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 700;
          white-space: nowrap;
          background: color-mix(in srgb, var(--gazon-card-accent) 14%, transparent);
          color: var(--primary-text-color);
        }

        .tab-panel__hero-status .gi-icon--pill,
        .tab-panel__status .gi-icon--pill,
        .gi-pill .gi-icon--pill,
        .gi-status-pill .gi-icon--pill {
          width: 18px;
          height: 18px;
        }

        .tab-panel__hero-status--danger,
        .tab-panel__status--danger {
          background: color-mix(in srgb, var(--gazon-danger-color) 14%, transparent);
        }

        .tab-panel__hero-status--critical,
        .tab-panel__status--critical {
          background: color-mix(in srgb, var(--gazon-critical-color) 18%, transparent);
        }

        .tab-panel__hero-status--warning,
        .tab-panel__status--warning {
          background: color-mix(in srgb, var(--gazon-warning-color) 16%, transparent);
        }

        .tab-panel__hero-status--success,
        .tab-panel__status--success {
          background: color-mix(in srgb, var(--gazon-success-color) 16%, transparent);
        }

        .tab-panel__hero-status--neutral,
        .tab-panel__status--neutral {
          background: color-mix(in srgb, var(--gazon-neutral-color) 12%, transparent);
        }

        .tab-panel__hero-next,
        .tab-panel__hero-hint,
        .tab-panel__block-hint,
        .tab-panel__section-meta,
        .tab-panel__section-title,
        .tab-panel__eyebrow,
        .tab-panel__action-subtitle,
        .tab-panel__stat-secondary,
        .tab-panel__empty {
          color: var(--secondary-text-color);
        }

        .tab-panel__hero-next,
        .tab-panel__hero-hint,
        .tab-panel__block-hint,
        .tab-panel__action-subtitle,
        .tab-panel__stat-secondary,
        .tab-panel__empty {
          font-size: 0.82rem;
          line-height: 1.22;
        }

        .tab-panel__section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-color: color-mix(in srgb, var(--gazon-card-accent) 18%, var(--divider-color));
        }

        .tab-panel__section-title {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .tab-panel__section-summary {
          font-size: 0.94rem;
          font-weight: 700;
          line-height: 1.28;
        }

        .tab-panel__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          align-items: stretch;
          grid-auto-rows: 1fr;
          align-content: start;
        }

        .tab-panel__grid--config {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        .tab-panel__grid--config-top,
        .tab-panel__grid--config-debits {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-rows: 1fr;
          align-content: start;
        }

        .tab-panel__grid--config-top {
          gap: 10px;
        }

        .tab-panel__grid--config-debits {
          gap: 10px;
        }

        .tab-panel__section--config-debits {
          gap: 10px;
        }

        .tab-panel__chips {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          align-content: flex-start;
          gap: 8px;
          margin-top: 2px;
        }

        .tab-stat {
          display: flex;
          align-items: stretch;
          gap: 8px;
          border-radius: 14px;
          padding: 12px 14px;
          min-height: 72px;
          height: 100%;
          border: 1px solid rgba(127, 127, 127, 0.15);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 92%, white) 0%, var(--secondary-background-color) 100%);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .tab-stat--danger { border-color: color-mix(in srgb, var(--gazon-danger-color) 22%, transparent); }
        .tab-stat--critical { border-color: color-mix(in srgb, var(--gazon-critical-color) 26%, transparent); }
        .tab-stat--warning { border-color: color-mix(in srgb, var(--gazon-warning-color) 22%, transparent); }
        .tab-stat--success { border-color: color-mix(in srgb, var(--gazon-success-color) 22%, transparent); }
        .tab-stat--accent { border-color: color-mix(in srgb, var(--gazon-accent-tone-color) 22%, transparent); }
        .tab-stat--neutral { border-color: rgba(127, 127, 127, 0.15); }

        .tab-stat__main {
          display: flex;
          gap: 8px;
          align-items: center;
          min-width: 0;
          width: 100%;
          height: 100%;
        }

        .tab-stat__icon {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          color: var(--gazon-section-accent);
        }

        .tab-stat__icon .gi-icon {
          width: 20px;
          height: 20px;
        }

        .tab-stat__content {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1px;
        }

        .tab-stat__main,
        .tile,
        .metric {
          align-items: center;
        }

        .tab-stat__label {
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          margin-bottom: 1px;
          line-height: 1.1;
        }

        .tab-stat__value {
          font-size: 0.82rem;
          line-height: 1.12;
          font-weight: 700;
          overflow-wrap: anywhere;
          hyphens: auto;
        }

        .tab-progress {
          display: flex;
          flex-direction: column;
          gap: 6px;
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
          background: linear-gradient(90deg, color-mix(in srgb, var(--gazon-section-accent) 80%, white), var(--gazon-section-accent));
          transition:
            width var(--gi-motion-medium) var(--gi-ease-soft),
            background var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
          box-shadow: 0 0 12px color-mix(in srgb, var(--gazon-section-accent) 22%, transparent);
        }

        .gi-progress__bar--critical {
          background: linear-gradient(90deg, color-mix(in srgb, #ff5a5f 70%, white), #ff5a5f);
          box-shadow: 0 0 12px rgba(255, 90, 95, 0.28);
        }

        .tab-progress__meta {
          font-size: 0.72rem;
          color: var(--secondary-text-color);
        }

        .tab-panel__action {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-height: 84px;
          border: 2px solid color-mix(in srgb, var(--gazon-card-accent) 34%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 16%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, white) 100%);
          box-shadow:
            0 18px 36px rgba(0, 0, 0, 0.16),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent);
          padding: 16px 18px;
          border-radius: 22px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 900;
          text-align: left;
          position: relative;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .tab-panel__action-content {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .tab-panel__action-title {
          font-size: 1.04rem;
          font-weight: 900;
          line-height: 1.16;
        }

        .tab-panel__action-subtitle {
          color: color-mix(in srgb, white 86%, transparent);
          font-size: 0.84rem;
          line-height: 1.24;
        }

        .gi-action--primary,
        .gi-primary-action,
        .tab-panel__action-button,
        .decision-action__button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 2px solid color-mix(in srgb, var(--gazon-card-accent) 82%, var(--divider-color));
          border-radius: 18px;
          padding: 18px 24px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 900;
          font-size: 1.04rem;
          letter-spacing: 0.01em;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 100%, white) 0%, color-mix(in srgb, var(--gazon-card-accent) 62%, #000) 100%);
          box-shadow:
            0 26px 50px color-mix(in srgb, var(--gazon-card-accent) 46%, rgba(0, 0, 0, 0.24)),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 38%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.24);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
        }

        .tab-panel__action.gi-action--primary,
        .tab-panel__action.gi-primary-action {
          justify-content: flex-start;
          align-items: center;
          padding-inline: 18px 20px;
          padding-block: 16px;
          gap: 12px;
          min-height: 86px;
          border-radius: 20px;
        }

        .tab-panel__action.gi-action--primary::after,
        .tab-panel__action.gi-primary-action::after {
          content: "›";
          margin-left: auto;
          font-size: 2rem;
          line-height: 1;
          opacity: 0.94;
          transform: translateY(-1px);
          flex: none;
        }

        .tab-panel__action-button {
          width: 100%;
          min-height: 66px;
          justify-content: flex-start;
          align-self: stretch;
          text-align: left;
          position: relative;
          padding-inline: 20px 48px;
        }

        .tab-panel__action-button::after {
          content: "›";
          margin-left: auto;
          font-size: 1.9rem;
          line-height: 1;
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .gi-action--primary .gi-icon,
        .gi-primary-action .gi-icon,
        .tab-panel__action-button .gi-icon,
        .decision-action__button .gi-icon {
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
        }

        .tab-panel__action.gi-action--primary .gi-icon,
        .tab-panel__action.gi-primary-action .gi-icon {
          width: 26px;
          height: 26px;
          background: rgba(255, 255, 255, 0.2);
        }

        @media (hover: hover) {
          .gi-action--primary:hover,
          .gi-primary-action:hover,
          .tab-panel__action:hover,
          .tab-panel__action-button:hover,
          .decision-action__button:hover {
            transform: translateY(-1px);
            border-color: color-mix(in srgb, var(--gazon-card-accent) 52%, var(--divider-color));
            box-shadow:
              0 14px 28px rgba(0, 0, 0, 0.22),
              0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent);
          }
        }

        .tab-panel__action:hover {
          box-shadow:
            0 22px 42px rgba(0, 0, 0, 0.22),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 22%, transparent);
        }

        .gi-primary-action--active {
          box-shadow:
            0 22px 46px rgba(0, 0, 0, 0.28),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 40%, transparent),
            0 0 34px color-mix(in srgb, var(--gazon-card-accent) 30%, transparent);
        }

        .gi-action {
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .gi-action .gi-icon {
          width: 20px;
          height: 20px;
        }

        .gi-action--primary .gi-icon,
        .gi-primary-action .gi-icon {
          width: 22px;
          height: 22px;
        }

        .gi-info {
          border: 1px solid rgba(127, 127, 127, 0.045);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 100%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 99%, white) 100%);
          box-shadow: none;
        }

        .gi-info--main {
          border-color: color-mix(in srgb, var(--gazon-card-accent) 5%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 1.5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 99%, white) 100%);
        }

        .gi-info--secondary {
          border-color: rgba(127, 127, 127, 0.04);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 100%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
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
        .decision-action,
        .decision-plan,
        .decision-context,
        .decision-block,
        .decision-footer {
          border: 1px solid rgba(127, 127, 127, 0.15);
          border-radius: 18px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 8%, transparent) 0%, transparent 100%),
            color-mix(in srgb, var(--secondary-background-color) 92%, white);
          padding: 12px 14px;
        }

        .decision-hero {
          display: flex;
          flex-direction: column;
          gap: 7px;
          border-color: color-mix(in srgb, var(--gazon-card-accent) 24%, var(--divider-color));
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
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 800;
          line-height: 1.22;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .decision-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border-radius: 999px;
          font-size: 0.76rem;
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
          font-size: 0.86rem;
          line-height: 1.22;
        }

        .decision-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-color: color-mix(in srgb, var(--gazon-card-accent) 28%, var(--divider-color));
        }

        .decision-action--pulse {
          animation: gazonPulseSoft 3s ease-in-out infinite;
        }

        .decision-action__content {
          min-width: 0;
        }

        .decision-action__label,
        .decision-plan__label,
        .decision-context__label,
        .decision-block__label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .decision-action__title {
          font-size: 1rem;
          font-weight: 800;
          line-height: 1.24;
        }

        .decision-action__subtitle {
          margin-top: 2px;
          color: var(--secondary-text-color);
          font-size: 0.82rem;
          line-height: 1.3;
        }

        .decision-action__button {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 0;
          border-radius: 16px;
          padding: 11px 14px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 800;
          background: linear-gradient(145deg, color-mix(in srgb, var(--gazon-card-accent) 88%, white), var(--gazon-card-accent));
          box-shadow:
            0 10px 24px color-mix(in srgb, var(--gazon-card-accent) 25%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .decision-action__button .gi-icon {
          width: 18px;
          height: 18px;
        }

        .decision-plan {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-color: color-mix(in srgb, var(--gazon-card-accent) 18%, var(--divider-color));
        }

        .decision-plan__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }

        .decision-plan__meta {
          font-size: 0.76rem;
          color: var(--secondary-text-color);
          white-space: nowrap;
        }

        .decision-plan__summary {
          font-size: 0.94rem;
          font-weight: 700;
          line-height: 1.28;
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

        .gi-pill,
        .pill,
        .context-pill {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          min-height: 28px;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1px solid rgba(127, 127, 127, 0.15);
          background: rgba(127, 127, 127, 0.04);
          min-width: 0;
        }

        .gi-pill .gi-icon--pill,
        .gi-status-pill .gi-icon--pill,
        .pill .gi-icon--pill,
        .context-pill .gi-icon--pill {
          width: 18px;
          height: 18px;
          flex: none;
          overflow: visible;
          color: var(--gazon-card-accent);
        }

        .gi-pill .gi-icon,
        .gi-status-pill .gi-icon,
        .pill .gi-icon,
        .context-pill .gi-icon {
          flex: none;
        }

        .gi-status-pill {
          gap: 8px;
        }

        .pill__label,
        .context-pill__label {
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          line-height: 1.1;
        }

        .pill__value,
        .context-pill__value {
          font-size: 0.8rem;
          font-weight: 700;
          line-height: 1.12;
          overflow-wrap: anywhere;
        }

        .pill--danger,
        .context-pill--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 22%, transparent);
        }

        .pill--critical,
        .context-pill--critical {
          border-color: color-mix(in srgb, var(--gazon-critical-color) 26%, transparent);
        }

        .pill--warning,
        .context-pill--warning {
          border-color: color-mix(in srgb, var(--gazon-warning-color) 22%, transparent);
        }

        .pill--success,
        .context-pill--success {
          border-color: color-mix(in srgb, var(--gazon-success-color) 22%, transparent);
        }

        .pill--accent,
        .context-pill--accent {
          border-color: color-mix(in srgb, var(--gazon-accent-tone-color) 22%, transparent);
        }

        .decision-context {
          display: flex;
          flex-direction: column;
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
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        .decision-block__hint {
          color: var(--secondary-text-color);
          font-size: 0.82rem;
          line-height: 1.22;
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
          gap: 8px;
          margin-top: 2px;
        }

        * {
          box-sizing: border-box;
        }

        .card {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: var(--gazon-card-height);
          border-radius: var(--gazon-border-radius);
          color: var(--primary-text-color);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-card-tone-color) 14%, transparent) 0%, transparent 38%),
            radial-gradient(circle at bottom left, color-mix(in srgb, var(--gazon-card-tone-color) 8%, transparent) 0%, transparent 34%),
            var(--card-background-color, var(--ha-card-background, transparent));
          border: 1px solid color-mix(in srgb, var(--gazon-card-tone-color) 18%, var(--divider-color));
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.10),
            0 1px 0 rgba(255, 255, 255, 0.04) inset,
            var(--ha-card-box-shadow, none);
          overflow: hidden;
          padding: var(--gazon-card-padding);
          position: relative;
          isolation: isolate;
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
          background: linear-gradient(90deg, transparent 0%, var(--gazon-card-tone-color) 15%, var(--gazon-card-tone-color) 85%, transparent 100%);
          opacity: 0.95;
          z-index: 0;
        }

        .card--gradient::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 140px;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            transparent 0%,
            color-mix(in srgb, var(--gazon-card-tone-color) 10%, transparent) 100%
          );
          opacity: 0.8;
          z-index: 0;
        }

        .card--solid {
          background: var(--card-background-color, var(--ha-card-background, transparent));
        }

        .card--glass {
          backdrop-filter: blur(12px);
          background: color-mix(in srgb, var(--card-background-color, #1f1f1f) 82%, transparent);
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
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
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
        .section-nav__item,
        .gi-tab,
        .tab-nav__item,
        .gi-info,
        .gi-tile,
        .gi-status-pill,
        .gi-panel,
        .gi-primary-action,
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
          .section-nav__item:hover,
          .gi-tab:hover,
          .tab-nav__item:hover,
          .gi-primary-action:hover,
          .tab-panel__action-button:hover,
          .decision-action__button:hover {
            transform: translateY(-1px);
          }
        }

        .header__title-wrap {
          display: flex;
          gap: 10px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }

        .header__icon {
          width: calc(var(--gazon-icon-size) * 1.55);
          height: calc(var(--gazon-icon-size) * 1.55);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: linear-gradient(145deg, color-mix(in srgb, var(--gazon-card-tone-color) 86%, white), var(--gazon-card-tone-color));
          box-shadow:
            0 10px 24px color-mix(in srgb, var(--gazon-card-tone-color) 28%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.22);
          flex: none;
        }

        .header__icon--warning { background: var(--gazon-warning-color, #7e9a3c); }
        .header__icon--danger { background: var(--gazon-danger-color, #c62828); }
        .header__icon--success { background: var(--gazon-success-color, #4f8f3a); }
        .header__icon--neutral { background: var(--gazon-neutral-color, #607d8b); }
        .header__icon--accent { background: var(--gazon-accent-tone-color, #2b8c7c); }
        .header__icon--critical { background: var(--gazon-critical-color, #ff1744); }

        .header__icon .gi-icon {
          width: 18px;
          height: 18px;
        }

        .header__titles {
          min-width: 0;
        }

        .header__title {
          font-size: 1.02rem;
          font-weight: 700;
          line-height: 1.18;
          margin-bottom: 2px;
        }

        .header__subtitle {
          color: var(--secondary-text-color);
          font-size: 0.76rem;
          line-height: 1.2;
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
          display: flex;
          flex-wrap: wrap;
          min-width: 0;
          gap: 8px;
          align-items: stretch;
          margin: 2px 0 6px;
        }

        .hero__lead {
          min-width: 0;
          border-radius: 16px;
          padding: 11px 12px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 22%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 12%, transparent) 0%, transparent 100%),
            color-mix(in srgb, var(--secondary-background-color) 84%, transparent);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1 1 260px;
        }

        .hero__lead-icon {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
          color: var(--gazon-section-accent);
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
        }

        .hero__lead-icon .gi-icon {
          width: 18px;
          height: 18px;
        }

        .hero__label {
          font-size: 0.63rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .hero__value {
          font-size: clamp(0.9rem, 1.3vw, 1.02rem);
          font-weight: 700;
          line-height: 1.22;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hero__lead--danger {
          color: var(--gazon-danger-color, #c62828);
        }

        .hero__metrics {
          display: flex;
          flex-wrap: wrap;
          min-width: 0;
          gap: 6px;
          align-content: start;
        }

        .metric {
          display: flex;
          gap: 8px;
          align-items: center;
          min-width: 0;
          border-radius: 14px;
          padding: 9px 10px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 92%, white) 0%, var(--secondary-background-color) 100%);
          border: 1px solid rgba(127, 127, 127, 0.15);
          box-shadow: none;
          min-height: 0;
          flex: 1 1 110px;
        }

        .metric__icon {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          color: var(--gazon-section-accent);
        }

        .metric__icon .gi-icon {
          width: 20px;
          height: 20px;
        }

        .metric__content {
          min-width: 0;
        }

        .metric__label {
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          margin-bottom: 1px;
          line-height: 1.1;
        }

        .metric__value {
          font-size: 0.8rem;
          font-weight: 700;
          line-height: 1.12;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
        }

        .hero__metrics .metric--danger { border-color: color-mix(in srgb, var(--gazon-danger-color) 20%, transparent); }
        .hero__metrics .metric--warning { border-color: color-mix(in srgb, var(--gazon-warning-color) 20%, transparent); }
        .hero__metrics .metric--success { border-color: color-mix(in srgb, var(--gazon-success-color) 20%, transparent); }
        .hero__metrics .metric--accent { border-color: color-mix(in srgb, var(--gazon-accent-tone-color) 20%, transparent); }

        .section-nav {
          display: flex;
          gap: 5px;
          flex-wrap: nowrap;
          overflow-x: auto;
          max-width: 100%;
          scrollbar-width: none;
          margin: 4px 0 8px;
          padding-bottom: 2px;
          scroll-snap-type: x proximity;
        }

        .section-nav::-webkit-scrollbar {
          display: none;
        }

        .section-nav__item {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          border: 1px solid rgba(127, 127, 127, 0.12);
          background: var(--secondary-background-color);
          color: var(--secondary-text-color);
          border-radius: 12px;
          padding: 7px 10px;
          font-size: 0.78rem;
          cursor: pointer;
          transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
          scroll-snap-align: start;
        }

        .section-nav__item:hover {
          background: color-mix(in srgb, var(--secondary-background-color) 88%, var(--gazon-section-accent) 12%);
        }

        .section-nav__item .gi-icon {
          width: 14px;
          height: 14px;
        }

        .section-nav__item--active {
          color: var(--primary-text-color);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 14%, transparent) 0%, transparent 100%),
            var(--secondary-background-color);
          box-shadow: none;
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
          border-radius: 14px;
          padding: 10px 11px;
          border: 1px solid rgba(127, 127, 127, 0.15);
          background:
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
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .decision__value {
          font-weight: 600;
          line-height: 1.28;
        }

        .gi-tile,
        .tiles {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          min-width: 0;
          gap: 6px;
          margin-top: 4px;
        }

        .gi-tile,
        .tile {
          display: flex;
          gap: 10px;
          align-items: stretch;
          min-width: 0;
          padding: 12px 14px;
          border-radius: 14px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 92%, white) 0%, var(--secondary-background-color) 100%);
          border: 1px solid rgba(127, 127, 127, 0.15);
          box-shadow: none;
          min-height: 72px;
          height: 100%;
          flex: 1 1 118px;
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .tile__icon {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
          color: var(--gazon-tile-accent, var(--gazon-section-accent));
        }

        .tile__icon .gi-icon {
          width: 20px;
          height: 20px;
        }

        .tile__content {
          min-width: 0;
          flex: 1;
        }

        .tile__label {
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          color: var(--secondary-text-color);
          margin-bottom: 1px;
        }

        .tile__value {
          font-size: 0.82rem;
          line-height: 1.18;
          font-weight: 700;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
          word-break: break-word;
        }

        .tile__secondary {
          margin-top: 1px;
          font-size: 0.72rem;
          color: var(--secondary-text-color);
        }

        .tile--danger { border-color: color-mix(in srgb, var(--gazon-danger-color) 22%, transparent); }
        .tile--warning { border-color: color-mix(in srgb, var(--gazon-warning-color) 22%, transparent); }
        .tile--success { border-color: color-mix(in srgb, var(--gazon-success-color) 22%, transparent); }
        .tile--accent { border-color: color-mix(in srgb, var(--gazon-accent-tone-color) 22%, transparent); }

        .gi-info {
          border: 1px solid rgba(127, 127, 127, 0.045);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 100%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 99%, white) 100%);
          box-shadow: none;
        }

        .gi-info--main {
          border-color: color-mix(in srgb, var(--gazon-card-accent) 5%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 1.5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 99%, white) 100%);
        }

        .gi-info--secondary {
          border-color: rgba(127, 127, 127, 0.04);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 100%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
        }

        .gi-card-core,
        .tab-stat,
        .tile,
        .metric {
          display: flex;
          align-items: stretch;
          gap: 10px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          border-radius: 16px;
          min-height: 74px;
          height: 100%;
          padding: 12px 14px;
        }

        .gi-card-core--metric,
        .metric {
          min-height: 58px;
          padding: 10px 12px;
        }

        .gi-card-core--stat,
        .gi-card-core--tile,
        .tab-stat,
        .tile {
          min-height: 74px;
        }

        .gi-card-core--tile {
          border: 1px solid color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 18%, transparent);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 6%, var(--secondary-background-color)) 0%, var(--secondary-background-color) 100%);
        }

        .gi-card-core__icon,
        .tab-stat__icon,
        .tile__icon,
        .metric__icon {
          width: 24px;
          height: 24px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
          overflow: hidden;
          line-height: 0;
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          color: var(--gazon-section-accent);
        }

        .gi-card-core--tile .gi-card-core__icon {
          background: color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 12%, transparent);
          color: var(--gazon-tile-accent, var(--gazon-section-accent));
        }

        .gi-card-core__icon .gi-icon,
        .tab-stat__icon .gi-icon,
        .tile__icon .gi-icon,
        .metric__icon .gi-icon {
          width: 18px;
          height: 18px;
          display: block;
          transform: translateY(-0.5px);
        }

        .gi-card-core--metric .gi-card-core__icon,
        .metric__icon {
          width: 22px;
          height: 22px;
        }

        .gi-card-core--metric .gi-card-core__icon .gi-icon,
        .metric__icon .gi-icon {
          width: 14px;
          height: 14px;
        }

        .gi-card-core__icon--empty {
          background: transparent;
        }

        .gi-card-core__content,
        .tab-stat__content,
        .tile__content,
        .metric__content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
        }

        .gi-card-core__label,
        .tab-stat__label,
        .tile__label,
        .metric__label {
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          line-height: 1.1;
          min-height: 1.1em;
        }

        .gi-card-core__value,
        .tab-stat__value,
        .tile__value,
        .metric__value {
          font-weight: 700;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
        }

        .gi-card-core__value,
        .tab-stat__value,
        .tile__value {
          font-size: 0.82rem;
          line-height: 1.18;
        }

        .metric__value {
          font-size: 0.8rem;
          line-height: 1.14;
        }

        .gi-card-core__secondary,
        .tab-stat__secondary,
        .tile__secondary {
          font-size: 0.72rem;
          line-height: 1.15;
          color: var(--secondary-text-color);
          min-height: 1.15em;
        }

        .gi-card-core__secondary--empty,
        .tab-stat__secondary:empty,
        .tile__secondary:empty {
          visibility: hidden;
        }

        .footer {
          margin-top: 8px;
          color: var(--secondary-text-color);
          font-size: 0.72rem;
        }

        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
          border: 1px dashed var(--divider-color);
          border-radius: 16px;
        }

        .card--editor-preview .gi-panel,
        .card--editor-preview .gi-tab,
        .card--editor-preview .gi-tile,
        .card--editor-preview .gi-status-pill,
        .card--editor-preview .gi-action,
        .card--editor-preview .gi-info,
        .card--editor-preview .gi-primary-action,
        .card--editor-preview .gi-progress__bar,
        .card--editor-preview .tab-panel__action-button,
        .card--editor-preview .decision-action__button {
          animation: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .card,
          .gi-card,
          .tab-panel,
          .gi-panel,
          .gi-tab,
          .tab-nav__item,
          .section-nav__item,
          .gi-tile,
          .tile,
          .pill,
          .context-pill,
          .gi-status-pill,
          .gi-action,
          .gi-info,
          .gi-primary-action,
          .tab-panel__action-button,
          .decision-action__button,
          .gi-progress__bar,
          .tab-progress__bar,
          .card--pulse-critical,
          .gi-alert--critical {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 600px) {
          .header {
            flex-direction: column;
          }

          .tab-panel__hero-top,
          .tab-panel__header,
          .tab-panel__section-head,
          .tab-panel__action {
            flex-direction: column;
          }

          .gi-primary-action,
          .tab-panel__action-button,
          .decision-action__button {
            width: 100%;
            justify-content: center;
          }

          .hero__lead {
            padding: 10px;
          }

          .decision-grid,
          .tiles {
            gap: 6px;
          }

          .tab-panel__grid,
          .tab-panel__grid--config {
            grid-template-columns: 1fr;
          }
        }
`;
const EDITOR_STYLES = String.raw`
        :host {
          display: block;
          --editor-border: var(--divider-color, rgba(127,127,127,0.2));
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
          background: var(--card-background-color);
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
        .field span {
          color: var(--secondary-text-color);
        }
        .field input,
        .field select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--editor-border);
          background: var(--secondary-background-color);
          color: var(--primary-text-color);
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
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
        }`;


const CARD_TYPE = "gazon-intelligent-card";
const CARD_NAME = "Gazon Intelligent Card";
const CARD_VERSION = "0.1.1";

const DEFAULT_CONFIG = {
  title: "Gazon Intelligent",
  show_icons: true,
  show_header: true,
  show_background: true,
  compact: false,
  minimal_mode: false,
  show_advanced_details: false,
  theme_mode: "auto",
  accent_color: "",
  card_height: "",
  icon_size: 24,
  border_radius: 24,
  background_style: "solid",
  use_gradient: true,
  show_secondary_info: true,
  entity_fenetre_optimale: "sensor.gazon_intelligent_fenetre_optimale",
  entity_plan_arrosage: "sensor.gazon_intelligent_plan_d_arrosage",
  entity_dernier_arrosage: "sensor.gazon_intelligent_dernier_arrosage_detecte",
  entity_derniere_application: "sensor.gazon_intelligent_derniere_application",
  entity_mode: "select.gazon_intelligent_mode_du_gazon",
  entity_switch_arrosage_automatique: "switch.gazon_intelligent_arrosage_automatique",
  entity_arrosage_recommande: "binary_sensor.gazon_intelligent_arrosage_recommande",
  entity_objectif_arrosage: "sensor.gazon_intelligent_objectif_d_arrosage",
  entity_type_arrosage: "sensor.gazon_intelligent_type_d_arrosage",
  entity_risque: "sensor.gazon_intelligent_risque_gazon",
  entity_debit_zone_1: "number.gazon_intelligent_debit_zone_1",
  entity_debit_zone_2: "number.gazon_intelligent_debit_zone_2",
  entity_debit_zone_3: "number.gazon_intelligent_debit_zone_3",
  entity_debit_zone_4: "number.gazon_intelligent_debit_zone_4",
  entity_debit_zone_5: "number.gazon_intelligent_debit_zone_5",
  entity_hauteur_min_tondeuse: "number.gazon_intelligent_hauteur_min_tondeuse",
  entity_hauteur_max_tondeuse: "number.gazon_intelligent_hauteur_max_tondeuse",
  manual_action_service: "gazon_intelligent.start_manual_irrigation",
  tap_action: { action: "more-info" },
  hold_action: { action: "none" },
  double_tap_action: { action: "none" },
};

const TAB_DEFS = [
  { key: "watering", label: "Arrosage", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "gazon", label: "Gazon", icon: "mdi:grass" },
  { key: "config", label: "Config", icon: "mdi:cog-outline" },
];

const ENTITY_KEYS = [
  { key: "entity_fenetre_optimale", label: "Fenêtre optimale", icon: "mdi:clock-outline", domain: ["sensor"] },
  { key: "entity_plan_arrosage", label: "Plan d'arrosage", icon: "mdi:timer-outline", domain: ["sensor"] },
  { key: "entity_dernier_arrosage", label: "Dernier arrosage détecté", icon: "mdi:water-check", domain: ["sensor"] },
  { key: "entity_derniere_application", label: "Dernière application", icon: "mdi:spray-bottle", domain: ["sensor"] },
  { key: "entity_mode", label: "Mode du gazon", icon: "mdi:grass", domain: ["select"] },
  { key: "entity_switch_arrosage_automatique", label: "Arrosage automatique", icon: "mdi:switch", domain: ["switch"] },
  { key: "entity_phase", label: "Phase dominante", icon: "mdi:grass", domain: ["sensor"] },
  { key: "entity_sous_phase", label: "Sous-phase", icon: "mdi:sprout", domain: ["sensor"] },
  { key: "entity_conseil", label: "Conseil principal", icon: "mdi:message-text-outline", domain: ["sensor"] },
  { key: "entity_action", label: "Action recommandée", icon: "mdi:check-circle-outline", domain: ["sensor"] },
  { key: "entity_avoid", label: "Action à éviter", icon: "mdi:alert-circle-outline", domain: ["sensor"] },
  { key: "entity_niveau", label: "Niveau d'action", icon: "mdi:signal", domain: ["sensor"] },
  { key: "entity_tonte", label: "État de tonte", icon: "mdi:content-cut", domain: ["sensor"] },
  { key: "entity_hauteur", label: "Hauteur de tonte conseillée", icon: "mdi:ruler-square", domain: ["sensor"] },
  { key: "entity_arrosage_recommande", label: "Arrosage recommandé", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_objectif_arrosage", label: "Objectif d'arrosage", icon: "mdi:water-percent", domain: ["sensor"] },
  { key: "entity_type_arrosage", label: "Type d'arrosage", icon: "mdi:sprinkler", domain: ["sensor"] },
  { key: "entity_risque", label: "Risque gazon", icon: "mdi:shield-alert-outline", domain: ["sensor"] },
  { key: "entity_debit_zone_1", label: "Débit zone 1", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_2", label: "Débit zone 2", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_3", label: "Débit zone 3", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_4", label: "Débit zone 4", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_5", label: "Débit zone 5", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_hauteur_min_tondeuse", label: "Hauteur min tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
  { key: "entity_hauteur_max_tondeuse", label: "Hauteur max tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
];

const SECTION_DEFS = [
  { key: "overview", label: "Résumé", icon: "mdi:view-dashboard" },
  { key: "watering", label: "Arrosage", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "details", label: "Détails", icon: "mdi:dots-horizontal" },
];

const SECTION_FIELDS = {
  overview: [
    "entity_hauteur",
    "entity_arrosage_recommande",
    "entity_objectif_arrosage",
  ],
  watering: [
    "entity_arrosage_recommande",
    "entity_objectif_arrosage",
    "entity_type_arrosage",
    "entity_niveau",
    "entity_risque",
    "entity_phase",
  ],
  mowing: [
    "entity_tonte",
    "entity_hauteur",
    "entity_niveau",
    "entity_phase",
    "entity_sous_phase",
    "entity_risque",
  ],
  details: ENTITY_KEYS.map((field) => field.key),
};

const SECTION_ACCENTS = {
  overview: "#4f8f3a",
  watering: "#2b8c7c",
  mowing: "#5f8f3d",
  details: "#607d8b",
};

const LEGACY_ENTITY_KEYS = [
  "entity_phase",
  "entity_sous_phase",
  "entity_conseil",
  "entity_action",
  "entity_avoid",
  "entity_niveau",
  "entity_tonte",
  "entity_hauteur",
];

const OVERVIEW_ENTITY_KEYS = new Set([...LEGACY_ENTITY_KEYS, "entity_risque"]);

const RENDER_SIGNATURE_ATTRS = {
  entity_fenetre_optimale: ["status", "summary", "next_action", "auto_irrigation_enabled"],
  entity_plan_arrosage: ["summary", "duration_human", "zone_count", "objective_mm", "plan_type", "passages", "fractionation", "total_duration_min"],
  entity_dernier_arrosage: ["source", "date_action", "detected_at", "zone_count"],
  entity_objectif_arrosage: ["temperature", "etp", "phase_active"],
  entity_sous_phase: ["sous_phase_progression", "sous_phase_detail"],
  entity_phase: ["phase_dominante_source", "pluie_demain_source"],
  entity_hauteur: ["hauteur_tonte_min_cm", "hauteur_tonte_max_cm"],
};

const STATUS_COLORS = {
  danger: "#e53935",
  warning: "#fb8c00",
  success: "#43a047",
  neutral: "#607d8b",
  accent: "#fdd835",
  critical: "#ff1744",
};

const STATUS_LABELS = {
  auto: "Auto",
  en_attente: "En attente",
  bloque: "Bloqué",
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

function renderIconBox(icon, size = "md") {
  if (!icon) {
    return "";
  }
  const sizeClass = size === "sm" ? "gi-icon--sm" : size === "pill" ? "gi-icon--pill" : "";
  return `<span class="gi-icon ${sizeClass}"><ha-icon icon="${escapeHtml(icon)}"></ha-icon></span>`;
}

function renderCardCore({
  kind,
  label,
  value,
  tone = "neutral",
  icon = null,
  iconSize = "md",
  secondary = "",
  style = "",
}) {
  const classes = ["gi-card-core", `gi-card-core--${kind}`];
  if (tone) {
    classes.push(`gi-card-core--${tone}`);
  }
  const iconHtml = icon ? renderIconBox(icon, iconSize) : "";
  const secondaryValue = isEmpty(secondary) ? "&nbsp;" : escapeHtml(secondary);
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
    </section>
  `;
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
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: Number.isInteger(number) ? 0 : 1,
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
    return "Aucun arrosage nécessaire";
  }
  const formatted = formatNumber(number, 1);
  return `${formatted} mm`;
}

function formatBoolState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Oui";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
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
  return STATUS_COLORS[tone] || STATUS_COLORS.neutral;
}

function sectionToAccent(section) {
  return SECTION_ACCENTS[section] || SECTION_ACCENTS.overview;
}

function iconForField(field) {
  return field.icon || "mdi:information-outline";
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
  const next = { ...config };
  if (next.show_advanced_details === undefined && next.show_legacy_details !== undefined) {
    next.show_advanced_details = Boolean(next.show_legacy_details);
  }
  delete next.show_legacy_details;
  return next;
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
  return String(value);
}

function formatStatusLabel(status) {
  const normalized = String(status ?? "").trim().toLowerCase();
  return STATUS_LABELS[normalized] || (isEmpty(status) ? "Non disponible" : String(status));
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

class GazonIntelligentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._tapTimer = null;
    this._lastRenderSignature = null;
    this._activeTab = "watering";
    this._activeSection = "overview";
    this._onClick = this._onClick.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_TYPE}`,
      title: DEFAULT_CONFIG.title,
      show_icons: DEFAULT_CONFIG.show_icons,
      show_header: DEFAULT_CONFIG.show_header,
      show_background: DEFAULT_CONFIG.show_background,
      compact: DEFAULT_CONFIG.compact,
      entity_fenetre_optimale: DEFAULT_CONFIG.entity_fenetre_optimale,
      entity_plan_arrosage: DEFAULT_CONFIG.entity_plan_arrosage,
      entity_dernier_arrosage: DEFAULT_CONFIG.entity_dernier_arrosage,
      entity_derniere_application: DEFAULT_CONFIG.entity_derniere_application,
      entity_mode: DEFAULT_CONFIG.entity_mode,
      entity_switch_arrosage_automatique: DEFAULT_CONFIG.entity_switch_arrosage_automatique,
      entity_arrosage_recommande: DEFAULT_CONFIG.entity_arrosage_recommande,
      entity_objectif_arrosage: DEFAULT_CONFIG.entity_objectif_arrosage,
      entity_type_arrosage: DEFAULT_CONFIG.entity_type_arrosage,
      entity_risque: DEFAULT_CONFIG.entity_risque,
      entity_debit_zone_1: DEFAULT_CONFIG.entity_debit_zone_1,
      entity_debit_zone_2: DEFAULT_CONFIG.entity_debit_zone_2,
      entity_debit_zone_3: DEFAULT_CONFIG.entity_debit_zone_3,
      entity_debit_zone_4: DEFAULT_CONFIG.entity_debit_zone_4,
      entity_debit_zone_5: DEFAULT_CONFIG.entity_debit_zone_5,
      entity_hauteur_min_tondeuse: DEFAULT_CONFIG.entity_hauteur_min_tondeuse,
      entity_hauteur_max_tondeuse: DEFAULT_CONFIG.entity_hauteur_max_tondeuse,
    };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "show_header", selector: { boolean: {} } },
        { name: "show_icons", selector: { boolean: {} } },
        { name: "show_background", selector: { boolean: {} } },
        { name: "compact", selector: { boolean: {} } },
        { name: "minimal_mode", selector: { boolean: {} } },
        { name: "show_secondary_info", selector: { boolean: {} } },
        { name: "show_advanced_details", selector: { boolean: {} } },
        { name: "entity_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_plan_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_application", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_mode", selector: { entity: { domain: ["select"] } } },
        { name: "entity_switch_arrosage_automatique", selector: { entity: { domain: ["switch"] } } },
        { name: "entity_arrosage_recommande", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_objectif_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_type_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_risque", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_debit_zone_1", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_2", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_3", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_4", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_5", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_min_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_max_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_phase", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_sous_phase", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_conseil", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_action", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_avoid", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_niveau", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_tonte", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_hauteur", selector: { entity: { domain: ["sensor"] } } },
        { name: "manual_action_service", selector: { text: {} } },
      ],
    };
  }

  setConfig(config) {
    if (!config || config.type !== `custom:${CARD_TYPE}`) {
      throw new Error(`Invalid configuration for ${CARD_NAME}.`);
    }
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, config));
    this._lastRenderSignature = null;
    this._activeTab = "watering";
    this._activeSection = "overview";
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    if (!this._config) {
      return 5;
    }
    if (this._isMinimalMode()) {
      return this._config.show_header ? 4 : 3;
    }
    return this._config.compact ? 6 : 7;
  }

  getGridOptions() {
    const minimal = this._isMinimalMode();
    const compact = Boolean(this._config?.compact);
    return {
      rows: minimal ? 4 : compact ? 6 : 7,
      columns: 6,
      min_rows: minimal ? 3 : compact ? 5 : 6,
      min_columns: 3,
      max_rows: minimal ? 4 : compact ? 6 : 7,
    };
  }

  getConfigElement() {
    return document.createElement(`${CARD_TYPE}-editor`);
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    this.shadowRoot?.removeEventListener("click", this._onClick);
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
      case "config":
        return SECTION_ACCENTS.details;
      default:
        return SECTION_ACCENTS.overview;
    }
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

  _primaryEntityId() {
    if (this._activeTab === "watering") {
      return (
        this._entityId("entity_fenetre_optimale") ||
        this._entityId("entity_plan_arrosage") ||
        this._entityId("entity_objectif_arrosage") ||
        this._entityId("entity_derniere_application") ||
        this._entityId("entity_mode")
      );
    }
    if (this._activeTab === "mowing") {
      return this._entityId("entity_tonte") || this._entityId("entity_hauteur") || this._entityId("entity_fenetre_optimale");
    }
    if (this._activeTab === "gazon") {
      return this._entityId("entity_phase") || this._entityId("entity_sous_phase") || this._entityId("entity_niveau");
    }
    if (this._activeTab === "config") {
      return (
        this._entityId("entity_switch_arrosage_automatique") ||
        this._entityId("entity_mode") ||
        this._entityId("entity_debit_zone_1")
      );
    }
    return (
      this._entityId("entity_fenetre_optimale") ||
      this._entityId("entity_plan_arrosage") ||
      this._entityId("entity_objectif_arrosage") ||
      this._entityId("entity_phase") ||
      this._entityId("entity_conseil") ||
      this._entityId("entity_tonte") ||
      this._entityId("entity_hauteur")
    );
  }

  _windowEntity() {
    return this._entity("entity_fenetre_optimale");
  }

  _planEntity() {
    return this._entity("entity_plan_arrosage");
  }

  _lastWateringEntity() {
    return this._entity("entity_dernier_arrosage");
  }

  _applicationEntity() {
    return this._entity("entity_derniere_application");
  }

  _objectiveEntity() {
    return this._entity("entity_objectif_arrosage");
  }

  _objectiveMm() {
    return this._entityNumber("entity_objectif_arrosage");
  }

  _windowState() {
    const entity = this._windowEntity();
    const attrs = entity?.attributes || {};
    const status = String(attrs.status || "").trim().toLowerCase();
    const summary = String(attrs.summary || entity?.state || "Arrosage prévu").trim();
    const nextAction = String(attrs.next_action || "").trim();
    const objective = this._objectiveMm() ?? 0;
    const showManualAction = objective > 0 && status !== "bloque";
    const isBlocked = status === "bloque";
    const isNoActionRequired = !isBlocked && objective <= 0;
    return {
      entity,
      status,
      summary,
      nextAction,
      objective,
      showManualAction,
      isBlocked,
      isNoActionRequired,
      tone: statusTone(status),
      statusLabel: formatStatusLabel(status),
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
    return {
      entity,
      summary: summary || "Aucun plan d'arrosage",
      durationHuman: durationHuman || formatDurationHuman(attrs.total_duration_min ?? entity?.state),
      zoneCount: zoneCount ?? 0,
      objectiveMm: objectiveMm ?? 0,
      planType: planType || "no_plan",
      passages: passages ?? 1,
      fractionation: Boolean(attrs.fractionation),
    };
  }

  _lastWateringState() {
    const entity = this._lastWateringEntity();
    if (!entity) {
      return {
        label: "Aucun arrosage détecté",
        detail: "Historique vide",
        value: null,
      };
    }
    const rawValue = asNumber(entity.state);
    const source = String(entity.attributes?.source || "").trim();
    const dateAction = String(entity.attributes?.date_action || entity.attributes?.detected_at || "").trim();
    const zoneCount = asNumber(entity.attributes?.zone_count);
    if (source === "none" || rawValue === null || rawValue <= 0) {
      return {
        label: "Aucun arrosage détecté",
        detail: "Historique vide",
        value: null,
      };
    }
    const fragments = [];
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
    };
  }

  _objectiveContext() {
    const entity = this._objectiveEntity();
    const temperature = asNumber(entity?.attributes?.temperature);
    const etp = asNumber(entity?.attributes?.etp);
    const risk = this._entityState("entity_risque", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    return {
      entity,
      temperature,
      etp,
      risk,
      mode,
      typeArrosage,
    };
  }

  _manualActionService() {
    const service = String(this._config?.manual_action_service || "").trim();
    if (!service) {
      return "gazon_intelligent.start_manual_irrigation";
    }
    return service;
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

  _applyHostVariables({ accent, activeTone, sectionAccent, borderRadius, iconSize, height }) {
    if (!this.style) {
      return;
    }
    const vars = {
      "--gazon-accent-color": accent,
      "--gazon-card-tone-color": accent,
      "--gazon-card-tone": activeTone,
      "--gazon-section-accent": sectionAccent,
      "--gazon-danger-color": STATUS_COLORS.danger,
      "--gazon-warning-color": STATUS_COLORS.warning,
      "--gazon-success-color": STATUS_COLORS.success,
      "--gazon-neutral-color": STATUS_COLORS.neutral,
      "--gazon-accent-tone-color": STATUS_COLORS.accent,
      "--gazon-critical-color": STATUS_COLORS.critical,
      "--gazon-border-radius": borderRadius,
      "--gazon-icon-size": iconSize,
      "--gazon-card-height": height || "auto",
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
      "entity_phase",
      "entity_sous_phase",
      "entity_tonte",
      "entity_hauteur",
      "entity_arrosage_recommande",
      "entity_niveau",
      "entity_risque",
      "entity_fenetre_optimale",
      "entity_plan_arrosage",
      "entity_dernier_arrosage",
      "entity_derniere_application",
      "entity_objectif_arrosage",
      "entity_type_arrosage",
      "entity_mode",
      "entity_switch_arrosage_automatique",
      "entity_debit_zone_1",
      "entity_debit_zone_2",
      "entity_debit_zone_3",
      "entity_debit_zone_4",
      "entity_debit_zone_5",
      "entity_hauteur_min_tondeuse",
      "entity_hauteur_max_tondeuse",
    ]);

    if (this._canShowLegacyDetails()) {
      LEGACY_ENTITY_KEYS.forEach((key) => keys.add(key));
      ENTITY_KEYS.forEach((field) => keys.add(field.key));
    } else {
      if (this._activeTab === "mowing") {
        ["entity_tonte", "entity_hauteur", "entity_fenetre_optimale"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "gazon") {
        ["entity_phase", "entity_sous_phase", "entity_niveau", "entity_risque"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "config") {
        [
          "entity_switch_arrosage_automatique",
          "entity_mode",
          "entity_debit_zone_1",
          "entity_debit_zone_2",
          "entity_debit_zone_3",
          "entity_debit_zone_4",
          "entity_debit_zone_5",
          "entity_hauteur_min_tondeuse",
          "entity_hauteur_max_tondeuse",
        ].forEach((key) => keys.add(key));
      } else {
        [
          "entity_fenetre_optimale",
          "entity_plan_arrosage",
          "entity_dernier_arrosage",
          "entity_derniere_application",
          "entity_objectif_arrosage",
          "entity_type_arrosage",
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
        compact: Boolean(this._config.compact),
        minimal_mode: Boolean(this._config.minimal_mode),
        show_secondary_info: Boolean(this._config.show_secondary_info),
        show_advanced_details: Boolean(this._config.show_advanced_details),
        theme_mode: this._config.theme_mode,
        accent_color: this._config.accent_color,
        card_height: this._config.card_height,
        icon_size: this._config.icon_size,
        border_radius: this._config.border_radius,
        background_style: this._config.background_style,
        use_gradient: Boolean(this._config.use_gradient),
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

  _renderContextPill(label, value, tone = "neutral", icon = null) {
    if (isEmpty(value)) {
      return "";
    }
    const iconHtml = this._config?.show_icons ? renderIconBox(icon, "pill") : "";
    return `
      <div class="gi-pill gi-status-pill context-pill context-pill--${tone}">
        ${iconHtml}
        <span class="context-pill__label">${escapeHtml(label)}</span>
        <strong class="context-pill__value">${escapeHtml(value)}</strong>
      </div>
    `;
  }

  _renderTabPill(label, value, tone = "neutral", icon = null) {
    return this._renderContextPill(label, value, tone, icon);
  }

  _renderTabNav() {
    return `
      <nav class="gi-tabs tab-nav" aria-label="Domaines de la carte">
        ${TAB_DEFS.map((tab) => {
          const active = tab.key === this._activeTab;
          const iconHtml = this._config?.show_icons ? renderIconBox(tab.icon, "sm") : "";
          return `
            <button
              type="button"
              class="gi-row gi-action tab-nav__item ${active ? "tab-nav__item--active" : ""}"
              data-tab="${escapeHtml(tab.key)}"
              aria-pressed="${active ? "true" : "false"}"
            >
              ${iconHtml}
              <span>${escapeHtml(tab.label)}</span>
            </button>
          `;
        }).join("")}
      </nav>
    `;
  }

  _renderStatCard(label, value, tone = "neutral", icon = null, secondary = "") {
    return renderCardCore({
      kind: "stat",
      label,
      value,
      tone,
      icon: this._config?.show_icons ? icon : null,
      secondary,
    });
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
      return {
        value: suffix ? `${formatNumber(numeric, 1)} ${suffix}` : formatNumber(numeric, 1) || String(raw),
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

  _renderConfigTab() {
    const switchState = this._configSwitchState();
    const mode = this._entityState("entity_mode", null);
    const modeTone = phaseTone(mode);
    const switchIconHtml = this._config?.show_icons ? renderIconBox("mdi:switch", "sm") : "";
    const zoneCards = this._zoneDebitEntries()
      .map((entry) => {
        const config = this._renderConfigValue(entry.key, "mm/h");
        return this._renderStatCard(entry.label, config.value, config.tone, "mdi:sprinkler", config.secondary);
      })
      .join("");
    const heightMin = this._renderConfigValue("entity_hauteur_min_tondeuse", "cm");
    const heightMax = this._renderConfigValue("entity_hauteur_max_tondeuse", "cm");

    return `
      <section class="tab-panel gi-panel tab-panel--config">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Configuration</div>
            <div class="tab-panel__title">Autorisation, débits et hauteurs</div>
          </div>
          <div class="gi-pill gi-status-pill tab-panel__status tab-panel__status--${switchState.tone}">
            ${switchIconHtml}
            <span>${escapeHtml(switchState.label)}</span>
          </div>
        </div>

        <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-top">
          ${this._renderStatCard("Arrosage automatique", switchState.label, switchState.tone, "mdi:switch")}
          ${this._renderStatCard("Mode du gazon", formatApplicationMode(mode), modeTone, "mdi:grass")}
          ${this._renderStatCard("Hauteur min tondeuse", heightMin.value, heightMin.tone, "mdi:ruler-square")}
          ${this._renderStatCard("Hauteur max tondeuse", heightMax.value, heightMax.tone, "mdi:ruler-square")}
        </div>

        <div class="tab-panel__section tab-panel__section--config-debits">
          <div class="tab-panel__section-title">Débits des zones</div>
          <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-debits">
            ${zoneCards || `<div class="tab-panel__empty">Débits non configurés.</div>`}
          </div>
        </div>
      </section>
    `;
  }

  _renderGazonTab() {
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);
    const risk = this._entityState("entity_risque", null);
    const action = this._entityState("entity_niveau", null);
    const progress = asNumber(this._entity("entity_sous_phase")?.attributes?.sous_phase_progression);
    const progressDetail = this._entity("entity_sous_phase")?.attributes?.sous_phase_detail || "";
    const progressLabel = progress === null ? "Progression non disponible" : `${formatNumber(progress, 0)} %`;
    const progressWidth = progress === null ? 0 : Math.max(0, Math.min(100, progress));
    const gazonStatusIcon = this._config?.show_icons ? renderIconBox("mdi:grass", "sm") : "";

    return `
      <section class="tab-panel gi-panel tab-panel--gazon">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Gazon</div>
            <div class="tab-panel__title">Phase, sous-phase et risque</div>
          </div>
          <div class="gi-pill gi-status-pill tab-panel__status tab-panel__status--${computeActionTone(action)}">
            ${gazonStatusIcon}
            <span>${escapeHtml(formatStatusLabel(action))}</span>
          </div>
        </div>

        <div class="tab-panel__grid">
          ${this._renderStatCard("Phase dominante", phase, phaseTone(phase), "mdi:grass")}
          ${this._renderStatCard("Sous-phase", subPhase, phaseTone(phase), "mdi:sprout", progressDetail ? progressDetail : "")}
          ${this._renderStatCard("Risque gazon", risk, computeRisqueTone(risk), "mdi:shield-alert-outline")}
          ${this._renderStatCard("Niveau d'action", action, computeActionTone(action), "mdi:signal")}
        </div>

        <div class="tab-panel__section">
          <div class="tab-panel__section-title">Progression de la sous-phase</div>
          <div class="tab-progress" aria-label="${escapeHtml(progressLabel)}">
            <div class="tab-progress__bar gi-progress">
              <span class="gi-progress__bar ${computeActionTone(action) === "critical" ? "gi-progress__bar--critical" : ""}" style="width:${escapeHtml(String(progressWidth))}%;"></span>
            </div>
            <div class="tab-progress__meta">${escapeHtml(progressLabel)}</div>
          </div>
        </div>
      </section>
    `;
  }

  _renderMowingTab() {
    const tonte = this._entity("entity_tonte");
    const height = this._entity("entity_hauteur");
    const windowState = this._windowState();
    const tonteValue = tonte ? normalizeDisplayValue(tonte.state) : "Non disponible";
    const heightValue = height ? formatCm(height.state) : "Non disponible";
    const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
    const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
    const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
    const windowSummary = windowState.entity ? windowState.summary : "Fenêtre optimale non disponible";
    const mowingStatusIcon = this._config?.show_icons ? renderIconBox("mdi:content-cut", "sm") : "";

    return `
      <section class="tab-panel gi-panel tab-panel--mowing">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Tonte</div>
            <div class="tab-panel__title">État, hauteur et créneau</div>
          </div>
          <div class="gi-pill gi-status-pill tab-panel__status tab-panel__status--${computeTonteTone(tonteValue)}">
            ${mowingStatusIcon}
            <span>${escapeHtml(tonteValue)}</span>
          </div>
        </div>

        <div class="tab-panel__grid">
          ${this._renderStatCard("État de tonte", tonteValue, computeTonteTone(tonteValue), "mdi:content-cut")}
          ${this._renderStatCard("Hauteur conseillée", heightValue, this._phaseTone(), "mdi:ruler-square", heightSecondary)}
          ${this._renderStatCard("Fenêtre optimale", windowSummary, windowState.tone, "mdi:clock-outline", windowState.nextAction || "")}
        </div>
      </section>
    `;
  }

  _renderWateringTab() {
    const windowState = this._windowState();
    const planState = this._planState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const context = this._objectiveContext();
    const lastWatering = this._lastWateringState();
    const tone = windowState.tone;
    const windowIcon = this._statusIcon(windowState.status);
    const windowStatusIcon = this._config?.show_icons ? renderIconBox(windowIcon, "sm") : "";
    const manualButtonVisible = windowState.showManualAction && objective > 0;
    const isBlocked = windowState.isBlocked;
    const noActionText = windowState.isNoActionRequired ? "Aucune irrigation nécessaire" : "";
    const noActionHint = windowState.isNoActionRequired ? windowState.summary || "Le plan actuel ne demande pas d'arrosage." : "";
    const blockText = isBlocked ? windowState.summary || "Aucune action possible" : noActionText;
    const blockHint = isBlocked ? windowState.nextAction || "" : noActionHint;
    const planTypeLabel = formatPlanType(planState.planType);

    const contextPills = [
      this._renderTabPill("Dernier arrosage", lastWatering.label, lastWatering.value !== null ? "success" : "neutral", "mdi:water-check"),
      this._renderTabPill("Risque gazon", context.risk, computeRisqueTone(context.risk), "mdi:shield-alert-outline"),
      this._renderTabPill(
        "Température",
        context.temperature === null ? "Non disponible" : `${formatNumber(context.temperature, 1)} °C`,
        context.temperature !== null && context.temperature >= 24 ? "warning" : "neutral",
        "mdi:thermometer",
      ),
      this._renderTabPill(
        "ETP",
        context.etp === null ? "Non disponible" : `${formatNumber(context.etp, 1)} mm`,
        context.etp !== null && context.etp >= 4 ? "warning" : "neutral",
        "mdi:weather-sunny",
      ),
    ];

    const planChips = [
      this._renderTabPill("Zones", planState.zoneCount ? `${planState.zoneCount}` : "0", planState.zoneCount > 1 ? "accent" : "neutral", "mdi:pipe"),
      this._renderTabPill("Passages", planState.passages ? `${planState.passages}` : "1", planState.fractionation ? "warning" : "neutral", "mdi:cached"),
      this._renderTabPill("Fractionnement", planState.fractionation ? "Oui" : "Non", planState.fractionation ? "warning" : "neutral", "mdi:call-split"),
      this._renderTabPill("Type", planTypeLabel, this._planTypeTone(planState.planType), "mdi:shape"),
      this._renderTabPill("Objectif", objectiveLabel, objective > 0 ? "success" : "neutral", "mdi:water"),
    ];

    return `
      <section class="tab-panel gi-panel tab-panel--watering">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${tone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">${escapeHtml(windowState.summary || "Arrosage prévu")}</div>
            <div class="gi-pill gi-status-pill tab-panel__hero-status tab-panel__hero-status--${tone}">
              ${windowStatusIcon}
              <span>${escapeHtml(windowState.statusLabel)}</span>
            </div>
          </div>
          ${
            windowState.nextAction
              ? `<div class="tab-panel__hero-next">${escapeHtml(windowState.nextAction)}</div>`
              : ""
          }
          ${
            isBlocked && blockHint
              ? `<div class="tab-panel__hero-hint">${escapeHtml(blockHint)}</div>`
              : ""
          }
        </div>

        ${
          manualButtonVisible
            ? `<button
                type="button"
                class="tab-panel__action tab-panel__action--${tone} gi-primary-action gi-action gi-action--primary ${manualButtonVisible ? "gi-primary-action--active" : ""} ${this._actionTone() === "critical" ? "gi-alert--critical" : ""}"
                data-gazon-action="manual-irrigation"
                aria-label="Arrosage manuel immédiat"
              >
                ${this._config?.show_icons ? renderIconBox("mdi:water-pump", "md") : ""}
                <span class="tab-panel__action-content">
                  <span class="tab-panel__action-title">Arrosage manuel immédiat</span>
                  <span class="tab-panel__action-subtitle">${escapeHtml(objectiveLabel)} à déclencher maintenant</span>
                </span>
              </button>`
            : `<section class="gi-info gi-info--secondary tab-panel__block tab-panel__block--${isBlocked ? "danger" : "neutral"}">
                <div class="tab-panel__eyebrow">${escapeHtml(isBlocked ? "Blocage" : "Statut")}</div>
                <div class="tab-panel__block-value">${escapeHtml(blockText || "Aucune action disponible")}</div>
                ${
                  blockHint
                    ? `<div class="tab-panel__block-hint">${escapeHtml(blockHint)}</div>`
                    : ""
                }
              </section>`
        }

        <section class="gi-info gi-info--main tab-panel__section">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Résumé du plan</div>
            <div class="tab-panel__section-meta">${escapeHtml(planState.durationHuman)} · ${escapeHtml(planTypeLabel)}</div>
          </div>
          <div class="tab-panel__section-summary">${escapeHtml(planState.summary)}</div>
          ${
            this._config?.show_secondary_info
              ? `<div class="tab-panel__chips">${planChips.join("")}</div>`
              : ""
          }
        </section>

        <section class="gi-info gi-info--main tab-panel__section">
          <div class="tab-panel__eyebrow">Contexte</div>
          <div class="tab-panel__grid">
            ${contextPills.join("")}
          </div>
        </section>
      </section>
    `;
  }

  _renderActiveTab() {
    switch (this._activeTab) {
      case "mowing":
        return this._renderMowingTab();
      case "gazon":
        return this._renderGazonTab();
      case "config":
        return this._renderConfigTab();
      case "watering":
      default:
        return this._renderWateringTab();
    }
  }

  _renderDecisionLayout() {
    return `
      <section class="tabs-layout">
        ${this._renderTabNav()}
        ${this._renderActiveTab()}
        ${
          this._canShowLegacyDetails()
            ? `<section class="decision-advanced">
                ${this._renderSectionNav()}
                ${this._buildDecisionBlocks()}
                ${this._buildContent()}
                ${this._buildFooter()}
              </section>`
            : ""
        }
      </section>
    `;
  }

  _setActiveSection(section) {
    if (!SECTION_FIELDS[section] || this._activeSection === section) {
      return;
    }
    this._activeSection = section;
    this._render();
  }

  _setActiveTab(tab) {
    if (!TAB_DEFS.some((entry) => entry.key === tab) || this._activeTab === tab) {
      return;
    }
    this._activeTab = tab;
    this._render();
  }

  _fieldSection(fieldKey) {
    if (OVERVIEW_ENTITY_KEYS.has(fieldKey)) {
      return "overview";
    }
    if (["entity_arrosage_recommande", "entity_objectif_arrosage", "entity_type_arrosage"].includes(fieldKey)) {
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
    const icon = this._config?.show_icons ? iconForField(field) : null;
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

  _renderSectionNav() {
    if (this._isMinimalMode()) {
      return "";
    }
    return `
      <nav class="gi-tabs section-nav" aria-label="Sections de la carte">
        ${SECTION_DEFS.map((section) => {
          const active = section.key === this._activeSection;
          const iconHtml = this._config?.show_icons ? renderIconBox(section.icon, "sm") : "";
          return `
            <button
              type="button"
              class="gi-row gi-action gi-tab section-nav__item ${active ? "section-nav__item--active gi-tab--active" : ""}"
              data-section="${escapeHtml(section.key)}"
              aria-pressed="${active ? "true" : "false"}"
            >
              ${iconHtml}
              <span>${escapeHtml(section.label)}</span>
            </button>
          `;
        }).join("")}
      </nav>
    `;
  }

  _renderHero() {
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);
    const tonte = this._entityState("entity_tonte", null);
    const arrosage = this._entityState("entity_arrosage_recommande", null);
    const hauteur = this._entityState("entity_hauteur", null);
    const conseil = this._entityState("entity_conseil", null);
    const sectionAccent = this._sectionAccent("overview");

    return `
      <section class="hero" style="--gazon-section-accent:${escapeHtml(sectionAccent)};">
        <div class="gi-row gi-action hero__lead ${this._primaryTone() === "danger" ? "hero__lead--danger" : ""}" data-action-target="primary">
          <div class="hero__lead-icon">${this._config.show_icons ? renderIconBox("mdi:leaf", "md") : ""}</div>
          <div class="hero__lead-content">
            <div class="hero__label">Conseil principal</div>
            <div class="hero__value">${escapeHtml(conseil || "Non configuré.")}</div>
          </div>
        </div>
        <div class="hero__metrics">
          ${this._renderMetric("Phase", phase, phaseTone(phase), this._heroMetricIcon("entity_phase", phase))}
          ${this._renderMetric("Sous-phase", subPhase, phaseTone(phase), this._heroMetricIcon("entity_sous_phase", subPhase))}
          ${this._renderMetric("Tonte", tonte, computeTonteTone(tonte), this._heroMetricIcon("entity_tonte", tonte))}
          ${this._renderMetric("Arrosage", formatBoolState(arrosage), arrosage === "on" ? "success" : "neutral", this._heroMetricIcon("entity_arrosage_recommande", arrosage))}
          ${this._renderMetric("Hauteur", formatCm(hauteur), this._phaseTone(), this._heroMetricIcon("entity_hauteur", hauteur))}
        </div>
      </section>
    `;
  }

  _toneForField(field, entity) {
    if (!entity) {
      return "neutral";
    }
    if (field.key === "entity_tonte") {
      return computeTonteTone(entity.state);
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
    if (field.key === "entity_phase") {
      return phaseTone(entity.state);
    }
    if (field.key === "entity_hauteur") {
      return this._phaseTone();
    }
    return "neutral";
  }

  _formatFieldValue(field, entity) {
    if (!entity) {
      return "Non disponible";
    }
    if (field.key === "entity_arrosage_recommande") {
      return formatBoolState(entity.state);
    }
    if (field.key === "entity_objectif_arrosage") {
      const numeric = asNumber(entity.state);
      return formatMm(numeric);
    }
    if (field.key === "entity_hauteur") {
      const numeric = asNumber(entity.state);
      return formatCm(numeric);
    }
    if (field.key === "entity_tonte") {
      return normalizeDisplayValue(entity.state);
    }
    return normalizeDisplayValue(entity.state);
  }

  _secondaryFieldText(field, entity) {
    if (!entity) {
      return "";
    }
    if (field.key === "entity_hauteur") {
      const min = asNumber(entity.attributes?.hauteur_tonte_min_cm);
      const max = asNumber(entity.attributes?.hauteur_tonte_max_cm);
      if (min === null || max === null) {
        return "";
      }
      return `${formatCm(min)} → ${formatCm(max)}`;
    }
    if (field.key === "entity_objectif_arrosage") {
      const phase = entity.attributes?.phase_active;
      return isEmpty(phase) ? "" : `Phase: ${phase}`;
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
    if (!this._config?.show_header) {
      return "";
    }
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);
    const tone = this._cardTone();
    const primaryEntity = this._primaryEntityId();

    return `
      <header class="gi-row gi-action header ${primaryEntity ? "header--clickable" : ""}" data-action-target="primary">
        <div class="gi-row header__title-wrap">
          <div class="header__icon header__icon--${tone}">
            ${this._config.show_icons ? renderIconBox("mdi:grass", "md") : ""}
          </div>
          <div class="header__titles">
            <div class="header__title">${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}</div>
            <div class="header__subtitle">
              ${phase ? escapeHtml(phase) : "Phase non disponible"}
              ${subPhase ? ` · ${escapeHtml(subPhase)}` : ""}
            </div>
          </div>
        </div>

      </header>
    `;
  }

  _buildDecisionBlocks(section = this._activeSection) {
    if (section !== "details" || this._isMinimalMode()) {
      return "";
    }
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    if (!action && !avoid) {
      return "";
    }
    return `
      <section class="decision-grid">
        ${
          action
              ? `<div class="gi-info gi-info--secondary decision decision--action">
                <div class="decision__label">Action recommandée</div>
                <div class="decision__value">${escapeHtml(action)}</div>
              </div>`
            : ""
        }
        ${
          avoid
            ? `<div class="gi-info gi-info--secondary decision decision--avoid">
                <div class="decision__label">Action à éviter</div>
                <div class="decision__value">${escapeHtml(avoid)}</div>
              </div>`
            : ""
        }
      </section>
    `;
  }

  _buildContent() {
    const section = this._isMinimalMode() ? "overview" : this._activeSection;
    const tiles = this._visibleFields(section).map((field) => this._renderTile(field)).filter(Boolean);
    if (tiles.length === 0) {
      return "";
    }
    return `
      <section class="tiles tiles--${section} ${this._config.compact ? "tiles--compact" : ""} ${this._isMinimalMode() ? "tiles--minimal" : ""}">
        ${tiles.join("")}
      </section>
    `;
  }

  _buildFooter(section = this._activeSection) {
    if (section !== "details" || this._isMinimalMode()) {
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

  _render() {
    if (!this.shadowRoot) {
      return;
    }
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
    this._lastRenderSignature = renderSignature;

    const activeTone = this._cardTone();
    const accent = this._config.accent_color || this._accentColorFromTone(activeTone);
    const sectionAccent = this._tabAccent(this._activeTab);
    const background = this._config.show_background ? "true" : "false";
    const backgroundStyle = this._config.background_style || "solid";
    const themeMode = this._config.theme_mode || "auto";
    const numericHeight = asNumber(this._config.card_height);
    const height = numericHeight && numericHeight > 0 ? `${numericHeight}px` : "";
    const borderRadius = `${this._config.border_radius ?? 24}px`;
    const iconSize = `${this._config.icon_size ?? 24}px`;
    const showLegacy = this._canShowLegacyDetails();
    const actionCritical = this._actionTone() === "critical";
    const isPreview = this._isPreviewMode();

    this._applyHostVariables({
      accent,
      activeTone,
      sectionAccent,
      borderRadius,
      iconSize,
      height,
    });

    const rootClass = [
      "card",
      this._config.compact ? "card--compact" : "",
      backgroundStyle ? `card--${backgroundStyle}` : "",
      themeMode ? `card--theme-${themeMode}` : "",
      this._config.use_gradient ? "card--gradient" : "",
      actionCritical ? "card--pulse-critical" : "",
      isPreview ? "card--editor-preview" : "",
    ]
      .filter(Boolean)
      .join(" ");

    this.shadowRoot.innerHTML = `
      <style>
${CARD_STYLES}
      </style>

        <ha-card
          class="gi-card ${rootClass}"
          tabindex="0"
          role="button"
          aria-label="${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}"
          data-background="${background}"
          data-tone="${activeTone}"
          data-action-target="primary"
        >
        ${this._buildHeader()}
        ${this._renderDecisionLayout()}
        ${
          showLegacy
            ? `
              ${this._renderSectionNav()}
              ${this._renderHero()}
              ${this._buildDecisionBlocks()}
              ${this._buildContent()}
              ${this._buildFooter()}
            `
            : ""
        }
      </ha-card>
    `;

    this.shadowRoot.removeEventListener("click", this._onClick);
    this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.removeEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot.removeEventListener("keydown", this._onKeyDown);
    this.shadowRoot.addEventListener("click", this._onClick);
    this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.addEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot.addEventListener("keydown", this._onKeyDown);
  }

  _accentColorFromTone(tone) {
    switch (tone) {
      case "danger":
        return "var(--gazon-danger-color, #c62828)";
      case "warning":
        return "var(--gazon-warning-color, #7e9a3c)";
      case "success":
        return "var(--gazon-success-color, #4f8f3a)";
      case "accent":
        return "var(--gazon-accent-tone-color, #2b8c7c)";
      default:
        return "var(--gazon-success-color, #4f8f3a)";
    }
  }

  _onClick(event) {
    const manualTarget = event.target.closest("[data-gazon-action='manual-irrigation']");
    if (manualTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._triggerManualIrrigation();
      return;
    }
    const tabTarget = event.target.closest("[data-tab]");
    if (tabTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._setActiveTab(tabTarget.dataset.tab);
      return;
    }
    const sectionTarget = event.target.closest("[data-section]");
    if (sectionTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._setActiveSection(sectionTarget.dataset.section);
      return;
    }
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    event.preventDefault();
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null;
      this._performAction(this._config?.tap_action, this._primaryEntityId());
    }, 220);
  }

  _onContextMenu(event) {
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    event.preventDefault();
    this._performAction(this._config?.hold_action, this._primaryEntityId());
  }

  _onDoubleClick(event) {
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    event.preventDefault();
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    this._performAction(this._config?.double_tap_action, this._primaryEntityId());
  }

  _onKeyDown(event) {
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    this._performAction(this._config?.tap_action, this._primaryEntityId());
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
    this._hass.callService(service.domain, service.service, {
      objectif_mm: objective,
    });
  }

  _performAction(action, fallbackEntityId) {
    const normalized = typeof action === "string" ? { action } : action || { action: "none" };
    const actionName = String(normalized.action || "none").toLowerCase();
    const entityId = normalized.entity_id || fallbackEntityId;

    switch (actionName) {
      case "none":
        return;
      case "more-info":
        if (entityId) {
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              detail: { entityId },
              bubbles: true,
              composed: true,
            }),
          );
        }
        return;
      case "call-service": {
        const service = splitServiceName(normalized.service || normalized.service_name);
        if (!service || !this._hass) {
          return;
        }
        this._hass.callService(service.domain, service.service, normalized.service_data || normalized.data || {});
        return;
      }
      case "toggle":
        if (entityId) {
          this.dispatchEvent(
            new CustomEvent("hass-toggle", {
              detail: { entityId },
              bubbles: true,
              composed: true,
            }),
          );
        }
        return;
      case "navigate": {
        const path = normalized.navigation_path || normalized.path || normalized.url;
        if (!path) {
          return;
        }
        if (path.startsWith("http://") || path.startsWith("https://")) {
          window.open(path, "_blank", "noopener");
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-navigate", {
            detail: { path },
            bubbles: true,
            composed: true,
          }),
        );
        return;
      }
      case "url":
        if (normalized.url) {
          window.open(normalized.url, "_blank", "noopener");
        }
        return;
      default:
        return;
    }
  }
}

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
    return GazonIntelligentCard.getStubConfig();
  }

  _entityOptions(domainFilter = null) {
    const entities = Object.entries(this._hass?.states || {})
      .map(([entityId, stateObj]) => ({ entity_id: entityId, stateObj }))
      .filter(({ stateObj }) => {
        if (!domainFilter) {
          return true;
        }
        return domainMatches(stateObj, domainFilter);
      })
      .sort((a, b) => a.entity_id.localeCompare(b.entity_id));
    return entities;
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

    const next = { ...this._config };
    let value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      value = target.value === "" ? "" : Number(target.value);
    } else {
      value = target.value;
    }

    if (value === "" && !["title"].includes(key)) {
      delete next[key];
    } else {
      next[key] = value;
    }

    this._config = normalizeConfig(next);
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _renderInput(field, type = "text", placeholder = "") {
    const value = this._config?.[field] ?? "";
    return `
      <label class="field">
        <span>${escapeHtml(field)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="${type}"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
          ${type === "checkbox" && value ? "checked" : ""}
        />
      </label>
    `;
  }

  _renderCheckbox(field, label) {
    const checked = Boolean(this._config?.[field]);
    return `
      <label class="field field--checkbox">
        <input data-config-key="${escapeHtml(field)}" type="checkbox" ${checked ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }

  _renderEntityInput(field, label, domains = null) {
    const value = this._config?.[field] ?? "";
    const listId = "gazon-intelligent-card-entities";
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          list="${listId}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="sensor.gazon_intelligent_..."
        />
      </label>
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

    const entityOptions = this._entityOptions();
    const idList = entityOptions
      .map(({ entity_id }) => `<option value="${escapeHtml(entity_id)}"></option>`)
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
${EDITOR_STYLES}
      </style>

      <div class="editor">
        <section class="section">
          <h3>Carte</h3>
          <div class="grid">
            <label class="field">
              <span>Titre</span>
              <input data-config-key="title" type="text" value="${escapeHtml(this._config.title || "")}" placeholder="Gazon Intelligent" />
            </label>
            <label class="field">
              <span>Mode de fond</span>
              <select data-config-key="background_style">
                ${["solid", "glass", "minimal"]
                  .map(
                    (option) =>
                      `<option value="${option}" ${this._config.background_style === option ? "selected" : ""}>${option}</option>`,
                  )
                  .join("")}
              </select>
            </label>
            <label class="field">
              <span>Couleur d'accent</span>
              <input data-config-key="accent_color" type="text" value="${escapeHtml(this._config.accent_color || "")}" placeholder="var(--primary-color)" />
            </label>
            <label class="field">
              <span>Mode thème</span>
              <select data-config-key="theme_mode">
                ${["auto", "light", "dark"]
                  .map(
                    (option) =>
                      `<option value="${option}" ${this._config.theme_mode === option ? "selected" : ""}>${option}</option>`,
                  )
                  .join("")}
              </select>
            </label>
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_header", "Afficher l'en-tête")}
            ${this._renderCheckbox("show_icons", "Afficher les icônes")}
            ${this._renderCheckbox("show_background", "Afficher le fond")}
            ${this._renderCheckbox("compact", "Mode compact")}
            ${this._renderCheckbox("minimal_mode", "Mode minimal")}
            ${this._renderCheckbox("show_secondary_info", "Afficher les infos secondaires")}
            ${this._renderCheckbox("use_gradient", "Utiliser un dégradé")}
          </div>
          <div class="row">
            <label class="field">
              <span>Hauteur de carte (px)</span>
              <input data-config-key="card_height" type="number" min="0" step="1" value="${escapeHtml(this._config.card_height || "")}" placeholder="auto" />
            </label>
            <label class="field">
              <span>Taille des icônes (px)</span>
              <input data-config-key="icon_size" type="number" min="16" step="1" value="${escapeHtml(this._config.icon_size ?? 24)}" />
            </label>
          </div>
          <div class="row">
            <label class="field">
              <span>Rayon des bords (px)</span>
              <input data-config-key="border_radius" type="number" min="0" step="1" value="${escapeHtml(this._config.border_radius ?? 24)}" />
            </label>
            <div class="hint">La carte reste compatible avec le thème clair / sombre de Home Assistant.</div>
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_advanced_details", "Afficher les détails avancés")}
          </div>
        </section>

        <section class="section">
          <h3>Décision principale</h3>
          <p>La carte fonctionne même si certaines entités sont absentes. Renseigne au moins les blocs que tu veux afficher.</p>
          <datalist id="gazon-intelligent-card-entities">${idList}</datalist>
          <div class="grid">
            ${this._renderEntityInput("entity_fenetre_optimale", "Fenêtre optimale")}
            ${this._renderEntityInput("entity_plan_arrosage", "Plan d'arrosage")}
            ${this._renderEntityInput("entity_objectif_arrosage", "Objectif d'arrosage")}
            ${this._renderEntityInput("entity_arrosage_recommande", "Arrosage recommandé")}
            ${this._renderEntityInput("entity_dernier_arrosage", "Dernier arrosage détecté")}
            ${this._renderEntityInput("entity_derniere_application", "Dernière application")}
          </div>
        </section>

        <section class="section">
          <h3>Contexte</h3>
          <div class="grid">
            ${this._renderEntityInput("entity_mode", "Mode du gazon")}
            ${this._renderEntityInput("entity_type_arrosage", "Type d'arrosage")}
            ${this._renderEntityInput("entity_risque", "Risque gazon")}
          </div>
        </section>

        <section class="section">
          <h3>Configuration</h3>
          <p>Ces entités alimentent l'onglet Config pour garder une vue rapide sur l'autorisation, les débits et les hauteurs de tonte.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_switch_arrosage_automatique", "Arrosage automatique")}
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
          <p>Ces champs alimentent encore les vues détaillées et les écrans existants si tu actives l'option correspondante.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_phase", "Phase dominante")}
            ${this._renderEntityInput("entity_sous_phase", "Sous-phase")}
            ${this._renderEntityInput("entity_conseil", "Conseil principal")}
            ${this._renderEntityInput("entity_action", "Action recommandée")}
            ${this._renderEntityInput("entity_avoid", "Action à éviter")}
            ${this._renderEntityInput("entity_niveau", "Niveau d'action")}
            ${this._renderEntityInput("entity_tonte", "État de tonte")}
            ${this._renderEntityInput("entity_hauteur", "Hauteur de tonte conseillée")}
          </div>
          <div class="grid">
            ${this._renderEntityInput("manual_action_service", "Service du bouton manuel")}
          </div>
        </section>
      </div>
    `;

    this.shadowRoot.querySelectorAll("[data-config-key]").forEach((element) => {
      element.removeEventListener("input", this._handleInput);
      element.removeEventListener("change", this._handleInput);
      element.addEventListener("input", this._handleInput);
      element.addEventListener("change", this._handleInput);
    });
  }
}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, GazonIntelligentCard);
}

if (!customElements.get(`${CARD_TYPE}-editor`)) {
  customElements.define(`${CARD_TYPE}-editor`, GazonIntelligentCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: "Carte Lovelace pour les décisions de gazon intelligent.",
  });
}

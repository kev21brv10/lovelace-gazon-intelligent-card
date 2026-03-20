export const CARD_STYLES = String.raw`
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

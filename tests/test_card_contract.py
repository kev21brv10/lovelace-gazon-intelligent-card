from __future__ import annotations

from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
MAIN_SRC = (ROOT / "src/gazon-intelligent-card.js").read_text(encoding="utf-8")
LAYOUT_SRC = (ROOT / "src/renderers/layout.js").read_text(encoding="utf-8")
FORMATTERS_SRC = (ROOT / "src/utils/formatters.js").read_text(encoding="utf-8")
CONSTANTS_SRC = (ROOT / "src/constants.js").read_text(encoding="utf-8")
VALIDATE_SRC = (ROOT / "scripts/validate.py").read_text(encoding="utf-8")


def extract_function_body(source: str, function_name: str) -> str:
    match = re.search(rf"function\s+{re.escape(function_name)}\([^)]*\)\s*\{{(?P<body>.*?)\n\}}", source, re.S)
    if not match:
        match = re.search(rf"{re.escape(function_name)}\([^)]*\)\s*\{{(?P<body>.*?)\n  \}}", source, re.S)
    if not match:
        raise AssertionError(f"Could not find {function_name} in source")
    return match.group("body")


class CardContractTests(unittest.TestCase):
    def test_minimal_public_contract_is_explicit(self):
        self.assertIn("export const MINIMAL_PUBLIC_CONTRACT_ENTITY_KEYS =", CONSTANTS_SRC)
        for key in (
            "entity_assistant",
            "entity_prochain_arrosage",
            "entity_prochaine_tonte",
            "entity_prochaine_intervention",
            "entity_signal_irrigation",
            "entity_signal_intervention",
        ):
            self.assertIn(f'"{key}"', CONSTANTS_SRC)
        self.assertIn("export const MINIMAL_PUBLIC_CONTRACT_REQUIRED_ATTRIBUTES =", CONSTANTS_SRC)

    def test_validate_script_locks_minimal_contract_and_release_discipline(self):
        self.assertIn("MINIMAL_PUBLIC_CONTRACT_ENTITY_KEYS", VALIDATE_SRC)
        self.assertIn("MINIMAL_PUBLIC_CONTRACT_REQUIRED_ATTRIBUTES", VALIDATE_SRC)
        self.assertIn('ensure_readme_section(readme, "## 🧩 Exemple minimal")', VALIDATE_SRC)
        self.assertIn('ensure_readme_section(readme, "## 🧱 Exemple YAML complet")', VALIDATE_SRC)
        self.assertIn('ensure_readme_section(readme, "## ⚙️ Options principales")', VALIDATE_SRC)
        self.assertIn('ensure_readme_section(readme, "## 🧪 Développement")', VALIDATE_SRC)
        self.assertIn('bundle + sources ensemble', VALIDATE_SRC)

    def test_irrigation_signal_never_uses_binary_sensor_state_as_action_label(self):
        body = extract_function_body(MAIN_SRC, "_irrigationSignalState")
        self.assertIn("formatIrrigationSignalLabel", body)
        self.assertIn("formatIrrigationSignalTone", body)
        self.assertNotIn("formatStatusLabel(entity?.state)", body)

    def test_layout_signal_presentation_does_not_promote_raw_on_state(self):
        body = extract_function_body(LAYOUT_SRC, "renderInterventionTab")
        self.assertIn("formatIrrigationSignalLabel", body)
        self.assertIn("formatIrrigationSignalTone", body)
        self.assertNotIn('state === "on"', body)

    def test_mower_ambiguity_label_is_explicit(self):
        self.assertIn(
            'ambiguous: "Tondeuse ambiguë: plusieurs robots détectés, configuration requise"',
            FORMATTERS_SRC,
        )
        self.assertIn('configured_missing: "Tondeuse configurée introuvable"', FORMATTERS_SRC)
        self.assertIn('missing: "Tondeuse manquante"', FORMATTERS_SRC)

    def test_mower_state_sanitizes_sentinel_display_values(self):
        body = extract_function_body(MAIN_SRC, "_mowerState")
        self.assertIn("normalizeOptionalDisplayValue", body)
        self.assertIn("const nextDeparture = normalizeOptionalDisplayValue(", body)
        self.assertIn("const reason = normalizeOptionalDisplayValue(", body)
        self.assertIn("let presenceLabel = normalizeOptionalDisplayValue(", body)

    def test_recommendation_state_is_non_actionable(self):
        self.assertIn('return "Recommandée"', FORMATTERS_SRC)
        self.assertIn('return "Non requise"', FORMATTERS_SRC)

    def test_tonte_contract_exposes_explicit_clarity_flags(self):
        self.assertIn("gazon_permet_tonte", MAIN_SRC)
        self.assertIn("machine_permet_tonte", MAIN_SRC)
        self.assertIn("action_possible", MAIN_SRC)
        # Le rendu de l'onglet Tonte (gz2) vit dans layout.js.
        self.assertIn("Gazon permet la tonte", LAYOUT_SRC)
        self.assertIn('label: "Machine"', LAYOUT_SRC)
        self.assertIn('label: "Action"', LAYOUT_SRC)

    def test_products_tab_exposes_application_history(self):
        self.assertIn("application_history", MAIN_SRC)
        self.assertIn("renderApplicationHistoryItems", LAYOUT_SRC)
        self.assertIn("Dernière application", LAYOUT_SRC)

    def test_overview_proposal_keeps_blocked_mowing_as_in_progress(self):
        body = extract_function_body(MAIN_SRC, "_overviewProposal")
        self.assertIn('assistant.status === "blocked" && assistant.action === "tonte"', body)
        self.assertIn('title = "Tonte en cours";', body)
        self.assertIn('title = "Tonte possible";', body)

    def test_mowing_tab_exposes_decision_and_machine_state(self):
        # Onglet Tonte réécrit en gz2 (layout.js) : doit exposer la décision,
        # l'état machine et la distinction « Coordination désactivée ».
        body = extract_function_body(LAYOUT_SRC, "renderMowingTab")
        self.assertIn("mowingDecisionPills", body)
        self.assertIn("mowingSummaryItems", body)
        self.assertIn("coordinationDisabled", body)
        self.assertIn("Coordination désactivée", body)

    def test_mowing_tab_summary_prefers_hard_block_reason(self):
        body = extract_function_body(LAYOUT_SRC, "renderMowingTab")
        self.assertIn('mowingBlock.blocked', body)
        self.assertIn('mowingBlock.reasonDetail || mowingBlock.detail || mowerState.reason || "Tonte bloquée par conditions."', body)

    def test_overview_prioritizes_irrigation_block_before_passive_mowing_states(self):
        body = extract_function_body(MAIN_SRC, "_overviewProposal")
        irrigation_idx = body.index('else if (irrigationSignal.reasonKind === "blocked")')
        mowing_busy_idx = body.index('else if (mowingBusy)')
        assistant_mowing_idx = body.index('else if (assistant.status === "blocked" && assistant.action === "tonte")')
        self.assertLess(irrigation_idx, mowing_busy_idx)
        self.assertLess(irrigation_idx, assistant_mowing_idx)
        self.assertIn('nextMowingBlockReason.startsWith("phase_")', body)

    def test_missing_entities_keep_strict_readable_fallbacks(self):
        entity_state_body = extract_function_body(MAIN_SRC, "_entityState")
        next_mowing_body = extract_function_body(MAIN_SRC, "_nextMowingState")
        self.assertIn('_entityState(entityKey, fallback = "Non disponible")', MAIN_SRC)
        self.assertIn("return fallback;", entity_state_body)
        self.assertIn('label: "À estimer"', next_mowing_body)
        self.assertIn('detail: mowingBlock.reasonLabel || mowerState.reason || "Aucune fenêtre de tonte calculée"', next_mowing_body)

    def test_compact_decision_text_sanitizes_technical_hints(self):
        self.assertIn("export function sanitizePublicDecisionText(value)", FORMATTERS_SRC)
        compact_body = extract_function_body(FORMATTERS_SRC, "compactDecisionText")
        self.assertIn("const text = sanitizePublicDecisionText(value);", compact_body)
        self.assertIn("meteo[_a-z0-9-]*", FORMATTERS_SRC)
        self.assertIn("espacement=", FORMATTERS_SRC)


if __name__ == "__main__":
    unittest.main()

from __future__ import annotations

from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
MAIN_SRC = (ROOT / "src/gazon-intelligent-card.js").read_text(encoding="utf-8")
LAYOUT_SRC = (ROOT / "src/renderers/layout.js").read_text(encoding="utf-8")
FORMATTERS_SRC = (ROOT / "src/utils/formatters.js").read_text(encoding="utf-8")


def extract_function_body(source: str, function_name: str) -> str:
    match = re.search(rf"function\s+{re.escape(function_name)}\([^)]*\)\s*\{{(?P<body>.*?)\n\}}", source, re.S)
    if not match:
        match = re.search(rf"{re.escape(function_name)}\(\)\s*\{{(?P<body>.*?)\n  \}}", source, re.S)
    if not match:
        raise AssertionError(f"Could not find {function_name} in source")
    return match.group("body")


class CardContractTests(unittest.TestCase):
    def test_irrigation_signal_never_uses_binary_sensor_state_as_action_label(self):
        body = extract_function_body(MAIN_SRC, "_irrigationSignalState")
        self.assertIn("formatIrrigationSignalLabel", body)
        self.assertIn("formatIrrigationSignalTone", body)
        self.assertNotIn("formatStatusLabel(entity?.state)", body)

    def test_layout_signal_presentation_does_not_promote_raw_on_state(self):
        body = extract_function_body(LAYOUT_SRC, "getDerivedSignalPresentation")
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

    def test_recommendation_state_is_non_actionable(self):
        self.assertIn('return "Recommandée"', FORMATTERS_SRC)
        self.assertIn('return "Non requise"', FORMATTERS_SRC)

    def test_tonte_contract_exposes_explicit_clarity_flags(self):
        self.assertIn("gazon_permet_tonte", MAIN_SRC)
        self.assertIn("machine_permet_tonte", MAIN_SRC)
        self.assertIn("action_possible", MAIN_SRC)
        self.assertIn("Gazon permet la tonte", MAIN_SRC)
        self.assertIn('label: "Machine"', MAIN_SRC)
        self.assertIn("Action possible", MAIN_SRC)

    def test_overview_proposal_keeps_blocked_mowing_as_in_progress(self):
        body = extract_function_body(MAIN_SRC, "_overviewProposal")
        self.assertIn('assistant.status === "blocked" && assistant.action === "tonte"', body)
        self.assertIn('title = "Tonte en cours";', body)
        self.assertIn('title = "Tonte possible";', body)

    def test_mowing_tab_header_reflects_busy_mower(self):
        body = extract_function_body(MAIN_SRC, "_renderMowingTab")
        self.assertIn('const assistant = this._assistantState();', body)
        self.assertIn('const mowingBusy = assistant.status === "blocked" && assistant.action === "tonte"', body)
        self.assertIn('const mowingImpossibleReason = assistant.status === "blocked" && assistant.action === "tonte"', body)
        self.assertIn('const mowingHeaderValue = mowingBusy', body)
        self.assertIn('"Tonte impossible"', body)
        self.assertIn('"Tonte en cours"', body)
        self.assertIn('const machineStateLabel = mowingBusy', body)


if __name__ == "__main__":
    unittest.main()

"""Contract tests for the monolithic gazon-intelligent-card.

These tests verify behavioural invariants and structural guarantees of the
monolithic card. They run against the source files directly
and are intentionally lightweight — no DOM, no JS runtime needed.
"""
from __future__ import annotations

from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
MAIN_SRC      = (ROOT / "src/gazon-intelligent-card.js").read_text(encoding="utf-8")
VALIDATE_SRC  = (ROOT / "scripts/validate.py").read_text(encoding="utf-8")
README_SRC    = (ROOT / "README.md").read_text(encoding="utf-8")


class CardStructureTests(unittest.TestCase):
    """The card must expose the mandatory Lovelace web-component API."""

    def test_custom_element_is_registered(self):
        self.assertIn("customElements.define", MAIN_SRC)

    def test_window_custom_cards_is_declared(self):
        self.assertIn("window.customCards", MAIN_SRC)

    def test_set_config_is_present(self):
        self.assertIn("setConfig(", MAIN_SRC)

    def test_set_hass_is_present(self):
        self.assertIn("set hass(", MAIN_SRC)

    def test_connected_callback_is_present(self):
        self.assertIn("connectedCallback()", MAIN_SRC)

    def test_visual_editor_is_exposed(self):
        # HA requires getConfigElement() or getConfigForm() for visual editing.
        has_element = "getConfigElement" in MAIN_SRC
        has_form    = "getConfigForm"    in MAIN_SRC
        self.assertTrue(has_element or has_form,
                        "Card must expose getConfigElement() or getConfigForm()")

    def test_get_layout_options_is_present(self):
        # Required for grid-layout resize support.
        self.assertIn("getLayoutOptions", MAIN_SRC)

    def test_get_stub_config_is_present(self):
        self.assertIn("getStubConfig", MAIN_SRC)


class TabRenderingTests(unittest.TestCase):
    """All 6 tabs must be implemented."""

    def test_tab_synthese(self):
        self.assertIn("_tab_synthese", MAIN_SRC)

    def test_tab_arrosage(self):
        self.assertIn("_tab_arrosage", MAIN_SRC)

    def test_tab_tonte(self):
        self.assertIn("_tab_tonte", MAIN_SRC)

    def test_tab_gazon(self):
        self.assertIn("_tab_gazon", MAIN_SRC)

    def test_tab_produits(self):
        self.assertIn("_tab_produits", MAIN_SRC)

    def test_tab_reglages(self):
        self.assertIn("_tab_reglages", MAIN_SRC)


class SyntheseTabContractTests(unittest.TestCase):
    """Synthèse tab must expose the key decision-surface data."""

    def test_action_icons_map_is_present(self):
        self.assertIn("ACTION_ICONS", MAIN_SRC)

    def test_canicule_detection(self):
        self.assertIn("canicule", MAIN_SRC)

    def test_hero_tone_variants(self):
        # Hero must support at least warn and danger tones.
        self.assertIn("warn", MAIN_SRC)
        self.assertIn("danger", MAIN_SRC)

    def test_reserve_mini_bar(self):
        self.assertIn("stat-mini-bar", MAIN_SRC)

    def test_risk_stat_card_colored(self):
        self.assertIn("risk-", MAIN_SRC)

    def test_tonte_clarity_flags_are_read(self):
        # The card must read the explicit tonte-clarity flags from the assistant.
        self.assertIn("gazon_permet_tonte", MAIN_SRC)
        self.assertIn("machine_permet_tonte", MAIN_SRC)

    def test_auto_status_in_hero(self):
        self.assertIn("auto_on", MAIN_SRC)
        self.assertIn("auto_off", MAIN_SRC)

    def test_context_pills(self):
        self.assertIn("ctx-pill", MAIN_SRC)
        self.assertIn("ET₀", MAIN_SRC)


class I18nTests(unittest.TestCase):
    """Card must support FR and EN."""

    def test_strings_object_has_fr_and_en(self):
        self.assertIn("const STRINGS = {", MAIN_SRC)
        self.assertIn("fr:", MAIN_SRC)
        self.assertIn("en:", MAIN_SRC)

    def test_translation_helper_present(self):
        self.assertIn("_t(", MAIN_SRC)
        self.assertIn("_lblt(", MAIN_SRC)


class ValidateScriptTests(unittest.TestCase):
    """scripts/validate.py must enforce the right invariants."""

    def test_hacs_checks_present(self):
        self.assertIn("hacs.json", VALIDATE_SRC)
        self.assertIn("content_in_root", VALIDATE_SRC)
        self.assertIn("iot_class", VALIDATE_SRC)

    def test_bundle_integrity_check_present(self):
        self.assertIn("gz_text != dist_text", VALIDATE_SRC)

    def test_readme_sections_enforced(self):
        self.assertIn('"## 🧩 Exemple minimal"', VALIDATE_SRC)
        self.assertIn('"## 🧱 Exemple YAML complet"', VALIDATE_SRC)
        self.assertIn('"## 🧪 Développement"', VALIDATE_SRC)

    def test_bundle_and_sources_discipline_enforced(self):
        self.assertIn("bundle + sources ensemble", VALIDATE_SRC)


class ReadmeTests(unittest.TestCase):
    """README must document the required sections and config keys."""

    def test_required_sections_present(self):
        for heading in (
            "## 🧩 Exemple minimal",
            "## 🧱 Exemple YAML complet",
            "## 🧪 Développement",
        ):
            self.assertIn(heading, README_SRC, f"README missing section: {heading}")

    def test_local_resource_path_documented(self):
        self.assertIn("/local/gazon-intelligent-card/gazon-intelligent-card.js", README_SRC)

    def test_complete_yaml_has_type_and_zones(self):
        yaml_match = re.search(
            r"## 🧱 Exemple YAML complet[\s\S]*?```yaml\n(?P<body>.*?)\n```",
            README_SRC,
            re.S,
        )
        self.assertIsNotNone(yaml_match, "README must contain a complete YAML example")
        body = yaml_match.group("body")
        self.assertIn("type:", body)
        self.assertIn("zones:", body)
        self.assertIn("entity_assistant:", body)

    def test_hacs_install_instructions_present(self):
        self.assertIn("HACS", README_SRC)
        self.assertIn("hacsfiles", README_SRC)


if __name__ == "__main__":
    unittest.main()

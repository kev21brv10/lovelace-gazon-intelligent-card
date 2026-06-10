# CLAUDE.md — Spécifique Lovelace Gazon Intelligent Card

> La discipline Git/PR/releases **générique** (branches, Conventional Commits,
> squash merge, SemVer, hygiène, « push sur demande », « tout push = release »)
> vit dans le `CLAUDE.md` global (`~/.claude/CLAUDE.md`).
> Ce fichier ne couvre que le **spécifique à ce projet**.

## Protection de `main` (ce repo)

- PR obligatoire · 0 approbation requise (dépôt solo) · historique linéaire · résolution des conversations requise.
- **1 status check CI bloquant** : `validate` (workflow **Validate**).

## Releases

- Source de vérité de la version : `package.json` (ne jamais inventer un numéro dans les textes).
- Après merge sur `main` : tag `vx.y.z` + release GitHub.
- Mettre à jour la version affichée dans le `README.md` si présente (le badge suit le tag).

## Qualité

- Avant toute PR : `python3 scripts/build.py` puis `python3 scripts/validate.py` doivent passer
  (c'est ce que fait le check CI `validate`).
- L'artefact buildé `gazon-intelligent-card.js` est régénéré par le build — ne pas l'éditer à la main.

## Outillage / CI

- CI : workflow **Validate** (`.github/workflows/validate.yml`) — build + validate, sur chaque push et PR.
- Release : workflow `release.yml`.

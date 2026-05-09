# Claude Instructions

This repository uses Claude Code as a development agent.

## Project context

Project name: Blind Horizon

Purpose:
Blind Horizon is a scenario-based tactical RTS/.io prototype about controlling regional military theatres through territory, sensor coverage, tactical missiles, naval power, air power, and supply routes. The first MVP focuses on a fictional Strait Control scenario.

Tech stack:
TypeScript, Phaser, Vite, npm

Active entry point:
npm run dev

Files or folders Claude should avoid unless explicitly asked:
- node_modules/
- dist/
- build/
- .env
- .env.local
- package-lock.json, unless dependency changes are required
- generated assets or cache folders

---

## Working rules

- Propose a short plan before editing files.
- Work in small, focused changes.
- Change only files related to the task.
- Do not expose secrets, API keys, tokens, or credentials.
- Do not commit `.env`, generated outputs, cache folders, or local config.
- Update README when user-facing behavior changes.
- Update roadmap or notes when project direction changes.
- Prefer readable code over clever code.
- Avoid over-engineering.
- Do not implement multiplayer unless explicitly requested.
- Do not add new dependencies unless clearly justified.
- Keep gameplay changes focused on one prototype slice at a time.

---

## Git workflow

Use this workflow:

1. Work on a feature branch.
2. Make one focused change.
3. Run relevant checks or manual tests.
4. Summarize what changed.
5. Suggest a clear commit message.
6. Wait for user approval before committing unless explicitly told otherwise.

---

## Verification

Recommended verification commands:

```bash
npm run dev
npm audit

If no automated tests exist, explain what was manually checked.

---

## Review checklist

Before finalizing a task, check:

Does the change solve the requested task?
Are unrelated files untouched?
Are secrets protected?
Is documentation updated if needed?
Is the code readable and maintainable?
Are the recommended verification commands still working?
Is the change limited to the requested scope?
Does the change avoid premature multiplayer, account systems, or large architecture rewrites?
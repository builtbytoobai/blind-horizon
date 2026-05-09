# Agent Workflow

This file describes how AI agents should support this project.

---

## Roles

### Claude Code

Claude Code is the builder and implementation agent.

Use Claude for:

- reading the repo
- proposing implementation plans
- editing files
- creating focused changes
- helping with GitHub Issues and Pull Requests
- suggesting commit messages
- identifying files likely affected by a task

Claude must propose a plan before editing files.

Claude should not make broad, uncontrolled changes.

### ChatGPT

ChatGPT is the architecture, product, and roadmap reviewer.

Use ChatGPT for:

- reviewing Claude's plan before implementation
- checking architecture decisions
- identifying risks
- challenging scope
- reviewing roadmap fit
- avoiding over-engineering
- improving GitHub Issues before Claude implements them

### Gemini

Gemini is the second-opinion reviewer for UX, usefulness, product clarity, onboarding, and alternative perspectives.

Use Gemini for:

- UX perspective
- product usefulness
- onboarding clarity
- beginner friendliness
- what might confuse players
- alternative product directions
- whether the game concept feels understandable

---

## Standard flow

1. Create a clear GitHub Issue.
2. Ask Claude Code for a plan.
3. Review the plan with ChatGPT if the change is important.
4. Ask Gemini for product/UX second opinion if relevant.
5. Approve Claude to implement one focused change.
6. Test locally.
7. Review the diff.
8. Commit and push.
9. Open PR.
10. Review.
11. Merge only after human approval.

---

## Project-specific rule

Blind Horizon should be developed in small vertical slices.

Do not ask Claude to “build the game.”

Ask Claude to implement one focused prototype slice at a time.

Good examples:

- Add static Strait Control map background
- Add strategic objective markers
- Add basic Command Power display
- Add radar coverage visualization
- Add simple missile targeting prototype

Bad examples:

- Build all gameplay systems
- Add full multiplayer
- Implement the entire bot AI
- Build all future scenarios
- Add complete game balance

---

## Rule

AI tools assist.

The user decides.
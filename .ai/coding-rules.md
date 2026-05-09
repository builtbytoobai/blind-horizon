# Coding Rules

## General rules

- Keep changes small and reviewable.
- Prefer clear code over clever code.
- Avoid unrelated refactors.
- Do not introduce unnecessary dependencies.
- Do not hardcode secrets.
- Keep generated files out of Git unless explicitly needed.
- Do not implement multiple unrelated gameplay systems in one PR.
- Prefer simple prototype code over premature abstractions.

## Game prototype rules

- Build one focused gameplay slice at a time.
- Keep the first MVP centered on Strait Control.
- Do not add multiplayer until the local prototype proves the core loop.
- Do not add accounts, matchmaking, ranked mode, or backend services yet.
- Do not add real-world countries or political factions in the MVP.
- Prioritize readable player feedback over realism.
- Every powerful mechanic should have counterplay.
- Missiles should require vision, detection, or confirmation logic.
- Avoid large unit rosters until the core loop works.

## Documentation rules

Update README when:

- setup changes
- user-facing behavior changes
- commands change
- new features are added

Update `docs/game-design.md` or project notes when:

- project direction changes
- a major feature is completed
- future plans change
- MVP scope changes

## Git rules

Use clear commit messages.

Good examples:

```txt
Initialize project setup
Add game design document
Add Strait Control map draft
Add objective marker prototype
Add radar coverage visualization
```

Avoid vague messages:

```txt
update
fix
stuff
changes
```

## Security rules

Never commit:

```txt
.env
API keys
tokens
passwords
private credentials
local cache folders
```

Use `.env.example` for placeholders only.

## Dependency rules

- Do not add new dependencies unless the task clearly requires it.
- Prefer Phaser, TypeScript, and built-in browser capabilities first.
- If a dependency is added, explain why it is needed.
- Run `npm audit` after dependency changes.
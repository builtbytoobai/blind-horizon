# Project Brief

## Project name

Blind Horizon

## Purpose

Blind Horizon is a scenario-based tactical RTS/.io prototype where players fight for control of regional military theatres through territory, sensor coverage, tactical missiles, naval power, air power, and supply routes.

The first MVP focuses on a fictional Strait Control scenario: a naval chokepoint where ports, radar, missile coverage, airfields, sea lanes, and strategic objectives determine control of the theatre.

## Target user

Players who enjoy:

- OpenFront.io-style territorial strategy
- Risk-style map control
- simple real-time strategy games
- military/geopolitical strategy themes
- tactical decisions without heavy micromanagement

The game should be understandable quickly, but gain depth through positioning, intel, radar coverage, missile timing, naval pressure, and objective control.

## Problem this solves

Many territory strategy games focus mainly on expansion, economy, or diplomacy.

Blind Horizon explores a more tactical version of the genre where information, range, detection, and regional objectives matter as much as raw expansion.

The goal is to create a fast, readable browser strategy game where the player wins by controlling the theatre, not by managing a full grand-strategy simulation.

## Current status

- [ ] Idea
- [x] Prototype
- [ ] Working MVP
- [ ] Public repo
- [ ] Product candidate

## Tech stack

- TypeScript
- Phaser
- Vite
- npm

## Important decisions

- The first MVP should focus on one scenario: Strait Control.
- The prototype should start as local singleplayer with a simple bot, not multiplayer.
- Missiles should be regular tactical tools, not rare endgame superweapons.
- The core design rule is: no vision, no precision strike.
- The first resource model should use one main resource: Command Power.
- The first MVP should prioritize readability and counterplay over realism.

## Out of scope for now

- Online multiplayer
- Accounts
- Matchmaking
- Real-world countries
- Diplomacy
- Nukes
- Carriers
- Submarines
- Complex logistics
- Tech trees
- Ranked mode
- Modding
- Mobile-first UI
- Multiple scenarios
- Campaign mode

## Success criteria

This project is successful when:

- The local prototype runs reliably with `npm run dev`.
- The first Strait Control scenario demonstrates a fun territory + radar + missile + naval control loop.
- The player can understand why they win, lose, detect targets, or get hit.
- Missiles feel tactical rather than unfair.
- Fog of war creates interesting decisions without becoming frustrating.
- The MVP remains small enough to develop through focused Issues and Pull Requests.

- [Success criterion 1]
- [Success criterion 2]
- [Success criterion 3]
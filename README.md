# Blind Horizon

Blind Horizon is a scenario-based tactical RTS/.io prototype about controlling regional military theatres through territory, sensor coverage, tactical missiles, naval power, air power, and supply routes.

The first prototype focuses on a fictional strait-control scenario where two forces fight over ports, radar coverage, missile sites, sea lanes, and strategic objectives.

## Current status

Early prototype setup.

The project currently contains:

- Phaser + TypeScript + Vite project scaffold
- Initial game design direction
- AI-assisted development workflow files
- Local development setup

Gameplay implementation has not started yet.

## Core concept

Blind Horizon is not a global conquest game.

It is a fast tactical theatre-control game where each map represents a regional military problem.

The first scenario is:

## Strait Control

A fictional naval chokepoint scenario inspired by modern regional conflict dynamics.

The player must use:

- territory control
- radar and reconnaissance
- tactical missile batteries
- ports and warships
- airfields
- air defense
- strategic objectives

The main design rule is:

> No vision, no precision strike.

The player should not be able to precisely hit targets they cannot detect, track, or confirm.

## MVP scope

The first MVP should include:

- 1 scenario: Strait Control
- 2 factions
- local singleplayer
- simple bot opponent
- territory expansion
- Command Power resource
- fog of war
- radar stations
- missile batteries
- ports
- warships
- airfields
- recon aircraft
- SAM / air defense
- 5 strategic objectives
- one clear win condition

## Out of scope for now

The first prototype should not include:

- online multiplayer
- accounts
- matchmaking
- real-world countries
- diplomacy
- nukes
- carriers
- submarines
- complex logistics
- tech trees
- ranked mode
- modding
- mobile-first UI
- multiple scenarios
- campaign mode

## Tech stack

- TypeScript
- Phaser
- Vite
- npm

## Local development

Install dependencies:

```bash
npm install
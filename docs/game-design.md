# Blind Horizon — Game Design Document v0.1

## Status

This document captures the agreed product direction and first MVP sketch for Blind Horizon.

It is intentionally focused on concept, game design, and scope. It does not define repo setup, code architecture, file structure, or implementation tasks yet.

---

# 1. Project Vision

## Working title

**Blind Horizon**

## One-line pitch

**Blind Horizon is a scenario-based tactical RTS/.io game where players fight for control of regional theatres through territory, sensor coverage, missiles, naval power, air power, and supply routes.**

## Core idea

Blind Horizon is not a global conquest game first.

It is a fast tactical theatre-control game where each map represents a regional military problem with its own strategic identity.

Examples:

- A naval chokepoint where sea lanes and blockade matter
- A forested land region where fog of war and intelligence matter
- An island chain where airfields, radar, and naval projection matter
- A mountain pass where terrain and supply constraints matter

The long-term vision is a game where each scenario teaches a different tactical/strategic problem while keeping the controls simple and readable.

## Product position

Blind Horizon should feel like:

- OpenFront-style territory expansion
- modern sensor and missile warfare
- regional tactical scenarios
- fast, readable browser strategy

It should not become:

- a hardcore military simulator
- a slow grand strategy game
- a complex tech-tree game
- a clone of OpenFront with extra weapons

---

# 2. Target Player

The target player likes:

- OpenFront.io
- Risk-style territorial strategy
- simple real-time strategy games
- military/geopolitical strategy themes
- tactical decision-making without heavy micro-management

The game should be easy to understand quickly, but gain depth through:

- radar placement
- missile timing
- naval positioning
- fog of war
- air defense coverage
- objective control
- supply and sea lane pressure

---

# 3. Core Fantasy

The player does not simply control a country.

The player commands a regional military operation.

The player must:

1. Discover the enemy
2. Control key terrain or sea areas
3. Protect important bases and routes
4. Use radar and reconnaissance to create targeting opportunities
5. Use tactical missiles as regular tools
6. Defend against enemy strikes
7. Win control of the theatre

Core fantasy statement:

> See first. Strike precisely. Defend intelligently. Control the theatre.

---

# 4. Design Pillars

## 4.1 Readability over realism

The game may use military concepts, but the player must always understand why something happened.

The game should clearly communicate:

- where threats are coming from
- why a missile can or cannot hit a target
- whether a target is unknown, detected, or confirmed
- what air defense is protecting
- why an objective is being won or lost

## 4.2 Counterplay before more weapons

Every powerful action needs a clear response.

Examples:

- Missiles require target information and can be weakened by air defense
- Ships can control sea lanes but are vulnerable to coastal missile coverage
- Radar enables strikes but can itself be attacked
- Airfields enable reconnaissance but can be suppressed
- Objectives create pressure but can be contested

## 4.3 Tactical missiles, not superweapons

Missiles are ordinary tactical tools, not rare endgame nukes.

They should be useful for:

- damaging ships
- disabling radar
- disrupting ports
- striking airfields
- contesting objectives
- punishing exposed forces

They should be limited by:

- vision requirements
- reload time
- range
- cost
- interception chance
- target movement

## 4.4 Regional theatre identity

Each map should have a clear tactical identity.

The first MVP focuses on a naval chokepoint.

Future scenarios may focus on:

- forest reconnaissance warfare
- island-chain air/naval projection
- mountain-pass breakthrough operations
- desert logistics and long-range strikes

---

# 5. Core Gameplay Loop

```txt
Expand territory
→ build radar / ports / missile sites / airfields
→ scout enemy movement
→ confirm targets
→ launch tactical strikes
→ defend against counter-strikes
→ contest objectives
→ win the theatre
```

The most important rule:

## No vision, no precision strike.

The player cannot precisely hit targets they cannot see, detect, or confirm.

---

# 6. Intelligence and Fog of War

Blind Horizon should use three information states.

## 6.1 Unknown

The player has no useful information about this area.

## 6.2 Detected

The player knows something is happening, but does not have a precise target.

Examples:

- Enemy naval contact detected
- Air contact detected
- Missile launch detected
- Ground movement detected

## 6.3 Confirmed

The player has enough information to target accurately.

Examples:

- Enemy warship confirmed
- Enemy radar station confirmed
- Enemy missile battery confirmed
- Enemy airfield confirmed

Confirmed targets can be attacked with tactical missiles or air strikes, depending on range and available assets.

---

# 7. Resources

## MVP resource model

Use one primary resource:

**Command Power**

Command Power is generated by:

- controlled territory
- ports
- strategic objectives
- supply routes / sea lanes

Command Power is spent on:

- radar stations
- missile batteries
- airfields
- warships
- recon missions
- missile launches
- defensive systems

Reason for one-resource MVP:

- easier to understand
- easier to balance
- less UI complexity
- faster to prototype

---

# 8. First MVP Scenario

# Strait Control

## Scenario concept

A fictional regional strait inspired by real-world naval chokepoints.

Two opposing forces fight to control a narrow sea passage, nearby coastlines, ports, islands, and military sites.

The goal is not to conquer the whole world.

The goal is to control the decisive parts of the theatre.

## Scenario fantasy

One side attempts to keep the passage open.

The other side attempts to deny access through blockade, coastal missiles, radar coverage, naval pressure, and air operations.

For the MVP, the factions can be symmetrical to simplify balance.

---

# 9. Strait Control — Scenario Design v0.1

## 9.1 Design goal

Strait Control should teach the player the core Blind Horizon idea:

> Control depends on what you can see, what you can threaten, what you can defend, and which objectives you can hold.

The scenario should make naval control feel important without making land irrelevant.

## 9.2 Map layout — initial proposal

The map is a rectangular regional theatre with land on the north and south edges and a narrow sea passage through the center.

Suggested layout:

```txt
[Northern Coast]
- northern base
- northern port
- radar hill
- coastal missile site

[Central Strait]
- western sea approach
- central sea lane objective
- radar island
- eastern sea exit

[Southern Coast]
- southern base
- southern port
- airfield zone
- coastal missile site
```

The map should include:

- 2 starting bases
- 2 main ports
- 1 central sea lane
- 1 small island or island chain
- 2 coastal missile areas
- 1 or 2 radar high-ground locations
- enough land territory to expand, but not so much that sea control becomes irrelevant

## 9.3 The 5 strategic objectives — initial proposal

The first version should use 5 objectives:

1. **North Port**
   - Controls northern naval production and supply pressure.

2. **South Port**
   - Controls southern naval production and supply pressure.

3. **Central Sea Lane**
   - Represents control of the strait itself.
   - Should be the most contested objective.

4. **Radar Island**
   - Provides strong detection coverage over the central strait.
   - Important for missile targeting.

5. **Coastal Missile Site**
   - Provides anti-ship strike pressure over part of the strait.
   - Useful but vulnerable if isolated.

## 9.4 Victory condition — initial proposal

Primary MVP victory condition:

**Control 3 of 5 strategic objectives for 5 continuous minutes.**

Why this works:

- easy to understand
- creates clear pressure
- avoids requiring total conquest
- encourages tactical movement
- makes objectives matter

---

# 10. Player Actions in Strait Control

The MVP should focus on a small number of clear actions.

## 10.1 Expand territory

The player can expand from controlled land into adjacent neutral or enemy territory.

## 10.2 Build radar station

Radar increases detection coverage.

Radar can reveal:

- ship movement
- air contacts
- missile launches
- possible enemy structures

## 10.3 Build missile battery

Missile batteries can strike confirmed targets within range.

Targets may include:

- warships
- ports
- radar stations
- airfields
- missile sites
- objective zones

## 10.4 Build or use port

Ports enable naval activity.

Ports may allow:

- producing warships
- controlling sea lanes
- generating Command Power
- supporting blockade or convoy logic later

## 10.5 Deploy warship

Warships are used for:

- contesting sea lanes
- attacking enemy ships
- blockading enemy ports
- escorting friendly naval routes
- pressuring coastal objectives

In the MVP, warships should use simple commands and not require heavy micro-management.

## 10.6 Build airfield

Airfields enable air operations.

First MVP air operations should be simple:

- recon mission
- strike mission
- patrol mission, optional

## 10.7 Launch recon mission

Recon missions help move information from unknown or detected to confirmed.

## 10.8 Launch tactical missile strike

Missile strike should require:

- available missile battery
- target in range
- sufficient Command Power or ammunition
- target detected or confirmed, depending on strike type

Precision strikes should require confirmed targets.

## 10.9 Build air defense / SAM

Air defense protects against:

- recon aircraft
- strike aircraft
- some missile attacks

It should reduce risk, not create total immunity.

---

# 11. MVP Scope

## Include in first prototype

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

## Out of scope for first prototype

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

---

# 12. Known Design Risks

## Risk: Missiles feel unfair

Mitigations:

- require vision
- show warning indicators
- show missile trajectory or launch alert
- allow air defense counterplay
- use cooldowns and reloads

## Risk: Fog of war feels frustrating

Mitigations:

- clearly show unknown, detected, and confirmed states
- give useful alerts
- make radar coverage visible
- avoid invisible one-shot kills

## Risk: Naval gameplay feels secondary

Mitigations:

- make central sea lane one of the most important objectives
- make ports economically and tactically valuable
- allow warships to contest victory conditions directly

## Risk: The MVP becomes too complex

Mitigations:

- use one resource
- use one map
- keep actions few and clear
- avoid tech trees
- delay advanced unit types

---

# 13. Current Recommendation

Proceed with **Blind Horizon: Strait Control** as the first concept and MVP direction.

Use a scenario-first approach.

Do not start with multiplayer.

Do not start with multiple maps.

Do not start with a large unit roster.

The next design step is to refine Strait Control’s map layout, player actions, and first-match experience before creating gameplay implementation tasks.
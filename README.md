# Neverquest

_An irreverent UI-based incremental action role-playing game._

This README serves as a gameplay guide, technical manual and glossary of terms. For anything prefaced with a `TODO` tag, see the [roadmap](#roadmap).

`[SCREENSHOT]`

The game is split up into the [character](#character) and the [encounter](#encounter) panels, with most interactions between the two taking place via a column of gameplay control buttons in between them.

## Character

The main panel on the left of the UI. View the character's [reserves](#reserves), [statistics](#statistics), [resources](#resources), [ailments](#ailments), and set their name.

### Reserves

Determine the basic status of the character.

#### Health

Total amount of damage the character can take before game over at 0 health.

It is [regenerated](#health-regeneration-rate) over time.

#### Stamina

If the character is wielding a [weapon](#weapons) with a stamina cost, this cost is paid with every [attack](#combat). If they are wielding a [shield](#shields) with a stamina cost, this is paid every time there is a successful [block](#block) while [defending](#combat).

If there isn't enough stamina in reserve when attacking or blocking, the character is considered [exhausted](#exhaustion) and no attacks or blocks can take place.

It is [regenerated](#stamina-regeneration-rate) over time, at a faster initial pace than health.

#### Energy

`TODO`

Consumed when activating [skills](#skills), [auras](#auras) and [sorceries](#sorceries), regenerated over time.

### Resources

Collected by [looting](#looting) dead monsters and selling or dismantling items at the [caravan](#caravan).

#### Coins

Gained from selling scrap and items to the [merchant](#merchant) and dropped by certain rare monsters. Used to pay for [caravan](#caravan) crew, some of their services and any item purchases.

#### Essence

Gained from killing monsters and disenchanting gear. Primarily spent on attribute ranks. Essence cost increases for every such rank allocation.

`TODO` Essence can also be used to enchant gear.

#### Scrap

Gained from dismantling [gear](#gear) at the blacksmith and dropped from monsters. Used to craft gear and trade for coins.

### Attributes

Attributes each provide a direct increasing effect for each rank. Each rank allocation raises the character's power level by 1.

[Essence](#essence) is used to allocate ranks. The cost of allocation is increased for every rank.

#### Acumen

`TODO`

Affects [sorcery](#sorceries) casting rate.

#### Agility

Affects [dodge chance](#dodge-chance). Required skill: [Evasion](#evasion).

#### Dexterity

Affects [critical chance](#critical-chance). Required skill: [Assassination](#assassination).

#### Cruelty

Affects [bleed damage](#bleed-damage). Required skill: [Anatomy](#anatomy).

#### Endurance

Affects maximum [total stamina](#stamina).

#### Finesse

Affects [parry absorption](#parry-absorption) & [parry damage](#parry-damage) in equal measure. Required skill: [Escrime](#escrime).

#### Fortitude

Affects [stamina regeneration rate](#stamina-regeneration-rate).

#### Intellect

`TODO`

Affects energy regeneration rate.

#### Luck

`TODO`

Affects the amount of loot dropped by monsters.

#### Might

Affects [stagger duration](#stagger-duration). Required skill: [Traumatology](#traumatology).

#### Perception

Affects [critical damage](#critical-damage). Required skill: [Assassination](#assassination).

#### Resilience

Affects [rate of recovery](#recovery-rate) after being struck.

#### Speed

Affects [rate of attack](#attack-rate).

#### Strength

Affects [total damage](#total-damage) of an attack.

#### Tenacity

`TODO`

Affects amount of damage that can be taken without needing to [recover](#recovery-rate).

#### Vigor

Affects [health regeneration rate](#health-regeneration-rate).

#### Vitality

Affects maximum [total health](#health).

#### Wisdom

`TODO`

Total [energy](#energy).

### Statistics

Derived from the character's [attributes](#attributes), [gear](#gear), and any current [ailments](#ailments).

#### Damage per second

Requires toggling on in the global [settings](#settings). If on, shows the expected damage per second the character can deal, taking into account [attack rate](#attack-rate), current [total damage](#total-damage) and [critical strikes](#critical-chance).

#### Attack rate

Time duration between attacks, not considering any interruptions such as [recovery](#recovery-rate).

#### Bleed chance

Percentage determining the chance that when attacking, the given [bleed damage](#bleed-damage) of the current weapon's damage is inflicted on the monster over 2.5 seconds.

#### Bleed damage

Percentage of the weapon's total damage that is inflicted over time after a successful attack with bleed. Proportional to this total is taken every 500 milliseconds until duration (2.5 seconds total) is complete.

Can be increased with the [Cruelty](#cruelty) attribute.

#### Block chance

Percentage determining the chance that when defending, all incoming non-protected damage is blocked.

#### Critical chance

Percentage determining the chance that upon attacking, [critical damage](#critical-damage) is dealt.

Can be increased with the [Dexterity](#dexterity) attribute.

#### Critical damage

Percentage increase of [total damage](#total-damage) dealt when attacking with a [critical strike](#critical-strike).

Can be increased with the [Perception](#perception) attribute.

#### Dodge chance

Percentage determining the chance of when defending, the character avoids all damage entirely.

Can be increased with the [Agility](#agility) attribute.

#### Health regeneration rate

Time duration until [health](#health) is restored by one point.

Can be increased with the [Vigor](#vigor) attribute.

#### Parry absorption

Percentage of attacking damage after current [protection](#protection) that is subtracted upon a successful parry (base: 33%). Can be increased with the [Finesse](#finesse) attribute.

#### Parry chance

Percentage chance determining a successful [parry](#parry) when defending.

#### Parry damage

Percentage of attacking damage that is inflicted on the attacker upon a successful parry (base: 25%). Can be increased with the [Finesse](#finesse) attribute.

#### Protection

Amount of damage that is discarded from the total when defending. This is determined primarily through [armor](#armor) and other [gear](#gear).

#### Recovery rate

Recovery occurs when the character is dealt damage, halting regeneration of [reserves](#reserves) and the [attack meter](#attack-rate). It is bounded by a certain duration, which can be decreased with the [Resilience](#resilience) attribute.

#### Stagger chance

Percentage determining the chance of [staggering](#stagger) (incapacitating) the monster when attacking or defending based primarily on the current [gear](#gear) ([shields](#shields) and [blunt weapons](#blunt-weapon)) for a certain [duration](#stagger-duration).

#### Stagger duration

Time until the monster recovers from incapacitation until it can continue attacking.

Can be increased with the [Might](#might) attribute.

#### Stamina regeneration rate

Time duration until [stamina](#stamina) is restored by one point.

Can be increased with the [Fortitude](#fortitude) attribute.

#### Total damage

Damage from [strength](#strength) in addition to [weapon](#weapons) damage along with any other bonuses that is applied on every [attack](#combat).

## Combat

The [wilderness](#wilderness) initially always has a lurking [monster](#monster). When ready, the character can choose to **attack** continuously based on their [attack rate](#attack-rate), **engaging** the monster in the process. While engaged, the monster will also attack continuously, triggering the character to **defend** themselves. When the monster strikes the character, [recovery](#recovery-rate) is triggered. While recovering, the character won't be able to attack or regenerate their [reserves](#reserves).

Both the character and monster will keep attacking one another until either the character **retreats**, upon which the monster's health instantly regenerates to its maximum, or if the monster or character is dead (one of either's health reaches zero).

Upon a monster's death, the wave progress is incremented, its remains are looted and the next monster in the wave is engaged automatically, unless the character retreats.

The character will enter a **resting** state once the wave is complete and there are no more monsters to fight.

### Combat mechanics

Apart from the ones marked in bold in the [combat](#combat) section, there are several additional mechanics that occur during combat.

Some of the following effects are intrinsic to gear and aren't controlled directly the way [attributes](#attributes) are.

#### Bleed

Certain successful attacks by a monster or the character can inflict bleed, a damage over time effect consisting of a total amount of damage inflicted regularly over a certain period of time (2.5 seconds).

For the character, [bleed chance](#bleed-chance) and [bleed damage](#bleed-damage) statistics determine this mechanic. Inflicting bleed is only possible after acquiring the [Anatomy](#anatomy) skill.

#### Block

A successful block by the character upon a monster's attack will negate all damage done, yet costs [stamina](#stamina). Blocking may also inflict [stagger](#stagger) on the monster, depending on the acquisition of the [Traumatology](#traumatology) skill.

The overall chance to block an attack is determined by the [block chance](#block-chance) statistic and is determined primarily by wielding a [shield](#shields).

#### Critical Strike

An attack might deal extra damage, which is determined by the [chance](#critical-chance) to do so and the overall [damage multiplier](#critical-damage).

#### Deflection

`TODO`

The chance for the character to completely ignore all effects of an incoming monster's non-physical damage and/or [ailment](#ailments).

#### Dodge

Dodging an incoming attack negates all damage, but doesn't cost any stamina the way [blocking](#block) does.

The overall chance to dodge an attack is determined by the [dodge chance](#dodge-chance) statistic.

Dodging is only possible after acquiring the [Evasion](#evasion) skill.

#### Exhaustion

When there is not enough [stamina](#stamina) to pay for an attack, [parry](#parry) or [block](#block), sufficient [stamina regeneration](#stamina-regeneration-rate) must occur first before being able to do any of them.

#### Looting

After the monster is defeated, its remains are looted automatically for any [resources](#resources). This takes a few seconds, but can be shortened with certain [traits](#traits) or [items](#inventory).

The looted resources can only be collected once the [wave](#wilderness) is completed.

#### Parry

A successful parry [absorbs](#parry-absorption) a percentage of the total damage of an attack and [reflects](#parry-damage) a percentage back to the attacker. These percentages are determined by the [Finesse](#finesse) attribute.

The overall chance to parry an attack is determined by the [parry chance](#parry-chance), which is influenced by currently-equipped gear ([slashing weapons](#slashing-weapon). When parrying occurs, the stamina cost of the currently-equipped weapon is paid. If [exhausted](#exhaustion), no parrying can occur.

Parrying is only possible after acquiring the [Escrime](#escrime) skill.

#### Stagger

When staggered, the monster will not be able to attack for a certain duration. The character is considered staggered themselves when they are [recovering](#recovery-rate).

The overall [stagger chance](#stagger-chance) statistic is determined by the current gear ([shields](#shields) and [blunt weapons](#blunt-weapon)). The [stagger duration](#stagger-duration) is influenced by the [Might](#might).

Staggering is only possible after acquiring the [Traumatology](#traumatology) skill.

## Encounter

The main panel to the right of the screen. It changes based on one of the two possible locations of the character, [wilderness](#wilderness) and [caravan](#caravan).

### Wilderness

Engage and fight monsters. Every wilderness level has a certain amount of monsters (a wave) of a certain power determined by the level and current wave progress. The name of the wilderness level is randomly generated by [LOCRA](#locra).

The level is considered completed when the wave progress is at its maximum after having killed all the monsters. At this point, any [loot](#looting) can be collected and the character can progress to the [caravan](#caravan).

### Monster

A creature with a randomly generated name that will continuously attack the character as soon as it's [engaged](#combat). It has health and a certain attack rate both determined by the current wilderness level.

### Caravan

Encountered after completing a [wilderness](#wilderness) level.

All goods and services offered by the caravan crew are purchasable with [coins](#coins), [scrap](#scrap) or [essence](#essence), granting various different bonuses. Once at the caravan, the only other option apart from interacting with the crew is to return to the wilderness, which will be one level higher than before.

The [merchant](#merchant) is always present from the start. Other crew members can be acquired at a cost of coins, who then offer more goods and services. Some have additional requirements before they are unlocked for purchase.

#### Alchemist

`TODO`

Purchase [elixirs](#elixirs), [salves](#salves) and [poisons](#poisons).

#### Blacksmith

Repairs, dismantles, crafts and upgrades [weapons](#weapons) and [armor](#armor). Requires coins as well as scrap.

#### Cook

Restores all [health](#health), [stamina](#stamina) and [energy](#energy) when purchasing a hot meal.

`TODO` Grants a Well Fed [buff](#buffs) for the first wave (+10% [mastery](#mastery) gain).

#### Medic

Their presence saves the character from death (no restart necessary) once per wilderness level in return for a percentage of all of the character's current [resources](#resources). Upgrades to the medic's supplies, paid in coins and/or scrap, reduce this death payment.

Also sells first aid kits that can cure a [bleed](#bleed) effect and restore a certain amount of health over time.

#### Mercenary

Offers acquisition of new physical [skills](#skills) and [attributes](#attributes).

#### Merchant

Sell and buy items. Exchange scrap for coins. Coins can then be used to purchase whatever the merchant has available and used for other goods and services of the caravan.

The merchant's inventory of items will grow and diversify after each new wilderness level.

#### Sorcerer

`TODO`

Acquire [sorceries](#sorceries) and [auras](#auras). Acquire certain attributes.

#### Tailor

Sells upgrades for increasing maximum [encumbrance](#encumbrance.

`TODO` Also allows adding extra [potion](#potions) slots, as well as extra [trinket](#trinkets) slots.

#### Witch

`TODO`

Enchant and disenchant [gear](#gear), requiring essence. Acquire certain attributes.

## Inventory

The inventory is accessible as soon as the character acquires the [knapsack](#knapsack) from the merchant.

Before acquiring the knapsack, all equippable items are automatically equipped if possible and all consumables are immediately consumed. Additionally, [encumbrance](#encumbrance) can't be extended.

An item can either be;

a) a piece of [gear](#gear), or
b) a consumable like an [elixir](#elixirs), or
c) a [trinket](#trinkets) that grants special effects when equipped.

### Knapsack

Allows for the storage of items. Allows equipping and un-equipping [gear](#gear). Purchasable from the [merchant](#merchant).

### Encumbrance

The inventory size is constrained by encumbrance, to which each carried or equipped item adds a certain amount. No further items can be acquired until the remaining encumbrance allows for it.

Viewing encumbrance and managing it can only be accomplished once the [knapsack](#knapsack) is acquired.

### Gear

Items that can be equipped and unequipped from the inventory.

The [merchant](#merchant) sells one of each gear type at various levels. To acquire improved gear, they need to be crafted by the [blacksmith](#blacksmith).

#### Weapons

Weapons are the main way of fighting monsters. Every weapon type and class has specific modifiers, as well as various tradeoffs for wielding them.

##### Weapon type

The type of weapon determines how combat occurs.

###### Melee

Standard type that has no special features.

###### Ranged

`TODO`

##### Weapon grip

A weapon can either by one-handed or two-handed, taking up the corresponding gear slots when equipped.

###### One-handed

- 1 slot
- Low damage
- High attack rate
- Low stamina requirement

###### Two-handed

`TODO`

- 2 slots
- High damage
- Low attack rate
- High stamina requirement

###### Dual wield

`TODO`

A one-handed weapon in each slot. Provides a penalty to damage and attack rate to the off-hand weapon.

##### Weapon class

Whatever its [type](#weapon-type) or [grip](#weapon-grip), a weapon falls into one of several classes that intrinsically grants certain modifiers. These modifiers are only relevant if the associated [passive skill](#passive-skills) is acquired.

###### Unarmed

No initial modifiers.

###### Blunt weapon

Adds chance to [stagger](#stagger) for a certain duration. Required skill: [Traumatology](#traumatology).

###### Piercing weapon

Chance to inflict [bleed](#bleed). Required skill: [Anatomy](#anatomy).

###### Slashing weapon

Chance to [parry](#parry). Required skill: [Escrime](#escrime).

#### Armor

Armor provides [protection](#protection). When struck by an attack, the protection value is subtracted from total damage received.

Each of the following armor classes increases the protection value and adds certain modifiers.

##### No armor

No initial modifiers.

##### Hide armor

- Low protection
- Low cost

##### Reinforced armor

- Medium protection
- Low -% dodge
- Lower bleed damage
- Medium cost

##### Plate armor

`TODO`

- High protection
- High -% dodge
- -% attack rate
- Immunity to bleed
- +% block chance
- Chance to [deflect](#deflection) spells
- High cost

#### Off-hand

This slot allows the wielding of [shields](#shields).

`TODO` Can also be taken up by [two-handed weapons](#two-handed) and any other off-hand items.

##### Shields

Grants a percentage [chance to block](#block-chance) all incoming damage. Also grants [stagger chance](#stagger) with the acquisition of the [Traumatology](#traumatology) skill.

###### Small shield

- Low chance to block
- Low stagger chance
- Low stamina cost
- +% [dodge chance](#dodge-chance)
- Low cost

###### Medium shield

- Medium chance to block
- Medium stagger chance
- Low stamina cost
- +% [parry chance](#parry-chance)
- Medium cost

###### Tower shield

- High chance to block
- High stagger chance
- High stamina cost
- +% [protection](#protection)
- High cost

#### Trinkets

Can grant various [buffs](#buffs) and other effects while equipped. Initially, only one trinket can be equipped at a time, but more slots can be acquired via the [tailor](#tailor).

The following are some of the early items available from the merchant.

##### Compass

Allows the character to restart the current wilderness level upon initial completion rather than only being able to go to the caravan. This increases the amount of collectable [loot](#resources) at that level.

##### Hearthstone

Allows the character to go to the caravan regardless of if the current wilderness level's wave is cleared or not. Character cannot be engaged in combat to use it.

### Potions

`TODO`

One of three types that take up the potion slot(s). Purchased from the [alchemist](#alchemist).

Further slots can be added by the [tailor](#tailor).

#### Elixirs

Restores [stamina](#stamina).

#### Poisons

Adds poison to weapons automatically with each strike, applying damage-over-time effects and potentially other ailments. Has a certain number of charges before it is used up.

#### Salves

Temporarily immunizes against [ailments](#ailments).

## Mastery

`TODO`

Using a particular weapon or armor type increases its associated mastery. Weapon mastery increases when attacking and armor mastery increases when being strike.

Leveling up mastery confers bonuses on the respective armor and weapon types. Certain weapons require mastery levels before they can be used effectively.

## Skills

Skills are acquired from caravan crew and can either be activated or passive.

### Activated skills

`TODO`

Once acquired, activating a skill requires [energy](#energy).

#### Auras

Cast spells that remain active until dispelled. Provides [buffs](#buffs) in return for reserving a percentage of energy.

#### Physical

Special combat skills that can be activated during combat.

##### Execute

Available if the monster is at or below 20% health and kills it immediately.

#### Sorceries

Cast spells with immediate and/or over-time effects.

### Passive skills

Permanent effects that once acquired always provide their benefits.

#### Anatomy

Unlocks [bleed](#bleed) when using [piercing](#piercing-weapon) weapons. Also unlocks the [Cruelty](#cruelty) attribute.

#### Armorcraft

Allows the use of [reinforced](#reinforced-armor) and [plate](#plate-armor) armors.

#### Assassination

Unlocks [dexterity](#dexterity) and [perception](#perception) attributes, as well as [critical chance](#critical-chance) and [critical damage](#critical-damage) modifiers on [weapons](#weapons).

#### Calisthenics

Unlocks the [fortitude](#fortitude) and [vigor](#vigor) attributes.

#### Dual wielding

`TODO`

Allows the use of a one-handed weapon in main hand as well as offhand.

#### Escrime

Unlocks the ability to [parry](#parry) when using [slashing](#slashing-weapon) weapons. Also unlocks the [Finesse](#finesse) attribute.

#### Evasion

Unlocks [agility](#agility) attribute and [dodge chance](#dodge-chance) modifiers on gear.

#### Siegecraft

`TODO`

Allows the use of [two-handed](#two-handed) weapons.

#### Shieldcraft

Allows the use of [medium](#medium-shield) and [tower](#tower-shield) shields.

#### Traumatology

Unlocks the ability to [stagger](#stagger) when using [blunt](#blunt-weapon) weapons and [blocking](#block) with shields. Unlocks the [Might](#might) attribute.

## Status effects

Temporary or permanent effects granted or changing the current monster or character status.

### Ailments

Negative status effects that dampen the character or monster. For the character, they may be treated by [potions](#potions) and other items.

#### Bleeding

Certain monster attacks may apply a [bleed](#bleed) effect on the character. This can be stemmed by a [first aid kit](#medic) or certain [salves](#salves).

#### Diseased

`TODO`

#### Poisoned

`TODO`

### Buffs

Positive status effects that boost or improve the character or monster.

## Traits

`TODO`

Traits are permanent passive abilities that are unlocked when reaching certain mastery levels or a certain attribute value.

- Brawler: an unequipped shield adds to unarmed damage, using both hands.
- Bruiser: current stamina adds unarmed bonus damage.
- Nudist: double dodge rate when not wearing any armor.
- Scrounger: double looting rate.
- Shredder: total bleed damage is inflicted all at once.

## Achievements

`TODO`

Meta progression. Grant bonuses when completed.

### Combat achievements

- Kill first monster
- Kill 5/10/25/50/100/1000 monsters _(5 achievements)_
- Kill a monster in one strike
- Kill a monster with bleed damage
- Dodge 1/5/10/25/50/100 strikes
- Dodge 3 strikes in a row
- Reflect damage
- After acquiring Compass, clear all levels before returning to Caravan

### Caravan achievements

- Purchase an item
- Hire first new crew member
- Hire X _(X = crew member)_

### Gear achievements

- Equip a weapon
- Equip armor
- Equip a shield

### Meta

- Achieve 5/10/25/50/100/all achievements

## Settings

These are accessible via the "?" menu on the page header. They allow the activation and deactivation of certain global features.

### NSFW mode

Default: off. Toggles the generation of not-safe-for-work words in [LOCRA](#locra).

### Show damage per second (DPS)

Default: off. Toggles DPS information for the character, gear and monster.

### Auto-equip new items

Default: on. Toggles the automatic equipping of weapons, armor, shields and potions once they are acquired. Cannot be set to off until the [knapsack](#knapsack) is acquired.

### Low health warning

Default: on. Toggles a popover warning to prompt a retreat when the character's health drops below 33% of its maximum.

### Show all elements

Default: off. Once toggled, all elements of the UI will be shown at once instead of being unlocked gradually as gameplay progresses and features become relevant. Suitable for veteran players starting a new run.

## LOCRA

The LOCRA (LOcation, CReature, Artifact) system generates a pseudo-random variety of names for different irreverent fantasy-themed items and monsters that the character interacts with.

It works by generating a name for a location, creature or artifact based on a JSON library of (loosely) fantasy-world-themed words that can be composed to make (somewhat) coherent names for the three types in question. Parameters for tags and affix composition can be passed to make the generation more specific. If [NSFW mode](#nsfw-mode) is on, the names may also be pornographic or decidedly non-fantasy-themed.

Generating a creature name, for example, depending on the parameters passed, might yield anything from "Intrepid Farmer" to "Voluptuous Manticore of Unmitigated Penetration".

LOCRA can be considered somewhat independent of Neverquest, as it can be used outside of the game's implementation. Nevertheless, it is bundled as part of the same codebase, accessible under `src/locra`.

## Roadmap

Neverquest is a work-in-progress. Several features marked with `TODO` are pending refinement and implementation.

- `v1.0.0` [CURRENT] -

## Local set up

To run the app locally from source, you will need to use a command-line interface (CLI), as well as have [git](https://git-scm.com/downloads) and [NPM](https://docs.npmjs.com/cli/v8/configuring-npm/install) installed globally.

### Run the app

1. Open the CLI and change into a suitable directory
1. Run `git clone git@github.com:cneuro/neverquest.git`
1. Run `cd neverquest`
1. Run `npm install`
1. Run `npm start`
1. Open [http://localhost:5173](http://localhost:5173) in a web browser.

### Local development

Before doing any changes, please do the following:

1. In the CLI, go to the project folder (e.g. `cd neverquest`).
1. Run `npm run prepare`

Now, every time changes are committed, all the relevant code, markup and style linters & formatters will apply any changes automatically.

The linter config can be viewed in `.eslintrc.json`, `.stylelintrc.json` and `.prettierc.json`.

## Implementation

- Built on [Vite](https://vitejs.dev).

- Written in [TypeScript](https://www.typescriptlang.org).

- UI framework is provided by [Bootstrap](https://react-bootstrap.github.io).

- State management library is [Recoil](https://recoiljs.org).

- Code style & linting is provided by [eslint](https://eslint.org), [stylelint](https://stylelint.io) and [prettier](https://prettier.io).

- Automation is provided by [husky](https://typicode.github.io/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged).

- Animation library is [Animate.css](https://animate.style).

## License

![CC BY-NC-SA 4.0](/public/by-nc-sa.eu.svg?raw=true)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Appendices

### 1. Gameplay objectives

- Player always has something to do
- No long waits, cliffs or walls
- No obligatory resets for incremental gains
- No excessive or repetitive clicking
- Decisions are frequent and they matter
- High character build variety
- Manage an economy of resources and character builds with trade-offs

### 2. [Warren Spector's 6+2+1 questions](https://www.gamedeveloper.com/design/warren-spector-traces-i-deus-ex-i-s-development-back-to-a-game-of-d-d)

1. What’s the core idea? Can you describe the core of the game in 2-3 sentences?
   - An incremental action RPG, focusing on player interaction, which can be played in any browser on any system. Exploring and fighting through the hostile world yields its secrets, with the only respite being a gradually growing caravan of .
1. Why do this game?
   - I want to play it, I can’t find anything like it. Other UI-focused browser-based games are either idle clickers or Flash-based monstrosities.
1. What are the development challenges?
   - Free time, i.e. funding.
1. How well-suited to video games is the idea?
   - It is unique to video games since it requires lots of numerical computation.
1. What’s the player fantasy?
   - Ever increasing power and challenge with the freedom to build how said power and challenges are surmounted.
1. What does the player do? (What are the “verbs” of the game?)
   - Explore
   - Fight
   - Loot
   - Level up
   - Encounter
   - Trade
1. Has anyone done this before?
   Not quite in the same way. Clear influences are:
   - Progress Quest (the progenitor of all text-heavy UI-based incremental games, also with a swords & sorcery fantasy theme)
   - Trimps (complex idle/incremental all about building )
   - Kingdom of Loathing (one of the first purely browser-based UI-focused adventure RPGs with an irreverent sense of humor)
   - Candybox 1 & 2 (another irreverent UI-heavy fantasy adventure with 2D world elements heavy on player interaction and with player death)
   - Crank (user-interaction-driven adventure/mystery game with gradually expanding storyline and gameplay)
   - Swarm Simulator (the premier Bootstrapped-based incremental/idle browser game all about ever-increasing numbers and progress bars)
   - NGU Idle (incremental irreverent UI-based fantasy adventure)
   - Hero Simulator (light-hearted fantasy setting with many upgrades)
1. What’s the one new thing?
   - Influence every aspect of your character without the need for tropes and archetypes.
1. Do you have something to say?
   - Browser games with only text, UI and no graphics can be just as engaging as and can have similar gameplay depth to traditional video games without relying solely on simplistic deterministic incremental progress.

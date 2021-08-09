import {GameDeck} from "./deck";
import {Effect} from "./card";
import {Event} from "./events";

export class Player {
    currentHP = 1;
    currentDefense = 0;

    currentEnergy = 0;

    // Per turn
    energyPerTurn = 3;
    drawPerTurn = 5
    maxHP: number;

    constructor(maxHP: number) {
        this.currentHP = maxHP
        this.maxHP = maxHP
    }

    resetEnergy() {
        this.currentEnergy = this.energyPerTurn
    }

    isDead() {
        return this.currentHP <= 0;
    }

    consumeEnergy(cost: number) {
        this.currentEnergy -= cost
    }

    changeDefense(amount: number) {
        this.currentDefense = Math.max(this.currentDefense + amount, 0)
    }

    changeHP(amount: number) {
        this.currentHP = Math.max(this.currentHP + amount, 0)
    }
}

export class Match {
    turn = 1
    state: matchState = 'started'
    deck: GameDeck;
    player: Player;
    enemy: number

    constructor(player: Player, deck: GameDeck, enemy: number) {
        this.deck = deck
        this.player = player
        this.enemy = enemy
    }

    BeginTurnPlayer() {
        this.changeState('player_turn')

        // Setup player
        this.player.resetEnergy()

        // Draw cards
        this.deck.draw(this.player.drawPerTurn)
    }

    RunEnemyTurn() {
        this.changeState('enemy_turn')

        // Hard coded enemy turn
        this.player.changeHP(-7)

        return this.CheckEndCondition()
    }

    CheckEndCondition() {
        console.log(this.player.isDead(), this.player.currentHP)
        if (this.player.isDead()) {
            this.changeState('player_lost')
            return true
        }

        // Fake enemy :-)
        if (this.enemy <= 0) {
            this.changeState('player_won')
            return true
        }

        return false
    }

    PlayCard(i: number) {
        const card = this.deck.get(i)
        if (card.cost > this.player.currentEnergy) {
            console.log("not enough energy")
            return
        }

        // OK
        this.player.consumeEnergy(card.cost)
        this.applyEffects(card.effects)
        this.deck.discard(i)
    }

    private applyEffects(effects: Effect[]) {
        for (const effect of effects) {

            switch (effect.kind) {
                case 'damage':
                    this.enemy -= effect.amount
                    break
                case 'defense':
                    this.player.changeDefense(effect.amount)
                    break
                default:
                    throw new Error(`effect "${effect.kind} not supported`)
            }

            if (this.CheckEndCondition()) {
                return
            }
        }
    }

    HandleEvent(s: Event) {
        if (this.state !== 'player_turn') {
            console.log(`ignore event ${s}`)
            return
        }

        if (s.kind === 'EndOfTurn') {
            this.deck.discardHand()
            if (this.RunEnemyTurn()) {
                return
            }
            this.BeginTurnPlayer()
        } else if (s.kind === 'PlayCard') {
            this.PlayCard(s.index)
        }
    }

    changeState(s: matchState) {
        console.log(`state transition ${this.state} -> ${s}`)
        if (this.state === 'started' && s !== 'started') {
            this.state = s
        } else if (this.state === 'player_turn' && (s === 'enemy_turn' || s === 'player_won' || s === 'player_lost')){
            this.state = s
        } else if (this.state === 'enemy_turn' && (s === 'player_turn' || s === 'player_won' || s === 'player_lost')) {
            this.state = s
        } else {
            throw new Error(`unexpected state transition ${this.state} -> ${s}`)
        }
    }
}

type matchState = 'started' | 'player_turn' | 'enemy_turn' | 'player_won' | 'player_lost'

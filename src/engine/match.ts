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
        this.currentDefense = Math.max(this.currentDefense - amount, 0)
    }

    changeHP(amount: number) {
        this.currentHP = Math.max(this.currentHP - amount, 0)
    }
}

type matchState = 'started' | 'player_turn' | 'enemy_turn' | 'player_won' | 'player_lost'

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
        this.BeginTurnPlayer()
    }

    BeginTurnPlayer() {
        this.state = 'player_turn'

        // Setup player
        this.player.resetEnergy()

        // Draw cards
        this.deck.draw(this.player.drawPerTurn)
    }

    BeginEnemyTurn() {
        this.state = 'enemy_turn'
    }

    CheckEndCondition() {
        if (this.player.isDead()) {
            this.state = 'player_lost'
            return true
        }

        // Fake enemy :-)
        if (this.enemy <= 0) {
            this.state = 'player_won'
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
            this.BeginEnemyTurn()
            this.BeginTurnPlayer()
        } else if (s.kind === 'PlayCard') {
            this.PlayCard(s.index)
        }
    }
}


import {GameDeck} from "./deck";
import {Effect} from "./card";

export class Player {
    private currentHP: number;
    currentDefense = 0;

    currentEnergy = 0;

    // Per turn
    energyPerTurn = 3;
    drawPerTurn = 5

    constructor(private maxHP: number) {
        this.currentHP = maxHP
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
    state: matchState = 'started'

    constructor(private player: Player, private deck: GameDeck, private enemy: number) {
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
        this.deck.moveToDiscardPile(i)
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
}


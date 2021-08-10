import {GameDeck} from "./deck";
import {Effect} from "./card";
import {Event} from "./events";
import {MatchLogic} from "./match_statemachine";

export class Player {
    private currentHP = 1;
    private currentDefense = 0;

    private currentEnergy = 0;

    // Per turn
    private energyPerTurn = 3;
    readonly drawPerTurn = 5

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
        this.currentDefense = Math.max(this.currentDefense + amount, 0)
    }

    changeHP(amount: number) {
        this.currentHP = Math.max(this.currentHP + amount, 0)
    }

    status() {
        return {
            hp: {
                current: this.currentHP,
                max: this.maxHP
            },
            defense: this.currentDefense,
            energy: this.currentEnergy
        }
    }

    hasEnergy(amount:number) {
        return this.currentEnergy >= amount;
    }
}

export type MatchState = 'started' | 'player_turn' | 'enemy_turn' | 'player_won' | 'player_died'

export class Match {
    turn = 1
    state: MatchState = 'started'
    deck: GameDeck;
    player: Player;
    enemy: number
    private logic: MatchLogic;

    constructor(player: Player, deck: GameDeck, enemy: number) {
        this.deck = deck
        this.player = player
        this.enemy = enemy
        this.logic = new MatchLogic(this)
    }

    BeginTurnPlayer() {
        // Setup player
        this.player.resetEnergy()

        // Draw cards
        this.deck.draw(this.player.drawPerTurn)
    }

    RunEnemyTurn() {
        // this.changeState('enemy_turn')

        // Hard coded enemy turn
        this.player.changeHP(-7)

        return this.checkEndCondition()
    }

    checkEndCondition() {
        if (this.player.isDead()) {
            return 'event_player_died'
        }

        // Fake enemy :-)
        if (this.enemy <= 0) {
            return 'event_enemy_died'
        }

        return false
    }

    playCard(i: number) {
        const card = this.deck.get(i)
        if (!this.player.hasEnergy(card.cost)) {
            console.log("not enough energy")
            return
        }

        // OK
        this.player.consumeEnergy(card.cost)
        this.deck.discard(i)
        return this.applyEffects(card.effects)
    }

    private applyEffects(effects: Effect[]) {
        for (const effect of effects) {

            switch (effect.kind) {
                case 'damage':
                    this.enemy = Math.max(this.enemy - effect.amount, 0)
                    break
                case 'defense':
                    this.player.changeDefense(effect.amount)
                    break
                default:
                    throw new Error(`effect "${effect.kind} not supported`)
            }

            const check = this.checkEndCondition()
            if (check) {
                return check
            }
        }
    }

    HandleEvent(s: Event) {
        this.state = this.logic.handleEvent(s, this.state)
    }
}

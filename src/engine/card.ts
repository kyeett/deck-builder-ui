export interface Effect {
    kind: 'damage' | 'defense'
    amount: number,
}

export class Card {
    cost
    name
    temporary
    effects

    constructor(name: string, cost: number, effects: Effect[], temporary = false) {
        this.name = name
        this.cost = cost
        this.effects = effects
        this.temporary = temporary
    }

    toString() {
        return `${this.name}`
    }

    description() {
        return this.effects.map(e => {
            switch (e.kind) {
                case 'damage':
                    return `Deal ${e.amount} damage.`
                case 'defense':
                    return `Increase defense by ${e.amount}.`
                default:
                    return 'Unknown.'
            }
        }).join(' ')
    }
}

/*
Types? Attack, Defense

Effects
* Add defense
* Deal damage
 * Single enemy
 * Multiple enemy
 * Random enemy
 * Single/Multiple times

Modifiers
* Strength
* Stability
* Weak

* Heal
* Take damage

 */


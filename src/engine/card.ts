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

// Deal 7 damage. Increase defense by 4.

// let c: Card = new CardConstructor()
//     .cost(1)
//     .effectDamage(7)
//     .effectDefense(3)
//     .build()


//
//
//
// let creator = new CardConstructor()
// deck.add(creator.new('strike'))
//
//
// let a = new Attack()
// deck.add(new Attack())
// deck.add(new Attack())
// deck.add(new Attack())
// deck.add(new Attack())
//

// Card
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


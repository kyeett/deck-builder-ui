import * as _ from "lodash";
import {MAX_CARDS_IN_HAND} from "./const";
import {Card} from "./card";

export class Deck {
    cards: Card[] = []

    add(c: Card) {
        this.cards.push(c)
    }

    copy() {
        return _.cloneDeep(this.cards)
    }
}

export class GameDeck {
    discardPile: Card[] = []
    hand: Card[] = []
    drawPile: Card[] = []

    constructor(drawPile: Card[]) {
        this.drawPile = drawPile
    }

    draw(count: number) {

        for (let i = 0; i < count; i++) {
            if (this.hand.length >= MAX_CARDS_IN_HAND) {
                console.log('hand is full')
                return
            }

            if (this.drawPile.length === 0) {
                this.drawPile = this.discardPile
                this.discardPile = []
                this.shuffle()
                return
            }

            // Move card from draw pile to hand
            let c = this.drawPile.pop()
            if (!c) {
                throw new Error("unexpected state of draw pile")
            }
            this.hand.push(c)
        }
    }

    print() {
        console.log('STATE')
        console.log(`drawPile    [${this.drawPile}]`)
        console.log(`hand        [${this.hand}]`)
        console.log(`discardPile [${this.discardPile}]`)
    }

    get(i: number): Card {
        if (i >= this.hand.length) {
            throw new Error(`invalid index ${i}` )
        }
        return this.hand[i]
    }

    moveToDiscardPile(i: number) {
        if (i >= this.hand.length) {
            throw new Error(`invalid index ${i}` )
        }
        let c = this.hand[i]
        this.hand.splice(i, 1);

        this.discardPile.push(c)
    }

    shuffle() {
        _.shuffle(this.drawPile)
    }
}

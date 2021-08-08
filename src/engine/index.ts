import {GameDeck} from './deck'
import {NewDefaultDeck} from "./library";

let deck = NewDefaultDeck()

let gameDeck = new GameDeck(deck.copy())
gameDeck.shuffle()
gameDeck.draw(2)
gameDeck.moveToDiscardPile(1)
gameDeck.print()

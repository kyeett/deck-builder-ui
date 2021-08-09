import {Deck, GameDeck} from "./deck";
import {cardDefinitionsV1, testCardDefinitions} from "./base_definitions";
import {CardCreator} from "./card_creation";
import {Match, Player} from "./match";

export function NewDefaultDeck(): Deck {
    let creator = new CardCreator(cardDefinitionsV1)
    let deck = new Deck()

    for (const kind of ['strike','strike','strike','strike','armor','armor']) {
        deck.add(creator.new(kind))
    }

    return deck
}

export function NewTestsDeck(): Deck {
    let creator = new CardCreator(testCardDefinitions)
    let deck = new Deck()

    for (const kind of ['strike','armor']) {
        deck.add(creator.new(kind))
    }

    return deck
}

export function NewMatch(): Match{
    let player = new Player(10)

    const deck = NewDefaultDeck()
    const gameDeck = new GameDeck(deck.copy())
    return new Match(player, gameDeck, 2)
}

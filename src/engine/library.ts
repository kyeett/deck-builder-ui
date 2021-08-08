import {Deck} from "./deck";
import {cardDefinitionsV1} from "./base_definitions";
import {CardCreator} from "./card_creation";

export function NewDefaultDeck(): Deck {
    let creator = new CardCreator(cardDefinitionsV1)
    let deck = new Deck()

    for (const kind of ['strike','strike','strike','strike','armor','armor']) {
        deck.add(creator.new(kind))
    }

    return deck
}

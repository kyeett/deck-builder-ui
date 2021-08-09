import {expect} from 'chai';
import * as Library from "../src/engine/library";
import {Deck, GameDeck} from "../src/engine/deck";
import {Match, Player} from "../src/engine/match";
import {CardCreator} from "../src/engine/card_creation";
import {testCardDefinitions} from "../src/engine/base_definitions";


describe('Match', () => {
    let player = new Player(10)

    const deck = Library.NewTestsDeck()
    const gameDeck = new GameDeck(deck.copy())
    const match = new Match(player, gameDeck, 2)

    it('player wins of enemy is dead', () => {
        match.BeginTurnPlayer()
        const i = gameDeck.hand.findIndex((c) => c.name === 'strike')
        expect(i).not.equal(-1)
        match.PlayCard(i)

        expect(match.state).equal('player_won');
    });
});


// TODO: Where should this be located
function generateTestCards(kinds: string[]) {
    let creator = new CardCreator(testCardDefinitions)
    return kinds.map(kind => creator.new(kind))
}

describe('Deck', () => {
    const gameDeck = new GameDeck([])
    gameDeck.discardPile = generateTestCards(['strike', 'strike', 'strike', 'strike'])
    gameDeck.drawPile = generateTestCards(['strike'])
    it('Discard pile is shuffled into Draw pile it is empty', () => {
        // Arrange
        expect(gameDeck.drawPile.length).equal(1)
        expect(gameDeck.discardPile.length).equal(4)

        // Act
        gameDeck.draw(1)
        expect(gameDeck.drawPile.length).equal(0)
        expect(gameDeck.discardPile.length).equal(4)

        gameDeck.draw(1)
        expect(gameDeck.discardPile.length).equal(0)
        expect(gameDeck.drawPile.length).equal(4-1)
    });

    // it('No card is drawn if hand is full', () => {
});

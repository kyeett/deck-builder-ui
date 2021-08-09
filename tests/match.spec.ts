
import {expect} from 'chai';
import * as Library from "../src/engine/library";
import {GameDeck} from "../src/engine/deck";
import {Match, Player} from "../src/engine/match";

let player = new Player(10)

const deck = Library.NewTestsDeck()
const gameDeck = new GameDeck(deck.copy())
const match = new Match(player, gameDeck, 2)


describe('Match', () => {
    it('player wins of enemy is dead', () => {
        match.BeginTurnPlayer()
        const i = gameDeck.hand.findIndex((c) => c.name === 'strike')
        expect(i).not.equal(-1)
        match.PlayCard(i)

        expect(match.state).equal('player_won');
    });
});

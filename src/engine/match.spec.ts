import {expect} from 'chai';
import {NewTestsDeck} from "./library";
import {GameDeck} from "./deck";
import {Match, Player} from "./match";

let player = new Player(10)

const deck = NewTestsDeck()
const gameDeck = new GameDeck(deck.copy())
const match = new Match(player, gameDeck, 2)

match.BeginTurnPlayer()
const i = gameDeck.hand.findIndex((c) => c.name === 'attack')
match.PlayCard(i)

describe('Match', () => {
    it('should sum to three', () => {
        expect(match.state).equal('player_won');
    });
});

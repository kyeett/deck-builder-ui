import {Match, MatchState} from "./match";
import {Event} from "./events";

export class MatchLogic {
    constructor(private m: Match) {
    }

    private handleStarted(e: Event, state: 'started') {
        if (e.kind === 'MatchStarted') {
            this.m.BeginTurnPlayer()
            return 'player_turn'
        }
        return state
    }

    private handlePlayerTurn(e: Event, state: 'player_turn') {
        if (e.kind === 'EndOfTurn') {
            this.m.deck.discardHand()
            return 'enemy_turn'
        } else if (e.kind === 'PlayCard') {
            const result = this.m.playCard(e.index)
            if (result) {
                return MatchLogic.mapToState(result)
            }
            return 'player_turn'
        }
        return state
    }

    private handleEnemyTurn(e: Event, state: "enemy_turn") {
        return state;
    }

    handleEvent(e: Event, state: MatchState): MatchState {
        if (state === 'started') {
            return this.handleStarted(e, state);
        } else if (state === 'player_turn') {
            return this.handlePlayerTurn(e, state);
        } else if (state === 'enemy_turn') {
            return this.handleEnemyTurn(e, state);
        }
        // } else if (States.isSuggestionsVisible(state)) {
        //     return reduceSuggestionsVisible(e, state);
        // } else if (States.isSelected(state)) {
        //     return reduceSelected(e, state);
        // }
        return state;
    }

    private static mapToState(result: 'event_player_died' | 'event_enemy_died') {
        if (result === 'event_player_died') {
            return 'player_died'
        } else {
            return 'player_won'
        }
    }
}

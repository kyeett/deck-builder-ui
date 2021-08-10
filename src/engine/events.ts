export type Event = PlayCardEvent | EndOfTurnEvent | MatchStarted

export interface PlayCardEvent {
    kind: 'PlayCard'
    index: number
}

export interface MatchStarted {
    kind: 'MatchStarted'
}

export interface EndOfTurnEvent {
    kind: 'EndOfTurn'
}

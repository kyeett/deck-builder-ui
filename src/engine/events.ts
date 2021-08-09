
export type Event = PlayCardEvent | EndOfTurnEvent

export interface PlayCardEvent {
    kind: 'PlayCard'
    index: number
}

export interface EndOfTurnEvent {
    kind: 'EndOfTurn'
}

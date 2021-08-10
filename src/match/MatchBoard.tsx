import React, {FunctionComponent} from 'react';
import {Match} from "../engine/match";
import {Event} from "../engine/events";
import Hand from "./Hand";


type InfoBoxProps = {
    title: string,
    items: {
        label: string,
        text: string | number
    }[]
    rowPadding?: string,
}
const InfoBox: FunctionComponent<InfoBoxProps> = ({title, items, rowPadding = '1'}) =>
    <div className="text-start">
        <h2>{title}</h2>
        <div>
            {
                items.map((item, index) =>
                    <InfoRow key={index} label={item.label} text={item.text} padding={rowPadding}/>)
            }
        </div>
    </div>;

type InfoRowProps = {
    label: string
    text: string | number
    padding?: string
}

const InfoRow = ({label, text, padding}: InfoRowProps) => {
    const cls = "row " + (padding ? "p-" + padding : "");
    return (<div className={cls}>
        <div className="col-8">
            {label}
        </div>
        <div className="col-4">
            <span className="badge bg-primary rounded-pill">{text}</span>
        </div>
    </div>)
}

type BoardProps = {
    match: Match,
    onEvent: (s: Event) => void
}

export const MatchBoard: FunctionComponent<BoardProps> = ({match, onEvent}) => {
    const player = match.player.status()
    const deck = match.deck.status()

    return <div>
    <main role="main" className="container">
        <div className="row">
            <div className="col-2">
                <InfoBox title="Player" items={[
                    {label: 'HP', text: `${player.hp.current}/${player.hp.max}`},
                    {label: 'Energy', text: player.energy}
                ]}/>
                <InfoBox title="Deck" items={[
                    {label: 'Draw pile:', text: deck.drawPileCount},
                    {label: 'Discard pile:', text: deck.discardPileCount}
                ]}/>
            </div>

            <div className="col">
                {match.state === 'player_won' &&
                    <h1>YOU WON!</h1>
                }
                {match.state === 'player_died' &&
                    <h1>YOU LOST!</h1>
                }
                {match.state === 'player_died' &&
                    <h1>Fight</h1>
                }

            </div>
            <div className="col-2">
                <InfoBox title="Match" items={[
                    {label: 'State:', text: match.state},
                ]}/>
                <InfoBox title="Enemy" items={[
                    {label: 'HP:', text: match.enemy},
                ]}/>
            </div>
        </div>
    </main>

    {match.state === 'player_turn' &&
        <footer className="footer">
            <div className="container">
                <button type="button" className="btn btn-dark border border-black rounded shadow"
                        onClick={() => onEvent({kind: 'EndOfTurn'})}>End Turn
                </button>
            </div>
            <Hand hand={deck.hand} onChosen={(i: number) => onEvent({kind: 'PlayCard', index: i})}/>
        </footer>
    }
</div>}

export default MatchBoard;

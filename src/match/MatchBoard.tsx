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
}
const InfoBox: FunctionComponent<InfoBoxProps> = ({title, items}) => <div>
    <h2>{title}</h2>
    <div className="container">
        {
            items.map((item, index) =>
                <InfoRow key={index} label={item.label} text={item.text}/>)
        }
    </div>
</div>;

type InfoRowProps = {
    label: string
    text: string | number
}

const InfoRow = ({label, text}: InfoRowProps) => <div className="row">
    <div className="col-8">
        {label}
    </div>
    <div className="col-4">
        <span className="badge bg-primary rounded-pill">{text}</span>
    </div>
</div>

type BoardProps = {
    match: Match,
    onEvent: (s: Event) => void
}

export const MatchBoard: FunctionComponent<BoardProps> = ({match, onEvent}) => <div>


    <main role="main" className="container">
        <div className="row">
            <div className="col-2">
                <InfoBox title="Player" items={[
                    {label: 'HP', text: `${match.player.currentHP}/${match.player.maxHP}`},
                    {label: 'Energy', text: match.player.currentEnergy}
                ]}/>
                <InfoBox title="Deck" items={[
                    {label: 'Draw pile:', text: match.deck.drawPile.length},
                    {label: 'Discard pile:', text: match.deck.discardPile.length}
                ]}/>
            </div>

            <div className="col">
                <h1>FIGHT</h1>
            </div>
            <div className="col-2">
                <InfoBox title="Enemy" items={[
                    {label: 'HP:', text: match.enemy},
                ]}/>
            </div>
        </div>
    </main>

    <footer className="footer">
        <div className="container">
            <button type="button" className="btn btn-dark border border-black rounded shadow"
                    onClick={() => onEvent({kind: 'EndOfTurn'})}>End Turn
            </button>
        </div>
        <Hand hand={match.deck.hand} onChosen={(i: number) => onEvent({kind: 'PlayCard', index: i})}/>
    </footer>
</div>

export default MatchBoard;

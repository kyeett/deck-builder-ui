import React, {FunctionComponent} from 'react';
import {GameDeck} from "../engine/deck";
import Hand from "./Hand";
import Pile from "./Pile";

type BoardProps = {
    deck: GameDeck,
    onUpdate: (i: number) => void
}

export const MatchBoard: FunctionComponent<BoardProps> = ({deck, onUpdate}) => <div>
    <main role="main" className="container">
        <h1>FIGHT</h1>
    </main>

    <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col">
                    <Pile count={deck.drawPile.length} label={"Draw Pile"}/>
                </div>
                <div className="col-8">
                    <Hand hand={deck.hand} onClick={onUpdate}/>
                </div>
                <div className="col">
                    <Pile count={deck.discardPile.length} label={"Discard Pile"}/>
                </div>
            </div>
        </div>
    </footer>
</div>

export default MatchBoard;

import React, {FunctionComponent} from 'react';
import {Card} from "../engine/card";
import CardComp from "./CardComp";

type HandProps = {
    hand: Card[]
    onChosen: (index: number) => void
}

export const Hand: FunctionComponent<HandProps> = ({hand, onChosen}) => <div>
    <div>
        <div className="btn-group" role="group" aria-label="Basic example">
            {hand.map((card, i) =>
                <CardComp key={i} card={card} onClick={() => onChosen(i)}>Test</CardComp>
            )}
        </div>
    </div>
</div>

export default Hand;

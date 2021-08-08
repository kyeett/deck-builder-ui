import React, {FunctionComponent} from 'react';
import {Card} from "../engine/card";
import CardComp from "./CardComp";

type HandProps = {
    hand: Card[]
    onClick: (index: number) => void
}

export const Hand: FunctionComponent<HandProps> = ({hand, onClick}) => <div>
    <div>
        <div className="btn-group" role="group" aria-label="Basic example">
            {hand.map((card, i) => {
                return <CardComp key={i} card={card} onClick={() => onClick(i)}>Test</CardComp>
            })}
        </div>
    </div>
</div>

export default Hand;

import React, {FunctionComponent} from 'react';
import {Card} from "../engine/card";

type CardProps = {
    card: Card
    onClick: () => void
}

const topStyle = {
    fontSize: '1em',
    margin: '1em',
    // borderRadius: '6px',
};

const descriptionStyle = {
    color: 'black',
    backgroundColor: 'white',
    height: '100px',
    width: '140px',
    borderRadius: '3px',
    margin: '0.5em',
};

export const CardComp: FunctionComponent<CardProps> = ({card, onClick}) => {

    return <div>
        <button style={topStyle} type="button" className="btn btn-attack border border-black rounded shadow" onClick={onClick}>
            <h5>{card.toString()}</h5>
            <div className="d-flex justify-content-center">
                ...
            </div>


            <div style={descriptionStyle}>
                {card.description()}
            </div>

        </button>
    </div>;
}

export default CardComp;

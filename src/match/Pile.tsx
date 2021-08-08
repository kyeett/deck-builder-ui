import React, {FunctionComponent} from 'react';

type PileProps = {
    label: string
    count: number
}

const topStyle = {
    fontSize: '1em',
    margin: '0em',
    width: '61px',
    height: '100px',
};


export const Pile: FunctionComponent<PileProps> = ({count, label}) => {
    let classes = "rounded btn "
    classes += count > 0 ? "btn-backside border border-dark" : "btn-light"

    return <div className="d-flex flex-column justify-content-end align-items-center">
        <h5>{label}</h5>

        <button style={topStyle} type="button" className={classes}>
            {count}
        </button>
    </div>
}

export default Pile;

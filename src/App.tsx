import React, {Component} from 'react';
import './App.css';
import {GameDeck} from "./engine/deck";
import {NewDefaultDeck} from "./engine/library";
import MatchBoard from "./match/MatchBoard";

type AppState = {
    gameDeck: GameDeck
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(s: number) {
        this.state.gameDeck.play(s)

        // TODO: Do this update in a nice way
        this.forceUpdate()
    }

    componentWillMount() {
        let deck = NewDefaultDeck()
        let gameDeck = new GameDeck(deck.copy())
        gameDeck.draw(3)

        this.setState({
            gameDeck: gameDeck
        });
    }

    render() {
        return (
            <div className="App">
                <MatchBoard deck={this.state.gameDeck} onUpdate={this.handleUpdate}/>
            </div>
        );
    }
}

export default App;

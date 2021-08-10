import React, {Component} from 'react';
import './App.css';
import {Match} from "./engine/match";
import {NewMatch} from "./engine/library";
import {Event} from "./engine/events";
import {MatchBoard} from "./match/MatchBoard";

type AppState = {
    match: Match
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        const match = NewMatch()
        this.state = {
            match: match,
        };
    }

    handleEvent(s: Event) {
        this.state.match.HandleEvent(s)

        // TODO: Do this update in a nice way
        this.forceUpdate()
    }

    componentDidMount() {
        this.handleEvent({kind:'MatchStarted'})
    }

    render() {
        return (
            <div className="App">
                <MatchBoard match={this.state.match} onEvent={this.handleEvent}/>
            </div>
        );
    }
}

export default App;

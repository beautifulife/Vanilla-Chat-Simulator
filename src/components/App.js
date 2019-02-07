import React, { Component } from 'react';
import './App.scss';
import SimulatorContainer from '../containers/Simulator_container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__header__title"><a href="/">I Know What You Said</a></h1>
        </header>
        <section className="App__body">
          <SimulatorContainer />
        </section>
        <footer className="App__footer">
          <span>Any questions ? &nbsp; beautifulife.github.io</span>
        </footer>
      </div>
    );
  }
}

export default App;

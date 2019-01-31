import React, { Component } from 'react';
import './App.scss';

import VisibleSimulator from '../containers/VisibleSimulator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__header__title">I Know What You Said</h1>
        </header>
        <section className="App__body">
          <VisibleSimulator />
        </section>
        <footer className="App__footer">
          <span>Any questions ? &nbsp; beautifulife.github.io</span>
        </footer>
      </div>
    );
  }
}

export default App;

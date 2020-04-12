import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Syne</h2>
        </div>
        <p className="App-intro">
            Syne is a tool that you can use to create a compelling music video in any type of genre.
        </p>
      </div>
    );
  }
}

export default App;

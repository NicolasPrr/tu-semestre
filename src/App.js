import React, { Component } from 'react';
import './App.scss';
import Malla from './components/Malla'
import Header from './components/Header'
import Footer from './components/Footer'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Malla />
        <Footer/>
      </div>
    );
  }
}

export default App;

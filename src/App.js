import React, { Component } from 'react';
import './App.scss';
import Malla from './components/Malla'
import Header from './components/Header'
import Footer from './components/Footer'
import MainLoader from './components/MainLoader'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Malla />
        <MainLoader/>
        <Footer/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.scss';
import Malla from './components/Malla'
import Header from './components/Header'
import Footer from './components/Footer'
import MainLoader from './components/MainLoader'

function setData (data){
  const name = data[8];
  const career = data[26].split('|');
  var history = {
    student : name,
    caree : career,
    period : []
  }
  console.log("hey  ")
  var periodo = /(\s+0\d\s*Periodo académico\s\|\s\d{4}-)(I{2}|I)/;
 for(var i = 30; i < data.length; i++){
   const str = periodo.exec(data[i]);
    if ( str !== null) history.period.push(  {name: str[0].split('|')[1].replace(' ','')} ) 
  }
  console.log(history)

  return history;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 0,
    }
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(goTo, info){
    
    this.setState({mode: goTo});
    if(goTo === 1){
      setData(info);
    }
  }
  render() {
    let md;
    const option = this.state.mode;
    if(option === 0 ) md = <Malla action = {this.changeMode}/>
    else if(option === 1 ) md = <MainLoader action = {this.changeMode}/>
    return (
      <div>
        <Header />
        {md}
        <Footer/>
      </div>
    );
  }
}

export default App;

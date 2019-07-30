import React, { Component } from 'react';
import './App.scss';
import MallaInput from './components/MallaInput'
import Header from './components/Header'
import Footer from './components/Footer'
import MainLoader from './components/MainLoader'
import Malla from './components/Malla'

function setData(data) {
  const name = data[8];
  const career = data[26].split('|');
  var history = {
    student: name,
    caree: career,
    periods: [],
  }
  var RegP = /(\s+\d\d\s*Periodo académico\s\|\s\d{4}-)(I{2}|I)/;
  var RegCourse = /(\d{7})-([A-Z]-\d{1,2}|[A-Z]-\d|\d{1,2}|)\s([A-ZÁ-Ú \-,\(\)\:]+)\s(\d+)\s(\d+)\s(\d+)\s([A-Z])\s(\d+)\s(\d+)\s+(\d\.\d|AP|NA)/;
  //(\d{7})-([A-Z]-\d{1,2}|[A-Z]-\d|\d{1,2}|)\s([A-ZÁ-Ú -]+)\s(\d+)\s(\d+)\s(\d+)\s([A-Z])\s(\d+)\s(\d+)\s+(\d\.\d|AP|NA)
  var periodCount = -1;
  for (var i = 10; i < data.length; i++) {
    const str = RegP.exec(data[i]); //Detecta el numero del periodo
    const str2 = RegCourse.exec(data[i]);//detecta la asignatura
    //Se encuentra el periodo de la historia academica, luego se procede a hallar las asignaturas con otra expresion regular. 
    if (str !== null) {
      periodCount++;
      history.periods.push({ name: str[0].split('|')[1].replace(' ', ''), courses: [] });
    }
    if (str2 !== null) {
      history.periods[periodCount].courses.push(str2);
    }
  }
  return history;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0,
      history: null,
    }
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(goTo, info) {
    var history;
    this.setState({ mode: goTo });
    if (goTo === 1) {
      history = setData(info);
      this.setState({ history: history })
    }
    if (goTo === 2) {
      this.setState({ mode: goTo });
    }
  }
  componentDidMount() {
    let history = null;
    if (localStorage.getItem('periods') !== null) {
      let periods = JSON.parse(localStorage.getItem('periods'))
      history ={
        periods: periods,
      }
      this.setState({history: history , mode: 1})
    }

  }
  render() {
    let md;
    const option = this.state.mode;
    if (option === 0)
      md = <MallaInput action={this.changeMode} />
    else if (option === 1)
      md = <MainLoader action={this.changeMode} />
    else if (option === 2)
      md = <Malla info={this.state.history} />

    return (
      <div>
        <Header />
        {md}
        <Footer />
      </div>
    );
  }
}
export default App;

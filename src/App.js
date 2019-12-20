import React, { Component } from 'react';
import './App.scss';
import MallaInput from './components/MallaInput'
import Header from './components/Header'
import Footer from './components/Footer'
import MainLoader from './components/MainLoader'
import Malla from './components/Malla'
import { useSpring, animated, a } from 'react-spring'
import { Spring } from 'react-spring/renderprops'

const Test = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1250 } })
  return <animated.div style={props}> <h1> I will fade in </h1></animated.div>
}
function getTypeCourse(str) {
  if (str === "NIVELACIÓN") return "E"
  if (str === "DISCIPLINAR OBLIGATORIA") return "C"
  if (str === "FUND. OPTATIVA") return "O"
  if (str === "DISCIPLINAR OPTATIVA") return "T"
  if (str === "LIBRE ELECCIÓN") return "L"
  if (str === "FUND. OBLIGATORIA") return "B"
}
function getFormatCourse(info) {
  return [
    info[0], // 0 Total
    info[2], // 1 Codxigo
    info[2], // 2 b2 no importa
    info[1], // 3  Nombre de la materia
    0,      // 4 no importa, veces vista
    0,      // 5 no importa, veces vista
    0,      // 6 no importa, veces vista
    getTypeCourse(info[4]),      // 7 es el tipo
    info[3],      // 8 numero de creditos  de la materia
    0,      // 9 no importa, veces vista
    info[6],      // 10 nota

  ]



}
function setData(data) {
  const name = "User"
  const career =" data[26].split('|')";
  let history = {
    student: name,
    caree: career,
    periods: [],
  }
  //([A-ZÁ-Ú][á-úa-zÁ-ÚA-U :-]*[a-uA-U]) (\(\d{7}[-B]*\))\t(\d)\t([A-UÁ-Ú ]*)\t(\d{4})
  //Expresion regular con la version del sia nuevo
  //([A-ZÁ-Ú][á-úa-zÁ-ÚA-Z ,:-]*[a-zA-Z]) (\(\d{7}[-B]*\))\t(\d)\t([A-ZÁ-Ú .]*)\t(\d{4}-\d)S Ordinaria\t(\d.\d)


  // var RegP = /(\s+\d\d\s*Periodo académico\s\|\s\d{4}-)(I{2}|I)/;
  // var RegCourse = /(\d{7})-([A-Z]-\d{1,2}|[A-Z]-\d|\d{1,2}|)\s([A-ZÁ-Ú \-,\(\)\:]+)\s(\d+)\s(\d+)\s(\d+)\s([A-Z])\s(\d+)\s(\d+)\s+(\d\.\d|AP|NA)/;
  //(\d{7})-([A-Z]-\d{1,2}|[A-Z]-\d|\d{1,2}|)\s([A-ZÁ-Ú -]+)\s(\d+)\s(\d+)\s(\d+)\s([A-Z])\s(\d+)\s(\d+)\s+(\d\.\d|AP|NA)

  /*
  Array input after match
0: "Taller de proyectos interdisciplinarios (2024045)	3	DISCIPLINAR OBLIGATORIA	2019-1S Ordinaria	4.1"
1: "Taller de proyectos interdisciplinarios"
2: "2024045"
3: "3"
4: "DISCIPLINAR OBLIGATORIA"
5: "2019-1"
6: "4.1"
index: 0
input: "Taller de proyectos interdisciplinarios (2024045)	3	DISCIPLINAR OBLIGATORIA	2019-1S Ordinaria	4.1"
groups: undefined
length: 7
__proto__: Array(0)
  */
  var course = /([A-ZÁ-Ú][á-úa-zÁ-ÚA-Z ,:-]*[a-zA-Z]) \((\d{7})[-B]*\)\t(\d)\t([A-ZÁ-Ú .]*)\t(\d{4}-\d)S Ordinaria\t(\d.\d)/
  let periodsConfirm = {}
  var periodCount = -1;
  for (var i = data.length; i > 0 ; i--) {
    const str = course.exec(data[i])

    if (str !== null) {
      if (periodsConfirm[str[5]] === undefined) {
        periodCount++;
        periodsConfirm[str[5]] = 1
        history.periods.push({
          name: str[5],
          courses: [getFormatCourse(str)],
        })
      } else {
        history.periods[periodCount].courses.push(getFormatCourse(str))
      }
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
      history = {
        periods: periods,
      }
      this.setState({ history: history, mode: 1 })
    }

  }
  render() {
    let md;
    const option = this.state.mode;
    if (option === 0) {
      md = (
        <Spring
          from={{ opacity: 0, marginLeft: -5000 }}
          to={{ opacity: 1, marginLeft: 0 }}
          config={{ mass: 2.5 }}
        // onRest ={() => alert("Hey")}
        >
          {props => (
            <div style={props}>
              <MallaInput action={this.changeMode} />
            </div>
          )}
        </Spring>
      )
    }


    else if (option === 1) {
      md = (
        <Spring
          from={{ opacity: 0, marginRight: -3000 }}
          to={{ opacity: 1, marginRight: 0 }}
        >
          {props => (
            <div style={props}>
              <MainLoader action={this.changeMode} />
            </div>
          )}
        </Spring>
      )
      // md = <MainLoader action={this.changeMode} />


    }
    else if (option === 2) {
      md = (
        <Malla info={this.state.history} />
      )

    }

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

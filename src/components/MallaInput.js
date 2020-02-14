import React, { Component } from 'react'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-145406416-1');
ReactGA.pageview("/input_form");

export default class MallaIInputs extends Component {
  constructor(props) {
    super(props);
    this.analyze = this.analyze.bind(this)
  }
  history = React.createRef();


  analyze(e) {
    e.preventDefault();

    var data;
    data = this.history.current.value;
    data = data.split(/\r\n|\r|\n/);
    let first_line =  data[0]
    if(data[0]=== 'Carga Terminada'){
      first_line = data[1]
    }else{
      first_line = data[0]
    }
    first_line = first_line.toLowerCase()
    let str_compare = "Logo UniversidadPORTAL DE SERVICIOS ACADÉMICOS"
    str_compare = str_compare.toLowerCase()
    if (!first_line.includes(str_compare)) {
      ReactGA.event({
        category: 'Button Form error',
        action: 'Error en envio de la malla',
        label: "go"
      });
      alert("input no valido");
    } else {
      this.props.action(1, data);
      ReactGA.event({
        category: 'Success input',
        action: 'Se envio la información correspondiente textarea'
      });
    }


  }

  render() {
    return (
      <div className="container">
        <section className="section">
          <h1 className="title">Historia academica</h1>
          <h2 className="subtitle">
            Copia y pega tu historia academica aquí desde el navegador <b>Google Chrome</b>
            </h2>
          La aplicación te permitará  visualizar  el PA, PAPPI y PAPA de todos los periodos academicos
        y agregar nuevos cursos!!
        </section>
        <form onSubmit={this.analyze.bind(this)}>
          <div className="field">
            <div className="control">
              <textarea className="textarea is-info" placeholder="Pegue aquí la historia academica" rows="15" ref={this.history}></textarea>
            </div>
          </div>
          <div className="control">
            <button className="button is-primary">Analizar!</button>
          </div>
        </form>
      </div>
    )
  }
}

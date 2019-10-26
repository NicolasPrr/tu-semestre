import React, { Component } from 'react'
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
    if (data[0].includes("Escudo de la República de Colombia")) {
      alert("input no valido");
      return 0;
    } else {
      this.props.action(1, data);
    }


  }
  render() {
    return (
      <div className="container">
        <section className="section">
          <h1 className="title">Historia academica</h1>
          <h2 className="subtitle">
            Copia y pega tu historia academica aquí
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

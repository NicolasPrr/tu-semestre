import React, { Component } from 'react'

export default class Malla extends Component {
  render() {
    return (
      <div className="container">
        <section className="section">
          <h1 className="title">Historia academica</h1>
          <h2 className="subtitle">
            Copia y pega tu historia academica aquí
            </h2>
        </section>
        <div className="field">
          <div className="control">
            <textarea className="textarea is-info" placeholder="Pegue aquí la historia academica" rows="15"></textarea>
          </div>
        </div>

        <div className="control">
            <button className="button is-primary">Analizar!</button>
          </div>
      </div>
    )
  }
}

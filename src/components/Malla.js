import React, { Component } from 'react'

function setData (data){
  const name = data[8];
  const career = data[26];
  var history = {
    student : name,
    caree : career 
  }

  return data;
}
export default class Malla extends Component {

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
    for(var i = 0; i < data.length; i++){
      console.log(i + " : :" + data[i]);
    }
    if(data[0] !== " Escudo de la República de Colombia" ){
      alert("input no valido");
      return 0;
    }else{
      setData(data);
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

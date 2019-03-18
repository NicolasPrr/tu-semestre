import Loader from 'react-loader-spinner'
import React, { Component } from 'react'

const textLoader = ["Procesando historia academica", "Calculando PAPA", "Calculando PAPPI", "Haciendo graficas", "Calculando avance"];
export default class MainLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: textLoader[0],
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ text: textLoader[1] })
        }, 1000);
        setTimeout(() => {
            this.setState({ text: textLoader[2] })
        }, 2000);
        setTimeout(() => {
            this.setState({ text: textLoader[3] })
        }, 4000);
        setTimeout(() => {
            this.setState({ text: textLoader[4] })
        }, 5000);
        setTimeout(() => {
            this.setState({ text: textLoader[5] })
        }, 6000);
    }
    render() {
        return (
            <div>
                <div className="has-text-centered">
                    <Loader
                        type="ThreeDots"
                        color="#2D3047"
                        height="100"
                        width="100"
                    />
                    <h2 className="title">{this.state.text}</h2>
                </div>
            </div>
        )
    }
}

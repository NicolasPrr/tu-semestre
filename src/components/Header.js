import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className="tabs">
                <ul>
                    <li className="is-active"><a>Malla</a></li>
                    <li><a>Perfil</a></li>
                    <li><a>Estadisticas</a></li>
                    <li><a>Documents</a></li>
                </ul>
            </div>

        )
    }
}

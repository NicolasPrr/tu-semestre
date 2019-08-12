import React, { Component } from 'react'
import {Link} from 'react-router-dom'

function isActive(location){
    if(location.includes('horario')) return "is-active"
    return null
}
export default class Header extends Component {
    render() {
        let activeSchedule = isActive(window.location.pathname)
        return (
            <div className="tabs">
                <ul>
                    <li className="is-active" ><Link to = '/'>Mi historia</Link></li>
                    <li className={activeSchedule} ><Link to='horario'>Mi horario</Link></li>
                    
                </ul>
            </div>

        )
    }
}

import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Calculator from './components/Calculator'
export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path ='/' component ={Calculator}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
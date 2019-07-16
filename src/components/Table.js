import React, { Component } from 'react';

class Table extends Component {
    code = React.createRef()
    name = React.createRef()
    tipology = React.createRef()
    credits = React.createRef()
    grade = React.createRef()

    

    addCourseToPeriod = () => {
        const code = this.code.current.value
        const name = this.name.current.value
        const credits = this.credits.current.value
        const grade = this.grade.current.value
        const tipology = this.tipology.current.value
        const course = ["", code, "", name, "", "", "", tipology, credits, "", grade]
        this.props.action(course)
        // this.code.current.value =" hey"
    }
    render() {
        if (this.props.data === null) return null

        let courses = this.props.data.courses;
        return (
            <div>

                <div className="box is-dark">
                    <p className="subtitle"> {this.props.data.name}</p>
                    <table className="table  is-mobile is-fullwidth is-size-7">
                        <thead>
                            <tr>
                                <th>Codigo     </th>
                                <th>Nombre     </th>
                                <th>Tipologia  </th>
                                <th>Creditos   </th>
                                <th>Nota       </th>
                                <th>Nota       </th>
                            </tr>

                        </thead>
                        <tbody>
                            {Object.keys(courses).map(key => (
                                <tr>
                                    <th>{courses[key][1]}</th>
                                    <td><a title="">{courses[key][3]}</a></td>
                                    <td>{courses[key][7]}</td>
                                    <td>{courses[key][8]}</td>
                                    <td>{courses[key][10]}</td>

                                </tr>

                            ))}

                        </tbody>
                    </table>



                </div>
                <div className="box">

                    <table className="table is-mobile is-fullwidth is-size-7">
                        <tbody>
                            <tr>
                                <td><input className="input is-small is-link" placeholder="Codigo de la asignatura" ref={this.code} /></td>
                                <td><input className="input is-small is-link" placeholder="Nombre de la asignatura" ref={this.name} /></td>
                                <td>
                                    <div className="select is-small">
                                        <select ref={this.tipology}>
                                            <option value="C">Disciplinar</option>
                                            <option value="L" >Electiva</option>
                                            <option value="B">Fundamentacion</option>
                                        </select>
                                    </div>
                                </td>
                                <td><input className="input is-small is-link" placeholder="Creditos" ref={this.credits} /></td>
                                <td><input className="input is-small is-link" placeholder="Nota" ref={this.grade} /></td>
                            </tr>

                        </tbody>

                    </table>
                    <button className="button is-fullwidth is-info is-small" onClick={this.addCourseToPeriod}>
                        <i className="fas fa-plus-circle"></i>
                    </button>

                </div>
            </div>

        );
    }
}

export default Table;
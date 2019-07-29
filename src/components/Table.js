import React, { Component } from 'react';
import axios from 'axios'
class Modal extends Component {
    code = React.createRef()
    name = React.createRef()
    tipology = React.createRef()
    credits = React.createRef()
    grade = React.createRef()
    handle = () => {
        const code = this.code.current.value
        const name = this.name.current.value
        const credits = this.credits.current.value
        const grade = this.grade.current.value
        const tipology = this.tipology.current.value
        const course = ["", code, "", name, "", "", "", tipology, credits, "", grade]
        this.props.update(this.props.key_c, course);
        this.props.closeModal()
    }
    render() {
        let modalState = this.props.modalState;
        if (!modalState) return null;
        return (
            <div>
                <div className="modal is-active">
                    <div className="modal-background" onClick={this.props.closeModal} />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{this.props.title}</p>
                            <button className="delete" onClick={this.props.closeModal} />
                        </header>
                        <section className="modal-card-body">
                            <table className="table is-mobile is-fullwidth is-size-7">
                                <tbody>
                                    <tr>
                                        <td><input className="input is-small is-link" defaultValue={this.props.code} placeholder="Codigo de la asignatura" ref={this.code} /></td>
                                        <td><input className="input is-small is-link" defaultValue={this.props.name} placeholder="Nombre de la asignatura" ref={this.name} /></td>
                                        <td>
                                            <div className="select is-small">
                                                <select ref={this.tipology} defaultValue={this.props.tipology}>
                                                    <option value="C">Disciplinar</option>
                                                    <option value="L" >Electiva</option>
                                                    <option value="B">Fundamentacion</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td><input className="input is-small is-link" defaultValue={this.props.credits} placeholder="Creditos" ref={this.credits} /></td>
                                        <td><input className="input is-small is-link" defaultValue={this.props.grade} placeholder="Nota" ref={this.grade} /></td>
                                    </tr>

                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Codigo       </th>
                                        <th>Nombre       </th>
                                        <th>Tipologia    </th>
                                        <th>Creditos     </th>
                                        <th>Nota         </th>
                                    </tr>
                                </thead>
                            </table>

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button" onClick={this.props.closeModal}>Cancel</button>
                            <button className="button is-primary" onClick={this.handle}>Editar</button>
                        </footer>
                    </div>
                </div>

            </div>
        );
    }
}


class Table extends Component {
    code = React.createRef()
    name = React.createRef()
    tipology = React.createRef()
    credits = React.createRef()
    grade = React.createRef()
    constructor() {
        super()
        this.state = {
            modalState: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }


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
    deleteCourseToPeriod = (key) => {
        this.props.delete(key)
    }
    editCourse = key => {
        //Habilita el modal para la edición respectiva
        let courses = this.props.data.courses
        let type = "B"

        let code = courses[key][1]
        let name = courses[key][3]
        let credits = courses[key][8]
        let grade = courses[key][10]
        if (courses[key][7] === "T" || [key][7] === "C") type = "C"
        if (courses[key][7] === "L") type = "L"

        let tipology = type
        this.setState({
            code: code,
            name: name,
            credits: credits,
            grade: grade,
            tipology: tipology,
            key_c: key
        })
        this.toggleModal()


    }
    updateCourse = (key, course) => {
        //Recibe el curso del modal y actualiza el curso  del periodo actual
        this.props.update(key, course)
    }
    toggleModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
    }
    clearForm =  e => {
        this.code.current.value = ""
        this.name.current.value = ""
        this.grade.current.value = ""
        this.credits.current.value = ""
    }
    testRequest = ({name})=>{
        const request = `{"method": "buscador.obtenerAsignaturas", "params": ["gobierno", "PRE", "", "PRE", "", "", 1, 10]}        `
        axios.post("https://siabog.unal.edu.co/buscador/JSON-RPC", request )
        .then(res => {
            console.log(res)
        }).catch(function( error){
            console.log(error)
        })

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
                                <th>Codigo       </th>
                                <th>Nombre       </th>
                                <th>Tipologia    </th>
                                <th>Creditos     </th>
                                <th>Nota         </th>
                                <th>Editar/Borrar</th>
                            </tr>

                        </thead>
                        <tbody>
                            {Object.keys(courses).map(key => (
                                <tr>
                                    <th>{courses[key][1]}</th>
                                    <td>{courses[key][3]}</td>
                                    <td>{courses[key][7]}</td>
                                    <td>{courses[key][8]}</td>
                                    <td>{courses[key][10]}</td>
                                    <td>
                                        <div className="buttons has-addons is-small">
                                            <button className="button is-small is-link" onClick={this.editCourse.bind(this, key)}><i className="far fa-edit"></i></button>
                                            <button className="button is-small is-danger" onClick={this.deleteCourseToPeriod.bind(this, key)}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </td>


                                </tr>

                            ))}

                        </tbody>
                    </table>



                </div>
                <div className="box">
                    <h1 className = "subtitle">Agregar asignatura</h1>

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
                        <thead>
                            <tr>
                                <th>Codigo       </th>
                                <th>Nombre       </th>
                                <th>Tipologia    </th>
                                <th>Creditos     </th>
                                <th>Nota         </th>
                            </tr>
                        </thead>
                    </table>
                    <button className="button is-fullwidth is-info is-small" onClick={this.addCourseToPeriod}>
                        <i className="fas fa-plus-circle"></i>
                    </button>

                    <div className="columns">
                        <div className="column">
                            <button className="button is-small is-link is-fullwidth" onClick={this.testRequest}> Buscar en el SIA <i class="fas fa-search-plus"></i></button>

                        </div>
                        <div className="column">
                            <button className="button is-small is-danger is-fullwidth" onClick={this.clearForm}>Limpiar campos <i className="fas fa-trash"></i></button>

                        </div>
                    </div>

                </div>
                <Modal
                    closeModal={this.toggleModal}
                    modalState={this.state.modalState}
                    title="Editar materia"
                    // change={this.changeInput}
                    // action={this.addPeriod}
                    code={this.state.code}
                    name={this.state.name}
                    credits={this.state.credits}
                    tipology={this.state.tipology}
                    grade={this.state.grade}
                    key_c={this.state.key_c}
                    update={this.updateCourse}
                >
                </Modal>
            </div>

        );
    }
}

export default Table;
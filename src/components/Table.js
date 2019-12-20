import React, { Component } from 'react';
import axios from 'axios'
import { Spring } from 'react-spring/renderprops'

class ModalSIA extends Component {
    search = React.createRef();
    constructor() {
        super()
        this.state = {
            courses: []
        }
    }
    siaRequest = () => {
        const name = this.search.current.value
        if (name === "") {
            alert("El campo no debe ir vacio")
            return
        }
        let config = {
            headers: {
                'Content-type': 'text/plain',
                'Accept': '*/*',
                'Accept-Encodig': 'gzip, deflate, br0',
                'Access-Control-Allow-Origin': 'true'
            }
        }
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const request = `{"method": "buscador.obtenerAsignaturas", "params": [${name}, "PRE", "", "PRE", "", "", 1, 25]}        `
        axios.post(PROXY_URL + "https://siabog.unal.edu.co/buscador/JSON-RPC",
            request, config
        )
            .then(res => {
                this.setState({ courses: res.data.result.asignaturas.list })
            }).catch()
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
                            <div className="field has-addons">
                                <p className="control is-expanded">
                                    <input className="input is-dark" ref={this.search} type="text" placeholder="Bogota musical" /></p>
                                <p className="control">
                                    <button className="button is-info" onClick={this.siaRequest}>
                                        Buscar
                                    </button>
                                </p>
                            </div>
                            <table className="table is-mobile is-fullwidth is-size-7">
                                <tbody>
                                    {Object.keys(this.state.courses).map(key => (
                                        <tr>
                                            <th>{this.state.courses[key].id_asignatura}</th>
                                            <th>{this.state.courses[key].nombre}</th>
                                            <th>{this.state.courses[key].tipologia}</th>
                                            <th>{this.state.courses[key].creditos}</th>
                                            <th><button className="button is-warning is-small"
                                                onClick={() => {
                                                    {
                                                        this.props.autocomplete(this.state.courses[key]);
                                                        this.props.closeModal()
                                                    }
                                                }}
                                            >
                                                <i className="far fa-plus-square"></i></button></th>
                                        </tr>
                                    ))}
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Codigo       </th>
                                        <th>Nombre       </th>
                                        <th>Tipologia    </th>
                                        <th>Creditos     </th>
                                        <th>Autocompletar     </th>
                                    </tr>
                                </thead>
                            </table>

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button" onClick={this.props.closeModal}>Cancelar</button>
                        </footer>
                    </div>
                </div>

            </div>
        );
    }
}
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
            modalStateSIA: false,

        }
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalSIA = this.toggleModalSIA.bind(this);
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
        if (courses[key][7] === "T" || courses[key][7] === "C") type = "C"
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
    toggleModalSIA() {
        this.setState((prev, props) => {
            const newState = !prev.modalStateSIA;

            return { modalStateSIA: newState };
        });
    }
    clearForm = e => {
        this.code.current.value = ""
        this.name.current.value = ""
        this.grade.current.value = ""
        this.credits.current.value = ""
    }
    autocomplete = (course) => {
        let type = "B"
        if (course.tipologia === "T" || course.tipologia === "C") type = "C"
        if (course.tipologia === "L") type = "L"

        this.code.current.value = course.id_asignatura
        this.name.current.value = course.nombre
        this.credits.current.value = course.creditos
        this.tipology.current.value = type
        this.grade.current.value = ""
    }
    render() {
        if (this.props.data === null) return null

        let courses = this.props.data.courses;
        return (
            <div>
                <Spring
                    from={{ opacity: 0, marginRight: -3000  }}
                    to={{ opacity: 1, marginRight: 0 }}
                    reset = {true}
                    config = {{mass: 1.5}}
                >
                    {props => (
                        <div style={props}>


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
                        </div>
                    )}
                </Spring>
                <div className="box">
                    <h1 className="subtitle">Agregar asignatura</h1>

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
                            <button unselectable className="button is-small is-dark is-fullwidth" onClick={this.toggleModalSIA}> Autocompletar con el buscador del SIA <i class="fas fa-search-plus"></i></button>

                        </div>
                        <div className="column">
                            <button className="button is-small is-danger is-fullwidth" onClick={this.clearForm}>Limpiar campos <i className="fas fa-trash"></i></button>

                        </div>
                    </div>

                </div>
                <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ duration: 700 }}
                    reset={true}
                >
                    {props => (
                        <div style={props}>
                            <ModalSIA
                                closeModal={this.toggleModalSIA}
                                modalState={this.state.modalStateSIA}
                                title="Buscar materia"
                                autocomplete={this.autocomplete}
                            >
                            </ModalSIA>

                        </div>
                    )}
                </Spring>
                <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ duration: 700 }}
                    reset={true}
                >
                    {props => (
                        <div style={props}>
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
                    )}
                </Spring>
            </div>

        );
    }
}

export default Table;
import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import {
    BarChart, Bar, Brush, Legend,
} from 'recharts';
import Table from './Table'
import { Spring } from 'react-spring/renderprops'



class Modal extends Component {
    year = React.createRef();
    semester = React.createRef();
    handle = () => {
        const period = `${this.year.current.value}-${this.semester.current.value}`
        this.props.action(period);
    }
    render() {
        let modalState = this.props.modalState;
        let date = new Date();
        let years = [date.getFullYear() - 2, date.getFullYear() - 1, date.getFullYear(), date.getFullYear() + 1, date.getFullYear() + 2];
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
                            <div className="field is-grouped">
                                <div className="control">

                                    <div className="select is-rounded is-dark">
                                        <select ref={this.year}>
                                            {Object.keys(years).map(key => (
                                                <option value={years[key]} > {years[key]}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="select is-rounded is-dark is-expanded">
                                        <select ref={this.semester}>
                                            <option value="I" >I</option>
                                            <option value="II" >II</option>
                                        </select>

                                    </div>

                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button" onClick={this.props.closeModal}>Cancel</button>
                            <button className="button is-primary" onClick={this.handle}>Asignar</button>
                        </footer>
                    </div>
                </div>

            </div>
        );
    }
}


const BrushBarChart = (props) => {
    let courses = [];
    let count = 1;
    props.data.forEach(period => {
        period.courses.forEach(course => {
            const cour = {
                name: course[3],
                nota: course[10],
                count: count
            }
            // console.log(cour)
            courses.push(cour)
            count++;
        });

    });

    return (
        <BarChart
            width={700}
            height={300}
            data={courses}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="count" height={30} stroke="#8884d8" />
            <ReferenceLine y={3} label="min" stroke="red" />
            <Bar dataKey="nota" fill="#8884d8" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}

        </BarChart>
    )

}
const RenderLineChart = (props) => {
    return (
        <div>
            <LineChart width={700} height={300} data={props.data}>
                <Line type="monotone" dataKey="PAPA" stroke="#8884d8" />
                <Line type="monotone" dataKey="PAPPI" stroke="#82ca9d" />
                <Line type="monotone" dataKey="PA" stroke="#ba525e" />
                <CartesianGrid strokeDasharray="3 3" />
                <ReferenceLine y={3} label="min" stroke="red" />
                <ReferenceLine y={5} label="max" stroke="blue" />

                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>

        </div>
    );
};
const RenderRadar = (props) => {

    return (
        <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={props.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Tipologia" dataKey="average" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />

        </RadarChart>
    )
}
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, {name: 'Page B', uv: 500, pv: 240, amt: 2400 }, {name: 'Page c', uv: 200, pv: 240, amt: 2400 }];

class Malla extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalState: false,
            years: [],
            periods: [],
            dataRadar: [],
            add: false,
            currentPeriod: null,
        };
        this.calculatePAPA = this.calculatePAPA.bind(this);
        this.setPeriod = this.setPeriod.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.calculateAll = this.calculateAll.bind(this);
    }
    toggleModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
    }
    changeInput(e) {
        this.setState({ name: e.target.value })
    }

    calculatePAPPI(courses) {
        var creditos = 0;
        var PAPPI = 0;
        for (var i = 0; i < courses.length; i++) {
            const cond = courses[i][7] === "T" || courses[i][7] === "O" || courses[i][7] === "C" || courses[i][7] === "L" || courses[i][7] === "B"
            if (cond || courses[i][1] === "1000001") {
                creditos = creditos + parseInt(courses[i][8]);
                PAPPI = PAPPI + courses[i][8] * courses[i][10];
            }
        }
        return (PAPPI / creditos).toFixed(2);
    }
    calculatePAPA(courses, creditsPerScore, totalCredits, lost, creditsPerScorePA, credtisPA) {
        var creditos = totalCredits;
        var ac = creditsPerScore //acumulado
        for (var i = 0; i < courses.length; i++) {
            const cond = courses[i][7] === "T" || courses[i][7] === "O" || courses[i][7] === "C" || courses[i][7] === "L" || courses[i][7] === "B"
            if (cond || courses[i][1] === "1000001") {
                //Para el calculo del PA se tiene en cuenta las materias perdidas
                //verificamos si la materia estubo perdida
                const currentCourse = courses[i]
                const lostCourse = lost[courses[i][1]]
                if (lostCourse !== undefined) {
                    if (currentCourse[10] > lostCourse[10] && currentCourse[10] > 3) {
                        lost[currentCourse[1]] = undefined;
                        //actualizar PA, resta  al acumulado  lostCourse[10]*#creditos + currentCourse[10]#numeroCreditos
                        creditsPerScorePA += currentCourse[10] * currentCourse[8] - lostCourse[10] * lostCourse[8]

                    } else if (currentCourse[10] > lostCourse[10] && currentCourse[10] < 3) {
                        //actualizar PA, resta  al acumulado  lostCourse[10]*#creditos + currentCourse[10]#numeroCreditos
                        lost[currentCourse[1]] = Object.assign({}, currentCourse)
                        creditsPerScorePA += currentCourse[10] * currentCourse[8] - lostCourse[10] * lostCourse[8]

                    }
                } else {
                    //si se perdio la materia y no esta registrada (primera vez que se pierde)
                    if (courses[i][10] < 3) {
                        lost[courses[i][1]] = Object.assign({}, currentCourse)
                        creditsPerScorePA += currentCourse[10] * currentCourse[8]
                        credtisPA += parseInt(currentCourse[8])
                    } else {
                        //si se pasa la materia normalmente
                        creditsPerScorePA += currentCourse[10] * currentCourse[8]
                        credtisPA += parseInt(currentCourse[8])
                    }
                    //actualizar pa y numero de creditos
                }

                creditos = creditos + parseInt(courses[i][8]);
                ac = ac + courses[i][8] * parseFloat(courses[i][10]);
            }
        }
        //ac = ac.toFixed(1);

        return [(ac / creditos).toFixed(2), ac, creditos, lost, creditsPerScorePA, credtisPA, (creditsPerScorePA / credtisPA).toFixed(2)];
    }
    setPeriod(data) {
        // console.log(data)
        this.setState({ currentPeriod: data })
    }
    ItemPeriod = (props) => {

        return (
            <div>
                <div className="timeline-item is-success">
                    <button className="timeline-marker is-link is-icon button is-small" onClick={
                        () => {
                            // console.log(props)
                            this.setPeriod(props);
                            window.scrollTo(0, 0)

                        }

                    }
                    >
                        <i className="far fa-eye"></i>
                    </button>
                    <div className="timeline-content">
                        <p className="heading">{props.name}</p>
                        <p>PAPA: {props.PAPA} - PAPPI: {props.PAPPI} - PA:{props.PA} </p>
                    </div>
                </div>
            </div>
        );

    };
    ItemYear = (props) => {
        return (
            <div>
                <header className="timeline-header">
                    <span className="tag is-primary">{props.year}</span>
                </header>
                {Object.keys(props.periods).map(key => (
                    this.ItemPeriod(props.periods[key])
                ))}
            </div>
        );
    };
    //se agrega un curso al periodo
    updatePeriod = (props) => {
        // console.log(props)
        let period = this.state.currentPeriod
        period.courses.push(props);
        this.setState({ currentPeriod: period })
    }
    deleteCourse = (key) => {
        let period = this.state.currentPeriod
        let courses = [...period.courses]
        courses.splice(key, 1)
        period.courses = courses
        this.setState({ currentPeriod: period })
    }
    updateCourse = (key, course) => {
        let period = this.state.currentPeriod
        let courses = [...period.courses]
        courses[key] = course
        period.courses = courses
        this.setState({ currentPeriod: period })
    }
    averagePerTopology(periods) {
        var courses;

        var fundamentation;
        var disciplinar;
        var elective;

        var creditsL = 0;
        var scorePerCredtis_L = 0;

        var creditsOF = 0;
        var scorePerCredtis_OF = 0;

        var creditsOPF = 0;
        var scorePerCredtis_OPF = 0;

        var creditsOD = 0;
        var scorePerCredtis_OD = 0;

        var creditsOPD = 0;
        var scorePerCredtis_OPD = 0;
        //B FUNDAMENTAL OBLIGATORIA
        //O FUNDAMENTAL OPTATIVA

        //C DISCIPLINAR OBLIGATORIA
        //T DISCIPLINAR OPTATIVA

        //L LIBRE ELECCIÓN
        //TRABAJO DE GRADO
        for (var i = 0; i < periods.length; i++) {
            courses = periods[i].courses;
            for (var j = 0; j < courses.length; j++) {
                if (courses[j][7] === 'L') {
                    scorePerCredtis_L += courses[j][8] * parseFloat(courses[j][10]);
                    creditsL += parseInt(courses[j][8]);
                }

                if (courses[j][7] === 'B') {
                    scorePerCredtis_OF += courses[j][8] * parseFloat(courses[j][10]);
                    creditsOF += parseInt(courses[j][8]);
                }
                if (courses[j][7] === 'O') {
                    scorePerCredtis_OPF += courses[j][8] * parseFloat(courses[j][10]);
                    creditsOPF += parseInt(courses[j][8]);
                }

                if (courses[j][7] === 'C') {
                    scorePerCredtis_OD += courses[j][8] * parseFloat(courses[j][10]);
                    creditsOD += parseInt(courses[j][8]);
                }
                if (courses[j][7] === 'T') {
                    scorePerCredtis_OPD += courses[j][8] * parseFloat(courses[j][10]);
                    creditsOPD += parseInt(courses[j][8]);
                }

            }
        }
        fundamentation = ((scorePerCredtis_OF + scorePerCredtis_OPF) / (creditsOF + creditsOPF)).toFixed(2);
        disciplinar = ((scorePerCredtis_OD + scorePerCredtis_OPD) / (creditsOD + creditsOPD)).toFixed(2)
        elective = scorePerCredtis_L / creditsL;

        return [fundamentation, disciplinar, elective];

    }
    calculateAll(per) {

        var periods = [];
        var years = [];
        periods = [...per]
        this.setState({ years: [], periods: [] })
        var creditsPerScore = 0;
        var totalCredits = 0
        var result;
        var fundamentation;
        var disciplinar;
        var elective;
        var radar;
        let lost = {}
        var creditsPerScorePA = 0;
        let creditsPA = 0;

        //nota por tipologia (Electiva, obligatoria fundamental, optativa fundamental, disciplinar obligatoria y optativa disciplinar)
        //calculo del papi, pappa
        // lost["hey"] =" hola"

        for (var i = 0; i < periods.length; i++) {
            const PAPPI = this.calculatePAPPI(periods[i].courses);
            periods[i].PAPPI = PAPPI;

            result = this.calculatePAPA(periods[i].courses, creditsPerScore, totalCredits, lost, creditsPerScorePA, creditsPA)
            periods[i].PAPA = result[0];
            periods[i].PA = result[6];
            creditsPerScore = result[1];
            totalCredits = result[2];
            lost = result[3]
            creditsPerScorePA = result[4]
            creditsPA = result[5]
            // console.log("result", JSON.stringify(result[3]))
        }

        [fundamentation, disciplinar, elective] = this.averagePerTopology(periods);

        radar = [
            { name: "Fundamentacion", average: parseFloat(fundamentation) },
            { name: "Disciplinar", average: parseFloat(disciplinar) },
            { name: "Electiva", average: parseFloat(elective) }
        ]
        this.setState({ dataRadar: radar })
        this.setState({ periods: periods })
        for (i = 0; i < periods.length; i++) {
            if (years.length === 0 || periods[i].name.split("-")[0] !== years[years.length - 1].year) {
                years.push({
                    year: periods[i].name.split("-")[0],
                    periods: []
                });
                years[years.length - 1].periods.push(periods[i])
            } else if (periods[i].name.split("-")[0] === years[years.length - 1].year) {
                years[years.length - 1].periods.push(periods[i])
            }

            this.setState({ years: years })
        }

    }

    componentDidMount() {
        this.calculateAll(this.props.info.periods)
    }

    addPeriod = (name) => {
        // console.log(name)
        let years = [...this.state.years];
        let lastYear = years.length;
        let periods = [...this.state.periods];
        let period = {
            name: name,
            courses: [],
            PA: "NA",
            PAPA: "NA",
            PAPPI: "NA"
        }
        // period.name = this.state.name
        years[lastYear - 1].periods.push(period)
        periods.push(period);
        this.setState({ years: years, periods: periods, currentPeriod: period })
        this.toggleModal()
        window.scrollTo(0, 0)

    }
    savePeriods = () => {
        localStorage.setItem('periods', JSON.stringify(this.state.periods))
        alert("Se ha guardado, la proxima vez que abra la pagina no tendra que copiar la historia academica")
        // console.log(JSON.parse(localStorage.getItem('periods')))
    }
    render() {

        return (
            <div className="columns">
                <div className="column is-one-third notification box">
                    <div className="timeline">
                        <header className="timeline-header">
                            <button className="tag is-medium is-link button" onClick={() => {

                                this.calculateAll(this.state.periods)
                                alert("se ha actualizado con exito los promedios")
                            }}>
                                <i className="fas fa-sync"></i>
                            </button>
                        </header>
                        <div className="timeline-item is-primary">
                            <div className="timeline-marker is-warning"></div>
                            <div className="timeline-content">
                                <p className="heading">NO se tiene en cuenta los creditos cancelados para el calculo del PAPPI</p>
                                <p >Click en el ojo para ver los detalles</p>
                                <i className="far fa-eye"></i>

                                <p >En caso de agregar un cambio dar click en actualizar</p>
                                <i className="fas fa-sync"></i>


                            </div>
                        </div>

                        {Object.keys(this.state.years).map(key => (
                            this.ItemYear(this.state.years[key])
                        ))}

                        <header className="timeline-header">
                            <button className="tag is-medium is-primary button " onClick={this.toggleModal}>
                                <i className="fas fa-plus-circle"></i>
                            </button>
                        </header>

                    </div>

                    <div className="box">
                        <div className="field is-grouped">
                            <p className="control">
                                <button className="button is-link" onClick={this.savePeriods}>
                                    Guardar datos en el navegador
                                 </button>
                            </p>
                            <p className="control">
                                <button className="button is-danger" onClick={
                                    () => {
                                        localStorage.clear();
                                        alert("Se ha eliminado los datos del navegador")
                                    }
                                }>
                                    Borrar datos
                                </button>
                            </p>
                        </div>
                    </div>

                </div>
                <div className="column">
                    <Table data={this.state.currentPeriod}
                        action={this.updatePeriod}
                        delete={this.deleteCourse}
                        update={this.updateCourse}
                    />
                    <RenderLineChart data={this.state.periods} />
                    <BrushBarChart data={this.state.periods} />
                    <RenderRadar data={this.state.dataRadar} />

                </div>
                <Spring
                    from={{ opacity: 0}}
                    to={{ opacity: 1 }}
                    config = {{duration: 700}}
                    reset={true}
                >
                    {props => (
                        <div style={props}>
                            <Modal
                                closeModal={this.toggleModal}
                                modalState={this.state.modalState}
                                title="¿Cual es el periodo academico?"
                                action={this.addPeriod}
                            >
                            </Modal>
                        </div>
                    )}
                </Spring>

          
                
       
            </div>
        );
    }
}

export default Malla;
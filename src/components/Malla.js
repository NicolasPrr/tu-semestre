import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis , Tooltip, ReferenceLine} from 'recharts';

const RenderLineChart = (props) => {
    return (
        <div>
            <LineChart width={800} height={300} data={props.data}>
                <Line type="monotone" dataKey="PAPA" stroke="#8884d8" />
                <Line type="monotone" dataKey="PAPPI" stroke="#82ca9d" />
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

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 500, pv: 240, amt: 2400 }, { name: 'Page c', uv: 200, pv: 240, amt: 2400 }];

class Malla extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [],
            periods: [],
        };
        this.calculatePAPA = this.calculatePAPA.bind(this);
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
    calculatePAPA(courses, creditsPerScore, totalCredits) {
        var creditos = totalCredits;
        var ac = creditsPerScore
        for (var i = 0; i < courses.length; i++) {
            const cond = courses[i][7] === "T" || courses[i][7] === "O" || courses[i][7] === "C" || courses[i][7] === "L" || courses[i][7] === "B"
            if (cond || courses[i][1] === "1000001") {
                creditos = creditos + parseInt(courses[i][8])
                ac = ac + courses[i][8] * parseFloat(courses[i][10])
            }
        }
        //ac = ac.toFixed(1);
        console.log(ac.toFixed)
        return [(ac / creditos).toFixed(2), ac, creditos];
    }
    ItemPeriod = (props) => {

        return (
            <div>
                <div className="timeline-item is-success">
                    <div className="timeline-marker is-warning"></div>
                    <div className="timeline-content">
                        <p className="heading">{props.name}</p>
                        <p>PAPA: {props.PAPA} - PAPPI: {props.PAPPI} - PA:4.0 </p>
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

    componentDidMount() {
        var periods = [];
        var years = [];
        periods = this.props.info.periods
        var creditsPerScore = 0;
        var totalCredits = 0
        var result;
        for (var i = 0; i < periods.length; i++) {
            const PAPPI = this.calculatePAPPI(periods[i].courses);
            result = this.calculatePAPA(periods[i].courses, creditsPerScore, totalCredits)
            periods[i].PAPPI = PAPPI;
            periods[i].PAPA = result[0];
            creditsPerScore = result[1];
            totalCredits = result[2];
        }
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
        console.log(years);
        //procedemos a encontrar el PAPPI}


    }

    render() {

        return (
            <div className="columns">
                <div className="column is-one-third notification">
                    <div className="timeline">
                        <header className="timeline-header">
                            <span className="tag is-medium is-primary">Inicio</span>
                        </header>
                        <div className="timeline-item is-primary">
                            <div className="timeline-marker is-warning"></div>
                            <div className="timeline-content">
                                <p className="heading">NO se tiene en cuenta los creditos cancelados para el calculo del PAPPI</p>

                                <p className="heading">PAPA:0</p>
                                <p className="heading">PAPPI: 0</p>
                                <p className="heading">PA: 0</p>
                            </div>
                        </div>

                        {Object.keys(this.state.years).map(key => (
                            this.ItemYear(this.state.years[key])
                        ))}

                        <header className="timeline-header">
                            <span className="tag is-medium is-primary">End</span>
                        </header>
                    </div>

                </div>
                <div className="column">
                    {<RenderLineChart data = {this.state.periods} />}
                </div>
            </div>
        );
    }
}

export default Malla;
import React from 'react';

const Table = (props) => {
    if (props.data === null) return null
    return (
        <div className="box is-dark">
            <p className="title"> {props.data.name}</p>
            <table className="table  is-mobile is-fullwidth is-size-7">
                <thead>

                    <th>Codigo</th>
                    <th><abbr title="Code">Nombre</abbr></th>
                    <th><abbr title="Note">Nota</abbr></th>

                </thead>
                <tbody>
                    {Object.keys(props.data.courses).map(key => (
                        <tr>
                            <th>{props.data.courses[key][1]}</th>
                            <td><a title="">{props.data.courses[key][3]}</a></td>
                            <td>{props.data.courses[key][10]}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default Table;
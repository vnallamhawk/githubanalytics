import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Table extends React.Component {
  render() {

    let imageFormatter = (cell, row) => {
      return (<img style={{ width: 30 }} src={cell} alt="avatar" />)
    }

    let setColumnTemplate = (key, value) => {
      return key === "id" ?
        <TableHeaderColumn dataField={key} isKey >{value}</TableHeaderColumn> :
        (key === "avatar" ?
          <TableHeaderColumn dataField={key} dataFormat={imageFormatter}>{value}</TableHeaderColumn> :
          <TableHeaderColumn dataField={key}>{value}</TableHeaderColumn>)
    };

    let columns = [];

    for (let [k, v] of Object.entries(this.props.columns)) {
      columns.push(setColumnTemplate(k, v));
    }

    console.log(columns);

    return (
      <BootstrapTable
        data={this.props.data}
        striped hover>
        {columns}
      </BootstrapTable>
    )
  }
}

export default Table;
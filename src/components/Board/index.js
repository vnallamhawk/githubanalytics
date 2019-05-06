import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';

import Table from '../Table';

class Board extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div key={this.props.id} className="board"><Card header={<h1>{this.props.header}</h1>}>
            <Card>
                <Card.Body><h3>{this.props.header}</h3></Card.Body>
            </Card>
            <Table data={this.props.content} columns={this.props.columns} />
            <div className="buttonContainer">
            <Button id={this.props.id} bsClass="btn btn-primary" onClick={this.props.handleClick}>Update {this.props.type}</Button>
            </div>
        </Card></div>);
    }
}

export default Board;

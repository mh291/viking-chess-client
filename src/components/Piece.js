import React, {Component} from 'react';

class Piece extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieceColor: props.pieceColor
        };
    }

    render() {
        return <div> Piece is {this.state.pieceColor}</div>;
    }
}

export default Piece
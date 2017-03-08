import '../App.css';
import React from 'react';
import Square from './Square'

function GameBoard(props) {
    const length = props.board.length;
    let rows = new Array(length);

    for (let i = 0; i < length; i++) {
        let subRow = [];
        for (let j = 0; j < length; j++) {
            subRow.push(<Square 
                            key={i * j + 13 * j} 
                            value={props.board[i][j].type} 
                            selectPiece={(event, row, col) => props.selectPiece(event, row, col)} 
                            row={i} 
                            col={j} 
                            isSelected={props.sourceSquare && props.sourceSquare.row === i && props.sourceSquare.col === j}
                        />);
        }
        let row = <div className="row-div" key={i*17}>{subRow}</div>; 
        rows[i] = row;
    }
  
    return <div>{rows}</div>
}
  
export default GameBoard
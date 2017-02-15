import React from 'react';

function Square(props) {
    let borderStyle = props.isSelected ? "Source-button" : "";
    return (        
        <button className={"Square-button " + borderStyle} onClick={() => props.selectPiece(event, props.row, props.col)}>
            {props.value}
        </button>
    );
}
  
export default Square
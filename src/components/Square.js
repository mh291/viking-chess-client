import '../App.css';
import React from 'react';
import blackRook from '../images/blackrook.png'
import whiteRook from '../images/whiterook.png'
import whiteKing from '../images/whiteking.png'
import x from '../images/x.png'

const PieceImageMap = {
    0: null,
    1: whiteRook,
    2: whiteKing,
    3: blackRook,
    4: x
};

function Square(props) {
    let borderStyle = props.isSelected ? "Source-button" : "";
    let image = props.value === 0 ? "" : <img className={"piece"} src={PieceImageMap[props.value]} />;

    return (        
        <button className={"Square-button " + borderStyle} onClick={() => props.selectPiece(event, props.row, props.col)}>
            {image}
        </button>
    );
}
  
export default Square
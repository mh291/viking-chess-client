import React, { Component } from 'react';
import Square from './Square'

const BoardSpaceEnum = {
    EMPTY: '', //used to be 0 but looks cleaner 
    WHITE_VIKING: 1,
    WHITE_KING: 2,
    BLACK_ATTACKER: 3,
    SAFE_ZONE: 4
};

const INIT_GAME_SETUP = [
    [ BoardSpaceEnum.SAFE_ZONE, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER, 
      BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.SAFE_ZONE],
    [ BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY,
      BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY],
    [ BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, 
     BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY],
    [ BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, 
     BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.BLACK_ATTACKER],
    [ BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.WHITE_VIKING, 
     BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.BLACK_ATTACKER],
    [ BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.WHITE_VIKING, 
     BoardSpaceEnum.WHITE_KING, BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.EMPTY, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER],
    [ BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.WHITE_VIKING, 
      BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.BLACK_ATTACKER],
    [ BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, 
      BoardSpaceEnum.WHITE_VIKING, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.BLACK_ATTACKER],
    [ BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, 
      BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY],
    [ BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, 
      BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY],
    [ BoardSpaceEnum.SAFE_ZONE, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER, 
      BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.BLACK_ATTACKER, BoardSpaceEnum.EMPTY, BoardSpaceEnum.EMPTY, BoardSpaceEnum.SAFE_ZONE]
];

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPlayer: 1,
        board: this.createInitialBoard(props.size), 
        isOver: false
    };
  }

  createInitialBoard(size) {
    let rows = new Array(size);

    for (let i = 0; i < size; i++) {
        let subRow = [];
        for (let j = 0; j < size; j++) {
            subRow.push(<Square key={i*j + 13*j} value={INIT_GAME_SETUP[i][j]}/>);
        }
        let row = <div className="row-div" key={i*17}>{subRow}</div>;
        rows[i] = row;
    }
   
    return rows
  }

  // attempt to move piece 
  movePiece() {

  }

  fillBoardWithSquares = () =>{
      let converted = [];
      for (let i = 0; i < this.state.board.length; i++) {
        for (let j = 0; j < this.state.board[0].length; j++) {
            converted[i][j] = <Square key={i} value={this.state.board[i][j]}/>;
        }
      }
      return converted;
  }

  render() {
    return (
      <div className="Game-div"> 
        {this.state.board}
      </div>
    );
  }
}

export default GameBoard
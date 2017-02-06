import React, { Component } from 'react';

const BoardSpaceEnum = {
    EMPTY: 0,
    WHITE_VIKING: 1,
    WHITE_KING: 2,
    BLACK_ATTACKER: 3
};

const BLACK_PIECE_ATTACKER_INITIAL_POSITIONS = [
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 5],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [5, 1],
    [3, 10],
    [4, 10],
    [5, 10],
    [6, 10],
    [7, 10],
    [5, 9],
    [10, 3],
    [10, 4],
    [10, 5],
    [10, 6],
    [10, 7],
    [9, 5]
];

const WHITE_PIECE_KING_INITIAL_POSITIONS = [
    [5, 5]
];

const WHITE_PIECE_VIKING_INITIAL_POSITIONS = [
    [3, 5],
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 3],
    [5, 4],
    [5, 6],
    [5, 7],
    [6, 4],
    [6, 5],
    [6, 6],
    [7, 5]
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
    let array = new Array(size);
    for (let i = 0; i < size; i++) {
        array[i] = new Array(size);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            array[i][j] = BoardSpaceEnum.EMPTY;
        }
    }

    for (let i = 0; i < WHITE_PIECE_VIKING_INITIAL_POSITIONS.length; i++) {
        let pos = WHITE_PIECE_VIKING_INITIAL_POSITIONS[i];
        array[pos[0]][pos[1]] = BoardSpaceEnum.WHITE_VIKING;
    }

    for (let i = 0; i < WHITE_PIECE_KING_INITIAL_POSITIONS.length; i++) {
        let pos = WHITE_PIECE_KING_INITIAL_POSITIONS[i];
        array[pos[0]][pos[1]] = BoardSpaceEnum.WHITE_KING;
    }

    for (let i = 0; i < BLACK_PIECE_ATTACKER_INITIAL_POSITIONS.length; i++) {
        let pos = BLACK_PIECE_ATTACKER_INITIAL_POSITIONS[i];
        array[pos[0]][pos[1]] = BoardSpaceEnum.BLACK_ATTACKER;
    }
   
    return array
  }

  convertBoardToText = () => {
      let converted = [];
      for (let i = 0; i < this.state.board.length; i++) {
        let row = "  |  ";
        for (let j = 0; j < this.state.board[0].length; j++) {
            row += this.state.board[i][j] + "  |  ";
        }
        console.log(row);
        converted[i] = (<div>{row}</div>)
      }
      return converted;
  }

  render() {
    return (
      <div> 
        GameBoard:
        {this.convertBoardToText()}
      </div>
    );
  }
}

export default GameBoard
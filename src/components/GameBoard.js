import {PlayerEnum} from './Game'
import React, { Component } from 'react';
import Square from './Square'
import SquareModel from '../model/Square-Model';

const BoardSpaceEnum = {
    EMPTY: '', //used to be 0 but looks cleaner 
    WHITE_VIKING: 1,
    WHITE_KING: 2,
    BLACK_ATTACKER: 3,
    SAFE_ZONE: 4
};

const MoveEnum = {
    SOURCE: "source",
    TARGET: "target"
};

const INIT_GAME_SETUP = [
    [ new SquareModel(BoardSpaceEnum.SAFE_ZONE, 0, 0), new SquareModel(BoardSpaceEnum.EMPTY, 0, 1), new SquareModel(BoardSpaceEnum.EMPTY, 0, 2), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 0, 3), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 0, 4), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 0, 5), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 0, 6), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 0, 7), new SquareModel(BoardSpaceEnum.EMPTY, 0, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 0, 9), new SquareModel(BoardSpaceEnum.SAFE_ZONE, 0, 10) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY, 1, 0), new SquareModel(BoardSpaceEnum.EMPTY, 1, 1), new SquareModel(BoardSpaceEnum.EMPTY, 1, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 1, 3), new SquareModel(BoardSpaceEnum.EMPTY, 1, 4), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 1, 5), 
      new SquareModel(BoardSpaceEnum.EMPTY, 1, 6), new SquareModel(BoardSpaceEnum.EMPTY, 1, 7), new SquareModel(BoardSpaceEnum.EMPTY, 1, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 1, 9), new SquareModel(BoardSpaceEnum.EMPTY, 1, 10) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY, 2, 0), new SquareModel(BoardSpaceEnum.EMPTY, 2, 1), new SquareModel(BoardSpaceEnum.EMPTY, 2, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 2, 3), new SquareModel(BoardSpaceEnum.EMPTY, 2, 4), new SquareModel(BoardSpaceEnum.EMPTY, 2, 5), 
      new SquareModel(BoardSpaceEnum.EMPTY, 2, 6), new SquareModel(BoardSpaceEnum.EMPTY, 2, 7), new SquareModel(BoardSpaceEnum.EMPTY, 2, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 2, 9), new SquareModel(BoardSpaceEnum.EMPTY, 2, 10) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 3, 0), new SquareModel(BoardSpaceEnum.EMPTY, 3, 1), new SquareModel(BoardSpaceEnum.EMPTY, 3, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 3, 3), new SquareModel(BoardSpaceEnum.EMPTY, 3, 4), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 3, 5), 
      new SquareModel(BoardSpaceEnum.EMPTY, 3, 6), new SquareModel(BoardSpaceEnum.EMPTY, 3, 7), new SquareModel(BoardSpaceEnum.EMPTY, 3, 8),
      new SquareModel(BoardSpaceEnum.EMPTY, 3, 9), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 3, 10) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 4, 0), new SquareModel(BoardSpaceEnum.EMPTY, 4, 1), new SquareModel(BoardSpaceEnum.EMPTY, 4, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 4, 3), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 4, 4), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 4, 5), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING, 4, 6), new SquareModel(BoardSpaceEnum.EMPTY, 4, 7), new SquareModel(BoardSpaceEnum.EMPTY, 4, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 4, 9), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 4, 10) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 5, 0), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 5, 1), new SquareModel(BoardSpaceEnum.EMPTY, 5, 2), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING, 5, 3), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 5, 4), new SquareModel(BoardSpaceEnum.WHITE_KING, 5, 5), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING, 5, 6), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 5, 7), new SquareModel(BoardSpaceEnum.EMPTY, 5, 8), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 5, 9), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 5, 10) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 6, 0), new SquareModel(BoardSpaceEnum.EMPTY, 6, 1), new SquareModel(BoardSpaceEnum.EMPTY, 6, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 6, 3), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 6, 4), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 6, 5), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING, 6, 6), new SquareModel(BoardSpaceEnum.EMPTY, 6, 7), new SquareModel(BoardSpaceEnum.EMPTY, 6, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 6, 9), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 6, 10) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 7, 0), new SquareModel(BoardSpaceEnum.EMPTY, 7, 1), new SquareModel(BoardSpaceEnum.EMPTY, 7, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 7, 3), new SquareModel(BoardSpaceEnum.EMPTY, 7, 4), new SquareModel(BoardSpaceEnum.WHITE_VIKING, 7, 5), 
      new SquareModel(BoardSpaceEnum.EMPTY, 7, 6), new SquareModel(BoardSpaceEnum.EMPTY, 7, 7), new SquareModel(BoardSpaceEnum.EMPTY, 7, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 7, 9), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 7, 10) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY, 8, 0), new SquareModel(BoardSpaceEnum.EMPTY, 8, 1), new SquareModel(BoardSpaceEnum.EMPTY, 8, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 8, 3), new SquareModel(BoardSpaceEnum.EMPTY, 8, 4), new SquareModel(BoardSpaceEnum.EMPTY, 8, 5), 
      new SquareModel(BoardSpaceEnum.EMPTY, 8, 6), new SquareModel(BoardSpaceEnum.EMPTY, 8, 7), new SquareModel(BoardSpaceEnum.EMPTY, 8, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 8, 9), new SquareModel(BoardSpaceEnum.EMPTY, 8, 10) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY, 9, 0), new SquareModel(BoardSpaceEnum.EMPTY, 9, 1), new SquareModel(BoardSpaceEnum.EMPTY, 9, 2), 
      new SquareModel(BoardSpaceEnum.EMPTY, 9, 3), new SquareModel(BoardSpaceEnum.EMPTY, 9, 4), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 9, 5), 
      new SquareModel(BoardSpaceEnum.EMPTY, 9, 6), new SquareModel(BoardSpaceEnum.EMPTY, 9, 7), new SquareModel(BoardSpaceEnum.EMPTY, 9, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 9, 9), new SquareModel(BoardSpaceEnum.EMPTY, 9, 10) ],
    [ new SquareModel(BoardSpaceEnum.SAFE_ZONE, 10, 0), new SquareModel(BoardSpaceEnum.EMPTY, 10, 1), new SquareModel(BoardSpaceEnum.EMPTY, 10, 2), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 10, 3), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 10, 4), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 10, 5), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 10, 6), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER, 10, 7), new SquareModel(BoardSpaceEnum.EMPTY, 10, 8), 
      new SquareModel(BoardSpaceEnum.EMPTY, 10, 9), new SquareModel(BoardSpaceEnum.SAFE_ZONE, 10, 10) ]
];

class GameBoard extends Component {
  constructor(props) {
    super(props);
    let initialBoardCopy = JSON.parse(JSON.stringify(INIT_GAME_SETUP));
    this.state = {
        currentPlayer: 1,
        board: initialBoardCopy, 
        isOver: false,
        sourceSquare: null,
        targetSquare: null,
        moveType: MoveEnum.SOURCE,
        error: ""
    };
  }

  renderFromBoard() {
    const length = this.state.board.length;
    let rows = new Array(length);

    for (let i = 0; i < length; i++) {
        let subRow = [];
        for (let j = 0; j < length; j++) {
            subRow.push(<Square 
                            key={i*j + 13*j} 
                            value={this.state.board[i][j].type} 
                            selectPiece={(event, row, col) => this.selectPiece(event, row, col)} 
                            row={i} 
                            col={j} 
                            isSelected={this.state.board[i][j].isSelected}
                        />);
        }
        let row = <div className="row-div" key={i*17}>{subRow}</div>; 
        rows[i] = row;
    }
    return rows
  }

  selectPiece = (event, row, col) => {
    let rows = this.state.board;
    let oldSquare = rows[row][col];
    if (this.state.moveType === MoveEnum.SOURCE) {
        if (this.isValidSourceSelection(row, col)) {
            rows[row][col].isSelected = !oldSquare.isSelected;
            this.setState({
                board: rows,
                sourceSquare: rows[row][col],
                moveType: MoveEnum.TARGET,
                error: ""
            });
        } else {
            this.setState({error: "Choose a valid source piece"});
        }
    } else {
        if (this.state.sourceSquare.row === row && this.state.sourceSquare.col === col) {
            rows[row][col].isSelected = !oldSquare.isSelected;
            this.setState({
                board: rows,
                sourceSquare: null,
                moveType: MoveEnum.SOURCE,
                error: ""
            });
            return;
        } 

        if (this.isValidTargetSelection(row, col)) {
            let rows = this.state.board;
            let sourceSquare = this.state.sourceSquare;
            let targetSquare = rows[row][col];
            targetSquare.type = sourceSquare.type;
            rows[sourceSquare.row][sourceSquare.col].type = BoardSpaceEnum.EMPTY;
            rows[sourceSquare.row][sourceSquare.col].isSelected = false;
            this.setState({
                board: rows,
                sourceSquare: null,
                moveType: MoveEnum.SOURCE,
                error: ""
            });
            this.props.changePlayer();
        } else {
            this.setState({error: "Choose a valid target square"});
        }
    }
  }

  isSquareSameColorAsPlayer = (row, col) => {
    let square = this.state.board[row][col];
    if (this.props.currentPlayer === PlayerEnum.WHITE) {
        if (square.type === BoardSpaceEnum.WHITE_KING || square.type === BoardSpaceEnum.WHITE_VIKING) {
            return true;
        }
    } else {
        if (square.type === BoardSpaceEnum.BLACK_ATTACKER) {
            return true;
        }
    }
    return false;
  }

  //potentially move back into this function or get rid of this wrapper
  isValidSourceSelection = (row, col) => {
    return this.isSquareSameColorAsPlayer(row, col);
  }

  isValidTargetSelection = (row, col) => {
      // need to account for if there are pieces in the way :'(
    let targetSquare = this.state.board[row][col];
    let sourceSquare = this.state.sourceSquare;
    
    // if target square is not empty or source is not king and target is not safe zone return false
    if (targetSquare.type !== BoardSpaceEnum.EMPTY || (sourceSquare.type === BoardSpaceEnum.WHITE_KING && targetSquare.type === BoardSpaceEnum.SAFE_ZONE)) {
        return false;
    }

    if (sourceSquare.row === targetSquare.row || sourceSquare.col === targetSquare.col) {
        return true;
    }
  }

  resetBoard = () => {
      let initialBoardCopy = JSON.parse(JSON.stringify(INIT_GAME_SETUP));
      this.setState({ board: initialBoardCopy});
  }

  render() {
    return (
      <div className="Game-div"> 
        {this.renderFromBoard()}
        {this.state.error}
        <button className="Coordinate-button" onClick={this.resetBoard}>Reset Board </button>
      </div>
    );
  }
}

export default GameBoard
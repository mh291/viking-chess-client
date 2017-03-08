import '../App.css';
import { BoardSpaceEnum, MoveEnum, PlayerEnum } from '../constants/GameEnums'
import Coordinate from '../model/Coordinate';
import GameBoard from './GameBoard'
import { INITIAL_BOARD_COPY } from '../constants/GameSetup'
import React, { Component } from 'react';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        board: INITIAL_BOARD_COPY,
        currentPlayer: PlayerEnum.BLACK,
        sourceSquare: null, // Coordinate
        moveType: MoveEnum.SOURCE,
        error: "",
        isGameOver: false,
        winner: null
    };
    this.isGameOver = false;
  }

  endGame = (gameWinner) => {
    this.setState({
        isGameOver: true,
        winner: gameWinner,
        error: "The Game is over. " + gameWinner + " has won. Click Reset Board to play again"
    });
    this.isGameOver = false;
  }

  selectPiece = (event, row, col) => {
    if (this.state.isGameOver) {
        this.endGame(PlayerEnum.WHITE);
        return;
    } else {
        let rows = this.state.board;
        if (this.state.moveType === MoveEnum.SOURCE) {
            if (this.isValidSourceSelection(row, col)) {
                this.setState({
                    board: rows,
                    sourceSquare: new Coordinate(row, col),
                    moveType: MoveEnum.TARGET,
                    error: ""
                });
            } else {
                this.setState({error: "Choose a valid source piece"});
            }
        } else {
            // to deselect source piece 
            if (this.state.sourceSquare.row === row && this.state.sourceSquare.col === col) {
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
                let sourceSquare = rows[this.state.sourceSquare.row][this.state.sourceSquare.col];
                let targetSquare = rows[row][col];
                targetSquare.type = sourceSquare.type;
                rows[this.state.sourceSquare.row][this.state.sourceSquare.col].type = BoardSpaceEnum.EMPTY;
                this.setState({
                    board: rows,
                    sourceSquare: null,
                    moveType: MoveEnum.SOURCE,
                    error: ""
                });
                if (this.isGameOver) {
                    this.endGame(PlayerEnum.WHITE);
                    return;
                }
                this.capturePiece(row, col);
                this.changePlayer();
            } 
        }
    }
  }

  capturePiece = (targetRow, targetCol) => {
    let sameTeamPieces = this.state.currentPlayer === PlayerEnum.WHITE ? [BoardSpaceEnum.WHITE_KING, BoardSpaceEnum.WHITE_VIKING] : [BoardSpaceEnum.BLACK_ATTACKER];
    let oppTeamPieces = this.state.currentPlayer !== PlayerEnum.WHITE ? [BoardSpaceEnum.WHITE_KING, BoardSpaceEnum.WHITE_VIKING] : [BoardSpaceEnum.BLACK_ATTACKER];
    let sameTeamDelta = [[2, 0], [-2, 0], [0, 2], [0, -2]];
    let oppTeamDelta = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let i = 0; i < sameTeamDelta.length; i++) {
        let sameTeamCoordinates = [targetRow + sameTeamDelta[i][0], targetCol + sameTeamDelta[i][1]];
        let oppTeamCoordinates = [targetRow + oppTeamDelta[i][0], targetCol + oppTeamDelta[i][1]];
        if (this.isCoordinateInBounds(sameTeamCoordinates) && this.isCoordinateInBounds(oppTeamCoordinates)) {
            if (sameTeamPieces.includes(this.state.board[sameTeamCoordinates[0]][sameTeamCoordinates[1]].type) && oppTeamPieces.includes(this.state.board[oppTeamCoordinates[0]][oppTeamCoordinates[1]].type)) {
                let rows = this.state.board;
                if (rows[oppTeamCoordinates[0]][oppTeamCoordinates[1]].type === BoardSpaceEnum.WHITE_KING) {
                    this.endGame(PlayerEnum.BLACK);                        
                    return;
                }
                rows[oppTeamCoordinates[0]][oppTeamCoordinates[1]].type = BoardSpaceEnum.EMPTY;
                this.setState({
                    board: rows,
                    error: "You've captured a piece!"
                });
                return;
            }
        }
    }
  }

  isCoordinateInBounds(coord) {
    return coord[0] < 11 && coord[0] > 0 && coord[1] < 11 && coord[1] >= 0;
  }

  isValidSourceSelection = (row, col) => {
    let square = this.state.board[row][col];
    if (this.state.currentPlayer === PlayerEnum.WHITE) {
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


  isValidTargetSelection = (row, col) => {
    let targetSquare = this.state.board[row][col];
    let sourceSquare = this.state.board[this.state.sourceSquare.row][this.state.sourceSquare.col];

    if (targetSquare.type === BoardSpaceEnum.SAFE_ZONE) {
        if (sourceSquare.type !== BoardSpaceEnum.WHITE_KING) {
            this.setState({error: "Chosen target square is a safe zone and you are not moving a king piece"});
            return false;
        } else {
            this.isGameOver = true;
            return true;
        }
    } 
    
    if (targetSquare.type !== BoardSpaceEnum.EMPTY) {
        this.setState({error: "Chosen target square is not empty"});
        return false;
    }       
    // eslint-disable-next-line
    return this.isPathClear(this.state.sourceSquare.row, this.state.sourceSquare.col, row, col);;
  }

  isPathClear = (sourceRow, sourceCol, targetRow, targetCol) => {
    let start, end, isRowMove
    if (sourceRow === targetRow) {
        start = sourceCol < targetCol ? sourceCol : targetCol;
        end = sourceCol < targetCol ? targetCol: sourceCol;   
        isRowMove = true; 
    } else if (sourceCol === targetCol) {
        start = sourceRow < targetRow ? sourceRow : targetRow;
        end = sourceRow < targetRow ? targetRow: sourceRow;
        isRowMove = false;
    } else {
        //neither row nor col are the same
        this.setState({error: "You must choose a target in the same row or column"});
        return false;
    }
    
    for (let i = start; i <= end; i++) {
        if (isRowMove) {
            if (i === sourceCol) {
                continue;
            } else if (this.state.board[sourceRow][i].type !== BoardSpaceEnum.EMPTY) {
                this.setState({error: "Path not clear in this row"});
                return false;
            }
        } else {
            if (i === sourceRow) {
                continue;
            } else if (this.state.board[i][sourceCol].type !== BoardSpaceEnum.EMPTY) {
                this.setState({error: "Path not clear in this column"});
                return false;
            }
        }
    }
    return true;
  }

  resetBoard = () => {
    this.setState({ 
        board: INITIAL_BOARD_COPY,
        currentPlayer: PlayerEnum.BLACK,
        sourceSquare: null,
        moveType: MoveEnum.SOURCE,
        error: "",
        isGameOver: false,
        winner: null
    });
  }

  changePlayer = () => {
    this.setState((prevState, props) => {
        return {
            currentPlayer: prevState.currentPlayer === PlayerEnum.WHITE ? PlayerEnum.BLACK : PlayerEnum.WHITE
        };
    })};

  render() {
    let gameState = this.state.isOver ? "Game over" : "It is " + this.state.currentPlayer +"'s turn";
    return (
      <div className="Game-div"> 
        <label className="Coordinate-label">Viking Chess</label>
        <GameBoard board={this.state.board} selectPiece={this.selectPiece} sourceSquare={this.state.sourceSquare} />
        {this.state.error}
        <button className="Coordinate-button" onClick={this.resetBoard}>Reset Board</button>
        <label className="Coordinate-label">{gameState}</label>
      </div>
    );
  }
}

export default Game
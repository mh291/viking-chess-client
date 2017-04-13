import '../App.css';
import { BoardSpaceEnum, MoveEnum, PlayerEnum } from '../constants/GameEnums'
import Coordinate from '../model/Coordinate';
import GameBoard from './GameBoard'
import { INSTRUCTIONS } from '../constants/GameSetup'
import React, { Component } from 'react';
import MovementResult from '../model/Movement-Result'

class Game extends Component {

  componentWillMount() {
    // send back initial board for correct formatting on fetch call
    this.props.sendResetBoard();

    // begin polling for new board
    this.fetchUpdates();
  }

  selectPiece = (event, row, col) => {
    if (this.props.isGameOver) {
        this.props.updateWinner(PlayerEnum.WHITE);
        return;
    } else {
        if (this.props.currentPlayer !== this.props.playerColor) {
             this.props.setError("It is not your turn");
             return;
        }
        if (this.props.moveType === MoveEnum.SOURCE) {
            let selectMovementResult = this.isValidSourceSelection(row, col);
            if (selectMovementResult.isValid) {
                this.props.selectPiece(new Coordinate(row, col));
            } else {
                this.props.setError("Choose a valid source piece");
            }
        } else {
            // to deselect source piece 
            if (this.props.sourceSquare.row === row && this.props.sourceSquare.col === col) {
                this.props.deselectPiece();
                return;
            } 
            let targetMovementResult = this.isValidTargetSelection(row, col);
            if (targetMovementResult.isValid) {
                let captureMovementResult = this.canCapturePiece(row, col);
                                
                this.movePiece(row, col, captureMovementResult.isValid, captureMovementResult.capturedPiece);  

                // check if white is about to win i.e. moved king into safe
                if (targetMovementResult.winner) {
                    this.props.updateWinner(targetMovementResult.winner);
                } 

                // check if black won i.e. captured white king 
                if (captureMovementResult.winner) {
                    this.props.updateWinner(captureMovementResult.winner);
                }                

                if (this.props.isGameOver) {
                    this.props.updateWinner(PlayerEnum.WHITE);
                    return;
                }
            } 
        }
    }
  }

  canCapturePiece = (targetRow, targetCol) => {
    let sameTeamPieces = this.props.currentPlayer === PlayerEnum.WHITE ? [BoardSpaceEnum.WHITE_KING, BoardSpaceEnum.WHITE_VIKING] : [BoardSpaceEnum.BLACK_ATTACKER];
    let oppTeamPieces = this.props.currentPlayer !== PlayerEnum.WHITE ? [BoardSpaceEnum.WHITE_KING, BoardSpaceEnum.WHITE_VIKING] : [BoardSpaceEnum.BLACK_ATTACKER];
    let sameTeamDelta = [[2, 0], [-2, 0], [0, 2], [0, -2]];
    let oppTeamDelta = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let i = 0; i < sameTeamDelta.length; i++) {
        let sameTeamCoordinates = [targetRow + sameTeamDelta[i][0], targetCol + sameTeamDelta[i][1]];
        let oppTeamCoordinates = [targetRow + oppTeamDelta[i][0], targetCol + oppTeamDelta[i][1]];
        if (this.isCoordinateInBounds(sameTeamCoordinates) && this.isCoordinateInBounds(oppTeamCoordinates)) {
            if (sameTeamPieces.includes(this.props.board[sameTeamCoordinates[0]][sameTeamCoordinates[1]].type) && oppTeamPieces.includes(this.props.board[oppTeamCoordinates[0]][oppTeamCoordinates[1]].type)) {
                let rows = this.props.board;
                let currentPiece = rows[oppTeamCoordinates[0]][oppTeamCoordinates[1]];
                let currentPieceCoord = new Coordinate(oppTeamCoordinates[0], oppTeamCoordinates[1])
                if (currentPiece.type === BoardSpaceEnum.WHITE_KING) {                     
                    return new MovementResult(true, currentPieceCoord, PlayerEnum.BLACK);
                }
            
                return new MovementResult(true, currentPieceCoord);
            }
        }
    }
    return new MovementResult(false);
  }

  isCoordinateInBounds(coord) {
    return coord[0] < 11 && coord[0] > 0 && coord[1] < 11 && coord[1] >= 0;
  }

  isValidSourceSelection = (row, col) => {
    let square = this.props.board[row][col];
    if (this.props.currentPlayer === PlayerEnum.WHITE) {
        if (square.type === BoardSpaceEnum.WHITE_KING || square.type === BoardSpaceEnum.WHITE_VIKING) {
            return new MovementResult(true);
        }
    } else {
        if (square.type === BoardSpaceEnum.BLACK_ATTACKER) {
            return new MovementResult(true);
        }
    }
    return new MovementResult(false);
  }

  isValidTargetSelection = (row, col) => {
    let targetSquare = this.props.board[row][col];
    let sourceSquare = this.props.board[this.props.sourceSquare.row][this.props.sourceSquare.col];

    if (targetSquare.type === BoardSpaceEnum.SAFE_ZONE) {
        if (sourceSquare.type !== BoardSpaceEnum.WHITE_KING) {
            this.props.setError("Chosen target square is a safe zone and you are not moving a king piece");
            return new MovementResult(false);
        } else {
            return new MovementResult(true, null, PlayerEnum.WHITE);
        }
    } 
    
    if (targetSquare.type !== BoardSpaceEnum.EMPTY) {
        this.props.setError("Chosen target square is not empty");
        return new MovementResult(false);
    }       
    // eslint-disable-next-line
    return this.isPathClear(this.props.sourceSquare.row, this.props.sourceSquare.col, row, col);;
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
        this.props.setError("You must choose a target in the same row or column");
        return new MovementResult(false);
    }
    
    for (let i = start; i <= end; i++) {
        if (isRowMove) {
            if (i === sourceCol) {
                continue;
            } else if (this.props.board[sourceRow][i].type !== BoardSpaceEnum.EMPTY) {
                this.props.setError("Path not clear in this row");
                return new MovementResult(false);
            }
        } else {
            if (i === sourceRow) {
                continue;
            } else if (this.props.board[i][sourceCol].type !== BoardSpaceEnum.EMPTY) {
                this.props.setError("Path not clear in this column");
                return new MovementResult(false);
            }
        }
    }
    return new MovementResult(true);
  }

  movePiece = (row, col, isCapture, capturedPiece) => {
    let updatedBoard = JSON.parse(JSON.stringify(this.props.board));
    let source = updatedBoard[this.props.sourceSquare.row][this.props.sourceSquare.col];
    let target = updatedBoard[row][col];
    
    target.type = source.type;
    updatedBoard[this.props.sourceSquare.row][this.props.sourceSquare.col].type = BoardSpaceEnum.EMPTY;

    if (isCapture) {
        updatedBoard[capturedPiece.row][capturedPiece.col].type = BoardSpaceEnum.EMPTY;
    }
    this.props.sendUpdatedBoardOnMove(updatedBoard, isCapture);
  }

  fetchUpdates = () => {
    setTimeout(() => {
        this.props.fetchUpdatedBoard();
        this.props.fetchCurrentPlayer();
        this.props.getWinner();
        this.props.fetchResetState();
        this.fetchUpdates();
    }, 3000);
  }

  render() {
    let gameState = this.props.isOver ? "Game over" : "It is " + this.props.currentPlayer +"'s turn";
    let playerColor = this.props.playerColor === PlayerEnum.NONE ? "Choose a color:" : "Your player color is " + this.props.playerColor
    return (
      <div className="Game-div"> 
        <label className="Coordinate-label">Viking Chess</label>
        <GameBoard board={this.props.board} selectPiece={this.selectPiece} sourceSquare={this.props.sourceSquare} />
        {this.props.error}
        <button className="Coordinate-button" onClick={this.props.sendResetBoard}>Reset Board</button>
        <button className="White-button" onClick={() => this.props.setPlayer(PlayerEnum.WHITE)}>White</button>
        <button className="Black-button" onClick={() => this.props.setPlayer(PlayerEnum.BLACK)}>Black</button>
        <label className="Instructions-label">{INSTRUCTIONS}</label>
        <label className="YourPlayer-label">{playerColor}</label>
        <label className="Coordinate-label">{gameState}</label>
      </div>
    );
  }
}

export default Game
import { connect } from 'react-redux';
import Game from './Game';
import { selectPiece, deselectPiece, sendResetBoard, endGame, setError, sendUpdatedBoardOnMove, fetchUpdatedBoard, fetchCurrentPlayer, setPlayer } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
    return {
        board: state.board,
        currentPlayer: state.currentPlayer,
        playerColor: state.playerColor,
        sourceSquare: state.sourceSquare,
        moveType: state.moveType,
        error: state.error,
        isGameOver: state.isGameOver,
        winner: state.winner
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectPiece: function(selectedSquare) {
            dispatch(selectPiece(selectedSquare));
        },
        deselectPiece: function() {
            dispatch(deselectPiece());
        },
        sendResetBoard: function() {
            dispatch(sendResetBoard()); 
        },
        endGame: function(winner, message) {
            dispatch(endGame(winner, message));
        },
        setError: function(message) {
            dispatch(setError(message));
        },
        sendUpdatedBoardOnMove: function(updatedBoard, isCapture) {
            dispatch(sendUpdatedBoardOnMove(updatedBoard, isCapture));
        },
        fetchUpdatedBoard: function() {
            dispatch(fetchUpdatedBoard());
        },
        fetchCurrentPlayer: function() {
            dispatch(fetchCurrentPlayer());
        },
        setPlayer: function(playerColor) {
            dispatch(setPlayer(playerColor));
        }
    };
}

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);

export default GameContainer;
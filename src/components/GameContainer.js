import { connect } from 'react-redux';
import Game from './Game';
import { selectPiece, deselectPiece, sendResetBoard, setError, sendUpdatedBoardOnMove, fetchUpdatedBoard, 
    fetchCurrentPlayer, setPlayer, getWinner, updateWinner, fetchResetState, fetchId } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
    return {
        board: state.board,
        currentPlayer: state.currentPlayer,
        playerColor: state.playerColor,
        sourceSquare: state.sourceSquare,
        moveType: state.moveType,
        error: state.error,
        isGameOver: state.isGameOver,
        winner: state.winner,
        id: state.id
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
        sendResetBoard: function(id) {
            dispatch(sendResetBoard(id)); 
        },
        setError: function(message) {
            dispatch(setError(message));
        },
        sendUpdatedBoardOnMove: function(id, updatedBoard, isCapture) {
            dispatch(sendUpdatedBoardOnMove(id, updatedBoard, isCapture));
        },
        fetchUpdatedBoard: function(id) {
            dispatch(fetchUpdatedBoard(id));
        },
        fetchCurrentPlayer: function(id) {
            dispatch(fetchCurrentPlayer(id));
        },
        setPlayer: function(id, playerColor) {
            dispatch(setPlayer(id, playerColor));
        },
        updateWinner: function(id, winner) {
            dispatch(updateWinner(id, winner));
        },
        getWinner: function(id) {
            dispatch(getWinner(id));
        },
        fetchResetState: function(id) {
            dispatch(fetchResetState(id));
        },
        fetchId: function() {
            dispatch(fetchId());
        }
    };
}

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);

export default GameContainer;
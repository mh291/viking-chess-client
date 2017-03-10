import { connect } from 'react-redux';
import Game from './Game';
import { selectPiece, deselectPiece, movePiece, capturePiece, restartGame, endGame, changePlayer, setError } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
    return {
        board: state.board,
        currentPlayer: state.currentPlayer,
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
        movePiece: function(source, target, board) {
            dispatch(movePiece(source, target, board));
        },
        capturePiece: function(board) { //maybe change to take in the piece you want to capture?
            dispatch(capturePiece(board));
        },
        restartGame: function() {
            dispatch(restartGame()); 
        },
        endGame: function(winner, message) {
            dispatch(endGame(winner, message));
        },
        changePlayer: function() {
            dispatch(changePlayer());
        },
        setError: function(message) {
            dispatch(setError(message));
        }
    };
}

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);

export default GameContainer;
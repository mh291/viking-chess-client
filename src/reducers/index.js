import { MoveEnum, PlayerEnum } from '../constants/GameEnums'
import { INIT_GAME_SETUP } from '../constants/GameSetup'
import { SELECT_PIECE, DESELECT_PIECE, MOVE_PIECE, RESTART_GAME, SET_PLAYER_COLOR,
         CHANGE_PLAYER, SET_ERROR, RECEIVE_UPDATED_BOARD, SET_WINNER, CHECK_RESET, SET_ID } from '../actions/index'

const initialState = {
        board: JSON.parse(JSON.stringify(INIT_GAME_SETUP)),
        currentPlayer: PlayerEnum.BLACK,
        playerColor: PlayerEnum.NONE,
        sourceSquare: null,         
        moveType: MoveEnum.SOURCE,
        error: "",
        isGameOver: false,
        winner: null,
        id : null
    };

const game = (state = initialState, action) => {
    let updatedMoveType = state.moveType === MoveEnum.SOURCE ? MoveEnum.TARGET: MoveEnum.SOURCE;
    switch(action.type) {
        case SELECT_PIECE:     
            return Object.assign({}, state, {
                sourceSquare: action.selectedSquare,
                moveType: updatedMoveType,
                error: ""
            });
        case DESELECT_PIECE:
            return Object.assign({}, state, {
                sourceSquare: null,
                moveType: updatedMoveType,
                error: ""
            });
        case MOVE_PIECE:            
            return Object.assign({}, state, {
                board: action.updatedBoard,
                sourceSquare: null,
                moveType: updatedMoveType,
                error: action.isCapture ? "You've captured a piece!" : ""
            });
        case CHANGE_PLAYER:
            return Object.assign({}, state, {
                currentPlayer: action.currentPlayer
            });
        case CHECK_RESET:
            if (action.isReset === "false") {
                return state;
            } else {
                return Object.assign({}, initialState, {
                    board: JSON.parse(JSON.stringify(INIT_GAME_SETUP)),
                    id: state.id
                });
            }
        case RESTART_GAME:
            return Object.assign({}, initialState, {
                board: JSON.parse(JSON.stringify(INIT_GAME_SETUP)),
                id: state.id
            });
        case SET_ERROR:
            return Object.assign({}, state, {
               error: action.message 
            });
        case RECEIVE_UPDATED_BOARD:
            return Object.assign({}, state, {
                board: JSON.parse(action.updatedBoardJSON)
            });
        case SET_PLAYER_COLOR:
            let newPlayerColor = action.playerColor === PlayerEnum.WHITE ? PlayerEnum.WHITE : PlayerEnum.BLACK;
            return Object.assign({}, state, {
                playerColor: newPlayerColor
            });
        case SET_ID:
            return Object.assign({}, state, {
                id: action.id
            });
        case SET_WINNER:
            if (action.winner !== "") { // end game
                let message = "The Game is over. " + action.winner + " has won. Click Reset Board to play again";
                return Object.assign({}, state, {
                    winner: action.winner,
                    isGameOver: true,
                    error: message
                });
            }
            // eslint-disable-next-line          
        default:
            return state;
    }
}

export default game
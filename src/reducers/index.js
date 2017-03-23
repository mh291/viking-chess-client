import { MoveEnum, PlayerEnum } from '../constants/GameEnums'
import { INIT_GAME_SETUP } from '../constants/GameSetup'
import { SELECT_PIECE, DESELECT_PIECE, MOVE_PIECE, RESTART_GAME, SET_PLAYER_COLOR,
         END_GAME, CHANGE_PLAYER, SET_ERROR, RECEIVE_UPDATED_BOARD, } from '../actions/index'

const initialState = {
        board: JSON.parse(JSON.stringify(INIT_GAME_SETUP)),
        currentPlayer: PlayerEnum.BLACK,
        playerColor: PlayerEnum.NONE,
        sourceSquare: null,         
        moveType: MoveEnum.SOURCE,
        error: "",
        isGameOver: false,
        winner: null
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
        case END_GAME:
            return Object.assign({}, state, {
                winner: action.winner,
                isGameOver: !state.isGameOver,
                error: action.message
            });
        case CHANGE_PLAYER:
            return Object.assign({}, state, {
                currentPlayer: action.currentPlayer
            });
        case RESTART_GAME:
            return Object.assign({}, initialState, {
                board: JSON.parse(JSON.stringify(INIT_GAME_SETUP))
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
            let newPlayerColor = action.playerColor === "white" ? PlayerEnum.WHITE : PlayerEnum.BLACK
            console.log(newPlayerColor)
            return Object.assign({}, state, {
                playerColor: newPlayerColor
            });
        default:
            return state;
    }
}

export default game
import { BoardSpaceEnum, MoveEnum, PlayerEnum } from '../constants/GameEnums'
import { INIT_GAME_SETUP } from '../constants/GameSetup'
import { SELECT_PIECE, DESELECT_PIECE, MOVE_PIECE, CAPTURE_PIECE, RESTART_GAME, 
         END_GAME, CHANGE_PLAYER, SET_ERROR, RECEIVE_UPDATED_BOARD} from '../actions/index'

const initialState = {
        board: JSON.parse(JSON.stringify(INIT_GAME_SETUP)),
        currentPlayer: PlayerEnum.BLACK,
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
            let updatedBoard = JSON.parse(JSON.stringify(state.board));
            let source = updatedBoard[action.source.row][action.source.col];
            let target = updatedBoard[action.target.row][action.target.col];
            
            target.type = source.type;
            updatedBoard[action.source.row][action.source.col].type = BoardSpaceEnum.EMPTY;

            return Object.assign({}, state, {
                board: updatedBoard,
                sourceSquare: null,
                moveType: updatedMoveType,
                error: ""
            });
        case CAPTURE_PIECE:
            updatedBoard = JSON.parse(JSON.stringify(state.board));
            updatedBoard[action.capturedPiece.row][action.capturedPiece.col].type = BoardSpaceEnum.EMPTY;
            return Object.assign({}, state, {
                board: updatedBoard,
                error: "You've captured a piece!"
            });
        case END_GAME:
            return Object.assign({}, state, {
                winner: action.winner,
                isGameOver: !state.isGameOver,
                error: action.message
            });
        case CHANGE_PLAYER:
            return Object.assign({}, state, {
                currentPlayer: state.currentPlayer === PlayerEnum.WHITE ? PlayerEnum.BLACK : PlayerEnum.WHITE
            });
        case RESTART_GAME:
            return Object.assign({}, initialState, {
                board: JSON.parse(JSON.stringify(INIT_GAME_SETUP))
            })
        case SET_ERROR:
            return Object.assign({}, state, {
               error: action.message 
            });
        case RECEIVE_UPDATED_BOARD:
            return Object.assign({}, initialState, {
                board: action.updatedBoardJSON
            })
        default:
            return state;
    }
}

export default game
import { BoardSpaceEnum, MoveEnum, PlayerEnum } from '../constants/GameEnums'
import { INITIAL_BOARD_COPY } from '../constants/GameSetup'

const initialState = {
        board: INITIAL_BOARD_COPY,
        currentPlayer: PlayerEnum.BLACK,
        sourceSquare: null,         
        moveType: MoveEnum.SOURCE,
        error: "",
        isGameOver: false,
        winner: null
    };


const game = (state = initialState, action) => {
    let updatedMoveType = state.moveType === MoveEnum.SOURCE ? MoveEnum.Target: MoveEnum.SOURCE;
    switch(action.type) {
        case 'SELECT_PIECE':            
            return Object.assign({}, state, {
                sourceSquare: action.source,
                moveType: updatedMoveType,
                error: ""
            });
        case 'DESELECT_PIECE':
            return Object.assign({}, state, {
                sourceSquare: null,
                moveType: updatedMoveType,
                error: ""
            });
        case 'MOVE_PIECE':
            let updatedBoard = JSON.parse(JSON.stringify(action.board));
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
        case 'CAPTURE_PIECE':
            return Object.assign({}, state, {
                board: action.board,
                error: "You've captured a piece!"
            });
        case 'RESTART_GAME':
            return Object.assign({}, state, {
                board: action.newBoard
            });
        case 'END_GAME':
            return Object.assign({}, state, {
                winner: action.winner,
                isGameOver: !state.isGameOver
            });
        case 'CHANGE_PLAYER':
            return Object.assign({}, state, {
                currentPlayer: state.currentPlayer === PlayerEnum.WHITE ? PlayerEnum.BLACK : PlayerEnum.WHITE
            });
        case 'RESET_BOARD':
            return initialState;
        case 'SET_ERROR':
            return Object.assign({}, state, {
               error: action.message 
            });
        default:
            return state;
    }
}

export default game
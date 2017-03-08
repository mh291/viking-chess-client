export const selectPiece = (selectedSquare) => {
    return {
        type: 'SELECT_PIECE',
        selectedSquare
    }
}

export const deselectPiece = () => {
    return {
        type: 'DESELECT_PIECE'
    }
}

export const movePiece = (source, target, board) => {
    return {
        type: 'MOVE_PIECE',
        source,
        target,
        board
    };
}

export const capturePiece = (board) => {
    return {
        type: 'CAPTURE_PIECE',
        board
    }
}

export const restartGame = (newBoard) => {
    return {
        type: 'RESTART_GAME',
        newBoard
    };
}

export const endGame = (winner) => {
    return {
        type: 'END_GAME',
        winner
    };
}

export const changePlayer = () => {
    return {
        type: 'CHANGE_PLAYER'
    };
}

export const setError = (message) => {
    return {
        type: 'SET_ERROR',
        message
    }
}
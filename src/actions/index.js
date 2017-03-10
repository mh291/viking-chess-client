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

export const movePiece = (source, target) => {
    return {
        type: 'MOVE_PIECE',
        source,
        target
    };
}

export const capturePiece = (capturedPiece) => {
    return {
        type: 'CAPTURE_PIECE',
        capturedPiece
    }
}

export const restartGame = () => {
    return {
        type: 'RESTART_GAME'
    };
}

export const endGame = (winner, message) => {
    return {
        type: 'END_GAME',
        winner,
        message
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
import fetch from 'isomorphic-fetch';

export const SELECT_PIECE = 'SELECT_PIECE';
export const DESELECT_PIECE = 'DESELECT_PIECE';
export const MOVE_PIECE = 'MOVE_PIECE';
export const CAPTURE_PIECE = 'CAPTURE_PIECE';
export const RESTART_GAME = 'RESTART_GAME';
export const END_GAME = 'END_GAME';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const SET_ERROR = 'SET_ERROR';
export const RECEIVE_UPDATED_BOARD = 'RECEIVE_UPDATED_BOARD';
const url = `http://localhost:5000/api/updateBoard`;


export const selectPiece = (selectedSquare) => {
    return {
        type: SELECT_PIECE,
        selectedSquare
    };
}

export const deselectPiece = () => {
    return {
        type: DESELECT_PIECE
    };
}

export const movePiece = (source, target) => {
    return {
        type: MOVE_PIECE,
        source,
        target
    };
}

export const capturePiece = (capturedPiece) => {
    return {
        type: CAPTURE_PIECE,
        capturedPiece
    };
}

export const restartGame = () => {
    return {
        type: RESTART_GAME
    };
}

export const endGame = (winner, message) => {
    return {
        type: END_GAME,
        winner,
        message
    };
}

export const changePlayer = () => {
    return {
        type: CHANGE_PLAYER
    };
}

export const setError = (message) => {
    return {
        type: SET_ERROR,
        message
    };
}

export const sendUpdatedBoard = (updatedBoard) => {
    return dispatch => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            mode: 'no-cors',
            body: JSON.stringify(updatedBoard)
        })
    };
}

const receiveUpdatedBoard = (updatedBoardJSON) => {
    return {
        type: RECEIVE_UPDATED_BOARD,
        updatedBoardJSON
    };
}

export const fetchUpdatedBoard = () => {
    return dispatch => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        }).then(response => response.json())
          .then(json => dispatch(receiveUpdatedBoard(json))           
        );
    };
}

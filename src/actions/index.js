import fetch from 'isomorphic-fetch';
import { INIT_GAME_SETUP } from '../constants/GameSetup'

export const SELECT_PIECE = 'SELECT_PIECE';
export const DESELECT_PIECE = 'DESELECT_PIECE';
export const MOVE_PIECE = 'MOVE_PIECE';
export const CAPTURE_PIECE = 'CAPTURE_PIECE';
export const RESTART_GAME = 'RESTART_GAME';
export const END_GAME = 'END_GAME';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const SET_ERROR = 'SET_ERROR';
export const RECEIVE_UPDATED_BOARD = 'RECEIVE_UPDATED_BOARD';
export const SET_PLAYER_COLOR = 'SET_PLAYER_COLOR';
const updateBoardUrl = `https://viking-chess-server.herokuapp.com/api/updateBoard`;
const resetBoardUrl = `https://viking-chess-server.herokuapp.com/api/resetBoard`;
const currentPlayerUrl = `https://viking-chess-server.herokuapp.com/api/currentPlayer`;
const setPlayerUrl = `https://viking-chess-server.herokuapp.com/api/setPlayer`;

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

const movePiece = (updatedBoard, isCapture) => {
    return {
        type: MOVE_PIECE,
        updatedBoard,
        isCapture
    };
}

const restartGame = () => {
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

export const changePlayer = (currentPlayer) => {
    return {
        type: CHANGE_PLAYER,
        currentPlayer
    };
}

export const setError = (message) => {
    return {
        type: SET_ERROR,
        message
    };
}

const receiveUpdatedBoard = (updatedBoardJSON) => {
    return {
        type: RECEIVE_UPDATED_BOARD,
        updatedBoardJSON
    };
}

const setPlayerColor = (playerColor) => {
    return {
        type: SET_PLAYER_COLOR,
        playerColor
    }
}

export const sendUpdatedBoardOnMove = (updatedBoard, isCapture) => {
    return dispatch => {
        dispatch(movePiece(updatedBoard, isCapture));
        return fetch(updateBoardUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(updatedBoard)
        });
    };
}

export const sendResetBoard = () => {
    return dispatch => {
        dispatch(restartGame());
        return fetch(resetBoardUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(INIT_GAME_SETUP)
        });
    };
}

export const fetchUpdatedBoard = () => {
    return dispatch => {
        return fetch(updateBoardUrl, {
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

export const fetchCurrentPlayer = () => {
    return dispatch => {
        return fetch(currentPlayerUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        }).then(response => response.json())
          .then(json => dispatch(changePlayer(json))           
        );
    };
}

export const setPlayer = (player) => {
    return dispatch => {
        return fetch(setPlayerUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(player)
        }).then(response => response.json())
          .then(json => dispatch(setPlayerColor(json))
        );
    };
}

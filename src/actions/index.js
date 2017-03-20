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
const updateBoardUrl = `http://localhost:5000/api/updateBoard`;
const resetBoardUrl = `http://localhost:5000/api/resetBoard`;
const currentPlayerUrl = `http://localhost:5000/api/currentPlayer`;


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

export const sendUpdatedBoardOnMove = (updatedBoard, isCapture) => {
    return dispatch => {
        dispatch(movePiece(updatedBoard, isCapture));
        return fetch(updateBoardUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            mode: 'no-cors',
            body: JSON.stringify(updatedBoard)
        });
    };
}

export const sendResetBoard = (updatedBoard, isCapture) => {
    return dispatch => {
        dispatch(restartGame());
        return fetch(resetBoardUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            mode: 'no-cors',
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

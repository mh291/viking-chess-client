import fetch from 'isomorphic-fetch';
import { INIT_GAME_SETUP } from '../constants/GameSetup'

export const SELECT_PIECE = 'SELECT_PIECE';
export const DESELECT_PIECE = 'DESELECT_PIECE';
export const MOVE_PIECE = 'MOVE_PIECE';
export const CAPTURE_PIECE = 'CAPTURE_PIECE';
export const RESTART_GAME = 'RESTART_GAME';
export const CHECK_RESET = 'CHECK_RESET';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const SET_ERROR = 'SET_ERROR';
export const RECEIVE_UPDATED_BOARD = 'RECEIVE_UPDATED_BOARD';
export const SET_PLAYER_COLOR = 'SET_PLAYER_COLOR';
export const SET_WINNER = 'SET_WINNER';
export const SET_ID = 'SET_ID';

const updateBoardUrl = prod ? `https://viking-chess-server.herokuapp.com/api/updateBoard/` : `http://localhost:5000/api/updateBoard/`; 
const resetBoardUrl = prod ? `https://viking-chess-server.herokuapp.com/api/resetBoard/` : `http://localhost:5000/api/resetBoard/`;
const currentPlayerUrl = prod ? `https://viking-chess-server.herokuapp.com/api/currentPlayer/`: `http://localhost:5000/api/currentPlayer/`;
const setPlayerUrl = prod ? `https://viking-chess-server.herokuapp.com/api/setPlayer/` : `http://localhost:5000/api/setPlayer/`;
const winnerUrl = prod ? 'https://viking-chess-server.herokuapp.com/api/winner/' : 'http://localhost:5000/api/winner/';
const idUrl = prod ? 'https://viking-chess-server.herokuapp.com/api/id/' : 'http://localhost:5000/api/id/';

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

const checkReset = (isReset) => {
    return {
        type: CHECK_RESET,
        isReset
    }
}

const changePlayer = (currentPlayer) => {
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

const setWinner = (winner) => {
    return {
        type: SET_WINNER,
        winner
    }
}

const assignId = (id) => {
    return {
        type: SET_ID,
        id
    }
}

export const sendUpdatedBoardOnMove = (id, updatedBoard, isCapture) => {
    return dispatch => {
        dispatch(movePiece(updatedBoard, isCapture));
        return fetch(updateBoardUrl + id, {
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

export const sendResetBoard = (id) => {
    return dispatch => {
        dispatch(restartGame());
        return fetch(resetBoardUrl + id, {
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

export const fetchUpdatedBoard = (id) => {
    return dispatch => {
        return fetch(updateBoardUrl + id, {
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

export const fetchCurrentPlayer = (id) => {
    return dispatch => {
        return fetch(currentPlayerUrl + id, {
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

export const setPlayer = (id, player) => {
    return dispatch => {
        return fetch(setPlayerUrl + id, {
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

export const updateWinner = (id, winner) => { // ends game
    return dispatch => {
        return fetch(winnerUrl + id, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(winner)
        });
    };
}

export const getWinner = (id) => {
    return dispatch => {
        return fetch(winnerUrl + id, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        }).then(response => response.json())
          .then(json => dispatch(setWinner(json))           
        );
    };
}

export const fetchResetState = (id) => {
    return dispatch => {
        return fetch(resetBoardUrl + id, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        }).then(response => response.json())
          .then(json => dispatch(checkReset(json))           
        );
    };
}

export const fetchId = () => {
    return dispatch => {
        return fetch(idUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        }).then(response => response.json())
          .then((json) => {
              dispatch(assignId(json)),             
              dispatch(sendResetBoard(json))               
          }
        );
    };
}


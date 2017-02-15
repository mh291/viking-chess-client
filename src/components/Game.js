import '../App.css';
import GameBoard from './GameBoard';
import React, { Component } from 'react';

const GAME_SIZE = 11;

export const PlayerEnum = {
  WHITE: "white",
  BLACK: "black"
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPlayer: PlayerEnum.WHITE,
        isOver: false,
    };
  }

  submitMove() {
    // should call GameBoard to try to submit a move and then update current player if successful
    console.log("submit move");
  }

  changePlayer = () => {
    let player = this.state.currentPlayer === PlayerEnum.WHITE ? PlayerEnum.BLACK : PlayerEnum.WHITE;
    this.setState({currentPlayer: player});
  }

  render() {
    return (
      <div> 
        <label className="Coordinate-label">Viking Chess</label>
        <GameBoard size={GAME_SIZE} changePlayer={this.changePlayer} currentPlayer={this.state.currentPlayer}/>
        <label className="Coordinate-label">It is {this.state.currentPlayer}'s turn</label>
      </div>
    );
  }
}

export default Game
import GameBoard from './GameBoard'
import React, { Component } from 'react';

const GAME_SIZE = 11;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPlayer: 1,
        gameState: null,
        isOver: false
    };
  }

  render() {
    return (
      <div> 
        Game 
        <GameBoard size={GAME_SIZE} />
      </div>
    );
  }
}

export default Game
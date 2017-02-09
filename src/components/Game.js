import '../App.css';
import { Button } from 'react-bootstrap';
import GameBoard from './GameBoard';
import React, { Component } from 'react';

const GAME_SIZE = 11;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPlayer: 1,
        gameBoard: null,
        isOver: false,
        sourceRowCoordinates: 0,
        sourceColCoordinates: 0,
        targetRowCoordinates: 0,
        targetColCoordinates: 0
    };
  }

  submitMove() {
    // should call GameBoard to try to submit a move and then update current player if successful
    console.log("submit move");
  }

  setSourceRowCoordinates = (event) => {
    this.setState({sourceRowCoordinates: event.target.value});
    console.log(this.state.sourceRowCoordinates);
  }

  setSourceColCoordinates = (event) => {
    this.setState({sourceColCoordinates: event.target.value});
    console.log(this.state.sourceColCoordinates);
  }

  setTargetRowCoordinates = (event) => {
    this.setState({targetRowCoordinates: event.target.value});
    console.log(this.state.targetRowCoordinates);
  }

  setTargetColCoordinates = (event) => {
    this.setState({targetColCoordinates: event.target.value});
    console.log(this.state.targetColCoordinates);
  }

  render() {
    return (
      <div> 
        Game 
        <GameBoard size={GAME_SIZE} />
        <Button className="Submit-button" onClick={() => this.submitMove()}>Submit Move</Button>
        <label className="Coordinate-label">
          Row Coordinates of piece you want to move:
          <input type="text" value={this.state.sourceRowCoordinates} onChange={this.setSourceRowCoordinates}/>
        </label>
        <label className="Coordinate-label">
          Column Coordinates of piece you want to move:
          <input type="text" value={this.state.sourceColCoordinates} onChange={this.setSourceColCoordinates}/>
        </label>
        <label className="Coordinate-label">
          Row Coordinates of where you want to move your piece:
          <input type="text" value={this.state.targetRowCoordinates} onChange={this.setTargetRowCoordinates}/>
        </label>
        <label className="Coordinate-label">
          Column Coordinates of where you want to move your piece:
          <input type="text" value={this.state.targetColCoordinates} onChange={this.setTargetColCoordinates}/>
        </label>
      </div>
    );
  }
}

export default Game
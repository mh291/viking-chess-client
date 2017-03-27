import { BoardSpaceEnum } from './GameEnums';
import React from 'react';
import SquareModel from '../model/Square-Model';

export const INIT_GAME_SETUP = [
    [ new SquareModel(BoardSpaceEnum.SAFE_ZONE), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.SAFE_ZONE) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.WHITE_VIKING), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY),
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.WHITE_VIKING), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.WHITE_KING), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.WHITE_VIKING), 
      new SquareModel(BoardSpaceEnum.WHITE_VIKING), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER) ],
    [ new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.WHITE_VIKING), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY) ],
    [ new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY) ],
    [ new SquareModel(BoardSpaceEnum.SAFE_ZONE), new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), 
      new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.BLACK_ATTACKER), new SquareModel(BoardSpaceEnum.EMPTY), 
      new SquareModel(BoardSpaceEnum.EMPTY), new SquareModel(BoardSpaceEnum.SAFE_ZONE) ]
];

export const INSTRUCTIONS = <span>This is a modified version of viking chess. There are two players controlling black and white pieces. Black moves first and 
                            then the  <br/>players alternate. Each piece moves vertically and horizontally as long as there are no obstacles in the way such
                            as another piece <br/>or the edge of the board. The goal of the black player is to capture the white king. The goal of the white 
                            player is to move the white <br/>king to one of the four corners. These are safe zones the game will end if the king 
                            reaches any of these spaces marked with<br/>  an X. Black pieces cannot move into a safe zone.</span>
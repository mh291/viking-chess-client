import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './components/GameContainer'
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import game from './reducers'

let store = createStore(game);

ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById('root')
);

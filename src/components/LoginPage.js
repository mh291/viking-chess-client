import '../App.css';
import React from 'react';

function LoginPage(props) {
    return <button onClick={() => props.fetchId()}>START GAME</button>
}
  
export default LoginPage
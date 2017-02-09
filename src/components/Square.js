import React from 'react';

function Square(props)  {
    return (
        <button className="Square-button">
            {props.value}
        </button>
    );
}
  
export default Square
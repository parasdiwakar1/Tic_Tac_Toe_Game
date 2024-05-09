import React, { useState } from 'react';
import "../App.css"

function Board() {

    const winnerArr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
      
    const [inputs, setInputs] = useState(Array(9).fill(""));
    const [player, setPlayer] = useState(true);
    const [winner, setWinner] = useState(null);

    const checkWinner = () => {
        for (let i = 0; i < winnerArr.length; i++) {
            const [a, b, c] = winnerArr[i];
            if (inputs[a] && inputs[a] === inputs[b] && inputs[a] === inputs[c]) {
                return inputs[a];
            }
        }
        return null;
    };

    const handleInput = (event) => {
        if (!winner && !inputs[event.target.dataset.index]) {
            const copyArray = [...inputs];
            copyArray[event.target.dataset.index] = player ? "X" : "O";
            setInputs(copyArray);
            setPlayer(!player);
            const winnerPlayer = checkWinner();
            if (winnerPlayer) {
                setWinner(winnerPlayer);
            } else if (!copyArray.includes("")) {
                // It's a draw
                setWinner("draw");
            }
        }
    };

    const resetGame = () => {
        setInputs(Array(9).fill(""));
        setWinner(null);
        setPlayer(true);
    };

    return (
      <>

          
        <div className='container'>
            {inputs.map((input, index) => (
              <div key={index} data-index={index} className='cell' onClick={handleInput}>
                    {input}
                </div>
            ))}
            {winner && (
              <div className="result">
                    {winner === "draw" ? (
                      <p>It's a draw!</p>
                    ) : (
                      <p>{winner} winner!</p>
                    )}
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
            </>
    );
}

export default Board;

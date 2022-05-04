import React, { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
    const {gameOver, correctWord, currentAttempt} = useContext(AppContext);

    return (
        <div className='gameOver'>
            <h3>{gameOver.guessedWord ? "You won" : "You lost"}</h3>
            <h1>Corret word was {correctWord}</h1>
            {gameOver.guessedWord && (<h3>You guessed in {currentAttempt.attempt} attempts</h3>)}
        </div>
    );
}

export default GameOver;
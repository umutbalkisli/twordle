import React, { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
    const {gameOver, correctWord, currentAttempt} = useContext(AppContext);

    return (
        <div className='gameOver'>
            <div>{gameOver.guessedWord ? "Tebrikler!" : "Üzgünüm :("}</div>
            <div>
                <span>Doğru kelime <strong>{correctWord}</strong></span>
            </div>
            {gameOver.guessedWord && (<div><strong>{currentAttempt.attempt}</strong> denemede bildiniz</div>)}
        </div>
    );
}

export default GameOver;
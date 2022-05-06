import React, { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
    const {gameOver, correctWord, currentAttempt, stat} = useContext(AppContext);

    const shareResult = async (e) => {
        e.preventDefault();

        let content = 'Twordle ' + currentAttempt.attempt + '/6\n';
        stat.forEach(item => {
            content += item + '\n';
        });
        
        await navigator.clipboard.writeText(content);

        alert('Sonuç kopyalandı.');
    };

    return (
        <div className='gameOver'>
            <div>{gameOver.guessedWord ? "Tebrikler!" : "Üzgünüm :("}</div>
            <div>
                <span>Doğru kelime <strong>{correctWord}</strong></span>
            </div>
            {gameOver.guessedWord && (<div><strong>{currentAttempt.attempt}</strong> denemede bildiniz</div>)}
            <div className="btn" id="button-7" onClick={shareResult}>
                <div id="dub-arrow"><img src={process.env.PUBLIC_URL + '/arrow-48-240.png'} alt="arrow" /></div>
                <a href='#'>Sonucu Paylaş</a>
            </div>
        </div>
    );
}

export default GameOver;
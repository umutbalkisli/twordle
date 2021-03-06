import React, {useContext, useEffect} from 'react'
import { AppContext } from '../App'

//letterPosition and attemptValue are props
function Letter({letterPosition, attemptValue}) {
    const { board, correctWord, currentAttempt, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptValue][letterPosition];

    const correct = correctWord[letterPosition] === letter;
    const almost = !correct && letter !== "" && correctWord.includes(letter);
    
    let letterState = "";
    if (currentAttempt.attempt > attemptValue) {
        letterState = correct ? "tile-correct dance" : almost ? "tile-wrong-location shake" : "tile-wrong shake";
    }

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currentAttempt.attempt]);

    return (
        <div className={'tile ' + letterState}>
            {letter}
        </div>
    )
}

export default Letter
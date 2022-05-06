import React, { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import Key from './Key'

function Keyboard() {
    const keys1 = ["E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"]
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"]
    const keys3 = ["Z", "C", "V", "B", "N", "M", "Ö", "Ç"]

    const {onEnter, onDelete, onSelectLetter, disabledLetters, currentAttempt} = useContext(AppContext);

    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter") {
            onEnter();
        }
        else if (event.key === "Backspace") {
            onDelete();
        }
        else {
            keys1.forEach((key) => {
                if (event.key.toLocaleUpperCase('TR') === key) {
                    onSelectLetter(key);
                }
            });
            keys2.forEach((key) => {
                if (event.key.toLocaleUpperCase('TR') === key) {
                    onSelectLetter(key);
                }
            });
            keys3.forEach((key) => {
                if (event.key.toLocaleUpperCase('TR') === key) {
                    onSelectLetter(key);
                }
            });
        }
    }, [currentAttempt]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        }
    }, [handleKeyboard]);

    return (
        <div className='keyboard' onKeyDown={handleKeyboard}>
            {keys1.map((key) => {
                return <Key key={key} keyValue={key} disabled={disabledLetters.includes(key)} />;
            })}
            <div className='key hidden'></div>
            <div className="space"></div>
            {keys2.map((key) => {
                return <Key key={key} keyValue={key} disabled={disabledLetters.includes(key)} />;
            })}
            <div className="space"></div>
            <Key keyValue={"ENTER"} bigKey />
            {keys3.map((key) => {
                return <Key key={key} keyValue={key} disabled={disabledLetters.includes(key)} />;
            })}
            <Key keyValue={"DELETE"} bigKey />
        </div>
    )
}

export default Keyboard
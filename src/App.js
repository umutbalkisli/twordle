import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, encodingKey, generateWordSet } from './Words';
import GameOver from './components/GameOver';
import { useLocation } from 'react-router-dom';
import Question from './components/Question';
import { Buffer } from "buffer";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPosition: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");
  const [stat, setStat] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const askedWord = query.get('q');

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      if (askedWord) {
        let decodedAskedWord = Buffer.from(askedWord, 'base64').toString();
        decodedAskedWord = decodedAskedWord.replace(encodingKey, '');
        setCorrectWord(decodedAskedWord.toLocaleUpperCase('TR'));
      }
    });
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPosition > 4) {
      return;
    }

    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition + 1});
  }

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) {
      return; //needs to put more keys to press delete
    }

    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);    
    setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition - 1});
  }

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) {
      return; //needs to put more keys to press enter
    }

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLocaleLowerCase('tr'))) {
      setCurrentAttempt({attempt: currentAttempt.attempt + 1, letterPosition: 0});
    }
    else {
      alert("Kelime bulunamadı!");
      return;
    }

    let newRowStat = '';
    for (let i = 0; i < currentWord.length; i++) {
      const correct = correctWord[i] === currentWord[i];
      const almost = !correct && currentWord[i] !== "" && correctWord.includes(currentWord[i]);

      newRowStat += correct ? "🟩" : almost ? "🟨" : "⬜";
    }
    let newStat = [...stat];
    newStat.push(newRowStat);
    setStat(newStat);

    if(currentWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true});
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false});
      return;
    }
  }

  return (
    <>
      <a href='/twordle' className='title'>
        <h1>Twordle</h1>
      </a>
      <div className="App">
        <AppContext.Provider
          value={{board, setBoard,
                  currentAttempt, setCurrentAttempt,
                  onSelectLetter, onDelete, onEnter,
                  correctWord,
                  disabledLetters, setDisabledLetters,
                  gameOver, setGameOver,
                  wordSet, setWordSet,
                  stat, setStat}}>
          <div className='game'>
            {
              askedWord ? 
                <>
                  <Board />
                  {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </>
                :
                <>
                  <Question />
                </>
            }
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;

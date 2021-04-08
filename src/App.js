import * as React from 'react';
import './App.scss';
import Folk from './components/folk';
import YouMissed from './components/you-missed';
import Letters from './components/letters';
import Layout from './components/layout';
import Modal from './components/modal';
import { useRandomWord } from './hooks/use-random-word';

export const MAX_WORD_LENGTH = 5;
export const MAX_MISSED_LETTERS = 11;

function App() {
  const [isFirstGame, setIsFirstGame] = React.useState(true);
  const [usedLetters, setUsedLetters] = React.useState([]);
  const { randomWord, status, fetchRandomWord } = useRandomWord();

  const missedLetters = usedLetters.filter((l) => !randomWord.includes(l));
  const guessedLetters = usedLetters.filter((l) => randomWord.includes(l));

  // Game is lost when player user reached steps limit
  const isGameOver = missedLetters.length === MAX_MISSED_LETTERS;

  // Game is won when each letter of the random word can be found
  // among the guessed letters
  const isGameWon = randomWord
    .split('')
    .every((l) => guessedLetters.includes(l));

  // Fetch status
  const isLoading = status === 'pending';
  const isError = status === 'rejected';
  const isSuccess = status === 'resolved';

  // Add/remove key down event listener
  React.useEffect(() => {
    const handleKeyDown = ({ key }) => {
      // If pressed key is not alphabetical or has been used already do nothing
      if (!/^[a-z]$/i.test(key) || usedLetters.includes(key.toUpperCase())) {
        return;
      }
      // If one of the screens `initial`, `game-won`, `game-over`, `loading`, 
      //`error` is shown do nothing
      if (isFirstGame || isGameWon || isGameOver || isLoading || isError) {
        return;
      }

      setUsedLetters(usedLetters.concat(key.toUpperCase()));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [usedLetters, isFirstGame, isGameWon, isGameOver, isLoading, isError]);

  // When random word is too long fetches new one
  React.useEffect(() => {
    if (randomWord.length > MAX_WORD_LENGTH) {
      fetchRandomWord();
    }
  }, [randomWord, fetchRandomWord]);

  // Fetches new word and resets the used letters
  const startNewGame = () => {
    setUsedLetters([]);
    fetchRandomWord();
  };

  // Starts the first game
  const startFirstGame = () => {
    setIsFirstGame(false);
  };

  // Initial game screen
  if (isFirstGame) {
    return (
      <Layout>
        <Modal
          title="STARTING THE GAME"
          buttonText="Start game"
          onButtonClick={startFirstGame}
        />
        <Folk visiblePartsCount={11} />
        <YouMissed
          missedLetters={['B', 'D', 'E', 'Z', 'P', 'U', 'K', 'L', 'Q', 'W']}
        />
        <Letters word="HANGMAN" guessedLetters={['H', 'A']} />
      </Layout>
    );
  }

  // When the word is too long, before new one is fetched use empty string 
  // to so that <Letters> is semi-transparent
  const word = randomWord.length > MAX_WORD_LENGTH ? '' : randomWord;

  // After the initial game
  return (
    <Layout>
      {/* Loading screen */}
      {isLoading && <Modal title="Loading..." noButton />}

  

      {/* Game over screen */}
      {isGameOver && isSuccess && (
        <Modal
          title="Game over"
          buttonText="New word"
          onButtonClick={startNewGame}
        />
      )}

      {/* Game won screen */}
      {isGameWon && isSuccess && (
        <Modal
          title="You won!"
          buttonText="Again"
          description={`Congratulations, you missed ${missedLetters.length} letters.`}
          onButtonClick={startNewGame}
        />
      )}

      <Folk visiblePartsCount={missedLetters.length} />
      <YouMissed missedLetters={missedLetters} />
      <Letters word={word} guessedLetters={guessedLetters} />
    </Layout>
  );
}

export default App;

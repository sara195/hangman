import PropTypes from 'prop-types';
import Letter from './letter';

import './letters.scss';

function Letters({ word, guessedLetters }) {
  const MAX_WORD_LENGTH = 17;
  const wordLetters = word
    // Pad the word when its length is less than max length
    .padStart(MAX_WORD_LENGTH)
    .split('');

  return (
    <div className="letters">
      {wordLetters.map((letter, i) => (
        <Letter key={i} disabled={letter === ' '}>
          {guessedLetters.includes(letter) || letter === '-' ? letter : null}
        </Letter>
      ))}
    </div>
  );
}

Letters.propTypes = {
  guessedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  word: PropTypes.string.isRequired,
};

export default Letters;

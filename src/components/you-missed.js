import PropTypes from 'prop-types';
import './you-missed.scss';

function YouMissed({ missedLetters }) {
  return (
    <div className="you-missed">
      <div className="title">You missed:</div>
      <div className="missed-letters">{missedLetters.join(' ')}</div>
    </div>
  );
}

YouMissed.propTypes = {
  missedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default YouMissed;

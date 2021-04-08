import PropTypes from 'prop-types';
import clsx from 'clsx';
import './letter.scss';

function Letter({ disabled, children }) {
  return (
    <div className={clsx('letter', disabled && 'disabled')}>{children}</div>
  );
}

Letter.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Letter;

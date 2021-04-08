import PropTypes from 'prop-types';
import './modal.scss';

function Modal({ title, description, buttonText, onButtonClick, noButton }) {
  return (
    <div className="modal">
      <h1 className="title">{title}</h1>
      {description && <p className="description">{description}</p>}
      {!noButton && (
        <button className="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  noButton: PropTypes.bool,
};

export default Modal;
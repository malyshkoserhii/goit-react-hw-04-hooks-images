import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick, text, type, icon }) => {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      {type === 'icon' ? icon : text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

Button.defaultProps = {
  text: 'Load more',
  type: 'text',
  icon: null,
};

export default Button;

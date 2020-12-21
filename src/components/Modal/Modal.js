import { usEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {
  usEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleOnBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleOnBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: <div></div>,
};

export default Modal;

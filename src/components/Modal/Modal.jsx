import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const Modal = ({ imgSrc, label, closeModal }) => {
  const portalElement = document.body;

  useEffect(() => {
    const onEscButtonClose = (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscButtonClose);

    return () => {
      window.removeEventListener('keydown', onEscButtonClose);
    };
  }, [closeModal]);

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <StyledModal>
        <img src={imgSrc} alt={label} />
      </StyledModal>
    </Overlay>,
    portalElement
  );
};

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
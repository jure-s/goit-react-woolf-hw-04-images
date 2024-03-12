import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const Modal = ({ imgSrc, label, closeModal }) => {
  const portalElement = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(portalElement.current);

    return () => {
      document.body.removeChild(portalElement.current);
    };
  }, []); 

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
    portalElement.current
  );
};

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
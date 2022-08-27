import { useCallback, useEffect } from 'react';

const Popup = ({ component: Component, ...props }) => {
  const { isOpen, onClose } = props;
  const onPressEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, []);

  const handleClickClose = useCallback((e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      onClose();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onPressEsc);
    }
    return () => document.removeEventListener('keydown', onPressEsc);
  }, [isOpen]);

  return (
    <>
      <Component {...props} onClose={handleClickClose} />
    </>
  );
};

export default Popup;

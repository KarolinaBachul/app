import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

type Props = {
  title?: string;
  className?: string;
  nameClass?: string;
  onDismiss: () => void;
};

const modalRoot = document.getElementById('root');

let el = document.createElement('div');

const Modal: React.FC<Props> = ({
  onDismiss,
  title,
  children,
  className,
  nameClass,
}) => {
  React.useEffect(() => {
    modalRoot?.appendChild(el);
  }, []);

  React.useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onDismiss();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onDismiss]);

  return ReactDOM.createPortal(
    <div className={`${classes.modal} `} onClick={onDismiss}>
      <div
        className={`${classes.modal_content} ${className}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h2 className={`${classes.title} ${nameClass}`}>{title}</h2>
        {children}
      </div>
    </div>,
    el
  );
};

export default Modal;

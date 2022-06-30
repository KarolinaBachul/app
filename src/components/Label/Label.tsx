import React from 'react';
import classes from './Label.module.css';

type Props = {
  htmlFor: string;
  label: string;
  className?: string;
};

const Label: React.FC<Props> = ({ htmlFor, label, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`${classes.lbl} ${className}`}>
      {label}
    </label>
  );
};

export default Label;

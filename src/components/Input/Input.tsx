import React from 'react';

import classes from './Input.module.css';

type Props = {
  id: string;
  type: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  invalid?: boolean;
  required?: boolean;
  value?: string;
};

const Input: React.FC<Props> = ({
  id,
  type,
  className = '',
  onChange,
  onBlur,
  invalid = false,
  required = false,
  value,
}) => {
  return (
    <input
      id={id}
      required={required}
      type={type}
      className={`${classes.inp} ${className} ${
        invalid ? classes.inp_invalid : ''
      }`}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

export default Input;

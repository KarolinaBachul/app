import React from 'react';
import Input from '../Input/Input';
import Label from '../Label/Label';

type Props = {
  id: string;
  type: string;
  htmlFor: string;
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  invalid?: boolean;
  required?: boolean;
  value?: string;
};

const InputWithLabel: React.FC<Props> = ({
  id,
  type,
  htmlFor,
  label,
  labelClassName = '',
  inputClassName = '',
  onChange,
  onBlur,
  invalid = false,
  required = false,
  value,
}) => {
  return (
    <React.Fragment>
      <Label htmlFor={htmlFor} label={label} className={labelClassName} />
      <Input
        id={id}
        required={required}
        type={type}
        className={inputClassName}
        onChange={onChange}
        onBlur={onBlur}
        invalid={invalid}
        value={value}
      />
    </React.Fragment>
  );
};

export default InputWithLabel;

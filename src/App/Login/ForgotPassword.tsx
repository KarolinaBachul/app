import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Modal from '../../components/Modal/Modal';

import classes from './ForgotPassword.module.css';

type Props = {
  onDismiss: () => void;
};

const ForgotPassword: React.FC<Props> = (props) => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);
  };

  const isEmailValid = email.includes('@');

  return (
    <Modal title={'I forgot my password'} onDismiss={props.onDismiss}>
      <form onSubmit={submitHandler} className={classes.form}>
        <InputWithLabel
          id="email"
          type="email"
          htmlFor="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          labelClassName={classes.label}
        />
        <Button type="submit" loading={isSending} disabled={!isEmailValid}>
          Send
        </Button>
      </form>
    </Modal>
  );
};

export default ForgotPassword;

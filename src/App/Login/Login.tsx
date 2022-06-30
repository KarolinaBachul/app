import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import classes from './Login.module.css';
import Button from '../../components/Button/Button';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Modal from '../../components/Modal/Modal';

const Login: React.FC = () => {
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const forgotPaswordOpenModalHandler = () => {
    setForgotPasswordModalOpen(true);
  };

  const forgotPaswordCloseModalHandler = () => {
    setForgotPasswordModalOpen(false);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const auth = getAuth();
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //   });

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      if (e.message === 'Firebase: Error (auth/wrong-password).') {
        let err = 'Wrong password!';
        setError(err);
      } else if (e.message === 'Firebase: Error (auth/user-not-found).') {
        let err = 'There is no account assigned to this email address.';
        setError(err);
      } else if (
        e.message ===
        'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
      ) {
        let err =
          'Access to this account has been temporarily disabled due to many failed login attempts. Reset your password or try again later. ';
        setError(err);
      } else {
        setError(e.message);
      }
    }
    navigate('recipes');
  };

  const errorModalCloseHandler = () => {
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      {forgotPasswordModalOpen && (
        <ForgotPassword onDismiss={forgotPaswordCloseModalHandler} />
      )}
      <div className={classes.cart}>
        <section className={classes.control}>
          <h2 className={classes.text}>Are you a user?</h2>
          <form className={classes.login_form} onSubmit={submitHandler}>
            <InputWithLabel
              id="email"
              type="email"
              htmlFor="email"
              label="Email"
              value={email}
              inputClassName={classes.login_input}
              onChange={(event) => setEmail(event.target.value)}
            />

            <InputWithLabel
              id="password"
              type="password"
              htmlFor="pasword"
              label="Password"
              value={password}
              inputClassName={classes.login_input}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button className={classes.login_button} type="submit">
              Login
            </Button>

            <Link to="/register">
              <Button className={classes.create_account_button}>
                Create Account
              </Button>
            </Link>

            <span
              className={classes.forgot_password_link}
              onClick={forgotPaswordOpenModalHandler}
            >
              I forgot my password
            </span>
          </form>
        </section>
        {error && <Modal title={error} onDismiss={errorModalCloseHandler} />}
      </div>
    </>
  );
};
export default Login;

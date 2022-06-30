import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Register.module.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Button from '../../components/Button/Button';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Modal from '../../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoadingBtn(true);
    const auth = getAuth();
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // ..
    //   });
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      authCtx.login();
      navigate('/register-success');
    } catch (e: any) {
      if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
        let err = 'Email address already in use';
        setError(err);
      } else {
        setError(e.message);
      }
    }
  };

  const isPasswordMatch = confirmPassword === password;

  const isPasswordLongEnough = password.length > 5;

  const isPasswordInvalid = isPasswordTouched && !isPasswordLongEnough;

  const isConfirmPasswordInvalid = !isPasswordMatch && isConfirmPasswordTouched;

  const formIsValid = isPasswordLongEnough && isPasswordMatch;

  const errorModalCloseHandler = () => {
    setError(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsPasswordTouched(false);
    setIsConfirmPasswordTouched(false);
  };

  return (
    <div className={classes.cart}>
      <section className={classes.control}>
        <h2 className={classes.text}>Are you here for the first time?</h2>
        <form className={classes.login_form} onSubmit={submitHandler}>
          <InputWithLabel
            id="email"
            required
            type="email"
            htmlFor="email"
            label="Email"
            value={email}
            inputClassName={classes.login_input}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setIsEmailTouched(true)}
          />
          <InputWithLabel
            id="password"
            required
            type="password"
            htmlFor="pasword"
            label="Password"
            value={password}
            inputClassName={classes.login_input}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setIsPasswordTouched(true)}
            invalid={isPasswordInvalid}
          />
          {isPasswordInvalid && (
            <p className={classes.invalid}>
              The password must be at least 6 characters long.
            </p>
          )}

          <InputWithLabel
            id="confirm_password"
            required
            type="password"
            htmlFor="pasword"
            label="Confirm Password"
            value={confirmPassword}
            inputClassName={classes.login_input}
            onChange={(event) => setConfirmPassword(event.target.value)}
            onBlur={() => setIsConfirmPasswordTouched(true)}
            invalid={isConfirmPasswordInvalid}
          />
          {isConfirmPasswordInvalid && (
            <p className={classes.invalid}>Passwords don't match.</p>
          )}
          <Button
            className={classes.register_button}
            type="submit"
            disabled={!formIsValid}
            loading={isLoadingBtn}
          >
            Create Account
          </Button>
        </form>
      </section>
      {error && <Modal title={error} onDismiss={errorModalCloseHandler} />}
    </div>
  );
};

export default Register;

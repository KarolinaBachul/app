import { getAuth, signOut } from '@firebase/auth';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp from '../App/Firebase/Firebase';

const auth = getAuth(firebaseApp);

interface IAuthContext {
  isLoggedIn: boolean;
  login: Dispatch<SetStateAction<void>>;
  logout: Dispatch<SetStateAction<void>>;
  loading: boolean;
  user: any;
}

const defaultState = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  loading: false,
  user: null,
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        loading: loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

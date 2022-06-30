import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Layout from './Layout/Layout';
import Register from './Register/Register';
import RegisterSuccess from './RegisterSuccess/RegisterSuccess';
import Login from './Login/Login';
import LoginSuccess from './LoginSuccess/LoginSuccess';
import ShowRecipe from './ShowRecipe/ShowRecipe';
import FavouriteRecipes from './FavouriteRecipes/FavouriteRecipes';

const Routes: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Layout>
        <ReactRoutes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {isLoggedIn && (
            <Route path="register-success" element={<RegisterSuccess />} />
          )}
          {isLoggedIn && <Route path="recipes" element={<LoginSuccess />} />}
          {isLoggedIn && (
            <Route path="login/recipes" element={<LoginSuccess />} />
          )}
          <Route path="recipes/:id" element={<ShowRecipe />} />
          {isLoggedIn && (
            <Route path="favourites" element={<FavouriteRecipes />} />
          )}
          {isLoggedIn && (
            <Route path="recipes/favourites" element={<FavouriteRecipes />} />
          )}
        </ReactRoutes>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;

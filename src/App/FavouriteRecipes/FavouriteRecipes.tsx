import React, { useContext, useEffect } from 'react';
import FavContext from '../../store/fav-context';
import RecipeFetcher from '../LoginSuccess/RecipeFetcher';
import { FiFrown } from 'react-icons/fi';
import classes from './FavouriteRecipes.module.css';
import Button from '../../components/Button/Button';

const FavouriteRecipes: React.FC = () => {
  const { favouriteRecipes, fetchFav } = useContext(FavContext);

  useEffect(() => {
    fetchFav();
  }, [fetchFav]);

  return (
    <div className={classes.cart}>
      <div className={classes.main}>
        {favouriteRecipes.length >= 1 && (
          <h2 className={classes.text}>
            Welcome Back! What do you want to eat today?
          </h2>
        )}
        <section className={classes.section2}>
          {!favouriteRecipes.length && (
            <p className={classes.title}>
              You don't have any favorite recipes yet
            </p>
          )}
          {!favouriteRecipes.length && <FiFrown className={classes.icon} />}

          {favouriteRecipes.length > 0 &&
            favouriteRecipes.map((id) => <RecipeFetcher id={id} key={id} />)}
        </section>
      </div>
    </div>
  );
};

export default FavouriteRecipes;

import { useEffect, useState, useContext } from 'react';
import Recipe from './Recipe';
import classes from './LoginSuccess.module.css';
import { FiFrown } from 'react-icons/fi';
import FavContext from '../../store/fav-context';
import RecipeFetcher from './RecipeFetcher';
import { useNavigate } from 'react-router-dom';

const LoginSuccess: React.FC = () => {
  const [randomRecipe1, setRandomRecipe1] = useState<any>(null);
  const [randomRecipe2, setRandomRecipe2] = useState<any>(null);
  const [randomRecipe3, setRandomRecipe3] = useState<any>(null);

  const { favouriteRecipes } = useContext(FavContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async (number: number) => {
      const res = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      const json = await res.json();
      const loadedMeal = json.meals[0];
      if (number === 1) {
        setRandomRecipe1(loadedMeal);
      }
      if (number === 2) {
        setRandomRecipe2(loadedMeal);
      }
      if (number === 3) {
        setRandomRecipe3(loadedMeal);
      }
    };

    fetchRecipe(1);
    fetchRecipe(2);
    fetchRecipe(3);
  }, []);

  if (!randomRecipe1 || !randomRecipe2 || !randomRecipe3) {
    return (
      <div className={classes.div}>
        <div>
          <i className={classes.loader}></i>
        </div>
      </div>
    );
  }

  const shuffled = favouriteRecipes.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  const selected = shuffled.slice(0, 2);

  const favHandler = () => {
    navigate('favourites');
  };

  return (
    <div className={classes.cart}>
      <div className={classes.main}>
        <h2 className={classes.text}>
          Welcome Back! What do you want to eat today?
        </h2>
        <section className={classes.section}>
          <Recipe
            title={randomRecipe1.strMeal}
            picture={randomRecipe1.strMealThumb}
            id={randomRecipe1.idMeal}
          />
          <Recipe
            title={randomRecipe2.strMeal}
            picture={randomRecipe2.strMealThumb}
            id={randomRecipe2.idMeal}
          />
          <Recipe
            title={randomRecipe3.strMeal}
            picture={randomRecipe3.strMealThumb}
            id={randomRecipe3.idMeal}
          />
        </section>

        <section className={classes.section2}>
          {!favouriteRecipes.length && (
            <p className={classes.title}>
              You don't have any favorite recipes yet
            </p>
          )}
          {!favouriteRecipes.length && <FiFrown className={classes.icon} />}
          {favouriteRecipes.length > 0 &&
            selected.map((rec) => <RecipeFetcher id={rec} key={rec} />)}
          {favouriteRecipes.length > 0 && (
            <div onClick={favHandler} className={classes.box}>
              <p>CLICK TO SEE MORE YOUR FAVORITE RECIPES!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LoginSuccess;

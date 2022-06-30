import classes from './Recipe.module.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import AuthContext from '../../store/auth-context';
import FavContext from '../../store/fav-context';
import { useContext, useState } from 'react';

type Props = {
  title: string;
  picture: string;
  id: string;
};

const Recipe: React.FC<Props> = ({ title, picture, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  const { favouriteRecipes, removeRecipeById } = useContext(FavContext);

  const addRecipeToFavorite = async () => {
    setIsLoading(true);
    try {
      await fetch(
        `https://cookbook-8c69d-default-rtdb.europe-west1.firebasedatabase.app/favorites/${user.uid}.json`,
        {
          method: 'POST',
          body: JSON.stringify(id),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      nav('favourites');
    } finally {
      setIsLoading(false);
    }
  };

  const isFavourite = favouriteRecipes.includes(id);

  return (
    <section>
      <p className={classes.title}>{title}</p>

      <div
        className={classes.cont}
        onClick={() => {
          nav(`/recipes/${id}`);
        }}
      >
        <div className={classes.overlay}></div>

        <img className={classes.picture} src={picture} alt={title}></img>
        <span className={classes.text}>CLICK TO SEE MORE!</span>
      </div>
      {user &&
        !isLoading &&
        (!isFavourite ? (
          <AiOutlineHeart
            className={classes.icon}
            onClick={addRecipeToFavorite}
          />
        ) : (
          <AiFillHeart
            className={classes.icon2}
            onClick={() => {
              removeRecipeById(id);
            }}
          />
        ))}
    </section>
  );
};

export default Recipe;

import React, { useEffect, useContext, useState } from 'react';
import AuthContext from './auth-context';

interface IFavContext {
  favouriteRecipes: string[];
  fetchFav: () => void;
  loading: boolean;
  removeRecipeById: (id: string) => void;
}

const defaultState = {
  favouriteRecipes: [],
  fetchFav: () => {},
  loading: false,
  removeRecipeById: () => {},
};

const FavContext = React.createContext<IFavContext>(defaultState);

export const FavProvider: React.FC = ({ children }) => {
  const [favouriteRecipes, setFavouriteRecipes] = useState<string[]>([]);
  const [recipeData, setRecipeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const fetchFav = React.useCallback(async () => {
    setLoading(true);
    try {
      if (!user) {
        return;
      }
      const res = await fetch(
        `https://cookbook-8c69d-default-rtdb.europe-west1.firebasedatabase.app/favorites/${user.uid}.json`
      );
      const data = await res.json();
      console.log(data);
      setRecipeData(data);
      if (!data) {
        setFavouriteRecipes([]);
      } else {
        const favRecipes = Object.keys(data).map((key) => data[key]);
        setFavouriteRecipes(favRecipes as string[]);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFav();
  }, [fetchFav]);

  const findKeyById = (id: string) => {
    return Object.keys(recipeData).find(
      (recipeKey) => id === recipeData[recipeKey]
    );
  };

  const removeRecipeById = async (id: string) => {
    const key = findKeyById(id);
    console.log(key);

    try {
      await fetch(
        `https://cookbook-8c69d-default-rtdb.europe-west1.firebasedatabase.app/favorites/${user.uid}/${key}.json`,
        {
          method: 'DELETE',
        }
      );
    } finally {
      fetchFav();
    }
  };

  return (
    <FavContext.Provider
      value={{ favouriteRecipes, fetchFav, removeRecipeById, loading }}
    >
      {children}
    </FavContext.Provider>
  );
};

export default FavContext;

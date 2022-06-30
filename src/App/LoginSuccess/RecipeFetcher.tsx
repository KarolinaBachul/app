import { useState, useEffect } from 'react';
import React from 'react';
import Recipe from './Recipe';

interface Props {
  id: string;
}

const RecipeFetcher: React.FC<Props> = ({ id }) => {
  const [recipeData, setRecipeData] = useState<any>(null);
  useEffect(() => {
    const fetchRecipe = async (idMeal: string) => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const json = await res.json();
      setRecipeData(json.meals[0]);
    };
    fetchRecipe(id);
  }, [id]);

  return (
    <React.Fragment>
      {!recipeData && <p>Loading...</p>}
      {recipeData && (
        <Recipe
          title={recipeData.strMeal}
          picture={recipeData.strMealThumb}
          id={recipeData.idMeal}
          key={recipeData.idMeal}
        />
      )}
    </React.Fragment>
  );
};

export default RecipeFetcher;

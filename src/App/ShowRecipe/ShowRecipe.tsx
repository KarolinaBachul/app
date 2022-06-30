import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import classes from './ShowRecipe.module.css';

const getIngredients = (obj: any) => {
  const ingredients: string[][] = [];
  let startNumber = 1;
  const scrapIngredients = (val1: string, val2: string) => {
    if (val1 && val1 !== '') {
      ingredients.push([val1, val2]);
      startNumber++;
      scrapIngredients(
        obj[`strIngredient${startNumber}`],
        obj[`strMeasure${startNumber}`]
      );
    }
  };
  scrapIngredients(
    obj[`strIngredient${startNumber}`],
    obj[`strMeasure${startNumber}`]
  );
  return ingredients;
};

const ShowRecipe: React.FC = () => {
  const [showRecipe, setShowRecipe] = useState<any>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const json = await res.json();
      const loadedMeal = json.meals[0];

      setShowRecipe(loadedMeal);
    };
    fetchRecipe();
  }, [id]);

  if (!showRecipe) {
    return (
      <div className={classes.div}>
        <div>
          <i className={classes.loader}></i>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(showRecipe);

  return (
    <div className={classes.cart}>
      <h2 className={classes.title}>{showRecipe.strMeal}</h2>
      <section className={classes.section1}>
        <img
          className={classes.picture}
          src={showRecipe.strMealThumb}
          alt={showRecipe.strMeal}
        ></img>
        <h3>Ingredients:</h3>
        <div>
          <ul>
            {ingredients.map((ingredient) => (
              <li>
                {ingredient[1]} {ingredient[0]}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={classes.section2}>
        {/* <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient) => (
            <li>
              {ingredient[1]} {ingredient[0]}
            </li>
          ))}
        </ul> */}
        <h3>Meal Preparation:</h3>
        <p>{showRecipe.strInstructions}</p>
      </section>
      <p className={classes.source}>
        Source: <a href={showRecipe.strSource}>{showRecipe.strSource}</a>
      </p>
    </div>
  );
};

export default ShowRecipe;

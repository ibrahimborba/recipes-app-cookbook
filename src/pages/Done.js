import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneFav from '../components/CardDoneFav';
import { getRecipesDone } from '../services/mealsLocalSt';

function Done() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneFiltered, setDoneFiltered] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setDoneRecipes(getRecipesDone());
    setDoneFiltered(getRecipesDone());
  }, []);

  useEffect(() => {
    const filteredByType = doneRecipes.filter((recipe) => recipe.type === filter);
    if (filteredByType.length === 0) {
      return setDoneFiltered(doneRecipes);
    }
    return setDoneFiltered(filteredByType);
  }, [filter, doneRecipes]);

  const handleFilterBtn = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <div>
      <Header />
      <button
        name="allBtn"
        type="button"
        data-testid="filter-by-all-btn"
        value=""
        onClick={ handleFilterBtn }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        value="food"
        onClick={ handleFilterBtn }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ handleFilterBtn }
      >
        Drinks
      </button>
      {doneFiltered.map((done, index) => (
        <CardDoneFav
          key={ done.id }
          recipeID={ done.id }
          recipeImg={ done.image }
          recipeTitle={ done.name }
          recipeType={ done.type }
          recipeNationality={ done.nationality }
          recipeCategory={ done.category }
          recipeAlcohol={ done.alcoholicOrNot }
          recipeDate={ done.doneDate }
          recipeTags={ done.tags }
          index={ index }
        />
      ))}
    </div>
  );
}

export default Done;

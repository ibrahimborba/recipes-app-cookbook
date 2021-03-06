import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneFav from '../components/CardDoneFav';
import { getRecipesDone } from '../services/mealsLocalSt';
import StyledCategories from '../styled/StyledCategories';

function Done() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setDoneRecipes(getRecipesDone());
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      return setDoneRecipes(getRecipesDone());
    }
    const filteredByType = getRecipesDone().filter((recipe) => recipe.type === filter);
    return setDoneRecipes(filteredByType);
  }, [filter]);

  const handleFilterBtn = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <div>
      <Header />
      <StyledCategories>
        <button
          className={ filter === 'all' && 'selectedCategory' }
          name="allBtn"
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleFilterBtn }
        >
          All
        </button>
        <button
          className={ filter === 'food' && 'selectedCategory' }
          type="button"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ handleFilterBtn }
        >
          Food
        </button>
        <button
          className={ filter === 'drink' && 'selectedCategory' }
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilterBtn }
        >
          Drinks
        </button>
      </StyledCategories>
      {doneRecipes.map((done, index) => (
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

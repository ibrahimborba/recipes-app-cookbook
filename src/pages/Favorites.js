import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneFav from '../components/CardDoneFav';
import { getFavoriteRecipes, updateFavoriteRecipes } from '../services/mealsLocalSt';
import StyledCategories from '../styled/StyledCategories';

function Favorites() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [removeFav, setRemoveFav] = useState(false);

  useEffect(() => {
    setFavRecipes(getFavoriteRecipes());
  }, [removeFav]);

  useEffect(() => {
    if (filter === 'all') {
      return setFavRecipes(getFavoriteRecipes());
    }
    const filteredByType = getFavoriteRecipes()
      .filter((recipe) => recipe.type === filter);
    return setFavRecipes(filteredByType);
  }, [filter]);

  const handleFilterBtn = ({ target: { value } }) => {
    setFilter(value);
  };

  const favoriteRecipe = (id) => () => {
    updateFavoriteRecipes({ id });
    setRemoveFav(!removeFav);
  };

  return (
    <div>
      <Header />
      <StyledCategories>
        <button
          className={ filter === 'all' && 'selectedCategory' }
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
      {favRecipes.map((fav, index) => (
        <CardDoneFav
          key={ fav.id }
          recipeID={ fav.id }
          recipeImg={ fav.image }
          recipeTitle={ fav.name }
          recipeType={ fav.type }
          recipeNationality={ fav.nationality }
          recipeCategory={ fav.category }
          recipeAlcohol={ fav.alcoholicOrNot }
          index={ index }
          favoriteRecipe={ favoriteRecipe }
        />
      ))}
    </div>
  );
}

export default Favorites;

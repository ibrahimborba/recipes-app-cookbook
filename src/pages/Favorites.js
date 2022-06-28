import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneFav from '../components/CardDoneFav';
import { getFavoriteRecipes, updateFavoriteRecipes } from '../services/mealsLocalSt';

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
    const filteredByType = favRecipes.filter((recipe) => recipe.type === filter);
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
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
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

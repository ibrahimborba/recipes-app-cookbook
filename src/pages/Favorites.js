import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneFav from '../components/CardDoneFav';
import { getFavoriteRecipes, updateFavoriteRecipes } from '../services/mealsLocalSt';

function Favorites() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [favFiltered, setFavFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [removeFav, setRemoveFav] = useState(false);

  useEffect(() => {
    setFavRecipes(getFavoriteRecipes());
    setFavFiltered(getFavoriteRecipes());
  }, [removeFav]);

  useEffect(() => {
    const filteredByType = favRecipes.filter((recipe) => recipe.type === filter);
    if (filteredByType.length === 0) {
      return setFavFiltered(favRecipes);
    }
    return setFavFiltered(filteredByType);
  }, [filter, favRecipes]);

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
      {favFiltered.map((fav, index) => (
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

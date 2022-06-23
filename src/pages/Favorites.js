import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFavoriteRecipes, updateFavoriteRecipes } from '../services/mealsLocalSt';

function Favorites() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [favFiltered, setFavFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [showMessage, setShowMessage] = useState(false);
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

  const copyToClipBoard = (id, type) => () => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);

    const SECONDS = 1500;

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), SECONDS);
  };

  const handleFilterBtn = ({ target: { value } }) => {
    setFilter(value);
  };

  const favoriteRecipe = (id) => () => {
    console.log(id);
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
        <div
          key={ fav.id }
        >
          <Link to={ `/${fav.type}s/${fav.id}` }>
            <img
              src={ fav.image }
              alt={ fav.strIngredient1 }
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '200px' } }
            />
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {
              fav.type === 'food'
                ? (`${fav.nationality} - ${fav.category}`) : (`${fav.alcoholicOrNot}`)
            }
          </p>
          <Link to={ `/${fav.type}s/${fav.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { fav.name }
            </p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            { fav.doneDate }
          </p>
          <button
            type="button"
            onClick={ copyToClipBoard(fav.id, fav.type) }
          >
            <img
              src={ shareIcon }
              alt={ fav.name }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {
            showMessage
              && (
                <span>Link copied!</span>
              )
          }
          <button
            type="button"
            onClick={ favoriteRecipe(fav.id) }
          >
            <img
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              alt="favorite icon"
            />
          </button>
          { fav.tags.map((tag, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `0-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          )) }
        </div>
      ))}
    </div>
  );
}

export default Favorites;

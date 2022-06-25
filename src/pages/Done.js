import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { getRecipesDone } from '../services/mealsLocalSt';

function Done() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneFiltered, setDoneFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [showMessage, setShowMessage] = useState(false);

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

  const copyToClipBoard = (id, type) => () => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);

    const SECONDS = 1500;

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), SECONDS);
  };

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
        <div
          key={ done.id }
        >
          <Link to={ `/${done.type}s/${done.id}` }>
            <img
              src={ done.image }
              alt={ done.strIngredient1 }
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '200px' } }
            />
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {
              done.type === 'food'
                ? (`${done.nationality} - ${done.category}`) : (`${done.alcoholicOrNot}`)
            }
          </p>
          <Link to={ `/${done.type}s/${done.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { done.name }
            </p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            { done.doneDate }
          </p>
          <button
            type="button"
            onClick={ copyToClipBoard(done.id, done.type) }
          >
            <img
              src={ shareIcon }
              alt={ done.name }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {
            showMessage
              && (
                <span>Link copied!</span>
              )
          }
          { done.tags.map((tag, tagIndex) => (
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

export default Done;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { getRecipesDone } from '../services/mealsLocalSt';

/* const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
]; */

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
      {doneFiltered.map((fav, index) => (
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

export default Done;

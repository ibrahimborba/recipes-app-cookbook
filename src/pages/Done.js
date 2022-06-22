import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const doneRecipes = [
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
];

function Done() {
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {doneRecipes.map((fav, index) => (
        <div
          key={ fav.id }
        >
          <img
            src={ fav.image }
            alt={ fav.strIngredient1 }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {
              fav.type === 'food'
                ? (`${fav.nationality} - ${fav.category}`) : (`${fav.alcoholicOrNot}`)
            }
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { fav.name }
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            { fav.doneDate }
          </p>
          <img
            src={ shareIcon }
            alt={ fav.name }
            data-testid={ `${index}-horizontal-share-btn` }
          />
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

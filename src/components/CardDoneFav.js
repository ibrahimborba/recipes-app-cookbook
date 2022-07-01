import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import StyledCardDoneFav from '../styled/StyledCardDoneFav';

function CardDoneFav(props) {
  const [clickedBtn, setClickedBtn] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const {
    recipeID,
    recipeImg,
    recipeTitle,
    recipeType,
    recipeNationality,
    recipeCategory,
    recipeAlcohol,
    recipeDate,
    recipeTags,
    index,
    favoriteRecipe } = props;

  const copyToClipBoard = (id, type) => () => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);

    const SECONDS = 1500;

    setClickedBtn(true);
    setTimeout(() => setClickedBtn(false), SECONDS);
  };

  const handlePushPath = (type, id) => (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      history.push(`/${type}s/${id}`);
    }
  };

  return (
    <StyledCardDoneFav>
      <div
        className="container_recipe"
        tabIndex={ 0 }
        role="button"
        onClick={ handlePushPath(recipeType, recipeID) }
        onKeyDown={ handlePushPath(recipeType, recipeID) }
      >
        <img
          className="recipe_img"
          src={ recipeImg }
          alt={ recipeID }
          data-testid={ `${index}-horizontal-image` }
        />
        <section>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {
              recipeType === 'food'
                ? (`${recipeNationality} - ${recipeCategory}`) : (`${recipeAlcohol}`)
            }
          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>
            { recipeTitle }
          </h3>
          <div className="recipe_tags">
            { recipeTags.map((tag, tagIndex) => (
              <p
                className="recipe_tag"
                key={ tagIndex }
                data-testid={ `0-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            )) }
          </div>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipeDate }
          </p>
        </section>
      </div>
      <section className="container_copyFav">
        {
          clickedBtn && <span>Link copied!</span>
        }
        <button
          type="button"
          onClick={ copyToClipBoard(recipeID, recipeType) }
        >
          <img
            src={ shareIcon }
            alt={ recipeTitle }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        {
          pathname === '/favorite-recipes'
          && (
            <button
              type="button"
              onClick={ favoriteRecipe(recipeID) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favorite icon"
              />
            </button>
          )
        }
      </section>
    </StyledCardDoneFav>
  );
}

CardDoneFav.propTypes = {
  recipeID: PropTypes.string.isRequired,
  recipeImg: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeNationality: PropTypes.string,
  recipeCategory: PropTypes.string,
  recipeAlcohol: PropTypes.string,
  recipeDate: PropTypes.string,
  recipeTags: PropTypes.arrayOf(PropTypes.string),
  favoriteRecipe: PropTypes.func,
};

CardDoneFav.defaultProps = {
  recipeNationality: '',
  recipeCategory: '',
  recipeAlcohol: '',
  recipeDate: '',
  recipeTags: [],
  favoriteRecipe: '',
};

export default CardDoneFav;

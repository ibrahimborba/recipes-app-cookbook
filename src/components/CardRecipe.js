import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import StyledCardRecipe from '../styled/StyledCardRecipe';

function CardRecipe({ id, image, title, category, type, index }) {
  const history = useHistory();

  const handlePushPath = (recipeID) => (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      history.push(`/${type}s/${recipeID}`);
    }
  };

  return (
    <StyledCardRecipe
      data-testid={ `${index}-recipe-card` }
      tabIndex={ 0 }
      role="button"
      onClick={ handlePushPath(id) }
      onKeyDown={ handlePushPath(id) }
    >
      <img
        className="card-background"
        data-testid={ `${index}-card-img` }
        src={ image }
        alt={ title }
      />
      <h3
        data-testid={ `${index}-card-name` }
        className="card-title"
      >
        { title }
      </h3>
      <p className="card-category">{ category }</p>
    </StyledCardRecipe>
  );
}

CardRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  category: PropTypes.string,
  type: PropTypes.string,
};

CardRecipe.defaultProps = {
  category: '',
  type: '',
};

export default CardRecipe;

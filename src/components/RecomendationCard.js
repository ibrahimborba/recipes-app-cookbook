import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import StyledRecommendationCard from '../styled/StyledRecommendationCard';

function RecomendationCard({ id, image, category, index, title, type }) {
  const history = useHistory();

  return (
    <StyledRecommendationCard
      role="link"
      data-testid={ `${index}-recomendation-card` }
      tabIndex={ 0 }
      onClick={ () => history.push(`/${type}s/${id}`) }
      onKeyDown={ () => history.push(`/${type}s/${id}`) }
    >
      <img
        src={ image }
        alt={ title }
      />
      <h4 data-testid={ `${index}-recomendation-title` }>{ title }</h4>
      <p>{ category }</p>
    </StyledRecommendationCard>
  );
}

RecomendationCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecomendationCard;

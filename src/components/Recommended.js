import React from 'react';
import { useSelector } from 'react-redux';
import StyledRecommended from '../styled/StyledRecommended';
import RecomendationCard from './RecomendationCard';

function Recommended() {
  const { isFetching, recommendations } = useSelector((state) => state.recipe);

  return (
    <StyledRecommended>
      {
        !isFetching
          && (
            recommendations.map(({ categoryRecom, title, image, id, type }, index) => (
              <RecomendationCard
                key={ id }
                category={ categoryRecom }
                id={ id }
                index={ index }
                image={ image }
                title={ title }
                type={ type }
              />
            ))
          )
      }
    </StyledRecommended>
  );
}

export default Recommended;

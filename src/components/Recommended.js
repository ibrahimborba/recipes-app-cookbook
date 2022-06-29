import React from 'react';
import { useSelector } from 'react-redux';
import StyledRecommended from '../styled/StyledRecommended';
import CardRecipe from './CardRecipe';

function Recommended() {
  const { isFetching, recommendations } = useSelector((state) => state.recipe);

  return (
    <StyledRecommended>
      {
        !isFetching
          && (
            recommendations.map(({ categoryRecom, title, image, id, type }, index) => (
              <CardRecipe
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

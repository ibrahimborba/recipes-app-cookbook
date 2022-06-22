import React from 'react';
import { useSelector } from 'react-redux';
import style from './Recommended.module.css';

function Recommended() {
  const { isFetching, recommendations } = useSelector((state) => state.recipe);

  return (
    <div
      className={ style.recommendationsContainer }
    >
      {
        !isFetching
          && (
            recommendations.map(({ category, title, image, id }, index) => (
              <div
                key={ id }
                data-testid={ `${index}-recomendation-card` }
                className={ style.card }
              >
                <img
                  src={ image }
                  alt={ title }
                  className={ style.img }
                />
                <h4 data-testid={ `${index}-recomendation-title` }>{ title }</h4>
                <p>{ category }</p>
              </div>
            ))
          )
      }
    </div>
  );
}

export default Recommended;

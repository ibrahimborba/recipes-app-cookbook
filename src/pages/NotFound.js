import React from 'react';
import { useHistory } from 'react-router-dom';
import StyledNotFound from '../styled/StyledNotFound';

function NotFound() {
  const history = useHistory();

  const goForward = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      history.push('/foods');
    }
  };

  return (
    <StyledNotFound>
      <section>
        <h1>Oops!</h1>
        <h2>{'We couldn\'t find the page you are looking for.'}</h2>
        <h3>
          But you can have a donut or
          {' '}
          <div
            role="link"
            tabIndex={ 0 }
            onClick={ goForward }
            onKeyDown={ goForward }
          >
            go back to Recipes.
          </div>
          {' '}
        </h3>
      </section>
    </StyledNotFound>

  );
}

export default NotFound;

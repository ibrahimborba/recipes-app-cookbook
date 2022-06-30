import React from 'react';
import StyledNotFound from '../styled/StyledNotFound';

function NotFound() {
  return (
    <StyledNotFound>
      <section>
        <h1>Oops!</h1>
        <h2>{'We couldn\'t find the page you are looking for.'}</h2>
        <h3>
          But you can have a donut or
          {' '}
          <a href="/foods">go back to Recipes.</a>
          {' '}
        </h3>
      </section>
    </StyledNotFound>

  );
}

export default NotFound;

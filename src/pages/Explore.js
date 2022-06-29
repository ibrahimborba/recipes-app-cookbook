import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StyledForm from '../styled/StyledExplore';

function Explore() {
  const history = useHistory();
  return (
    <>
      <Header />
      <StyledForm>
        <button
          className="foods-btn"
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          className="drinks-btn"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </StyledForm>
      <Footer />
    </>
  );
}

export default Explore;

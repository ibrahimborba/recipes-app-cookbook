import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const MAX_ITEMS_DISPLAY = 12;
  const drinkResults = useSelector((state) => state.searchResults.drinks);

  return (
    <>
      <Header enableSearch />
      { drinkResults.length > 1
       && drinkResults.slice(0, MAX_ITEMS_DISPLAY).map((drink, index) => (
         <div
           key={ drink.idDrink }
           data-testid={ `${index}-recipe-card` }
         >
           <img
             data-testid={ `${index}-card-img` }
             src={ drink.strDrinkThumb }
             alt={ drink.strDrink }
             style={ { width: '200px' } }
           />
           <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
         </div>
       ))}
      <Footer />
    </>
  );
}

export default Drinks;

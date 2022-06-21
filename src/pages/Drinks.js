import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Drinks() {
  const MAX_ITEMS_DISPLAY = 12;
  const drinkResults = useSelector((state) => state.searchResults.drinks);

  return (
    <>
      <SearchBar />
      <div>Drinks</div>
      { drinkResults.length > 1
       && drinkResults.slice(0, MAX_ITEMS_DISPLAY).map((drink) => (
         <div
           key={ drink.idDrink }
           data-testid={ `${drink.idDrink}-recipe-card` }
         >
           <img
             data-testid={ `${drink.idDrink}-card-img` }
             src={ drink.strDrinkThumb }
             alt={ drink.strDrink }
             style={ { width: '200px' } }
           />
           <p data-testid={ `${drink.idDrink}-card-name` }>{ drink.strDrink }</p>
         </div>
       ))}
      <Footer />
    </>
  );
}

export default Drinks;

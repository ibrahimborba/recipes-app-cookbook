import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import FoodRecipeInProgress from './pages/FoodRecipeInProgress';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodsIngredients from './pages/FoodsIngredients';
import DrinksIngredients from './pages/DrinksIngredients';
import FoodsNationalities from './pages/FoodsNationalities';
import Profile from './pages/Profile';
import Done from './pages/Done';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import GlobalStyle from './styled/GloblaStyle';

const pallete = {
  mainColor: '#fafafa',
  secondaryColor: '#212121',
  lightgray: '#eeeeee',
  dark: '#050908',
  accent: '#ffc400',
  attention: '#c62828',
  typography: {
    main: '#050908',
    secondary: '#686B72',
  },
  recipeItems: '#ECECEC',
  disabled: '#BFBABF',
};

function App() {
  return (
    <ThemeProvider theme={ pallete }>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ FoodRecipe } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route exact path="/foods/:id/in-progress" component={ FoodRecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkRecipeInProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
        <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsNationalities }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ Done } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </ThemeProvider>
  );
}

export default App;

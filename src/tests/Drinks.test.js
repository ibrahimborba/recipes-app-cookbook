import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import meals from './mocks/meals';
import corba from './mocks/oneMeal';
import categories from './mocks/categoriesDrink';
import cocktailDrinks from './mocks/cocktailDrinks';

const SEARCH_ICON = 'search icon';

describe('1 - Drinks page Header component tests', () => {
  it('checks if Header is rendered and behaves as expected', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const pageTitle = screen.getByRole('heading', { name: 'Drinks', level: 1 });
    const profileImg = screen.getByRole('img', { name: 'profile icon' });
    const searchBtn = screen.getByRole('img', { name: SEARCH_ICON });
    const searchInputDisabled = screen.queryByLabelText('Search');

    expect(pageTitle).toBeInTheDocument();
    expect(profileImg).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(searchInputDisabled).not.toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInputEnabled = await screen.findByLabelText('Search');
    expect(searchInputEnabled).toBeInTheDocument();
  });
});

describe('2 - Drinks page SearchBar component tests', () => {
  it('checks if SearchBar is rendered as expected', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    expect(searchBtnHeader).toBeInTheDocument();
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionIngredient = screen.getByLabelText('Ingredient');
    const searchOptionName = screen.getByLabelText('Name');
    const searchOptionFirst = screen.getByLabelText('First Letter');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    expect(searchInput).toBeInTheDocument();
    expect(searchOptionIngredient).toBeInTheDocument();
    expect(searchOptionName).toBeInTheDocument();
    expect(searchOptionFirst).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('checks if SearchBar fetch by Ingredient', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionIngredient = screen.getByLabelText('Ingredient');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(searchOptionIngredient);
    userEvent.type(searchInput, 'lemon');
    userEvent.click(searchBtn);
  });

  it('checks if SearchBar fetch by Name', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionName = screen.getByLabelText('Name');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(searchOptionName);
    userEvent.type(searchInput, 'garlic');
    userEvent.click(searchBtn);
  });

  it('checks if SearchBar fetch by First Letter', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionFirstLetter = screen.getByLabelText('First Letter');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(searchOptionFirstLetter);
    userEvent.type(searchInput, 'a');
    userEvent.click(searchBtn);
  });

  it('checks if path changes to recipe details if there is only one result', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });

    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionName = screen.getByLabelText('Name');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(corba),
      }));

    userEvent.click(searchOptionName);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(searchBtn);
  });
});

describe('3 - Drinks page CategoriesOptions component tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(categories),
      }));
  });

  afterEach(() => jest.restoreAllMocks());

  it('checks if CategoriesOptions is rendered as expected', async () => {
    const CATEGORIES_BUTTONS = 6;

    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const categoriesBtns = screen.getAllByRole('button');
    expect(categoriesBtns).toHaveLength(CATEGORIES_BUTTONS);
  });

  it('checks if Cocktail Category filters recipes by Beef', async () => {
    const CARDS_LENGTH = 11;

    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const cocktailCategoryBtn = await screen.findByRole('button', { name: 'Cocktail' });
    const ordinaryCategoryBtn = screen.getByRole('button', { name: 'Ordinary Drink' });
    expect(cocktailCategoryBtn).toBeInTheDocument();
    expect(ordinaryCategoryBtn).toBeInTheDocument();

    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(cocktailDrinks),
      }));

    userEvent.click(cocktailCategoryBtn);

    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');

    const images = await screen.findAllByRole('img');
    const recipesCards = images.filter((img) => !img.alt.includes('icon'));
    expect(recipesCards).toHaveLength(CARDS_LENGTH);

    userEvent.click(cocktailCategoryBtn);

    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    userEvent.click(ordinaryCategoryBtn);
  });

  it('checks if All Category filters recipes by Beef', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const beefCategoryBtn = await screen.findByRole('button', { name: 'All' });
    expect(beefCategoryBtn).toBeInTheDocument();

    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(meals),
      }));

    userEvent.click(beefCategoryBtn);
  });
});

describe('4 - Drinks page Footer component tests', () => {
  it('checks if Footer is rendered as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
    const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
    const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });

    expect(drinksBtnFooter).toBeInTheDocument();
    expect(exploreBtnFooter).toBeInTheDocument();
    expect(mealBtnFooter).toBeInTheDocument();

    userEvent.click(drinksBtnFooter);

    expect(history.location.pathname).toBe('/drinks');
  });

  it('checks if Buttons click changes the path as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/drinks'],
    });

    const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
    userEvent.click(exploreBtnFooter);
    expect(history.location.pathname).toBe('/explore');

    const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });
    userEvent.click(mealBtnFooter);
    expect(history.location.pathname).toBe('/foods');

    const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
    userEvent.click(drinksBtnFooter);
    expect(history.location.pathname).toBe('/drinks');
  });
});

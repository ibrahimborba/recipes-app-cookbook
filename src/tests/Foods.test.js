import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import categories from './mocks/categoriesMeal';
import beefMeals from './mocks/beefMeals';
import meals from './mocks/meals';

const SEARCH_ICON = 'search icon';

describe('1 - Foods page Header component tests', () => {
  it('checks if Header is rendered and behaves as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    expect(history.location.pathname).toBe('/foods');

    const pageTitle = screen.getByRole('heading', { name: 'Foods', level: 1 });
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

describe('2 - Foods page SearchBar component tests', () => {
  it('checks if SearchBar is rendered as expected', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
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
      initialEntries: ['/foods'],
    });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    expect(searchBtnHeader).toBeInTheDocument();
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionIngredient = screen.getByLabelText('Ingredient');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    expect(searchInput).toBeInTheDocument();
    expect(searchOptionIngredient).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

describe('3 - Foods page CategoriesOptions component tests', () => {
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
      initialEntries: ['/foods'],
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const categoriesBtns = screen.getAllByRole('button');
    expect(categoriesBtns).toHaveLength(CATEGORIES_BUTTONS);
  });

  it('checks if Beef Category filters recipes by Beef', async () => {
    const CARDS_LENGTH = 12;

    renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const beefCategoryBtn = await screen.findByRole('button', { name: 'Beef' });
    expect(beefCategoryBtn).toBeInTheDocument();

    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(beefMeals),
      }));

    userEvent.click(beefCategoryBtn);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    const images = await screen.findAllByRole('img');
    const recipesCards = images.filter((img) => !img.alt.includes('icon'));
    expect(recipesCards).toHaveLength(CARDS_LENGTH);

    userEvent.click(beefCategoryBtn);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  it('checks if Beef Category filters recipes by Beef', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
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

describe('4 - Foods page Footer component tests', () => {
  it('checks if Footer is rendered as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
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
      initialEntries: ['/foods'],
    });

    const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
    userEvent.click(drinksBtnFooter);
    expect(history.location.pathname).toBe('/drinks');

    const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
    userEvent.click(exploreBtnFooter);
    expect(history.location.pathname).toBe('/explore');

    const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });
    userEvent.click(mealBtnFooter);
    expect(history.location.pathname).toBe('/foods');
  });
});

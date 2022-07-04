import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import initialState from './mocks/foodsInitialState';

const END_POINT_ALL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_ICON = 'search icon';
const initialEntries = ['/explore/foods/nationalities'];
const { searchResults: { meals } } = initialState;

// Most of the buttons behaviors have already being test on Foods page, so here the tests will focus on Nationalities options and Recipe cards

describe('1 - Explore Nationalities page, testing components render', () => {
  afterEach(() => jest.restoreAllMocks());
  it('checks if Header is rendered with Profile image and page Title',
    () => {
      renderWithRouterRedux(<App />, { initialEntries });
      const pageTitle = screen.getByRole('heading',
        { name: 'Explore Nationalities', level: 1 });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      const searchBtn = screen.getByRole('img', { name: SEARCH_ICON });
      expect(pageTitle).toBeInTheDocument();
      expect(profileImg).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
    });

  it('checks if SearchBar options are shown on Search Icon click',
    () => {
      renderWithRouterRedux(<App />, { initialEntries });
      const searchIconBtn = screen.getByRole('img', { name: SEARCH_ICON });
      const searchInputDisabled = screen.queryByLabelText('Search');
      expect(searchIconBtn).toBeInTheDocument();
      expect(searchInputDisabled).not.toBeInTheDocument();

      userEvent.click(searchIconBtn);

      const searchInput = screen.getByLabelText('Search');
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

  it('checks if Nationalities options are rendered as expected', async () => {
    const NATIONALITIES_OPTIONS = 28;
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    expect(fetch).toHaveBeenNthCalledWith(2, END_POINT_ALL);

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const nationalitiesOptions = screen.getAllByRole('option');
    expect(nationalitiesOptions).toHaveLength(NATIONALITIES_OPTIONS);
  });

  it('checks if RecipeCards are rendered as expected', async () => {
    const CARDS_LENGTH = 12;
    jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const images = screen.getAllByRole('img');
    const recipesCardsImg = images.filter((img) => !img.alt.includes('icon'));
    expect(recipesCardsImg).toHaveLength(CARDS_LENGTH);
    recipesCardsImg.forEach((cardImg, index) => {
      expect(cardImg.alt).toBe(meals[index].strMeal);
      expect(cardImg.src).toBe(meals[index].strMealThumb);
    });

    const cardTitles = screen.getAllByRole('heading');
    cardTitles.shift();
    cardTitles.forEach((cardTitle, index) => {
      expect(cardTitle).toHaveTextContent(meals[index].strMeal);
    });
  });

  it('checks if Footer is rendered with Drink, Explore and Meal icons',
    () => {
      renderWithRouterRedux(<App />, { initialEntries });
      const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
      const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
      const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });
      expect(drinksBtnFooter).toBeInTheDocument();
      expect(exploreBtnFooter).toBeInTheDocument();
      expect(mealBtnFooter).toBeInTheDocument();
    });
});

describe('2 - Explore Nationalities page, Nationalities options behavior', () => {
  afterEach(() => jest.restoreAllMocks());
  it('checks if Nationality option fetch by nationality name on click', async () => {
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const americanOption = await screen.findByRole('option', { name: 'American' });
    const britishOption = screen.getByRole('option', { name: 'British' });

    userEvent.click(americanOption);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');

    userEvent.click(britishOption);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=British');
  });

  it('checks if All option fetch by all on click', async () => {
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const allOption = await screen.findByRole('option', { name: 'All' });
    userEvent.click(allOption);
    expect(fetch).toBeCalledWith(END_POINT_ALL);
  });
});

describe('3 - Explore Nationalities page, CardRecipes behavior', () => {
  it('checks if Recipe card redirect to recipe details page on click', async () => {
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouterRedux(<App />, { initialEntries, initialState });
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const corbaCard = screen.getByRole('img', { name: 'Corba' });
    expect(corbaCard).toBeInTheDocument();
    userEvent.click(corbaCard);
    expect(history.location.pathname).toBe('/foods/52977');
  });
});

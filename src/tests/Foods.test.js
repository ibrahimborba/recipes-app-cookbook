import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import initialState from './mocks/foodsInitialState';

const END_POINT_ALL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_ICON = 'search icon';
const initialEntries = ['/foods'];
const { searchResults: { meals } } = initialState;

describe('1 - Foods page, testing components render', () => {
  afterEach(() => jest.restoreAllMocks());
  it('checks if Header is rendered with Profile image and page Title',
    () => {
      renderWithRouterRedux(<App />, { initialEntries });
      const pageTitle = screen.getByRole('heading', { name: 'Foods', level: 1 });
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

  it('checks if Categories options are rendered as expected', async () => {
    const CATEGORIES_BUTTONS = 6;
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(fetch).toHaveBeenNthCalledWith(2, END_POINT_ALL);

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const buttons = screen.getAllByRole('button');
    const categoriesBtns = buttons.filter((button) => button.value);
    expect(categoriesBtns).toHaveLength(CATEGORIES_BUTTONS);
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

describe('2 - Foods page, testing Header and Footer buttons behavior', () => {
  afterEach(() => jest.restoreAllMocks());
  it('checks if Header Profile image redirects to "/profile" on click',
    async () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      userEvent.click(profileImg);
      expect(history.location.pathname).toBe('/profile');
    });

  it('checks if Footer Drink, Explore and Food icons redirect as expected on click',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries });

      const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
      userEvent.click(drinksBtnFooter);
      expect(history.location.pathname).toBe('/drinks');

      const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });
      userEvent.click(mealBtnFooter);
      expect(history.location.pathname).toBe('/foods');

      const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
      userEvent.click(exploreBtnFooter);
      expect(history.location.pathname).toBe('/explore');
    });
});

describe('3 - Foods page, CategoriesOptions buttons behavior', () => {
  afterEach(() => jest.restoreAllMocks());
  it(`checks if Category Button fetch by category name on click,
  and category buttons overlap each other fetch when clicked`, async () => {
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const beefCategoryBtn = await screen.findByRole('button', { name: 'Beef' });
    const breakfastCategoryBtn = screen.getByRole('button', { name: 'Breakfast' });

    userEvent.click(beefCategoryBtn);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    userEvent.click(breakfastCategoryBtn);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
  });

  it('checks if Category Button fetch by all when clicked twice', async () => {
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const beefCategoryBtn = await screen.findByRole('button', { name: 'Beef' });
    userEvent.click(beefCategoryBtn);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    userEvent.click(beefCategoryBtn);
    expect(fetch).toBeCalledWith(END_POINT_ALL);
  });

  it('checks if All Button fetch by all on click', async () => {
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

    const allCategoryBtn = await screen.findByRole('button', { name: 'All' });
    userEvent.click(allCategoryBtn);
    expect(fetch).toBeCalledWith(END_POINT_ALL);
  });
});

describe('4 - Foods page, SearchBar buttons behavior', () => {
  afterEach(() => jest.restoreAllMocks());
  it('checks if SearchBar Ingredient button fetch by ingredient searched', async () => {
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = screen.getByLabelText('Search');
    const ingredientBtn = screen.getByLabelText('Ingredient');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(ingredientBtn);
    userEvent.type(searchInput, 'garlic');
    userEvent.click(searchBtn);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic');
  });

  it('checks if SearchBar Name button fetch by name searched', async () => {
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = screen.getByLabelText('Search');
    const nameBtn = screen.getByLabelText('Name');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'pizza');
    userEvent.click(searchBtn);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=pizza');
  });

  it(`checks if SearchBar First Letter button fetch by first letter searched
  and throws alert if there is more than one letter being searched`,
  async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const fetch = jest.spyOn(global, 'fetch');
    renderWithRouterRedux(<App />, { initialEntries, initialState });
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = screen.getByLabelText('Search');
    const firstLetterBtn = screen.getByLabelText('First Letter');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(firstLetterBtn);
    userEvent.type(searchInput, 'aaa');
    userEvent.click(searchBtn);
    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');

    userEvent.type(searchInput, 'a');
    userEvent.click(searchBtn);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
});

describe('5 - Foods page, CardRecipes behavior', () => {
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

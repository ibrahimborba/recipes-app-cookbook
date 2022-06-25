import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import categories from './mocks/categoriesDrink';
import initialState from './mocks/drinksInitialState';

const SEARCH_ICON = 'search icon';
const PATH = '/drinks';
const { searchResults: { drinks } } = initialState;
const setMock = () => beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(categories),
    }));
});

describe('1 - Drinks page, Header component tests', () => {
  it('checks if Header is rendered and shows SearchBar when search icon is clicked',
    async () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });

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

describe('2 - Drinks page, SearchBar component tests', () => {
  setMock();

  afterEach(() => jest.restoreAllMocks());
  it('checks if SearchBar is rendered as expected', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

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

  it('checks if SearchBar Ingredient button fetch by ingredient searched',
    async () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
      userEvent.click(searchBtnHeader);

      const searchInput = await screen.findByLabelText('Search');
      const ingredientBtn = screen.getByLabelText('Ingredient');
      const searchBtn = screen.getByRole('button', { name: 'Search' });

      userEvent.click(ingredientBtn);
      userEvent.type(searchInput, 'lemon');
      userEvent.click(searchBtn);

      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
    });

  it('checks if SearchBar Name button fetch by name searched', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });
    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const nameBtn = screen.getByLabelText('Name');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'cocktail');
    userEvent.click(searchBtn);

    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail');
  });

  it(`checks if SearchBar First Letter button fetch by first letter searched
  and throws alert if there is more than one letter being searched`,
  async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });
    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const firstLetterBtn = screen.getByLabelText('First Letter');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(firstLetterBtn);
    userEvent.type(searchInput, 'aaa');
    userEvent.click(searchBtn);
    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');

    userEvent.type(searchInput, 'a');
    userEvent.click(searchBtn);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });
});

describe('3 - Drinks page, CategoriesOptions component tests', () => {
  setMock();

  afterEach(() => jest.restoreAllMocks());
  it('checks if CategoriesOptions is rendered as expected', async () => {
    const CATEGORIES_BUTTONS = 6;
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const categoriesBtns = screen.getAllByRole('button');
    expect(categoriesBtns).toHaveLength(CATEGORIES_BUTTONS);
  });

  it(`checks if Category fetch by category name filter on click,
  if clicked twice it fetch by generic search
  and Categories filters overlap each other fetch when clicked`,
  async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const cocktailCategoryBtn = await screen.findByRole('button', { name: 'Cocktail' });
    const shakeCategoryBtn = screen.getByRole('button', { name: 'Shake' });

    userEvent.click(cocktailCategoryBtn);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');

    userEvent.click(cocktailCategoryBtn);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    userEvent.click(shakeCategoryBtn);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake');
  });

  it('checks if All Category filter fetch by generic search', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const allCategoryBtn = await screen.findByRole('button', { name: 'All' });
    expect(allCategoryBtn).toBeInTheDocument();

    userEvent.click(allCategoryBtn);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});

describe('4 - Drinks page, RecipeCard component test', () => {
  it('checks if RecipeCards are rendered as expected', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH], initialState });
    const CARDS_LENGTH = 12;

    const images = await screen.findAllByRole('img');
    const recipesCardsImg = images.filter((img) => !img.alt.includes('icon'));
    expect(recipesCardsImg).toHaveLength(CARDS_LENGTH);
    recipesCardsImg.forEach((cardImg, index) => {
      expect(cardImg.alt).toBe(drinks[index].strDrink);
      expect(cardImg.src).toBe(drinks[index].strDrinkThumb);
    });

    const cardTitles = screen.getAllByRole('heading');
    cardTitles.shift();
    expect(cardTitles).toHaveLength(CARDS_LENGTH);
    cardTitles.forEach((cardTitle, index) => {
      expect(cardTitle).toHaveTextContent(drinks[index].strDrink);
    });
  });
});

describe('5 - Drinks page, Footer component tests', () => {
  it('checks if Footer is rendered with drink, explore and meal icons',
    async () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });

      const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
      const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
      const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });
      expect(drinksBtnFooter).toBeInTheDocument();
      expect(exploreBtnFooter).toBeInTheDocument();
      expect(mealBtnFooter).toBeInTheDocument();
    });

  it('checks if when Drink, Explore and Food icons are clicked, the path changes',
    async () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });

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

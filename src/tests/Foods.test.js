import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import categories from './mocks/categoriesMeal';
import fetch from './mocks/fetch';

const SEARCH_ICON = 'search icon';
const PATH = '/foods';

describe('1 - Foods page, Header component tests', () => {
  it('checks if Header is rendered and shows SearchBar when search icon is clicked',
    async () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });

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

describe('2 - Foods page, SearchBar component tests', () => {
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

  it('checks if SearchBar fetch by Ingredient', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionIngredient = screen.getByLabelText('Ingredient');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(searchOptionIngredient);
    userEvent.type(searchInput, 'garlic');
    userEvent.click(searchBtn);
  });

  it('checks if SearchBar fetch by Name', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

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
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

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
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const searchBtnHeader = screen.getByRole('img', { name: SEARCH_ICON });

    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionName = screen.getByLabelText('Name');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    userEvent.click(searchOptionName);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(searchBtn);
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

    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const categoriesBtns = screen.getAllByRole('button');
    expect(categoriesBtns).toHaveLength(CATEGORIES_BUTTONS);
  });

  it('checks if Beef Category filters recipes by Beef', async () => {
    const CARDS_LENGTH = 12;

    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const beefCategoryBtn = await screen.findByRole('button', { name: 'Beef' });
    const breakfastCategoryBtn = screen.getByRole('button', { name: 'Breakfast' });
    expect(beefCategoryBtn).toBeInTheDocument();
    expect(breakfastCategoryBtn).toBeInTheDocument();

    jest.spyOn(global, 'fetch').mockImplementation(fetch());

    userEvent.click(beefCategoryBtn);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    const images = await screen.findAllByRole('img');
    const recipesCards = images.filter((img) => !img.alt.includes('icon'));
    expect(recipesCards).toHaveLength(CARDS_LENGTH);

    userEvent.click(beefCategoryBtn);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    userEvent.click(breakfastCategoryBtn);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
  });

  it('checks if All Category filters recipes by Beef', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const beefCategoryBtn = await screen.findByRole('button', { name: 'All' });
    expect(beefCategoryBtn).toBeInTheDocument();

    jest.spyOn(global, 'fetch').mockImplementation(fetch());

    userEvent.click(beefCategoryBtn);
  });
});

describe('4 - Foods page, Footer component tests', () => {
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

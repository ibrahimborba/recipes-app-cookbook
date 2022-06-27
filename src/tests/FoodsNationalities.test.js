import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import nationalities from './mocks/nationalitiesMeal';
import initialState from './mocks/foodsInitialState';

const SEARCH_ICON = 'search icon';
const PATH = '/explore/foods/nationalities';
const { searchResults: { meals } } = initialState;

describe('1 - FoodsNationalities page, Header component tests', () => {
  it('checks if Header is rendered and shows SearchBar when search icon is clicked',
    async () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });

      const pageTitle = screen.getByRole('heading',
        { name: 'Explore Nationalities', level: 1 });
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

describe('2 - FoodsNationalities page, Nationalities component tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(nationalities),
      }));
  });

  afterEach(() => jest.restoreAllMocks());

  it('checks if Nationalities options are rendered as expected',
    async () => {
      const NATIONALITIES_OPTIONS = 28;
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });

      expect(global.fetch).toHaveBeenCalledTimes(2);

      const americanOptionBtn = await screen.findByRole('option', { name: 'American' });
      const categoriesBtns = screen.getAllByRole('option');
      expect(americanOptionBtn).toBeInTheDocument();
      expect(categoriesBtns).toHaveLength(NATIONALITIES_OPTIONS);
    });

  it(`checks if Nationalities fetch by nationality filter on click
  and Nationalities options overlap each other fetch when clicked`,
  async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const americanOptionBtn = await screen.findByRole('option', { name: 'American' });
    const britishOptionBtn = screen.getByRole('option', { name: 'British' });

    userEvent.click(americanOptionBtn);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');

    userEvent.click(britishOptionBtn);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=British');
  });

  it('checks if All Nationalities filter fetch by generic search', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const allCategoryBtn = await screen.findByRole('option', { name: 'All' });
    expect(allCategoryBtn).toBeInTheDocument();

    userEvent.click(allCategoryBtn);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});

describe('3 - FoodsNationalities page, RecipeCard component test', () => {
  it('checks if RecipeCards are rendered as expected', async () => {
    const CARDS_LENGTH = 12;
    renderWithRouterRedux(<App />, { initialEntries: [PATH], initialState });

    const images = await screen.findAllByRole('img');
    const recipesCardsImg = images.filter((img) => !img.alt.includes('icon'));
    expect(recipesCardsImg).toHaveLength(CARDS_LENGTH);
    recipesCardsImg.forEach((cardImg, index) => {
      expect(cardImg.alt).toBe(meals[index].strMeal);
      expect(cardImg.src).toBe(meals[index].strMealThumb);
    });

    const cardTitles = screen.getAllByRole('heading');
    cardTitles.shift();
    expect(cardTitles).toHaveLength(CARDS_LENGTH);
    cardTitles.forEach((cardTitle, index) => {
      expect(cardTitle).toHaveTextContent(meals[index].strMeal);
    });
  });
});

describe('4 - FoodsNationalities page, Footer component tests', () => {
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

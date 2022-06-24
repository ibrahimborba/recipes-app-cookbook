import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import meals from './mocks/meals';
import nationalities from './mocks/nationalitiesMeal';
import filtered from './mocks/americanMeals';

const SEARCH_ICON = 'search icon';
const PATH = '/explore/foods/nationalities';

describe('1 - Foods Nationalities page, Header component tests', () => {
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

describe('2 - Foods Nationalities page, Nationalities component tests', () => {
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

      const americanOptionBtn = await screen.findByRole('option', { name: 'American' });
      const categoriesBtns = screen.getAllByRole('option');
      expect(americanOptionBtn).toBeInTheDocument();
      expect(categoriesBtns).toHaveLength(NATIONALITIES_OPTIONS);
    });

  it('checks if when American option is clicked recipes by American nationality',
    async () => {
      const CARDS_LENGTH = 12;

      renderWithRouterRedux(<App />, { initialEntries: [PATH] });

      const americanOptionBtn = await screen
        .findByRole('option', { name: 'American' });
      expect(americanOptionBtn).toBeInTheDocument();

      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(filtered),
        }));

      userEvent.click(americanOptionBtn);

      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');

      const images = await screen.findAllByRole('img');
      const recipesCards = images.filter((img) => !img.alt.includes('icon'));
      expect(recipesCards).toHaveLength(CARDS_LENGTH);
    });

  it('checks if All Nationalities resets filter', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const beefCategoryBtn = await screen.findByRole('option', { name: 'All' });
    expect(beefCategoryBtn).toBeInTheDocument();

    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(meals),
      }));

    userEvent.click(beefCategoryBtn);
  });
});

describe('3 - Foods Nationalities page, Footer component tests', () => {
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

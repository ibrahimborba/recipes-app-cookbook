export const MEAL_INGREDIENTS = [
  ['digestive biscuits', '175g/6oz'],
];

export const MEAL_INSTRUCTIONS = ['quam pellentesque nec nam aliquam sem et tortor'];

export const VIDEO_URL_EMBED = 'https://www.youtube.com/embed/rp8Slv4INLk';

export const DRINK_RECOMMENDATIONS = [
  {
    alcoholic: 'Optional alcohol',
    categoryRecom: 'Optional alcohol',
    category: 'Ordinary Drink',
    group: 'cocktails',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    ingredients: [
      ['Galliano', '2 1/2 shots'],
      ['Ginger ale', null],
      ['Ice', null],
    ],
    instructions: 'sed risus pretium quam vulputate dignissim',
    nationality: '',
    tags: [],
    title: 'GG',
    type: 'drink',
    video: '',
  },
  {
    alcoholic: 'Alcoholic',
    categoryRecom: 'Alcoholic',
    category: 'Cocktail',
    group: 'cocktails',
    id: '17222',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    ingredients: [
      ['Gin', '1 3/4 shot'],
      ['Grand Marnier', '1 Shot'],
      ['Lemon Juice', '1/4 Shot'],
      ['Grenadine', '1/8 Shot'],
    ],
    instructions: 'sed risus pretium vulputate dignissim',
    nationality: '',
    tags: [],
    title: 'A1',
    type: 'drink',
    video: '',
  },
];

export const INITIAL_STATE_FOOD = {
  recipe: {
    currentRecipe: {
      alcoholic: '',
      category: 'Dessert',
      categoryRecom: 'Dessert',
      group: 'meals',
      id: '52768',
      image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      ingredients: MEAL_INGREDIENTS,
      instructions: MEAL_INSTRUCTIONS,
      nationality: 'British',
      tags: ['Tart', 'Baking', 'Fruity'],
      title: 'Apple Frangipan Tart',
      type: 'food',
      video: 'https://www.youtube.com/watch?v=rp8Slv4INLk',
    },
    finishButtonDisabled: true,
    recommendations: DRINK_RECOMMENDATIONS,
    isFetching: false,
    error: null,
    inProgress: false,
  },
};

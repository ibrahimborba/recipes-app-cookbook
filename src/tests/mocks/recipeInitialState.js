export const INGREDIENTS = [
  ['digestive biscuits', '175g/6oz'],
  ['butter', '75g/3oz'],
  ['Bramley apples', '200g/7oz'],
  ['butter, softened', '75g/3oz'],
  ['caster sugar', '75g/3oz'],
  ['free-range eggs, beaten', '2'],
  ['ground almonds', '75g/3oz'],
  ['almond extract', '1 tsp'],
  ['flaked almonds', '50g/1¾oz'],
];

export const INSTRUCTIONS = 'quam pellentesque nec nam aliquam sem et tortor';

export const VIDEO_URL_EMBED = 'https://www.youtube.com/embed/rp8Slv4INLk';

export const RECOMMENDATIONS = [
  {
    alcoholic: 'Optional alcohol',
    categoryRecom: 'Optional alcohol',
    category: 'Ordinary Drink',
    group: 'cocktails',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    ingredients: [
      [
        'Galliano',
        '2 1/2 shots ',
      ],
      [
        'Ginger ale',
        null,
      ],
      [
        'Ice',
        null,
      ],
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
      [
        'Gin',
        '1 3/4 shot ',
      ],
      [
        'Grand Marnier',
        '1 Shot ',
      ],
      [
        'Lemon Juice',
        '1/4 Shot',
      ],
      [
        'Grenadine',
        '1/8 Shot',
      ],
    ],
    instructions: 'sed risus pretium vulputate dignissim',
    nationality: '',
    tags: [],
    title: 'A1',
    type: 'drink',
    video: '',
  },
  {
    alcoholic: 'Alcoholic',
    categoryRecom: 'Alcoholic',
    category: 'Shot',
    group: 'cocktails',
    id: '13501',
    image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    ingredients: [
      [
        'Amaretto',
        '1/3 ',
      ],
      [
        'Baileys irish cream',
        '1/3 ',
      ],
      [
        'Cognac',
        '1/3 ',
      ],
    ],
    instructions: 'sed pretium quam vulputate dignissim',
    nationality: '',
    tags: [],
    title: 'ABC',
    type: 'drink',
    video: '',
  },
  {
    alcoholic: 'Alcoholic',
    categoryRecom: 'Alcoholic',
    category: 'Ordinary Drink',
    group: 'cocktails',
    id: '17203',
    image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    ingredients: [
      [
        'Creme de Cassis',
        '1 part ',
      ],
      [
        'Champagne',
        '5 parts ',
      ],
    ],
    instructions: 'sed risus pretium quam vulputate.',
    nationality: '',
    tags: [],
    title: 'Kir',
    type: 'drink',
    video: '',
  },
  {
    alcoholic: 'Alcoholic',
    categoryRecom: 'Alcoholic',
    category: 'Shot',
    group: 'cocktails',
    id: '14229',
    image: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
    ingredients: [
      [
        'Kahlua',
        '1/3 part ',
      ],
      [
        'Baileys irish cream',
        '1/3 part ',
      ],
      [
        'Frangelico',
        '1/3 part ',
      ],
    ],
    instructions: 'sed risus quam vulputate dignissim',
    nationality: '',
    tags: [],
    title: '747',
    type: 'drink',
    video: '',
  },
  {
    alcoholic: 'Alcoholic',
    categoryRecom: 'Alcoholic',
    category: 'Shot',
    group: 'cocktails',
    id: '15288',
    image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    ingredients: [
      [
        '151 proof rum',
        '1/2 shot Bacardi ',
      ],
      [
        'Wild Turkey',
        '1/2 shot ',
      ],
    ],
    instructions: 'Add both ingredients to shot glass, shoot, and get drunk quick',
    nationality: '',
    tags: [],
    title: '252',
    type: 'drink',
    video: '',
  },
];

export const INITIAL_STATE = {
  recipe: {
    currentRecipe: {
      alcoholic: '',
      category: 'Dessert',
      categoryRecom: 'Dessert',
      group: 'meals',
      id: '52768',
      image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      ingredients: INGREDIENTS,
      instructions: INSTRUCTIONS,
      nationality: 'British',
      tags: ['Tart', 'Baking', 'Fruity'],
      title: 'Apple Frangipan Tart',
      type: 'food',
      video: 'https://www.youtube.com/watch?v=rp8Slv4INLk',
    },
    finishButtonDisabled: true,
    recommendations: RECOMMENDATIONS,
    isFetching: false,
    error: null,
    inProgress: false,
  },
};

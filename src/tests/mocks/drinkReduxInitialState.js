export const DRINK_INGREDIENTS = [
  ['Galliano', '2 1/2 shots'],
];

export const DRINK_INSTRUCTIONS = [
  'nibh praesent tristique magna sit amet purus gravida',
];

export const FOOD_RECOMMENDATIONS = [
  {
    alcoholic: '',
    categoryRecom: 'Side',
    category: 'Side',
    group: 'meals',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    ingredients: [
      ['Lentils', '1 cup'],
      ['Onion', '1 large'],
      ['Carrots', '1 large'],
      ['Tomato Puree', '1 tbs'],
      ['Cumin', '2 tsp'],
      ['Paprika', '1 tsp'],
      ['Mint', '1/2 tsp'],
      ['Thyme', '1/2 tsp'],
      ['Black Pepper', '1/4 tsp'],
      ['Red Pepper Flakes', '1/4 tsp'],
      ['Vegetable Stock', '4 cups'],
      ['Water', '1 cup'],
      ['Sea Salt', 'Pinch'],
    ],
    instructions: 'lorem dolor sed viverra ipsum.',
    nationality: 'Turkish',
    tags: ['Soup'],
    title: 'Corba',
    type: 'food',
    video: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
  },
  {
    alcoholic: '',
    categoryRecom: 'Side',
    category: 'Side',
    group: 'meals',
    id: '53060',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    ingredients: [
      ['Filo Pastry', '1 Packet'],
      ['Minced Beef', '150g'],
      ['Onion', '150g'],
      ['Oil', '40g'],
      ['Salt', 'Dash'],
      ['Pepper', 'Dash'],
    ],
    instructions: 'leo a diam sollicitudin tempor',
    nationality: 'Croatian',
    tags: ['Streetfood', ' Onthego'],
    title: 'Burek',
    type: 'food',
    video: 'https://www.youtube.com/watch?v=YsJXZwE5pdY',
  },
];

export const INITIAL_STATE_DRINK = {
  recipe: {
    currentRecipe: {
      alcoholic: 'Optional alcohol',
      category: 'Ordinary Drink',
      categoryRecom: 'Optional alcohol',
      group: 'cocktails',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      ingredients: DRINK_INGREDIENTS,
      instructions: DRINK_INSTRUCTIONS,
      nationality: '',
      tags: [],
      title: 'GG',
      type: 'drink',
      video: '',
    },
    finishButtonDisabled: true,
    recommendations: FOOD_RECOMMENDATIONS,
    isFetching: false,
    error: null,
    inProgress: false,
  },
};

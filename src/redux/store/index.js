import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// Aqui estamos passando pra nossa store o rootReducer, que é a combinação de nossos dois reducers. Vimos que poderíamos combinar isso diretamente dentro da função abaixo, mas separar é sempre uma boa ideia (a segmentação é uma grande vantagem e um grande peso do Redux...)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

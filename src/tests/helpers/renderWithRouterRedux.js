import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

/* Como usar:
Só renderizando o App
renderWithRouterAndRedux(<App />);

Renderizando path
renderWithRouterAndRedux(<App />, {
      initialEntries: ['path'],
    });

Renderizando state
renderWithRouterAndRedux(<App />, {
      initialState: state,
    });

Renderizadno path e state
renderWithRouterAndRedux(<App />, {
      initialEntries: ['path'],
      initialState: state,
    });
 */

const renderWithRouterRedux = (
  component,
  {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),

    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
  store,
});

export default renderWithRouterRedux;

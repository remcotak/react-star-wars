import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from 'reducers';
import { Root } from 'containers';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root'),
);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(
      <AppContainer>
        <Root store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { App } from 'components';

// Using Hashhistory for now so manual navigation is possible,
// without the use of an express server.
const Root = ({ store }) => {
  return (
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
  );
};

export default Root;

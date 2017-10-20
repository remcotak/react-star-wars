import React from 'react';
import { Header, Footer } from 'components';
import { Main } from 'containers';

import './App.sass';

const App = () => (
  <div className="container center">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;

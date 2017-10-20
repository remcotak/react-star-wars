import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Films, Film } from 'containers';

// Render the route that matches.
// The redirect is used whenever the user navigates
// to a non-existing route.
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Films}/>
      <Route path='/film/:id' component={Film}/>
      <Redirect to="/" />
    </Switch>
  </main>
);

export default Main;

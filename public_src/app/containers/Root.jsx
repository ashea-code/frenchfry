import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainPage from './MainPage';

const Root = () => (
  <Router>
    <Route path='/admin' component={MainPage} />
  </Router>
);

export default Root;

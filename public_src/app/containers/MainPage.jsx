import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// import PrivateRoute from 'components/PrivateRoute';
import configureStore, { history } from 'configureStore';

import NavContainer from './NavContainer';
// import StatsPage from './StatsPage';
// import PostsPage from './PostsPage';
// import TagsPage from './TagsPage';
// import CollectionsPage from './CollectionsPage';
// import UsersPage from './UsersPage';

import 'tabler-react/dist/Tabler.css';

const store = configureStore();

const MainPage = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="page-container">
        <NavContainer />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default MainPage;

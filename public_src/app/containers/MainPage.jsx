import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import PrivateRoute from 'components/PrivateRoute';
import configureStore from 'configureStore';
import createHistory from 'history/createBrowserHistory';

import StatsPage from './StatsPage';
import PostsPage from './PostsPage';
import TagsPage from './TagsPage';
import CollectionsPage from './CollectionsPage';
import UsersPage from './UsersPage';

import LoginPage from './LoginPage';

import 'tabler-react/dist/Tabler.css';

export const history = createHistory();

const store = configureStore();

const MainPage = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="page-container">
        <Switch>
          <PrivateRoute path='/admin' exact component={StatsPage} />
          <PrivateRoute path='/admin/posts' exact component={PostsPage} />
          <PrivateRoute path='/admin/tags' exact component={TagsPage} />
          <PrivateRoute path='/admin/collections' exact component={CollectionsPage} />
          <PrivateRoute path='/admin/users' exact component={UsersPage} />
          <Route path='/authCheck' component={LoginPage} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default MainPage;

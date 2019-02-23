import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavContainer from './NavContainer';
import StatsPage from './StatsPage';
import PostsPage from './PostsPage';
import TagsPage from './TagsPage';
import CollectionsPage from './CollectionsPage';
import UsersPage from './UsersPage';

import 'tabler-react/dist/Tabler.css';

const MainPage = () => (
  <Router>
    <div className="page-container">
      <NavContainer />
        <Route path='/admin' exact component={StatsPage} />
        <Route path='/admin/posts' exact component={PostsPage} />
        <Route path='/admin/tags' exact component={TagsPage} />
        <Route path='/admin/collections' exact component={CollectionsPage} />
        <Route path='/admin/users' exact component={UsersPage} />
    </div>
  </Router>
);

export default MainPage;

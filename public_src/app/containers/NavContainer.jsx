import React from 'react';

import 'tabler-react/dist/Tabler.css';

import { Nav } from 'tabler-react';

const NavContainer = () => (
  <Nav>
    <Nav.Item icon="bar-chart" to="/admin">Stats</Nav.Item>
    <Nav.Item icon="layers" to="/admin/posts">Posts</Nav.Item>
    <Nav.Item icon="tag" to="/admin/tags">Tags</Nav.Item>
    <Nav.Item icon="book" to="/admin/collections">Collections</Nav.Item>
    <Nav.Item icon="user" to="/admin/users">Users</Nav.Item>
    <Nav.Item icon="user">
      Logout
    </Nav.Item>
  </Nav>
);

export default NavContainer;

import React from 'react';

import 'tabler-react/dist/Tabler.css';

import { Nav, Site } from 'tabler-react';

const NavContainer = () => (
  <Site.Header>
    <Nav>
      <Nav.Item icon="bar-chart" href="/admin">Dashboard</Nav.Item>
      <Nav.Item icon="layers" href="/admin/posts">Posts</Nav.Item>
      <Nav.Item icon="tag" href="/admin/tags">Tags</Nav.Item>
      <Nav.Item icon="book" href="/admin/collections">Collections</Nav.Item>
      <Nav.Item icon="user" href="/admin/users">Users</Nav.Item>
      <Nav.Item icon="logout" href="/api/auth/logout">
        Logout
      </Nav.Item>
    </Nav>
  </Site.Header>
);

export default NavContainer;

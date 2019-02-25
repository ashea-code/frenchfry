import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const checkAuth = (rest, Component, routerProp) => {
  if (rest.user.email) {
    return <Component {...routerProp} />;
  }

  const redirectUrl = `/authCheck?afterAuth=${rest.path}${window.location.search}`;

  // Redirect to auth failed page
  return (<Redirect
    to={{
      pathname: redirectUrl,
    }}
  />);
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => checkAuth(rest, Component, props)}
  />
);

const mapStateToProps = state => ({
  user: state.user,
});

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);

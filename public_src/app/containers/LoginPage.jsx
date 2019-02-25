import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'tabler-react/dist/Tabler.css';
import './LoginPage.css';

import { LoginPage as LoginElm, Alert } from 'tabler-react';

import { checkIfAuthed, getUserInfo, userLoggedIn } from 'actions/authActions';

class LoginPage extends Component {
  checkAuth() {
    checkIfAuthed((result) => {
      if (result) {
        getUserInfo((user) => {
          // Dispatch that they are logged in
          const searchParams = new URLSearchParams(window.location.search);
          const returnURL = searchParams.get('afterAuth');

          this.props.userLoggedIn(user);
          this.props.history.push(returnURL);
        });
      }
    });
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const returnURL = searchParams.get('afterAuth');
    this.setState({
      returnURL,
    });
  }

  render() {
    this.checkAuth();

    return (
      <div className="page-content">
        <div className="error-box">
          <Alert type="danger">
            There was a problem logging you in!
          </Alert>
        </div>
        <LoginElm />
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLoggedIn: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = dispatch => ({
  userLoggedIn: user => dispatch(userLoggedIn(user)),
});

export default connect(null, mapDispatchToProps)(LoginPage);

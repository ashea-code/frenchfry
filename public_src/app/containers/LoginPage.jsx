import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import 'tabler-react/dist/Tabler.css';
import './LoginPage.css';
import '../components/ErrorBox.css';

import { LoginPage as LoginElm } from 'tabler-react';
import { checkIfAuthed, getUserInfo, userLoggedIn } from 'actions/authActions';

import { GenMsgBox } from '../utils/MessageBoxes';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectURL: null,
      username: '',
      password: '',
    };
  }

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
    this.checkAuth();
    const searchParams = new URLSearchParams(window.location.search);
    const returnURL = searchParams.get('afterAuth');
    this.setState({
      returnURL,
    });
  }

  updateFormValues(e) {
    const type = e.target.name;

    if (type === 'email') {
      this.setState({
        username: e.target.value,
      });
      return;
    }

    if (type === 'password') {
      this.setState({
        password: e.target.password,
      });
    }
  }

  doLogin(e) {
    e.preventDefault();
    fetch('/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then(resp => resp.json())
      .then(json => console.log(json));
  }

  render() {
    return (
      <div className="page-content">
        {GenMsgBox()}
        <LoginElm
          values={{
            email: this.state.username,
            password: this.state.password,
          }}
          onChange={e => this.updateFormValues(e)}
          onSubmit={e => this.doLogin(e)}
        />
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

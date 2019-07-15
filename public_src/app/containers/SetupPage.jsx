import React, { Component } from 'react';

import { Form, Page, Button } from 'tabler-react';

import 'tabler-react/dist/Tabler.css';
import './SetupPage.css';

class SetupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup: false,
      error: '',
      site: {
        siteTitle: '',
        siteDescription: '',
      },
      user: {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        displayname: '',
      },
    };
  }

  componentDidMount() {
    // check if the site is already set up
    fetch('/api/site')
      .then(resp => resp.json())
      .then((json) => {
        if (json.status !== 400) {
          this.setState({
            setup: true,
          });
        }
      });
  }

  onSiteValueChange(e) {
    this.setState({
      site: {
        ...this.state.site,
        [e.target.name]: e.target.value,
      },
    });
  }

  onUserValueChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  }

  async submit(e) {
    e.preventDefault();

    if (this.state.user.password !== this.state.user.passwordConfirm) {
      this.setState({
        error: 'Passwords did not match!',
      });
      return;
    }

    // Create the first user
    let resp = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.user),
    }).then(resp => resp.json());

    if (!resp || resp.error) {
      this.setState({
        error: `User Creation: ${resp.error}`,
      });
      return;
    }

    // Login to the created user account
    resp = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.user),
    }).then(resp => resp.json());

    // Set site config
    resp = await fetch('/api/site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.site),
      credentials: 'include',
    }).then(resp => resp.json());

    if (!resp || !resp.ownerId) {
      this.setState({
        error: 'Something went wrong setting up the site!',
      });
    }

    // Site should be ready to go!
    window.location.replace('/admin');
  }

  render() {
    if (this.state.setup) {
      return null;
    }

    return (
      <div className="page-content">
        <Page className="setup-box">
          <Form className="setup-form" onSubmit={e => this.submit(e)}>
            <h1>Site Setup</h1>
            {this.state.error !== ''
              ? <div className="error-box">
                  <p className="error-box-content">{this.state.error}</p>
                </div>
              : null}
            <Form.Group label="Site Properties">
              <Form.Input
                name="siteTitle"
                placeholder="Site Title"
                value={this.state.site.siteTitle}
                onChange={e => this.onSiteValueChange(e)}
              />
              <Form.Input
                name="siteDescription"
                placeholder="Site Description"
                value={this.state.site.siteDescription}
                onChange={e => this.onSiteValueChange(e)}
              />
            </Form.Group>

            <Form.Group label="Initial User">
              <Form.Input
                name="email"
                type="email"
                placeholder="E-Mail"
                value={this.state.user.email}
                onChange={e => this.onUserValueChange(e)}
              />
              <Form.Input
                name="username"
                placeholder="Username"
                value={this.state.user.username}
                onChange={e => this.onUserValueChange(e)}
              />
              <Form.Input
                name="displayname"
                placeholder="Display Name"
                value={this.state.user.displayname}
                onChange={e => this.onUserValueChange(e)}
              />
              <Form.Input
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.user.password}
                onChange={e => this.onUserValueChange(e)}
              />
              <Form.Input
                name="passwordConfirm"
                placeholder="Password Confirmation"
                type="password"
                value={this.state.user.passwordConfirm}
                onChange={e => this.onUserValueChange(e)}
              />
            </Form.Group>

            <Button color="primary" type="submit">Go!</Button>
          </Form>
        </Page>
      </div>
    );
  }
}

export default SetupPage;

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter as Router } from 'react-router-redux';
import PropTypes from 'prop-types';

import { authenticate, unauthenticate } from 'actions/session';
import {
  CreateRoomPage,
  RoomPage,
  ErrorMessage,
  NotFound,
  Signup,
  Login,
  MatchAuthenticated,
  RedirectAuthenticated,
  LandingPage,
  HomePage,
  Player,
} from 'components';
import routes from 'config/routes';

import CssBaseline from '@material-ui/core/CssBaseline';

class Root extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = {
      isAuthenticated,
      willAuthenticate,
    };

    return (
      <Fragment>
        <CssBaseline />
        <ErrorMessage />
        <Router history={this.props.history}>
          <Switch>
            <RedirectAuthenticated
              exact
              path={routes.landing}
              component={LandingPage}
              {...authProps}
            />
            <RedirectAuthenticated
              exact
              path={routes.signup}
              component={Signup}
              {...authProps}
            />
            <RedirectAuthenticated
              exact
              path={routes.login}
              component={Login}
              {...authProps}
            />
            <MatchAuthenticated
              exact
              path={routes.home}
              component={HomePage}
              {...authProps}
            />
            <MatchAuthenticated
              exact
              path={routes.createRoom}
              component={CreateRoomPage}
              {...authProps}
            />
            <MatchAuthenticated
              exact
              path={routes.room}
              component={RoomPage}
              {...authProps}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Player />
      </Fragment>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  authenticate: PropTypes.func.isRequired,
  unauthenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  authenticate: () => dispatch(authenticate()),
  unauthenticate: () => dispatch(unauthenticate()),
});

const mapStateProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  willAuthenticate: state.session.willAuthenticate,
});

export default connect(mapStateProps, mapDispatchToProps)(Root);

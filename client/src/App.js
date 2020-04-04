import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/shards-dashboards.1.1.0.min.css';
import Axios from './utils/axios';

export class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('x-auth-token');
    Axios.get('/user/auth', { headers: { 'x-auth-token': token } })
      .then(response => {
        // Do nothing
      })
      .catch(err => {
        // this.props.onAuthFail(err);
        // this.props.history.push('/signin');
        console.log(err);
      });
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.props.onAuthSuccess({
        token,
        user
      });
    } else {
      // Redirect
      this.props.history.push('/signin');
    }
  }

  render() {
    return (
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={() => {
                return (
                  <route.layout>
                    <route.component />
                  </route.layout>
                );
              }}
            />
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: payload =>
      dispatch({ type: actionTypes.AUTH_SUCCESS, payload })
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));

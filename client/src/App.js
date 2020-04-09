import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheck } from './store/actions/index';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/shards-dashboards.1.1.0.min.css';
import * as CONSTANTS from './utils/constants';

export class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('x-auth-token');
    if (!token) return;
    this.props.onAuthCheckState(token);
  }

  filterRoutes = (routes) => {
    return routes.filter((route) => {
      if (route.role === CONSTANTS.OPEN && !this.props.isAuthenticated)
        return true;
      else if (route.role === CONSTANTS.BOTH && this.props.isAuthenticated)
        return true;
      else if (
        route.role === CONSTANTS.PATIENT &&
        this.props.userType === CONSTANTS.PATIENT
      )
        return true;
      else if (
        route.role === CONSTANTS.DOCTOR &&
        this.props.userType === CONSTANTS.DOCTOR
      )
        return true;
      else if (route.role === CONSTANTS.ALL) return true;
      else return false;
    });
  };

  render() {
    // Filtering routes
    const filteredRoutes = this.filterRoutes(routes);

    return (
      <div>
        <Switch>
          {filteredRoutes.map((route, index) => {
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
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: (token) => dispatch(authCheck(token))
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userType: state.auth.userType
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

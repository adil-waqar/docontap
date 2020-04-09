import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class CatchAll extends Component {
  render() {
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to="/start-assessment" />;
    } else redirect = <Redirect to="/signin" />;

    return redirect;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, null)(CatchAll);

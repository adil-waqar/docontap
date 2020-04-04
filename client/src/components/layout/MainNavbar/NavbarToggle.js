import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

class NavbarToggle extends Component {
  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          onClick={this.props.onToggleSidebar}
          className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
        >
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onToggleSidebar: () => dispatch({ type: actionTypes.TOGGLE_SIDEBAR })
  };
};

export default connect(null, mapDispatchToProps)(NavbarToggle);

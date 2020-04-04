import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav } from 'shards-react';
import PatientItems from '../../../data/sidebarNavItemsPatient';
import DoctorItems from '../../../data/sidebarNavItemsDoctor';
import * as CONSTANTS from '../../../store/constants';

import SidebarNavItem from './SidebarNavItem';

class SidebarNavItems extends Component {
  render() {
    let items = [];
    if (this.props.userType === CONSTANTS.DOCTOR) items = [...DoctorItems];
    else if (this.props.userType === CONSTANTS.PATIENT)
      items = [...PatientItems];

    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userType
  };
};

export default connect(mapStateToProps, null)(SidebarNavItems);

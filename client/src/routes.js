import React from 'react';
import { Redirect } from 'react-router-dom';
import InfermedicaApi from './utils/infermedica-api';

// Configs
import configs from './configs/api';

// Context
import { ApiContext } from './ApiContext';

// Default Layout
import { DefaultLayout } from './layouts';

// Route views
import Assessment from './views/Assessment';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Appointments from './views/Appointments';
import DoctorAppointments from './views/DoctorAppointments';
import PreviousAssessments from './views/PreviousAssessments';

const api = new InfermedicaApi(configs['app-id'], configs['app-key']);

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: '/start-assessment',
    layout: DefaultLayout,
    component: () => (
      <ApiContext.Provider value={{ api }}>
        <Assessment />
      </ApiContext.Provider>
    )
  },
  {
    path: '/signin',
    exact: true,
    layout: DefaultLayout,
    component: () => <SignIn />
  },
  {
    path: '/signup',
    exact: true,
    layout: DefaultLayout,
    component: () => <SignUp />
  },
  {
    path: '/appointments',
    exact: true,
    layout: DefaultLayout,
    component: () => <Appointments />
  },
  {
    path: '/doctor-appointments',
    exact: true,
    layout: DefaultLayout,
    component: () => <DoctorAppointments />
  },
  {
    path: '/previous-assessments',
    exact: true,
    layout: DefaultLayout,
    component: () => <PreviousAssessments />
  }
];

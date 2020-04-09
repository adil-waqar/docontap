import React from 'react';
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
import PatientAppointments from './views/PatientAppointments';
import DoctorAppointments from './views/DoctorAppointments';
import PreviousAssessments from './views/PreviousAssessments';
import CatchAll from './components/catch-all/CatchAll';

// Util
import * as CONSTANTS from './utils/constants';

const api = new InfermedicaApi(configs['app-id'], configs['app-key']);

export default [
  {
    path: '/start-assessment',
    layout: DefaultLayout,
    role: CONSTANTS.BOTH,
    exact: true,
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
    role: CONSTANTS.OPEN,
    component: () => <SignIn />
  },
  {
    path: '/signup',
    exact: true,
    layout: DefaultLayout,
    role: CONSTANTS.OPEN,
    component: () => <SignUp />
  },
  {
    path: '/patient-appointments',
    exact: true,
    layout: DefaultLayout,
    role: CONSTANTS.PATIENT,
    component: () => <PatientAppointments />
  },
  {
    path: '/doctor-appointments',
    exact: true,
    layout: DefaultLayout,
    role: CONSTANTS.DOCTOR,
    component: () => <DoctorAppointments />
  },
  {
    path: '/previous-assessments',
    exact: true,
    layout: DefaultLayout,
    role: CONSTANTS.PATIENT,
    component: () => <PreviousAssessments />
  },
  {
    path: '/',
    layout: DefaultLayout,
    role: CONSTANTS.ALL,
    component: () => <CatchAll />
  }
];

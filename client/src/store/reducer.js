import * as actionTypes from './actions';
import * as CONSTANTS from './constants';

const _store = {
  menuVisible: false,
  userType: null,
  patient: {
    age: '30',
    sex: 'male',
    symptoms: {},
  },
  auth: {
    token: null,
    user: null,
  },
};

const reducer = (state = _store, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      return toggleSidebar(state);
    case actionTypes.SET_AGE:
      return setAge(action.age, state);
    case actionTypes.SET_SEX:
      return setSex(action.sex, state);
    case actionTypes.SET_SYMPTOMS:
      return setSymptoms(action.symptoms, state);
    case actionTypes.SET_RISKS:
      return setRisks(action.risks, state);
    case actionTypes.SET_SUGGESTIONS:
      return setSuggestions(action.suggestions, state);
    case actionTypes.SET_GEORISKS:
      return setGeoRisks(action.georisks, state);
    case actionTypes.SET_EVIDENCE:
      return setEvidence(action.evidence, state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(action.payload, state);
    case actionTypes.LOG_OUT:
      return onLogout(_store);
    default:
      return {
        ..._store,
      };
  }
};

const toggleSidebar = (state) => {
  return {
    ...state,
    menuVisible: !state.menuVisible,
  };
};

const setAge = (age, state) => {
  return {
    ...state,
    patient: {
      ...state.patient,
      age: age,
    },
  };
};

const setSex = (sex, state) => {
  return {
    ...state,
    patient: {
      ...state.patient,
      sex,
    },
  };
};

const setSymptoms = (symptoms, state) => {
  return {
    ...state,
    patient: {
      ...state.patient,
      symptoms: { ...symptoms },
    },
  };
};
const setRisks = (risks, state) => {
  return {
    ...state,
    patient: {
      ...state.patient,
      symptoms: { ...state.patient.symptoms, ...risks },
    },
  };
};

const setSuggestions = (suggestions, state) => {
  return {
    ...state,
    patient: {
      ...state.patient,
      symptoms: {
        ...state.patient.symptoms,
        ...suggestions,
      },
    },
  };
};
const setGeoRisks = (georisks, state) => {
  return {
    ...state,
    patient: {
      ...state.patient,
      symptoms: {
        ...state.patient.symptoms,
        ...georisks,
      },
    },
  };
};

const setEvidence = (evidence, state) => {
  return {
    ...state,
    patient: {
      ...state.patient,
      symptoms: {
        ...state.patient.symptoms,
        ...evidence,
      },
    },
  };
};

const authSuccess = (payload, state) => {
  return {
    ...state,
    userType:
      payload.user.user.userType === '1' ? CONSTANTS.PATIENT : CONSTANTS.DOCTOR,
    auth: {
      ...state.auth,
      token: payload.token,
      user: payload.user,
      logout: false,
    },
  };
};

const onLogout = (initialState) => {
  return {
    ...initialState,
  };
};

export default reducer;

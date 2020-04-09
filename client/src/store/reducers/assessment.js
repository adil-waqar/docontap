import * as actionTypes from '../actions/actionTypes';

const _store = {
  menuVisible: false,
  age: '30',
  sex: 'male',
  symptoms: {}
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
    default:
      return {
        ..._store
      };
  }
};

const toggleSidebar = (state) => {
  return {
    ...state,
    menuVisible: !state.menuVisible
  };
};

const setAge = (age, state) => {
  return {
    ...state,
    age
  };
};

const setSex = (sex, state) => {
  return {
    ...state,
    sex
  };
};

const setSymptoms = (symptoms, state) => {
  return {
    ...state,
    symptoms: { ...symptoms }
  };
};
const setRisks = (risks, state) => {
  return {
    ...state,
    symptoms: { ...state.symptoms, ...risks }
  };
};

const setSuggestions = (suggestions, state) => {
  return {
    ...state,
    symptoms: {
      ...state.symptoms,
      ...suggestions
    }
  };
};
const setGeoRisks = (georisks, state) => {
  return {
    ...state,
    symptoms: {
      ...state.symptoms,
      ...georisks
    }
  };
};

const setEvidence = (evidence, state) => {
  return {
    ...state,
    symptoms: {
      ...state.symptoms,
      ...evidence
    }
  };
};

export default reducer;

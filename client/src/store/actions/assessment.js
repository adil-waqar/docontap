import * as actionTypes from './actionTypes';

export const setSex = (sex) => {
  return {
    type: actionTypes.SET_SEX,
    sex
  };
};

export const setAge = (age) => {
  return {
    type: actionTypes.SET_AGE,
    age
  };
};

export const setSymptoms = (symptoms) => {
  console.log(symptoms);
  return { type: actionTypes.SET_SYMPTOMS, symptoms };
};

export const setRisks = (risks) => {
  return {
    type: actionTypes.SET_RISKS,
    risks
  };
};

export const setSuggestions = (suggestions) => {
  return {
    type: actionTypes.SET_SUGGESTIONS,
    suggestions
  };
};

export const setGeoRisks = (georisks) => {
  return { type: actionTypes.SET_GEORISKS, georisks };
};

export const setEvidence = (evidence) => {
  return { type: actionTypes.SET_EVIDENCE, evidence };
};

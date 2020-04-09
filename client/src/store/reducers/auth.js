import * as actionTypes from '../actions/actionTypes';
import * as CONSTANTS from '../../utils/constants';

const initialState = {
  token: null,
  user: null,
  userType: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(action.payload, state);
    case actionTypes.AUTH_FAILURE:
      return authFailure(action.error, state);
    case actionTypes.LOG_OUT:
      return onLogout(initialState);
    default:
      return state;
  }
};

const authStart = (state) => {
  return {
    ...state,
    error: null,
    loading: true
  };
};

const authSuccess = (payload, state) => {
  return {
    ...state,
    userType:
      payload.user.user.userType === '1' ? CONSTANTS.PATIENT : CONSTANTS.DOCTOR,
    token: payload.token,
    user: payload.user,
    loading: false
  };
};

const authFailure = (error, state) => {
  return {
    ...state,
    error,
    loading: false
  };
};

const onLogout = (initialState) => {
  return {
    ...initialState
  };
};

export default reducer;

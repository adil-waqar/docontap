import * as actionTypes from './actionTypes';
import Axios from '../../utils/axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (user, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      user,
      token
    }
  };
};

const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post('/user/login', {
      email,
      password
    })
      .then((response) => {
        const user = response.data.data;
        const token = response.headers['x-auth-token'];
        dispatch(authSuccess(user, token));
        // Save token to local storage
        localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      })
      .catch((err) => {
        // Give an alert here
        dispatch(authFailure(err));
      });
  };
};

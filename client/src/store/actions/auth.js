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

export const authCheck = (token) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.get('/user/auth', { headers: { 'x-auth-token': token } })
      .then((response) => {
        const user = response.data.data;
        const token = response.headers['x-auth-token'];
        dispatch(authSuccess(user, token));
      })
      .catch((err) => {
        // this.props.onAuthFail(err);
        // this.props.history.push('/signin');
        dispatch(authFailure(err));
      });
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
      })
      .catch((err) => {
        // Give an alert here
        dispatch(authFailure(err));
      });
  };
};

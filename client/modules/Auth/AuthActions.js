import callApi from '../../util/apiCaller';
import cookie from 'react-cookie';
import { push } from 'react-router-redux'
import { getAllParams } from '../../util/parse-url';
import { browserHistory } from 'react-router';


// Export Constants
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST ';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST ';

export function loginUser(token, user) {
  return {
    type: AUTH_USER,
    token,
    user
  };
}

export function logout() {
  return {
    type: UNAUTH_USER
  };
}

export function authError(message) {
  return {
    type: AUTH_ERROR,
    message
  };
}

export function loginUserRequest({email, password}) {
  return dispatch => {
    return callApi('users/authenticate', 'post', { email, password }).then(res => {
      if (res.success) {
        cookie.save('token', res.token, { path: '/' });
        dispatch(loginUser(res.token, res.user));
        browserHistory.push('/')
      } else {
        dispatch(authError(res.message));
      }
    });
  }
}

const listenForCredentials = (popup, dispatch, resolve, reject) => {
  if (!resolve) {
    return new Promise((resolve, reject) => {
      listenForCredentials(popup, dispatch, resolve, reject);
    });
  } else {
    let creds;
    try {
      creds = getAllParams(popup.location);
    } catch (err) { }

    if (creds && creds.token) {
      popup.close();
      cookie.save('token', creds.token, { path: '/' });
      callApi('auth/unwraptoken').then( user => dispatch(loginUser(creds.token, user)))
      .then(()=> resolve());
    } else if (popup.closed) {
      reject({ errors: "Authentication was cancelled." })
    } else {
      setTimeout(() => {
        listenForCredentials(popup, dispatch, resolve, reject);
      }, 0);
    }
  }
}

export function facebookLoginRequest() {
  return dispatch => {
    var settings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no,width=580,height=400";
    const popup = window.open(`${window.location.origin}/api/auth/facebook`, 'facebook', settings);
    return listenForCredentials(popup, dispatch);
  }
}

export function logOutUser() {
  return dispatch => {
    cookie.remove('token');
    dispatch(logout());
  }
}

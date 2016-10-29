import callApi from '../../util/apiCaller';
import cookie from 'react-cookie';
import { push } from 'react-router-redux'

// Export Constants
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST ';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST ';

export function loginUser(token, user){
  return {
    type: AUTH_USER,
    token,
    user
  };
}

export function loginUserRequest({email, password}){
  return dispatch => {
    return callApi('users/authenticate', 'post', { email, password }).then(res => {
      cookie.save('token', res.token, { path: '/' });
      dispatch(loginUser(res.token, res.user));
    });
  }
}

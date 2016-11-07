import { AUTH_USER, AUTH_ERROR } from './AuthActions';

const initialState = {
  error: '',
  message: '',
  content: '',
  authenticated: false,
  token: '',
  user: {}
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true, token: action.token, user: action.user };

    case AUTH_ERROR:
      return { ...state, error: '', message: action.message, authenticated: false};

    default:
      return state;
  }
}

export const getMessage = state => state.auth.message;

export default AuthReducer;

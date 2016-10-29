import { AUTH_USER } from './AuthActions';

const initialState = {
  error: '',
  message: '',
  content: '',
  authenticated: false,
  token: '',
  user: {}
};

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true, token: action.token, user: action.user };

    default:
      return state;
  }
}

export default AuthReducer;

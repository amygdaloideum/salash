import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

// Export Actions
export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    return callApi(`users/${id}`).then(res => dispatch(addUser(res.user)));
  };
}

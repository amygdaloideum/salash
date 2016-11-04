// Import Actions
import { ADD_USER } from './UserActions';

// Initial State
const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.user;

    default:
      return state;
  }
};

export const getUser = state => state.user;

export default UserReducer;

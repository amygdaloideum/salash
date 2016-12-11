// Import Actions
import { ADD_USER, REMOVE_USER } from './UserActions';

// Initial State
const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.user;

    case REMOVE_USER:
      return initialState;
      
    default:
      return state;
  }
};

export const getUser = state => state.user;

export default UserReducer;

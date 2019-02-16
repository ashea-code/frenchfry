import { USER_LOGGED_IN } from 'constants/actionTypes';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    default:
      return state;
  }
};

export default user;

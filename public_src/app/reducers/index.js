import { combineReducers } from 'redux';

import * as types from 'constants/actionTypes';

import user from './user';

const rootReducer = combineReducers({
  user,
});

export default rootReducer;

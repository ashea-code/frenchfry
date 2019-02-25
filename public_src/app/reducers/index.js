import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'configureStore';

import user from './user';

const rootReducer = combineReducers({
  router: connectRouter(history),
  user,
});

export default rootReducer;

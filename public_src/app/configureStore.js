import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import createHistory from 'history/createBrowserHistory';

const loggerMiddleware = createLogger();

export const history = createHistory();

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunk,
      loggerMiddleware,
    ),
  );
}

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import { history } from 'containers/MainPage';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunk,
      loggerMiddleware,
      routerMiddleware(history),
    ),
  );
}

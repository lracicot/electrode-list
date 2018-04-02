import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../client/reducers';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';

// const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(
      thunk// ,
      // loggerMiddleware
    ));
}

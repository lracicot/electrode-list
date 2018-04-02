import { combineReducers } from 'redux';
import { Map } from 'immutable';
import { reducer as formReducer } from 'redux-form'

import appReducers from './app.reducers';
import invoiceReducers from './invoice.reducers';


const appReducer = (state = new Map(), action) => {
  state = appReducers(state, action);
  state = invoiceReducers(state, action);

  return state;
};

export default combineReducers({
  app: appReducer,
  form: formReducer
});

import { Map } from 'immutable';


export default function appReducers(state = new Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return state.merge(action.state);
  default:
    return state;
  }
}

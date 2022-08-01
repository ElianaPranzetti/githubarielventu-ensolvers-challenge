import { createStore, applyMiddleware, compose } from 'redux';
// import throttle from 'lodash/throttle';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
// import {loadState, saveState} from '../localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistedState = loadState()

const store = createStore(
  rootReducer,
  // persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// store.subscribe(throttle(() => {
//   console.debug('saveState')
//   const { notes } = store.getState()
//   saveState({
//     notes
//   })
// }, 1000))

export default store;
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import { middleware } from '../navigator/AppNavigator';

const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispathcing a function');
  } else {
    console.log('dispathcing ', action);
  }
  const result = next(action);
  console.log('nextState', store.getState());
};

const middlewares = [
  // logger,
  middleware,
  thunk,
];

/**
 * 创建 store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
import { combineReducers } from 'redux';
import theme from './theme';
import popular from './popular';
import { rootCom, RootNavigator } from '../navigator/AppNavigator';

// 1.制定默认 state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

// 2.创建自己的navigation reducer
const navReducer = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  // 如果 nextState 为 null或者未定义, 返回原 state
  return nextState || state;
}

// 3.合并 reducer
const index = combineReducers({
  nav: navReducer,
  theme: theme,
  popular: popular,
});

export default index;
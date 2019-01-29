import { 
  createStackNavigator, 
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import FetchDemoPage from "../page/FetchDemoPage";
import AsyncStoragePage from "../page/AsyncStoragePage";
import DataStoreDemoPage from "../page/DataStoreDemoPage";
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';

export const rootCom = 'Init'; // 设置根路由

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null,
    }
  },
  FetchDemoPage: {
    screen: FetchDemoPage,
    navigationOptions: {
    }
  },
  AsyncStoragePage: {
    screen: AsyncStoragePage,
    navigationOptions: {
    }
  },
  DataStoreDemoPage: {
    screen: DataStoreDemoPage,
    navigationOptions: {
    }
  },
});

export const RootNavigator = createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator,
  }, {
  navigationOptions: {
    header: null
  }
});

/**
 * 初始化 react-navigation 与 redux 的中间件,
 * 该方法的一个很大的作用就是为 reduxifyNavigator 的 key 设置 actionSubscribers(行为订阅者)
 * @type Middleware
 */
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

/**
 * 将导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将 navigation state 和 dispathc 函数作为 props 的新组件
 * 注意: 要在 createReactNavigationReduxMiddleware 之后执行
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
})

/**
 * 连接 React 组件与 Redux store
 */
export default connect(mapStateToProps) (AppWithNavigationState);


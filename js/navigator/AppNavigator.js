import { 
  createStackNavigator, 
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import AsyncStoragePage from "../page/AsyncStoragePage";
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import WebViewPage from "../page/WebViewPage";
import AboutPage from "../page/about/AboutPage";
import AboutMePage from "../page/about/AboutMePage";
import CustomKeyPage from "../page/CustomKeyPage";

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
  WebViewPage: {
    screen: WebViewPage,
    navigationOptions: {
      header: null,
    }
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: {
      header: null,
    }
  },
  AboutMePage: {
    screen: AboutMePage,
    navigationOptions: {
      header: null,
    }
  },
  CustomKeyPage: {
    screen: CustomKeyPage,
    navigationOptions: {
      header: null,
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


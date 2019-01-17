
import { createBottomTabNavigator } from "react-navigation";
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import PopularPage from "../page/PopularPage";
import TrendingPage from "../page/TrendingPage";
import FavoritePage from "../page/FavoritePage";
import Mypage from "../page/MyPage";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import NavigationUtil from "./NavigationUtil";
import { BottomTabBar } from "react-navigation-tabs";
type Props = {};

// 配置页面
const TABS = { 
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: "最热",
      tabBarIcon: ({ tintColor, foucsed }) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: "趋势",
      tabBarIcon: ({ tintColor, foucsed }) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: "收藏",
      tabBarIcon: ({ tintColor, foucsed }) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Mypage: {
    screen: Mypage,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon: ({ tintColor, foucsed }) => (
        <Entypo
          name={'user'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
}

export class DynamicTabNavigator extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  _tabNavigator() {    
    if (this.Tabs) {
      return this.Tabs;
    }
    // 根据需要, 定制显示的 tab
    const { PopularPage, TrendingPage, FavoritePage, Mypage } = TABS; 
    // 动态配置 tab 属性
    PopularPage.navigationOptions.tabBarLabel = '最新'; 
    const tabs = {PopularPage, TrendingPage, FavoritePage, Mypage};
    return this.Tabs = createBottomTabNavigator(tabs, {
      tabBarComponent: props=>{
        return <TabBarComponent theme={this.props.theme} {...props}/>
      }
    })
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab></Tab>
  }
}

class TabBarComponent extends React.Component {  
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    }
  }

  render() {
    return  <BottomTabBar 
      {...this.props}
      activeTintColor={this.props.theme}
    />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);


import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Linking } from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import { connect } from 'react-redux';
import actions from '../../action/index';
import NavigationUtil from '../../navigator/NavigationUtil';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MORE_MENU } from '../../common/MORE_MENU.js';
import GlobalStyles from '../../res/GlobalStyles';
import ViewUtil from '../../util/ViewUtil';
import AboutCommon, { FLAG_ABOUT } from './AboutCommon';
import myconfig from '../../res/myconfig';

const THEME_COLOR = '#678';
type Props = {};
export default class AboutPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.aboutCommon = new AboutCommon({
      ...this.params,
      navigation: this.props.navigation,
      flagAbout: FLAG_ABOUT.flag_about,
    }, data => this.setState({...data}));
    this.state = {
      data: myconfig
    }
  }

  onClick(menu) {
    let RouteName, params = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://www.baidu.com/';
        break;
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage';
        params.title = '关于作者';
        break;
      case MORE_MENU.Feedback:
        const url = 'prefs:root=WIFI'
        Linking.canOpenURL(url)
          .then(support => {
            if (!support) {
              console.log('can\'t handle url:' + url);
            } else {
              Linking.openURL(url);
            }
          })
          .catch(e => {
            console.error('an error occor');
          })
        break;
      default:
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(params, RouteName);
    }
  }

  getItem(menu) {
    return ViewUtil.getMenuItem(()=>this.onClick(menu), menu, THEME_COLOR) 
  }
  render() {
    const content = <View>
      {this.getItem(MORE_MENU.Tutorial)}
      <View style={GlobalStyles.line}/>
      {this.getItem(MORE_MENU.About_Author)}
      <View style={GlobalStyles.line}/>
      {this.getItem(MORE_MENU.Feedback)}
    </View>
    return this.aboutCommon.render(content, this.state.data.app);
  }
}
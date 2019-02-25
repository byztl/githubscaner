import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MORE_MENU } from '../../common/MORE_MENU.js';
import GlobalStyles from '../../res/GlobalStyles';
import ViewUtil from '../../util/ViewUtil';
import AboutCommon, { FLAG_ABOUT } from './AboutCommon';
import myconfig from '../../res/myconfig';

const THEME_COLOR = '#678';
type Props = {};
export default class AboutMePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.aboutCommon = new AboutCommon({
      ...this.params,
      navigation: this.props.navigation,
      flagAbout: FLAG_ABOUT.flag_about_me,
    }, data => this.setState({ ...data }));
    this.state = {
      data: myconfig,
      showTurtorial: true,
      showBlog: false,
      showQQ: false,
      showContact: false,
    }
  }

  onClick(tab) {
    if (!tab) return;
    if (tab.url) {
      NavigationUtil.goBack({
        title: tab.title,
        url: tab.url
      }, 'WebViewPage')
    }
  }

  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR)
  }

  _item(data, isShow, key) {
    return ViewUtil.getSettingItem(() => {
      this.setState({
        [key]: !this.state[key]
      })
    }, data.name, THEME_COLOR, Ionicons, data.icon, isShow? 'ios-arrow-up' : 'ios-arrow-down')
  }

  renderItems(dic, isShowAccout) {
    if (!dic) return null;
    let views = [];
    for (let i in dic) {
      let title = isShowAccout ? dic[i].title + ':' + dic[i].account : dic[i].title;
      views.push(
        <View 
          key={i}
        >
          {ViewUtil.getSettingItem(() => this.onClick(dic[i]), title, THEME_COLOR)}
          <View style={GlobalStyles.line} />
        </View>
      )
    }
    return views;
  }

  render() {
    const content = <View>
      {this._item(this.state.data.aboutMe.Tutorial, this.state.showTurtorial, 'showTurtorial')}
      <View style={GlobalStyles.line} />
      {this.state.showTurtorial ? this.renderItems(this.state.data.aboutMe.Tutorial.items) : null}

      {this._item(this.state.data.aboutMe.Blog, this.state.showTurtorial, 'showBlog')}
      <View style={GlobalStyles.line} />
      {this.state.showBlog ? this.renderItems(this.state.data.aboutMe.Blog.items) : null}

      {this._item(this.state.data.aboutMe.Contact, this.state.showTurtorial, 'showContact')}
      <View style={GlobalStyles.line} />
      {this.state.showContact ? this.renderItems(this.state.data.aboutMe.Contact.items) : null}
      
      {this._item(this.state.data.aboutMe.QQ, this.state.showTurtorial, 'showQQ')}
      <View style={GlobalStyles.line} />
      {this.state.showQQ ? this.renderItems(this.state.data.aboutMe.QQ.items) : null}
    </View>
    return this.aboutCommon.render(content, this.state.data.author);
  }
}
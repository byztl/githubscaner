import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, RefreshControl, DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import actions from '../action/index';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import { FLAG_STORAGE } from '../expand/dao/DataStore';
import FavoriteDao from '../expand/dao/FavoriteDao';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
import FavoriteUtil from '../util/FavoriteUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil';
import CheckBox from 'react-native-check-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyles from '../res/GlobalStyles';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

type Props = {};
class CustomKeyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.backPress = new BackPressComponent({ backPress: e => this.onBackPress(e) });
    this.changeValue = [];
    this.isRemoveKey = this.props;
    this.languageDao = new LanguageDao(this.params.flag);
    this.state = {
      keys: []
    }
  }

  onBackPress(e) {
    this.onBack();
    return true;
  }

  componentDidMount() {
    this.backPress.componentDidMount();
    // 如果 porps 中标签为空则从本地存储中获取标签
    if (CustomKeyPage._keys(this.props).length === 0) {
      let { onLoadLanguage } = this.props;
      onLoadLanguage(this.params.flag);
    }
    this.setState({
      keys: CustomKeyPage._keys(this.props),
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.keys !== CustomKeyPage._keys(nextProps, null, prevState)) {
      return {
        keys: CustomKeyPage._keys(nextProps, null, prevState)
      }
    }
    return null;
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  /**
   * 
   * @param {*} props 
   * @param {*} original 移除标签时使用, 是否从 props 获取原始标签
   * @param {*} state 移除标签时使用
   */
  static _keys(props, original, state) {
    const { flag, isRemoveKey } = props.navigation.state.params;
    let key = flag === FLAG_LANGUAGE.flag_dao_key ? 'keys' : 'languages';
    if (isRemoveKey && !original) {

    } else {
      return props.language[key];
    }
  }

  onSave() {

  }

  onClick(data, index) {

  }

  _checkedImage(checked) {
    const { theme } = this.params;
    return <Ionicons
      name={checked ? 'ios-checkbox' : 'md-square-outline'}
      size={20}
      style={{
        color: THEME_COLOR,
      }}
    />
  }

  renderCheckBox(data, index) {
    return <CheckBox
      style={{ flex: 1, padding: 10 }}
      onClick={() => this.onClick(data, index)}
      isChecked={data.isChecked}
      leftText={data.name}
      checkImage={this._checkedImage(true)}
      unCheckImage={this._checkedImage(false)}
    />
  }

  renderView() { 
    let dataArray = this.state.keys;
    if (!dataArray || dataArray.length === 0) return;
    let len = dataArray.length;
    let views = [];
    for (let i = 0; i < len; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(dataArray[i], i)}
            {i + 1 < len && this.renderCheckBox(dataArray[i+1], i + 1)}
          </View>
          <View style={GlobalStyles.line} />
        </View>
      )
    }
    return views;
  }

  render() {
    let title = this.isRemoveKey ? '移除标签' : '自定义标签';
    title = this.params.flag === FLAG_LANGUAGE.flag_dao_language ? '自定义语言' : title;
    let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
    let navgiationBar = <NavigationBar
      title={title}
      style={{ backgroundColor: THEME_COLOR }}
      rightButton={ViewUtil.getRightButton( rightButtonTitle, () => this.onSave())}
    />

    return <View
      style={styles.container}
    >
      {navgiationBar}
      <ScrollView>
        {this.renderView()}
      </ScrollView>
    </View>
  }
}

const mapKeyStateToProps = state => ({
  language: state.language,
});

const mapKeyDispatchToProps = dispatch => ({
  onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});

export default connect(mapKeyStateToProps, mapKeyDispatchToProps)(CustomKeyPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
  }
});

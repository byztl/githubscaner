

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import actions from  '../action/index';
import NavigationUtil from '../navigator/NavigationUtil';

type Props = {};
export class MyPage extends Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomePage}>MyPage</Text>
        <Button 
          title="改变主题色"
          onPress={() => {
            this.props.onThemeChange('blue');
          }}
        />
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "DetailPage")
        }}
        >跳转到详情页</Text>
        <Button 
          title="fetch使用"
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, "FetchDemoPage")
          }} 
        />
        <Button 
          title="AsyncStorage 使用"
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, "AsyncStoragePage")
          }} 
        />
        <Button 
          title="离线缓存框架测试"
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, "DataStoreDemoPage")
          }} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme=>dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

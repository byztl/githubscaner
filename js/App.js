/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store';

type Props = {};
export default class App extends Component<Props> {
  render() {
    // 将 store 传给 App 框架
    return <Provider store={store}>
      <AppNavigator />
    </Provider>
  }
}

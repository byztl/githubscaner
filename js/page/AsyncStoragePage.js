

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import actions from '../action/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const KEY = "save_key";
export default class AsyncStoragePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: ''
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomePage}>Fetch 使用</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <View style={styles.inputContainer}>
          <Text
            onPress={() => {
              this.doSave();
            }}
          >
            存储
              </Text>

          <Text
            onPress={() => {
              this.doRemove();
            }}
          >
            删除
              </Text>

          <Text
            onPress={() => {
              this.getData();
            }}
          >
            获取
              </Text>
        </View>
        <Text>
          {this.state.showText}
        </Text>
      </View>
    );
  }

  doSave() {

  }

  doRemove() {

  }

  getData() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 30,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import DataStore from '../expand/dao/DataStore';
import { connect } from 'react-redux';
import actions from '../action/index';

type Props = {};
const KEY = "save_key";
export default class DataStoreDemoPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: 'default'
    }
    this.dataStore = new DataStore();
  }

  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.value}`;
    this.dataStore.fetchData(url)
      .then(data => {
        let showData = `初次数据加载时间: ${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
        this.setState({
          showText: showData
        })
      })
      .catch(error => {
        error && console.log(error.toString());
      })
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomePage}>离线缓存框架设计</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <View style={styles.inputContainer}>
          <Text
            onPress={() => {
              this.loadData();
            }}
          >
            获取
          </Text>
          <Text>
            {this.state.showText}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

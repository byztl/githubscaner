

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { connect } from 'react-redux';
import actions from  '../action/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class FetchDemoPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: ''
    }
  }
  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
    fetch(url)
      .then(response => response.text())
      .then(responseText => {
        this.setState({
          showText: responseText
        })
      })
  }

  loadData2() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
    fetch(url)
      .then(response => {
        if (response) {
          return response.text();
        }
        throw new Error('Net work reponse not ok');
      })
      .then(responseText => {
        this.setState({
          showText: responseText
        })
      })
      .catch(e => {
        this.setState({
          showText: e.toString()
        })
      })
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomePage}>Fetch 使用</Text>
          <View style={styles.inputContainer}>
            <TextInput  
              style={styles.input}
              onChangeText={ text => {
                this.searchKey = text;
              }}
            />
            <Button 
              title="改变主题色"
              onPress={() => {
                this.loadData2();
              }}
            />
          </View>
        <Text>
          {this.state.showText}
        </Text>
      </View>
    );
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

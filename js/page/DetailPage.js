import React, {Component} from 'react';
import {DeviceInfo, TouchableOpacity, StyleSheet, WebView, View} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import NavigaitonUtil from '../navigator/NavigationUtil';
import BackPressComponent from "../common/BackPressComponent";

type Props = {};
const TRENDING_URL ='https://github.com/';
const THEME_COLOR = '#678';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const { projectModel } = this.params;
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
    const title = projectModel.full_name || projectModel.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
    }
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
  }
  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    this.onBack();
    return true;
  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NavigaitonUtil.goBack(this.props.navigation)
    }
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack:navState.canGoBack,
      url: navState.url
    })
  }
  renderRightButton() {
    return (<View style={{flexDirection: 'row'}}>
      <TouchableOpacity 
        onPress={() => {

        }}
      >
        <FontAwesome 
          name={'star-o'}
          size={20}
          style={{color: 'white', marginRight: 10}}
        />
      </TouchableOpacity>
      {ViewUtil.getShareButton(() => {
        
      })}
    </View>)
  }
  render() {
    const titleLayoutStyle = this.state.title.length > 15  ? { paddingRight : 30} : null;
    let navgiationBar = <NavigationBar 
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      titleLayoutStyle={titleLayoutStyle}
      title={this.state.title}
      style={{backgroundColor: THEME_COLOR}}
      rightButton={this.renderRightButton()}
    />

    return (
      <View style={styles.container}>
        {navgiationBar}
        <WebView 
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

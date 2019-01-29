import React, { Component } from 'react';
import { FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  RefreshControl, 
  DeviceInfo, 
  TouchableOpacity, 
  DeviceEventEmitter 
} from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Toast from 'react-native-easy-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import actions from '../action/index';
import TrendingDialog, { TimeSpans } from '../common/TrendingDialog';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';

const URL = 'https://github.com/trending/';
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
const THEME_COLOR = '#678';

type Props = {};
export default class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = ['All', 'Objective-c', 'Swift', 'C++'];
    this.state = {
      timeSpan: TimeSpans[0],
    }
  }

  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item} />,
        navigationOptions: {
          title: item,
        }
      }
    })
    return tabs;
  }

  _titleView() {
    
    console.log(this.state.timeSpan.showText);
    
    return <TouchableOpacity
      underlayColor='transparent'
      onPress={() => this.dialog.show()}
    >
      <View
        style={{flexDirection: 'row', alignItems: 'center'}}
      >
        <Text style={{
          fontSize: 18,
          color: '#FFFFFF',
          fontWeight: '400'
        }}>
          趋势 {this.state.timeSpan.showText}
          <MaterialIcons 
            name={'arrow-drop-down'}
            size={22}
            style={{color: 'white'}}
          />
        </Text>
      </View>
    </TouchableOpacity> 
  }

  renderTrendingDialog() {
    return <TrendingDialog 
      ref={dialog => this.dialog=dialog}
      onSelect={tab => this.onSelectTimeSpan(tab)}
    />
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab
    });
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
  }

  _tabNav() {
    if (!this.tabNav) {
      this.tabNav = createMaterialTopTabNavigator(
        this._genTabs(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
            style: {
              backgroundColor: '#678',
              height: 30
            },
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle
          }
        }
      )
    }
    return this.tabNav;
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    }
    let navgiationBar = <NavigationBar 
      titleView={this._titleView()}
      statusBar={statusBar}
      style={{backgroundColor: THEME_COLOR}}
    />
    
    const TabNavigator = this._tabNav();
    return <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
      {navgiationBar}
      <TabNavigator />
      {this.renderTrendingDialog()}
    </View>
  }
}

const pageSize = 10; // 设为常数, 防止修改
class TrendingTab extends Component<Props> {
  constructor(props) {
    super(props);
    const { tabLabel, timeSpan } = this.props;
    this.storeName = tabLabel;
    this.timeSpan = timeSpan;
  }

  componentDidMount() {
    this.loadData();
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
      this.timeSpan = timeSpan;
      this.loadData();
    })
  }

  componentWillUnmount() {
    this.timeSpanChangeListener || this.timeSpanChangeListener.remove();
  }

  loadData(loadMore) {
    const { onRefreshTrending, onLoadMoreTrending } = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, callBack=>{
        this.refs.toast.show('没有更多了');
      });
    } else {
      onRefreshTrending(this.storeName, url, pageSize)
    }
  }

  _store() {
    const { Trending } = this.props;
    let store = Trending[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [], // 要显示的数据
        hideLoadingMore: true // 默认隐藏加载更多
      }
    }
    return store;
  }

  genFetchUrl(key) {
    console.log('url:' + URL + key + '?' + this.timeSpan.searchText);
    
    return URL + key + '?' + this.timeSpan.searchText;
  }

  renderItem(data) {
    const { item } = data;
    return <TrendingItem 
      item={item} 
      onSelect={() => {
        NavigationUtil.goPage({
          projectModel: item
        }, 'DetailPage')
      }}
    />
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null :   // 少打了一个(), 调试了一个下午!!!
      <View style={styles.indicatorContainer}>
        <ActivityIndicator 
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }

  render() {
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList 
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => ""+(item.id || item.fullName)}
          refreshControl={
            <RefreshControl 
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100)
          }}
          onEndReachedThreshold={0.1}
          onScrollBeginDrag={() => {
            this.canLoadMore = true;
          }}
        />
        <Toast 
          ref={'toast'}
          position={'center'}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  Trending: state.trending
});

const mapDispatchToProps = dispatch => ({
  // 将 dispatch(onRefreshTrending(storeName, url) 绑定到 props)
  onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack))
});
 
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
    // minWidth: 30
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});

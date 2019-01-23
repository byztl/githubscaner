import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import actions from '../action/index';
import PopularItem from '../common/PopularItem';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';

type Props = {};
export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = ['Java', 'Android', 'iOS', 'React', 'ReactNative'];
  }

  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        }
      }
    })
    return tabs;
  }

  render() {
    const TabNavigator = createMaterialTopTabNavigator(
      this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: '#678'
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
        }
      }
    )
    return <View style={{ flex: 1, marginTop: 44 }}>
      <TabNavigator />
    </View>
  }
}

const pageSize = 10; // 设为常数, 防止修改
class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(loadMore) {
    const { onRefreshPopular, onLoadMorePopular } = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callBack=>{
        this.refs.toast.show('没有更多了');
      });
    } else {
      onRefreshPopular(this.storeName, url, pageSize)
    }
  }

  _store() {
    const { popular } = this.props;
    let store = popular[this.storeName];
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
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const { item } = data;
    return <PopularItem 
      item={item}
      onSelect={() => {

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
          keyExtractor={item => ""+item.id}
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
            this.loadData(true);
          }}
          onEndReachedThreshold={0.5}
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
  popular: state.popular
});

const mapDispatchToProps = dispatch => ({
  // 将 dispatch(onRefreshPopular(storeName, url) 绑定到 props)
  onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack))
});
 
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
    minWidth: 30
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});

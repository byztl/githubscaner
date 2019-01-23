import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

/**
 * 
 * @param {} storeName 
 * @param {*} url 
 */
export function onRefreshPopular(storeName, url, PageSize) {
  return dispatch => {
    dispatch({ type: Types.POPULAR_REFRESH, storeName });
    let dataStore = new DataStore();
    dataStore.fetchData(url) //异步 action 与数据流
      .then(data => {
        handleData(dispatch, storeName, data, PageSize)
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: Types.POPULAR_REFRESH_FAIL,
          storeName,
          error
        });
      })
  }
}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) { // 已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more')
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName: storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      } else {
        // 本次可载入的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageIndex * pageSize;
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        })
      }
    }, 500)
  }
}

function handleData(dispatch, storeName, data, pageSize) {
  let fixItems = [];
  if (data && data.data && data.data.items) {
    fixItems = data.data.items;
  }
  dispatch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    items: fixItems,
    projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次要加载的数据
    storeName,
    pageIndex: 1
  })
}
import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

/**
 * 
 * @param {} storeName 
 * @param {*} url 
 */
export function onLoadPopularData(storeName, url) {
  return dispatch => {
    dispatch({ type: Types.POPULAR_REFRESH, storeName });
    let dataStore = new DataStore();
    dataStore.fetchData(url) //异步 action 与数据流
      .then(data => {
        handleData(dispatch, storeName, data)
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: Types.LOAD_POPULAR_FAIL,
          storeName,
          error
        });
      })
  }
}

function handleData(dispatch, storeName, data) {
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })
}
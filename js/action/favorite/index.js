import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { handleData, _projectModels } from '../ActionUtil';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';

/**
 * 
 * 加载收藏的项目
 * @param {} storeName 
 * @param {*} url 
 */
export function onLoadFavoriteData(flag, isShowLoading) {
  return dispatch => {
    if (isShowLoading) {
      dispatch({ type: Types.FAVORITE_LOAD_DATA, flag });
    }
    let dataStore = new DataStore();
    new FavoriteDao(flag).getAllItems()
      .then(items => {
        let resultData = [];
        items.forEach(item => {
          resultData.push(new ProjectModel(item, true));
        });
        dispatch({ type: Types.FAVORITE_LOAD_SUCCESS, projectModels: resultData, storeName: flag })
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: Types.FAVORITE_LOAD_FAIL, error: e, storeName: flag })
      })
  }
}

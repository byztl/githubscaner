import ProjectModel from "../model/ProjectModel";
import Utils from "../util/Util";

export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }

  }
  // 第一次要显示的数据
  let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  
  _projectModels(showItems, favoriteDao, projectModels => {
    dispatch({
      type: actionType,
      items: fixItems,
      projectModels: projectModels,
      storeName,
      pageIndex: 1
    })
  })
}

/**
 * 
 * @param {要包装的 item 数组} showItems 
 * @param {收藏数据管理工具} favoriteDao 
 * @param {回调函数} callback 
 */
export async function _projectModels(showItems, favoriteDao, callback) {
  let keys = [];
  try {
    keys = await favoriteDao.getFavoriteKeys();
  } catch (error) {
    console.log(error);
  }
  let projectModels = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)))
  }
  if (typeof callback === 'function') {
    callback(projectModels);
  }
}
import { AsyncStorage } from 'react-native';
const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag
  }

  /**
 * 收藏项目, 保存收藏的项目
 * key 项目的id,
 * value 收藏的项目
 * callback 回调
 */
  saveFavoriteItem(key, value, callback) {
    AsyncStorage.setItem(key, value, (error) => {
      if (!error) {
        this.updateFavoriteKeys(key, true);
      }
    })
  }

  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        let index = favoriteKeys.indexOf(key);
        if (isAdd) { // 如果是添加且 key 不在在则添加到数组中
          if (index === -1) favoriteKeys.push(key);
        } else { //如果是删除且 key 存在则将其从数值中移除
          if (index !== -1) favoriteKeys.splice(index, 1);
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    })
  }

  /**
   * 获取所有收藏的方法
   */
  getFavoriteKeys() {
    return new Promise((reslove, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if (!error) {
          try {
            reslove(JSON.parse(result));
          } catch (e) {
            reject(error);
          }
        } else {
          reject(error);
        }
      });
    })
  }

  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key, (error, result) => {
      if (!error) {
        this.updateFavoriteKeys(key, false);
      }
    })
  }

  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys().then((keys) => {
        let items = [];
        if (keys) {
          AsyncStorage.multiGet(key, (err, stores) => {
            try {
              stores.map((result, i, store) => {
                let key = store[i][0];
                let value = store[i][i];
                if (value) items.push(JSON.stringify(value));
              });
              resolve(items)
            } catch (error) {
              reject(e);
            }
          })
        } else {
          reslove(items);
        }
      }).catch((e) => {
        reject(e);
      })
    })
  }
}




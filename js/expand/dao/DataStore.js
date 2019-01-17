import { AsyncStorage } from 'react-native';

export default class DataStore {
  /**
   * 保存数据
   * @param {*} url 
   * @param {*} data 
   * @param {*} callback 
   */
  saveData(url, data, callback) {
    if (!data || !url) return;
    AsyncStorage.setItem(url, JSON.stringify(this._warpData(data)), callback);
  }


  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then((warppedData) => {
          if (warppedData && DataStore.checkTimestampValid(warppedData.timestamp)) {
            resolve(warppedData);
          } else {
            this.fetchData(url)
              .then((data) => {
                resolve(this._warpData(data));
              })
              .catch((error) => {
                reject(error);
              })
          }
        })
        .catch((error) => {
          this.fetchNetData(url)
            .then((data) => {
              this._warpData(data);
            })
            .catch((error) => {
              reject(error);
            })
        })
    })
  }

  /**
   * 
   * 获取本地数据
   * @param {} key 
   */
  fetchLocalData(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e);
            console.error(e);;
          }
        } else {
          reject(error);
          console.error(error);
        }
      })
    })
  }

  /**
   * 
   * 获取网络数据
   * @param {*} url 
   */
  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network resonse was not ok.');
        })
        .then((response) => {
          this.saveData(url, responseData);
          resolve(responseData);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  /**
   * 
   * 数据包裹, 添加时间戳
   * @param {*} data 
   */
  _warpData(data) {
    return { data: data, timestamp: new date().getTime() };
  }


  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDay() !== targetDate.getDay()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false;

    return true;
  }
}

import React from 'react';
import { AsyncStorage } from 'react-native';
import config from '../../res/config';
import '../../res/config.json';
import languages from '../../res/languages';
import keys from '../../res/config';

export const FLAG_LANGUAGE = {flag_dao_language: 'flag_dao_language', flag_dao_key: 'flag_dao_key'};
export default class LanguageDao {
  constructor(flag) {
    this.flag = flag;
    
  }
  /**
   * 获取语言或者标签
   */
  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          let data = this.flag === FLAG_LANGUAGE.flag_dao_language ? languages : keys;
          this.save(data);
          resolve(data);
        } else {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(error);
          }
        }
      })
    })
  }
  /**
   * 保存语言或者标签
   */
  save(data) {
    let stringifyData = JSON.stringify(data);
    AsyncStorage.setItem(this.flag, stringifyData, (error, result) => {

    });
  }

}
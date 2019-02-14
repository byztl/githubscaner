import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ViewUtil {
  /**
   * 
   * 返回按钮
   * @param {回调方法} callback 
   */
  static getLeftBackButton(callback) {
    return <TouchableOpacity 
      style={{padding: 8, paddingLeft: 12}}
      onPress={callback}>
      <Ionicons 
        name={'ios-arrow-back'}
        size={26}
        style={{color: 'white'}}
      />
      </TouchableOpacity>
  } 

  /**
   * 
   * 分享按钮
   * @param {回调方法} callback 
   */
  static getShareButton(callback) {
    return <TouchableOpacity
      underlayColor={'transparent'}
      onPress={callback}
    >
      <Ionicons 
        name={'md-share'}
        size={20}
        style={{opacity: 0.9, marginRight: 10, color: 'white'}}
      />

    </TouchableOpacity>
  }
}
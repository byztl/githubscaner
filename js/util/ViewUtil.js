import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ViewUtil {

  static getMenuItem(callback, menu, color, expandableIcon) {
    return ViewUtil.getSettingItem(callback, menu.name, color, menu.Icons, menu.icon, expandableIcon)
  }
  static getSettingItem(callback, text, color, Icons, icon, expandableIcon) {
    return (
      <TouchableOpacity
        onPress={callback}
        style={styles.setting_item_container}
      >
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {Icons && icon ? 
            <Icons 
              name={icon}
              size={16}
              style={{color: color, marginRight: 10}}
            /> : 
            <View style={{opacity: 1, width: 16, height: 16, marginRight: 10}}/>
          }
          <Text>{text}</Text>
        </View>
        <Ionicons 
          name={expandableIcon ? expandableIcon : 'ios-arrow-forward'}
          size={16}
          style={{marginRight: 10, alignSelf: 'center', color: color || 'black'}}
        />
      </TouchableOpacity>
    )
  }
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

const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})
export default class Utils {
  /**
   * 检查该 Item 是否被收藏
   */
  static checkFavorite(item, keys = []) {
    if (!keys) return false;
    for (let i = 0, len = keys.length; i < len; i++) {
      let id = item.id ? item.id : item.fullName;
      if (id.toString() === keys[i]) {
        return true;
      }
    }
    return false;
  }
}
import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { _projectModels } from '../ActionUtil';
import LanguageDao from '../../expand/dao/LanguageDao';

/**
 * 
 * 加载标签
 * @param {} flagKey 
 * @param {*} url 
 */
export function onLoadLanguage(flagKey) {
  return async dispatch => {
    try {
      let languages = await new LanguageDao(key).fetch();
      dispatch({type: Types.LANGUATE_LOAD_SUCCESS, languages: languages, flag: flagKey})
    } catch (error) {
      console.log(error);
    }
  }
}

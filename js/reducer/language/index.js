import Types from '../../action/types';
import { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';

const defaultState = {
  languages: [],
  keys: []
}
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.LANGUATE_LOAD_SUCCESS: // 获取数据成功
      if (FLAG_LANGUAGE.flag_dao_language === action.flag) {
        return {
          ...state,
          languages: action.languages
        }
      } else {
        return {
          ...state,
          keys: action.languages
        }
      }
      break;
  }
  return state;
}
import Types from '../../action/types';

const defaultState = {}

/**
 * 结构树形态
 * favorite: {
 *  popular: {
 *    projectModels:[],
 *    isLoading: false
 *  },
 *  trending: {
 *    projectModels:[],
 *    isLoading: false
 *  },
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.FAVORITE_LOAD_DATA: // 获取数据
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        }
      };
      break;

    case Types.FAVORITE_LOAD_SUCCESS: // 下拉获取成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
          projectModels: action.projectModels,
        }
      };
      break;

    case Types.FAVORITE_LOAD_FAIL: // 下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        }
      };
      break;
    default:
      return state;
  }
}
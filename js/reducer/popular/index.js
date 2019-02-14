import Types from '../../action/types';

const defaultState = {}

/**
 * 结构树形态
 * popular: {
 *  java: {
 *    items:[],
 *    isLoading: false
 *  },
 *  iOS: {
 *    items:[],
 *    isLoading: false
 *  },
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.POPULAR_REFRESH_SUCCESS: // 下拉刷新成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items, // 原始数据
          projectModels: action.projectModels, // 此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      };
      break;

    case Types.POPULAR_REFRESH: // 下拉刷新
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true,
        }
      };
      break;

    case Types.POPULAR_REFRESH_FAIL: // 下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        }
      };
      break;

    case Types.POPULAR_LOAD_MORE_SUCCESS: // 上拉加载更多成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        }
      };
      break;

    case Types.POPULAR_LOAD_MORE_FAIL: // 上拉加载更多失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        }
      };
      break;
    default:
      return state;
  }
}
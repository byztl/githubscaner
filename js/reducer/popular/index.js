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
export default function onAction(state=defaultState, action) {
  switch (action.type) {
    case Types.LOAD_POPULAR_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName],
          item: action.items,
          isLoading: false,

        }
      };
      break;
    
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName],
          isLoading: true,

        }
      };
    break;

    case Types.LOAD_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName],
          isLoading: false,
        }
      };
    break;
    default:
      return state;
  }
}
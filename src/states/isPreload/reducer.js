import { ActionType } from './action';

/**
 * @TODO: Define reducer for the isPreLoad state
 */
function isPreloadReducer(isPreLoad = true, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreLoad;
    default:
      return isPreLoad;
  }
}

export default isPreloadReducer;

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  locationBeforeTransitions: null
};

export function routerReducer(
  state = initialState,
  action: any = {type: '', payload: {}}) {

  if (action.type === LOCATION_CHANGE) {
    return Object.assign({}, state, {
      locationBeforeTransitions: action.payload
    });
  }

  return state;
}

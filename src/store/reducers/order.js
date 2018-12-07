import * as actionTypes from "../actions/actionTypes";

const initialState = {
    order: null
}

export default (state = initialState, type, payload ) => {
  switch (type) {

  case actionTypes.PLACE_ORDER:
    return { ...state, ...payload }

  default:
    return state
  }
}

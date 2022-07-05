const initState = {
  isOpenedSideCart: false,
}

export default function uiReducer(state=initState, action) {
  if (action.type=='OPEN_SIDE_CART') {
    return {
      ...state,
      isOpenedSideCart: true,
    }
  }
  if (action.type=='HIDE_SIDE_CART') {
    return {
      ...state,
      isOpenedSideCart: false,
    }
  }

  return state
}

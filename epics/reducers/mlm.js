const initState = {
  referer: undefined,
  defaultReferer: undefined,
  isConfirmedReferer: false,
  userType: undefined,
  isConfirmedUserType: false,
  yourCountry: undefined,
  distCenter: undefined,
}

const mlmReducer = (state = initState, action) => {
  if (action.type === 'FETCH_DEFAULT_ENROLLEE_SUCCESS') {
    return {
      ...state,
      defaultReferer: action.payload
    }
  }
  if (action.type === 'FETCH_ENROLLEE_SUCCESS') {
    return {
      ...state,
      referer: action.payload
    }
  }
  if (action.type === 'FETCH_ENROLLEE_FAILURE') {
    return {
      ...state,
      referer: undefined
    }
  }
  if (action.type === 'SET_CONFIRMED_REFERER') {
    return {
      ...state,
      isConfirmedReferer: true,
      referer: action.payload
    }
  }
  if (action.type === 'SET_USER_TYPE') {
    return {
      ...state,
      userType: action.payload,
      isConfirmedUserType: true,
    }
  }
  if (action.type === 'RESET_USER_TYPE') {
    return {
      ...state,
      isConfirmedUserType: false,
    }
  }
  if (action.type === 'SET_COUNTRY') {
    return {
      ...state,
      yourCountry: action.payload
    }
  }
  if (action.type === 'FETCH_DISTRIBUTION_CENTER_SUCCESS') {
    return {
      ...state,
      distCenter: action.payload
    }
  }

  return state
};

export default mlmReducer

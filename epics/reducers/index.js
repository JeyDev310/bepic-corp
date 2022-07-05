import { combineReducers } from 'redux'
import mlmReducer from './mlm'
import productsReducer from './products'
import checkoutReducer from './checkout'
import uiReducer from './ui'

const rootReducer = combineReducers({
  mlm: mlmReducer,
  products: productsReducer,
  checkout: checkoutReducer,
  ui: uiReducer,
})

export default rootReducer

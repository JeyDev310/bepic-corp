const initState = {
  coupon: undefined,
  isCheckingCoupon: false,
  orderDiscountedAmount: 0,
  orderDetails: [],
}

export default (state=initState, action) => {
  let orderDetails = [...state.orderDetails]

  switch (action.type) {
    case 'CHECK_COUPON_START':
      return { ...state, 
        coupon: undefined, 
        isCheckingCoupon: true,
        orderDiscountedAmount: 0,
      };

    case 'CHECK_COUPON_SUCCESS':
      return { ...state, 
        isCheckingCoupon: false, 
        coupon: action.coupon,
        orderDiscountedAmount: action.payload.orderDiscountedAmount*1 
      };

    case 'CHECK_COUPON_FAILURE':
      return { ...state, 
        isCheckingCoupon: false,
      };
    
    case 'RESET_COUPON':
      return { ...state,
        coupon: undefined,
        orderDiscountedAmount: 0
      }
    
    case 'ADD_CART':      
      let isExist = false
      let product = action.payload.product
      for (let item of orderDetails) {
        if (item.product.id == product.id) {
          isExist = true
          item.quantity = item.quantity*1+action.payload.quantity*1
        }
      }
      if (!isExist) {
        orderDetails.push({
          product,
          quantity: action.payload.quantity
        })
      }
      return {
        ...state,
        orderDetails
      }

    case 'REMOVE_CART':
      return {
        ...state,
        orderDetails: orderDetails.filter(el=>el.product.id!=action.payload.product_id)
      }

    case 'CLEAR_CART':
      return {
        ...state,
        coupon: undefined,
        isCheckingCoupon: false,
        orderDiscountedAmount: 0,
        orderDetails: [],
      }
    
    default:
      return state;
  }
}

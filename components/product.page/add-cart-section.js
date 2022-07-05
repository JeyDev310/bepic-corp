import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { message, Spin } from 'antd'

export default function AddCartSection(props) {
  const cookies = new Cookies()
  const userType = cookies.get('bepicUserType')
  const orderDetails = useSelector(state=>state.checkout.orderDetails)
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)

  const handleAddCart = () => {

    let cart_quantity = 0;
    for (let item of orderDetails) {
      if (item.product.id == props.product.id) {
        cart_quantity = item.quantity
        break;
      }
    }
    console.log(cart_quantity, quantity, props.product.max_order_quantity)
    if ((props.product.max_order_quantity > 0) && (props.product.max_order_quantity < Number(quantity) + cart_quantity)) {
      message.error(`We are sorry, but you can't buy more ${props.product.max_order_quantity} for this product.`)
      return;
    }

    dispatch({
      type: 'ADD_CART',
      payload: {
        product: props.product,
        quantity,
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'OPEN_SIDE_CART',
      })
    }, 1000)
  }

  return (
    <div className="cart-butn">
      <select value={quantity}
        onChange={e=>setQuantity(e.target.value)}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <a onClick={handleAddCart}>ADD TO CART</a>
    </div>
  )

}

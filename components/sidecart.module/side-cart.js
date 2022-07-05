import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { asPrice } from 'utils/text'
import Cookies from 'universal-cookie'
import {message} from 'antd'

export default function SideCart(props) {
  const cookies = new Cookies()
  const dispatch = useDispatch()
  const router = useRouter()
  const isOpened = useSelector(state=>state.ui.isOpenedSideCart)
  const wrapperRef = useRef(null)
  const orderDetails = useSelector(state=>state.checkout.orderDetails)
  const userType = cookies.get('bepicUserType')
  const [totalItems, setTotalItems] = useState(0)
  const [totalPv, setTotalPv] = useState(0)
  const [totalCv, setTotalCv] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      dispatch({
        type: 'HIDE_SIDE_CART'
      })
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  useEffect(() => {
    let totalItems = 0, totalPv = 0, totalCv = 0, totalPrice = 0    
    for (let item of orderDetails) {
      totalItems += item.quantity*1
      totalPv += item.product.pv*item.quantity
      totalCv += item.product.cv*item.quantity
      totalPrice += (userType==1?item.product.member_price:item.product.retail_price)*item.quantity   
    }
    setTotalItems(totalItems)
    setTotalPv(totalPv)
    setTotalCv(totalCv)
    setTotalPrice(totalPrice)
  }, [orderDetails])
  const goCheckout = () => {
    router.push('/checkout')
  }
  const handleCloseSideCart = () => {
    dispatch({
      type: 'HIDE_SIDE_CART'
    })
  }
  const handleRemoveCart = (product_id) => {
    dispatch({
      type: 'REMOVE_CART',
      payload: { product_id }
    })
  }
  const subtraction = (product) => {
    dispatch({
      type: 'ADD_CART',
      payload: {
        product: product,
        quantity: -1,
      }
    })
  }

  const addition = (product) => {
    dispatch({
      type: 'ADD_CART',
      payload: {
        product: product,
        quantity: 1,
      }
    })
  }
  
  return (
    <>
      <div className={`${'sidebar-cart'} ${isOpened?'opened':''}`} ref={wrapperRef}>
        <div className='sidebar-cart-content'>
          <h4>Your Cart</h4>
          {orderDetails.map((el, index) => 
          <div className='d-flex justify-content-between' key={index}>
            <div className='image-section'>
              <img src={el.product.image} className='product-thumb' />
            </div>
            <div className='desc-section'>
              <div className='d-flex justify-content-between'>
                <p className='product-title'>{el.product['title']}</p>
                <p className='product-price text-right'>
                  <span>{asPrice(userType==1?el.product['member_price']:el.product['retail_price'])}</span>
                </p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='qty'>
                  QTY:
                </p>
                <p className='qty'>
                  <button onClick={() => {if (el.quantity > 1) subtraction(el.product)}}>-</button>
                  {el.quantity}
                  <button onClick={() => {
                    if ((el.product.max_order_quantity == 0) || (el.product.max_order_quantity > el.quantity)) {
                      addition(el.product)
                    } else {
                      message.error(`We are sorry, but you can't buy more ${el.product.max_order_quantity} for this product.`)
                    }
                  }}>+</button>
                </p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='product-volume'>
                  PV:{' '+el.product['pv']*el.quantity}
                </p>
                <p>
                  CV:{' '+el.product['cv']*el.quantity}
                </p>
              </div>
              <div className='d-flex'>
                <p className='remove-cart' onClick={()=>handleRemoveCart(el.product.id)}>Remove</p>
              </div>
            </div>
          </div>
          )}
          {orderDetails.length==0?
          <div className='d-flex'>
            <p>There are no items.</p>
          </div>
          : ''}
          <div className='line' />
          <h4>Order Summary</h4>
          <div className='order-summary'>
            <div className='d-flex justify-content-between'>
              <p>Items</p>
              <p>{totalItems}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>PV</p>
              <p>{totalPv}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>CV</p>
              <p>{totalCv}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>Total</p>
              <p><strong>{asPrice(totalPrice)}</strong></p>
            </div>
            <div className='d-flex justify-content-between action-row'>
              <button className='btn btn-secondary' onClick={handleCloseSideCart}>Continue Shopping</button>
              <button 
                onClick={goCheckout} 
                className='btn btn-primary' 
                disabled={orderDetails.length==0}
              >Checkout</button>
            </div>
          </div>
        </div>
      </div>
      {isOpened &&
        <div className='opacity-bg' />
      }
      <style jsx>{`        
        .image-section {

        }
        .desc-section {
          width: calc(100% - 100px);
        }
        .product-thumb {
          width: 90px;
          height: 90px;
        }
        p {
          margin-bottom: 8px;
          opacity: 0.5;
        }
        .product-title {
          font-weight: bold;
          opacity: 1;
        }
        .product-price {
          margin-left: 12px;
          opacity: 1;
        }
        .qty {
          font-size: 11px;
        }
        .qty button {
          padding: 1px 6px;
          margin-left: 4px;
          margin-right: 4px;
          border: 1px solid #000000;
          border-radius: 2px;
          color: #000000;
          cursor: pointer;
        }
        .remove-cart {
          font-size: 10px;
          color: #ff0000;
          opacity: 0.5;
          cursor: pointer;
        }
        .line {
          background-color: #c4c4c4;
          height: 1px;
          width: 100%;
          margin: 24px 0;
        }
        .action-row {
          margin-top: 24px;
        }
      `}</style>
    </>
  )
}
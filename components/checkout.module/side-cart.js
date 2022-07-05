import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { callPostApi } from 'utils/api'
import { message, Spin } from 'antd'
import { asNumber, asPrice } from 'utils/text'
import Cookies from 'universal-cookie'

export default function SideCart(props) {
  const cookies = new Cookies()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const userType = cookies.get('bepicUserType')
  const orderDetails = useSelector(state=>state.checkout.orderDetails)
  const [promotionCode, setPromotionCode] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [totalPv, setTotalPv] = useState(0)
  const [totalCv, setTotalCv] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const changeAble = (props.step == "choose-type" || props.step == "info-form" || props.step == "shipping-form")
  useEffect(() => {
    let totalItems = 0, totalPv = 0, totalCv = 0, totalPrice = 0  ;  
    for (let item of orderDetails) {
      totalItems += item.quantity*1
      totalPv += item.product.pv*item.quantity
      totalCv += item.product.cv*item.quantity
      totalPrice += (userType==1?item.product.member_price:item.product.retail_price)*item.quantity   
    }
    totalPrice -= props.discountAmount
    totalPrice += props.shippingPrice?props.shippingPrice*1:0
    totalPrice += props.tax?props.tax*1:0
    setTotalItems(totalItems)
    setTotalPv(totalPv)
    setTotalCv(totalCv)
    setTotalPrice(totalPrice)
  }, [orderDetails, props.shippingPrice, props.tax, props.discountAmount])
  const checkPromotion = () => {
    if (!promotionCode) {
      message.error('Please input Promotion Code.')
      return
    }
    let data = {
      userType: userType,
      promoCode: promotionCode,
    }
    let orderDetails_ = []
    for (let item of orderDetails) {
      orderDetails_.push({
        product_id: item.product.id,
        quantity: item.quantity,
      })
    }
    data['orderDetails'] = orderDetails_
    setIsLoading(true)
    callPostApi('check/promo_code', data, onSuccessPromotion, onFailPromotion)
  }
  const onSuccessPromotion = (data) => {
    setIsLoading(false)
    props.setConfirmedPromotion({ 
      discountAmount: data.data.orderTotalDiscount,
      promotionCode
    })    
  }
  const onFailPromotion = (errMessage) => {
    setIsLoading(false)
    message.error(errMessage)
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
      <div className={`checkout-right-cart`}>
        <div className='checkout-cart-content'>
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
                  {changeAble && <button onClick={() => {if (el.quantity > 1) subtraction(el.product)}}>-</button>}
                  {el.quantity}
                  {changeAble && <button onClick={() => {
                    if ((el.product.max_order_quantity == 0) || (el.product.max_order_quantity > el.quantity)) {
                      addition(el.product)
                    } else {
                      message.error(`We are sorry, but you can't buy more ${el.product.max_order_quantity} for this product.`)
                    }
                  }}>+</button>}
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
            </div>
          </div>
          )}
          <div className='line' />
          {changeAble ? <>
            <p>Promotion Code</p>        
            <div className='d-flex'>
              <div className='position-relative'>
                <input type='text' value={promotionCode} 
                  onChange={e=>setPromotionCode(e.target.value)}
                />
                {props.promotionCode && 
                  <img src='/images/close-icon.png'
                    className='input-clear-icon'
                    onClick={()=>{
                      setPromotionCode('')
                      props.clearPromotionCode()
                    }}
                  />
                }
              </div>
              <Spin spinning={isLoading} style={{marginLeft: 8}}>
                <button className='btn btn-primary' onClick={checkPromotion} style={{height: 40, marginLeft: 12}} >Apply</button>
              </Spin>
            </div>
            <div className='line' />
          </>: <>
            {props.promotionCode &&
            <div className='d-flex justify-content-between'>
              <p>Promotion Code</p>        
              <p>{props.promotionCode}</p>
            </div>}
          </>}
          <div className='order-summary'>
            <h4>Order Summary</h4>
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
            {props.shippingPrice!=undefined?
            <div className='d-flex justify-content-between'>
              <p>Shipping Price</p>
              <p>{asPrice(props.shippingPrice)}</p>
            </div>
            : ''}
            {props.tax!=undefined?
            <div className='d-flex justify-content-between'>
              <p>Tax</p>
              <p>{asPrice(props.tax)}</p>
            </div>
            : ''}
            {props.promotionCode?
            <div className='d-flex justify-content-between'>
              <p>Promotion Code</p>
              <p>{props.promotionCode}</p>
            </div>
            : ''}
            {props.discountAmount && props.discountAmount > 0 ?
            <div className='d-flex justify-content-between'>
              <p>Discount Amount</p>
              <p>-{asPrice(props.discountAmount)}</p>
            </div>
            : ''}
            <div className='d-flex justify-content-between'>
              <p className='total-text'>Total</p>
              <p className='total-text'><strong>{asPrice(totalPrice)}</strong></p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .product-thumb {
          width: 90px;
        }
        p {
          margin-bottom: 8px;
          opacity: 0.7;
        }
        .image-section {

        }
        .desc-section {
          width: calc(100% - 100px);
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
        .line {
          background-color: #c4c4c4;
          height: 1px;
          width: 100%;
          margin: 24px 0;
          min-width: 292px;
        }
        .checkout-btn {
          margin-top: 24px;
          width: 138px;
          height: 36px;
          background: #1A4798;
          border-radius: 4px;
          color: #fff;
          border: 0 none;
        }
        .total-price p {
          color: #000;
          font-size: 16px;
          opacity: 1;
          font-size: 400;
        }
        .total-text {
          font-size: 16px;
          color: #000;
          font-weight: 700;
        }
      `}</style>
    </>
  )
}
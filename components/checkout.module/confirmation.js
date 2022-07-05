import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { asPrice, asNumber, asDate } from 'utils/text'
import { varLabel } from 'utils/var';
import {Table} from 'antd';
export default function Confirmation(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [productNames, setProductNames] = useState('')
  const [subtotalPrice, setSubtotalPrice] = useState(0)

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Unit price',
      key: 'unit_price',
      dataIndex: 'unit_price',
      render: (text) => <>{asPrice(text)}</>
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (text) => <>{asPrice(text)}</>
    },
  ]

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (props.confirmResult) {
      const orderDetails = props.confirmResult.order.details
      const productNames = orderDetails.map(el=>el.product.title).join(', ')
      let subtotalPrice = 0
      let tData = [];
      orderDetails.map(el=>{
        subtotalPrice += (props.confirmResult.user.type==1?el.product.member_price:el.product.retail_price)*el.quantity
        tData.push({
          title: el.product.title,
          quantity: el.quantity,
          unit_price: el.price,
          price: el.total_amount
        })
      })
      setProductNames(productNames)
      setSubtotalPrice(subtotalPrice)
      setTableData(tData);
      
    }

  }, [props.confirmResult])  

  useEffect(() => {
    dispatch({
      type: 'CLEAR_CART'
    })
  }, [])
  
  const goHome = () => {
    router.push('/')
  }
  const goBackoffice = () => {
    const { username } = props.confirmResult.user
    const password = btoa(props.rawPassword)
    window.location = `${process.env.NEXT_PUBLIC_BACKOFFICE}/login?autologin=${username}&token=${password}`
    // window.open(`${process.env.NEXT_PUBLIC_BACKOFFICE}`, '_blank')
  }
  console.log('aaaaa', props)
  return (
    <div className='wrapper order-completion'>
      <div className='d-flex flex-column align-items-center'>
        {props.confirmResult && 
        <>
          {(props.confirmResult.order.is_flagged===1) && 
          <>
            <img src={'/images/check-failed.svg'} className='confirmed-img' />
            <h2>We have detected fraud activity.</h2>
            <p>            
              Please go to your account and upload picture of your identity card and credit card.
            </p>
          </>}
          {(props.confirmResult.order.is_flagged===2) && 
          <>
            <img src={'/images/check-confirmed.svg'} className='confirmed-img' />
            <h2>Your order is complete!</h2>
            <p className="order-complete-label">
              Welcome to the B-Epic! We’ll take it from here.<br />
              We’ve sent a confirmation email to <strong>{props.confirmResult.user.email}</strong>
            </p>
          </>}
          <div style={{ width: '100%' }}>
            <h4>Details</h4>
            <p>You purchased the <strong>{productNames}</strong></p>
            <p>You will be charged <strong>{asPrice(props.confirmResult.order.order_total_amount)}</strong></p>
            <div className='confirm-box confirm-box-2'>
              <div className='d-flex justify-content-between'>
                <div className='col-sm-12 col-md-6 customer-container'>
                  <p><strong>Customer Information</strong></p>
                  <p>{props.confirmResult.user.first_name+' '+props.confirmResult.user.last_name}</p>
                  <p>{props.confirmResult.user.billing_detail.billing_address}</p>
                  <p>{props.confirmResult.user.billing_detail.billing_address_line2}</p>
                  <p>{`${props.confirmResult.user.billing_detail.billing_city}, ${props.confirmResult.user.billing_detail.billing_state} ${props.confirmResult.user.billing_detail.billing_zipcode}`}</p>
                </div>
                <div className='col-sm-12 col-md-6 customer-container'>
                  <p><strong>Account Type</strong></p>
                  <p>{props.confirmResult.user.type==1?'Independent Distributor':'Preferred Customer'}</p>
                  <p><strong>Your Referer</strong></p>
                  <p>{props.confirmResult.user.sponsor.username ? props.confirmResult.user.sponsor.username : props.confirmResult.user.username}</p>
                </div>
              </div>
            </div>

            
            <div className='confirm-box'>
              <p><strong>Payment Method</strong></p>
              <p>{varLabel('payment.method', props.confirmResult.user.billing_detail.cc_type)} ending in <strong>{props.confirmResult.user.billing_detail.last_cc_4}</strong></p>
            </div>
            <div className='confirm-box'>
              <p><strong>Line Items</strong></p>
              <Table columns={columns} dataSource={tableData} pagination={false} />
            </div>
            <div className='d-flex justify-content-between'>
              <p>Order Number</p>
              <p>{props.confirmResult.order.order_number}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>Order Date</p>
              <p>{asDate(props.confirmResult.order.created_at)}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>Subtotal</p>
              <p>{asPrice(subtotalPrice)}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>PV</p>
              <p>{asNumber(props.confirmResult.order.order_total_pv)}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>CV</p>
              <p>{asNumber(props.confirmResult.order.order_total_cv)}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>Shipping</p>
              <p>{asPrice(props.confirmResult.order.shipping_price)}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p>Tax</p>
              <p>{asPrice(props.confirmResult.order.tax_amount)}</p>
            </div>
            {props.confirmResult.promotion &&
              <div className='d-flex justify-content-between'>
                <p>Promotion Code</p>
                <p>{props.confirmResult.promotion.discount_code}</p>
              </div>
            }            
            {props.confirmResult.order.order_total_discount && Number(props.confirmResult.order.order_total_discount) > 0 &&
              <div className='d-flex justify-content-between'>
                <p>Discount Amount</p>
                <p>-{asPrice(props.confirmResult.order.order_total_discount)}</p>
              </div>
            }
            <div className='d-flex justify-content-between total-price'>
              <p>Total</p>
              <p>{asPrice(props.confirmResult.order.order_total_amount)}</p>
            </div>            
            <div className='d-flex justify-content-center'>
              <button className='btn btn-seconFry btn-back' onClick={goHome}>
                Return to Homepage
              </button>
              <button className='btn btn-primary' onClick={goBackoffice}>
                Access My Account
              </button>
            </div>
          </div>
        </>
      }
      </div>
      <style jsx>{`
        .wrapper {
          width: 700px;
          margin: 30px auto;
        }
        @media (max-width: 700px) {
          .wrapper {
            width: calc(100% - 20px);
            margin-left: 10px;
          }
          .confirm-box .d-flex {
            flex-direction: column;
          }
        }
        @media (max-width: 768px) {
          .confirm-box-2 .d-flex {
            flex-direction: column;
          }
        }
        h2 {
          color: #1A4798;
          font-size: 24px;
          margin-top: 12px;
        }
        h4 {
          color: #1a4798;
          font-size: 20px;
          margin-top: 24px;
        }
        .confirmed-img {
          width: 60px; height: 60px;
        }
        .btn-checkout {
          margin: 0 8px;
        }
        .confirm-box {
          border: 1px solid #E2E2E2;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 24px;
          margin: 20px 0;
        }
        .total-price {
          font-size: 16px;
          font-weight: 700;
          color: #000;
        }
        .btn-checkout {
          width: 180px;
        }
        .btn-back {
          margin-right: 12px;
        }
      `}</style>
    </div>
  )
}
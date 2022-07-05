import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

export default function ChooseTypeSection(props) {  
  const dispatch = useDispatch()
  const router = useRouter()
  const cookies = new Cookies()
  const handleContinue = () => {
    props.setStep('info-form')
  }
  const handleOk = () => {
    if (props.userType==1) {
      cookies.set('bepicUserType', 2, {path: '/'})
    } else {
      cookies.set('bepicUserType', 1, {path: '/'})
    }
    dispatch({
      type: 'CLEAR_CART'
    })
    router.push('/shop')
  }


  const showConfirmModal = () => {
    Modal.confirm({
      title: 'Your cart will be emptied, as you have selected a different enrollemnt option.',
      icon: <ExclamationCircleOutlined />,
      onOk: handleOk
    })
  }
  return (
    <div className='wrapper'>
      <div className='row justify-content-center'>
        {props.userType==2?
        <div className={`user-type-box2 d-flex flex-column`}
        >
          <h4 className='type-title text-center'>
            YOU HAVE SELECTED PREFERRED CUSTOMER
          </h4>
          <p className="text-center">
            Sign up as a Preferred Customer to take advantage of B-Epic’s premier line of high-performance lifestyle products and get access to great prices and special offers (without becoming a distributor).
          </p>
          <ul>
            <li>Sign up for a customer account for free.</li>
            <li>Order B-Epic products today and anytime!</li>
            <li>Set up monthly autoship subscription so you never run out of your favorite products.</li>
            <li>Save time at checkout with saved shipping and billing preferences.</li>
            <li>Access your order history and track orders online.</li>
          </ul>
          <button onClick={()=>handleContinue(1)} className='btn btn-primary btn-large'>Continue as an Preferred Customer</button>
          <div className={`confirm-change-usertype`}>
            If you want to be independent distributor: <button onClick={() => {showConfirmModal()}} className='btn btn-secondary'>Yes</button>
          </div>
        </div>
        : props.userType==1?
        <div className={`user-type-box2 d-flex flex-column `}
        >
          <h4 className='type-title'>
            YOU HAVE SELECTED INDEPENDENT DISTRIBUTOR
          </h4>
          <p className="text-center">
            Sign up as an Independent Distributor (Brand Partner) to become a B-Epic affiliate so you can generate income by promoting and building your business and referring others to the products.
          </p>
          <ul>
            <li>Earn commissions and bonuses for product sales and new member sign-ups.</li>
            <li>Receive your own personalized replicated website to promote your B-Epic business.</li>
            <li>Get access to B-Epic’s business, marketing, and ordering system / online dashboard.</li>
            <li>Plus, get discounted prices on products, exclusive packs, and special programs.</li>
          </ul>
          <button onClick={()=>handleContinue()} className='btn btn-primary btn-large'>Continue as an Independent Distributor</button>
          <div className={`confirm-change-usertype`}>
            If you want to be preferred customer: <button onClick={() => {showConfirmModal()}} className='btn btn-secondary'>Yes</button>
          </div>
        </div>
        : ''}
      </div>
      <div className='d-flex justify-content-center'>
        
      </div>
      <style jsx>{`
        .wrapper {
          margin-bottom: 30px;
        }
        .confirm-change-usertype {
          margin-top: 20px;
          text-align: center;
        }
        .confirm-change-usertype button {
          width: 100px;
          margin-left: 30px;
        }
        .checkout-title {
          margin-bottom: 20px;
        }
        .type-title {
          color: #6C757D;
          font-size: 16px;
          text-transform: uppercase;
          text-align: center;
        }
        ul {
          list-style: disc;
          padding-left: 18px;
        }
        .btn-primary {
          margin-top: 24px;
        }
        .user-type-box2 {
          width: 480px;
        }
        @media (min-width: 1024px) {
          .wrapper > div {
            flex-direction: row;
          }
        }
        @media (max-width: 1024px) {
          .wrapper > div {
            align-items: center;
          }
          .user-type-box2 {
            margin-top: 10px;
            margin-bottom: 20px;
          }
        }
        @media (max-width: 480px) {
          .user-type-box2 {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
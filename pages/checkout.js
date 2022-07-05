import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callPostApi } from 'utils/api'
import { message, Modal } from 'antd'
import { useRouter } from 'next/router'
import moment from 'moment'
import Layout from "components/layouts/layout";
import ConfirmEnrollerModal from 'components/checkout.module/confirm-enroller-modal'
import StepBar from 'components/checkout.module/step-bar'
import SideCart from 'components/checkout.module/side-cart'
import ChooseTypeSection from 'components/checkout.module/choose-type-section'
import InfoForm from 'components/checkout.module/info-form'
import ShippingForm from 'components/checkout.module/shipping-form'
import BillingForm from 'components/checkout.module/billing-form'
import Confirmation from 'components/checkout.module/confirmation'
import Cookies from 'universal-cookie'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Spin } from 'antd'

export default function Checkout() {
  const router = useRouter()
  const cookies = new Cookies()
  const [isLoading, setIsLoading] = useState(false)
  const orderDetails = useSelector(state=>state.checkout.orderDetails)
  const distCenter = useSelector(state=>state.mlm.distCenter)
  const yourCountry = useSelector(state=>state.mlm.yourCountry)
  const [step, setStep] = useState('choose-type') // choose-type, info-form, credit-form, billing-form, confirmation
  // const [userType, setUserType] = useState(0)
  const userType = cookies.get('bepicUserType')
  const referer = useSelector(state=>state.mlm.referer)
  const defaultReferer = useSelector(state=>state.mlm.defaultReferer)
  const isConfirmedReferer = useSelector(state=>state.mlm.isConfirmedReferer)
  const [personalData, setPersonalData] = useState({
    first_name: '', last_name: '',
    email: '', phone: '', username: '',
    ownership_name: '',
    password: '', passwordConfirm: ''
  })
  const [billingData, setBillingData] = useState({
    billing_address: '', billing_address_line2: '',
    billing_city: '', billing_state: '',
    billing_zipcode: '', billing_country: 'US',
    cc_name: '', cc_type: '',
    cc_number: '', cc_cvv: '',
    cc_expiry_month: '', cc_expiry_year: '',
  })
  const [shippingData, setShippingData] = useState({
    shipping_address: '', shipping_address_line2: '',
    shipping_city: '', shipping_state: '',
    shipping_zipcode: '', shipping_country: 'US'
  })
  const [promotionCode, setPromotionCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [tax, setTax] = useState(undefined)
  const [shippingPrice, setShippingPrice] = useState(undefined)
  const [isSameAddress, setIsSameAddress] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isAutoship, setIsAutoship] = useState(false)
  const [autoshipData, setAutoshipData] = useState({
    day_of_month: ''
  })
  const [confirmResult, setConfirmResult] = useState(undefined)

  /*
  useEffect(() => {
    if (distCenter && orderDetails.length>0 ) {
      getShippingPrice()
    }
  }, [distCenter, orderDetails, shippingData])
  */

  const getShippingPrice = () => {
    setShippingPrice(0)
    let data = {
      shippingDetail: {
        ...shippingData,
        dist_center_id: distCenter.id,
      },
      orderDetails: orderDetails.map(el => ({ product_id: el.product.id, quantity: el.quantity }))
    }
    setIsLoading(true);
    callPostApi(`check/shipping_price`, data, onGetShippingPrice, onFailShippingPrice)
  }
  const onGetShippingPrice  = (data) => {
    setIsLoading(false);
    setShippingPrice(data.data.shippingPrice)
  }
  const onFailShippingPrice = () => {
    setIsLoading(false);
  }
  const handleCheckout = () => {
    let data = {
      user: {
        type: userType,
        first_name: personalData['first_name'], 
        last_name: personalData['last_name'],
        email: personalData['email'].toLowerCase().trim(), 
        phone: personalData['phone'],
        username: personalData['username'].toLowerCase().trim(), 
        ownership_name: personalData['ownership_name'].trim(),
        password: personalData['password'],
        sponsor_id: referer.id,
      },
      shippingDetail: {
        ...shippingData,
        dist_center_id: distCenter.id,
      },
      billingDetail: {
        cc_name: billingData['cc_name'].trim(), 
        cc_type: billingData['cc_type'],
        cc_number: billingData['cc_number'], 
        cc_cvv: billingData['cc_cvv'],
        cc_exp_date: billingData['cc_expiry_month']+'/'+billingData['cc_expiry_year'],
        billing_address: !isSameAddress?billingData.billing_address:shippingData.shipping_address,
        billing_address_line2: !isSameAddress?billingData.billing_address_line2:shippingData.shipping_address_line2,
        billing_city: !isSameAddress?billingData.billing_city:shippingData.shipping_city,
        billing_state: !isSameAddress?billingData.billing_state:shippingData.shipping_state,
        billing_zipcode: !isSameAddress?billingData.billing_zipcode:shippingData.shipping_zipcode,
        billing_country: !isSameAddress?billingData.billing_country:shippingData.shipping_country,                
      },      
    }
    let orderDetails_ = []
    for (let item of orderDetails) {
      orderDetails_.push({
        product_id: item.product.id,
        quantity: item.quantity,
      })
    }
    data['orderDetails'] = orderDetails_
    if (promotionCode) data['promoCode'] = promotionCode
    if (isAutoship) {
      data['autoship'] = autoshipData;
    }
    console.log("last-------->", data);
    setIsSubmiting(true)
    callPostApi(`checkout`, data,  onSuccessCheckout, onFailCheckout)    
  }
  const onSuccessCheckout = (data) => {
    setIsSubmiting(false)
    setStep('confirmation')
    setConfirmResult(data.data)
  }
  const onFailCheckout = (errMessage) => {
    setIsSubmiting(false)
    message.error(errMessage)
  }
  const setConfirmedPromotion = ({discountAmount, promotionCode}) => {
    setPromotionCode(promotionCode)
    setDiscountAmount(discountAmount)
  }
  const goProducts = () => {
    router.push('/shop')
  }
  const checkTax = () => {
    let orderDetails_ = []
    for (let item of orderDetails) {
      orderDetails_.push({
        product_id: item.product.id,
        quantity: item.quantity,
      })
    }
    const data = {
      user: {
        type: userType,
      },
      shippingDetail: {
        ...shippingData,
        dist_center_id: distCenter.id,
      },
      orderDetails: orderDetails_,
      order: {
        shipping_price: shippingPrice
      }
    }
    callPostApi(`check/tax`, data,  onGetTax, onFailTax)
  }
  const handleConfirm = () => {
    setStep('billing-form')
  }
  const confirmToBilling = () => {
    Modal.confirm({
      title: 'You will not change cart items anymore.',
      icon: <ExclamationCircleOutlined />,
      onOk: handleConfirm
    })
  }

  const onGetTax = (data) => {
    setTax(data.data.taxAmount)
    message.success(`Your tax amount is $${data.data.taxAmount}`)
    confirmToBilling()
  }
  const onFailTax = (errorMessage) => {
    message.error(errorMessage)
  }
  const clearPromotionCode = () => {
    setPromotionCode('')
    setDiscountAmount(0)
  }

  useEffect(() => {
    if (!confirmResult && shippingPrice && step == "shipping-form") {
      checkTax()
    }
  }, [shippingPrice])

  if (!confirmResult && orderDetails.length==0) {
    return (
      <Layout pageTitle="Checkout">
        <div className='container'>
          <div style={{ padding: '160px 0'}}>
            <p className='text-center'>There are no items.</p>
            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary' onClick={goProducts}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout pageTitle="Checkout">
      <div className='checkout-wrapper'>
        {step!='confirmation' && 
        <>
          <div className='left-section checkout-section'>
            <div className='main-content'>
              <h2>CHECKOUT</h2>
              <StepBar step={step} />
              <div className="check-steps-details">
                {step=='choose-type' && 
                  <ChooseTypeSection 
                    userType={userType}
                    setStep={setStep}
                  />
                }
                {step=='info-form' && 
                  <InfoForm 
                    personalData={personalData}
                    setPersonalData={setPersonalData}
                    setStep={setStep}
                  />
                }
                {step=='shipping-form' && 
                  <ShippingForm 
                    shippingData={shippingData}
                    setShippingData={setShippingData}
                    setStep={setStep}
                    getShippingPrice={getShippingPrice}
                    isLoading={isLoading}
                  />
                }
                {step=='billing-form' && 
                  <BillingForm 
                    billingData={billingData}
                    setBillingData={setBillingData}
                    userType={userType}
                    isSameAddress={isSameAddress}
                    setIsSameAddress={setIsSameAddress}
                    handleCheckout={handleCheckout}
                    isAutoship={isAutoship}
                    setIsAutoship={setIsAutoship}
                    autoshipData={autoshipData}
                    setAutoshipData={setAutoshipData}
                    setStep={setStep}
                    tax={tax}
                    isSubmiting={isSubmiting}
                  />
                }            
              </div>  
            </div>
          </div>
          <SideCart 
            checkoutCart={true}
            promotionCode={promotionCode}
            userType={userType}
            discountAmount={discountAmount}
            shippingPrice={shippingPrice}
            tax={tax}
            isSameAddress={isSameAddress}
            setConfirmedPromotion={setConfirmedPromotion}
            clearPromotionCode={clearPromotionCode}
            step={step}
          />
        </>
        }
        {step=='confirmation' && 
          <Confirmation 
            confirmResult={confirmResult}
            rawPassword={personalData['password']}
          />
        }

        {(!isConfirmedReferer && defaultReferer) ? 
          <ConfirmEnrollerModal />
        : ''}
        <style jsx>{`
          
        `}</style>
      </div>
    </Layout>
  )
}

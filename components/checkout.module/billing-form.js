import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { message, Popconfirm, Spin } from 'antd'
import moment from 'moment'
import { countries, statesByCountry } from 'utils/var/country'
import { callPostApi } from 'utils/api'
import { DatePicker } from 'antd'

export default function BillingForm(props) {
  const [formData, setFormData] = useState(props.billingData)
  const [states, setStates] = useState([])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [autoshipData, setAutoshipData] = useState(props.autoshipData)
  const [errors, setErrors] = useState({
    billing_country_error: '',
    billing_state_error: '',
    billing_city_error: '',
    billing_address_error: '',
    billing_zipcode_error: '',
    cc_name_error: '',
    cc_type_error: '',
    cc_number_error: '',
    cc_cvv_error: '',
    cc_expiry_month_error: '',
    cc_expiry_year_error: '',
    day_of_month_error: ''
  })

  var d = new Date()
  var currentYear = d.getFullYear().toString().substr(-2)*1
  var years = []
  for (let i=currentYear; i<=currentYear+20; i++) {
    years.push(i)
  }

  useEffect(() => {
    setStates(statesByCountry(formData.billing_country))
  }, [formData.billing_country])

  const onChangeForm = (field, value) => {
    let formData_ = { ...formData, [field]: value }
    setFormData(formData_)
    props.setBillingData(formData_)
  }
  const onChangeAutoship = (field, value) => {
    let autoshipData_ = { ...autoshipData, [field]: value }
    setAutoshipData(autoshipData_)
    props.setAutoshipData(autoshipData_)
  }
  const checkValid = () => {
    let errors_ = {
      billing_country_error: '',
      billing_state_error: '',
      billing_city_error: '',
      billing_address_error: '',
      billing_zipcode_error: '',
      cc_name_error: '',
      cc_type_error: '',
      cc_number_error: '',
      cc_cvv_error: '',
      cc_expiry_month_error: '',
      cc_expiry_year_error: '',
      day_of_month_error: ''
    }
    let regex = /^\d{3}$/i

    if (!formData.cc_name) {
      errors_['cc_name_error'] = "Required"
    }
    if (!formData.cc_type) {
      errors_['cc_type_error'] = "Required"
    }
    if (!formData.cc_number) {
      errors_['cc_number_error'] = "Required"
    }
    if (!formData.cc_cvv) {
      errors_['cc_cvv_error'] = "Required"
    } else if (regex.exec(formData.cc_cvv) == null) {
      errors_['cc_cvv_error'] = "CVV Number should be 3 digit numbers"
    }
    if (!formData.cc_expiry_month) {
      errors_['cc_expiry_month_error'] = "Required"
    }
    if (!formData.cc_expiry_year) {
      errors_['cc_expiry_year_error'] = "Required"
    }

    if (!props.isSameAddress) {
      if (!formData.billing_country) {
        errors_['billing_country_error'] = "Required"
      }
      if (!formData.billing_state) {
        errors_['billing_state_error'] = "Required"
      }
      if (!formData.billing_city) {
        errors_['billing_city_error'] = "Required"
      } else if (formData.billing_city.length>190) {
        errors_['billing_city_error'] = "Billing City length too long"
      }
      if (!formData.billing_address) {
        errors_['billing_address_error'] = "Required"
      } else if (formData.billing_address.length>190) {
        errors_['billing_address_error'] = "Billing address length too long"
      }
      if (!formData.billing_zipcode) {
        errors_['billing_zipcode_error'] = "Required"
      }
    }
    if (props.isAutoship) {
      if (autoshipData.day_of_month=='') {
        errors_['day_of_month_error'] = "Required"
      }
    }
    if (errors_.billing_country_error || errors_.billing_state_error || errors_.billing_city_error || errors_.billing_address_error || errors_.billing_zipcode_error || errors_.cc_name_error || errors_.cc_type_error || errors_.cc_number_error || errors_.cc_cvv_error || errors_.cc_expiry_month_error || errors_.cc_expiry_year_error || errors_.day_of_month_error ) {
      setErrors(errors_)
    } else {
      setErrors(errors_)
      return true
    }
  }
  const handleCheckout = () => {
    if (checkValid()) {
      props.handleCheckout()
    }    
  }

  return (
    <div className='checkout-form'>
      <h4 className='checkout-title'>
        Payment Information
      </h4>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Name on Card*</label><br/>
          <input type='text'
            value={formData.cc_name} 
            onChange={e=>onChangeForm('cc_name', e.target.value)} /><br/>
            {errors.cc_name_error && <label className="input-error">{errors.cc_name_error}</label>}
        </div>
        <div className='col-sm-6 selectdiv'>
          <label>Card Type*</label><br/>
          <select value={formData.cc_type}
            onChange={e=>onChangeForm('cc_type', e.target.value)}>
            <option value=''></option>
            <option value={1}>Visa</option>
            <option value={2}>Mastercard</option>
            <option value={3}>Discover</option>
            <option value={4}>Amex</option>
            <option value={5}>Diners</option>
          </select><br/>
            {errors.cc_type_error && <label className="input-error">{errors.cc_type_error}</label>}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-9'>
          <label>Credit Card Number*</label><br/>
          <input type='text'
            value={formData.cc_number} 
            onChange={e=>onChangeForm('cc_number', e.target.value)} /><br/>
            {errors.cc_number_error && <label className="input-error">{errors.cc_number_error}</label>}
        </div>
        <div className='col-sm-3'>
          <label>CVV*</label><br/>
          <input type='text'
            value={formData.cc_cvv} 
            onChange={e=>onChangeForm('cc_cvv', e.target.value)} /><br/>
            {errors.cc_cvv_error && <label className="input-error">{errors.cc_cvv_error}</label>}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 selectdiv'>
          <label>Exp Month*</label><br/>
          <select value={formData.cc_expiry_month}
            onChange={e=>onChangeForm('cc_expiry_month', e.target.value)}
            placeholder='Month'
          >
            <option value=''></option>
            {[...Array(12).keys()].map(i => 
            <option value={i<9?'0'+(i+1):(i+1)} key={i}>{i+1}</option>
            )}
          </select><br/>
            {errors.cc_expiry_month_error && <label className="input-error">{errors.cc_expiry_month_error}</label>}
        </div>
        <div className='col-sm-6 selectdiv'>
          <label>Exp Year*</label><br/>
          <select value={formData.cc_expiry_year}
            onChange={e=>onChangeForm('cc_expiry_year', e.target.value)}
            placeholder='Year'
          >
            <option value=''></option>
            {years.map(y => 
            <option value={y} key={y}>20{y}</option>
            )}
          </select><br/>
            {errors.cc_expiry_year_error && <label className="input-error">{errors.cc_expiry_year_error}</label>}
        </div>
      </div>
      <div>
        <label className="billing-checkbox">
          <input type='checkbox' 
            checked={props.isSameAddress}
            onChange={e=>props.setIsSameAddress(e.target.checked)}
          /> Billing Address same as Shipping
        </label>
      </div>
      {!props.isSameAddress?
      <>
        <h4 className='checkout-title billing-info'>
          Billing Address
        </h4>
        <div className='row'>
          <div className='col-sm-6'>
            <label>Address Line 1*</label><br/>
            <input type='text'
              value={formData.billing_address} 
              onChange={e=>onChangeForm('billing_address', e.target.value)} /><br/>
              {errors.billing_address_error && <label className="input-error">{errors.billing_address_error}</label>}
          </div>
          <div className='col-sm-6'>
            <label>Address Line 2</label><br/>
            <input type='text'
              value={formData.billing_address_line2} 
              onChange={e=>onChangeForm('billing_address_line2', e.target.value)} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <label>City*</label><br/>
            <input type='text'
              value={formData.billing_city} 
              onChange={e=>onChangeForm('billing_city', e.target.value)} /><br/>
              {errors.billing_city_error && <label className="input-error">{errors.billing_city_error}</label>}
          </div>
          <div className='col-sm-6 selectdiv'>
            <label>State/Province*</label><br/>
            <select 
              value={formData.billing_state}
              onChange={e=>onChangeForm('billing_state', e.target.value)}
            >
              <option value=''></option>
              {states.map((state, index) =>
              <option value={state['name']} key={index}>{state['name']}</option>
              )}
            </select><br/>
            {errors.billing_state_error && <label className="input-error">{errors.billing_state_error}</label>}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <label>Zip/Postal code*</label><br/>
            <input type='text'
              value={formData.billing_zipcode} 
              onChange={e=>onChangeForm('billing_zipcode', e.target.value)} /><br/>
              {errors.billing_zipcode_error && <label className="input-error">{errors.billing_zipcode_error}</label>}
          </div>
          <div className='col-sm-6 selectdiv'>
            <label>Country*</label><br/>
            <select 
              value={formData.billing_country}
              onChange={e=>onChangeForm('billing_country', e.target.value)}
              disabled
            >
              <option value=''></option>
              {countries.map((country, index) =>
              <option value={country['value']} key={index}>{country['label']}</option>
              )}
            </select><br/>
            {errors.billing_country_error && <label className="input-error">{errors.billing_country_error}</label>}
          </div>
        </div>
      </>
      : ''}
      <div className='d-flex justify-content-between action-row' style={{ marginTop: 24 }}>
        <div>
          <button onClick={()=>props.setStep('shipping-form')} className='btn btn-secondary'>Prev</button>
        </div>
        <div className='d-flex align-items-center'>
          {/*
          <label style={{ margin: '0 8px 0 0'}}>
            <input type='checkbox'
              checked={props.isAutoship}
              onChange={e=>props.setIsAutoship(e.target.checked)}
            />
            Set as Autoship&nbsp;&nbsp;
          </label>
          */}
          <Popconfirm
            onConfirm={handleCheckout}
            okText='Yes' cancelText='No' title='Are you sure?'
          >
            <Spin spinning={props.isSubmiting}>
              <button className='btn btn-primary'
                disabled={!isConfirmed || props.tax==undefined}
              >
                Complete Purchase
              </button>
            </Spin>
          </Popconfirm>
        </div>
      </div>
      {props.isAutoship?
        <div className='row'>
          <div className='col-sm-6'>
            <label>Billing day every month*</label><br/>
            <input type='numeric' value={autoshipData.day_of_month}
              onChange={e=>onChangeAutoship('day_of_month', e.target.value)}
            /><br/>
            {errors.day_of_month_error && <label className="input-error">{errors.day_of_month_error}</label>}
          </div>
        </div>
      : ''
      }
      <div className='agreement'>
        <label className="billing-checkbox">
          <input type='checkbox'
            checked={isConfirmed}
            onChange={e=>setIsConfirmed(e.target.checked)}
          />&nbsp;
          I understand and agree to the Bepic policies and procedures listed on this website.
        </label>
      </div>
      <style jsx>{`
        .btn-checkout {
          width: 160px;
          margin-left: 12px;
        }
        .btn-checktax {
          width: 200px;
        }
        .agreement {
          margin-top: 12px;
        }
        input[type=checkbox] {
          width: 18px;
          height: 18px;
        }
        .action-row {
          flex-direction: row !important;
          margin-top: 24px;
        }
        @media (max-width: 480px) {
          .btn-checkout {
            margin-left: 0;
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  )
}
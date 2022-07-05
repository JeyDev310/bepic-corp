import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { message, Popconfirm, Spin, Button } from 'antd'
import { countries, statesByCountry } from 'utils/var/country'

export default function ShippingForm(props) {
  const [formData, setFormData] = useState(props.shippingData)
  const [states, setStates] = useState([])
  const [errors, setErrors] = useState({
    shipping_country_error: '',
    shipping_state_error: '',
    shipping_city_error: '',
    shipping_address_error: '',
    shipping_zipcode_error: '',
  })

  useEffect(() => {
    setStates(statesByCountry(formData.shipping_country))
  }, [formData.shipping_country])

  const onChangeForm = (field, value) => {
    let formData_ = { ...formData, [field]: value }
    setFormData(formData_)
    props.setShippingData(formData_)
  }
  const handleContinue = () => {
    if (props.isLoading) return;
    let errors_ = {
      shipping_country_error: '',
      shipping_state_error: '',
      shipping_city_error: '',
      shipping_address_error: '',
      shipping_zipcode_error: '',
    }

    if (!formData.shipping_country) {
      errors_['shipping_country_error'] = "Required"
    }
    if (!formData.shipping_state) {
      errors_['shipping_state_error'] = "Required"
    }
    if (!formData.shipping_city) {
      errors_['shipping_city_error'] = "Required"
    } else if (formData.shipping_city.length>190) {
      errors_['shipping_city_error'] = "Shipping city length too long"
    }
    if (!formData.shipping_address) {
      errors_['shipping_address_error'] = "Required"
    } else if (formData.shipping_address.length>190) {
      errors_['shipping_address_error'] = "Shipping address length too long"
    }
    if (!formData.shipping_zipcode) {
      errors_['shipping_zipcode_error'] = "Required"
    }

    if (errors_.shipping_country_error || errors_.shipping_state_error || errors_.shipping_city_error || errors_.shipping_address_error ||  errors_.shipping_zipcode_error )  {
      setErrors(errors_)
    } else {
      setErrors(errors_)
      props.getShippingPrice()
    }
  }  

  return (
    <div className='checkout-form'>
      <h4 className='checkout-title'>
        Shipping Address
      </h4>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Address Line 1*</label><br/>
          <input type='text'
            value={formData.shipping_address} 
            onChange={e=>onChangeForm('shipping_address', e.target.value)} /><br/>
            {errors.shipping_address_error && <label className="input-error">{errors.shipping_address_error}</label>}
        </div>
        <div className='col-sm-6'>
          <label>Address Line 2</label><br/>
          <input type='text'
            value={formData.shipping_address_line2} 
            onChange={e=>onChangeForm('shipping_address_line2', e.target.value)} />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>City*</label><br/>
          <input type='text'
            value={formData.shipping_city} 
            onChange={e=>onChangeForm('shipping_city', e.target.value)} /><br/>
            {errors.shipping_city_error && <label className="input-error">{errors.shipping_city_error}</label>}
        </div>
        <div className='col-sm-6 selectdiv'>
          <label>State/Province*</label><br/>
          <select 
            value={formData.shipping_state}
            onChange={e=>onChangeForm('shipping_state', e.target.value)}
          >
            <option value=''></option>
            {states.map((state, index)=>
            <option value={state['name']} key={index}>{state['name']}</option>
            )}
          </select><br/>
          {errors.shipping_state_error && <label className="input-error">{errors.shipping_state_error}</label>}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Zip/Postal Code*</label><br/>
          <input type='text'
            value={formData.shipping_zipcode} 
            onChange={e=>onChangeForm('shipping_zipcode', e.target.value)} /><br/>
            {errors.shipping_zipcode_error && <label className="input-error">{errors.shipping_zipcode_error}</label>}
        </div>
        <div className='col-sm-6 selectdiv'>
          <label>Country*</label><br/>
          <select 
            value={formData.shipping_country}
            onChange={e=>onChangeForm('shipping_country', e.target.value)}
            disabled
          >
            <option value=''></option>
            {countries.map(country=>
            <option value={country['value']}>{country['label']}</option>
            )}
          </select><br/>
          {errors.shipping_country_error && <label className="input-error">{errors.shipping_country_error}</label>}
        </div>
      </div>
      <div className='d-flex justify-content-between action-row' style={{ marginTop: 24 }}>
        <div>
          <button onClick={()=>props.setStep('info-form')} className='btn btn-secondary'>Prev</button>
        </div>
        <div className='d-flex'>
          <Button loading={props.isLoading} type="primary" className='btn btn-primary' onClick={handleContinue}>Continue</Button>
        </div>
      </div>
      <style jsx>{`
      `}</style>
    </div>
  )
}
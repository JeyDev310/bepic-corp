import { useState, useEffect } from 'react'
import { message } from 'antd'

export default function InfoForm(props) {
  const [formData, setFormData] = useState(props.personalData)
  const onChangeForm = (field, value) => {
    let formData_ = { ...formData, [field]: value }
    setFormData(formData_)
    props.setPersonalData(formData_)
  }
  const [errors, setErrors] = useState({
    first_name_error: '',
    last_name_error: '',
    email_error: '',
    phone_error: '',
    username_error: '',
    ownership_name_error: '',
    password_error: '',
    passwordConfirm_error: '',
  })
  const handleContinue = () => {
    let errors_ = {
      first_name_error: '',
      last_name_error: '',
      email_error: '',
      phone_error: '',
      username_error: '',
      ownership_name_error: '',
      password_error: '',
      passwordConfirm_error: '',
    }
    let regex = /^[a-z]+[a-z0-9_]+$/i
    let email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i 
    if (!formData.first_name) {
      errors_['first_name_error'] = "Required"
    }
    if (!formData.last_name) {
      errors_['last_name_error'] = "Required"
    }
    if (!formData.email) {
      errors_['email_error'] = "Required"
    } else if (email_regex.exec(formData.email) == null) {
      errors_['email_error'] = "Enter valid email"           
    }
    if (!formData.username) {
      errors_['username_error'] = "Required"
    } else if (regex.exec(formData.username) == null) {
      errors_['username_error'] = "Please input username as alphanumeric"           
    } else if (formData.username.length>20) {
      errors_['username_error'] = "Please input username less than 20 characters"           
    }
    if (!formData.phone) {
      errors_['phone_error'] = "Required"
    }
    if (!formData.ownership_name) {
      errors_['ownership_name_error'] = "Required"
    }
    // regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!~#^%*?&()+\-/<>:;|{}\[\]_])[A-Za-z\d@$!~#^%*?&()+\-/<>:;|{}\[\]_]{8,}$/i
    regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
    if (!formData.password) {
      errors_['password_error'] = "Required"
    } else if (regex.exec(formData.password) == null) {
      errors_['password_error'] = "Password should contain uppercase, lowercase, numeric, special characters and longer than 8 characters."
    }
    if (formData.password!=formData.passwordConfirm) {
      errors_['passwordConfirm_error'] = "Confirm password does not match"
    }


    if (errors_.first_name_error || errors_.last_name_error || errors_.email_error || errors_.phone_error ||  errors_.username_error || errors_.ownership_name_error || errors_.password_error || errors_.passwordConfirm_error)  {
      setErrors(errors_)
    } else {
      setErrors(errors_)
      props.setStep('shipping-form')
    }
  }
  return (
    <div className='checkout-form'>
      <h4 className='checkout-title'>
        User Information
      </h4>
      <div className='row'>
        <div className='col-sm-6'>
          <label>First Name*</label><br/>
          <input type='text'
            value={formData.first_name} 
            onChange={e=>onChangeForm('first_name', e.target.value)} /><br/>
          {errors.first_name_error && <label className="input-error">{errors.first_name_error}</label>} 
        </div>
        <div className='col-sm-6'>
          <label>Last Name*</label><br/>
          <input type='text'
            value={formData.last_name} 
            onChange={e=>onChangeForm('last_name', e.target.value)} /><br/>
            {errors.last_name_error && <label className="input-error">{errors.last_name_error}</label>}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Email*</label><br/>
          <input type='text'
            value={formData.email} 
            onChange={e=>onChangeForm('email', e.target.value)} /><br/>
            {errors.email_error && <label className="input-error">{errors.email_error}</label>}
        </div>
        <div className='col-sm-6'>
          <label>Phone*</label><br/>
          <input type='text'
            value={formData.phone} 
            onChange={e=>onChangeForm('phone', e.target.value)} /><br/>
            {errors.phone_error && <label className="input-error">{errors.phone_error}</label>}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Username*</label><br/>
          <input type='text'        
            value={formData.username} 
            onChange={e=>onChangeForm('username', e.target.value)} /><br/>
            {errors.username_error && <label className="input-error">{errors.username_error}</label>}
        </div>
        <div className='col-sm-6'>
          <label>Company Name*</label><br/>
          <input type='text'        
            value={formData.ownership_name} 
            onChange={e=>onChangeForm('ownership_name', e.target.value)} /><br/>
            {errors.ownership_name_error && <label className="input-error">{errors.ownership_name_error}</label>}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Password*</label><br/>
          <input type='password'
            value={formData.password} 
            onChange={e=>onChangeForm('password', e.target.value)} /><br/>
            {errors.password_error && <label className="input-error" style={{paddingTop: 10}}>{errors.password_error}</label>}
        </div>
        <div className='col-sm-6'>
          <label>Confirm Password*</label><br/>
          <input type='password'
            value={formData.passwordConfirm} 
            onChange={e=>onChangeForm('passwordConfirm', e.target.value)} /><br/>
            {errors.passwordConfirm_error && <label className="input-error">{errors.passwordConfirm_error}</label>}
        </div>
      </div>
      <div className='d-flex justify-content-between action-row'>
        <button onClick={()=>props.setStep('choose-type')} className='btn btn-secondary'>Prev</button>
        <button onClick={handleContinue} className='btn btn-primary'>Continue</button>
      </div>
      <style jsx>{`
      `}</style>
    </div>
  )
}
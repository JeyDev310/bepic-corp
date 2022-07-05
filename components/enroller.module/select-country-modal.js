import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { callGetApi } from 'utils/api'
import { message, Modal, Select, Button } from 'antd'
import { countries, countryCodeByName } from 'utils/var/country'
import Cookies from 'universal-cookie'

export default function SelectCountryModal(props) {
  const dispatch = useDispatch()
  const [country, setCountry] = useState('US')
  const [searchInput, setSearchInput] = useState('')

  const onSearch = (v) => {
    setSearchInput(v)
  }

  const handleSave = () => {
    if (country=='') {
      message.error('Please select one country.')
      return
    }
    
    callGetApi(`dist_center/${country}`, onGetDistCenter, onFailDistCenter)
  }
  const onGetDistCenter = (data) => {    
    dispatch({
      type: 'SET_COUNTRY',
      payload: country
    })
    dispatch({
      type: 'FETCH_DISTRIBUTION_CENTER_SUCCESS',
      payload: data.data
    })
    const cookies = new Cookies()
    cookies.set('bepicCountry', country, { path: '/', maxAge: 2592000 })
    cookies.set('bepicDistCenter', data.data, { path: '/', maxAge: 2592000 })
  }
  const onFailDistCenter = (errMessage) => {
    message.error('No service for this country, Select another country.')
  }

  useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json/')
    .then( res => res.json())
    .then(res => {
      setCountry(countryCodeByName(res.country))
      // console.log("Country: ", response.country);
    })
    .catch((data, status) => {
      console.log('Request failed');
    })
    /*
    fetch('http://ip-api.com/json').then(res=>res.json())
    .then(res=>{
      setCountry(res.countryCode)
    })
    */
  }, [])

  return (
    <Modal
      width={320}
      closable={false}
      visible={true}
      footer={null}
      centered
    >
      <h4>Select your country</h4>
      <p>Enter your country below to ensure product availability.</p>
      <div>
        <Select 
          value={country}
          onChange={v=>setCountry(v)} 
          style={{ width: '100%' }}
          placehodler={'Please select your country.'}
          showSearch
          onSearch={onSearch}
          showArrow={false}
          filterOption={false}
          notFoundContent={null}
        >
          {countries.filter(e=>e.label.toLowerCase().indexOf(searchInput.toLowerCase())>=0).map(e=>
            <Select.Option value={e.value}>{e.label}</Select.Option>
          )}          
        </Select>
      </div>
      <div style={{ marginTop: 12 }}>
        <Button type='primary' onClick={handleSave}>
          Submit
        </Button>
      </div>
    </Modal>
  )
}
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactCountryFlag from 'react-country-flag';
import Link from 'next/link'
import { useRouter } from 'next/router'
import EnrollerModal from 'components/enroller.module/enroller-modal1'
import { countryCodeByName } from 'utils/var/country'
import { callGetApi } from 'utils/api'
import Cookies from 'universal-cookie'

export default function TopHeader() {
  const cookies = new Cookies()
  const { pathname } = useRouter()
  const defaultReferer = useSelector(state=>state.mlm.defaultReferer)
  const userType = cookies.get('bepicUserType')
  const [isOpenedEnroller, setIsOpenedEnroller] = useState(false)
  const [country, setCountry] = useState('US')
  const [countryLabel, setCountryLabel] = useState('United States')
  const dispatch = useDispatch()  

  const onGetDistCenter = (res) => {
    dispatch({
      type: 'FETCH_DISTRIBUTION_CENTER_SUCCESS',
      payload: res.data
    })
    const cookies = new Cookies()
    cookies.set('bepicCountry', country, { path: '/', maxAge: 2592000 })
    cookies.set('bepicDistCenter', res.data, { path: '/', maxAge: 2592000 })
  }
  const onFailDistCenter = (errMessage) => {
    console.log('No service for this country, Select another country.', errMessage)
  }
  useEffect(() => {
    if (country)
      callGetApi(`dist_center/${country}`, onGetDistCenter, onFailDistCenter)
  }, [country])
  
  useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json')
    .then( res => res.json())
    .then(res => {
      console.log("----->" ,res);
      setCountryLabel(res.country);
      let country = countryCodeByName(res.country);
      setCountry(country)
      dispatch({
        type: 'SET_COUNTRY',
        payload: country
      })      
    })
    .catch((data, status) => {
      console.log('Request failed');
    })
  }, [defaultReferer])

  const openEnroller = () => {
    console.log("open");
    setIsOpenedEnroller(true)
  }

  return (
    <div className="top-header">
      <div className="container-full d-flex justify-content-between">
        <ul className="nav navbar-nav navbar-left">
          <li style={{marginTop: 3}}>
            <a href="#" style={{border: 'none'}}> 
              {userType == 2? "Preferred Customer" : (userType == 1 ? "Independent Distributor": "")}
              <ReactCountryFlag countryCode={country} svg style={{width:35, height:20, marginLeft: 10}} />
              {/* You are in {countryLabel}. */}
            </a>
          </li>
          <li>
            <a href="#"> </a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right "> 
          <li>
            <a href="#" onClick={openEnroller}>Enroller</a>
          </li>
          <li>
            <a href={process.env.NEXT_PUBLIC_BACKOFFICE}><i className='fa fa-user'/>{" "}Member Login</a>
          </li>
        </ul>
      </div>
      {isOpenedEnroller &&
        <EnrollerModal onClose={()=>setIsOpenedEnroller(false)} />
      }
    </div>
  );
}

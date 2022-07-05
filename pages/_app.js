import '../styles/antd.less'
import '../styles/checkout.scss'
import '../styles/globals.scss'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import Cookies from 'universal-cookie';
import store from 'epics/store'
import { callGetApi } from 'utils/api'
import { message } from 'antd'
import { route } from 'next/dist/next-server/server/router'

function MyApp({ Component, pageProps, cookies }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const isConfirmedUserType = useSelector(state=>state.mlm.isConfirmedUserType)  

  const fetchDefaultReferer = () => {
    callGetApi('enroller', onGetDefaultEnroller)
  }
  const onGetDefaultEnroller = (res) => {
    dispatch({
      type: 'FETCH_DEFAULT_ENROLLEE_SUCCESS', 
      payload: res.data
    })
  }
  const fetchReferer = () => {
    var username = ''
    const cookies = new Cookies()
    const savedReferer = cookies.get('bepicReferer')
    if (savedReferer) {
      username = savedReferer
      username = username.toLowerCase().trim()
    } 
    const params = new URLSearchParams(window.location.search)
    if (params.has('referer')) {
      username = params.get('referer')
      username = username.toLowerCase().trim()
    }
    if (username!='') {
      callGetApi(`enroller/${username}`, onGetEnroller, onFailEnroller)
    }
  }
  const onGetEnroller = (res) => {
    dispatch({
      type: 'FETCH_ENROLLEE_SUCCESS', 
      payload: res.data
    })
    // const cookies = new Cookies()
    // cookies.set('bepicReferer', res.data.username, { path: '/', maxAge: 2592000 })
  }
  const onFailEnroller = (err) => {
    dispatch({
      type: 'FETCH_ENROLLEE_FAILURE', 
    })
    message.error('Your referer is not correct.')
  }
  const checkSavedCountry = () => {
    const cookies = new Cookies()
    const savedCountry = cookies.get('bepicCountry')
    if (savedCountry) {
      dispatch({
        type: 'SET_COUNTRY',
        payload: savedCountry
      })
    }
    const savedDistCenter = cookies.get('bepicDistCenter')
    if (savedDistCenter) {
      dispatch({
        type: 'FETCH_DISTRIBUTION_CENTER_SUCCESS',
        payload: savedDistCenter
      })
    }
  }

  useEffect(() => {
    fetchDefaultReferer()
    setTimeout(() => fetchReferer(), 1000)
    // checkSavedCountry()
  }, [])  

  useEffect(() => {
    if (!isConfirmedUserType) {
      if (router.pathname=='/shop' || router.pathname=='/') {
      } else {
        router.push('/')
      }
    }
  }, [isConfirmedUserType])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makeStore = () => store

export default withRedux(makeStore)(MyApp)

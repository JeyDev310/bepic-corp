import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, Spin } from 'antd'
import Layout from "components/layouts/layout";
import ShopBanner from 'components/shop.page/shop-banner'
import EnrollSection from 'components/home.page/enroll-section'
import ProductCard from 'components/shop.page/product-card'
import { callGetApi } from 'utils/api';
import SelectUserTypeModal from 'components/shop.page/select-user-type-modal';
import Cookies from 'universal-cookie'

export default function ShopPage (props) {
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const [userType, setUserType] = useState(cookies.get('bepicUserType'))
  const distCenter = useSelector(state=>state.mlm.distCenter)
  const yourCountry = useSelector(state=>state.mlm.yourCountry)
  const products = useSelector(state=>state.products.products)
  const [isLoading, setIsLoading] = useState(false)
  
  const onChangeUserType = (userType_) => {
    if (userType!=userType_) {
      dispatch({
        type: 'CLEAR_CART'
      })
    }
    cookies.set('bepicUserType', userType_, { path: '/', maxAge: 259200});
    setUserType(userType_);
    loadProducts(userType_);
  }
  const loadProducts = (userType_) => {
    setIsLoading(true)
    dispatch({
      type: 'RECEIVE_PRODUCTS',
      payload: []
    })
    if (!distCenter) return
    const params = {
      page: 1,
      per_page: 100,
      dist_center_id: distCenter.id,
      user_type: userType_,
      country: yourCountry,
    }    
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApi(`products?${q}`, onGetProducts, onFailProducts)
  }
  const onGetProducts = (data) => {
    console.log("------>", data);
    setIsLoading(false)
    dispatch({
      type: 'RECEIVE_PRODUCTS',
      payload: data.data.data
    })
  }
  const onFailProducts = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    if (!distCenter) return

    loadProducts(userType)
  }, [distCenter, userType])

  return (
    <Layout pageTitle='Shop'>
      <ShopBanner />
      {!userType && 
        <SelectUserTypeModal 
          onChangeUserType={onChangeUserType}
        />
      }
      <section id="container-enroll">
        <div className="container">
          <h3>Make Every Day Epic</h3>
          <p>Make every day epic with B-Epic’s premier line of high-performance lifestyle products. Experience the life-changing benefits for yourself! We invite you to try our products risk-free backed by our B-Epic 30-Day Money Back Guarantee.
          To bring you the most innovative, high-quality products on the market today, we’ve sourced the most powerful, proven natural ingredients used in traditional medicines and holistic practices around the world for centuries and enhanced them through modern extract and supplementation technology.</p>
        </div>
        <div className='container'>
          <Spin spinning={isLoading}>
            <div className='row p-0' style={{ minHeight: 250 }}>
              {products.map((product, index) => 
                <ProductCard product={product} key={index}
                />
              )}
            </div>
          </Spin>
        </div>
      </section>     
      
      <EnrollSection />
    </Layout>
  )
}

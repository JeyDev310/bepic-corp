import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import { callGetApi } from 'utils/api'
import Layout from "components/layouts/layout";
import ProductSection from 'components/product.page/product-section'
import ProductDetailSection from 'components/product.page/product-detail-section'
import RelatedProductsSection from 'components/product.page/related-products-section'
import Cookies from 'universal-cookie'

export default function ProductDetailPage() {
  const router = useRouter()
  const distCenter = useSelector(state=>state.mlm.distCenter)
  const cookies = new Cookies()
  const userType = cookies.get('bepicUserType')
  const yourCountry = useSelector(state=>state.mlm.yourCountry)
  const { path } = router.query
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState(undefined)
  
  const loadProductDetail = (path) => {
    setIsLoading(true)
    setProduct(undefined)
    const params = {
      dist_center_id: distCenter.id,
      country: yourCountry,
      user_type: userType,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApi(`products/${path}?${q}`, onGetProduct, onFailProduct)
  }
  const onGetProduct = (data) => {
    setIsLoading(false)
    setProduct(data.data)
  }
  const onFailProduct = () => {
    setIsLoading(false)
    router.push('/')
  }
  useEffect(() => {
    if (!path) return
    if (userType==undefined || !distCenter) return
    document.getElementsByTagName('body')[0].scrollTo(0,0)
    loadProductDetail(path)
  }, [path, userType, distCenter])

  return (
    <Layout>
      {product? 
        <>
          <ProductSection product={product} />
          {product.video_description!='' && 
            <ProductDetailSection product={product} />
          }
          <RelatedProductsSection />
        </>
      :
        <div className='d-flex justify-content-center align-items-center' style={{ height: 450 }}>
          <p>
            <Spin spinning={true} />&nbsp;Loading product...
          </p>
        </div>
      }
    </Layout>
  )
}

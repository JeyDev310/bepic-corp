import { useSelector } from 'react-redux'
import { asPrice, asNumber } from 'utils/text'
import AddCartSection from './add-cart-section'
import FeaturesSection from './features-section'
import Cookies from 'universal-cookie'

export default function ProductSection(props) {
  const cookies = new Cookies()
  const userType = cookies.get('bepicUserType')

  return (
    <section id="product-cart" className="container">
      <div className="row">
        <div className="col-md-5 align-self-center">
          <div className="products-images d-flex justify-content-center align-items-center">
            <img src={props.product.image} />
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6"> 
          <h3>{props.product.title}</h3>
          <h5>
            {asPrice(userType==1?props.product.member_price:props.product.retail_price)}
            &nbsp;&nbsp;&nbsp;
            <span className='small'>{' PV '}</span>
            {asNumber(props.product.pv)}
            &nbsp;&nbsp;<span className='small'>{' CV '}</span>
            {asNumber(props.product.cv)}
          </h5>
          <p>{props.product.short_description}</p>
          {props.product.benefits.length>0 &&
            <FeaturesSection product={props.product} />
          }
          <AddCartSection product={props.product} />
        </div>
      </div>
    </section> 
  )
}

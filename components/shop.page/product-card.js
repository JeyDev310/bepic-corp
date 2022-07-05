import { useSelector } from 'react-redux'
import Link from 'next/link'
import { asPrice } from 'utils/text'
import Cookies from 'universal-cookie'

export default function ProductCard(props) {
  const cookies = new Cookies()
  const userType = cookies.get('bepicUserType')

  return (
    <div className="col-md-4 col-sm-6 ">
      <div className="pro-box">
        <div className='product-image'>
          <img src={props.product.image} />
        </div>
        <h4>{props.product.title}</h4>
        <h6>
          {asPrice(userType==1?props.product.member_price:props.product.retail_price)}
        </h6>
        <Link href={`/product/${props.product.path}`}>SHOP NOW</Link>
      </div>
	</div>
  )
}

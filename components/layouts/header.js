import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from 'antd'

export default function Header() {
  const { pathname } = useRouter()
  const dispatch = useDispatch()
  const [totalItems, setTotalItems] = useState(0)
  const orderDetails = useSelector(state=>state.checkout.orderDetails)

  useEffect(() => {
    let totalItems = 0
    orderDetails.map(el => {
      totalItems += el.quantity*1
    })
    setTotalItems(totalItems)
  }, [orderDetails])

  const handleOpenSideCart = () => {
    if (pathname == "/checkout") return;
    dispatch({
      type: 'OPEN_SIDE_CART'
    })
  }
  
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link href="/">
              <a className="navbar-brand"><img src="/images/logo.png" /></a>
            </Link>
          </div>
          <ul className="mobile-br-ico"> 
            <li className=" "> 
              <Badge count={totalItems}>
                <a onClick={handleOpenSideCart}><img src="/images/Iconcolor.png" /></a> 
              </Badge>
            </li> 
            {/*
            <li className=" "> 
              <a href={process.env.NEXT_PUBLIC_BACKOFFICE}><img src="/images/icon3.png" /></a> 
            </li> 
            */}
          </ul>  
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav all-header cart-nar "> 
              <li className=" "> 
                <Badge count={totalItems}>
                  <a className="cart-btn" onClick={handleOpenSideCart}><img src="/images/Iconcolor.png" /></a> 
                </Badge>
              </li>
              {/*
              <li className=""> 
                <a className="button" href={process.env.NEXT_PUBLIC_BACKOFFICE}>MEMBER LOGIN</a> 
              </li> 
              */}
            </ul>  
            <ul className="nav navbar-nav all-header "> 
              <li className={pathname=="/"?"active":""}> 
                <Link href="/"><a>Home</a></Link>
              </li>
              <li className={pathname=="/about"?"active":""}> 
                <Link href="/about">About</Link> 
              </li>
              <li className={pathname=="/opportunity"?"active":""}> 
                <Link href="/opportunity">Opportunity</Link> 
              </li>
              <li className={pathname=="/shop" || pathname=="/checkout" || pathname.includes('/product/')?"active":""}> 
                <Link href="/shop">Shop</Link> 
              </li> 
              <li className={pathname=="/support"?"active":""}> 
                <Link href="/support">Support</Link> 
              </li> 
            </ul>    
          </div>
        </nav>
      </div>
    </header>
  )
  /*
  return (
    <header className={`${pathname!='/'?'white-header fixed-header':'home-header'}`}>
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" 
              className="navbar-toggle collapsed" 
              data-toggle="collapse" data-target="#navbar" 
              aria-expanded="false" aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <button className='cart-toggle-mobile'>
              <Badge count={totalItems}>
                <a onClick={handleOpenSideCart}><img src="/images/Icon6.png" className="cart-icon" /></a>
              </Badge>
            </button>
            <Link href="/">
              <a className="navbar-brand">
                <img src={pathname=='/'?'/images/logo.png':'/images/logo-blue.png'} />
              </a>
            </Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav"> 
              <li className={pathname=="/"?"active":""}> 
                <Link href="/">Home</Link> 
              </li>
              <li className={pathname=="/about"?"active":""}> 
                <Link href="/about">About</Link> 
              </li>
              <li className={pathname=="/products"?"active":""}> 
                <Link href="/products">Products</Link> 
              </li>
              <li className={pathname=="/opportunity"?"active":""}> 
                <Link href="/opportunity">Opportunity</Link> 
              </li>
              <li className={pathname=="/contact"?"active":""}> 
                <Link href="/contact">Contact</Link> 
              </li>
            </ul>
            <ul className="nav navbar-nav all-header ">
              <li className={`cart-toggle ${pathname=='/'?'hidden':''}`} style={{ marginTop: 21 }}>
                <Badge count={totalItems}>
                  <a onClick={handleOpenSideCart}><img src="/images/Icon6.png" className="cart-icon" /></a>
                </Badge>
              </li>
              <li className=""> 
                <a href={process.env.NEXT_PUBLIC_BACKOFFICE} className="button">MEMBER LOGIN</a> 
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
  */
}
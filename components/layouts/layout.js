import Head from "next/head";
import { useDispatch } from 'react-redux';
import ScrollToTop from "react-scroll-to-top";
import { useRouter } from 'next/router'
import TopHeader from "./top-header";
import Header from "./header";
import Footer from "./footer";
import SideCart from "components/sidecart.module/side-cart"

export default function Layout({ children, pageTitle }) {
  const { pathname } = useRouter()
  const dispatch = useDispatch()
  
  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle + " | " : ""}B-Epic</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" /> 
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>   
        <script src="/js/aos.js"></script> 
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/owl.carousel.js"></script>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Head>
      <TopHeader />
      <Header />
      <div className="main-banner home-baner page-content">
        <div className={`main-content ${pathname=='/'?'page-home':''}`}>
          {children}
        </div>
        <SideCart />
        <Footer />
      </div>
      <ScrollToTop 
        className='scroll-to-top'
        color='#888'
        viewBox={"0 0 256 224"}
      />
    </>
  );
}

import { useEffect } from 'react'
import Link from "next/link";

export default function Footer() {
  useEffect(() => {
    setTimeout(() => {
      $('.loop').owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 10,
        touchDrag : false,
        mouseDrag : false,
        responsiveClass:true,
        responsive:{
          0: { items:1, },
          600: { items:1,  },
          1000:{ items:3, }
        }
      });
    }, 1000)
  }, [])

  return (
    <footer id="footer">
      <div className="container"> 
        <div className="row" >
          <div className="col-md-2">
            <img src="/images/logo.png" />
          </div>

          <div className="col-md-2 copyright">
            <h3>Experience</h3>
            <ul> 
              <li><Link href="/shop">Shop Our Products</Link></li> 
              <li><Link href="/product/19">Take Challenge</Link></li>
              <li><Link href="/opportunity">Join Our Team</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Learn More</h3>
            <ul> 
              <li><Link href="/about">About B-Epic</Link></li>
              <li><Link href="/money_guarantee">B-Epic Guarantee</Link></li>              
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Help &amp; FAQs</h3>            
            <ul> 
              <li><Link href="/support">Member Support</Link></li>
              <li><a href="https://www.bepichq.com/" target="_blank">Member Resource</a></li>
              <li><Link href="/terms_conditions">Terms and Conditions</Link></li>
              <li><Link href="/privacy_policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h3>Connect</h3>
            <ul className="social-bar">
              <li><a href="https://www.facebook.com/BEPIC100EPIC" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="https://www.instagram.com/bepic100epic" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><a href="https://www.youtube.com/channel/UChGbswsRicJCWScvTEXT4aA" target="_blank"><i className="fa fa-youtube" aria-hidden="true"></i></a></li> 
            </ul>
          </div>
        </div>
        <div className="product-disclaimer"> 
          <div className="row" >
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <p>Copyright © 2021 B-Epic Worldwide LLC. All International Rights Reserved.
              </p>
              <p>
              Statements have not been evaluated by the U.S. Food &amp; Drug Administration. Products are not intended to diagnose, treat, cure, or prevent any disease. Results may vary.
              *The Money-Back Guarantee is available only on regular size, single unit product purchases. Sample size, product packs (e.g., Epic Pack and Epic Pack Plus), multi-unit purchases (e.g., Buy 2 Get 1 Free), Promos, and Limited Time Offers (LTOs) do not qualify.
              </p>
            </div>
          </div>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: `
          AOS.init({
            duration: 1200,
          })
        `,}}
      ></script>
    </footer>
  );
}

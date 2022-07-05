import Link from 'next/link'

export default function HomeHtml(props) {
  return (
  <>
    <div className="main-slider">
      <div className="main-slider-box">
        <div className="home-slider "> 
          <div className="row"> 
			      <div className="item mobile-view-item col-lg-7">
					    <img src="/images/banner.png" alt="slide" />
            </div>
            <div className="item col-lg-5 align-self-center">
              <div className="col-s-4">
                <h2>Add more life to <br />your years.</h2>
                <p>Experience the life-changing benefits of B-Epic products.</p>
						    <ul>
						      <li>
                    <Link href="/shop">
                      <a className="yellow-button">LEARN MORE</a>
                    </Link>
                  </li> 
						    </ul>
              </div>
            </div> 
				    <div className="item col-lg-1"></div>
            <div className="item col-lg-6 desktop-view-item align-self-center">
              <img src="/images/banner.png" alt="slide" />
            </div>
          </div>
        </div>
      </div>
    </div> 
	  <section id="university">
      <div className="container">
        <div className="row"> 
          <div className="col-lg-6 align-self-center" >
            {/* <img src="/images/Group6.png" /> */}
            <div className="about-life-iframe" style={{ position:'relative'}}>
              <iframe src="https://player.vimeo.com/video/397541181?title=0&byline=0&portrait=0" style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-5 align-self-center">
            <h2>Stop Waiting. Start Living!</h2>
            <p>People all around the world have experienced a renewal of health and vitality thanks to our research-based products and programs. It is our commitment that you quickly experience the life-changing benefits of B-Epic for yourself.</p> <p> You might not be able to add more years to your life, but what if you could add MORE LIFE to your years?</p> 
            <p>The foundation of B-Epic’s mission is to boost the quality of people’s lives through advanced health supplementation. For this important cause, we are dedicated to bringing to market the most innovative, high-quality products based on cutting-edge research of the most powerful, proven natural ingredients.
            Our mission is to set one million families free from financial bondage.  Join us in our financial revolution today. </p> 
            <Link href="/shop">START NOW</Link>
          </div>   
        </div>
      </div>
    </section>
    
    <div className="EVEV84">
      <section id="student">
        <div className="container"> 
          <div className="row"> 
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h2>Make Every Day Epic.</h2>
              <p>B-Epic's line of high-performance lifestyle products was created to naturally enhance health and wellness ... as well as add more EPIC-ness to everyday life. Have more energy, lose weight easier, improve focus and mood, and sleep better than ever. Our flagship health supplements nourish the mind and body with all-natural herbal, medicinal mushroom, and whole food extracts rich in health-promoting properties to help you feel your best.</p> 
            </div>
          </div>  
        </div>  
      </section>
      <section id="EVEV8" className="EVEV81"> 
        <div className="row" >
          <div className="col-lg-6 p-0 align-self-center" >
            <img src="/images/U2.png" />
          </div> 
          <div className="col-lg-1  "></div>
          <div className="col-lg-4 p-0 align-self-center" >
            <h2  >EVEV8</h2>
            <p   >ELEV8 is scientifically designed to naturally boost mental and physical performance without the brain fog, moodiness, or other negative side effects from sugary, over-caffeinated energy drinks.</p>
            <ul>
              <li><img src="/images/bh1.png" /> Boost Energy</li>
              <li><img src="/images/bh2.png" /> Boost Mood</li>
              <li><img src="/images/bh3.png" /> Boost Focus</li>
            </ul>	
            <Link href="/product/2">LEARN MORE</Link>  
          </div>  
          <div className="col-lg-1 p-0"></div>
        </div>
      </section>
    </div>  
    <section id="EVEV8" className="EVEV82"> 
      <div className="row" >
	      <div className="col-lg-6 p-0 mobile-view-item" >
	        <img src="/images/Group28.png" />
        </div> 
		    <div className="col-lg-1 p-0"></div>
		    <div className="col-lg-4 p-0 align-self-center" >
	        <h2>ACCELER8</h2>
	        <p> ACCELER8 is a unique combo of two supplements (Restore and Sleep) that work synergistically to help bring the body into a holistic healthy state, including facilitating weight loss and improving sleep quality.</p>
          <ul>
            <li><img src="/images/bh4.png" /> Lose Weight</li>
            <li><img src="/images/bh5.png" /> Sleep Great</li> 
          </ul>	
          <Link href="/product/6">LEARN MORE</Link>  
        </div>  
	  	  <div className="col-lg-1 p-0"></div>
        <div className="col-lg-6 p-0 align-self-center desktop-view-item" >
          <img src="/images/Group28.png" />
        </div> 
	    </div> 
    </section>
	  
    <section id="opportunity">
      <div className="row" >
        <div className="col-lg-6 challenge-view-item align-self-center p-0">
          <img src="/images/B-60-Girl.png" />
        </div> 
        <div className="arrow-right-tp"></div>
        <div className="col-lg-6  align-self-center p-0">
          <div className="half-text" >
            <h3>Take the Challenge</h3>
            <p>Are you ready to transform your life? Do you want to get in shape and feel great? Then take the B60 Challenge. In just two short months, people – just like you – are creating lasting healthy habits and getting a kickstart on a healthier, happier lifestyle. You can too!</p>
            <p>
            B60 was created to help you make a real, healthy lifestyle change over a two-month period. Our B60 Pack includes a 60-day supply of key B-Epic health supplements PLUS the complete online challenge program, including daily workout video links and 30-page digital guide.</p>
            <p>
            When you start, you also get to be part of our worldwide B60 community. Together, we’ll help you reach your goals, provide lots of inspiration and guidance, and celebrate your successes all along the way.</p>
            <p>
            So, what are you waiting for? You’ll get fit and have fun! Start your B-Epic 60-day healthy lifestyle challenge today.</p>
            <Link href="/shop">
              <a>START NOW</a>
            </Link>
          </div>
        </div> 
      </div> 
    </section>
  
    <section id="slider-pro">
      <div className="container"> 
        <div className="row" >
          <div className="col-sm-2"> </div>
          <div className="col-sm-8"> 
            <h2>Experience It For Yourself.</h2>
            <p>Join the hundreds of thousands across the world who are already enjoying the benefits of B-Epic high-performance lifestyle products. One of our best-selling packs listed below is the perfect way to get started. They include our most popular products for rejuvenating the body and mind.</p>
          </div>
          <div className="loop owl-carousel owl-theme">
            <div className="item">
              <img src="/images/pro4.png" />
              <div className="text-baritm">
                <h4>ELEV8</h4>
                <h6>One-Month Supply</h6>
                <p>Unlock ancient medicinal secrets for optimal health and functioning with ELEV8. This pack includes a 30-day supply of ELEV8 advanced performance supplement (30 capsules).</p>
                <span>Retail Price <strong>$59.95*</strong></span>
                <Link href="/product/2">START NOW</Link>
              </div>
            </div> 
            <div className="item">
              <img src="/images/pro1.png" />
              <div className="text-baritm">
                <h4>ACCELER8</h4>
                <h6>One-Month Supply</h6>
                <p>Lose weight naturally and effortlessly while you are fast sleep with ACCELER8. This pack includes a 30-day supply of ACCELER8 weight management and sleep combo (30 Restore capsules and 30 Sleep capsules).</p>
                <span>Retail Price <strong>$69.95*</strong></span>
                <Link href="/product/6">START NOW</Link>
              </div>
            </div> 
            <div className="item">
              <img src="/images/pro13.png" />
              <div className="text-baritm">
                <h4>EPIC PACK </h4>
                <h6>One-Month Supply</h6>
                <p>One of our most popular product packs with our top supplements for a full month. It includes a 30-day supply of ELEV8 advanced performance supplement (30 capsules) and ACCELER8 weight management and sleep combo (30 Restore capsules and 30 Sleep capsules). </p>
                <span>Retail Price <strong>$99.95*</strong></span>
                <Link href="/product/13">START NOW</Link>
              </div>
            </div> 
            <div className="item">
              <img src="/images/pro19.png" />
              <div className="text-baritm">
                <h4>B60 PACK </h4>
                <h6>Two-Month Supply</h6>
                <p>The perfect pack if you’re looking to make a real healthy lifestyle change. It includes a 60-day supply of ELEV8, ACCELER8 (Restore and Sleep combo), and B-Epic's alkalizing water enhancer. PLUS, the complete B60 Challenge 60-day online program, including daily workout video links, digital guide, and community.</p>
                <span>Retail Price <strong>$199.95*</strong></span>
                <Link href="/product/19">START NOW</Link>
              </div>
            </div> 
          </div>
        </div>
		  </div>
	  </section>
    <section id="shareearb">
	    <div className="container">  
	      <div className="row" >
	        <div className="shareearb-bh"><img src="/images/enroll.png" /></div>
          <div className="col-lg-5 align-self-center"  >
            <h3>Share + Earn</h3>
            <p>Make money for sharing the products that you use and love! When you sign up as B-Epic Brand Partner, we’ll pay you to do just that. Plus, it costs nothing to get started, and no prior experience is needed!</p> 
            <p>In addition to the remarkable health benefits of our products, you get additional benefits when you join our team as a Brand Partner. Not only do you get discount pricing on all products and programs as well as exclusive access to special offers and limited time deals, you get paid 50% of the retail price on every customer order. Plus, there are lots of opportunities for bonuses…all that and so much more just for sharing B-Epic.</p> 
            <Link href="/shop">
              <a>START NOW</a>
            </Link>
          </div>  
          <div className="col-lg-1"></div>
          <div className="col-lg-6 align-self-center"  > 
            <img src="/images/Group32.png"/>
          </div>  
        </div>  
      </div>
    </section>
  </>
  )
}
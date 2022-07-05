import Link from 'next/link'

export default function SupportHtml(props) {
  return (
  <>
    <section id="container-support">
	    <div className="container">
	      <div className="support-heading">
	        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h2>How can we help you?</h2>
              <p>Welcome to B-Epic! If you have a basic question, please check out the frequently requested items below or contact the person who introduced you to B-Epic. If you need assistance from Member Support, please submit a support ticket via the online Back Office.</p>
            </div>
          </div>
        </div>
      </div>
 	  </section> 
    <section id="member-support">
      <div className="container">
        <div className="wrapper">
          <div className="support-heading">
            <div className="row">
              <h3>Support</h3>
              <div className="col-md-4">
                <h5>Member Support</h5>
                <p>Countries: All except those listed below.</p>
                <ul>
	                <li>
                    <img src="images/call.png" /> 
                    <span>888-335-7493</span>
                  </li>
	                <li>
                    <img src="images/Frame.png"/>
                    <span>3075 N. Fairfield Road, Layton, Utah 84041, USA</span>
                  </li>
                  <li>
                    <img src="images/watch_later.png" /> 
                    <span>8 am – 5 pm Monday thru Thursday
                      AND 8 am – 2 pm Friday, USA Mountain Time
                      (Closed weekends and USA holidays)
                    </span> 
                  </li>
                  <li>
                    <img src="images/support.png" /> 
                    <a href={process.env.NEXT_PUBLIC_BACKOFFICE}>Submit Support Ticket</a> 
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Latin America Member Support</h5>
                <p>Countries: Bolivia, Colombia, Ecuador, Guatemala, and Mexico</p>
                <ul>	
                  <li><img src="images/support.png" /> <a href="mailto:servicioalcliente@bepic.com">servicioalcliente@bepic.com</a> </li>
                  <li><img src="images/call.png" /> <span>52 5517467916</span></li> 
                  <li><img src="images/watch_later.png" /> <span>9 am – 5 pm Monday thru Friday, Mexico City time</span> </li>
                </ul>
              </div>
	            <div className="col-md-4">
                <h5>Peru Member Support</h5>
                <p>Countries: Peru</p>
                <ul>	
                  <li>
                    <img src="images/support.png" />
                    <a href="mailto:peru@bepic.com">peru@bepic.com</a> 
                  </li>
                  <li>
                    <img src="images/call.png" /> 
                    <span>925527277</span>
                  </li> 
                  <li>
                    <img src="images/watch_later.png" /> 
                    <span>Hours: 9 am – 5 pm Monday thru Friday, Lima time</span> 
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 
	
		<section id="member-support">
      <div className="container">
        <div className="wrapper">
          <div className="support-heading">
            <div className="row">
              <h3>General</h3>
              <div className="col-md-4">
                <h5>New Member Signup</h5> 
                <ul>
                  <li>
                    <img src="images/Ellipse-151.png" /> 
                    <Link href={'/shop'}><a>Retail Customer Sign-Up</a></Link>
                  </li>
                  <li>
                    <img src="images/Ellipse-151.png" /> 
                    <Link href={'/shop'}><a>Brand Partner Sign-Up</a></Link>
                  </li>
                  <li>
                    <img src="images/Ellipse-151.png" /> 
                    <a href="https://be-epic.s3.amazonaws.com/B-Epic+How+To+Sign+Up.pdf" target="_blank">How To Sign Up Instructions</a>
                  </li>
                  <li>
                    <img src="images/Ellipse-151.png" /> 
                    <a href="https://be-epic.s3.amazonaws.com/B-Epic+Getting+Started+Checklist.pdf" target="_blank">Getting Started Checklist</a>
                  </li>
                </ul>
              </div>
	 
              <div className="col-md-4">
                <h5>Member Resources</h5> 
                <ul>
                  <li><img src="images/Ellipse-151.png" /> <a href="https://www.bepichq.com/schedule" target="_blank">Webinar/Call Schedule</a></li>
                  <li><img src="images/Ellipse-151.png" /> <a href="https://www.bepichq.com/member-resources" target="_blank">Member Resources</a></li>
                  <li><img src="images/Ellipse-151.png" /> <a href="https://be-epic.s3.amazonaws.com/B-Epic+Distributor+Handbook.pdf" target="_blank">Brand Partner Handbook</a></li>
                  <li><img src="images/Ellipse-151.png" /> <a href="https://bepic-assets.s3-us-west-2.amazonaws.com/B-Epic%2BComp%2BPlan.pdf" target="_blank">Compensation Plan</a></li>
                  <li><img src="images/Ellipse-151.png" /> <a href="https://www.bepichq.com/marketing-resources" target="_blank">Marketing Resources</a></li>
                  <li><img src="images/Ellipse-151.png" /> <a href="https://bepicgear.com/" target="_blank">B-Epic Gear Store USA</a></li>
                </ul>
              </div>

              <div className="col-md-4">
                <h5>Frequently Requested</h5> 
                <ul>
                  <li>
                    <img src="images/Ellipse-151.png"/> 
                    <Link href="/money_guarantee">Money Back Guarantee</Link>
                  </li>
                  <li>
                    <img src="images/Ellipse-151.png"/> 
                    <Link href='/terms_conditions#ordersandbilling'>Orders and Billing</Link>
                  </li>
                  <li>
                    <img src="images/Ellipse-151.png"/> 
                    <Link href='/terms_conditions#shippingpolicy'>Shipping and Delivery</Link>
                  </li>
                  <li>
                    <img src="images/Ellipse-151.png"/> 
                    <Link href='/terms_conditions#returnsandrefunds'>Returns and Refunds</Link>
                  </li>
                  <li>
                    <img src="images/Ellipse-151.png"/> 
                    <Link href='/terms_conditions#internationalshipping'>International Orders</Link>
                  </li> 
                </ul>
              </div>
            </div>
            <div className="col-sm-12 p-0">
              <div className="row">
                <div className="col-md-4">
                  <h5>Member Login</h5> 
                  <ul>
                    <li><img src="images/Ellipse-151.png" /><a href={process.env.NEXT_PUBLIC_BACKOFFICE}>Log into Back Office</a></li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5>Member Recognition</h5> 
                  <ul>
                    <li>
                      <img src="images/Ellipse-151.png" /> 
                      <a href="https://www.bepichq.com/recognition" target="_blank">Meet Our Leaders</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 
  </>
  )
}
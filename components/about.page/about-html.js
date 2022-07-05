export default function AboutHtml(props) {
  return (
    <>
    <section id="about"  > 
      <h2>Our Epic Commitment</h2>
    </section>
    <section id="dedicated">
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-center" >
            <img src="images/Vector2.png" />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5 align-self-center" >
            <h2>Dedicated to Being Truly Epic</h2>
            <p>We are passionate about B-Epic being a worldclass brand and business for our Brand Partners and customers. To ensure our members have the best products and business opportunity for the long term, we are committed to staying on the cuttingedge of health, science, and technology.</p>  
            <p>With decades of experience in the industry, our corporate team has successfully launched multiple lines of top-performing products generating millions and helped tens of thousands of people experience greater financial independence and time freedom through online businesses.</p>  
            <p>Our goal is to help people everywhere improve the quality of their lives by providing them with a powerful, proven platform to reach their full potential.</p>
          </div>   
        </div>
      </div>
	  </section>
    <section id="opportunity">
      <div className="row">
        <div className="col-md-6  p-0 align-self-center">
          <div className="half-text">
            <h3>Epic Products, System &amp; Opportunity</h3>
            <p>Working together our team of top scientists, formulators, and health specialists are dedicated to developing the most advanced high-performance lifestyle products on the market. B-Epic products are based on the latest research of proven natural substances that have been used for centuries in traditional health practices around the world. In addition to sourcing the highest quality raw ingredients, our products are made to the highest standards.</p>
            <p>In addition, we utilize state-of-the-art technologies to ensure quality, maximize efficiency, control costs, and provide an unmatched online/offline infrastructure. This enables us to invest more into our Brand Partners through one of the most lucrative compensation plans in the industry.</p>
            <div className="half-border">
              <strong>View the B-Epic Brand Partner Overview and Compensation Plan.</strong>
              <a href="https://bepic-assets.s3-us-west-2.amazonaws.com/B-Epic%2BComp%2BPlan.pdf" target="_blank">view document</a>
            </div>
          </div>
        </div> 
        <div className="arrow-right"></div>
        <div className="col-md-6 p-0"><img src="images/half1.png" /></div>
      </div>
    </section> 
  </>
  )
}
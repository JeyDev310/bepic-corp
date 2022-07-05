import Link from 'next/link'

export default function EnrollSection(props) {
  return (
    <section id="enroll">
      <div className="container">
        <div className="row" >
          <div className="col-lg-9">
            <h3>Learn more about the B-Epic commitment and company.</h3>
          </div>
          <div className="col-lg-3">
            <Link href="/shop">LEARN MORE</Link>
          </div>
        </div>
      </div>
    </section>  
  )
}

import Link from "next/link";

export default function RelatedProductsSection(props) {
  return (
    <section id="container-enroll">
      <div className="container">
        <div className="col-sm-12">
          <h3>You May Also Like</h3>
        </div>
        <div className="row pt-0">
          <div className="col-md-4">
            <div className="pro-box">
              <div className="product-image">
                <img src={"/images/pro1.png"} />
              </div>
              <h4>Synergistic, Natural Weight Management and Sleep Combo</h4>
              <Link href={`/product/1`}>SHOP NOW</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="pro-box">
              <div className="product-image">
                <img src={"/images/pro2.png"} />
              </div>
              <h4>
                Fast-Acting, Naturally Infused, Aromatic Adhesive Touch Pads
              </h4>
              <Link href={`/product/2`}>SHOP NOW</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="pro-box">
              <div className="product-image">
                <img src={"/images/pro3.png"} />
              </div>
              <h4>African Mango Weight-Loss Water Enhancer Tablets</h4>
              <Link href={`/product/3`}>SHOP NOW</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

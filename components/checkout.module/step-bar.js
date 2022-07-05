export default function StepBar(props) {
  return (
    <div className='step-bar'>
      <div className={`step-point active`}>
        <div className='step-label'>Account</div>
      </div>
      <div className={`step-line ${(props.step=='info-form' || props.step=='shipping-form' || props.step=='billing-form' || props.step=='confirmation')?'active':''}`}></div>
      <div className={`step-point ${(props.step=='info-form' || props.step=='shipping-form' || props.step=='billing-form' || props.step=='confirmation')?'active':''}`}>
        <div className='step-label'>User Information</div>
      </div>
      <div className={`step-line ${(props.step=='shipping-form' || props.step=='billing-form' || props.step=='confirmation')?'active':''}`}></div>
      <div className={`step-point ${(props.step=='shipping-form' || props.step=='billing-form' || props.step=='confirmation')?'active':''}`}>
        <div className='step-label'>Shipping</div>
      </div>
      <div className={`step-line ${(props.step=='billing-form' || props.step=='confirmation')?'active':''}`}></div>
      <div className={`step-point ${(props.step=='billing-form' || props.step=='confirmation')?'active':''}`}>
        <div className='step-label'>Billing</div>
      </div>
      <div className={`step-line ${(props.step=='confirmation')?'active':''}`}></div>
      <div className={`step-point ${(props.step=='confirmation')?'active':''}`}>
        <div className='step-label'>Confirmation</div>
      </div>
      <style jsx>{`
        .step-bar {
          display: flex;
          justify-content: center;
          margin-bottom: 64px;
        }
        .step-point {
          width: 18px; height: 18px;
          border-radius: 50%;
          background-color: #e2e2e2;
          position: relative;
        }
        .step-label {
          position: absolute;
          top: 24px;
          left: 0;
          margin-left: -45px;
          width: 120px;
          text-align: center;
        }
        .step-point.active {
          background-color: #48CB47;
        }
        .step-line {
          width: 100px;
          height: 4px;
          background-color: #e2e2e2;
          margin-top: 7px;
        }
        .step-line.active {
          background-color: #48CB47;
        }
      `}</style>
    </div>
  )
}
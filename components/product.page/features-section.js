import { useState } from 'react'

export default function FeaturesSection(props) {  
  return (
    <>
      <ul className="nav nav-tabs">
        <li ><a className={'active'} data-toggle="tab" href="#benefits">Benefits</a></li>
        <li><a data-toggle="tab" href="#details">Details</a></li> 
      </ul>
      <div className="tab-content">
        <div id="benefits" className="tab-pane fade show active">
          <ul>
            {props.product.benefits.map((el, i)=>
              <li key={i}><img src="/images/Icon25.png" /> <span>{el}</span></li>    
            )}
          </ul>
        </div>
        <div id="details" className="tab-pane fade">
          <ul>
            {props.product.details.map((el, i)=>
              <li key={i}><img src="/images/Icon25.png" /> <span>{el}</span></li>    
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

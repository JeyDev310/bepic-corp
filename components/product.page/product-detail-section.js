import { useState } from 'react'
import PlayVideoModal from './play-video-modal'

export default function ProductDetailSection(props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const colorName = 
    props.product.id==1?"perple"
    : props.product.id==2?"red"
    : props.product.id==3?"org"
    : props.product.id==4?"green"
    : props.product.id==5?"yellow"
    : props.product.id==6?"yellow2"
    : props.product.id==7?"blue"
    : props.product.id==8?"pink"
    : props.product.id==9?"orgpin"
    : props.product.id==19?"green"
    : "green"
  return (
    <section id="product-enroll">
      <div className="container">
        <div className="row">
          <div className="col-md-5 align-self-center">
            <h3><span className={`${colorName}`}>I</span> Product Details</h3>
            <div
              dangerouslySetInnerHTML={{__html: props.product.description}}
            >
            </div>
            {props.product.doc_description && 
              <a href={props.product.doc_description} target='_blank' className={`${colorName}`}>view product details</a>
            }
          </div>
          <div className="col-md-1 divider-video"></div>
          <div className="col-md-6 align-self-center product-video"
            dangerouslySetInnerHTML={{__html: props.product.video_description}}
          >
            {/*
            <img className="product-video-thumb"
              src={props.product.video_thumb} 
            />
            <a className='play-btn' onClick={()=>setIsPlaying(true)}>
              <img className={`${colorName}`} src='/images/play.svg' />
            </a>
            {props.product.video ?
              <PlayVideoModal 
                video={props.product.video}
                visible={isPlaying}
                handleClose={()=>setIsPlaying(false)}
              />
            : ''}
            */}
          </div>
        </div>
      </div>
    </section>
  )
}
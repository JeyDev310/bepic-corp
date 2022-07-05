import { useState } from 'react'
import { Modal, Button } from 'antd'

export default function SelectUserTypeModal(props) {
  const [userType, setUserType] = useState(1)

  return (
    <Modal
      width={564}
      closable={false}
      visible={true}
      footer={null}
      centered
    >
      <h4 style={{textAlign: 'center'}}>Select Account Type</h4>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div className={`user-type-box ${userType==1?'active':''}`}
          onClick={()=>setUserType(1)}
        >
          {userType==1?
            <img src={'/images/user-icon1.svg'} />
          : <img src={'/images/user-icon1_inactive.svg'} />}
          <h6>Independent Distributor</h6>
          <p>
            Sign up as an Independent Distributor (Brand Partner) to become a B-Epic affiliate so you can generate income by promoting and building your business and referring others to the products. 
          </p>
        </div>
        <div className={`user-type-box ${userType==2?'active':''}`}
          onClick={()=>setUserType(2)}
        >
          {userType==2?
            <img src={'/images/user-icon2.svg'} />
          : <img src={'/images/user-icon2_inactive.svg'} />}
          <h6>Preferred Customer</h6>
          <p>
            Sign up as a Preferred Customer to take advantage of B-Epic’s premier line of high-performance lifestyle products and get access to great prices and special offers (without becoming a distributor). 
          </p>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button type='primary' 
          onClick={()=>props.onChangeUserType(userType)}
          size={'large'}
        >
          Continue
        </Button>        
      </div>
    </Modal>
  )
}
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Typography, Row, Col, Button, Input, message, Popconfirm } from 'antd'
import Cookies from 'universal-cookie'
import { callGetApi } from 'utils/api'

export default function EnrollerModal(props) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const referer = useSelector(state=>state.mlm.referer)
  const defaultReferer = useSelector(state=>state.mlm.defaultReferer)
  const yourCountry = useSelector(state=>state.mlm.yourCountry)
  const [selectedReferer, setSelectedReferer] = useState(undefined)
  const [suggestingReferers, setSuggestingReferers] = useState([])
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    if (!defaultReferer) return
    if (referer) {
      setSelectedReferer(referer)
    } 
  }, [defaultReferer, referer])

  const onSearchType = (v) => {
    setSearchParam(v)
    setSuggestingReferers([])
    if (v=='') return

    callGetApi(`search_user/${v}`, onGetSuggestingEnrollees)
  }
  const onGetSuggestingEnrollees = (data) => {
    setSuggestingReferers(data.data)
  }
  const onSelectReferer = (referer) => {
    setSuggestingReferers([])
    setSelectedReferer(referer)
    onSearchType(referer.username)
    setIsEditing(false)
  }
  const onSave = () => {
    if (!selectedReferer) {
      message.error('Please select one referer')
      return
    }
    dispatch({
      type: 'SET_CONFIRMED_REFERER',
      payload: selectedReferer
    })
    const cookies = new Cookies()
    cookies.set('bepicReferer', selectedReferer.username, { path: '/', maxAge: 2592000 })
  }
  const onSaveWithDefault = () => {
    dispatch({
      type: 'SET_CONFIRMED_REFERER',
      payload: defaultReferer
    })
    const cookies = new Cookies()
    cookies.set('bepicReferer', defaultReferer.username, { path: '/', maxAge: 2592000 })
  }

  return (
    <Modal visible={true}
      footer={null}
      // onCancel={onSave}
      closable={false}
    >
      {referer && selectedReferer?
      <div>
        <div>
          <span className='strong'>{selectedReferer.first_name+" "+selectedReferer.last_name}</span> will be your referring affiliate. 
        </div>
        <Row justify='start' style={{ marginTop: 12 }}>
          <Col>
            <Button
              type='primary'
              onClick={()=>onSave()}
            >
              Submit
            </Button> 
          </Col>
        </Row>
      </div>
      :
      <div>
        <h4>ALREADY HAVE A REFERRING DISTRIBUTOR?</h4> 
        <p>Please provide the username of your Referring Sponsor:</p>
        <div className='referer-search'>
          <Input
            type="text"
            value={searchParam}
            onChange={(e) => onSearchType(e.target.value)}
          />
          {suggestingReferers.length > 0 && (
            <div className="suggestion-tips">
              {suggestingReferers.map((referer) => (
                <Row 
                  onClick={() => onSelectReferer(referer)}
                  justify='space-between'
                  className='suggesting-referer'
                >
                  <Col>
                    <Typography.Text type='secondary'>
                      {referer.first_name + " " + referer.last_name}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text type='secondary'>
                      <em>Username: </em>
                      {referer.username}
                    </Typography.Text>
                  </Col>
                </Row>
              ))}
            </div>
          )}
        </div>
        {selectedReferer?
        <div style={{marginTop: 20}}>
          <Typography.Text type='success'>
            You were refered by <strong>{selectedReferer.first_name+' '+selectedReferer.last_name}</strong>.
          </Typography.Text>
        </div>
        : ''}
        <Row justify='space-between' style={{ marginTop: 12 }}>
          <Col>
            {selectedReferer?
              <Popconfirm 
                okText='Yes' cancelText='No' title='Are you sure?'
                onConfirm={onSave}
              >
                <Button type='primary'>Submit</Button>
              </Popconfirm>
            : <span>&nbsp;</span>}
          </Col>
          <Col>
            <a onClick={onSaveWithDefault}>No, I don't have a Sponsor</a>
          </Col>
        </Row>
      </div>
      }
      <style jsx>{`
        .user-search-form {
          position: relative;          
        }
        .referer-search {
          position: relative;
        }
        .suggestion-tips {
          position: absolute;
          left: 0; top: 32px;
          width: 100%;
          cursor: pointer;
          z-index: 35;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 10px;
        }
        .strong {
          color: rgb(239, 131, 123);
          font-weight: bold;
        }
      `}</style>
    </Modal>
  )
}

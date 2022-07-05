import { Modal } from 'antd'
import ReactPlayer from 'react-player'

export default function PlayVideoModal(props) {
  return (
    <Modal
      visible={props.visible}
      footer={null}
      onCancel={props.handleClose}
      style={{ width: '552px' }}
    >
      <ReactPlayer url={[{src: props.video, type: 'video/mp4'}]}
        controls
        width="100%" height="100%"
      />
    </Modal>
  )
}

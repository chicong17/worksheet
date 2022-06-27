import React from 'react'
import Dialog from '../../../common/createModal/Modal'
import { Modal } from 'antd'
import CreateNotification from './CreateNotification'
import PropTypes from 'prop-types'
import './CreateNotification.scss'

const ModalEditNotice = (props) => {
  const { isOpen, handleModal, data } = props
  const confirm = () => {
    Modal.confirm({
      title: 'Modal',
      content: 'Are you sure close modal ?',
      okText: 'Cancel',
      cancelText: 'OK',
      okButtonProps: {
        type: 'default',
      },
      cancelButtonProps: {
        style: { padding: '0 28px' },
        type: 'primary',
      },
      onCancel() {
        handleModal()
      },
    })
  }
  return (
    <Dialog
      isOpen={isOpen}
      handleModal={handleModal}
      confirmDisable={data?.status === 1}
      title="Create Notifications"
      widthModal={700}
    >
      <CreateNotification
        data={data}
        handleModal={handleModal}
        confirm={confirm}
      />
    </Dialog>
  )
}

ModalEditNotice.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  data: PropTypes.object,
}

export default ModalEditNotice

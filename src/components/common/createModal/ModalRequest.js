import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Skeleton } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { typeStatusRequest } from '../../index'
import './ModalRequest.scss'
const Dialog = ({
  children,
  isOpen,
  title,
  handleModal,
  listButton,
  statusRequest,
  requestExists,
  statusGetRequest,
}) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Modal',
      icon: <CloseCircleOutlined />,
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

  if (!isOpen) return null

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        className="modalRequestContainer"
        onCancel={
          statusRequest === typeStatusRequest.CONFIRMED ||
          statusRequest === typeStatusRequest.APPROVED ||
          statusRequest === typeStatusRequest.REJECT
            ? handleModal
            : confirm
        }
        style={{ fontWeight: '500' }}
        footer={
          statusGetRequest === 'loading' ? (
            <>
              <Skeleton.Button />
              <Skeleton.Button />
              <Skeleton.Button />
            </>
          ) : (
            <>
              {listButton.map(
                ({
                  key,
                  name,
                  htmlType,
                  type,
                  idForm,
                  text,
                  loading,
                  danger,
                }) => {
                  const visibleRegister =
                    name === 'register' && requestExists
                      ? { display: 'none' }
                      : {}
                  const visibleUpdate =
                    (name === 'update' || name === 'delete') &&
                    (!requestExists ||
                      statusRequest === typeStatusRequest.CONFIRMED ||
                      statusRequest === typeStatusRequest.APPROVED ||
                      statusRequest === typeStatusRequest.REJECT)
                      ? { display: 'none' }
                      : {}
                  return (
                    <Button
                      style={{ ...visibleRegister, ...visibleUpdate }}
                      loading={statusGetRequest === loading}
                      key={key}
                      name={name}
                      htmlType={htmlType}
                      type={type}
                      form={idForm}
                      onClick={
                        statusRequest === typeStatusRequest.CONFIRMED ||
                        statusRequest === typeStatusRequest.APPROVED
                          ? handleModal
                          : key === 'cancel'
                          ? confirm
                          : () => {}
                      }
                      danger={danger}
                    >
                      {text}
                    </Button>
                  )
                },
              )}
            </>
          )
        }
        width={1000}
      >
        {children}
      </Modal>
    </>
  )
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  handleModal: PropTypes.func,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  listButton: PropTypes.array,
  statusRequest: PropTypes.number,
  requestExists: PropTypes.bool,
  statusGetRequest: PropTypes.string,
}

export default Dialog

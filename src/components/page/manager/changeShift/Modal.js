import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Select, Button } from 'antd'
import { get, put } from '../../../service/requestApi'
import PropTypes from 'prop-types'
import { typePopup } from '../../../index'
import './ChangeShift.scss'
import { checkShift } from './checkShift'
const ModalChangeShift = ({ modal, handleClose, handleUpdate }) => {
  const [shift, setShift] = useState(modal.data.shift_id)
  const [shiftList, setShiftList] = useState([])

  const { Option } = Select

  useEffect(() => {
    const getShiftList = async () => {
      const response = await get('admin/shift/index')
      setShiftList(response.data)
    }
    getShiftList()
  }, [])

  const handleChange = (value) => {
    setShift(value)
  }

  const handleSubmit = async () => {
    const response = await put(`admin/shift/update/${modal.data.id}`, {
      shift_id: shift,
    })
    if (response.status) {
      typePopup.popupNotice(
        typePopup.SUCCESS_MESSAGE,
        'Update Success',
        'Change Shift',
      )
      handleUpdate()
      handleClose()
    } else {
      typePopup.popupNotice(
        typePopup.ERROR_MESSAGE,
        'Update Failed',
        'Change Shift',
      )
    }
  }
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
        handleClose()
      },
    })
  }
  return (
    <>
      <Modal
        wrapClassName="change_Shift"
        okText="Submit"
        title={<h2>Change Shift</h2>}
        visible={modal.isOpen}
        footer={null}
        width={700}
        onCancel={confirm}
        onOk={handleSubmit}
      >
        <div className="userInfo">
          <Row style={{ margin: 0 }}>
            <Col xs={24} md={24} xl={24}>
              <Row>
                <Col xs={12} md={12} xl={12} className="dFlex">
                  <Col xl={9}>Member Name:</Col>
                  <Col xl={15}>{modal.data.member_name}</Col>
                </Col>
                <Col xs={12} md={12} xl={12} className="dFlex">
                  <Col xl={7}>Email:</Col>
                  <Col xl={17}> {modal.data.email}</Col>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} xl={12} className="dFlex">
                  <Col xl={9}> Check In:</Col>
                  <Col xl={15}> {modal.data.check_in}</Col>
                </Col>
                <Col xs={12} md={12} xl={12} className="dFlex">
                  <Col xl={7}>Check Out:</Col>
                  <Col xl={17}>{modal.data.check_out}</Col>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} xl={12} className="dFlex">
                  <Col xl={9}> Division:</Col>
                  <Col xl={15}> {modal.data.division_name}</Col>
                </Col>
                <Col xs={12} md={12} xl={12} className="dFlex">
                  <Col xl={7}> Shift Name:</Col>
                  <Col xl={17}>
                    <strong>{modal.data.shift_name}</strong>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col span={12} className="dFlex">
                  <Col xl={9} style={{ alignSelf: 'center' }}>
                    Change Shift:
                  </Col>
                  <Col xl={15}>
                    <Select
                      defaultValue={`${modal.data.shift_name} - (${modal.data.check_in} - ${modal.data.check_out})`}
                      style={{
                        width: 170,
                      }}
                      onChange={handleChange}
                    >
                      {shiftList &&
                        shiftList.map((item) => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {checkShift(
                                item.shift_name,
                                item.check_in,
                                item.check_out,
                              )}
                            </Option>
                          )
                        })}
                    </Select>
                  </Col>
                </Col>
                <Col span={12}></Col>
              </Row>
              <Row style={{ margin: '24px 0 0 0' }}>
                <Col span={24} className="btnChangeShift">
                  <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button key="cancel" onClick={confirm}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}
ModalChangeShift.propTypes = {
  modal: PropTypes.object,
  handleClose: PropTypes.func,
  handleUpdate: PropTypes.func,
}

export default ModalChangeShift

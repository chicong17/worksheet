import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RequestDetail from './requestDetail/RequestDetail'
import { checkConfirm } from './checkConfirm'
import { Tag, Button, Modal } from 'antd'
import {
  DoubleLeftOutlined,
  LeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from '@ant-design/icons'
import {
  getRequests,
  putRequestsManager,
  putRequestsReject,
} from './slice/managerSlice'
import {
  checkRequestStatus,
  checkRequestStatusColor,
} from '../../../utils/checkRequest'
import {
  endPoint,
  dateTime,
  tryCatch,
  messageRequest,
  CMTable,
} from '../../../index'
import '../../../common/createModal/ModalRequest.scss'
import './Requests.scss'

const Manager = () => {
  const [dataTable, setDataTable] = useState([])
  const [rowData, setRowData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [reload, setReload] = useState(false)
  const commentInput = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const dispatch = useDispatch()
  const { role: roleUser } = useSelector((state) => state.userInfo?.currentUser)
  const { requests, status } = useSelector((state) => state.managerRequest)

  useEffect(() => {
    const getDataRequests = async () => {
      const url =
        roleUser === 'Admin'
          ? endPoint.GET_REQUEST_ADMIN
          : endPoint.GET_REQUEST_MANAGER
      await dispatch(
        getRequests({
          url,
        }),
      )
    }
    getDataRequests()
  }, [reload])

  useEffect(() => {
    if (requests.length !== 0) {
      const data = requests.map((request) => {
        const newRequest = { key: request.id, ...request }
        return newRequest
      })
      setDataTable(data)
    }
  }, [requests])

  const onClickConfirm = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsManager({
          url: endPoint.PUT_REQUEST_MANAGER + rowData.id,
          data: {
            status: 1,
            comment: comment ? comment : 'Manager confirmed request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
      },
    )
  }
  const onClickRejectManager = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsReject({
          url: endPoint.PUT_REQUEST_MANAGER + rowData.id,
          data: {
            status: -1,
            comment: comment ? comment : 'Manager reject request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
      },
    )
  }
  const onClickApproved = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsManager({
          url: endPoint.PUT_REQUEST_ADMIN + rowData.id,
          data: {
            status: 2,
            comment: comment ? comment : 'Admin approved request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
      },
    )
  }
  const onClickRejectAdmin = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsReject({
          url: endPoint.PUT_REQUEST_ADMIN + rowData.id,
          data: {
            status: -1,
            comment: comment ? comment : 'Admin reject request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
      },
    )
  }

  const confirmReject = () => {
    const user = roleUser.toUpperCase()
    const rejectFunction =
      user === 'ADMIN'
        ? onClickRejectAdmin
        : user === 'MANAGER'
        ? onClickRejectManager
        : ''
    Modal.confirm({
      title: 'REQUEST',
      content: 'Are you sure reject request?',
      okText: 'Cancel',
      cancelText: 'OK',
      okButtonProps: {
        type: 'default',
      },
      cancelButtonProps: {
        style: { padding: '0 28px' },
        type: 'primary',
      },
      onCancel: rejectFunction,
    })
  }
  const confirmCloseModal = (e) => {
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
        handleCloseModal()
      },
    })
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const columns = [
    {
      title: <h4>NO</h4>,
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        return (
          <span className="tb_center">{currentPage - 1 + record.key + 1}</span>
        )
      },
    },
    {
      title: <h4>MEMBER NAME</h4>,
      dataIndex: 'full_name',
      key: 'full_name',
    },

    {
      title: <h4>REQUEST TYPE</h4>,
      dataIndex: 'request_type',
      key: 'request_type',
      render: (type) => {
        switch (type) {
          case 1:
            return <span className="tb_center">Forget</span>
          case 2:
          case 3:
            return <span className="tb_center">Leave</span>
          case 4:
            return <span className="tb_center">Late/Early</span>
          case 5:
            return <span className="tb_center">OT</span>
          default:
            break
        }
      },
    },
    {
      title: <h4>REASON</h4>,
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => <p className="textOverflow ">{reason}</p>,
    },
    {
      title: <h4>DATE CREATED</h4>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => (
        <span className="tb_center">{dateTime.formatDateTime(date)}</span>
      ),
    },
    {
      title: <h4>STATUS</h4>,
      dataIndex: 'status',
      key: 'status',
      defaultSortOrder: 'ascend',
      render: (_) => {
        return (
          <>
            <div className="dFlex">
              <Tag color={checkRequestStatusColor(_)}>
                {checkRequestStatus(_)}
              </Tag>
            </div>
          </>
        )
      },
    },
  ]

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <>
          <Button
            icon={<DoubleLeftOutlined />}
            disabled={currentPage === 1}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentPage(1)
            }}
            className="ant-pagination-item"
          ></Button>
          <Button
            className="ant-pagination-item"
            disabled={currentPage === 1}
            icon={<LeftOutlined />}
          ></Button>
        </>
      )
    }

    if (type === 'next') {
      const lastPage = Math.ceil(dataTable.length / perPage)
      return (
        <>
          <Button
            className="ant-pagination-item"
            disabled={currentPage === lastPage}
            icon={<RightOutlined />}
          ></Button>
          <Button
            disabled={currentPage === lastPage}
            icon={<DoubleRightOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentPage(lastPage)
            }}
            className="ant-pagination-item"
          ></Button>
        </>
      )
    }

    return originalElement
  }

  return (
    <div>
      {dataTable && (
        <>
          <CMTable
            title={() => {
              return (
                <>
                  <h2>Requests</h2>
                </>
              )
            }}
            loading={status === 'loading'}
            className="tableManager"
            data={dataTable}
            width={{
              id: '5%',
              full_name: '20%',
              request_type: '15%',
              reason: '30%',
              created_at: '15%',
              status: '10%',
            }}
            columns={columns}
            onRow={(record) => {
              return {
                onClick: () => {
                  setIsOpen(true)
                  setRowData(record)
                },
              }
            }}
            sorter={{ created_at: 'date', status: 'number' }}
            scroll={{
              x: 1000,
              y: 350,
            }}
            styleHead={{
              id: { position: 'tb_center' },
              reason: { position: 'tb_start' },
            }}
            styleBody={{
              full_name: { className: 'textCenter textOverflow' },
            }}
            pagination={{
              current: currentPage,
              onShowSizeChange: (page, size) => {
                setPerPage(size)
              },
              itemRender: itemRender,
              onChange: (size, page) => {
                setCurrentPage(size)
              },
            }}
          />
        </>
      )}
      {isOpen && (
        <Modal
          visible={isOpen}
          title="Request Detail"
          onCancel={checkConfirm(
            rowData.status,
            roleUser,
            handleCloseModal,
            confirmCloseModal,
          )}
          footer={
            roleUser === 'Manager'
              ? rowData.manager_confirmed_status !== 0
                ? [
                    <Button
                      key="cancel"
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
                      style={{ padding: '0 25px' }}
                    >
                      Cancel
                    </Button>,
                  ]
                : [
                    <Button
                      key="confirm"
                      type="primary"
                      onClick={onClickConfirm}
                      loading={status === 'loadingManagerUpdate'}
                      htmlType="submit"
                      form="myForm"
                    >
                      Confirm
                    </Button>,
                    <Button
                      key="cancel"
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
                      style={{ padding: '0 25px' }}
                    >
                      Cancel
                    </Button>,
                    <Button
                      key="reject"
                      type="primary"
                      onClick={confirmReject}
                      loading={status === 'loadingRejectRequest'}
                      style={{ padding: '0 30px' }}
                      name="managerReject"
                      danger
                    >
                      Reject
                    </Button>,
                  ]
              : roleUser === 'Admin'
              ? rowData.admin_approved_status !== 0
                ? [
                    <Button
                      key="cancel"
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
                      style={{ padding: '0 25px' }}
                    >
                      Cancel
                    </Button>,
                  ]
                : [
                    <Button
                      key="approved"
                      type="primary"
                      onClick={onClickApproved}
                      loading={status === 'loadingManagerUpdate'}
                    >
                      Approved
                    </Button>,
                    <Button
                      key="cancel"
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
                      style={{ padding: '0 25px' }}
                    >
                      Cancel
                    </Button>,
                    <Button
                      key="reject"
                      type="primary"
                      onClick={confirmReject}
                      loading={status === 'loadingRejectRequest'}
                      style={{ padding: '0 30px' }}
                      name="adminReject"
                      danger
                    >
                      Reject
                    </Button>,
                  ]
              : ''
          }
          className="modalRequestContainer"
          width={1000}
        >
          <RequestDetail
            row={rowData}
            refInput={commentInput}
            roleUser={roleUser}
          ></RequestDetail>
        </Modal>
      )}
    </div>
  )
}

export default Manager

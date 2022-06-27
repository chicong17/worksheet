/* eslint-disable object-curly-spacing */
import * as React from 'react'
import { Button, Col, Modal, Row } from 'antd'
import {
  DoubleLeftOutlined,
  LeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CMTable } from '../../..'
import ModalEditNotice from './ModalEditNotice'
import { delItemListNoticeDraft, getDataListNoticeDraft } from './slice/slice'
import distance from '../../../utils/distance'
import { PlusOutlined } from '@ant-design/icons'

const NotificationList = () => {
  const [modal, setModal] = useState({ open: false, data: {} })
  const [load, setLoad] = useState(false)
  const [heightTable, setHeightTable] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    const returnData = async () => {
      await dispatch(getDataListNoticeDraft({ perPage: 10, page: 1 }))
    }
    returnData()
  }, [load])

  useEffect(() => {
    const height = distance('notification', 50)
    setHeightTable(height.heightTable)
  }, [])

  const dataNoticeDraft = useSelector((state) => {
    return state.noticeListDraft
  })

  const confirmCancel = (record) => {
    Modal.confirm({
      title: 'DELETE NOTICE',
      content: 'Are you sure ?',
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
        dispatch(delItemListNoticeDraft(record.id))
        setLoad(!load)
      },
    })
  }

  const columns = [
    {
      title: <h4>NO</h4>,
      dataIndex: 'id',
      key: 'id',
      render: (payload, record) => {
        return (
          <p className="resetMargin tb_center">
            {(dataNoticeDraft.page - 1) * 10 + Number(record.key) + 1}
          </p>
        )
      },
    },
    {
      title: <h4>AUTHOR</h4>,
      dataIndex: 'author',
      key: 'author',
      render: (payload, record) => {
        return (
          <p className="textOverFlow resetMargin tb_center">
            {record.created_by}
          </p>
        )
      },
    },
    {
      title: <h4>SUBJECT</h4>,
      dataIndex: 'subject',
      key: 'subject',
      render: (payload, record) => {
        return <p className="textOverFlow resetMargin">{record.subject}</p>
      },
    },
    {
      title: <h4>PUBLISHED DATE</h4>,
      dataIndex: 'published_date',
      key: 'published_date',
      render: (payload, record) => {
        return (
          <p className="textOverFlow resetMargin">{record.published_date}</p>
        )
      },
    },
    {
      title: <h4>STATUS</h4>,
      dataIndex: 'status',
      key: 'status',
      render: (payload, record) => {
        return (
          <p className="textOverFlow resetMargin tb_center">
            {moment(record.published_date).unix() > moment().unix()
              ? 'Bản tương lai'
              : 'Đã Xuất bản'}
          </p>
        )
      },
    },
    {
      title: <h4> ACTION </h4>,
      dataIndex: 'action',
      key: 'action',
      render: (payload, record) => {
        return (
          <Row>
            <Col ms={12} md={12} xl={12}>
              <p
                className="tb_center colorBlue resetMargin"
                onClick={() => setModal({ open: true, data: record })}
              >
                Details
              </p>
            </Col>
            <Col xs={12} md={12} xl={12}>
              <p
                className="tb_center colorBlue resetMargin"
                onClick={() => confirmCancel(record)}
              >
                Delete
              </p>
            </Col>
          </Row>
        )
      },
    },
  ]

  const onShowSizeChange = (page, size) => {
    dispatch(getDataListNoticeDraft({ perPage: size, page: page }))
  }

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <>
          <Button
            disabled={dataNoticeDraft.currentPage === 1}
            icon={<DoubleLeftOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNoticeDraft({
                  perPage: dataNoticeDraft.per_page,
                  page: 1,
                }),
              )
            }}
            className="ant-pagination-item"
          ></Button>
          <Button
            className="ant-pagination-item"
            disabled={dataNoticeDraft.currentPage === 1}
            icon={<LeftOutlined />}
          ></Button>
        </>
      )
    }

    if (type === 'next') {
      return (
        <>
          <Button
            className="ant-pagination-item"
            icon={<RightOutlined />}
            disabled={dataNoticeDraft.currentPage === dataNoticeDraft.lastPage}
          ></Button>
          <Button
            disabled={dataNoticeDraft.currentPage === dataNoticeDraft.lastPage}
            icon={<DoubleRightOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNoticeDraft({
                  perPage: dataNoticeDraft.per_page,
                  page: dataNoticeDraft.lastPage,
                }),
              )
            }}
            className="ant-pagination-item"
          ></Button>
        </>
      )
    }

    return originalElement
  }

  const onChange = (size, page) => {
    dispatch(getDataListNoticeDraft({ perPage: page, page: size }))
  }

  return (
    <div id="notification" style={{ paddingTop: '50px' }}>
      <Row
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        <Col xs={24} md={22} xl={22}>
          <CMTable
            title={() => {
              return (
                <Row style={{ justifyContent: 'space-between' }}>
                  <Col xl={12} md={12} xs={12}>
                    <h2>List Notice</h2>
                  </Col>
                  <Col xl={12} md={12} xs={12} style={{ textAlign: 'right' }}>
                    <Button
                      style={{
                        backgroundColor: '#104382',
                        color: 'white',
                        borderRadius: '5px',
                        height: '35px',
                      }}
                      onClick={() => setModal({ open: true })}
                    >
                      <PlusOutlined />
                      Create Notice
                    </Button>
                  </Col>
                </Row>
              )
            }}
            data={dataNoticeDraft.tableData}
            loading={dataNoticeDraft.loading}
            columns={columns}
            pagination={{
              current: dataNoticeDraft.currentPage,
              total: dataNoticeDraft.total,
              onShowSizeChange: onShowSizeChange,
              itemRender: itemRender,
              onChange: onChange,
            }}
            scroll={{
              x: 1000,
              y: heightTable,
            }}
            sorter={{ published_date: 'date' }}
            width={{
              id: '5%',
              subject: '20%',
            }}
            styleBody={{
              subject: { className: 'textOverflow' },
              published_date: {
                position: 'tb_center',
              },
            }}
          />
        </Col>
      </Row>
      <ModalEditNotice
        isOpen={modal.open}
        handleModal={() =>
          setModal((prev) => {
            return { ...prev, open: false }
          })
        }
        data={modal?.data}
      />
    </div>
  )
}

export default NotificationList

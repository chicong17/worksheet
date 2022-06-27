/* eslint-disable object-curly-spacing */
import {
  DoubleLeftOutlined,
  LeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Row, Col, Modal, Button } from 'antd'
import styles from './Index.module.scss'
import './Index.scss'
import { dateTime, CMTable } from '../../../index'
import { getDataListNotice } from '../slice/slice'
import { useDispatch, useSelector } from 'react-redux'
import { saveAs } from 'file-saver'
import distance from '../../../utils/distance'

const Index = () => {
  const [modal, setModal] = useState({ open: false, data: {} })
  const [heightTable, setHeightTable] = useState(0)
  const stateNotice = useSelector((state) => {
    return state.noticeList
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDataListNotice({ perPage: 10, page: 1 }))
  }, [])

  useEffect(() => {
    const height = distance('HomeTable')
    setHeightTable(height.heightTable)
  }, [])

  const columns = [
    {
      title: <h4>NO</h4>,
      dataIndex: 'id',
      key: 'id',
      render: (payload, records) => {
        return (
          <p className="resetMargin">
            <> {(stateNotice.page - 1) * 10 + Number(records.key)}</>
          </p>
        )
      },
    },
    {
      title: <h4>SUBJECT</h4>,
      dataIndex: 'subject',
      key: 'subject',
      render: (payload) => {
        return <div className="resetMargin">{payload}</div>
      },
    },
    {
      title: <h4>AUTHOR</h4>,
      dataIndex: 'created_by',
      key: 'created_by',
      render: (payload) => {
        return <div className="resetMargin">{payload}</div>
      },
    },
    {
      title: <h4>TO DEPARTMENT</h4>,
      dataIndex: 'published_to',
      key: 'published_to',
      render: (payload) => {
        const department = Array.isArray(payload)
          ? payload[0].division_name
          : 'ALL'
        return <div className="resetMargin tb_center">{department}</div>
      },
    },
    {
      title: <h4>PUBLISHED DATE</h4>,
      dataIndex: 'published_date',
      key: 'published_date',
      render: (payload) => {
        const DATE = dateTime.formatDateTimes(new Date(payload))
        return <div className="resetMargin">{DATE}</div>
      },
    },
    {
      title: <h4>ATTACHMENT</h4>,
      dataIndex: 'attachment',
      key: 'attachment',
      render: (payload, records) => {
        const redirect = () => {
          const indexofDot = payload.lastIndexOf('.')
          const pathFile = payload.slice(indexofDot, payload.length)
          if (pathFile === '.zip' || pathFile === '.rar') {
            saveAs(`${payload}`, `${payload}`)
          } else {
            window.open(payload)
          }
        }
        let nameFile = payload
        if (payload) {
          const indexName = payload.lastIndexOf('/')
          nameFile = payload.slice(indexName + 1, payload.length)
        }

        return (
          <div
            className="textOverflow colorBlue resetMargin"
            onClick={redirect}
          >
            {nameFile}
          </div>
        )
      },
    },
    {
      title: <h4>DETAIL</h4>,
      dataIndex: 'detail',
      key: 'detail',
      render: (payload, records) => {
        return (
          <div
            className="tb_center colorBlue resetMargin"
            onClick={() => setModal({ open: true, data: records })}
          >
            view
          </div>
        )
      },
    },
  ]

  const onShowSizeChange = (page, size) => {
    dispatch(getDataListNotice({ perPage: size, page: page }))
  }

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <>
          <Button
            icon={<DoubleLeftOutlined />}
            disabled={stateNotice.currentPage === 1}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNotice({
                  perPage: stateNotice.per_page,
                  page: 1,
                }),
              )
            }}
            className="ant-pagination-item"
          ></Button>
          <Button
            className="ant-pagination-item"
            disabled={stateNotice.currentPage === 1}
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
            disabled={stateNotice.currentPage === stateNotice.lastPage}
            icon={<RightOutlined />}
          ></Button>
          <Button
            disabled={stateNotice.currentPage === stateNotice.lastPage}
            icon={<DoubleRightOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNotice({
                  perPage: stateNotice.per_page,
                  page: stateNotice.lastPage,
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
    dispatch(getDataListNotice({ perPage: page, page: size }))
  }

  return (
    <div className={styles.Home} id="HomeTable">
      <Row
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        <Col xs={24} md={22} xl={24}>
          <CMTable
            title={() => {
              return (
                <>
                  <h1 style={{ color: '#23466d', fontSize: '25px' }}>
                    Official Notice
                  </h1>
                </>
              )
            }}
            loading={stateNotice.loading}
            className="tableNotice"
            data={stateNotice.tableData}
            width={{
              id: '4%',
              attachment: '15%',
              created_by: '12%',
              published_to: '9%',
              published_date: '10%',
              detail: '5%',
              subject: '20%',
            }}
            columns={columns}
            sorter={{ published_date: 'date' }}
            scroll={{
              x: 1000,
              y: heightTable,
            }}
            styleHead={{
              id: { position: 'tb_center' },
              subject: { position: 'tb_start' },
              created_by: { position: 'tb_center' },
              published_date: {
                position: 'tb_center',
                className: 'whiteColor',
              },
              published_to: {
                position: 'tb_center',
                className: 'whiteColor',
              },
              attachment: { position: 'tb_start' },
              detail: { position: 'tb_center' },
            }}
            styleBody={{
              subject: { className: 'textOverflow' },
              created_by: { position: 'tb_center' },
              published_date: {
                position: 'tb_center',
              },
            }}
            pagination={{
              current: stateNotice.currentPage,
              total: stateNotice.total,
              onShowSizeChange: onShowSizeChange,
              itemRender: itemRender,
              onChange: onChange,
            }}
          />
        </Col>
      </Row>
      <Modal
        className="modalNotice"
        title={<h2>Notice Detail</h2>}
        visible={modal.open}
        width={700}
        onCancel={() =>
          setModal((prev) => {
            return { ...prev, open: false }
          })
        }
      >
        <Row>
          <Col
            xs={24}
            md={24}
            xl={24}
            style={{ display: 'flex', borderBottom: '2px solid #ab9f9f' }}
          >
            <Col xs={12} md={12} xl={12}>
              <h3
                style={{ marginBottom: '20px', color: 'black', fontSize: 20 }}
              >
                Author
              </h3>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-user"></i>
                  <div className="formGroupText">
                    <p>Name: &nbsp;</p>
                    <p>
                      {modal?.data?.created_by ? modal?.data?.created_by : ''}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-envelope"></i>
                  <div className="formGroupText">
                    <p>Email: &nbsp;</p>
                    <p>
                      {modal?.data?.author_email
                        ? modal?.data?.author_email
                        : ''}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-envelope"></i>
                  <div className="formGroupText">
                    <p>Other Email: &nbsp;</p>
                    <p>
                      {modal?.data?.author_other_email
                        ? modal?.data?.author_other_email
                        : ''}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-phone"></i>
                  <div className="formGroupText">
                    <p>Phone: &nbsp;</p>
                    <p>
                      {modal?.data?.author_phone
                        ? modal?.data?.author_phone
                        : ''}
                    </p>
                  </div>
                </div>
              </Col>
            </Col>
            <Col xs={12} md={12} xl={12}>
              <h3
                style={{ marginBottom: '20px', color: 'black', fontSize: 20 }}
              >
                To Department &nbsp;
              </h3>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-building"></i>
                  <div className="formGroupText">
                    <p>To department: &nbsp;</p>
                    <p>
                      {Array.isArray(modal?.data?.published_to)
                        ? modal?.data?.published_to[0].division_name
                        : 'ALL'}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-calendar"></i>
                  <div className="formGroupText">
                    <p>Published date: </p>
                    <p>{modal?.data?.published_date}</p>
                  </div>
                </div>
              </Col>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} xl={24}>
            <h3 style={{ margin: '20px 0', color: 'black', fontSize: 20 }}>
              Detail
            </h3>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p style={{ fontWeight: 600 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Subject: </span>
              {modal?.data?.subject}
            </p>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p
              className="colorBlue"
              style={{ fontWeight: 600 }}
              onClick={() => {
                saveAs(`${modal.data.attachment}`, `${modal.data.attachment}`)
              }}
            >
              <span style={{ fontWeight: 700, color: 'black' }}>
                {' '}
                Attachment:{' '}
              </span>
              {modal?.data?.attachment}
            </p>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p style={{ fontWeight: 600 }}>
              <span style={{ fontWeight: 700 }}>Message: </span>
              {modal?.data?.message}
            </p>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Index

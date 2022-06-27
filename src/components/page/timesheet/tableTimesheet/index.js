import React, { useState } from 'react'
import { Space, Button, Typography, Modal } from 'antd'
import './table-timesheet.scss'
import ForgetModal from '../../forgetModal/ForgetModal'
import LeaveModal from '../../leaveModal/LeaveModal'
import RegisterOT from '../../registerOT/RegisterOT'
import LateEarlyModal from '../../lateEarlyModal/index/Index'
import CMTable from '../../../common/table/Table'
import moment from 'moment'
import ModalLogTimesheet from '../modalLogtimesheet/ModalLogtimesheet'
import PropTypes from 'prop-types'
const { Text } = Typography
// import {
//   DoubleLeftOutlined,
//   LeftOutlined,
//   DoubleRightOutlined,
//   RightOutlined,
// } from '@ant-design/icons'
// import { getTimesheet } from '../slice/slice'

export default function Timesheet({
  row,
  start,
  end,
  sort,
  total,
  current,
  loading,
}) {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
    isOpenOT: false,
    isOpenLateEarly: false,
  })
  const [checkModal, setCheckModal] = useState({
    row: [],
    name: '',
  })

  const [visible, setVisible] = useState(false)
  const [dateTimelog, setDateTimelog] = useState('')
  const handleClickModal = (type) => {
    const modalType = type.toUpperCase()
    switch (modalType) {
      case 'FORGET':
        setIsOpen({
          ...isOpen,
          isOpenForget: !isOpen.isOpenForget,
        })
        break
      case 'LEAVE':
        setIsOpen({
          ...isOpen,
          isOpenLeave: !isOpen.isOpenLeave,
        })
        break
      case 'OT':
        setIsOpen({
          ...isOpen,
          isOpenOT: !isOpen.isOpenOT,
        })
        break
      case 'LATE_EARLY':
        setIsOpen({
          ...isOpen,
          isOpenLateEarly: !isOpen.isOpenLateEarly,
        })
        break
      default:
        throw new Error('err')
    }
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (id, row) => {
        return (
          <Text
            onClick={() => {
              setVisible(true)
              setDateTimelog(row.work_date)
            }}
          >
            {id}
          </Text>
        )
      },
    },
    {
      title: 'Date',
      dataIndex: 'work_date',
      key: 'work_date',
      width: 150,
      render: (date, record) => {
        return <Text>{moment(date).format('DD/MM/YYYY | ddd')} </Text>
      },
    },
    {
      title: 'Check in',
      dataIndex: 'checkin_original',
      key: 'checkin_original',

      render: (checkin) => {
        if (checkin !== null) {
          return <Text>{moment(checkin).format('HH:mm')} </Text>
        } else <Text></Text>
      },
    },
    {
      title: 'Check out',
      dataIndex: 'checkout_original',
      key: 'checkout_original',

      render: (checkout) => {
        if (checkout !== null) {
          return <Text>{moment(checkout).format('HH:mm ')} </Text>
        } else return <Text></Text>
      },
    },
    {
      title: 'Late',
      dataIndex: 'late',
      key: 'late',
      render: (late, record) => {
        if (record.note !== null) {
          if (
            record?.note?.includes('Late/Early Approved') === true &&
            late !== ''
          ) {
            return <Text>{late}</Text>
          } else if (
            record.note.includes('Late/Early Approved') === false &&
            late === ''
          ) {
            return ''
          } else return <Text type="danger">{late}</Text>
        } else if (record.note === null) {
          if (late === '') return ''
          else return <Text type="danger">{late}</Text>
        }
      },
    },
    {
      title: 'Early',
      dataIndex: 'early',
      key: 'early',
      render: (early, record) => {
        if (record.note !== null) {
          if (
            record?.note?.includes('Late/Early Approved') === true &&
            early !== ''
          ) {
            return <Text>{early}</Text>
          } else if (
            record.note.includes('Late/Early Approved') === false &&
            early === ''
          ) {
            return ''
          } else return <Text type="danger">{early}</Text>
        } else if (record.note === null) {
          if (early === '') return ''
          else return <Text type="danger">{early}</Text>
        }
      },
    },
    {
      title: 'In office',
      dataIndex: 'in_office',
      key: 'in_office',
      render: (office, record) => {
        if (
          office === null &&
          moment(record.work_date).format('ddd') !== 'Sun' &&
          moment(record.work_date).format('ddd') !== 'Sat'
        ) {
          return <Text>--:--</Text>
        } else return <Text type="default">{office}</Text>
      },
    },
    {
      title: 'Ot',
      dataIndex: 'ot_time',
      key: 'ot_time',
      render: (ot, record) => {
        if (record.note !== null) {
          if (record.note.includes('OT Approved') === true) {
            return <Text>{ot}</Text>
          } else if (record?.note?.includes('OT Approved') === false) {
            if (
              ot === null &&
              moment(record.work_date).format('ddd') !== 'Sun' &&
              moment(record.work_date).format('ddd') !== 'Sat'
            ) {
              return <Text>00:00</Text>
            } else return <Text type="danger">{ot}</Text>
          }
        } else {
          if (
            ot === null &&
            moment(record.work_date).format('ddd') !== 'Sun' &&
            moment(record.work_date).format('ddd') !== 'Sat'
          ) {
            return <Text>00:00</Text>
          } else return <Text type="danger">{ot}</Text>
        }
      },
    },
    {
      title: 'Work time',
      dataIndex: 'work_time',
      key: 'work_time',
      render: (workTime) => {
        if (workTime === '08:00') {
          return <Text type="default">{workTime}</Text>
        } else return <Text type="danger">{workTime}</Text>
      },
    },
    {
      title: 'Lack',
      dataIndex: 'lack',
      key: 'lack',
    },
    {
      title: 'Comp',
      dataIndex: 'compensation',
      key: 'compensation',
    },
    {
      title: 'Pleave',
      dataIndex: 'paid_leave',
      key: 'paid_leave',
    },
    {
      title: 'Uleave',
      dataIndex: 'unpaid_leave',
      key: 'unpaid_leave',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      width: 250,
      render: (record) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'forget',
                }
              })
              handleClickModal('forget')
            }}
          >
            Forget
          </Button>

          <Button
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'late_early',
                }
              })
              handleClickModal('late_early')
            }}
          >
            Late/Early
          </Button>

          <Button
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'leave',
                }
              })
              handleClickModal('leave')
            }}
          >
            Leave
          </Button>
          <Button
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'ot',
                }
              })
              handleClickModal('ot')
            }}
          >
            OT
          </Button>
        </Space>
      ),
    },
  ]
  // const itemRender = (_, type, originalElement) => {
  //   if (type === 'prev') {
  //     return (
  //       <>
  //         <Button
  //           icon={<DoubleLeftOutlined />}
  //           disabled={stateNotice.currentPage === 1}
  //           onClick={(e) => {
  //             e.stopPropagation()
  //             dispatch(
  //               getDataListNotice({
  //                 perPage: stateNotice.per_page,
  //                 page: 1,
  //               }),
  //             )
  //           }}
  //           className="ant-pagination-item"
  //         ></Button>
  //         <Button
  //           className="ant-pagination-item"
  //           disabled={stateNotice.currentPage === 1}
  //           icon={<LeftOutlined />}
  //         ></Button>
  //       </>
  //     )
  //   }

  //   if (type === 'next') {
  //     return (
  //       <>
  //         <Button
  //           className="ant-pagination-item"
  //           disabled={stateNotice.currentPage === stateNotice.lastPage}
  //           icon={<RightOutlined />}
  //         ></Button>
  //         <Button
  //           disabled={stateNotice.currentPage === stateNotice.lastPage}
  //           icon={<DoubleRightOutlined />}
  //           onClick={(e) => {
  //             e.stopPropagation()
  //             dispatch(
  //               getDataListNotice({
  //                 perPage: stateNotice.per_page,
  //                 page: stateNotice.lastPage,
  //               }),
  //             )
  //           }}
  //           className="ant-pagination-item"
  //         ></Button>
  //       </>
  //     )
  //   }

  //   return originalElement
  // }
  // const onShowSizeChange = (page, size) => {
  //   console.log(size)
  //   dispatch(
  //     getTimesheet({
  //       page: page,
  //       per: size,
  //       start: start,
  //       end: end,
  //       sort: sort,
  //     }),
  //   )
  // }
  // const onChange = (size, page) => {
  //   console.log(page)
  //   dispatch(getTimesheet({ perPage: page, page: size }))
  // }
  return (
    <>
      <div className="table-style">
        <CMTable
          loading={loading}
          sx={{ align: 'center', width: '100%' }}
          className="table-timesheet"
          columns={columns}
          data={row ? row : []}
          width={{ id: '5%' }}
          rowClassName={(record, index) => {
            if (
              moment(record?.work_date).format('ddd') === 'Sun' ||
              moment(record?.work_date).format('ddd') === 'Sat'
            ) {
              return 'row-null'
            } else {
              return ''
            }
          }}
          pagination={{}}
          // onRow={(record, index, row) => ({
          //   onClick: (e) => {
          //     console.log(record, index)
          //     e.preventDefault()
          //     setVisible(true)
          //     setDateTimelog(
          //       moment(record.work_date).format('DD/MM/YYYY | ddd'),
          //     )
          //   },
          // })}
        ></CMTable>
      </div>

      {/* <Table
        rowClassName={(record, index) => {
          if (
            moment(record.work_date).format('ddd') === 'Sun' ||
            moment(record.work_date).format('ddd') === 'Sat'
          ) {
            return 'row-null'
          } else {
            return ''
          }
        }}
        onRow={(record) => {
          return () => {
            onClick: (e) => {
              setVisible(true)
              setDateTimelog(record.work_date)
            }
          }
        }}
        columns={columns}
        dataSource={row}
        sx={{ align: 'center', width: '100%' }}
      /> */}
      <Modal
        date={dateTimelog}
        title="Time Logs"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <ModalLogTimesheet />
      </Modal>

      {isOpen.isOpenForget && (
        <ForgetModal
          isOpen={true}
          row={checkModal.row}
          handleCloseForget={() => {
            setIsOpen((isOpen.isOpenForget = false))
          }}
        ></ForgetModal>
      )}
      {isOpen.isOpenLateEarly && (
        <LateEarlyModal
          isOpen={true}
          row={checkModal.row}
          handleCloseLateEarly={() => {
            setIsOpen((isOpen.isOpenLateEarly = false))
          }}
        ></LateEarlyModal>
      )}
      {isOpen.isOpenLeave && (
        <LeaveModal
          isOpen={true}
          row={checkModal.row}
          handleCloseLeave={() => {
            setIsOpen((isOpen.isOpenLeave = false))
          }}
        ></LeaveModal>
      )}
      {isOpen.isOpenOT && (
        <RegisterOT
          isOpen={true}
          row={checkModal.row}
          handleCloseOT={() => {
            setIsOpen((isOpen.isOpenOT = false))
          }}
        />
      )}
    </>
  )
}
Timesheet.propTypes = {
  row: PropTypes.array,
  start: PropTypes.string,
  end: PropTypes.string,
  sort: PropTypes.string,
  page: PropTypes.number,
  total: PropTypes.number,
  current: PropTypes.number,
  loading: PropTypes.bool,
}

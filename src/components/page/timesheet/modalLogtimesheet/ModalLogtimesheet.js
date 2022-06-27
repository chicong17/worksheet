import React, { useEffect } from 'react'
import 'antd/dist/antd.min.css'
import { Table, Typography } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getModalTimelog } from '../slice/sliceModal'

const { Text } = Typography
export default function ModalLogTimesheet(date) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getModalTimelog(date))
  }, [date])
  const worksheet = useSelector((state) => {
    return state.timesheet.worksheet.data
  })

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'key',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return <Text>{moment(date).format('YYYY/MM/DD, dddd')} </Text>
      },
    },
    {
      title: 'Checktime',
      dataIndex: 'checktime',
      key: 'checktime',
      render: (checktime) => {
        return <Text>{moment(checktime).format('HH:mm')}</Text>
      },
    },
  ]
  return (
    <>
      <Table
        columns={columns}
        dataSource={worksheet}
        pagination={{ position: ['none'] }}
      ></Table>
    </>
  )
}

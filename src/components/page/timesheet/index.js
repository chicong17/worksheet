import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Button, Space, Form, DatePicker } from 'antd'
import { Typography } from 'antd'
import { Radio } from 'antd'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './searchField.scss'
import 'antd/dist/antd.min.css'
import Timesheet from './tableTimesheet'
import { useDispatch, useSelector } from 'react-redux'
import { getTimesheet } from './slice/slice'
const { Option } = Select
const { Text } = Typography
const dateFormat = 'DD/MM/YYYY'

export default function SearchField() {
  const [choose, setChoose] = useState(1)
  const dispatch = useDispatch()
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')

  const lastday = moment().subtract(1, 'days').format('YYYY-MM-DD')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const firstDayOfPreviousMonth = moment()
    .subtract(1, 'months')
    .startOf('month')
    .format('YYYY-MM-DD')
  const lastDayOfPreviousMonth = moment()
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD')
  const firstDayOfYear = moment().startOf('year').format('YYYY-MM-DD')
  const [params, setParams] = useState({
    page: 3,
    sort: 'asc',
    start: '',
    end: '',
    per: 30,
  })

  useEffect(() => {
    dispatch(getTimesheet({ params }))
  }, [params])

  // useEffect(() => {
  //   dispatch(getTimesheet({ newParams }))
  // }, [params])
  const worksheet = useSelector((state) => {
    return state.timesheet.worksheet
  })
  const loading = useSelector((state) => {
    return state.timesheet.isLoading
  })
  console.log('aa', loading)
  console.log(worksheet)
  const OnChangeStartDate = (value) => {
    setStartDate(value)
  }
  const OnChangeEndDate = (value) => {
    setEndDate(value)
  }
  const onFinish = (values) => {
    console.log('form', values)
    const start = moment(values.startdate).format('YYYY-MM-DD')
    const end = moment(values.enddate).format('YYYY-MM-DD')
    if (values.selected === 1) {
      if (values.selecteddate === 3) {
        setParams({
          page: 3,
          sort: values.sort,
          start: firstDayOfRecentMonth,
          end: lastday,
          per: 30,
        })
      } else if (values.selecteddate === 2) {
        setParams({
          page: 1,
          sort: values.sort,
          start: firstDayOfPreviousMonth,
          end: lastDayOfPreviousMonth,
        })
      } else if (values.selecteddate === 1) {
        setParams({
          page: 1,
          sort: values.sort,
          start: firstDayOfYear,
          end: lastday,
        })
      } else {
        setParams({
          page: 1,
          sort: values.sort,
          start: '',
          end: lastday,
          per: 90,
        })
      }
    }

    if (values.selected === 2) {
      if (
        values.startdate === undefined ||
        (values.startdate === null && values.enddate === undefined)
      ) {
        setParams({
          page: 1,
          sort: values.sort,
          start: '',
          end: '',
          per: 30,
        })
      } else if (
        (values.startdate !== undefined && values.enddate === undefined) ||
        values.enddate === null
      ) {
        setParams({
          page: '',
          sort: values.sort,
          start: start,
          end: '',
          per: 50,
        })
      } else {
        setParams({
          page: '',
          sort: values.sort,
          start: '',
          end: end,
          per: 30,
        })
      }
    }
  }

  const handleReset = () => {
    form.resetFields()
    setChoose(1)
  }
  const [form] = Form.useForm()
  const onChangeChoose = (e) => {
    setChoose(e.target.value)
  }

  return (
    <>
      <div className="search-field">
        <fieldset>
          <legend>My Time Sheet</legend>
          <Form
            form={form}
            layout="horizontal"
            name="form_searchList"
            className="searchList"
            onFinish={onFinish}
            scrollToFirstError
            initialValues={{
              selecteddate: 3,
              selected: 1,
              sort: 'asc',
              startdate: startDate,
              enddate: endDate,
              radioGroup: 2,
            }}
          >
            <div className="search-form">
              <div className="selected_choose">
                <Form.Item name="selected">
                  <Radio.Group
                    name="radioGroup"
                    onChange={onChangeChoose}
                    value={choose}
                  >
                    <Space direction="vertical" size={35}>
                      <Radio value={1}>Choose from list</Radio>
                      <Radio value={2}>Choose start, end</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <div className="selected_data">
                  <Form.Item name="selecteddate">
                    <Select style={{ width: 150 }} disabled={choose === 2}>
                      <Option value={3}>This month</Option>
                      <Option value={2}>Last month</Option>
                      <Option value={1}>This year year</Option>
                      <Option value="all">All</Option>
                    </Select>
                  </Form.Item>
                  <Space direction="horizontal" size={25} align="center">
                    <Form.Item name="startdate">
                      <DatePicker
                        format={dateFormat}
                        disabled={choose === 1}
                        onChange={OnChangeStartDate}
                      />
                    </Form.Item>
                    <span className="text_to">To</span>
                    <Form.Item name="enddate">
                      <DatePicker
                        format={dateFormat}
                        disabled={choose === 1}
                        onChange={OnChangeEndDate}
                      />
                    </Form.Item>
                  </Space>
                </div>
              </div>

              <div className="selected_sort">
                <Text className="text-sort">Sort by work date</Text>
                <Form.Item name="sort">
                  <Select style={{ width: 150 }}>
                    <Option value="asc">Ascending</Option>
                    <Option value="desc">Descending</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="button-form-search">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="large"
                htmlType="submit"
              >
                Search
              </Button>
              <Button size="large" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
        </fieldset>

        <>
          <Timesheet
            row={worksheet.data}
            per={params.per}
            start={params.start}
            end={params.end}
            sort={params.sort}
            total={worksheet.total}
            current={worksheet.currentPage}
            loading={loading}
          ></Timesheet>
        </>
      </div>
    </>
  )
}

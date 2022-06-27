import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Row, Col, Skeleton, TimePicker } from 'antd'
import {
  DialogRequest,
  dateTime,
  typeRequest,
  handleField,
  handleDateTime,
  buttonForm,
  tryCatch,
  endPoint,
  messageRequest,
  requestSlice,
  checkRequest,
} from '../../index'
import styles from './RegisterOT.module.scss'
import moment from 'moment'

const {
  checkRequestStatus,
  checkRequestStatusColorText,
  checkRequestComment,
  checkRequestManager,
} = checkRequest

const RegisterOT = ({ isOpen, row, handleCloseOT }) => {
  const [hours, minutes] = row.ot_time
    ? row.ot_time?.split(':')
    : '00:00'.split(':')
  const [requestExists, setRequestExists] = useState(false)
  const [errorTimeOT, setErrorTimeOT] = useState(false)
  const DateOT = Number(+hours + minutes / 60)
  const schema = yup.object().shape({
    reasonInput: yup.string().required('Please enter reason'),
    timeRequestOT: yup.date().nullable().required('Please enter timeRequestOT'),
  })
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { request, status } = useSelector((state) => state.requests)

  useEffect(() => {
    const checkRequestExists = async () => {
      await dispatch(
        requestSlice.getRequestsOfDay({
          url: endPoint.GET_REQUEST_OT,
          date: row.work_date,
        }),
      )
    }
    checkRequestExists()
  }, [])

  const date2 = new Date(`01/01/2022 ${request.request_ot_time}`)

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('reasonInput', request.reason)
      setValue('timeRequestOT', moment(date2))
      setRequestExists(true)
    }
  }, [request])

  const onSubmit = async (values, e) => {
    if (
      dateTime.timeToDecimal(dateTime.formatTime(values.timeRequestOT)) >=
      DateOT
    ) {
      setErrorTimeOT(true)
      return null
    }

    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()

    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_OT,
          check_in: dateTime.formatTime(row.checkin || row.checkin_original),
          check_out: dateTime.formatTime(row.checkout || row.checkout_original),
          request_for_date: row.work_date,
          request_ot_time: dateTime.formatTime(values.timeRequestOT),
          reason: values.reasonInput,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.postRequests({
              url: endPoint.POST_REQUEST_OT,
              requestData: newRequest,
            }),
          ),
          messageRequest.CREATE,
          handleCloseModal,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          request_type: typeRequest.REQUEST_OT,
          check_in: dateTime.formatTime(row.checkin || row.checkin_original),
          check_out: dateTime.formatTime(row.checkout || row.checkout_original),
          request_for_date: row.work_date,
          request_ot_time: dateTime.formatTime(values.timeRequestOT),
          reason: values.reasonInput,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.putRequests({
              id: request.id,
              requestData: updateRequest,
              url: endPoint.PUT_REQUEST_OT,
            }),
          ),
          messageRequest.UPDATE,
          handleCloseModal,
        )
        break
      case 'DELETE':
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.deleteRequests({
              url: endPoint.DELETE_REQUEST_OT,
              id: request.id,
            }),
          ),
          messageRequest.DELETE,
          handleCloseModal,
        )
        break
      default:
        throw new Error('An error occurred')
    }
  }
  const handleCloseModal = () => {
    handleCloseOT()
    dispatch(
      requestSlice.getRequestsOfDay({
        url: endPoint.GET_REQUEST_OT,
        date: -1,
      }),
    )
  }

  return (
    <DialogRequest
      isOpen={isOpen}
      handleModal={handleCloseModal}
      title="Register Overtime"
      listButton={buttonForm.formRequestButton}
      statusRequest={request.status}
      requestExists={requestExists}
      statusGetRequest={status}
    >
      <>
        <form
          id="myForm"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          {status === 'loading' ? (
            <Skeleton paragraph={{ rows: 10 }}></Skeleton>
          ) : (
            <>
              <Row>
                <Col xl={4}>Registration date:</Col>
                <Col xl={20}>
                  {request?.created_at
                    ? dateTime.formatDateTime(request?.create_at)
                    : ''}
                </Col>
              </Row>
              <Row>
                <Col xl={4}>Register for date: </Col>
                <Col xl={20}>{dateTime.formatDate(row?.work_date)}</Col>
              </Row>
              <Row>
                <div className={styles.groupCol}>
                  <Col flex="160px">Check-in: </Col>
                  <Col flex="auto">
                    {handleDateTime.checkInvalidTime(row?.checkin_original)}
                  </Col>
                </div>

                <div className={styles.groupCol}>
                  <Col flex="160px">Check-out: </Col>
                  <Col flex="auto">
                    {handleDateTime.checkInvalidTime(row?.checkout_original)}
                  </Col>
                </div>
              </Row>
              <Row>
                <div className={styles.groupCol}>
                  <Col flex="160px">Request OT: </Col>
                  <Col flex="auto" style={{ position: 'relative' }}>
                    <Controller
                      name="timeRequestOT"
                      control={control}
                      render={({ field }) => (
                        <>
                          <TimePicker
                            disabled={handleField.disableField(request.status)}
                            format={dateTime.formatTimeType}
                            style={{
                              width: '100px',
                              marginRight: '10px',
                              maxWidth: '100%',
                            }}
                            {...field}
                          />
                        </>
                      )}
                    />
                    <div style={{ position: 'absolute', top: '100%', left: 0 }}>
                      {errors.timeRequestOT && (
                        <div className={styles.errorField}>
                          {errors.timeRequestOT?.message}
                        </div>
                      )}
                      {errorTimeOT && (
                        <div className={styles.errorField}>
                          Must be less Actual Overtime
                        </div>
                      )}
                    </div>
                  </Col>
                </div>
                <div className={styles.groupCol}>
                  <Col flex="160px">Actual Overtime: </Col>
                  <Col flex="auto">{row.ot_time || '--:--'}</Col>
                </div>
              </Row>
              <Row>
                <Col flex="100%">
                  <h3>NOTE:</h3>
                </Col>
                <Col flex="100%">
                  <span>
                    - Thời gian bắt đầu được tính OT là sau 01:00 sau giờ kết
                    thúc làm việc chính thức
                  </span>
                </Col>
                <Col flex="100%">
                  <p style={{ fontStyle: 'oblique' }}>
                    Ví dụ ca làm việc từ 08:00 AM đến 17:00 PM, thì thời gian
                    được bắt đầu tính OT là 18:00 PM
                  </p>
                </Col>
                <Col flex="100%">
                  <span>
                    - Thời gian request OT
                    <span style={{ color: 'red' }}> không lớn hơn </span> thời
                    gian Overtime Actual. Các trường hợp OT khi remote cần yêu
                    cầu qua email.
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xl={4} style={{ marginBottom: '10px' }}>
                  Reason: <span className={styles.requiredField}>(*)</span>
                </Col>
                <Col xl={20}>
                  <Controller
                    name="reasonInput"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input.TextArea
                          showCount
                          maxLength={100}
                          placeholder="Please enter not too 100 characters"
                          rows={4}
                          disabled={handleField.disableField(request.status)}
                          {...field}
                          autoSize={{ minRows: 5, maxRows: 5 }}
                        />
                        {errors.reasonInput && (
                          <span className={styles.errorField}>
                            {errors.reasonInput?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Col>
              </Row>
              {request.status !== 0 && request.status && (
                <>
                  <Row>
                    <Col xl={4}>Status:</Col>
                    <Col xl={20}>
                      <strong
                        style={{
                          color: checkRequestStatusColorText(request.status),
                        }}
                      >
                        {checkRequestStatus(request.status).toUpperCase()}
                      </strong>
                    </Col>
                  </Row>
                  <Row>
                    <>
                      <Col xl={4}>
                        {checkRequestManager(
                          request.manager_confirmed_status,
                          request.admin_approved_status,
                        )}
                      </Col>
                      <Col xl={20}>
                        <p
                          style={{
                            color: checkRequestStatusColorText(request.status),
                          }}
                        >
                          {checkRequestComment(
                            request.status,
                            request.manager_confirmed_comment,
                            request.admin_approved_comment,
                            request.manager_confirmed_status,
                            request.admin_approved_status,
                          )}
                        </p>
                      </Col>
                    </>
                  </Row>
                </>
              )}
            </>
          )}
        </form>
      </>
    </DialogRequest>
  )
}

RegisterOT.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseOT: PropTypes.func,
  row: PropTypes.object,
}

export default RegisterOT

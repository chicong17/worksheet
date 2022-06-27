import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { TimePicker, Input, Checkbox, Row, Col, Skeleton } from 'antd'

import {
  DialogRequest,
  dateTime,
  typeStatusRequest,
  typeRequest,
  handleField,
  handleDateTime,
  buttonForm,
  tryCatch,
  messageRequest,
  endPoint,
  requestSlice,
  checkRequest,
} from '../../index'
import { getErrorCount, setErrorCount } from './handleErrorCount'
import styles from './ForgetModal.module.scss'

const {
  checkRequestStatus,
  checkRequestStatusColorText,
  checkRequestComment,
  checkRequestManager,
} = checkRequest

const ForgetModal = ({ isOpen, row, handleCloseForget }) => {
  const [requestExists, setRequestExists] = useState(false)

  const dispatch = useDispatch()
  const { request, status } = useSelector((state) => state.requests)

  const schema = yup.object().shape({
    reasonInput: yup.string().required('Please enter reason'),
    checkInTime: yup.date().nullable().required('Please enter check-in'),
    checkOutTime: yup.date().nullable().required('Please enter check-out'),
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      checkInTime: dateTime.momentType('08:00'),
      checkOutTime: dateTime.momentType('17:00'),
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const checkRequestExists = async () => {
      await dispatch(
        requestSlice.getRequestsOfDay({
          url: endPoint.GET_REQUEST_FORGET_OF_DAY,
          date: row.work_date,
        }),
      )
    }
    checkRequestExists()
  }, [])

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue(
        'checkInTime',
        dateTime.momentType(dateTime.formatTime(request?.check_in)),
      )
      setValue(
        'checkOutTime',
        dateTime.momentType(dateTime.formatTime(request?.check_out)),
      )
      setValue('specialReason', setErrorCount(request.error_count))
      setValue('reasonInput', request.reason)
      setRequestExists(true)
    }
  }, [request])

  const onSubmit = async (values, e) => {
    const { specialReason } = values
    const errorCount = getErrorCount(specialReason)
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_FORGET,
          request_for_date: row.work_date,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          error_count: errorCount,
          reason: values.reasonInput,
          status: typeStatusRequest.SEND,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.postRequests({
              url: endPoint.POST_REQUEST_FORGET,
              requestData: newRequest,
            }),
          ),
          messageRequest.CREATE,
          handleCloseModal,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          request_type: typeRequest.REQUEST_FORGET,
          request_for_date: row.work_date,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          error_count: errorCount,
          reason: values.reasonInput,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.putRequests({
              id: request.id,
              requestData: updateRequest,
              url: endPoint.PUT_REQUEST_FORGET,
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
              url: endPoint.DELETE_REQUEST_FORGET,
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
    handleCloseForget()
    dispatch(
      requestSlice.getRequestsOfDay({
        url: endPoint.GET_REQUEST_FORGET_OF_DAY,
        date: -1,
      }),
    )
  }

  return (
    <DialogRequest
      isOpen={isOpen}
      handleModal={handleCloseModal}
      title="Register Forget Check-in/Check-out"
      listButton={buttonForm.formRequestButton}
      statusRequest={request.status}
      requestExists={requestExists}
      statusGetRequest={status}
    >
      <>
        <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
          {status === 'loading' ? (
            <Skeleton paragraph={{ rows: 10 }} />
          ) : (
            <>
              <Row>
                <Col xl={4}>Registration date: </Col>
                <Col xl={20}>
                  {request?.created_at
                    ? dateTime.formatDateTime(request?.create_at)
                    : ''}
                </Col>
              </Row>
              <Row>
                <Col xl={4}>Register for date: </Col>
                <Col xl={20}>{row.work_date}</Col>
              </Row>
              <Row>
                <Col xl={4} className={styles.dFlex}>
                  Check-in: <span className={styles.requiredField}>(*)</span>
                </Col>
                <Col xl={20}>
                  <Controller
                    name="checkInTime"
                    control={control}
                    render={({ field }) => (
                      <>
                        <TimePicker
                          disabled={handleField.disableField(request.status)}
                          format={dateTime.formatTimeType}
                          {...field}
                          style={{
                            width: '100px',
                            marginRight: '10px',
                            maxWidth: '100%',
                          }}
                        />
                        {errors.checkInTime && (
                          <span className={styles.errorField}>
                            {errors.checkInTime?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <span className="ant-form-text">
                    ({handleDateTime.checkInvalidTime(row.checkin_original)})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xl={4} className={styles.dFlex}>
                  Check-out: <span className={styles.requiredField}>(*)</span>
                </Col>
                <Col xl={20}>
                  <Controller
                    name="checkOutTime"
                    control={control}
                    render={({ field }) => (
                      <>
                        <TimePicker
                          disabled={handleField.disableField(request.status)}
                          format={dateTime.formatTimeType}
                          style={{ width: '100px', marginRight: '10px' }}
                          {...field}
                        />
                        {errors.checkOutTime && (
                          <span className={styles.errorField}>
                            {errors.checkOutTime?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <span className="ant-form-text">
                    ({handleDateTime.checkInvalidTime(row.checkout_original)})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xl={4}>Special reason: </Col>
                <Col xl={20}>
                  <Controller
                    name="specialReason"
                    control={control}
                    render={({ field }) => (
                      <Checkbox.Group
                        disabled={handleField.disableField(request.status)}
                        {...field}
                      >
                        <Row style={{ marginBottom: 0 }}>
                          <Checkbox value={1}>
                            Check-in not counted as error
                          </Checkbox>
                          <Checkbox value={2}>
                            Check-out not counted as error
                          </Checkbox>
                        </Row>
                      </Checkbox.Group>
                    )}
                  />
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
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          disabled={handleField.disableField(request.status)}
                          {...field}
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

ForgetModal.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseForget: PropTypes.func,
  row: PropTypes.object,
}

export default ForgetModal

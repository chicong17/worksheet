import { typeStatusRequest } from '../index'

export const disableField = (status) => {
  return (
    status === typeStatusRequest.CONFIRMED ||
    status === typeStatusRequest.APPROVED ||
    status === typeStatusRequest.REJECT
  )
}

export const disableFieldWhenChoose = (value) => {
  return !!value
}

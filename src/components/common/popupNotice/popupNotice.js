import { notification } from 'antd'

export const ERROR_MESSAGE = 'error'
export const SUCCESS_MESSAGE = 'success'
export const SUCCESS_WARNING = 'warning'
export const SUCCESS_INFO = 'info'

export const popupNotice = (type, message, description, duration = 2) => {
  notification[type]({
    message,
    description,
    duration,
  })
}

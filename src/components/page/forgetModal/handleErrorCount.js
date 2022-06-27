const errorSystem = 0
const errorCheckIn = 1
const errorCheckOut = 2
const errorBoth = 3

export const getErrorCount = (specialReason) => {
  if ((specialReason || []).length !== 0) {
    if ((specialReason || []).length === 2) {
      return errorBoth
    }
    if ((specialReason || []).length === 1 && specialReason.includes(1)) {
      return errorCheckIn
    }
    if ((specialReason || []).length === 1 && specialReason.includes(2)) {
      return errorCheckOut
    }
  }
  return errorSystem
}

export const setErrorCount = (specialReason) => {
  if (specialReason) {
    if (specialReason === errorBoth) {
      return [1, 2]
    }
    if (specialReason === errorCheckIn) {
      return [1]
    }
    if (specialReason === errorCheckOut) {
      return [2]
    }
  }
  return []
}

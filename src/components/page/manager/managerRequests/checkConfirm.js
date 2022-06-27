export const checkConfirm = (status, role, closeFunc, confirmFunc) => {
  return (status === -1 && role === 'Admin') ||
    (status === 2 && role === 'Admin') ||
    (status === -1 && role === 'Manager') ||
    (status === 1 && role === 'Manager')
    ? closeFunc
    : confirmFunc
}

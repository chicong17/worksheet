export const checkShift = (shiftName, checkIn, checkOut) => {
  const shiftNewName = shiftName.toUpperCase()
  switch (shiftNewName) {
    case 'CA 1':
      return `Ca 1 - (${checkIn} - ${checkOut})`
    case 'CA 2':
      return `Ca 2 - (${checkIn} - ${checkOut})`
    case 'CA 3':
      return `Ca 3 - (${checkIn} - ${checkOut})`
    default:
      break
  }
}

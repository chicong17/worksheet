import React, { useRef, useState, useEffect } from 'react'
import styles from './Index.module.scss'
import UserListBar from './UserListBar'

const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const barRef = useRef(null)
  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const bar = barRef.current

    bar.addEventListener('click', handleClick)

    return () => {
      return bar.removeEventListener('click', handleClick)
    }
  }, [])
  return (
    <div className={styles.UserBar}>
      <i className="fa-solid fa-bars" ref={barRef}></i>
      <UserListBar open={isOpen} onClick={handleClick} />
    </div>
  )
}

export default UserBar

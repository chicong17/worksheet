import React from 'react'
import { useNavigate } from 'react-router-dom'
import { del } from '../../service/requestApi'

const Logout = () => {
  const navigate = useNavigate()

  const onClick = async () => {
    await del('/logout')
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <h3 onClick={onClick}>Logout</h3>
    </>
  )
}

export default Logout

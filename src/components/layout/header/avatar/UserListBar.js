import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './Index.module.scss'
import { Row, Col } from 'antd'
import Cat from './crazyCat.jpg'
import { Link } from 'react-router-dom'
import ChangePassword from '../../../page/changePassword/ChangePassword'
import Logout from '../../../page/logout/Logout'
import UserEditForm from '../../../page/editProfileModal/UserEditForm'
import { useSelector } from 'react-redux'

const UserListBar = ({ open, onClick }) => {
  const refChildren = useRef(null)
  const remove = useRef(null)

  const data = useSelector((state) => state.userInfo?.currentUser?.role)

  useEffect(() => {
    const children = refChildren.current
    const removeX = remove.current

    const handleRemove = (e) => {
      onClick()
    }

    if (children && removeX) {
      removeX.addEventListener('click', handleRemove)
    }

    return () => {
      if (children && removeX) {
        removeX.removeEventListener('click', handleRemove)
      }
    }
  }, [open])

  if (!open) return null

  return (
    <div className={styles.UserListBar}>
      <Row style={{ width: '100%', height: '100%' }}>
        <Col xs={20} className={styles.UserCol} ref={refChildren}>
          <div className={styles.UserListColumn}>
            <div className={styles.NavHeader}>
              <div className={styles.NavImage}>
                <img src={Cat} alt="CatCrazy" />
                <h3>Cat Crazy </h3>
              </div>
              <i
                className="fa-solid fa-xmark"
                style={{ position: 'absolute', top: 0, right: 0 }}
                ref={remove}
              ></i>
            </div>
            <div className={styles.NavBody} onClick={onClick}>
              <Link to="/" className={styles.formGroup}>
                <h3>HOME</h3>
                <i className="fa-solid fa-house-chimney"></i>
              </Link>
              <Link to="/timesheet" className={styles.formGroup}>
                <h3>TIMESHEET</h3>
                <i className="fa-solid fa-business-time"></i>
              </Link>
              <Link to={data || '/'} className={styles.formGroup}>
                <h3>MANAGER</h3>
                <i className="fa-solid fa-bars-progress"></i>
              </Link>
            </div>
            <div className={styles.NavBody}>
              <div className={styles.formGroup}>
                <UserEditForm />
                <i className="fa-solid fa-hammer"></i>
              </div>
              <div className={styles.formGroup}>
                <ChangePassword />
                <i className="fa-solid fa-key"></i>
              </div>
              <div className={styles.formGroup}>
                <Logout />
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

UserListBar.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
}

export default UserListBar

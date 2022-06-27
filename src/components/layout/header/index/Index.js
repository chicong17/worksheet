import React from 'react'
import { Row, Col } from 'antd'
import ListItem from '../listItem/Index'
import Avatar from '../avatar/Index'
import styles from './Index.module.scss'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <>
      <div className={styles.Navbar} id="Header_TimeSheet">
        <Row style={{ height: '100%', width: '100%' }}>
          <Col xs={12} md={8} xl={12} style={{ height: '100%' }}>
            <Link to="/">
              <h2
                style={{
                  height: '100%',
                  color: '#23466d',
                  marginLeft: '50px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                RELIPA PORTAL
              </h2>
            </Link>
          </Col>
          <Col xs={0} md={12} xl={10} style={{ height: '100%' }}>
            <ListItem />
          </Col>
          <Col xs={12} md={4} xl={1} style={{ height: '100%' }}>
            <Avatar />
          </Col>
        </Row>
      </div>
      <Outlet />
    </>
  )
}

export default Index

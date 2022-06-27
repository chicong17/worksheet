import { Descriptions, Row, Col } from 'antd'
import 'antd/dist/antd.min.css'
import React from 'react'
import { useState, useEffect } from 'react'

import { get } from '../../service/requestApi'

const API = '/members'

const UserDescription = () => {
  const [profileInfo, setProfileInfo] = useState([])

  useEffect(() => {
    get(API + '/edit').then((res) => {
      setProfileInfo(res.data)
    })
  }, [])

  return (
    <Descriptions>
      <Row>
        <Col span={24}>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={6}>Member Code:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.member_code}</Descriptions.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={6}>Email:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.email}</Descriptions.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={6}>Name:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.full_name}</Descriptions.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Phone Number:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.phone}</Descriptions.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Descriptions>
  )
}

export default UserDescription

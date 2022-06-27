import React from 'react'
import LogoMain from './logoMain.png'
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <a href="#">
        <img src={LogoMain} alt="logoMain" />
      </a>
    </div>
  )
}

export default Logo

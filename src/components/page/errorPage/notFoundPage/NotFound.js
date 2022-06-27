import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'
import imageNotFound from './image/404.svg'
import imageRocket from './image/rocket.svg'
import imageEarth from './image/earth.svg'
import imageMoon from './image/moon.svg'
import imageAstronaut from './image/astronaut.svg'

const NotFound = () => {
  return (
    <div className={styles.bgPurple}>
      <div className={styles.stars}>
        <div className={styles.centralBody}>
          <img
            className={styles.imageNotFound}
            src={imageNotFound}
            width="300px"
          />
          <Link to="/" className={styles.btnGoHome}>
            GO BACK HOME
          </Link>
        </div>
        <div className={styles.objects}>
          <img className={styles.objectRocket} src={imageRocket} width="40px" />
          <div>
            <img
              className={styles.objectEarth}
              src={imageEarth}
              width="100px"
            />
            <img className={styles.objectMoon} src={imageMoon} width="80px" />
          </div>
          <div className={styles.boxAstronaut}>
            <img
              className={styles.objectAstronaut}
              src={imageAstronaut}
              width="140px"
            />
          </div>
        </div>
        <div className={styles.glowingStars}>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

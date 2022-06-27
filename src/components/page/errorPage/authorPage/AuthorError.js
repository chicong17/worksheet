import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AuthorError.module.scss'
import ImageAuthorError from './image/401.svg'
import ImageMeteor from './image/meteor.svg'
import ImageAstronaut from './image/astronaut.svg'
import ImageSpaceShip from './image/spaceship.svg'

const AuthorizedError = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mars} />
      <img src={ImageAuthorError} className={styles.logoAuthorError} />
      <img src={ImageMeteor} className={styles.meteor} />
      <p className={styles.title}>Oh no!!</p>
      <p className={styles.subtitle}>
        You do not have access to the requested page.
      </p>
      <div align="center">
        <Link to="/" className={styles.btnBack}>
          GO BACK HOME
        </Link>
      </div>
      <img src={ImageAstronaut} className={styles.astronaut} />
      <img src={ImageSpaceShip} className={styles.spaceship} />
    </div>
  )
}

export default AuthorizedError

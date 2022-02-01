import React, { FC } from 'react'
import styles from './Header.module.scss'
import plus from '../../img/plus.png'

interface HeaderProps {
  toggleModal: () => void
}

const Header: FC<HeaderProps> = ({ toggleModal }) => {
  return (
    <div className={styles.header}>
      <p>Add task</p>
      <button onClick={toggleModal}>
        <img src={plus} alt="plus" />
      </button>
    </div>
  )
}

export default Header

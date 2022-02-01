import React, { FC, memo } from 'react'
import styles from './SideBar.module.scss'
import { Link } from "react-router-dom"
import { Task } from '../../services/interfaces'

interface SideBarProps {
  data: Task[] | undefined
}

const SideBar: FC<SideBarProps> = ({ data }) => {

  const copyOfData = data?.slice(0)
  const subjectTasksNames = copyOfData?.map(task => task.subjectTitle)
  const uniqueTaskLinksNames = [...new Set(subjectTasksNames)]

  const allTaskLinksNames = uniqueTaskLinksNames.map((item) => {
    const card = data?.filter(subject => subject.subjectTitle === item)
    const cardsLength = card?.length
    const background = card?.[0]?.color
    return (
      <Link key={item} to={`/?tasks=${item}`} className={styles.item}>
        <span>{item}</span>
        <span style={{background: background}}>{cardsLength}</span>
      </Link>
    )
  })

  const amount = data?.length || 0

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>My Task</div>
      <div className={styles.list}>
        <Link to="/" className={styles.item}>
          <span>All Tasks</span>
          <span style={{background: '#000000'}}>{amount}</span>
        </Link>
        {allTaskLinksNames}
      </div>
    </div>
  )
}

export default memo(SideBar)

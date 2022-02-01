import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../Card/Card'
import styles from './CardsGrid.module.scss'
import { Task } from '../../services/interfaces'
import { filterBySubject } from '../../services/services'

interface CardsGridProps {
  data: Task[] | undefined
}

const CardsGrid: FC<CardsGridProps> = ({ data }) => {
  
  const [searchParams] = useSearchParams()
  const taskSubject = searchParams.get("tasks")

  const filteredTasks = React.useMemo(() => {
    if (!taskSubject) return data
    return filterBySubject(taskSubject, data)
  }, [taskSubject, data])

  const finalTasksList = filteredTasks?.map(item => (
    <Card
      key={item.id}
      item={item}
    />
  ))

  return (
    <div className={styles.cards}>
      {finalTasksList}
    </div>
  ) 
}

export default CardsGrid

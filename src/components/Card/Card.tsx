import React, { ChangeEvent, FC, useState } from 'react'
import styles from './Card.module.scss'
import edit from '../../img/edit.png'
import remove from '../../img/remove.png'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../redux/API'
import { Task } from '../../services/interfaces'

interface CardProps {
  item: Task
}

const Card: FC<CardProps> = ({ item }) => {

  const [ textAreaValue, setTextAreaValue ] = useState('')
  const [ showtextArea, setShowTextArea ] = useState(false)

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)
  }

  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask, { isLoading: updateTaskIsLoading }] = useUpdateTaskMutation()

  const handleTaskDelete = () => {
    deleteTask(item.id)
  }

  const handleEditTask = () => {
    setTextAreaValue(item.taskDescription)
    setShowTextArea(!showtextArea)
  }

  const handleUpdateTask = () => {
    if (item.taskDescription === textAreaValue) {
      setShowTextArea(!showtextArea)
      return
    }
    updateTask({...item, taskDescription:textAreaValue})
    setShowTextArea(!showtextArea)
  }

  return (
    <div className={styles.card} style={{borderTopColor: item.color}}> 
      <div className={styles.subject} style={{background: `${item.color}26`, color: item.color}}>{item.subjectTitle}</div>
      {updateTaskIsLoading 
        ? <div className={styles.loading}>Loading...</div> 
        : showtextArea
          ? <div className={styles.task}>
              <textarea value={textAreaValue} onChange={handleTextAreaChange}/>
              <button onClick={handleUpdateTask}>Update</button>
            </div>
          : <div className={styles.task}>{item.taskDescription}</div>
      }
      <div className={styles.edit}>
        <img src={edit} alt="edit" onClick={handleEditTask}/>
        <img src={remove} alt="remove" onClick={handleTaskDelete}/>
      </div>
    </div>
  )
}

export default Card

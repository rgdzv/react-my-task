import React, { ChangeEvent, FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import styles from './Modal.module.scss'
import close from '../../img/close.png'
import { useCreateNewTaskMutation } from '../../redux/API'
import { compareColors } from '../../services/services'
import { Task } from '../../services/interfaces'

interface ModalProps {
  toggleModal: () => void
  modalOpen: boolean
  data: Task[] | undefined
}

const Modal: FC<ModalProps> = ({ toggleModal, modalOpen, data }) => {

  const [createNewTask] = useCreateNewTaskMutation()

  const [inputValue, setInputValue] = useState('')
  const [textAreaValue, setTextAreaValue] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createNewTask({
      subjectTitle: inputValue, 
      taskDescription: textAreaValue, 
      color: compareColors(data, inputValue)
    })
    toggleModal()
  }

  const stopEventLaunching = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  useEffect(() => {
    if(modalOpen){
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }   
  }, [])

  return (
    <div className={styles.overlay} onClick={toggleModal}>
      <div className={styles.modal} onClick={stopEventLaunching}>
        <form className={styles.content} onSubmit={handleFormSubmit}>
          <label htmlFor="subject">Subject:</label>
          <input 
            type="text" 
            id="subject" 
            value={inputValue} 
            onChange={handleInputChange} 
            required 
            autoComplete='off'
          />
          <label htmlFor="taskDescription">What you need to do:</label>
          <textarea 
            id="taskDescription" 
            value={textAreaValue} 
            onChange={handleTextAreaChange} 
            required
          />
          <button type="submit">Submit</button>
        </form>
        <img src={close} alt="close" onClick={toggleModal}/>
      </div>
    </div>
  )
}

export default Modal

import React, { FC, useState } from 'react'
import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
import styles from './App.module.scss'
import { Routes, Route} from "react-router-dom"
import Modal from './components/Modal/Modal'
import { useFetchAllTasksQuery } from './redux/API'
import CardsGrid from './components/CardsGrid/CardsGrid'

const App: FC = () => {

  const { data, isLoading, error } = useFetchAllTasksQuery('')
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (error && 'data' in error) {
    return <div className={styles.error}>Error status is {error.status}</div>
  }

  return (
    <div className={styles.content}>
      <SideBar data={data}/>
      <div className={styles.container}>
        <Header
          toggleModal={toggleModal}
        />
        <Routes>
          <Route path="/" element={<CardsGrid data={data}/>}/>
        </Routes>
      </div>
      {modalOpen && 
        <Modal 
          toggleModal={toggleModal} 
          modalOpen={modalOpen}
          data={data}
        />
      }
    </div>
  )
}

export default App

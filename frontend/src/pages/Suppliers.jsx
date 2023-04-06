import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import styles from '../styles/styles.module.scss'

function Suppliers() {
  return (
    <div className={styles['-wrapper']}>
    
      <Sidebar />
        <div className={styles['-content-wrapper']}>

          <Navbar/>
          

          

        </div>

   </div> 
  )
}

export default Suppliers
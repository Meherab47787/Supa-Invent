import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from '../styles/styles.module.scss'
import Navbar from '../components/Navbar'

function AddProduct() {
  return (
    <div className={styles['-wrapper']}>
    
      <Sidebar />
        <div className={styles['-content-wrapper']}>

          <Navbar/>
          

          

        </div>

   </div> 
  )
}

export default AddProduct
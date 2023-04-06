import React from 'react';
import styles from '../styles/styles.module.scss'

function CardInventory(props) {

  

  return (
    <div className={styles['inventory-card']} style={{ backgroundColor: props.backgroundColor }}>
        
    </div>
  )
}

export default CardInventory
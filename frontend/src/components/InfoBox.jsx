import React from 'react';
import styles from '../styles/styles.module.scss';

const InfoBox = ({title, count, icon, bgColor}) => {
  return (
    <div className={`${styles['icon-box']} ${styles[bgColor]}`} >
        <div className={styles['info-icon']}>{icon}</div>
        <h4>{title}: {count}</h4>
     </div>
  )
}

export default InfoBox
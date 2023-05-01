import React from 'react';
import styles from '../styles/styles.module.scss';

const InfoBox = ({title, count, icon, bgColor}) => {
  return (
    <div className={`${styles['icon-box']} ${styles[bgColor]}`} >
        <div className={styles['info-icon']}>{icon}</div>
        <h4><span className={styles['title']}>{title}: &nbsp;</span> <span class="count">{count}</span></h4>
     </div>
  )
}

export default InfoBox
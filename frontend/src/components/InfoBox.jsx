import React from 'react';
import styles from '../styles/styles.module.scss';

const InfoBox = ({title, count, icon}) => {
  return (
    <div className={styles['icon-box'] }>
        <span className={styles['info-icon']}>{icon}</span>
        <span className={styles['info-text']}>
            <p>{title}:</p>
            <h4> {count}</h4>
        </span>
    </div>
  )
}

export default InfoBox
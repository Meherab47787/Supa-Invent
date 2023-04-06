import React, { useState } from 'react';
import styles from '../styles/styles.module.scss'
import { ImHome } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
import { RiCaravanLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import { MdReport, MdLibraryAdd } from 'react-icons/md';  

function Sidebar({children}) {
    

    const [isOpen, setOpening] = useState(false);
    const toggle = () => setOpening(!isOpen)

    const menuItems = [
        {
            path: '/inventory',
            name: 'Inventory',
            icon: <ImHome />
        },

        {
            path: '/addProduct',
            name: 'Add Product',
            icon: <MdLibraryAdd />
        },

        {
            path: '/suppliers',
            name: 'Suppliers',
            icon: <RiCaravanLine />
        },

        {
            path: '/reportBug',
            name: 'Report Bug',
            icon: <MdReport />
        },
    ]

  return (
      <div className={styles['sidebar-container']}>
        <div  style={{width: isOpen? '260px' : '60px',
                      transition: 'all 0.5s ease' }} className={styles['sidebar']}>

            <div className={styles['sidebar-top']}>
                <h1 style={{display: isOpen? 'block' : 'none'}} >Logo</h1>
                <div style={{marginLeft: isOpen? '110px' : '0px',
                             transition: 'all 0.5s ease'}} className={styles['bars']}>
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItems.map((el, index) => (
                    <NavLink to={el.path} key={index} className={styles['link']}>
                        <div className={styles['icon']}>{el.icon}</div>

                        <div className={styles['link-text']}>{isOpen ? el.name : null}</div>
                        
                    </NavLink>
                ))
            }

        </div>
        <main>{children}</main>
    </div>
  )
}
            

export default Sidebar
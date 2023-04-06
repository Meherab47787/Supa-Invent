import styles from '../styles/styles.module.scss'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CardInventory from '../components/CardInventory';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';


const Inventory = () => {

  useRedirectLoggedOutUser("/")

  return (
    <div className={styles['-wrapper']}>
    
      <Sidebar />
        <div className={styles['-content-wrapper']}>

          <Navbar/>
          {/* <div className={styles['cards-holder']}>
            <CardInventory backgroundColor = '#303235'/>
          </div> */}
            <div className={styles['product-cards-holder']}>

            </div>
          

        </div>

   </div> 
  )
}

export default Inventory
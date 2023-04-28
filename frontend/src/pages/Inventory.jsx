import styles from '../styles/styles.module.scss'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// import CardInventory from '../components/CardInventory';
// import ProductCard from '../components/ProductCard';
// import axios from 'axios';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectISLoggedIn } from '../redux/features/auth/authSlice';
import { useEffect } from 'react';
import { getAllProducts } from '../redux/features/product/productSlice';
import ProductList from '../components/ProductList';



const Inventory = () => {

  useRedirectLoggedOutUser("/");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectISLoggedIn);
 
  const {products, isLoading, isError, message} = useSelector((state => state.product));




  
  useEffect(() => {
    if(isLoggedIn === true) {
      dispatch(getAllProducts())
    }
    if(isError){
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch])


  return (
    <div className={styles['-wrapper']}>
    
      <Sidebar />
        <div className={styles['-content-wrapper']}>

          <Navbar/>
          
            <ProductList products={products} isLoading={isLoading}/>
          

        </div>

   </div> 
  )
}

export default Inventory
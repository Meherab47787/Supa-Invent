import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import styles from '../styles/styles.module.scss';
import Navbar from '../components/Navbar';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectISLoggedIn } from '../redux/features/auth/authSlice';
import { getAproduct } from '../redux/features/product/productSlice';

const ProductDetails = () => {



    useRedirectLoggedOutUser("/");
    const dispatch = useDispatch();
    const { id } = useParams();

    const isLoggedIn = useSelector(selectISLoggedIn);
    console.log(isLoggedIn);

    const { product, isLoading, isError, message } = useSelector((state) => {
        return state.product
    })


   
    useEffect(() => {
        if(isLoggedIn === true){
            console.log('in statement');
            dispatch(getAproduct(id))
        }

        if(isError){
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch, id])



  return  <div className={styles['-wrapper']}>
            <Sidebar />
            <div className={styles['-content-wrapper']}>
                
                <Navbar />
                <div className={styles['product-detail']}>
                    { product?.productImage ?(<img src={`../../${product.productImage.filePath}`} alt={'Product_Image'} className={styles['product-image']} />): (
                        <p>no Image set</p>
                    )}
                    <div className={styles['product-info']}>
                        <h2 className={styles['product-name']}>{product?.productName}</h2>
                        <p className={styles['product-price']}>Unit Price: {product?.unitPrice}</p>
                        <p className={styles['product-quantity']}>Available Quantity: {product?.quantity}</p>
                        <p className={styles['product-arrival']}>Arrival Date: {product?.arrivalDate.split('T')[0]}</p>
                    </div>
                </div>
            </div>
        </div>
  
}

export default ProductDetails
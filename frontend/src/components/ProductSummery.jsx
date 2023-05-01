import React, { useEffect } from 'react';
import styles from '../styles/styles.module.scss';
import { TbCurrencyTaka } from 'react-icons/tb';
import { BsCart4, BsCartX } from 'react-icons/bs'
import InfoBox from './InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_STORE_VALUE, selectTotalStoreValue } from '../redux/features/product/productSlice';

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


const iconTaka = <TbCurrencyTaka size={60} color='#fff'/>
const productIcon = <BsCart4 size={60} color='#fff'/>
const outofStockIcon = <BsCartX size={60} color='#fff'/>

const ProductSummery = ({products}) => {

  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);

  useEffect(() => {
    dispatch(CALCULATE_STORE_VALUE(products))
  }, [dispatch, products])


  return  <div className={styles['product-summery']}>
                <div className={styles['info-summery']}>
                    <InfoBox 
                    icon={productIcon}
                    title={'Total Products'} 
                    count={products.length}
                    bgColor='card1'/>

                    <InfoBox 
                    icon={iconTaka}
                    title={'Total Store Value'} 
                    count={`৳ ${formatNumbers(totalStoreValue.toFixed(2))}`}
                    bgColor='card2'/>

                    <InfoBox 
                    icon={outofStockIcon}
                    title={'Out of Stock'} 
                    count={0}
                    bgColor='card3'/>
                </div>
          </div>
  
}

export default ProductSummery
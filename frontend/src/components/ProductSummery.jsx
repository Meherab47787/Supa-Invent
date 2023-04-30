import React from 'react';
import styles from '../styles/styles.module.scss';
import { TbCurrencyTaka } from 'react-icons/tb';
import { BsCart4, BsCartX } from 'react-icons/bs'
import InfoBox from './InfoBox';

const iconTaka = <TbCurrencyTaka size={60} color='#fff'/>
const productIcon = <BsCart4 size={60} color='#fff'/>
const outofStockIcon = <BsCartX size={60} color='#fff'/>

const ProductSummery = ({products}) => {
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
                    count={0}
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
import React, { useEffect, useState } from 'react';
import styles from '../styles/styles.module.scss'
import { FaEdit } from 'react-icons/fa'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../redux/features/product/filterSlice';

const ProductList = ({products, isLoading}) => {
    
    const [search, setSearch] = useState('')
    const filteredProducts = useSelector(selectFilteredProducts)

    const dispatch = useDispatch()

    const shortenText = (text, n) => {
        if(text.length> n){
            const shortenedText = text.substring(0, n).concat('...')
            return shortenedText
        }

        return text;

    }

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({products, search}))
    }, [products, search, dispatch])

  return <div className={styles['product-list']}>
    <hr />
    <div className={styles['table']}>
        <div className={styles['flex-table-column']}>
            <span>
                <h3 className={styles['table-heading']}>Inventory Items</h3>
            </span>
            <span>
                <h3 className={styles['table-heading']}><Search value={search} onChange={(e)=>setSearch(e.target.value)}/></h3>
            </span>
        </div>

        <div className={styles['table']}>
            {!isLoading && products.length === 0? (<p className={styles['no-products-message']}>
                No products found please add a product
            </p>):(
                <table className={styles['product-table']}>
                    <thead>
                        <tr>
                            <th className={styles['table-heading']}>s/n</th>
                            <th className={styles['table-heading']}>Name</th>
                            <th className={styles['table-heading']}>Unit Price</th>
                            <th className={styles['table-heading']}>Quantity</th>
                            <th className={styles['table-heading']}>Total Value</th>
                            <th className={styles['table-heading']}>Arrived At</th>
                            <th className={styles['table-heading']}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        { filteredProducts && filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => {
                                const {_id, productName, quantity, unitPrice, arrivalDate} = product
                                return(
                                    <tr key={_id}>
                                        <td>{index+1}</td>
                                        <td>{shortenText(productName, 16)}</td>
                                        <td>৳ {unitPrice}</td>
                                        <td>{quantity}</td>
                                        <td>৳ {quantity * unitPrice}</td>
                                        <td>{arrivalDate.split('T')[0]}</td>
                                        <td className={styles['icons']}>
                                                <span>
                                                
                                                    <FaEdit color='blue' size={25}/>

                                                </span>
                                            
                                                <span>
                                                    
                                                    <BsFillExclamationCircleFill 
                                                color='purple' size={25}/>

                                                </span>

                                                <span>

                                                    <AiFillDelete color='red' size={25}/>

                                                </span>

                                        </td>
                                    </tr>
                                )
                            }) ): (
                                <tr>
                                    <td colSpan="7" className={styles['no-products-message']}>No products found</td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            )}
        </div>


    </div>
  </div>
}

export default ProductList

import React, { useEffect, useState } from 'react';
import styles from '../styles/styles.module.scss'
import { FaEdit } from 'react-icons/fa'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../redux/features/product/filterSlice';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { deleteProduct, getAllProducts } from '../redux/features/product/productSlice';
import { Link } from 'react-router-dom';

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
    const delProduct = async (id) => {
        await dispatch(deleteProduct(id))
        await dispatch(getAllProducts())
    }

    const confirmDelete = (id) => {

        confirmAlert({
            title: 'Delete Product',
            message: 'Are you sure? This product will be deleted from the inventory.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => delProduct(id)
              },
              {
                label: 'No'
              }
            ]
          })
    }

    //Pagination Begin
        const [currentItems, setCurrentItems] = useState([]);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);
        const itemsPerPage = 5;
    
        useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
    
            setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
        }, [itemOffset, itemsPerPage, filteredProducts]);
    
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
            setItemOffset(newOffset);
        };
    //End Pagination

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({products, search}))
    }, [products, search, dispatch])

  return <div className={styles['product-list']}>
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
                        { currentItems && currentItems.length > 0 ? (
                            currentItems.map((product, index) => {
                                const {_id, productName, quantity, unitPrice, arrivalDate} = product
                                return(
                                    <tr key={_id}>
                                        <td>{itemOffset + index + 1}</td>
                                        <td>{shortenText(productName, 16)}</td>
                                        <td>৳ {unitPrice}</td>
                                        <td>{quantity}</td>
                                        <td>৳ {quantity * unitPrice}</td>
                                        <td>{arrivalDate.split('T')[0]}</td>
                                        <td className={styles['icons']}>
                                                <span>

                                                    <Link to={`/product-edit/${_id}`}>
                                                        <FaEdit color='blue' size={25}/>
                                                    </Link>
                                                </span>
                                            
                                                <span>
                                                    <Link to={`/product-details/${_id}`}>

                                                        <BsFillExclamationCircleFill 
                                                            color='green' 
                                                            size={25}/>
                                                    
                                                    </Link>

                                                </span>

                                                <span>

                                                    <AiFillDelete color='red' 
                                                    size={25}
                                                    onClick={() => {
                                                        confirmDelete(_id)
                                                    }}
                                                    />

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
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Prev"
            renderOnZeroPageCount={null}
            containerClassName={styles.pagination}
            pageLinkClassName={styles['page-num']}
            previousLinkClassName={styles['page-num']}
            nextLinkClassName={styles['page-num']}
            activeLinkClassName={styles.activePage}
        />             

    </div>
  </div>
}

export default ProductList

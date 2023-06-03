import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import styles from '../styles/styles.module.scss'
import Navbar from '../components/Navbar'
import ProductForm from '../components/ProductForm'
import { createProduct} from '../redux/features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllSupplier } from '../redux/features/supplier/supplierSlice';
import { selectISLoggedIn } from '../redux/features/auth/authSlice'

const initialState = {
      productName: '',
      quantity: '',
      unitPrice: ''
}


function AddProduct() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const suppliers = useSelector(state => state.supplier.suppliers);
  
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [supplier, setSupplier] = useState('');
  
  console.log(suppliers);

  useEffect(() => {
    dispatch(getAllSupplier())
    
  }, [dispatch])

  const {productName, quantity, unitPrice} = product


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSupplierChange= (e) => {
    setSupplier(e.target.value)
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('quantity', quantity)
    formData.append('unitPrice', unitPrice)
    formData.append('productImage', productImage)
    formData.append('supplier', supplier)

    console.log(...formData);

    await dispatch(createProduct(formData))

    navigate('/inventory')
  }


  return (
    <div className={styles['-wrapper']}>
    
      <Sidebar />
        <div className={styles['-content-wrapper']}>

          <Navbar/>
          
          <h1>Add a new Product</h1>
          <ProductForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          supplier={supplier}
          handleInputChange = {handleInputChange}
          handleImageChange = {handleImageChange}
          handleSupplierChange = {handleSupplierChange}
          saveProduct = {saveProduct}
          suppliers={suppliers}
          />

        </div>

   </div> 
  )
}

export default AddProduct
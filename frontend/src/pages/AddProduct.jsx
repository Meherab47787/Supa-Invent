import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import styles from '../styles/styles.module.scss'
import Navbar from '../components/Navbar'
import ProductForm from '../components/ProductForm'
import { createProduct} from '../redux/features/product/productSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const initialState = {
      productName: '',
      quantity: '',
      unitPrice: '',
      supplier: ''
}

function AddProduct() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialState)
  const [productImage, setProductImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  // const isLoading = useSelector(selectIsLoading)

  const {productName, quantity, unitPrice} = product


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('quantity', quantity)
    formData.append('unitPrice', unitPrice)
    formData.append('productImage', productImage)

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
          handleInputChange = {handleInputChange}
          handleImageChange = {handleImageChange}
          saveProduct = {saveProduct}
          />

        </div>

   </div> 
  )
}

export default AddProduct
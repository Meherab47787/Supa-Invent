import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import styles from '../styles/styles.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAproduct, selectProduct, updateProduct } from '../redux/features/product/productSlice'
import { useState } from 'react'
import ProductForm from '../components/ProductForm'


const EditProduct = () => {


  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit)
  const [productImage, setProductImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)


  useEffect(() => {
    dispatch(getAproduct(id))
  }, [dispatch, id]);


  useEffect(() => {
    setProduct(productEdit)

    setImagePreview(
      productEdit && productEdit.productImage ? `../../${productEdit.productImage.filePath}` : null
    )
  }, [productEdit])

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }


  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('productName', product?.productName)
    formData.append('quantity', product?.quantity)
    formData.append('unitPrice', product?.unitPrice)
    if(productImage){

      formData.append('productImage', productImage)

    }

    console.log(...formData);

    await dispatch(updateProduct({id, formData}))
    await dispatch(getAllProducts())
    navigate('/inventory')
  }


  return (
    <div className={styles['-wrapper']}>
    
      <Sidebar />
        <div className={styles['-content-wrapper']}>

          <Navbar/>

          <h1>Edit Product</h1>
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

export default EditProduct
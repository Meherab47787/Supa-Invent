import React from 'react';
import styles from '../styles/styles.module.scss'

const ProductForm = ({product, productImage, imagePreview, handleInputChange, handleImageChange, saveProduct}) => {

  
    return (
      <form className={styles.productForm} onSubmit={saveProduct}>
        <div className={styles.formGroup}>
          <label>Product Image</label>
          <input type="file" id="productImage" name="image" onChange={(e) => handleImageChange(e)} />
          {imagePreview != null ? (
            <div className={styles['image-preview']}>
                <img src={imagePreview} alt="product img" />
            </div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label>Product Name</label>
          <input type="text" id="productName" name="productName" value={product?.productName} onChange={handleInputChange} required/>
        </div>
        <div className={styles.formGroup}>
          <label>Quantity</label>
          <input type="text" id="quantity" name="quantity" value={product?.quantity} onChange={handleInputChange} required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="unitPrice">Unit Price</label>
          <input type="text" id="unitPrice" name="unitPrice" value={product?.unitPrice} onChange={handleInputChange} required/>
        </div>
        {/* <div className={styles.formGroup}>
          <label htmlFor="supplier">Supplier</label>
          <input type="text" id="supplier" name="supplier" value={product?.supplier} onChange={handleInputChange} />
        </div> */}
        <button type="submit">Add Product</button> 
      </form>
    );
  };
  

export default ProductForm;
import React from "react";
import styles from "../styles/styles.module.scss";

const ProductCard = ({ productName, quantity, unitPrice }) => {
  const totalPrice = quantity * unitPrice;

  return (
    <div className={styles.card}>
      <h2 className={styles.productName}>{productName}</h2>
      <div className={styles.details}>
        <p className={styles.quantity}>Quantity: {quantity}</p>
        <p className={styles.unitPrice}>Unit Price: {unitPrice}</p>
        <p className={styles.totalPrice}>Total Price: {totalPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
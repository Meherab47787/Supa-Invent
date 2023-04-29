import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
        const {products, search} = action.payload;
        if (!Array.isArray(products)) {
            // handle the error or set products to an empty array
            console.error('Products is not an array');
          }
        const tempProducts = products.filter((product) => product.productName.toLowerCase().includes(search.toLowerCase()))

        state.filteredProducts = tempProducts
    }
  }
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer
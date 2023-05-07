import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';
import { toast } from 'react-toastify'


const initialState = {
    product: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    products: [],
    totalStoreValue: 0,
    outOfStock: 0
}

//Creating new product

export const createProduct = createAsyncThunk(
    'products/create',
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData)

        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

//get all products

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (_, thunkAPI) => {
        try {
            return await productService.getAllProducts()

        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

//delete a product

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id)
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getAproduct = createAsyncThunk(
    'product/getAproduct',
    async (id, thunkAPI) => {
        try {
            return await productService.getAproduct(id)
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({id, formData}, thunkAPI) => {
        try {
            return await productService.updateproduct(id, formData)
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)



const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALCULATE_STORE_VALUE(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item)=>{
                const { unitPrice, quantity } = item;
                const productValue = unitPrice * quantity;
                return array.push(productValue);
            })
            const totalValue = array.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0)
            state.totalStoreValue = totalValue;
        },

        CALFULATE_OUTOFSTOCK(state, action) {
            const products = action.payload;
            const array = [];
            // eslint-disable-next-line array-callback-return
            products.map((item) => {
                const { quantity } = item;
                if(quantity === 0){
                    
                    array.push(quantity)

                }
            })

            state.outOfStock = array.length

        }
    },
    extraReducers: (builder) => {
        builder 
                //create Product
               .addCase(createProduct.pending, (state) => {
                    state.isLoading = true;
               })

               .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload.newProduct);
                console.log(typeof state.products)
                // state.products.push(action.payload);
                toast.success('Product added successfully')
                })

                .addCase(createProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    console.log(action.payload);
                    toast.error(action.payload)
                })
                
                //getAll

               .addCase(getAllProducts.pending, (state) => {
                    state.isLoading = true;
                })

               .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload.products
                })

                .addCase(getAllProducts.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    toast.error(action.payload)
                })
                
                //delete product

                .addCase(deleteProduct.pending, (state) => {
                    state.isLoading = true
                })

                .addCase(deleteProduct.fulfilled, (state) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    toast.success('Product Deleted Successgully')
                })
                .addCase(deleteProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    toast.error(action.payload)
                })

                //GET A PRODUCT

                .addCase(getAproduct.pending, (state) => {
                    state.isLoading = true;
                })

                .addCase(getAproduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.product = action.payload;
                })
                .addCase(getAproduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.payload;
                    toast.error(action.payload)
                })

                //UPDATE PRODUCT

                .addCase(updateProduct.pending, (state) => {
                    state.isLoading = true;
                })

                .addCase(updateProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    toast.success('Product Updated Successfully')
                })
                .addCase(updateProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.payload;
                    toast.error(action.payload)
                })
            


    }
})



export const { CALCULATE_STORE_VALUE, CALFULATE_OUTOFSTOCK } = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;

export const selectTotalStoreValue = (state) => state.product.totalStoreValue;

export const selectOutOfStock = (state) => state.product.outOfStock;

export const selectProduct = (state) => state.product.product

export default productSlice.reducer;
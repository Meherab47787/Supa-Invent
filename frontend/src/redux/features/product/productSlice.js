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


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALCULATE_STORE_VALUE(state, action){
            const products = action.payload
            const array = []
            products.map((item)=>{
                const { unitPrice, quantity } = item
                const productValue = unitPrice * quantity
                return array.push(productValue)
            })
            const totalValue = array.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0)
            state.totalStoreValue = totalValue;
        },
    },
    extraReducers: (builder) => {
        builder 
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
                console.log(action.payload.products);
                state.products = action.payload.products
                })

                .addCase(getAllProducts.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    toast.error(action.payload)
                })
    }
})



export const { CALCULATE_STORE_VALUE } = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;

export const selectTotalStoreValue = (state) => state.product.totalStoreValue;

export default productSlice.reducer;
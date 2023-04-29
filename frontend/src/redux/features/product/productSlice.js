import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';
import { toast } from 'react-toastify'


const initialState = {
    product: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    products: []
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
            console.log('store value');
        }
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

export default productSlice.reducer;
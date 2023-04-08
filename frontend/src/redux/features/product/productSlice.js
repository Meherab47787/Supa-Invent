import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';
import { toast } from 'react-toastify'


const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Creating new product

const createProduct = createAsyncThunk(
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
                console.log(action.payload);
                state.products.push(action.payload);
                toast.success('Product added successfully')
                })

                .addCase(createProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    console.log(action.payload);
                    state.products.push(action.payload);
                    toast.error(action.payload)
                    })
    }
})



export const { CALCULATE_STORE_VALUE } = productSlice.actions;

export default productSlice.reducer;
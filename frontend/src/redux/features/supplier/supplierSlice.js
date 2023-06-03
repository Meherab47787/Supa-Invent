import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supplierService from './supplierService';

const initialState = {
    supplier: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    suppliers: []
}

export const getAllSupplier = createAsyncThunk(
    'supplier/getAll', 
    async (thunkAPI) => {
        try {
            return await supplierService.getAllSupplier()
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    SET_LOADING(state, action){
        state.isLoading(true)
    }
  },

  extraReducers: (builder) => {
    //Get All Supplier
    builder
        .addCase(getAllSupplier.pending, (state) => {
            state.isLoading = true;
        })

    .addCase(getAllSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.suppliers = action.payload
        })

        .addCase(getAllSupplier.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
  }
});

export const {SET_LOADING} = supplierSlice.actions;

export const selectAllSuppliers = (state) => state.supplier.suppliers;

export default supplierSlice.reducer
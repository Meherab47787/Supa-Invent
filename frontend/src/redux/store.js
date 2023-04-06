import { configureStore, isPlain } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';





export const store = configureStore({
    reducer: {
        auth: authReducer
    },
})
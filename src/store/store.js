import { configureStore } from '@reduxjs/toolkit';
import { alkeflixSlice } from './alkeflix/alkeflixSlice';
import { authSlice } from './auth/authSlice';


export const store = configureStore({
    reducer: {
        auth:       authSlice.reducer,
        alkeflix:   alkeflixSlice.reducer,
        // ui:         uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
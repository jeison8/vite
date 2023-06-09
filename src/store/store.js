import { configureStore } from '@reduxjs/toolkit';
import { menuSlice } from './menu/menuSlice';
import { authSlice } from './auth/authSlice';
import { userSlice } from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    menu: menuSlice.reducer,
    user: userSlice.reducer
  }
});
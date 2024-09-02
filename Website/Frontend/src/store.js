import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import navbarSlice from './slices/navbarSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    nav: navbarSlice
  }
})
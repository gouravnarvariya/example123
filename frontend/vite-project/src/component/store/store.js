import { configureStore } from '@reduxjs/toolkit'
import UserSlcie from './slices/userSlice'

const store =  configureStore({
  reducer: {
    user:UserSlcie
  }
})

export default store
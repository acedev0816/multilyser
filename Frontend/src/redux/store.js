import { configureStore } from '@reduxjs/toolkit'
import protectedReducer from './protectedRouteSlice'
export default configureStore({
  reducer: {
     protect:protectedReducer
  }
})
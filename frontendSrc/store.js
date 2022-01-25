import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './mySlice'

console.log(usersReducer)

const store = configureStore({
    reducer:{usersReducer
    }
})

export default store
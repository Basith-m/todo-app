import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSliece/todoSlice";

const store = configureStore({
    reducer : {
        todoReducer: todoSlice
    }
})

export default store;
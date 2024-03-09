import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: [],
    reducers: {
        todoChangeResponse: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { todoChangeResponse } = todoSlice.actions
export default todoSlice.reducer
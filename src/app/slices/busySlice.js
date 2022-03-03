import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "busy",
    initialState: {
        isBusy: false,
    },
    reducers: {
        setBusy: (state, action) => {
            state.isBusy = action.payload;
        },
    },
});

const { actions, reducer } = todoSlice;

export const { setBusy } = actions;

export default reducer;

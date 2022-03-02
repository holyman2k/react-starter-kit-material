import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        editItem: null,
        list: [
            {
                id: 1,
                todo: "Buy Milk",
                due: Date.now(),
                done: false,
            },
        ],
    },
    reducers: {
        edit: (state, action) => {
            const payload = action.payload;
            state.editItem = payload;
        },
        save: (state, action) => {
            let payload = action.payload;
            if (!payload.id) {
                payload.id = state.list.length + 1;
                state.list.push(payload);
            } else {
                state.list = state.list.map((item) => (item.id === payload.id ? payload : item));
            }
            state.editItem = null;
        },
        done: (state, action) => {
            let payload = { ...action.payload };
            payload.done = payload.done ? false : true;
            state.list = state.list.map((item) => (item.id === payload.id ? payload : item));
        },
    },
});

const { actions, reducer } = todoSlice;

export const { edit, save, done } = actions;

export default reducer;

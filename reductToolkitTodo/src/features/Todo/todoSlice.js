import { createSlice, nanoid } from "@reduxjs/toolkit";

const initalState = {
    todos: [{
        id: 1,
        text: "Hello World"
    }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initalState,
    reducers: {},
});
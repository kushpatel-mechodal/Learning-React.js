// Configure the Redux store to manage the application's global state.

//For get data to use the selector and send or change to use the dispatch
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/Todo/todoSlice";

export const store = configureStore({
  reducer: todoReducer,
});

store.subscribe(() => {
  localStorage.setItem("todos", JSON.stringify(store.getState().todos));
});

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id: 1,
        text: "Hello World"
    }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,

    /* in reducer is basially functionality and provides the propery and function, in function to 
    provide two parameter state and action */
    reducers: {
        addTodo: (state,action) => {
             const todo = {
                    id: nanoid(),
                    text: action.payload
             }
             state.todos.push(todo);            
        },
       removeTodo: (state, action) => {
             state.todos = state.todos.filter(
             (todo) => todo.id !== action.payload
        );
      },
    //   updateTodo: (state,action) => {
    //         state.todos = state.todos.find( 
    //             (todo) => todo.id === action.payload.id
    //         );

    //         if(todo){
    //             todo.text = action.payload.text
    //         }
    //      }
    },
});

// export the all reducers using actions
export const {addTodo,removeTodo} = todoSlice.actions;

// export the reducer for using the store.js
export default todoSlice.reducer;
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes';

export const addTodo = ({ parent, title }) => ({
  type: ADD_TODO,
  payload: {
    id: new Date().getTime(),
    parent,
    title,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

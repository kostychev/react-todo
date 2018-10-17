import { findItemById } from '../helpers';

export const getTodoById = (state, id) => {
  const item = findItemById(state.todoList.items, id);
  return { ...item };
};

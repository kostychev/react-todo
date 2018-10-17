import { combineReducers } from 'redux';
import todoList from './todoList';

const rootReducers = combineReducers({
  todoList,
});

export default rootReducers;

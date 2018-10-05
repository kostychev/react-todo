import React from 'react';
import TodoList from './TodoList';

function TodoItem(props) {
  return (
    <li>
      {props.title}
      <TodoList items={props.sublist}/>
    </li>
  );
}

export default TodoItem;

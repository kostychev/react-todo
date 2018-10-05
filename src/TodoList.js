import React from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
  if (!props.items) {
    return false;
  }

  return (
    <ul>
      {props.items.map(item => (<TodoItem
        key={item.id}
        title={item.title}
        sublist={item.sublist}
      />))}
    </ul>
  );
}

export default TodoList;
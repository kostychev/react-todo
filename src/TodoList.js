import React from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
  let {items} = props;

  if (!items) {
    return false;
  }

  items.sort((a, b) => {
    if (a.completed && b.completed) return a.id < b.id ? -1 : 1;
    if (a.completed) return 1;
    if (b.completed) return -1;
    return a.id < b.id ? -1 : 1;
  });

  return (
    <ul>
      {items.map(item => <TodoItem
        key={item.id}
        item={item}
        onComplete={(id) => props.onComplete(id)}
        onRemove={(id) => props.onRemove(id)}
      />)}
    </ul>
  );
}

export default TodoList;

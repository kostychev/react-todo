import React from 'react';
import TodoList from './TodoList';
import classNames from 'classnames';
import './TodoItem.css';

function TodoItem(props) {
  const {item} = props;

  return (
    <li>
      <label className={classNames({'TodoItem-completed': item.completed})}>
        <input type="checkbox" checked={item.completed || false} onChange={() => props.onComplete(item.id)}/>
        {item.title}
      </label>

      {item.completed && <a
        href="javascript:void(0)"
        onClick={() => props.onRemove(item.id)}
        className="TodoItem-remove"
      >Удалить</a>}

      <TodoList items={item.sublist} onComplete={props.onComplete} onRemove={props.onRemove}/>
    </li>
  );
}

export default TodoItem;

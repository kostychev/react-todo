import React from 'react';
import TodoList from './TodoList';
import classNames from 'classnames';
import './TodoItem.css';

function TodoItem(props) {
  const {item} = props;

  return (
    <li>
      <label className={classNames({'TodoItem-completed': item.completed, 'form-check form-check-inline': true})}>
        <input
          type="checkbox"
          className="form-check-input"
          checked={item.completed || false}
          onChange={() => props.onComplete(item.id)}
        />
        {item.title}
      </label>

      {item.completed && <a
        href="#remove"
        onClick={e => {
          e.preventDefault();
          props.onRemove(item.id);
        }}
        className="TodoItem-remove"
      >Удалить</a>}

      <TodoList items={item.sublist} onComplete={props.onComplete} onRemove={props.onRemove}/>
    </li>
  );
}

export default TodoItem;

import fixtures from '../../fixtures';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actionTypes';
import { findItemById, removeItemById } from '../../helpers';

const initState = {
  items: fixtures,
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_TODO: {
      let newItems = JSON.parse(JSON.stringify(state.items));
      const { id, parent, title } = action.payload;
      const newItem = {
        id,
        title,
        completed: false,
      };

      if (!parent) {
        newItems.push(newItem);
      } else {
        let foundItem = findItemById(newItems, parent);

        if (foundItem) {
          if (!foundItem.sublist) {
            foundItem.sublist = [];
          }

          foundItem.sublist.push(newItem);
        }
      }

      return {
        ...state,
        items: newItems,
      };
    }

    case TOGGLE_TODO: {
      let newItems = JSON.parse(JSON.stringify(state.items));
      const { id } = action.payload;

      const item = findItemById(newItems, id);
      if (item) {
        item.completed = !item.completed;
      }

      return {
        ...state,
        items: newItems,
      };
    }

    case REMOVE_TODO: {
      let newItems = JSON.parse(JSON.stringify(state.items));
      const { id } = action.payload;

      const item = findItemById(newItems, id);
      if (item && item.completed && window.confirm('Вы уверены, что хотите удалить элемент?')) {
        removeItemById(newItems, id);
      }

      return {
        ...state,
        items: newItems,
      };
    }

    default:
      return state;
  }
}

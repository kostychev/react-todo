import fixtures from '../../fixtures';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actionTypes';
import { findItemById, removeItemById } from '../../helpers';

const initState = {
  items: fixtures,
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const newItem = {
        ...action.payload,
        completed: false,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case TOGGLE_TODO: {
      let newItems = state.items.slice();
      const { id } = action.payload;

      const idx = newItems.findIndex(item => item.id === id);
      if (idx !== -1) {
        const item = newItems[idx];
        newItems[idx] = { ...item, completed: !item.completed };
      }

      return {
        ...state,
        items: newItems,
      };
    }

    case REMOVE_TODO: {
      let newItems = state.items.slice();
      const { id } = action.payload;

      removeItemById(newItems, id)

      return {
        ...state,
        items: newItems,
      };
    }

    default:
      return state;
  }
}

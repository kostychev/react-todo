export const findItemById = (items, id) => {
  id = parseFloat(id);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (id === item.id) {
      return item;
    }

    if (Array.isArray(item.sublist)) {
      const result = findItemById(item.sublist, id);
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
};

export const removeItemById = (items, id) => {
  id = parseFloat(id);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (id === item.id) {
      items.splice(i, 1);
      return items;
    }

    if (Array.isArray(item.sublist)) {
      removeItemById(item.sublist, id);
    }
  }

  return items;
};

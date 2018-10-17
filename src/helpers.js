export const removeItemById = (items, id) => {
  const idx = items.findIndex(item => item.id === id);
  if (idx !== -1) {
    items.splice(idx, 1);
    items.filter(item => item.parent === id).forEach(item => removeItemById(items, item.id));
  }
};

export const buildParents = (items, parent = null, level = 0) => {
  let parents = [];

  items.filter(item => item.parent === parent).forEach(item => {
    parents.push({
      id: item.id,
      title: '-'.repeat(level) + (level > 0 ? ' ' : '') + item.title,
    });

    if (level < 2) {
      parents.push(...buildParents(items, item.id, level + 1));
    }
  });

  return parents;
};

import React from 'react';
import AddForm from './AddForm';
import TodoList from './TodoList';

const MAX_LEVEL = process.env.MAX_LEVEL || 1; // с 0

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
      list: [
        {
          id: 1,
          title: 'Элемент списка 1',
          sublist: null,
        },
        {
          id: 2,
          title: 'Элемент списка 2',
          sublist: [
            {
              id: 3,
              title: 'Элемент списка 2.1',
              sublist: [
                {
                  id: 4,
                  title: 'Элемент списка 2.1.1',
                  sublist: [],
                }],
            },
          ],
        },
      ],
    };
  }

  handleAdd(form) {
    let newList = this.state.list.slice();

    const newItem = {
      id: new Date().getTime(), // like uid (:
      title: form.title,
    };

    if (!form.parent) {
      newList.push(newItem);
    } else {
      let foundItem = this.findItem(form.parent, newList);

      if (foundItem) {
        if (!foundItem.sublist) {
          foundItem.sublist = [];
        }

        foundItem.sublist.push(newItem);
      }
    }

    this.setState({list: newList});
  }

  findItem(id, items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (id === item.id.toString()) {
        return item;
      }

      if (Array.isArray(item.sublist)) {
        const result = this.findItem(id, item.sublist);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  buildParents(items, level = 0) {
    let parents = [];

    items.forEach(item => {
      parents.push({
        id: item.id,
        title: '-'.repeat(level) + item.title,
      });

      if (level < MAX_LEVEL && item.sublist) {
        parents.push(...this.buildParents(item.sublist, level + 1));
      }
    });

    return parents;
  }

  render() {
    const parentItems = this.buildParents(this.state.list);
    parentItems.unshift({id: 0, title: 'Select'});

    return (
      <div>
        <header>
          <h1>Todo list</h1>
        </header>
        <main>
          <TodoList items={this.state.list}/>
          <AddForm parents={parentItems} onSubmit={this.handleAdd}/>
        </main>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Modal from 'react-modal';
import AddForm from './AddForm';
import TodoList from './TodoList';
import items from './fixtures';

const MAX_LEVEL = process.env.MAX_LEVEL || 1; // с 0

const modalStyles = {
  content: {
    minWidth: '480px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#root');

class App extends React.Component {
  state = {
    items: items,
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  handleAdd = (form) => {
    let newItems = this.state.items.slice();

    const newItem = {
      id: new Date().getTime(), // like uid (:
      title: form.title,
      completed: false,
    };

    if (!form.parent) {
      newItems.push(newItem);
    } else {
      let foundItem = this.findItem(form.parent, newItems);

      if (foundItem) {
        if (!foundItem.sublist) {
          foundItem.sublist = [];
        }

        foundItem.sublist.push(newItem);
      }
    }

    this.setState({items: newItems});

    this.closeModal();
  };

  handleComplete = (id) => {
    let items = this.state.items.slice();
    const item = this.findItem(id, items);

    if (item) {
      item.completed = !item.completed;
      this.setState({items: items})
    }
  };

  handleRemove = (id) => {
    let items = this.state.items.slice();
    const item = this.findItem(id, items);

    if (item && item.completed && window.confirm('Вы уверены, что хотите удалить элемент?')) {
      this.removeItem(id, items);
      this.setState({items: items});
    }
  };

  findItem(id, items) {
    id = parseFloat(id);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (id === item.id) {
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

  removeItem(id, items) {
    id = parseFloat(id);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (id === item.id) {
        items.splice(i, 1);
        return items;
      }

      if (Array.isArray(item.sublist)) {
        this.removeItem(id, item.sublist);
      }
    }

    return items;
  }

  buildParents(items, level = 0) {
    let parents = [];

    items.forEach(item => {
      parents.push({
        id: item.id,
        title: '-'.repeat(level) + (level > 0 ? ' ' : '') + item.title,
      });

      if (level < MAX_LEVEL && item.sublist) {
        parents.push(...this.buildParents(item.sublist, level + 1));
      }
    });

    return parents;
  }

  render() {
    const parentItems = this.buildParents(this.state.items);
    parentItems.unshift({id: 0, title: 'Select'});

    return (
      <>
        <header>
          <h1>Todo list</h1>
        </header>
        <main>
          <TodoList
            items={this.state.items}
            onComplete={this.handleComplete}
            onRemove={this.handleRemove}
          />

          <button className="btn btn-info" onClick={this.openModal}>Добавить элемент</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={modalStyles}
          >
            <h3>Добавить элемент</h3>
            <AddForm parents={parentItems} onSubmit={this.handleAdd}/>
          </Modal>
        </main>
      </>
    );
  }
}

export default App;

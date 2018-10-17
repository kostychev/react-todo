import React from 'react';
import Modal from 'react-modal';
import AddForm from './AddForm';
import TodoList from './TodoList';
import { connect } from 'react-redux';

const MAX_LEVEL = 1; // с 0

const modalStyles = {
  content: {
    minWidth: '480px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

class App extends React.Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

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
    const parentItems = this.buildParents(this.props.items);
    parentItems.unshift({ id: 0, title: 'Select' });

    return (
      <>
        <header>
          <h1>Todo list</h1>
        </header>
        <main>
          <TodoList items={this.props.items}/>

          <button className="btn btn-info" onClick={this.openModal}>Добавить элемент</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={modalStyles}
          >
            <h3>Добавить элемент</h3>
            <AddForm parents={parentItems} onSubmit={this.closeModal}/>
          </Modal>
        </main>
      </>
    );
  }
}

export default connect(
  state => ({
    items: state.todoList.items,
  }),
  null,
)(App);

import React from 'react';
import Modal from 'react-modal';
import AddForm from './AddForm';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { buildParents } from './helpers';

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

  render() {
    const parentItems = buildParents(this.props.items);
    parentItems.unshift({ id: 0, title: 'Select' });

    return (
      <>
        <header>
          <h1>Todo list</h1>
        </header>
        <main>
          <TodoList />

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

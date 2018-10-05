import React from 'react';

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {parent: '', title: ''};
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  componentDidUpdate() {
    if (this.state.parent) {
      if (!this.props.parents.find(item => item.id == this.state.parent ? item : undefined)) {
        this.setState({parent: ''});
      }
    }
  }

  render() {
    const parents = this.props.parents.map(item => (
      <option key={item.id} value={item.id}>{item.title}</option>
    ));

    return (
      <div>
        <h2>Добавить элемент</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            Родительский элемент
            <select name="parent" value={this.state.parent} onChange={this.handleChange}>
              {parents}
            </select>
          </div>
          <div>
            Заголовок
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required/>
          </div>

          <button>Добавить</button>
        </form>
      </div>
    );
  }
}

export default AddForm;

import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from './redux/actions';

class AddForm extends React.Component {
  state = { parent: '', title: '' };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state);
    this.setState({ parent: '', title: '' });
    this.props.onSubmit();
  };

  // componentDidUpdate() {
  //   if (this.state.parent) {
  //     if (!this.props.parents.find(item => item.id.toString() === this.state.parent ? item : undefined)) {
  //       this.setState({ parent: '' });
  //     }
  //   }
  // }

  render() {
    const parents = this.props.parents.map(item => (
      <option key={item.id} value={item.id}>{item.title}</option>
    ));

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="item-parent" className="col-sm-6 col-form-label">Родительский элемент</label>
          <div className="col-sm-6">
            <select id="item-parent" className="form-control" name="parent" value={this.state.parent}
                    onChange={this.handleChange}>
              {parents}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="item-title" className="col-sm-6 col-form-label">Заголовок</label>
          <div className="col-sm-6">
            <input type="text" id="item-title" className="form-control" name="title" value={this.state.title}
                   onChange={this.handleChange} required/>
          </div>
        </div>

        <div className="form-group text-right">
          <button type="submit" className="btn btn-primary">Добавить</button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { addTodo },
)(AddForm);

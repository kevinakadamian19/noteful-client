import React, { Component } from "react";
import ValidationError from "../ValidationError";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      }
    };
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  render() {
    const nameError = this.validateName();
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Folder</h2>
        <div className="registration__hint">* required field</div>
        <div className="form-group">
          <label htmlFor="folder_name">Name *</label>
          <input
            type="text"
            className="folder_name"
            name="folder_name"
            id="folder_name"
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.name.touched && <ValidationError message={nameError} />}
        </div>

        <div className="NoteListNav__button-wrapper">
          <button type="reset" className="registration__button">
            Cancel
          </button>
          <button
            type="submit"
            className="add_folder__button"
            disabled={
              this.validateName()
            }
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
export default AddFolder;
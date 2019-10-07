import React, { Component } from "react";
import CircleButton from '../CircleButton/CircleButton'
import ValidationError from "../ValidationError";
import NotefulForm from '../NotefulForm/NotefulForm';
import dummyStore from '../dummy-store'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
    fetch(`${dummyStore}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(name),
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then(name => {
      this.context.addFolder(name)
    })
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
      <NotefulForm onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Folder</h2>
        <div className="field">
          <label htmlFor="folder_name">Name</label>
          <input
            type="text"
            name="folder_name"
            id="folder_name"
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.name.touched && <ValidationError message={nameError} />}
        </div>
          <CircleButton
            tag="button"
            type="submit"
            className="NotePageNav_back-button"
            disabled={
              this.validateName()
            }
          >
            Save
          </CircleButton>
      </NotefulForm>
    );
  }
}
export default AddFolder;
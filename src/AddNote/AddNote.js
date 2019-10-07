import React, { Component } from "react";
import NotefulForm from '../NotefulForm/NotefulForm'
import ValidationError from "../ValidationError";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      folder: {
        value: "",
        touched: false
      }
    };
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }
  updateContent(content) {
    this.setState({content: {value: content, touched: true}});
  }
  updateFolder(folder) {
    this.setState({folder: {value: folder, touched: true}})
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, content, folder } = this.state;
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }
  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return "Content is required";
    } else if (content.length < 3) {
      return "Content must be at least 3 characters long";
    }
  }
  validateFolder() {
    const folder = this.state.folder.value.trim();
    if (folder.length === 0) {
      return "Folder is required";
    } else if (folder.length < 3) {
      return "Must select existing folder to inser note";
    }
  }

  render() {
    const nameError = this.validateName();
    const contentError = this.validateContent();
    const folderError = this.validateFolder();
    return (
      <NotefulForm onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Note</h2>
        <div className="form-group">
          <label htmlFor="note_name">Name</label>
          <input
            type="text"
            className="note_name"
            name="note_name"
            id="note_name"
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.name.touched && <ValidationError message={nameError} />}
        </div>
        <div className="form-group">
          <label htmlFor="note_content">Content</label>
          <input
            type="textarea"
            name="note_content"
            id="note_content"
            onChange={e => this.updateContent(e.target.value)}
          />
          {this.state.content.touched && <ValidationError message={contentError} />}
        </div>
        <div className="form-group">
          <label htmlFor="note_folder">Folder</label>
          <select
            name="note_folder"
            id="note_folder"
            onChange={e => this.updateFolder(e.target.value)}
          />
          {this.state.folder.touched && <ValidationError message={folderError} />}
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
      </NotefulForm>
    );
  }
}
export default AddNote;
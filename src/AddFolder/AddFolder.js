import React, { Component } from "react";
import ValidationError from "../ValidationError";
import NotefulForm from '../NotefulForm/NotefulForm';
import NotefulContext from '../NotefulContext';
import config from '../config'


class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {
        value: '',
        touched: false
      }
    };
  }
  static defaultProps = {
    history: {
      push: () => { }
    }
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault();
    const folder = {
      name: e.target['folder-name'].value
    };
    console.log('folder:', folder);
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then(folder => {
      this.context.addFolder(folder)
      this.props.history.push(`/folder/${folder.id}`)
    })
    .catch(error => {
      console.error({error})
    })
  }
  addFolderName(folder) {
    this.setState({folder:{value: folder, touched: true}});
  }

  validateFolderName(fieldValue) {
    const folder = this.state.folder.value.trim();
    if(folder.length === 0) {
      return 'Folder name is required';
    } else if (folder.length < 3) {
      return 'Folder name must be at least 3 characters long';
    }
  }

  render() {
    const folderError = this.validateFolderName();
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input 
              type='text' 
              id='folder-name-input' 
              name='folder-name'
              onChange={e=> this.addFolderName(e.target.value)}
              />
            {this.state.folder.touched && (
            <ValidationError message={folderError} />
            )}
          </div>
          <div className='buttons'>
            <button 
              type='submit'
              disabled ={
                this.validateFolderName()
              }>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
export default AddFolder;
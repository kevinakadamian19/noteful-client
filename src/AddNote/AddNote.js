import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import config from '../config'
import ValidationError from '../ValidationError'



class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folder_id: {
        value: '',
        touched: false
      }
    }
  }
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    console.log(newNote)
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folder_id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  updateName(name) {
    this.setState({
      name: {value: name, touched: true}
    });
  }
  updateContent(content) {
    this.setState({
      content: {value: content, touched: true}
    });
  }
  validateNoteName(fieldValue) {
    const name = this.state.name.value.trim();
    if(name.length === 0) {
      return 'Note name is required';
    } else if (name.length < 3) {
      return 'Note name must be at least 3 characters long';
    }
  }

  validateNoteContent(fieldValue) {
    const content = this.state.content.value.trim();
    if(typeof content === 'number') {
      return 'Note content must be string';
    } 
  }

  render() {
    const { folders=[] } = this.context
    const nameError = this.validateNoteName();
    const contentError = this.validateNoteContent();
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Note Name
            </label>
            <input 
              type='text' 
              id='note-name-input' 
              name='note-name' 
              onChange={e => this.updateName(e.target.value)}
            />
            {this.state.name.touched && (
              <ValidationError message={nameError} 
            />)}
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Note Content
            </label>
            <textarea 
              id='note-content-input' 
              name='note-content' 
              onChange={e=>this.updateContent(e.target.value)}
            />
            {this.state.content.touched && (
              <ValidationError message={contentError} 
            />)}
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Designated Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button 
              type='submit'
              disabled={
                this.validateNoteName() ||
                this.validateNoteContent()
              }>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

export default AddNote;
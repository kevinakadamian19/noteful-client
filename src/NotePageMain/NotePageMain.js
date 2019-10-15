import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import { findNote } from '../notes-helpers'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;
  
  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    //Set notes value to context
    const {notes=[]} = this.context
    //Set noteId value to the selected note
    const {noteId} = this.props.match.params
    //set note value to filtered notes array that match specific noteId or if not found set content object to blank
    const note= findNote(notes, noteId) || {content: ''}
    return (
      <section className='NotePageMain'>
        {/*Render Note component with props that contain values that match the noteId*/}
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        {/*Render content of note*/}
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

export default NotePageMain;
NotePageMain.propTypes = {
  noteId: PropTypes.string
}
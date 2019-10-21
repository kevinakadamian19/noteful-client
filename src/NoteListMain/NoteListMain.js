import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
import {getNotesForFolder} from '../notes-helpers'
import './NoteListMain.css'
import PropTypes from 'prop-types';

class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext

  render() {
    //Setting folderId value to selected folder
    const {folderId} = this.props.match.params
    //setting notes value to be pulled from context
    const {notes=[]} = this.context
    //setting notesForFolder to equal the filtered array of notes that having matching folderId
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {/*For each note within array of filtered notes create list item*/}
          {notesForFolder.map(note =>
            //List item will render Note component that has props equal to values of note within array
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        {/*At the bottom of the list include an add-note button*/}
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
  
}
export default NoteListMain;

NoteListMain.propTypes = {
  folderId: PropTypes.number
}
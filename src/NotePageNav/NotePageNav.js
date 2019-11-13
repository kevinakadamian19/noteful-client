import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NotefulContext from '../NotefulContext'
import { findNote, findFolder } from '../notes-helpers'

class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render() {
    //Pulling defaultProp values from context
    const { notes, folders} = this.context
    //setting object noteId value equal to props.match.params
    const { noteId } = this.props.match.params
    //setting note variable value to filtered notes array that contain matching noteId; otherwise set empty object
    const note = findNote(notes,noteId) || {}
    //setting folder object value to filtered folders array that contain notes with matching folderId 
    const folder = findFolder(folders, note.folder_id)
    return (
      <div className='NotePageNav'>
        {/*Button to return to previous page*/}
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {/*render folder & h3 tag with folder name*/}
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

export default NotePageNav;


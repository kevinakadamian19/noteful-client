import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './App.css';
import SubmitFormError from '../SubmitFormError/SubmitFormError';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        //from config.API_ENDPOINT fetch the notes, and folders array.
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
        //promise that notes, and folders response from fetch call run the following:
        .then(([notesRes, foldersRes]) => {
            //if notes endpoint not ok then return error
            if(!notesRes.ok) {
                return notesRes.json().then(e => Promise.reject(e))
            }
            //if folders endpoint not ok then return error
            if(!foldersRes.ok) {
                return foldersRes.json().then(e => Promise.reject(e))
            }
            //otherwise return both notes, and folders response in json in within array.
            return Promise.all([
                notesRes.json(),
                foldersRes.json()
            ])
        })
        //then take the notes, and folders in order to updates state with those values
        .then(([notes,folders]) => {
            this.setState({notes,folders})
        })
        //if any of the promises fail console log the error.
        .catch(error => {
            console.error({error})
        })
    }
    //handleDeleteNote filters updates the notes array in state
    //by filtering the array to not include the noteId that was passed in the function param 
    handleDeleteNote = noteId =>{
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        })
    }
    //handleAddNote updates the notes array in state 
    //by adding the note within the function's parameter
    handleAddNote(note) {
        this.setState({
            notes: [
                ...this.state.notes,
                note
            ]
        })
    }
    //handleAddFolder updates the folders array in state
    //by adding the folder within the function's parameter
    handleAddFolder(folder) {
        this.setState({
            folders: [
                ...this.state.folders,
                folder
            ]
        })
    }
    //renderNavRoutes generates navigation bar on the side
    //this renders the content for the nav bar in all paths
    /*Fragment "<>" allows for all below values to be inserted into <nav> tag within return*/
    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {/*create a new array that has 2 Routes for values;
                1 route for both key & path="/" and component is NoteListNav 
                    which shows all folders and notes (folder unselected)
                1 route for both key & path="/folder/:folderId" 
                    with same component*/}
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                {/*Renders NotePageNav component for specific note*/}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                {/*Renders NotePageNav component for addFolder page*/}
                <Route 
                    path="/add-folder"
                    component={NotePageNav}
                />
                {/*Renders NotePageNav component for addNote page*/}
                <Route 
                    path="/add-note" 
                    component={NotePageNav} 
                />
            </>
        )
    }

    renderMainRoutes() {
        //variables notes and folders are equal to this.state array
        const {notes, folders} = this.state;
        return (
            //the <> symbol is short for React.Fragment
            <> 
                {/*for path ="/" render list of all notes
                otherwise render route that has list of notes for specific folder*/}
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                {/*On the route or page with specific noteId render specific Note*/}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
                <Route
                    path="/add-folder"
                    component={AddFolder}
                />
                 <Route
                    path="/add-note"
                    component={AddNote}
                />
            </>
        );
    }
    render() {
        //going to be setting Context.provider with values
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            deleteNote: this.handleDeleteNote
        }
        return (
            //NotefulContext has defaultProps. The default props are then given the value of the state, and functions within the App component.
            //By having the context.provider wrap the Routes we are able to pass the value prop down to components
            <NotefulContext.Provider value={contextValue}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">
                        <SubmitFormError>
                            {this.renderMainRoutes()}
                        </SubmitFormError>
                    </main>
                </div>
            </NotefulContext.Provider>
        );
    }
}

export default App;

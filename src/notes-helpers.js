/* findFolder takes 2 parameters: an array name folders, and the folderId
  within the folders array finder the folder with the matching folderId */
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

  /* findNote takes 2 parameters: an array name notes, and a noteId
  within the notes array find the note with the matching noteId */
export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

/* getNotesForFolder takes 2 parameters: an array named notes, and the folderId
  if the statement "No folder id" is true then return all notes, if false then filter array for notes that have
  the same key value as the folderId*/
export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folder_id === folderId)
)

/* countNotesForFolder takes 2 parameters: an array named notes, and the folderId
  filter the notes array for notes with same folderId value. Then return length of new array. */
export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folder_id === folderId).length

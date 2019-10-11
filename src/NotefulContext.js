

import React from 'react'
//This context passes the defaultProps to the lower components.
export default React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})
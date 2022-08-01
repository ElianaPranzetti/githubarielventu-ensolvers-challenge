export const SET_THEME = "SET_THEME";
export const SET_OPEN_DIALOG = "SET_OPEN_DIALOG";
export const SET_OPEN_ALERT = "SET_OPEN_ALERT";
export const SET_ID = "SET_ID";
export const SET_NOTES_TO_SHOW = "SET_NOTES_TO_SHOW";
export const SET_FILTER_NOTES = "SET_FILTER_NOTES"
export const CREATE_NOTE = "CREATE_NOTE";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_ARCHIVED_NOTE = "SET_ARCHIVED_NOTE";
export const SET_UNARCHIVED_NOTE = "SET_UNARCHIVED_NOTE";
export const SET_UNARCHIVED_ALL = "SET_UNARCHIVED_ALL";
export const SET_DELETE_NOTE = "SET_DELETE_NOTE";
export const UNDELETE_NOTE = "UNDELETE_NOTE";


export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
});

export const setOpenDialog = (payload) => ({
  type: SET_OPEN_DIALOG,
  payload,
});

export const setOpenAlert = (payload) => ({
  type: SET_OPEN_ALERT,
  payload,
});
  
export const setId = (payload) => ({
  type: SET_ID,
  payload,
});

export const setNotesToShow = (payload) => ({
  type: SET_NOTES_TO_SHOW,
  payload,
});

export const setFilterNotes = (payload) => ({
  type: SET_FILTER_NOTES,
  payload,
});

export const createNote = (payload) => ({
  type: CREATE_NOTE,
  payload,
});

export const setCategory = (payload) => ({
  type: SET_CATEGORY,
  payload,
});

export const setArchivedNote = (payload) => {
  // console.log("payload", payload)
  return {
    type: SET_ARCHIVED_NOTE,
    payload,
  }
};

export const setUnarchivedNote = (payload) => {
  // console.log("payload", payload)
  return {
    type: SET_UNARCHIVED_NOTE,
    payload,
  }
};

export const setUnarchivedAll = (payload) => {
  return {
    type: SET_UNARCHIVED_ALL,
    payload,
  }
};

export const setDeleteNote = (payload) => {
  return {
    type: SET_DELETE_NOTE,
    payload,
  }
};

export const unDeleteNote = (payload) => {
  return {
    type: UNDELETE_NOTE,
    payload,
  }
};





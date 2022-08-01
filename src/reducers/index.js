import {
  SET_THEME,
  SET_OPEN_DIALOG,
  SET_OPEN_ALERT,
  SET_ID,
  SET_NOTES_TO_SHOW,
  SET_FILTER_NOTES,
  CREATE_NOTE,
  SET_CATEGORY,
  SET_ARCHIVED_NOTE,
  SET_UNARCHIVED_NOTE,
  SET_UNARCHIVED_ALL,
  SET_DELETE_NOTE,
  UNDELETE_NOTE
} from "../actions";

const initialState = {
  theme: "dark",
  isOpen: false,
  isOpenAlert: false,
  idNote: 1,
  newNote: {},
  categories: ["Work", "Personal", "School", "Family", "Other"],
  newCategory: [],
  notes: [
    {
      id: 1231231,
      title: "Note 1",
      body: "This is the body of note 1",
      category: ["Work"],
    },
    {
      id: 3213212,
      title: "Note 2",
      body: "This is the body of note 2",
      category: ["Personal"],
    },
  ],
  // notes: [],
  notesToShow: [],
  archivedNotes: [],
  deletedNotes: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    case SET_OPEN_DIALOG:
      return {
        ...state,
        isOpen: payload,
      };
    case SET_OPEN_ALERT:
      return {
        ...state,
        isOpenAlert: payload,
      };
    case SET_ID:
      return {
        ...state,
        idNote: payload,
      };
    case SET_NOTES_TO_SHOW:
      const nts = [];
      nts.push(...state.notes);
      return {
        ...state,
        notesToShow: nts,
      };
    case SET_FILTER_NOTES:
      const aux = [];
      payload === "All"
        ? aux.push(...state.notes)
        : aux.push(
            ...state.notes.filter((note) => note.category.includes(payload))
          );
      return {
        ...state,
        notesToShow: aux,
      };
    case CREATE_NOTE:
      return {
        ...state,
        newNote: state.notes.push(payload),
      };
    case SET_CATEGORY:
      return {
        ...state,
        newNote: {
          ...state.newNote,
          categories: payload,
        },
      };
    case SET_ARCHIVED_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== payload),
        archivedNotes: state.archivedNotes.concat(
          state.notes.filter((note) => note.id === payload)
        ),
      };
    case SET_UNARCHIVED_NOTE:
      return {
        ...state,
        notes: state.notes.concat(
          state.archivedNotes.filter((note) => note.id === payload)
        ),
        archivedNotes: state.archivedNotes.filter(
          (note) => note.id !== payload
        ),
      };
    case SET_UNARCHIVED_ALL:
      return {
        ...state,
        notes: state.notes.concat(state.archivedNotes),
        archivedNotes: [],
      };
    case SET_DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== payload),
        deletedNotes: state.deletedNotes.concat(
          state.notes.filter((note) => note.id === payload)
        ),
      };
    case UNDELETE_NOTE:
      return {
        ...state,
        notes: state.notes.concat(state.deletedNotes.pop()),
      };
    default:
      return state;
  }
};

export default reducer;

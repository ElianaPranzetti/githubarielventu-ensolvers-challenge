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
  UNDELETE_NOTE,
  GET_NOTES,
  GET_CATEGORIES,
  SET_ID_NOTE_TO_DELETE,
} from "../actions";

const initialState = {
  theme: "dark",
  isOpen: false,
  isOpenAlert: false,
  idNote: 1,
  newNote: {},
  categories: [],
  // categories: ["Work", "Personal", "School", "Family", "Other"],
  // notes: [
  //   {
  //     id: 1231231,
  //     title: "Note 1",
  //     body: "This is the body of note 1",
  //     category: ["Work"],
  //   },
  //   {
  //     id: 3213212,
  //     title: "Note 2",
  //     body: "This is the body of note 2",
  //     category: ["Personal"],
  //   },
  // ],
  notes: [],
  notesToShow: [],
  archivedNotes: [],
  deletedNotes: [],
  idNoteToDelete: 0,
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
          ...state.notes.filter((note) => note.categories.map((cat) => cat.name).includes(payload))
        );
      console.log(aux);
      return {
        ...state,
        notesToShow: aux,
      };
    case CREATE_NOTE:
      return {
        ...state,
        // newNote: state.notes.push(payload),
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
      // console.log("reducerrrr", payload);
      const extistArchived = state.archivedNotes.find(
        (note) => note.id === payload.id
      );
      if (extistArchived) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          archivedNotes: [...state.archivedNotes, payload],
          // notes: existNotes[0] ? existNotes[0].archived = true : [...state.notes],
        };
      }
    case SET_UNARCHIVED_NOTE:
      // console.log("reducerrrr", payload);
      const exist2 = state.archivedNotes.find((note) => note.id === payload);
      // console.log("exis2t", exist2);
      return {
        ...state,
        // notes: state.notes.concat(
        //   state.archivedNotes.filter((note) => note.id === payload)
        // ),
        archivedNotes: [
          state.archivedNotes.filter((note) => note.id !== payload),
        ],
      };
    case SET_UNARCHIVED_ALL:
      for (let i = 0; i < state.notes.length; i++) {
        state.notes[i].archived = false;
      }
      return {
        ...state,
        // notes: state.notes.concat(state.archivedNotes),
        archivedNotes: [],
      };
    case SET_DELETE_NOTE:
      // return {
      //   ...state,
      //   deletedNotes: state.deletedNotes.concat(
      //     state.notes.filter((note) => note.id === payload)
      //   ),
      // };
      // console.log("reducerrrr", payload);
      const extistDeleted = state.deletedNotes.find(
        (note) => note.id === payload.id
      );
      if (extistDeleted) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          deletedNotes: [...state.deletedNotes, payload],
        };
      }
    case UNDELETE_NOTE:
      return {
        ...state,
        notes: state.notes.concat(state.deletedNotes.pop()),
      };
    case GET_NOTES:
      const archived = state.notes.filter((note) => note.archived === true);
      const deleted = state.notes.filter((note) => note.deleted === true);
      return {
        ...state,
        notes: payload,
        notesToShow: payload,
        archivedNotes: archived,
        deletedNotes: deleted,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case SET_ID_NOTE_TO_DELETE:
      return {
        ...state,
        idNoteToDelete: payload,
      };
    default:
      return state;
  }
};

export default reducer;

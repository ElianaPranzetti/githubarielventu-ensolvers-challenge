import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenDialog, createNote, setId, setNotesToShow } from "../actions";
import {
  OutlinedInput,
  TextField,
  Chip,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  DialogActions,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
const filter = createFilterOptions();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const EditNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState([]);
  const listCategories = useSelector((state) => state.categories);
  const [newNote, setNewNote] = useState({
    id: "",
    title: "",
    body: "",
    category: [],
  });
  const idNote = useSelector((state) => state.idNote);
  const open = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpenDialog(false));
  };

  const idAutoIncrement = () => {
    idNote === 1 && dispatch(setId(1));
    let id = idNote + 1;
    dispatch(setId(id));
  };
  // console.log("newNote:", newNote)


  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(output);
   
    idAutoIncrement();
    setNewNote({
      id: idNote ? idNote : 1,
      title: title,
      body: body,
      category: category,
    });
    console.log("newNote:", newNote)
    dispatch(createNote(newNote));
    setTitle("");
    setBody("");
    dispatch(setNotesToShow());
    dispatch(setOpenDialog(false));
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
    setNewNote({
      ...newNote,
      category: e.target.value,
    });
  };

  return (
    <form>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box display="flex" flexDirection="column">
          <TextField
            id="outlined-static"
            label="Title"
            // placeholder="Placeholder"
            multiline
            maxRows={4}
            onChange={handleChange}
            name="title"
          ></TextField>
          <TextField
            id="outlined-multiline-static"
            label="Body Note"
            multiline
            rows={6}
            onChange={handleChange}
            name="body"
          ></TextField>
        </Box>
          <FormControl sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={category}
              onChange={handleChangeCategory}
              input={
                <OutlinedInput id="select-multiple-chip" label="Category" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {listCategories?.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            <DialogActions>
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
          </FormControl>
      </Box>
    </form>
  );
};

export default EditNote;

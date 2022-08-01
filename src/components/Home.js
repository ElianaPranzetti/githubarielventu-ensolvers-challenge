import { useEffect, useState, Fragment } from "react";
import { Typography, Container, Box, Fab, Tooltip, Menu, MenuItem, Divider, Snackbar, Button, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { setNotesToShow, setFilterNotes, setOpenAlert, unDeleteNote } from "../actions";
import Note from "./Note";

const Home = () => {
  const notes = useSelector((state) => state.notes);
  const openAlert = useSelector((state) => state.isOpenAlert);
  const notesToShow = useSelector((state) => state.notesToShow);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (e) => {
    console.log(e.target.outerText);
    dispatch(setFilterNotes(e.target.outerText));
  }

  // console.log("nts", notesToShow);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(setOpenAlert(false));
  };

  const handleUndelete = (e) => {
    dispatch(unDeleteNote(e.target.id));
    dispatch(setOpenAlert(false));
    dispatch(setNotesToShow());
  }

  const actionAlert = (
    <Fragment>
      <Button color="primary" size="small" onClick={handleUndelete}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    dispatch(setNotesToShow());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{ height: "auto" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" align="center" m={2} >
          My Notes
        </Typography>

        <Tooltip title="Filter Notes by Categories">
        <Fab
          size="small"
          color="white"
          aria-label="archive"
          sx={{
            mx: { xs: 1 },
            }}
            aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
          <FilterListIcon />
          </Fab>
        </Tooltip>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
          <MenuItem disabled>Categories</MenuItem>
          <MenuItem onClick={handleFilter}>All</MenuItem>
           <Divider />
          {categories?.map((category) => (
            <MenuItem key={category} value={category} onClick={handleFilter}>
              {category}
            </MenuItem>
          ))}
      </Menu>
      </Box>
      <Divider />

      <Container
        sx={{ height: "auto" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {!notesToShow.length ? (
          <Typography variant="h6" align="center" padding={5} color={grey[800]}>
            Nothing to show yet
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              p: 2,
              "& > :not(style)": {
                m: 2,
                width: 250,
                height: "auto",
              },
            }}
          >
            {notesToShow.map((note) => (
              <Note
                key={note.id}
                title={note.title}
                body={note.body}
                id={note.id}
                category={note.category}
              />
            ))}
          </Box>
        )}
         <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message="Note Deleted!"
        action={actionAlert}
      />
      </Container>
    </>
  );
};


export default Home;

import { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import EditNote from "./EditNote";
import {
  setArchivedNote,
  setUnarchivedNote,
  getNotes,
  setDeleteNote,
  setOpenAlert,
  setOpenDialog,
  setIdNoteToDelete,
  setNotesToShow,
} from "../actions";
import {
  Slide,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Note = ({ title, body, id, category }) => {
  const [open, setOpen] = useState(false);
  const openDialog = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const archivedNotes = useSelector((state) => state.archivedNotes);

  const handleClickOpenDialog = () => {
    dispatch(setOpenDialog(true));
    setOpen(false);
  };

  const handleCloseDialog = () => {
    dispatch(setOpenDialog(false));
  };

  // console.log(title, body, id, category);
  const handleClickOpen = (e) => {
    console.log("id:", id);
    // console.log(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleArchive = (e) => {
    // console.log(e)
    // dispatch(setArchivedNote(id));
    dispatch(
      setArchivedNote({
        id: id,
        archived: true,
      })
    );
    setOpen(false);
    dispatch(getNotes());
    // dispatch(setNotesToShow());
  };

  const handleRestore = (e) => {
    // console.log(e)
    dispatch(
      setArchivedNote({
        id: id,
        archived: false,
      })
    );
    dispatch(setUnarchivedNote(id));
    dispatch(getNotes());
    dispatch(setNotesToShow());
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(
      setDeleteNote({
        id: id,
        deleted: true,
      })
    );
    dispatch(setIdNoteToDelete(id));
    dispatch(getNotes());
    dispatch(setNotesToShow());
    dispatch(setOpenAlert(true));
    setOpen(false);
    // props.history.push('/')
  };

  // const handleEdit = () => {
  //   return (
  //     <Alert severity="info">
  //       <AlertTitle>Info</AlertTitle>
  //       Feature in development — <strong>coming soon!</strong>
  //     </Alert>
  //   );
  // };

  // useEffect(() => {
  //   dispatch(getNotes());
  //   dispatch(setNotesToShow());
  // }, [dispatch]);

  const isArchived = archivedNotes?.some((note) => note.id === id);
  // console.log("isArchived:", isArchived);

  return (
    <Card sx={{ maxWidth: 230 }}>
      <CardActionArea onClick={handleClickOpen}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {body}
          </Typography>
          <Divider />

          {category?.map((cat) => (
            <Typography
              variant="body2"
              textAlign="right"
              sx={{
                color: (theme) => theme.palette.grey[600],
              }}
            >
              {cat}
            </Typography>
          ))}
        </CardContent>
      </CardActionArea>
      {/* Open Note Details */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        value={id}
      >
        <DialogTitle id="alert-dialog-title">
          <Tooltip title="Close">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          {category?.map((cat) => (
            <DialogContentText
              id="alert-dialog-cat"
              variant="body2"
              textAlign="right"
              sx={{
                color: (theme) => theme.palette.grey[600],
              }}
            >
              {cat}
            </DialogContentText>
          ))}
        </DialogContent>
        <Divider />
        <DialogActions mb={1}>
          <Tooltip title="Feature in development">
            <IconButton
              aria-label="edit"
              // onClick={handleEdit}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          {!isArchived ? (
            <Tooltip title="Archive">
              <IconButton
                aria-label="archive"
                onClick={handleArchive}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <ArchiveIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Restore">
              <IconButton
                aria-label="restore"
                onClick={handleRestore}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <UnarchiveIcon />
              </IconButton>
            </Tooltip>
          )}
          {!isArchived ? (
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={handleDelete}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog EDIT */}
      {/* <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Edit"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <EditNote
              id={id}
              title={title}
              body={body}
              category={category}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
    </Card>
  );
};

export default Note;

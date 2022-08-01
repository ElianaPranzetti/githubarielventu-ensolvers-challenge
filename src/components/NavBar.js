import { forwardRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenDialog } from "../actions";
import { Link } from "react-router-dom";
import NewNote from "./NewNote";
import ToggleDM from "./ToggleDM";

// Imports MUI
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";


import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Fab,
  Button,
  Box,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Badge
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBar = (props) => {
  // const [open, setOpen] = useState(false);
  const open = useSelector((state) => state.isOpen);
  const archived = useSelector((state) => state.archivedNotes);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(setOpenDialog(true));
  };

  const handleClose = () => {
    dispatch(setOpenDialog(false));
  };

  console.log(props);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display:"flex",
            alignItems:"center",
            flexDirection:"row",
            justifyContent:"space-between"
          }}
        >
          
          <Box 
          sx={{
            display:"flex",
            alignItems:"center",
            flexDirection:"row",
            justifyContent:"flex-start",
            width: 250 
          }}>
            <Tooltip title="Add new note">
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
                sx={{
                  mx: { xs: 1 }
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
            <Typography
              variant="p"
              align="center"
              mr={1}
              sx={{
                display: { xs: "none", md: "inline-block" },
              }}
            >
              Add Note
            </Typography>
            {/* Archive */}
            <Tooltip title="Archived Notes">
                <Fab
                  size="small"
                  color="primary"
                  aria-label="archive"
                  sx={{
                    mx: { xs: 1 }
                  }}
                component= {Link}
                   to="/archive"
                >
                <Badge color="secondary"  badgeContent={archived.length} >
                  <InventoryIcon />
                </Badge>
                  </Fab>
              {/* </Link> */}
            </Tooltip>
            <Typography
              variant="p"
              align="center"
              sx={{
                display: { xs: "none", md: "inline-block" },
              }}
            >
              Archive
            </Typography>
            {/* </Box> */}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            sx={{ width: 250 }}
          >
            <DescriptionIcon
              sx={{ display: "flex", mr: 1 }}
            />
            <Link style={{ textDecoration: "none" }} to="/">
              <Typography
                variant="h6"
                noWrap
                color="white"
                textDecoration="none"
                fontSize={30}
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                NotesApp
              </Typography>
            </Link>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            padding={1}
            sx={{ width: 250 }}
          >
            <ToggleDM />
          </Box>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <DialogTitle>{"New Note"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <NewNote />
              </DialogContentText>
            </DialogContent>
            
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

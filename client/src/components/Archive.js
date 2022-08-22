import {
  Typography,
  Container,
  Box,
  Button,
  Divider,
  Tooltip,
  Fab,
} from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { setUnarchivedAll, setNotesToShow } from "../actions";
import Note from "./Note";

const Archive = () => {
  const archivedNotes = useSelector((state) => state.archivedNotes);
  const dispatch = useDispatch();

  // console.log(archivedNotes.length);
  const handleClick = () => {
    dispatch(setUnarchivedAll(false));
    dispatch(setNotesToShow());
  };

  return (
    <>
      <Box
        sx={{ height: "auto" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" align="center" m={2}>
          Archived Notes
        </Typography>
        <Tooltip title="Unarchive All Notes">
          <Fab
            size="small"
            color="white"
            aria-label="archive"
            sx={{
              mx: { xs: 1 },
            }}
            onClick={handleClick}
          >
            <UnarchiveIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Divider />

      <Container
        sx={{ height: "auto" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {!archivedNotes.length ? (
          <Typography variant="h6" align="center" padding={5} color={grey[800]}>
            Nothing to show here
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
            {archivedNotes?.map(
              (note) =>
                !note.deleted && note.archived && (
                  <Note
                    key={note.id}
                    title={note.title}
                    body={note.body}
                    id={note.id}
                    category={note.categories?.map((category) => category.name)}
                  />
                )
            )}
          </Box>
        )}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={8}
        >
          <Button component={Link} to="/" variant="primary">
            Go To HomePage
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Archive;

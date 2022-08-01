import { Typography, Button, Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { Link, Router } from "react-router-dom";
import Home from "./Home";

const NotFound = () => {
  return (
    <div>
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography variant="h2" align="center">
        Page Not Found
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={8}
      >
        <Button component={Link} to="/" variant="primary">Go To HomePage</Button>
      </Box>
    </div>
  );
};

export default NotFound;

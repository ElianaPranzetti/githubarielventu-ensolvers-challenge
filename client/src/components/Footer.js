import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{ height: "auto" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mb: 1, position: " absolute", bottom: "0" }}
      >
        © {new Date().getFullYear()}, Built with
        <FavoriteIcon
          color="primary"
          sx={{ mx: 0.6, width: "1rem", bottom: "0" }}
        />
        by
        <Link
          href="https://www.linkedin.com/in/arielventu"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mx: 0.6 }}
        >
          Ariel Ventura
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

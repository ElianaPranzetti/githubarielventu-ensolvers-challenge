import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../actions";

const ToggleDM = () => {
  const isDark = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleDM = () => {
    dispatch(setTheme(isDark === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <Tooltip title="Toggle Dark Mode">
        <IconButton onClick={toggleDM}>
          {isDark === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ToggleDM;

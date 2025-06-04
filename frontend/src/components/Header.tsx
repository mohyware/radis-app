import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useStyles } from "../App";
import logo from "../radis.png";
import { InfoPopover } from "./InfoPopover";
import { ColorModeContext } from "./ToggleColorMode";
import { palette } from "../constants";

export const Header: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <AppBar
      position="static"
      elevation={0}
      style={{ backgroundColor: theme.palette.mode === "dark" ? palette.primary.dark : palette.primary.light, borderBottom: "1px solid #ccc" }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Box m={1}>
            <img src={logo} height={50} alt="Radish logo" />
          </Box>
          <Typography
            // variant="h4"
            className={classes.title}
            style={{ color: theme.palette.mode === "dark" ? palette.primary.contrastText : palette.primary.contrastText, fontWeight: 1000 }}
          >
            Radis App
          </Typography>
          <IconButton>
            <GitHubIcon
              style={{ color: palette.primary.contrastText, fontSize: "28" }}
              onClick={() =>
                (window.location.href = "https://github.com/suzil/radis-app")
              }
            />
          </IconButton>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <InfoPopover />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

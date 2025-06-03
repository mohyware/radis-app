import React from "react";
import "fontsource-roboto";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { PlotSpectra } from "./components/PlotSpectra";
import { Header } from "./components/Header";
import ToggleColorMode from "./components/ToggleColorMode";

export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
});

export default function App(): React.ReactElement {
  const classes = useStyles();
  return (
    <ToggleColorMode>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Container style={{ maxWidth: "none" }}>
          <Box sx={{ m: 6 }}>
            <PlotSpectra />
          </Box>
        </Container>
      </div>
    </ToggleColorMode>
  );
}
import "fontsource-roboto";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import { makeStyles } from "@mui/styles";
import { PlotSpectra } from "./components/PlotSpectra";
import { Header } from "./components/Header";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { JoyColorSchemes } from "./constants";

const theme = extendTheme({
  colorSchemes: JoyColorSchemes,
});


export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "black",
    fontWeight: "bold",
  },
});

export default function App(): React.ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container style={{ maxWidth: "none" }}>
          <Box sx={{ m: 6 }}>
            <PlotSpectra />
          </Box>
        </Container>
      </CssVarsProvider>
    </div>
  );
}

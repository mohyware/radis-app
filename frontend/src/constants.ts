import { Species } from "./components/types";

export const palette = {
  primary: {
    light: "#1976D2",
    main: "#1976D2",
    dark: "#272727",
    contrastText: "#fff",
  },
  secondary: {
    light: "#f73378",
    main: "#f50057",
    dark: "#ab003c",
    contrastText: "#fff",
  },
};

export interface PlotSettings {
  mode: string;
  units: string;
}

export interface Spectrum {
  database: string;
  tgas: number;
  trot?: number;
  tvib?: number;
  pressure: number;
  pressure_units: string;
  wavelength_units: string;
  species: Species[];
  x: number[];
  y: number[];
}

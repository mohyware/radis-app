export type Species = {
  molecule: string;
  mole_fraction: number;
};

export enum Database {
  HITRAN = "hitran",
  GEISA = "geisa",
  HITEMP = "hitemp",
  EXOMOL = "exomol",
  NIST = "nist",
}

export type FormValues = {
  mode: string;
  database: Database;
  species: Species[];
  min_wavenumber_range: number;
  max_wavenumber_range: number;
  tgas: number;
  tvib?: number;
  trot?: number;
  pressure: number;
  path_length: number;
  simulate_slit?: number;
  use_simulate_slit: boolean;
  wavelength_units: string;
  pressure_units: string;
  path_length_units: string;
};

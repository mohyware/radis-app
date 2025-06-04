import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { Controller, useFormContext } from "react-hook-form";

export const Mode: React.FC = () => {
  const { control } = useFormContext();
  return (
    <FormControl fullWidth>
      <FormLabel htmlFor="mode-select">Mode</FormLabel>
      <Controller
        name="mode"
        defaultValue="absorbance"
        control={control}
        render={({ field }) => (
          <Select
            id="mode-select"
            data-testid="mode-select-testid"
            {...field}
            onChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
          >
            <MenuItem value={"absorbance"}>Absorbance</MenuItem>
            <MenuItem value={"radiance_noslit"}>Radiance</MenuItem>
            <MenuItem value={"transmittance_noslit"}>Transmittance</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
};

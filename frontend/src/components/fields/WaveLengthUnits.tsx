import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Controller, useFormContext } from "react-hook-form";


export const WaveLengthUnit: React.FC = () => {
  const { control } = useFormContext();


  return (
    <FormControl >
      <Controller
        name="wavelength_units"
        defaultValue="1/u.cm"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            variant="standard"
            id="mode-select"
            onChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
            MenuProps={{
              PaperProps: {
                variant: "outlined"
              }
            }}
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            <MenuItem value={"1/u.cm"}>cm⁻¹</MenuItem>
            <MenuItem value={"u.nm"}>nm</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
};

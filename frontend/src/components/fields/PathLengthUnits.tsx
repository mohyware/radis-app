import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Controller, useFormContext } from "react-hook-form";

export const PathLengthUnit: React.FC = () => {
  const { control } = useFormContext();
  return (
    <FormControl fullWidth>
      <Controller
        name="path_length_units"
        defaultValue="u.cm"
        control={control}
        render={({ field, formState }) => (
          <Select
            {...field}
            {...formState}
            variant="standard"
            labelId="mode-select-label"
            id="mode-select"
            onChange={field.onChange}
            value={field.value}
            label="Select"
            style={{ marginTop: "15px" }}
          >
            <MenuItem value={"u.cm"}>cm</MenuItem>
            <MenuItem value={"u.m"}>m</MenuItem>
            <MenuItem value={"u.km"}>km</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
};

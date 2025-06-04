import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Controller, useFormContext } from "react-hook-form";
import { FormValues } from "../types";

export const PressureUnit: React.FC = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormControl fullWidth>
      <Controller
        name="pressure_units"
        defaultValue="u.bar"
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
            <MenuItem value={"u.bar"}>bar</MenuItem>
            <MenuItem value={"u.mbar"}>mbar</MenuItem>
            <MenuItem value={"cds.atm"}>atm</MenuItem>
            <MenuItem value={"u.torr"}>torr</MenuItem>
            <MenuItem value={"u.mTorr"}>mTorr</MenuItem>
            <MenuItem value={"u.Pa"}>Pa</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
};

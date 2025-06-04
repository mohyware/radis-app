import React from "react"; // Add this line

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import { Controller, useFormContext } from "react-hook-form";

import Divider from "@mui/material/Divider";
import { PressureUnit } from "./PressureUnits";

export const Pressure: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="pressure"
      control={control}
      defaultValue={1.01325}
      render={({ field, fieldState }) => (
        <FormControl>
          <FormLabel>Pressure</FormLabel>
          <Input
            {...field}
            id="pressure-input"
            data-testid="pressure-input-testid"
            type="number"
            onChange={field.onChange}
            value={field.value}
            error={!!fieldState.error}
            endAdornment={
              <div>
                <Divider orientation="vertical" />
                <PressureUnit control={control} />
              </div>
            }
          />
          {fieldState.error ? (
            <FormHelperText
              sx={{
                color: "red",
              }}
            >
              {fieldState.error.message}
            </FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
};

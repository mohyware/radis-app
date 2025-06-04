import React from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext } from "react-hook-form";

export const TRot: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Controller
      name="trot"
      control={control}
      defaultValue={300}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <FormLabel htmlFor="trot-input">TRot</FormLabel>
          <Input
            {...field}
            id="trot-input"
            type="number"
            onChange={field.onChange}
            value={field.value}
            error={!!fieldState.error}
            endAdornment={<InputAdornment position="end">K</InputAdornment>}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event?.key === "-" || event?.key === "+") {
                event.preventDefault();
              }
            }}
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

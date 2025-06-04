import React from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";



export const TGas: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Controller
      name="tgas"
      control={control}
      defaultValue={300}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <FormLabel htmlFor="tgas-input">TGas</FormLabel>
          <Input
            {...field}
            id="tgas-input"
            data-testid="tgas-testid"
            type="number"
            onChange={field.onChange}
            value={field.value}
            error={!!fieldState.error}
            endAdornment={"k"}
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

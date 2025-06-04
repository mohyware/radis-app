import React from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext } from "react-hook-form";
import useFromStore from "../../store/form";

export const SimulateSlit: React.FC = () => {
  const { control } = useFormContext();

  const { simulateSlitUnit } = useFromStore();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <FormLabel>Slit Size</FormLabel>
          <Input
            {...field}
            id="simulate_slit"
            type="number"
            onChange={field.onChange}
            value={field.value}
            error={!!fieldState.error}
            endAdornment={
              simulateSlitUnit ? (
                <InputAdornment position="end">nm</InputAdornment>
              ) : (
                <InputAdornment position="end">cm-1</InputAdornment>
              )
            }
            onKeyPress={(event) => {
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
      name="simulate_slit"
      control={control}
      defaultValue={5}
    />
  );
};

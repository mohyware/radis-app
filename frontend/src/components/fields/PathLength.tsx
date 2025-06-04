import React from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { PathLengthUnit } from "./PathLengthUnits";

export const PathLength: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <FormLabel>Path Length</FormLabel>
          <Input
            {...field}
            type="number"
            onChange={field.onChange}
            value={field.value}
            error={!!fieldState.error}
            endAdornment={
              <div>
                <Divider orientation="vertical" />
                <PathLengthUnit />
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
      name="path_length"
      defaultValue={1}
    />
  );
};

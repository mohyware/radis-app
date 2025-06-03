import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { Controller, useFormContext } from "react-hook-form";
import { Database as TDatabase } from "../types";

export const Database: React.FC = () => {
  const { control } = useFormContext();
  return (
    <FormControl>
      <FormLabel>Database</FormLabel>
      <Controller
        name="database"
        defaultValue={TDatabase.HITRAN}
        control={control}
        render={({ field, formState }) => (
          <Select
            {...field}
            {...formState}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            value={field.value}
          >
            <MenuItem value={TDatabase.HITRAN}>HITRAN</MenuItem>
            <MenuItem value={TDatabase.GEISA}>GEISA</MenuItem>
            <MenuItem value={TDatabase.HITEMP}>HITEMP</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
};

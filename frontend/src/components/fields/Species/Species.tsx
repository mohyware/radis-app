import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Input from "@mui/joy/Input";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { MoleculeSelector } from "../MoleculeSelector/MoleculeSelector";
import { Database, FormValues } from "../../types";
export interface SpeciesProps {
  control: Control<FormValues>;
  isNonEquilibrium: boolean;
  databaseWatch: Database;
}

export const Species: React.FC<SpeciesProps> = ({
  control,
  isNonEquilibrium,
  databaseWatch,
}) => {
  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: "species",
  });
  return (
    <Grid container spacing={3}>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          {/* Molecule Selector Field */}
          <Grid item xs={6}>
            <Controller
              name={`species.${index}.molecule` as const}
              control={control}
              render={({ field, formState }) => (
                <MoleculeSelector
                  validationError={formState.errors?.species?.[index]?.molecule}
                  control={control}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  autofocus={index !== 0}
                  isNonEquilibrium={isNonEquilibrium}
                  databaseWatch={databaseWatch}
                />
              )}
            />
          </Grid>

          {/* Mole Fraction Field */}
          <Grid item xs={5}>
            <Controller
              name={`species.${index}.mole_fraction` as const}
              control={control}
              render={({ field: { onChange, value }, formState }) => (
                <FormControl>
                  <FormLabel>Mole Fraction</FormLabel>
                  <Input
                    id="mole-fraction-input"
                    error={!!formState.errors?.species?.[index]?.mole_fraction}
                    value={value}
                    type="number"
                    onChange={(e) => {
                      onChange(parseFloat(e.target.value));
                    }}
                  />
                  {formState.errors?.species?.[index]?.mole_fraction ? (
                    <FormHelperText
                      sx={{
                        color: "red",
                      }}
                    >
                      {
                        formState.errors?.species?.[index]?.mole_fraction
                          ?.message
                      }
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          {/* Isotope Field */}
          <Grid item xs={10}>
            <Controller
              name={`species.${index}.isotope` as const}
              control={control}
              render={({ field: { onChange, value }, formState }) => (
                <FormControl>
                  <FormLabel>Isotopes</FormLabel>
                  <Input
                    id="isotope-input"
                    error={!!formState.errors?.species?.[index]?.isotope}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    placeholder="e.g., all or 1,2,3"
                  />
                  {formState.errors?.species?.[index]?.isotope && (
                    <FormHelperText sx={{ color: "red" }}>
                      {formState.errors?.species?.[index]?.isotope?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Add/Remove Species Buttons */}
          <Grid item xs={2} style={{ marginTop: 24 }}>
            {index === 0 ? (
              <IconButton
                color="primary"
                onClick={() =>
                  append({ molecule: undefined, mole_fraction: undefined })
                }
              >
                <AddIcon />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                disabled={fields.length === 1}
                onClick={() => {
                  remove(index);
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

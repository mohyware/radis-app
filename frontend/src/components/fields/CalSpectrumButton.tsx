import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

export const CalcSpectrumButton: React.FC = () => {
  const theme = useTheme();
  return (
    <Button variant="contained"
      sx={{
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          transform: 'scale(1.02)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
      fullWidth id="calc-spectrum-button" disabled={false} type="submit">
      New plot
    </Button>
  );
};
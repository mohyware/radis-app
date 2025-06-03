import React from "react";
import Button from "@mui/material/Button";

export const CalcSpectrumButton: React.FC = () => (
  <Button fullWidth id="calc-spectrum-button" disabled={false} type="submit">
    New plot
  </Button>
);

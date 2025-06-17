import React, { useState } from "react";
import Snackbar from "@mui/joy/Snackbar";
import Alert from "@mui/joy/Alert";

interface ErrorAlertInterface {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertInterface> = ({ message }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={() => setOpen(false)}
      key={message}
      sx={{
        background: "transparent",
        boxShadow: "none",
        border: "none",
      }}
    >
      <Alert color="danger">{message}</Alert>
    </Snackbar>
  );
};

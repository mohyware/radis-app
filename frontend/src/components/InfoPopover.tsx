import React, { useState, useEffect, useRef } from "react";
import { IconButton, Typography, Sheet } from "@mui/joy";
import { Popper } from "@mui/base/Popper";
import InfoIcon from "@mui/icons-material/Info";
import { useColorScheme } from "@mui/joy/styles";

export const InfoPopover = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { mode } = useColorScheme();
  const popperRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <InfoIcon sx={{ color: mode === "dark" ? "white" : "", fontSize: 30 }} />
      </IconButton>

      <Popper open={open} anchorEl={anchorEl} placement="bottom">
        <Sheet
          ref={popperRef}
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: "background.surface",
            borderRadius: "md",
            boxShadow: "lg",
            maxWidth: 300,
            zIndex: 1300,
          }}
        >
          <Typography>
            Powered by{" "}
            <a href="https://radis.github.io/" rel="noreferrer" target="_blank">
              RADIS
            </a>
            , based on{" "}
            <a href="https://hitran.org/" rel="noreferrer" target="_blank">
              the HITRAN database
            </a>
            .<br />
            <br />
            For research-grade use, start{" "}
            <a href="https://radis.github.io/radis-lab/" rel="noreferrer" target="_blank">
              🌱 Radis-Lab
            </a>{" "}
            with preconfigured databases (HITRAN, HITEMP) and an online Python
            Jupyter environment (no install needed).
          </Typography>
        </Sheet>
      </Popper>
    </>
  );
};

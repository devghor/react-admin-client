import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function OverlayLoader(props) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "tooltip",
        }}
        open={props.open}
      >
        <CircularProgress
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
          size={40}
          thickness={4}
        />
      </Backdrop>
    </div>
  );
}

import { LinearProgress } from "@mui/material";
import React, { useContext } from "react";
import { LoaderContext } from "../../contexts/LoaderContext";

export default function LinearIndeterminate() {
  const [isOpen] = useContext(LoaderContext);

  return (
    <div >
      <LinearProgress
        style={{ display: !isOpen ? "none" : "" }}
        color="primary"
      />
    </div>
  );
}

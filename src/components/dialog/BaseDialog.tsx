import React from "react";

import { Dialog } from "@mui/material";
import {DialogContent} from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomizedDialogTitle = ({ children, onClose, ...other }) => {
  return (
    <DialogTitle {...other}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div>{children}</div>
        <IconButton
          edge="start"
          color="inherit"
          size="small"
          onClick={onClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </Box>
    </DialogTitle>
  );
};

type Props = {
  open: boolean;
  children?: React.ReactNode;
  title?: String;
  setOpen: (isOpen: boolean) => void;
};

const BaseDialog: React.FC<Props> = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CustomizedDialogTitle onClose={handleClose}>
          {props.title}
        </CustomizedDialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default BaseDialog;

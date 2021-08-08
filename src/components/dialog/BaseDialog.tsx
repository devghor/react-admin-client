import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Box, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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
          <CloseIcon />
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

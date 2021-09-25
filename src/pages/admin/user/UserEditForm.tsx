import React, { Children } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { axios } from "../../../plugins";

import toast from "react-hot-toast";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
});

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
  children?: React.ReactNode;
  item: {
    firstName: String;
    lastName: String;
    email: String;
    role: {
      id: Number;
    };
  };
  onItemCreated?: () => void;
};

const UserEditDialog: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: props.item.firstName,
      lastName: props.item.lastName,
      email: props.item.email,
      password: "",
      role: props.item.role.id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/users", values)
        .then(({ data }) => {
          toast.success(data.message);
        })
        .finally(() => {
          setLoading(false);
        });
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRole = async () => {
    const { data } = await axios.get("/roles");
    setRoles(data.data);
    console.log(data);
  };

  React.useEffect(() => {
    if (open) {
      getRole();
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CustomizedDialogTitle onClose={handleClose}>
          Create User
        </CustomizedDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              label="First name"
              fullWidth
              name="firstName"
              id="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last name"
              fullWidth
              name="lastName"
              id="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              label="Email"
              fullWidth
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControl fullWidth>
              <InputLabel
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                Role
              </InputLabel>
              <Select
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem key="" value="">
                  None
                </MenuItem>
                {roles.map(({ id, displayName }) => {
                  return (
                    <MenuItem key={id} value={id}>
                      {displayName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText error>
                {formik.touched.role && formik.errors.role}
              </FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              {loading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UserEditDialog;

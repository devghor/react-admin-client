import React, { Children } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { axios } from "../../../plugins";

import toast from "react-hot-toast";

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

type Props = {
  children?: React.ReactNode;
  onItemCreated: (item: object) => void;
  roles: Array<{ id: number; displayName: string; name: string }>;
};

const UserCreateForm: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/users", values)
        .then(({ data }) => {
          toast.success(data.message);
          props.onItemCreated(values);
        })
        .finally(() => {
          setLoading(false);
        });
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="First name"
          fullWidth
          name="firstName"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
            {props.roles.map(({ id, displayName }) => {
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
        <Box display="flex" justifyContent="flex-end" border="1" mt={2}>
          <Button type="submit" color="primary">
            {loading ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default UserCreateForm;

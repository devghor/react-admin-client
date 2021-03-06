import React, { Children } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { axios } from "../../../api";

import toast from "react-hot-toast";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { endpoint } from "../../../api";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  roleId: yup.string().required("Role is required"),
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
      roleId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(endpoint.USERS_APPEND, values)
        .then(({ data }) => {
          toast.success("Succesfully created a user.");
          props.onItemCreated(data.data);
        })
        .catch(({ response }) => {
          if (response.data.errors) {
            toast.error(response.data.errors[0]);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { mb: 1.5 },
            pt: 1,
          }}
        >
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

          <FormControl
            fullWidth
            error={formik.touched.roleId && Boolean(formik.errors.roleId)}
          >
            <InputLabel id="label-id-role">Role</InputLabel>
            <Select
              id="roleId"
              labelId="label-id-role"
              label="Role"
              name="roleId"
              displayEmpty
              value={formik.values.roleId}
              onChange={formik.handleChange}
            >
              {props.roles.map(({ id, displayName }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {displayName}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formik.touched.roleId && formik.errors.roleId}
            </FormHelperText>
          </FormControl>
        </Box>
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

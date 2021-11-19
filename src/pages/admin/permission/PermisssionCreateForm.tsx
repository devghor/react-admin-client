import React, { Children } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { axios, endpoint } from "../../../api";

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

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  displayName: yup.string().required("Display name is required"),
});

type Props = {
  children?: React.ReactNode;
  onItemCreated: (arg: object) => void;
  roles: Array<{ id: number; displayName: string; name: string }>;
};

const PermissionCreateForm: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      displayName: "",
      roleId: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(endpoint.PERMISSIONS_POST, values)
        .then(({ data }) => {
          props.onItemCreated(data.data);
          toast.success("Succesfully created a user.");
        })
        .catch(({ response }) => {
          if (response.data.error) {
            toast.error(response.data.error.message);
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
            label="Name"
            fullWidth
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            label="Display Name"
            fullWidth
            name="displayName"
            id="displayName"
            value={formik.values.displayName}
            onChange={formik.handleChange}
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
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

export default PermissionCreateForm;

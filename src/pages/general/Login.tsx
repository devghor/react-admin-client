import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { axios } from "../../plugins";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../redux/loaderSlice";
import { login } from "../../redux/authSlice";

import toast from "react-hot-toast";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    minWidth: 345,
  },
  media: {
    height: 140,
  },
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      doLogin(values);
    },
  });

  const doLogin = async (payload) => {
    try {
      dispatch(toggleLoading());
      let { data } = await axios.post("/login", payload);
      dispatch(login(data))
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <TextField
              name="email"
              id="email"
              label="Email"
              fullWidth
              style={{ marginBottom: "20px", marginTop: "20px" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Login;

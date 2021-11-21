import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { axios, endpoint } from "../../../api";
import { toggleLoading } from "../../../redux/loaderSlice";

interface Props {
  children?: ReactNode;
}

const Topic = ({ amount, title }) => {
  return (
    <Card sx={{ pt: 10, pb: 10 }}>
      <CardContent>
        <Typography variant="h2" align="center">
          {amount}
        </Typography>
        <Typography variant="h5" component="div" align="center">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = (props: Props) => {
  const dispatch = useDispatch();

  const [details, setDetails] = React.useState({
    totalUser: 0,
    totalRole:0,
    totalPermission: 0
  });

  const getDetails = async () => {
    dispatch(toggleLoading());
    const { data } = await axios.get(endpoint.DASHBOARD_DETAILS);
    setDetails({ ...data.data });
    dispatch(toggleLoading());
  };

  React.useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin portal</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Topic amount={details.totalUser} title="Users" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Topic amount={details.totalRole} title="Role" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Topic amount={details.totalPermission} title="Permission" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;

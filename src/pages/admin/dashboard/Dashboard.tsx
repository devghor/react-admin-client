import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet";
import { ReactNode } from "react";
import { TopicCard } from "../../../components";

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "company",
    label: "Company",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "state",
    label: "State",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "Actions",
    options: {
      filter: false,
      sort: false,
      empty: true,
      setCellHeaderProps: () => ({
        style: { display: "flex", justifyContent: "center" },
      }),
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <div style={{ textAlign: "center" }}>
            <IconButton
              onClick={() =>
                window.alert(
                  `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
                )
              }
              aria-label="delete"
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() =>
                window.alert(
                  `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
                )
              }
              aria-label="delete"
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
        );
      },
    },
  },
];

const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
];

interface Props {
  children?: ReactNode;
}

const Dashboard: React.FC = (props: Props) => {
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
              <TopicCard />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TopicCard />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TopicCard />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TopicCard />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <TopicCard />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TopicCard />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TopicCard />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <TopicCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;

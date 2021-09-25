import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { ReactNode } from "react";



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
    <div>
      <Box color="text.primary">
        <Typography variant="h5">Users</Typography>
      </Box>
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: "5px", paddingBottom: "5px" }}
      >
        <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
          <Button variant="text" color="secondary" startIcon={<Add />}>
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={12}>
         
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

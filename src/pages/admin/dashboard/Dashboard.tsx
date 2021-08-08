import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { ReactNode } from "react";

import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

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
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() =>
                window.alert(
                  `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
                )
              }
              aria-label="delete"
            >
              <DeleteIcon fontSize="small" />
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box color="text.primary" clone>
        <Typography variant="h5">Users</Typography>
      </Box>
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: "5px", paddingBottom: "5px" }}
      >
        <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
          <Button variant="text" color="secondary" startIcon={<AddIcon />}>
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={12}>
          <MUIDataTable
            options={{
              download:false,
              print:false,
              elevation: 1,
              filterType: "checkbox",
              setTableProps: () => ({
                size: "small",
              }),
            }}
            data={data}
            columns={columns}
          />{" "}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { axios } from "../../../plugins";

import { useDispatch } from "react-redux";
import { toggleLoading } from "../../../redux/loaderSlice";
import UserCreateForm from "./UserCreateForm";
import UserEditForm from "./UserEditForm";
import BaseDialog from "../../../components/dialog/BaseDialog";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const Users: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [users, setUsers] = React.useState([]);
  const [editItem, setEditItem] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: { id: 0 },
  });
  const [roles, setRoles] = React.useState([]);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const columns = [
    {
      name: "firstName",
      label: "Firs tName",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "roleName",
      label: "Role",
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
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div style={{ display: "flex" }}>
              <IconButton
                onClick={() => setEditItem(users[dataIndex])}
                aria-label="delete"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => console.log(users[dataIndex])}
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

  const handleNewItem = (item) => {
    console.log(item);
  };

  const getUsers = async () => {
    try {
      dispatch(toggleLoading());
      const { data } = await axios.get("users");
      let users = data.data.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        roleName: item.role.displayName,
        role: item.role,
      }));
      setUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  const getRole = async () => {
    const { data } = await axios.get("/roles");
    setRoles(data.data);
  };

  React.useEffect(() => {
    getUsers();
    getRole();
  }, []);

  return (
    <div className={classes.root}>
      <Box color="text.primary" clone>
        <Typography variant="h5">Users</Typography>
      </Box>
      <Grid
        container
        alignItems={"center"}
        style={{ paddingTop: "5px", paddingBottom: "5px" }}
      >
        <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpenCreateDialog(true)}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <BaseDialog
        title="Create User"
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      >
        <UserCreateForm roles={roles} onItemCreated={handleNewItem} />
      </BaseDialog>
      <BaseDialog
        title="Create User"
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      >
        <UserEditForm  item={editItem} />
      </BaseDialog>
      <Grid container>
        <Grid item xs={12} md={12}>
          <MUIDataTable
            options={{
              download: false,
              print: false,
              elevation: 1,
              filterType: "checkbox",
              setTableProps: () => ({
                size: "small",
              }),
            }}
            data={users}
            columns={columns}
          />{" "}
        </Grid>
      </Grid>
    </div>
  );
};

export default Users;

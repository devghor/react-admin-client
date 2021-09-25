import React from "react";
import { axios } from "../../../plugins";

import { useDispatch } from "react-redux";
import { toggleLoading } from "../../../redux/loaderSlice";
import UserCreateForm from "./UserCreateForm";
import UserEditForm from "./UserEditForm";
import BaseDialog from "../../../components/dialog/BaseDialog";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/system";

const Users: React.FC = () => {
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
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => console.log(users[dataIndex])}
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
    <div>
      <Container>
        <Box color="text.primary" sx={{ marginTop: "5px" }}>
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
          <UserEditForm item={editItem} />
        </BaseDialog>
        <Grid container>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Users;

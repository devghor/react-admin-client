import React from "react";
import { axios } from "../../../plugins";

import { useDispatch } from "react-redux";
import { toggleLoading } from "../../../redux/loaderSlice";
import UserCreateForm from "./UserCreateForm";
import UserEditForm from "./UserEditForm";
import BaseDialog from "../../../components/dialog/BaseDialog";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit, People, Search } from "@mui/icons-material";
import { Box } from "@mui/system";
import { DataTable, PageHeader } from "../../../components";
import { IRole, IUser } from "../../../types";
import toast from "react-hot-toast";

interface IUserListItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  roleId: number;
}
const Users: React.FC = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = React.useState<IUserListItem[] | []>([]);
  const [editItem, setEditItem] = React.useState<IUser>({} as IUser);
  const [roles, setRoles] = React.useState<IRole[] | []>([]);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: false,
        sort: true,
      },
    },
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
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div style={{ display: "flex" }}>
              <IconButton
                onClick={() => {
                  setOpenEditDialog(true);
                  setEditItem({ ...users[dataIndex] });
                  console.log(users[dataIndex]);
                }}
                aria-label="delete"
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                onClick={async () => {
                  if (window.confirm("Are you sure?")) {
                    let item = users[dataIndex];
                    try {
                      dispatch(toggleLoading());
                      const { data } = await axios.delete(`/users/${item.id}`);
                      toast.success("Succesfully deleted the user.");

                      users.splice(dataIndex, 1);
                      setUsers([...users]);
                    } catch (error) {
                      console.log(error);
                    } finally {
                      dispatch(toggleLoading());
                    }
                  }
                }}
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
    let user: IUserListItem = {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      roleName: item.role.displayName,
      roleId: item.role.id,
    };
    setUsers([user, ...users]);
    setOpenCreateDialog(false);
  };

  const handleUpdatedItem = (item) => {
    let userItem: IUserListItem = {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      roleName: item.role.displayName,
      roleId: item.role.id,
    };
    let index = users.findIndex((user) => user.id == userItem.id);
    users[index] = { ...userItem };
    setUsers([...users]);
    setOpenEditDialog(false);
  };

  const getUsers = async () => {
    try {
      dispatch(toggleLoading());
      const { data } = await axios.get("users");
      let users: IUserListItem[] = data.data.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        roleName: item.role.displayName,
        roleId: item.role.id,
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
    <Box>
      <PageHeader
        title="Users"
        subTitle="All user information"
        icon={<People />}
      />

      <Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpenCreateDialog(true)}
          >
            Add
          </Button>
        </Box>
        <DataTable columns={columns} data={users}></DataTable>
      </Paper>
      <BaseDialog
        title="Create User"
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      >
        <UserCreateForm roles={roles} onItemCreated={handleNewItem} />
      </BaseDialog>
      <BaseDialog
        title="Edit User"
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      >
        <UserEditForm
          roles={roles}
          item={editItem}
          onItemUpdated={handleUpdatedItem}
        />
      </BaseDialog>
    </Box>
  );
};

export default Users;

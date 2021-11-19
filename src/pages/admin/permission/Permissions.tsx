import {
  Add,
  Edit,
  HdrPlus,
  PlusOneSharp,
  SettingsAccessibility,
} from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { MuiTable, PageHeader, ReactTable } from "../../../components";
import { toggleLoading } from "../../../redux/loaderSlice";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Edit";
import BaseDialog from "../../../components/dialog/BaseDialog";
import { axios, endpoint } from "../../../api";
import toast from "react-hot-toast";
import PermissionCreateForm from "./PermisssionCreateForm";
import { IRole } from "../../../types";
import PermissionEditFrom from "./PermissionEditForm";

interface PermissionList {
  id: number;
  roleId: number;
  name: string;
  displayName: string;
  description: string;
  createdAt: string;
}

interface IEditItem {
  id: number;
  name: string;
  displayName: string;
  roleId: number;
}

const Roles = () => {
  const dispatch = useDispatch();

  const [permissions, setPermissions] = React.useState<PermissionList[] | []>(
    []
  );
  const [editItem, setEditItem] = React.useState<IEditItem>({} as IEditItem);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [roles, setRoles] = React.useState<IRole[] | []>([]);

  const getPermission = async () => {
    try {
      dispatch(toggleLoading());
      const { data } = await axios.get(endpoint.PERMISSIONS_GET);
      setPermissions([...data.data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  const getRole = async () => {
    const { data } = await axios.get(endpoint.ROLES_BROWSE);
    setRoles(data.data);
  };

  React.useEffect(() => {
    getPermission();
    getRole();
  }, []);

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {},
    },
    {
      name: "displayName",
      label: "Display Name",
      options: {
        filter: false,
      },
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        filter: true,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        setCellHeaderProps: () => ({
          style: { display: "flex", justifyContent: "center" },
        }),
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div style={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ mr: 2 }}
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    const { id } = permissions[rowIndex];
                    dispatch(toggleLoading());
                    axios
                      .delete(endpoint.PERMISSIONS_DELETE(id))
                      .then(() => {
                        toast.success("Succesfully deleted.");
                        getPermission();
                      })
                      .catch((err) => {
                        if (err.response.data.error) {
                          toast.error(err.response.data.error.message);
                        }
                      })
                      .finally(() => {
                        dispatch(toggleLoading());
                      });
                  }
                }}
              >
                Delete
              </Button>

              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => {
                  const { id, name, displayName,roleId } = permissions[rowIndex];
                  setEditItem({ id: id, name: name, displayName: displayName, roleId: roleId });
                  setOpenEditDialog(true);
                }}
              >
                Edit
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const handleItemCreated = (data) => {
    setOpenCreateDialog(false);
    getPermission();
  };

  const handleItemUpdate = () => {
    setOpenEditDialog(false);
    getPermission();
  };

  return (
    <div>
      <Helmet>
        <title>Permissions | Admin Client</title>
      </Helmet>
      <Box>
        <Container maxWidth={false}>
          <PageHeader
            title="Permissions"
            subTitle="All Permissions"
            icon={<SettingsAccessibility />}
          />
          <div style={{ height: 300, width: "100%" }}>
            <Box>
              <Button
                sx={{ ml: "2px" }}
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setOpenCreateDialog(true)}
              >
                New
              </Button>
            </Box>
            <BaseDialog
              title="Create Permisssion"
              open={openCreateDialog}
              setOpen={setOpenCreateDialog}
            >
              <PermissionCreateForm roles={roles}  onItemCreated={handleItemCreated} />
            </BaseDialog>
            <BaseDialog
            title="Edit Role"
            open={openEditDialog}
            setOpen={setOpenEditDialog}
          >
            <PermissionEditFrom roles={roles} item={editItem} onItemUpdated={handleItemUpdate} />
          </BaseDialog>
            <MuiTable
              title={"Permissions"}
              data={permissions}
              columns={columns}
              options={{
                filterType: "dropdown",
                filter: true,
                download: false,
                print: false,
                selectableRows: "none",
              }}
            />
          </div>
        </Container>
      </Box>
    </div>
  );
};

export default Roles;

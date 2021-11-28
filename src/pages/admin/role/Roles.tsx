import {
  Add,
  Delete,
  Edit,
  HdrPlus,
  PlusOneSharp,
  SettingsAccessibility,
} from "@mui/icons-material";
import { Button, Container, IconButton } from "@mui/material";
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
import RoleCreateForm from "./RoleCreateForm";
import RoleEditForm from "./RoleEditForm";
import { axios, endpoint } from "../../../api";
import toast from "react-hot-toast";

interface RloeList {
  id: number;
  name: string;
  displayName: string;
  createdAt: string;
}

interface IEditItem {
  id: number;
  name: string;
  displayName: string;
}

const Roles = () => {
  const dispatch = useDispatch();

  const [roles, setRoles] = React.useState<RloeList[] | []>([]);
  const [editItem, setEditItem] = React.useState<IEditItem>({} as IEditItem);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const getRoles = async () => {
    try {
      dispatch(toggleLoading());
      const { data } = await axios.get(endpoint.ROLES_BROWSE);
      setRoles([...data.data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  React.useEffect(() => {
    getRoles();
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
              <IconButton
                aria-label="edit"
                onClick={() => {
                  const { id, name, displayName } = roles[rowIndex];
                  setEditItem({ id: id, name: name, displayName: displayName });
                  setOpenEditDialog(true);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    const { id } = roles[rowIndex];
                    dispatch(toggleLoading());
                    axios
                      .delete(endpoint.ROLES_DELETE(id))
                      .then(() => {
                        toast.success("Succesfully deleted.");
                        getRoles();
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
                <Delete fontSize="small" />
              </IconButton>
            </div>
          );
        },
      },
    },
  ];

  const handleItemCreated = (data) => {
    setOpenCreateDialog(false);
    getRoles();
  };

  const handleItemUpdate = () => {
    setOpenEditDialog(false);
    getRoles();
  };

  return (
    <div>
      <Helmet>
        <title>Roles | Admin Client</title>
      </Helmet>
      <Box>
        <Container maxWidth={false}>
          <PageHeader
            title="Roles"
            subTitle="All Roles"
            icon={<SettingsAccessibility />}
          />
          <div style={{ height: 300, width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="primary"
                variant="text"
                startIcon={<Add />}
                onClick={() => setOpenCreateDialog(true)}
              >
                New
              </Button>
            </Box>
            <MuiTable
              data={roles}
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
          <BaseDialog
            title="Create Role"
            open={openCreateDialog}
            setOpen={setOpenCreateDialog}
          >
            <RoleCreateForm onItemCreated={handleItemCreated} />
          </BaseDialog>
          <BaseDialog
            title="Edit Role"
            open={openEditDialog}
            setOpen={setOpenEditDialog}
          >
            <RoleEditForm item={editItem} onItemUpdated={handleItemUpdate} />
          </BaseDialog>
        </Container>
      </Box>
    </div>
  );
};

export default Roles;

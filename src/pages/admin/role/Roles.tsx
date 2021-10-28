import { Add, HdrPlus, PlusOneSharp, SettingsAccessibility } from '@mui/icons-material';
import { Button, Container } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { axios, endpoint } from '../../../api';
import { PageHeader, ReactTable } from '../../../components';
import { toggleLoading } from '../../../redux/loaderSlice';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Edit';

interface RloeList {
  id: number;
  name: string,
  createdAt: string
};
const Roles = () => {
  const dispatch = useDispatch();

  const [roles, setRoles] = React.useState<RloeList[] | []>([]);

  const getRoles = async () => {
    try {
      dispatch(toggleLoading());
      const { data } = await axios.get(endpoint.ROLES_BROWSE);
      setRoles([...data.data]);
      console.log(data)
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };


  React.useEffect(() => {
    getRoles();
  }, [])

  const columns = [
    {
      Header: 'Id',
      accessor: "id"
    },
    {
      Header: 'Name',
      accessor: "name"
    },
    {
      Header: 'Display Name',
      accessor: "displayName"
    },
    {
      Header: 'Created At',
      accessor: "createdAt"
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        const onItemClick = val => {

          console.log("value", roles[val])
        }
        return (
          <>
            <Button size="small" variant="outlined" onClick={() => onItemClick(index)} startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Button size="small" sx={{ ml: '2px' }} variant="outlined" startIcon={<SendIcon />}>
              Edit
            </Button>
          </>
        )
      },
    }
  ];




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
          <div style={{ height: 300, width: '100%' }}>
            <Box>
              <Button  sx={{ ml: '2px' }} variant="outlined" startIcon={<Add />}>
                New
              </Button>
            </Box>
            <ReactTable data={roles} columns={columns} />
          </div>
        </Container>
      </Box>

    </div>
  )
}

export default Roles

import { SettingsAccessibility } from '@mui/icons-material';
import { Container } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { axios, endpoint } from '../../../api';
import { PageHeader } from '../../../components';
import { toggleLoading } from '../../../redux/loaderSlice';

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
      console.log(data)
    } catch (error) {
      console.log(error);
    } finally{
      dispatch(toggleLoading());
    }
  };

  React.useEffect(() => {
    getRoles();
  }, [])
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

        </Container>
      </Box>

    </div>
  )
}

export default Roles

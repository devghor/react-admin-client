import { GarageRounded, Settings, SettingsAccessibility, SettingsApplications } from '@mui/icons-material';
import { Container, Paper } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from '../../../components';

const Roles = () => {
    return (
        <div>
            <Helmet>
                <title>Permissioins | Admin Client</title>
            </Helmet>
            <Box>
                <Container maxWidth={false}>
                    <PageHeader
                        title="Permissions"
                        subTitle="All permissions"
                        icon={<SettingsApplications />}
                    />
                    <Paper>
                        Permissions
                    </Paper>
                </Container>
            </Box>

        </div>
    )
}

export default Roles

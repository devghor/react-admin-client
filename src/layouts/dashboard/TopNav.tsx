import { useState } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {Input,Notifications,Menu} from "@mui/icons-material";
import { useHistory } from "react-router";
import { pathValue } from "../../values";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const history = useHistory();
  const [notifications] = useState([]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Box
          onClick={() => history.push(pathValue.DASHBOARD)}
          sx={{ fontWeight: 'bold',cursor:'pointer' }}
        >
          Portal
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <Notifications/>
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Input />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;

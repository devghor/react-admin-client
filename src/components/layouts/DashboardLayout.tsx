import React, { ReactNode } from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  Drawer,
} from "@mui/material";

import { useHistory } from "react-router-dom";

import { pathValue } from "../../values";

import { IconButton } from "@mui/material";
import {
  AccountCircle,
  Dashboard as DashboardIcon,
  Notifications,
} from "@mui/icons-material";
import { People as PeopleIcon } from "@mui/icons-material";
import { List as ListIcon } from "@mui/icons-material/";
import { LockOpen as LockOpenIcon } from "@mui/icons-material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Mail as MailIcon } from "@mui/icons-material";

const drawerWidth = 240;

interface Props {
  children?: ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const theme = useTheme();
  const history = useHistory();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <img src="/assets/images/logo.png" alt="logo" />
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push(pathValue.DASHBOARD)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard "} />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={() => history.push(pathValue.USERS)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={"Users"} />
        </ListItem>
        <ListItem button onClick={() => history.push(pathValue.ROLES)}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={"Roles"} />
        </ListItem>
        <ListItem button onClick={() => history.push(pathValue.PERMISSIONS)}>
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary={"Permissions"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="static"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <div />

          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main>
        <div />
        {props.children}
      </main>
    </div>
  );
}

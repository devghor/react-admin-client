import { BarChart, Settings, People, SettingsAccessibility, SettingsInputComposite, SettingsApplications } from "@mui/icons-material";
import { pathValue } from "../values";

const primaryMenu = [
  {
    href: pathValue.DASHBOARD,
    icon: BarChart,
    label: "Dashboard",
    key: "nav_item_home",
  },
  {
    href: pathValue.USERS,
    icon: People,
    label: "Users",
    key: "nav_item_users",
  },
  {
    href: pathValue.ROLES,
    icon: SettingsAccessibility,
    label: "Roles",
    key: "nav_item_roles",
  },
  {
    href: pathValue.PERMISSIONS,
    icon: SettingsApplications,
    label: "Permissions",
    key: "nav_item_permissions",
  },
];

export default {
  primaryMenu
};

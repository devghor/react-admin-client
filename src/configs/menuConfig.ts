import { BarChart, Settings, People } from "@mui/icons-material";
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
];

export default {
  primaryMenu
};

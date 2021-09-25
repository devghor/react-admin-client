import { BarChart, Settings,People } from "@mui/icons-material";
import { pathValue } from "../values";

export default {
  main: [
    {
      href: pathValue.DASHBOARD,
      icon: BarChart,
      title: "Dashboard",
      key: "nav_item_home",
    },
    {
      href: pathValue.USERS,
      icon: People,
      title: "Users",
      key: "nav_item_users",
    },
  ],
};

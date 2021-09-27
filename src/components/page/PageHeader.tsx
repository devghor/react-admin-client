import { Card, CardContent, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface IProps {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
}

const PageHeader = (props: IProps) => {
  const { title, subTitle, icon } = props;
  return (
    <div>
      <Paper sx={{ display: "flex", alignItems: "center", p:1,mb:5 }}>
        <Paper sx={{p: 1}}>{icon}</Paper>
        <Box sx={{ml:2}}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {subTitle}
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default PageHeader;

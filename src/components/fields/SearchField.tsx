import { Search } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';


export default function CustomizedInputBase() {

  return (
    <Paper elevation={1} >
      <InputBase
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
}

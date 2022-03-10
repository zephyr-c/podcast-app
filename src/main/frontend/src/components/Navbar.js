import React from 'react';
import { Box } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { LibraryMusicOutlined } from '@mui/icons-material';
import { actionSortBy } from '../utils/actions';

export default function Navbar({dispatch}) {

    const handleClick =(e) => {
        dispatch(actionSortBy(e.target.value))
    }
    return (
    <Box>
      <AppBar style={{position: "relative"}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-around"}}>
          <LibraryMusicOutlined/>
          <Typography variant="h5" component="div">Podcast App</Typography>
          <Typography variant="subtitle1" component="div">Sort By: </Typography>
          <Button variant="text" onClick={handleClick} value="name" sx={{color: "white"}} >Name</Button>
          <Button variant="text" onClick={handleClick} value="title" sx={{color: "white"}}>Title</Button>
          <Button variant="text" onClick={handleClick} value="numLikes" sx={{color: "white"}}>Likes</Button>
          <Button variant="text" onClick={handleClick} value="numDislikes" sx={{color: "white"}}>Dislikes</Button>
        </Toolbar>
      </AppBar>
      </Box>
    )
}
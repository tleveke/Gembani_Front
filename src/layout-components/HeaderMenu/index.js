import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Box,
  Typography,
  Popover,
  Menu,
  Button,
  List,
  ListItem,
  Divider
} from '@material-ui/core';

import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import CollectionsTwoToneIcon from '@material-ui/icons/CollectionsTwoTone';
import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'mega-menu-popover' : undefined;

  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  return (
    <>
      <div className="app-header-menu">



      </div>
    </>
  );
};

export default HeaderMenu;

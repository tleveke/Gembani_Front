import React, { useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  List,
  ListItem,
  Tooltip,
  TextField, Container
} from '@material-ui/core';


import {
  LeftSidebar
} from '../../layout-blueprints';
import { Switch, useLocation } from 'react-router-dom';

import UserList from '../../components/UserList'

import UserCreate from '../../components/User'

const  UserListPage = () => {
  return (
    <>
      <LeftSidebar>
        <UserCreate/>
      </LeftSidebar>
    </>
  );
}

export default UserListPage


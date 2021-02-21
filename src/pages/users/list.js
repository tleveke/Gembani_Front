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

const  UserListPage = () => {
  return (
    <>
      <LeftSidebar>
        <UserList/>
      </LeftSidebar>
    </>
  );
}

export default UserListPage


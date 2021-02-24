import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputAdornment,
  FormControlLabel,
  Avatar,
  Dialog,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Button,
  List,
  ListItem,
  TextField,
  ListItemText,
  Divider,
  Grid,
  Tooltip,
  LinearProgress,
  Menu
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import User from '../User/Form';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

import AddIcon from '@material-ui/icons/Add';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

import DialogContentText from '@material-ui/core/DialogContentText';
import hero3 from '../../assets/images/hero-bg/hero-3.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import ViewCompactTwoToneIcon from '@material-ui/icons/ViewCompactTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import CountUp from 'react-countup';
import avatar3 from '../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';

const emails = ['example1@example.com', 'example2@example.com'];

export default function SimpleDialog(props) {
  const { open, newUserEmail, onClose } = props;

  return (
    <Dialog
      scroll="body"
      maxWidth="lg"
      open={open}
      classes={{ paper: 'modal-content border-0 rounded bg-white' }}>
      {newUserEmail && (
        <User
          user={{ userType: 'client', email: newUserEmail }}
          onClose={onClose}
          onCancel={onClose}
        />
      )}
    </Dialog>
  );
}

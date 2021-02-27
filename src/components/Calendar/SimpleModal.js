import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';

import { useMutation } from 'jsonapi-react';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  buttonAdd: {
    color: 'blueviolet'
  }
});

const SimpleModal = (props) => {
  const [addSecondaryEmail, { isLoading, data, error, errors }] = useMutation([
    'secondaryEmails'
  ]);

  const classes = useStyles();
  const { onClose, open, clients, clientEmail } = props;

  const handleClose = () => {
    onClose();
  };

  const addInfoEvent = async (client) => {
    let res = await addSecondaryEmail({
      email: clientEmail,
      userId: client.id
    });
    onClose();
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">Clients Accounts</DialogTitle>
      <List>
        {clients.data?.map((client) => (
          <ListItem key={client.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.email} />
            <Button
              onClick={() => {
                addInfoEvent(client);
              }}
              className="btn btn-primary mx-4">
              <strong className={classes.buttonAdd}>+</strong>
            </Button>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default SimpleModal;

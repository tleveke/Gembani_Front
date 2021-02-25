import React, { useState } from 'react';

import { LeftSidebar } from '../../layout-blueprints';
import { useQuery } from 'jsonapi-react';
import {
  Grid,
  FormControlLabel,
  Checkbox,
  Card,
  MenuItem,
  TextField,
  Divider,
  Button
} from '@material-ui/core';

const emailTypes = [
  {
    value: 'employee',
    label: 'Employee'
  },
  {
    value: 'client',
    label: 'Client  '
  }
];

const EmailForm = (props) => {
  const onComplete = () => {};

  const {
    email: { type, content },
    handleChange
  } = props;

  return (
    <form>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <Card className="p-4 mb-4">
            <div className="font-size-lg font-weight-bold">Edit Email</div>
            <Divider className="my-4" />
            <TextField
              fullWidth
              className="m-2 userType"
              select
              label="Email Type"
              name="emailType"
              value={type}
              onChange={handleChange}>
              {emailTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              className="m-2 emailContent"
              fullWidth
              multiline
              rows="10"
              label="Email Content"
              name="emailContent"
              value={content}
              onChange={handleChange}
            />
          </Card>
          <Card className={'p-4 mb-4'}>
            <Button
              type="submit"
              className=" btn-primary font-weight-bold w-50 my-2 saveButton">
              Save
            </Button>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmailForm;

import React, { useState } from 'react';

import {
  FormControlLabel,
  Checkbox,
  Card,
  Divider,
  TextField,
  Grid
} from '@material-ui/core';
import CompanyTextField from './CompanyTextField';
import { FormGroup } from '@material-ui/core';

export default function LivePreviewExample(props) {
  const {
    values: { employeeDashboard, admin, hourlyRate },

    handleChange,
    touched,
    errors
  } = props;

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Employee Section</div>
      <Divider className="my-4" />

      <FormGroup>
        <FormControlLabel
          name="employeeDashboard"
          control={
            <Checkbox
              className="employeeDashboard"
              onChange={handleChange}
              checked={employeeDashboard}
              value={employeeDashboard}
            />
          }
          label="Employee Dashboard"
        />
        <FormControlLabel
          name="admin"
          control={
            <Checkbox
              className="admin"
              checked={admin}
              onChange={handleChange}
              value={admin}
            />
          }
          label="Admin"
        />
        <TextField
          fullWidth
          helperText={touched.hourlyRate ? errors.hourlyRate : ''}
          error={Boolean(errors.hourlyRate)}
          onChange={handleChange}
          className="m-2 hourlyRate"
          value={hourlyRate}
          name="hourlyRate"
          label="Hourly Rate"
          placeholder="50"
          multiline
        />
      </FormGroup>
    </Card>
  );
}

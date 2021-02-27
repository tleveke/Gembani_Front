import React, { useState, useEffect } from 'react';

import { MenuItem, TextField } from '@material-ui/core';

export default function CompanyTextField(props) {
  const { data, meta, error, isLoading, isFetching } = props.companyQuery;

  const { errors, touched, company, handleChange } = props;

  return (
    <TextField
      fullWidth
      className="m-2 company"
      select
      name={'company'}
      onChange={handleChange}
      label="Select Company"
      value={company}
      helperText={touched.company ? errors.company : ''}
      error={Boolean(errors.company)}>
      {data.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

import React, { useState, useEffect } from 'react';

import { MenuItem, TextField } from '@material-ui/core';
import { useQuery } from 'jsonapi-react';

export default function CompanyTextField(props) {
  const { data, error, isLoading, meta, isFetching, client } = useQuery('companies');
  const bearer = localStorage.getItem('BearerToken')
  client.addHeader('Authorization', `Bearer ${bearer}`)
  console.log('yo', data)
  //const { data, meta, error, isLoading, isFetching } = props.companyQuery;

  const { errors, touched, companyId, handleChange } = props;

  return (
    <>
      {isLoading ? 'Loading...' : <TextField
        fullWidth
        className="m-2 company"
        select
        name={'companyId'}
        onChange={handleChange}
        label="Select Company"
        value={companyId}
        helperText={touched.company ? errors.company : ''}
        error={Boolean(errors.company)}>
        {data.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>}
    </>
  );
}

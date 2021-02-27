import React, { useState } from 'react';

import {
  FormControlLabel,
  Checkbox,
  Card,
  Divider,
  IconButton,
  Grid,
  TextField,
  Box
} from '@material-ui/core';
import CompanyTextField from './CompanyTextField';
import { FormGroup } from '@material-ui/core';
import { Field, FieldArray } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
export default function SecondaryEmails(props) {
  const {
    values: { secondaryEmails },
    handleChange,
    errors,
    touched
  } = props;
  const getErrorText = (i) => {
    let error = getError(i);
    if (error) {
      return error;
    } else {
      return '';
    }
  };

  const getError = (i) => {
    if (errors.secondaryEmails && errors.secondaryEmails[i]) {
      return errors.secondaryEmails[i];
    } else {
      return undefined;
    }
  };

  const getValue = (i) => {
    if (secondaryEmails[i]) {
      return secondaryEmails[i];
    } else {
      return '';
    }
  };
  return (
    <FieldArray
      name="secondaryEmails"
      render={(arrayHelpers) => (
        <>
          {secondaryEmails?.map((email, i) => (
            <Grid container key={i} spacing={4}>
              <Grid item xs={10}>
                <TextField
                  key={i}
                  fullWidth
                  onChange={handleChange}
                  helperText={getErrorText(i)}
                  error={Boolean(getError(i))}
                  type="text"
                  value={getValue(i)}
                  name={`secondaryEmails.${i}`}
                  className={`m-2 email email-${i}`}
                  label={`Email n°${i + 2}`}
                  placeholder="email@example.com"
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  aria-label="Remove"
                  onClick={() => arrayHelpers.remove(i)} // remove a friend from the list
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <IconButton
            className="addEmailBtn"
            disabled={Boolean(errors.secondaryEmails)}
            onClick={() => {
              arrayHelpers.push('');
            }}
            aria-label="Add">
            <AddIcon />
          </IconButton>
        </>
      )}
    />
  );
}

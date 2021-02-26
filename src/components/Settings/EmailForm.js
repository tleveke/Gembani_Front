import React, { useState, useEffect } from 'react';

import { useMutation } from 'jsonapi-react';
import { Formik } from 'formik';
import {
  Grid,
  Card,
  TextField,
  Divider,
  Button,
  MenuItem
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
  const {
    email: { type, content },
    onTypeChange
  } = props;

  const [mutate, { isLoading, data, error, errors }] = useMutation([
    'emails',
    type
  ]);

  const onSubmit = async (formData, { setSubmitting }) => {
    const res = await mutate(formData);
    setSubmitting(false);
    props.onComplete();
  };

  const Form = (props) => {
    const {
      values: { type, content },
      handleChange,
      handleSubmit,
      onTypeChange
    } = props;

    const onEmailTypeChange = (e) => {
      onTypeChange(e);
      handleChange(e);
    };

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Card className="p-4 mb-4">
              <div className="font-size-lg font-weight-bold">Edit Email</div>
              <Divider className="my-4" />
              <TextField
                fullWidth
                className="m-2 emailType"
                select
                label="Email Type"
                name="emailType"
                value={type}
                onChange={onEmailTypeChange}>
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
            <Button
              type="submit"
              className=" btn-primary font-weight-bold w-50 my-2">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Formik
      initialValues={{
        type,
        content
      }}
      onSubmit={onSubmit}
      render={(props) => <Form {...props} onTypeChange={onTypeChange} />}
    />
  );
};

export default EmailForm;

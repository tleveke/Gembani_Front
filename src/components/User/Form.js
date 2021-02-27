import React, { useCallback, useEffect, useState } from 'react';

import {
  Grid,
  FormControlLabel,
  Checkbox,
  Card,
  MenuItem,
  TextField,
  Divider,
  Button,
  IconButton
} from '@material-ui/core';
import FormSpliter from './FormSpliter';
import AddIcon from '@material-ui/icons/Add';

import { FormGroup } from '@material-ui/core';
import { useMutation, useQuery } from 'jsonapi-react';
import ClientForm from './ClientForm';
import { Formik, Form, FieldArray, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import validationSchema from './validationSchema';
import SecondaryEmails from './SecondaryEmails';
const userTypes = [
  {
    value: 'employee',
    label: 'Employee'
  },
  {
    value: 'client',
    label: 'Client  '
  }
];

export default function UserForm(props) {
  const { user, onCancel, companyQuery } = props;
  const defaultValues = () => {
    const { user } = props;
    if (user) {
      return user;
    } else {
      return {
        firstName: '',
        lastName: '',
        email: '',
        secondaryEmails: [],
        userType: '',
        company: '',
        admin: false,
        clientDashboard: false,
        employeeDashboard: false,
        hourlyRate: ''
      };
    }
  };

  const mutateParams = () => {
    const { user } = props;
    if (user) {
      return ['users', user.id];
    } else {
      return 'users';
    }
  };

  const pageTitle = () => {
    const { user } = props;
    if (user && user.id) {
      return 'Edit User';
    } else {
      return 'Create User';
    }
  };
  const [mutate, { isLoading, data, error, errors }] = useMutation(
    mutateParams()
  );
  const history = useHistory();
  const onSubmit = async (formData, { setSubmitting }) => {
    const res = await mutate({
      ...formData
    });
    const { onComplete, user } = props;
    setSubmitting(false);
    onComplete(res);
  };

  const NewForm = (props) => {
    const {
      values: { firstName, lastName, email, userType, company },

      errors,
      touched,
      isValid,
      companyQuery,
      handleChange
    } = props;

    return (
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Card className="p-4 mb-4">
              <div className="font-size-lg font-weight-bold">{pageTitle()}</div>
              <Divider className="my-4" />
              <div>
                <TextField
                  fullWidth
                  className="m-2 firstName"
                  name="firstName"
                  label="First Name"
                  multiline
                  onChange={handleChange}
                  value={firstName}
                  rowsMax="4"
                />
                <TextField
                  fullWidth
                  name="lastName"
                  className="m-2 lastName"
                  value={lastName}
                  onChange={handleChange}
                  label="Last Name"
                  placeholder="Last name"
                  multiline
                />
                <TextField
                  fullWidth
                  name="email"
                  className="m-2 email"
                  value={email}
                  helperText={touched.email ? errors.email : ''}
                  error={Boolean(errors.email)}
                  onChange={handleChange}
                  label="Email"
                  placeholder="email"
                  multiline
                />
                <SecondaryEmails {...props} />

                <TextField
                  fullWidth
                  className="m-2 userType"
                  select
                  label="User Type"
                  name="userType"
                  helperText={touched.userType ? errors.userType : ''}
                  error={Boolean(errors.userType)}
                  value={userType}
                  onChange={handleChange}>
                  {userTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Card>

            <FormSpliter
              userType={userType}
              errors={errors}
              company={company}
              handleChange={handleChange}
              companyQuery={companyQuery}
              touched={touched}
              values={props.values}
            />
            <Card className={'p-4 mb-4'}>
              <Button
                type="submit"
                disabled={!isValid}
                className=" btn-primary font-weight-bold w-50 my-2 submit">
                Save
              </Button>
              {onCancel && (
                <Button
                  onClick={onCancel}
                  className=" btn-danger font-weight-bold w-50 my-2">
                  Cancel
                </Button>
              )}
            </Card>
          </Grid>
        </Grid>
      </Form>
    );
  };
  return (
    <Formik
      initialValues={defaultValues()}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(newProps) => <NewForm companyQuery={companyQuery} {...newProps} />}
    </Formik>
  );
}

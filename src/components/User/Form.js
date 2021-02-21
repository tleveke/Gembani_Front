import React, { useState } from 'react';

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

import { FormGroup } from '@material-ui/core';
import { useMutation, useQuery } from 'jsonapi-react';
import ClientForm from './ClientForm';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import validationSchema from './validationSchema';

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

export default function LivePreviewExample(props) {
  const { user } = props;
  const [state, setState] = useState({
    employeeSection: user && user.userType == 'employee',
    clientSection: user && user.userType == 'client'
  });

  const { clientSection, employeeSection } = state;

  const defaultValues = () => {
    const { user } = props;
    if (user) {
      return user;
    } else {
      return {
        firstName: '',
        lastName: '',
        email: '',
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
  const [mutate, { isLoading, data, error, errors }] = useMutation(
    mutateParams()
  );
  const history = useHistory();
  const onSubmit = async (formData, { setSubmitting }) => {
    const res = await mutate(formData);
    const { onComplete, user } = props;
    setSubmitting(false);
    onComplete(res);
  };

  const Form = (props) => {
    const {
      values: {
        firstName,
        lastName,
        email,
        userType,
        employeeDashboard,
        clientDashboard,
        hourlyRate,
        admin,
        company
      },

      errors,
      touched,
      isValid,

      handleChange,
      handleSubmit
    } = props;
    debugger;
    const changeUserType = (event) => {
      let value = event.target.value;
      handleChange(event);
      if (value == 'employee') {
        setState({
          employeeSection: true,
          clientSection: false
        });
      } else if (value == 'client') {
        setState({
          employeeSection: false,
          clientSection: true
        });
      } else {
        setState({
          employeeSection: false,
          clientSection: false
        });
      }
    };
    const companyQuery = useQuery('companies');
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Card className="p-4 mb-4">
              <div className="font-size-lg font-weight-bold">User</div>
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
                  label="email"
                  onChange={handleChange}
                  helperText={touched.email ? errors.email : ''}
                  error={Boolean(errors.email)}
                  placeholder="email@example.com"
                  multiline
                />

                <TextField
                  fullWidth
                  className="m-2 userType"
                  select
                  label="User Type"
                  name="userType"
                  helperText={touched.userType ? errors.userType : ''}
                  error={Boolean(errors.userType)}
                  value={userType}
                  onChange={changeUserType}>
                  {userTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Card>
            {clientSection && (
              <ClientForm
                companyQuery={companyQuery}
                company={company}
                clientDashboard={clientDashboard}
                {...props}
              />
            )}

            {employeeSection && (
              <Card className="p-4 mb-4">
                <div className="font-size-lg font-weight-bold">
                  Employee Section
                </div>
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
            )}
            <Button
              type="submit"
              disabled={!isValid}
              className="submit btn-second font-weight-bold w-50 my-2">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Formik
      initialValues={defaultValues()}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={(props) => <Form {...props} />}
    />
  );
}

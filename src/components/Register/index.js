import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  List,
  ListItem,
  Tooltip,
  TextField,
  Container
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import { useSignIn } from 'react-auth-kit';

import hero8 from '../../assets/images/hero-bg/hero-8.jpg';
import { useMutation } from 'jsonapi-react';
import * as Yup from 'yup';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { Formik } from 'formik';
import OauthPopup from 'react-oauth-popup';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('').required('Enter a strong password'),
  passwordConfirm: Yup.string('').required('confirm your password')
});

const SignInComponent = () => {
  const signIn = useSignIn();
  const [checked1, setChecked1] = useState(true);
  const [registerAccount, { isLoading, data, error, errors }] = useMutation(
    'authentification/register'
  );
  let history = useHistory();

  const verifPassword = async (formData, { setSubmitting }) => {
    console.log(formData)
    if (formData.password != formData.passwordConfirm) {
      const res = await registerAccount(formData);
    } else {
      alert("the passwords doesn't match")
    }
  }; 
  const signInFromRes = (res) => {
    return signIn({
      expiresIn: res.data['authState'].expiresIn,
      token: res.data['authState'].token,
      authState: res.data['authState']
    });
  };
  const Form = (props) => {
    const {
      values: { email, password, passwordConfirm },
      errors,
      touched,
      handleChange,
      isValid,
      handleSubmit
    } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            variant="outlined"
            className="mb-4 email"
            name="email"
            onChange={handleChange}
            helperText={touched.email ? errors.email : ''}
            error={Boolean(errors.email)}
            label="Email address"
            fullWidth
            value={email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className="mb-3">
          <TextField
            variant="outlined"
            className="mb-4"
            name="password"
            className="password"
            helperText={touched.password ? errors.password : ''}
            error={Boolean(errors.password)}
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
          />
          <PasswordStrengthMeter  password={password}></PasswordStrengthMeter>
        </div>
        <div className="mb-3">
          <TextField
            variant="outlined"
            className="mb-4"
            name="passwordConfirm"
            className="passwordConfirm"
            helperText={touched.passwordConfirm ? errors.passwordConfirm : ''}
            error={Boolean(errors.passwordConfirm)}
            label="Confirm Password"
            fullWidth
            type="password"
            value={passwordConfirm || ''}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center font-size-md">
          <FormControlLabel
            control={
              <Checkbox checked={checked1} value="checked1" color="primary" />
            }
            label="Remember me"
          />
        </div>
        <div className="text-center py-4">
          <Button
            disabled={!isValid}
            type="submit"
            className="submit btn-second font-weight-bold w-50 my-2">
            Sign in
          </Button>
        </div>
      </form>
    );
  };

  const values = { email: '', password: '' };

  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <Grid container spacing={0} className="min-vh-100">
                    <Grid
                      item
                      lg={7}
                      xl={6}
                      className="d-flex align-items-center">
                      <Grid item md={10} lg={8} xl={7} className="mx-auto">
                        <div className="py-4">
                          <div className="text-center">
                            <h1 className="display-4 mb-1 font-weight-bold">
                              Register
                            </h1>
                            <p className="font-size-lg mb-0 text-black-50">
                              Fill in the fields below to register a new account
                            </p>
                          </div>
                          <Formik
                            render={(props) => <Form {...props} />}
                            validationSchema={validationSchema}
                            initialValues={values}
                            onSubmit={verifPassword}
                          />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item lg={5} xl={6} className="d-flex">
                      <div className="hero-wrapper w-100 bg-composed-wrapper bg-premium-dark min-vh-lg-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                          <div
                            className="bg-composed-wrapper--image opacity-5"
                            style={{ backgroundImage: 'url(' + hero8 + ')' }}
                          />
                          <div className="bg-composed-wrapper--bg bg-second opacity-6" />
                          <div className="bg-composed-wrapper--bg bg-deep-blue opacity-2" />
                          <div className="bg-composed-wrapper--content text-center p-5">
                            <div className="text-white px-0 px-lg-2 px-xl-4">
                              <h1 className="display-3 mb-4 font-weight-bold">
                                Bamburgh React Admin Dashboard with Material-UI
                                PRO
                              </h1>
                              <p className="font-size-lg mb-0 opacity-8"></p>
                              <div className="divider mx-auto border-1 my-5 border-light opacity-2 rounded w-25" />
                              <div>
                                <Button className="btn-success px-5 font-size-sm font-weight-bold btn-animated-icon text-uppercase rounded shadow-none py-3 hover-scale-sm hover-scale-lg">
                                  <span className="btn-wrapper--label"></span>
                                  <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon
                                      icon={['fas', 'arrow-right']}
                                    />
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hero-footer pb-4">
                          <List
                            component="div"
                            className="nav-pills nav-neutral-secondary d-flex">
                            <Tooltip title="Facebook" arrow>
                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50">
                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                              </ListItem>
                            </Tooltip>

                            <Tooltip title="Twitter" arrow>
                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50">
                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                              </ListItem>
                            </Tooltip>

                            <Tooltip title="Google" arrow>
                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50">
                                <FontAwesomeIcon icon={['fab', 'google']} />
                              </ListItem>
                            </Tooltip>

                            <Tooltip title="Instagram" arrow>
                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50">
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                              </ListItem>
                            </Tooltip>
                          </List>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInComponent;

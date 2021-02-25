import React, { useCallback, useEffect, useState } from 'react';
import { Table, Card, Button, Checkbox, Input, Grid } from '@material-ui/core';
import LeftSidebar from '../../layout-blueprints/LeftSidebar';
import PageTitle from '../../layout-components/PageTitle';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ExampleWrapperSeamless } from '../../layout-components';
import { useMutation, useQuery } from 'jsonapi-react';
import { company } from 'faker';
import { FieldArray, Form, Formik, Field } from 'formik';
import { Check } from '@material-ui/icons';

export default function LivePreviewExample(props) {
  const [mutate, { isLoading: isLoadingMutate }] = useMutation(
    'bookingsCollections'
  );
  const { companies, error } = props;

  const defaultValues = () => {
    return { bookings: mergeBookings() };
  };

  const mergeBookings = () => {
    return companies.reduce((memo, hash) => {
      memo = memo.concat(hash.bookings);
      return memo;
    }, []);
  };

  const bookingKey = (company, booking) => {
    let companyIndex = companies.indexOf(company);
    let startIndex = 0;
    for (let i = 0; i < companyIndex; i++) {
      let currentCompany = companies[i];
      startIndex = startIndex + company.bookings.length;
    }
    return startIndex + companies[companyIndex].bookings.indexOf(booking);
  };
  const onSubmit = async (data) => {
    let res = await mutate(data);
    debugger;
  };
  const test = async (props) => {
    let a = defaultValues();
  };
  let bookingKeyValue = 0;
  let currentCompanyBookingKey = -1;

  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <Card className="rounded w-100 shadow-xxl bg-white my-5 p-5">
              <div className="d-flex align-items-center justify-content-center flex-wrap">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="m-4">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Start Date"
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </div>
                </MuiPickersUtilsProvider>
              </div>
            </Card>
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <Card className="rounded w-100 shadow-xxl bg-white my-5 p-5">
              <div className="d-flex align-items-center justify-content-center flex-wrap">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="m-4">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="End Date"
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </div>
                </MuiPickersUtilsProvider>
              </div>
            </Card>
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>

      <Formik
        initialValues={defaultValues()}
        onSubmit={onSubmit}
        render={(values) => {
          return (
            <Form>
              <FieldArray
                name={'bookings'}
                render={({ insert, remove, push }) => {
                  return (
                    <>
                      {companies?.map((company, i) => (
                        <Card
                          key={`company-${company.id}`}
                          className="p-4 shadow-xxl  mb-spacing-6-x2">
                          <div className="card-header pr-2">
                            <div className="card-header--title">
                              <b>{company.name}</b>
                            </div>
                          </div>
                          <div className="table-responsive-md">
                            <Table className="table table-alternate-spaced">
                              <thead>
                                <tr>
                                  <th scope="col">Bill?</th>
                                  <th style={{ width: '400px' }} scope="col">
                                    Event
                                  </th>
                                  <th scope="col">Employee</th>
                                  <th scope="col">Number of hours</th>
                                  <th scope="col">Total Price</th>
                                  <th scope="col">Price Overwrite</th>
                                </tr>
                              </thead>
                              <tbody>
                                {company?.bookings?.map((booking, y) => (
                                  <tr key={bookingKey(company, booking)}>
                                    <td className="text-center text-black-50">
                                      <span>
                                        <Field
                                          type={'checkbox'}
                                          name={`bookings.${bookingKey(
                                            company,
                                            booking
                                          )}.isChecked`}
                                        />
                                      </span>
                                    </td>
                                    <td>
                                      <b>{booking.title}</b>
                                      <span className="d-block text-black-50 font-size-sm">
                                        {new Date(
                                          booking.minDate
                                        ).toLocaleDateString()}{' '}
                                        -{' '}
                                        {new Date(
                                          booking.maxDate
                                        ).toLocaleDateString()}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {booking?.employee?.firstName}{' '}
                                        {booking?.employee?.lastName}
                                      </span>
                                    </td>
                                    <td className="font-size-lg font-weight-bold">
                                      <span>{booking.hours}</span>
                                    </td>
                                    <td className="text-warning">
                                      <span>{booking.price}</span>
                                    </td>
                                    <td className="">
                                      <Field
                                        type="number"
                                        name={`bookings.${bookingKey(
                                          company,
                                          booking
                                        )}.priceOverwrite`}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </Card>
                      ))}
                    </>
                  );
                }}
              />

              <Button
                type="submit"
                className=" btn-primary font-weight-bold w-50 my-2">
                Save
              </Button>
            </Form>
          );
        }}
      />
    </>
  );
}

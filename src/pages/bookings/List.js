import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, Button, Checkbox, Input, Grid } from '@material-ui/core';
import LeftSidebar from '../../layout-blueprints/LeftSidebar';
import PageTitle from '../../layout-components/PageTitle';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormsDatepicker1 from '../../example-components/FormsDatepicker/FormsDatepicker1';
import FormsDatepicker2 from '../../example-components/FormsDatepicker/FormsDatepicker2';
import { ExampleWrapperSeamless } from '../../layout-components';

export default function LivePreviewExample() {
  return (
    <>
      <LeftSidebar>
        <PageTitle
          titleHeading="Bookings"
          titleDescription="Take advantage of these extensive, easy to customize large charts component blocks."
        />
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
        <Card className="p-4 shadow-xxl mb-spacing-6-x2">
          <div className="card-header pr-2">
            <div className="card-header--title">
              <b>Client 1</b>
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
                <tr>
                  <td className="text-center text-black-50">
                    <span>
                      <Checkbox checked={true} />
                    </span>
                  </td>
                  <td>
                    <b>Event Tile</b>
                    <span className="d-block text-black-50 font-size-sm">
                      July 23rd 10.30 - July 23rd 11.30
                    </span>
                  </td>
                  <td>
                    <span>Nick Stock</span>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <span>1.5</span>
                  </td>
                  <td className="text-warning">
                    <span>300</span>
                  </td>
                  <td className="">
                    <Input />
                  </td>
                </tr>
                <tr>
                  <td className="text-center text-black-50">
                    <span>
                      <Checkbox checked={true} />
                    </span>
                  </td>
                  <td>
                    <b>Event Tile 3</b>
                    <span className="d-block text-black-50 font-size-sm">
                      July 25rd 10.30 - July 25rd 12.30
                    </span>
                  </td>
                  <td>
                    <span>Seb Cebulaa</span>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <span>2</span>
                  </td>
                  <td className="text-warning">
                    <span>150</span>
                  </td>
                  <td className="">
                    <Input />
                  </td>
                </tr>
                <tr>
                  <td className="text-center text-black-50">
                    <span>
                      <Checkbox checked={true} />
                    </span>
                  </td>
                  <td>
                    <b>Event Tile</b>
                    <span className="d-block text-black-50 font-size-sm">
                      July 23rd 10.30 - July 23rd 11.30
                    </span>
                  </td>
                  <td>
                    <span>Nick Stock</span>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <span>1.5</span>
                  </td>
                  <td className="text-warning">
                    <span>300</span>
                  </td>
                  <td className="">
                    <Input />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card>

        <Card className="p-4 shadow-xxl mb-spacing-6-x2">
          <div className="card-header pr-2">
            <div className="card-header--title">
              <b>Client 2</b>
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
                <tr>
                  <td className="text-center text-black-50">
                    <span>
                      <Checkbox checked={true} />
                    </span>
                  </td>
                  <td>
                    <b>Event Tile</b>
                    <span className="d-block text-black-50 font-size-sm">
                      July 23rd 10.30 - July 23rd 11.30
                    </span>
                  </td>
                  <td>
                    <span>Nick Stock</span>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <span>1.5</span>
                  </td>
                  <td className="text-warning">
                    <span>300</span>
                  </td>
                  <td className="">
                    <Input />
                  </td>
                </tr>
                <tr>
                  <td className="text-center text-black-50">
                    <span>
                      <Checkbox checked={true} />
                    </span>
                  </td>
                  <td>
                    <b>Event Tile 3</b>
                    <span className="d-block text-black-50 font-size-sm">
                      July 25rd 10.30 - July 25rd 12.30
                    </span>
                  </td>
                  <td>
                    <span>Seb Cebulaa</span>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <span>2</span>
                  </td>
                  <td className="text-warning">
                    <span>150</span>
                  </td>
                  <td className="">
                    <Input />
                  </td>
                </tr>
                <tr>
                  <td className="text-center text-black-50">
                    <span>
                      <Checkbox checked={true} />
                    </span>
                  </td>
                  <td>
                    <b>Event Tile</b>
                    <span className="d-block text-black-50 font-size-sm">
                      July 23rd 10.30 - July 23rd 11.30
                    </span>
                  </td>
                  <td>
                    <span>Nick Stock</span>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <span>1.5</span>
                  </td>
                  <td className="text-warning">
                    <span>300</span>
                  </td>
                  <td className="">
                    <Input />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card>
        <Button
          type="submit"
          className=" btn-primary font-weight-bold w-50 my-2">
          Save
        </Button>
      </LeftSidebar>
    </>
  );
}

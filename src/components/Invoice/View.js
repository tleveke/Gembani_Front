import React from 'react';

import { PageTitle } from '../../layout-components';

import { Button, Card, CardContent, Grid, Table } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LeftSidebar } from '../../layout-blueprints';
import { useQuery } from 'jsonapi-react';
import { useParams } from 'react-router-dom';
import { amount } from '../../utils/amount';

export default function PageInvoice(props) {
  let { id } = useParams();

  const { invoice } = props;

  return (
    <Card className="card-box">
      <CardContent className="p-4">
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <div className="text-center text-lg-left mb-3 mb-lg-0">
            <h1 className="display-4 font-weight-bold">
              Invoice {invoice?.numberID}
            </h1>
            <p className="mb-0 text-black-50">Due on {invoice?.dueDate}</p>
          </div>
          <div className="text-center text-lg-left">
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              size="small"
              variant="text"
              className="btn-outline-primary m-1">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'print']} />
              </span>
              <span className="btn-wrapper--label">Print</span>
            </Button>
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              size="small"
              variant="text"
              className="btn-outline-primary my-1 mx-2">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['far', 'envelope']} />
              </span>
              <span className="btn-wrapper--label">Email</span>
            </Button>
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              variant="text"
              className="btn-primary m-1">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'lemon']} />
              </span>
              <span className="btn-wrapper--label">Pay</span>
            </Button>
          </div>
        </div>
        <div className="divider my-3" />
        <div className="d-flex flex-column flex-lg-row justify-content-between mb-5">
          <div>
            <div className="text-uppercase text-primary mb-2 font-size-xs">
              Billed from
            </div>
            <p className="mb-1 font-weight-bold">
              {invoice?.billedFrom.company}
            </p>
            <p className="text-black-50">{invoice?.billedFrom.adress}</p>
            <p>
              <span className="d-block pb-1">
                <b className="pr-2">Tel.:</b>
                {invoice?.billedFrom.tel}
              </span>
              <span className="d-block">
                <b className="pr-2">Email:</b>
                {invoice?.billedFrom.mail}
              </span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-uppercase text-primary mb-2 font-size-xs">
              Invoice no.
            </div>
            <h1 className="display-4 opacity-8 text-black-50">
              {invoice?.numberID}
            </h1>
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row justify-content-between">
          <div>
            <div className="text-uppercase text-primary mb-2 font-size-xs">
              Billed to
            </div>
            <p className="mb-1 font-weight-bold">{invoice?.billedTo.company}</p>
            <p className="text-black-50">{invoice?.billedTo.adress}</p>
            <p>
              <span className="d-block pb-1">
                <b className="pr-2">Tel.:</b>
                {invoice?.billedTo.tel}
              </span>
              <span className="d-block">
                <b className="pr-2">Email:</b>
                {invoice?.billedTo.mail}
              </span>
            </p>
          </div>
          <div>
            <div className="text-uppercase text-primary mb-2 font-size-xs">
              Invoice information
            </div>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between pb-1">
                <span className="text-black-50 pr-4">Invoice Number</span>
                <span className="pl-4">{invoice?.numberID}</span>
              </li>
              <li className="d-flex justify-content-between pb-1">
                <span className="text-black-50 pr-4">Product ID</span>
                <span className="pl-4">{invoice?.productID}</span>
              </li>
              <li className="d-flex justify-content-between pb-1">
                <span className="text-black-50 pr-4">Issue Date</span>
                <span className="pl-4">{invoice?.issueDate}</span>
              </li>
              <li className="d-flex justify-content-between">
                <span className="text-black-50 pr-4">Due Date</span>
                <span className="pl-4">{invoice?.dueDate}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="table-responsive my-4">
          <Table className="table table-striped table-hover text-nowrap font-size-xs">
            <thead>
              <tr>
                <th className="wd-20p">Type</th>
                <th className="wd-40p d-none d-sm-table-cell">Description</th>
                <th className="tx-center">QTY</th>
                <th className="tx-right">Unit Price</th>
                <th className="tx-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.lines?.map((line) => {
                console.log(line);
                return (
                  <tr key={line.id}>
                    <td className="tx-nowrap">{line.type}</td>
                    <td className="d-none d-sm-table-cell text-black-50">
                      {line.description}
                    </td>
                    <td className="tx-center">{line.quantity}</td>
                    <td className="tx-right">${line.unitPrice}</td>
                    <td className="tx-right">
                      ${line.quantity * line.unitPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="divider mb-4" />
        <Grid container spacing={6}>
          <Grid item lg={8}>
            <div className="rounded p-3 bg-secondary mb-4">
              <div className="text-uppercase text-primary mb-2 font-size-xs">
                Notes
              </div>
              <p className="font-size-sm mb-0">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
            </div>
          </Grid>
          <Grid item lg={4}>
            <ul className="list-unstyled mb-3">
              <li className="d-flex justify-content-between pb-1">
                <span className="pr-4">Sub-Total</span>
                <span className="pl-4">
                  {/* ${amountCalculated.result.toFixed(2)} */}
                </span>
              </li>
              <li className="d-flex justify-content-between pb-1">
                <span className="pr-4">Tax {invoice?.tax * 100}%</span>
                <span className="pl-4">
                  {/* ${amountCalculated.tax.toFixed(2)} */}
                </span>
              </li>
              <li className="d-flex justify-content-between font-weight-bold pt-3 pb-2 font-size-lg">
                <span className="pr-4">Total Due</span>
                <span className="pl-4">
                  {/* ${amountCalculated.total.toFixed(2)} */}
                </span>
              </li>
            </ul>
            <Button fullWidth className="btn-primary">
              Pay invoice
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

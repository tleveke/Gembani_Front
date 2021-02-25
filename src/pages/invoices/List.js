import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, Button } from '@material-ui/core';
import { LeftSidebar } from '../../layout-blueprints';
import { PageTitle } from '../../layout-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'jsonapi-react';

export default function LivePreviewExample() {
  const { data } = useQuery('invoices');
  console.log(data);
  return (
    <LeftSidebar>
      <PageTitle
        titleHeading="Invoice List"
        titleDescription="This pages contains an example invoice design."
      />
      <Card className="p-4 shadow-xxl mb-spacing-6-x2">
        <div className="table-responsive-md">
          <Table className="table table-alternate-spaced">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th style={{ width: '400px' }} scope="col">
                  Date
                </th>
                <th scope="col">Client</th>
                <th scope="col">Amount</th>
                <th scope="col">Paid?</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center text-black-50">
                  <span>#545</span>
                </td>
                <td>
                  <b>July 2020</b>
                </td>
                <td>
                  <span>Rupert Bryan</span>
                </td>
                <td className="font-size-lg font-weight-bold">
                  <small>$</small>
                  <span>2,495</span>
                </td>
                <td className="text-warning">
                  <span>YES</span>
                </td>
                <td className="text-right">
                  <Link to={'/invoice/view'}>
                    <Button className="btn-neutral-primary mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="font-size-sm"
                      />
                    </Button>
                  </Link>
                </td>
              </tr>
              <tr className="divider"></tr>
              <tr>
                <td className="text-center text-black-50">
                  <span>#545</span>
                </td>
                <td>
                  <b>July 2020</b>
                </td>
                <td>
                  <span>Rupert Bryan</span>
                </td>
                <td className="font-size-lg font-weight-bold">
                  <small>$</small>
                  <span>2,495</span>
                </td>
                <td className="text-warning">
                  <span>YES</span>
                </td>
                <td className="text-right">
                  <Link to={'/invoice/view'}>
                    <Button className="btn-neutral-primary mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="font-size-sm"
                      />
                    </Button>
                  </Link>
                </td>
              </tr>
              <tr className="divider"></tr>
              <tr>
                <td className="text-center text-black-50">
                  <span>#545</span>
                </td>
                <td>
                  <b>July 2020</b>
                </td>
                <td>
                  <span>Rupert Bryan</span>
                </td>
                <td className="font-size-lg font-weight-bold">
                  <small>$</small>
                  <span>2,495</span>
                </td>
                <td className="text-warning">
                  <span>YES</span>
                </td>
                <td className="text-right">
                  <Link to={'/invoice/view'}>
                    <Button className="btn-neutral-primary mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="font-size-sm"
                      />
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>
    </LeftSidebar>
  );
}

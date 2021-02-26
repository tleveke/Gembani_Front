import React from 'react';

import { PageTitle } from '../../layout-components';

import { Button, Card, CardContent, Grid, Table } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LeftSidebar } from '../../layout-blueprints';
import { useQuery } from 'jsonapi-react';
import { useParams } from 'react-router-dom';
import { amount } from '../../utils/amount';
import InvoiceView from '../../components/Invoice/View';
export default function PageInvoice() {
  let { id } = useParams();
  const { data } = useQuery(['invoices', id, { include: ['lines'] }]);

  return (
    <>
      <LeftSidebar>
        <PageTitle
          titleHeading="Invoice"
          titleDescription="This pages contains an example invoice design."
        />
        <InvoiceView invoice={data} />
      </LeftSidebar>
    </>
  );
}

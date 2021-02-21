import React, { useState } from 'react';

import { FormControlLabel, Checkbox, Card, Divider } from '@material-ui/core';
import CompanyTextField from './company_text_field';
import { FormGroup } from '@material-ui/core';

export default function LivePreviewExample(props) {
  const {
    companyQuery,
    errors,
    touched,
    company,
    handleChange,
    clientDashboard
  } = props;
  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Client Section</div>
      <Divider className="my-4" />
      <FormGroup>
        <FormControlLabel
          name="clientDashboard"
          control={
            <Checkbox
              value={clientDashboard}
              onChange={handleChange}
              className="clientDashboard"
            />
          }
          label="Client Dashboard"
        />
      </FormGroup>
      <CompanyTextField
        companyQuery={companyQuery}
        errors={errors}
        touched={touched}
        company={company}
        handleChange={handleChange}
      />
    </Card>
  );
}

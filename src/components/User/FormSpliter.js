import React, { useState } from 'react';
import ClientForm from './ClientForm';
import EmployeeForm from './EmployeeForm';

import { FormControlLabel, Checkbox, Card, Divider } from '@material-ui/core';
import CompanyTextField from './CompanyTextField';
import { FormGroup } from '@material-ui/core';

export default function FormSpliter(props) {
  const { userType } = props;
  debugger;
  if (userType == 'client') {
    return <ClientForm {...props} />;
  } else if (userType == 'employee') {
    return <EmployeeForm {...props} />;
  } else {
    return null;
  }
}

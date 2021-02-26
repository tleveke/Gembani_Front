import React, { useState } from 'react';

import { LeftSidebar } from '../../layout-blueprints';
import EmailForm from '../../components/Settings/EmailForm';
import { useQuery, useMutation } from 'jsonapi-react';
import { List, ListItem, Card } from '@material-ui/core';

const SettingsPage = () => {
  const [emailType, setEmailType] = useState('client');

  const { data, isLoading } = useQuery(['emails', emailType]);

  const onTypeChange = (event) => {
    let { value } = event.target;
    setEmailType(value);
  };

  return (
    <>
      <LeftSidebar>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <EmailForm email={data} onTypeChange={onTypeChange} />
        )}
      </LeftSidebar>
    </>
  );
};

export default SettingsPage;

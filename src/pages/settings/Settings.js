import React, { useState } from 'react';

import { LeftSidebar } from '../../layout-blueprints';
import EmailForm from '../../components/Settings/EmailForm';
import { useQuery, useMutation, useClient } from 'jsonapi-react';
import { List, ListItem, Card } from '@material-ui/core';

const SettingsPage = () => {
  const [emailType, setEmailType] = useState('client');
  const [email, setEmail] = useState();

  let { data, isLoading } = useQuery(['emails', emailType]);

  const client = useClient();
  const onTypeChange = async (event) => {
    let { value } = event.target;
    setEmailType(value);
    let newResponse = await client.fetch(['emails', emailType]);
    setEmail(newResponse.data);
  };

  return (
    <>
      <LeftSidebar>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <EmailForm
            email={data}
            onTypeChange={onTypeChange}
            emailType={emailType}
          />
        )}
      </LeftSidebar>
    </>
  );
};

export default SettingsPage;

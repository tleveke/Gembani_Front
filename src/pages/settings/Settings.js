import React, { useState } from 'react';

import { LeftSidebar } from '../../layout-blueprints';
import EmailForm from '../../components/Settings/EmailForm';
import { useQuery } from 'jsonapi-react';

const SettingsPage = () => {
  const [emailType, setEmailType] = useState('client');
  const onComplete = (ok) => {
    console.log(ok);
  };
  const onChange = (event) => {
    let value = event.target.value;
    if (value === 'employee' || value === 'client') {
      setEmailType(value);
    }
  };

  const { data, meta, error, isLoading, isFetching } = useQuery([
    'emails',
    emailType
  ]);

  return (
    <>
      <LeftSidebar>
        {isLoading ? (
          'Loading...'
        ) : (
          <EmailForm
            onComplete={onComplete}
            email={data}
            handleChange={onChange}
          />
        )}
      </LeftSidebar>
    </>
  );
};

export default SettingsPage;

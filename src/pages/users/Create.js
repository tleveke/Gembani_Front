import React, { useState } from 'react';

import { LeftSidebar } from '../../layout-blueprints';
import { useHistory } from 'react-router-dom';

import Form from '../../components/User/Form';

const UserListPage = () => {
  const history = useHistory();
  const onComplete = function () {
    history.push('/user/list');
  };
  return (
    <>
      <LeftSidebar>
        <Form onComplete={onComplete} />
      </LeftSidebar>
    </>
  );
};

export default UserListPage;

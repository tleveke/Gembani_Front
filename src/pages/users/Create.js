import React, { useState } from 'react';

import { LeftSidebar } from '../../layout-blueprints';
import { useHistory, useLocation } from 'react-router-dom';

import Form from '../../components/User/Form';

const UserListPage = () => {
  const history = useHistory();
  const onComplete = function () {
    history.push('/user/list');
  };
  function queryParams() {
    return new URLSearchParams(location.search);
  }

  let location = useLocation();

  let query = queryParams();

  let user = {};
  if (
    query.get('userType') == 'client' ||
    query.get('userType') == 'employee'
  ) {
    user.userType = query.get('userType');
  } else {
    user.userType = 'client';
  }

  return (
    <>
      <LeftSidebar>
        <Form onComplete={onComplete} user={user} />
      </LeftSidebar>
    </>
  );
};

export default UserListPage;

import React from 'react';
import { LeftSidebar } from '../../layout-blueprints';
import UserList from '../../components/User/List';

const UserListPage = () => {
  return (
    <>
      <LeftSidebar>
        <UserList />
      </LeftSidebar>
    </>
  );
};

export default UserListPage;

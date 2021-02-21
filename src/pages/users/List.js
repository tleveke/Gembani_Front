import React from 'react';
import { LeftSidebar } from '../../layout-blueprints';
import UserList from '../../components/User/List';
import { useQuery } from 'jsonapi-react';
import UserForm from '../../components/User/Form';

const UserListPage = () => {
  const { data, error, isLoading } = useQuery('users');

  return (
    <>
      <LeftSidebar>
        {isLoading ? 'Loading...' : <UserList data={data} error={error} />}
      </LeftSidebar>
    </>
  );
};

export default UserListPage;

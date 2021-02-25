import React from 'react';
import { LeftSidebar } from '../../layout-blueprints';
import UserList from '../../components/User/List';
import { useQuery } from 'jsonapi-react';
import UserForm from '../../components/User/Form';

const UserListPage = () => {
  const { data, error, isLoading } = useQuery('users');
  console.log(data)
  const employee = data?.filter(user => (user.userType === "employee"));
  const client = data?.filter(user => (user.userType === "client"));

  return (
    <>
      <LeftSidebar>
        {isLoading ? 'Loading...' : <UserList employee={employee} client={client} error={error} />}
      </LeftSidebar>
    </>
  );
};

export default UserListPage;

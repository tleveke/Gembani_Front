/*import React, { useState, useEffect } from 'react';
import { LeftSidebar } from '../../layout-blueprints';
import UserList from '../../components/User/List';
import { useQuery } from 'jsonapi-react';
import UserForm from '../../components/User/Form';

const UserListPage = () => {
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [client, setClient] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    fetch("http://localhost:7000/users/", {
      headers: {
        "accepts": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        setData(json.data);
        setEmployee(data?.filter(user => (user.userType === "employee")));
        setClient(data?.filter(user => (user.userType === "client")));
        console.log(data)
        setIsLoading(false);
      })
      .catch(a => { console.log(a) });
  }

  return (
    <>
      <LeftSidebar>
        {isLoading ? 'Loading...' : <UserList employee={employee} client={client} error={null} />}
      </LeftSidebar>
    </>
  );
};

export default UserListPage;*/


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

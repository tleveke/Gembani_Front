import React from 'react';
import { useParams } from 'react-router-dom';
import { LeftSidebar } from '../../layout-blueprints';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'jsonapi-react';
import UserForm from '../../components/User/Form';

const UserListPage = (props) => {
  let { id } = useParams();

  const history = useHistory();
  const onComplete = function () {
    history.push('/user/list');
  };
  const { data, meta, error, isLoading, isFetching } = useQuery(['users', id]);
  return (
    <>
      <LeftSidebar>
        {isLoading ? (
          'Loading...'
        ) : (
          <UserForm onComplete={onComplete} user={data} error={error} />
        )}
      </LeftSidebar>
    </>
  );
};

export default UserListPage;

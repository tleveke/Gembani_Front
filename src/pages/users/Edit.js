import React from 'react';
import { useParams } from 'react-router-dom';
import { LeftSidebar } from '../../layout-blueprints';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'jsonapi-react';
import UserForm from '../../components/User/Form';

const UserEditPage = (props) => {
  let { id } = useParams();

  const history = useHistory();
  const onComplete = function () {
    history.push('/user/list');
  };
  const companyQuery = useQuery('companies');

  const { data, meta, error, isLoading, isFetching } = useQuery(['users', id]);
  return (
    <>
      <LeftSidebar>
        {isLoading || companyQuery.isLoading ? (
          'Loading...'
        ) : (
          <UserForm
            onComplete={onComplete}
            user={data}
            companyQuery={companyQuery}
            error={error}
          />
        )}
      </LeftSidebar>
    </>
  );
};

export default UserEditPage;

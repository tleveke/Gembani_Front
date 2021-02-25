import React from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, CardContent, Button } from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';

import avatar2 from '../../assets/images/avatars/avatar2.jpg';

export default function (props) {
  const { data, error } = props;

  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <small>Tables</small>
          </div>
          <div className="card-header--actions">
            <Link
              to={'/user/create'}
              size="small"
              className="btn-primary d-40 btn-icon p-0">
              <FontAwesomeIcon
                icon={['fas', 'plus']}
                className="font-size-lg"
              />
            </Link>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive-md">
            <Table className="table table-hover table-striped text-nowrap mb-0">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: '40%' }}>Users</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Admin</th>
                  <th className="text-center">Hourly Rate</th>
                  <th className="text-center">Client Dashboard</th>
                  <th className="text-center">Employee Dashboard</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper mr-3">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar2} />
                          </div>
                        </div>
                        <div>
                          <Link
                            to={{
                              pathname: `/user/edit/${user.id}`
                            }}
                            className="font-weight-bold text-black"
                            title="...">
                            {user.emails ? user.emails.join() : user.email}
                          </Link>
                          <span className="text-black-50 d-block">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="badge badge-warning h-auto py-0 px-3">
                        {user.userType}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="badge h-auto py-0 px-3">
                        {user.admin ? 'Yes' : 'No'}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="badge h-auto py-0 px-3">
                        {user.hourlyRate}
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="badge h-auto py-0 px-3">
                        {user.clientDashboard ? 'Yes' : 'No'}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="badge h-auto py-0 px-3">
                        {user.employeeDashboard ? 'Yes' : 'No'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="divider" />
          <div className="divider" />
          <div className="p-3 d-flex justify-content-center">
            <Pagination className="pagination-primary" count={10} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

import React from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, CardContent, Button } from '@material-ui/core';

export default function (props) {
  const { employee, client, error } = props;
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <small>Clients</small>
          </div>
          <div className="card-header--actions">
            <Link
              to={{
                pathname: '/user/create?userType=client'
              }}
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
                  <th style={{ width: '40%' }}>Email</th>

                  <th className="text-center">Client Dashboard</th>
                </tr>
              </thead>
              <tbody>
                {client.map((user, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <Link
                            to={{
                              pathname: `/user/edit/${user.id}`
                            }}
                            className="font-weight-bold text-black"
                            title="...">
                            {user.email}
                          </Link>
                          <span className="text-black-50 d-block">
                            {user.secondaryEmails
                              ? user.secondaryEmails.join()
                              : ''}
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="badge h-auto py-0 px-3">
                        {user.clientDashboard ? 'Yes' : 'No'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="divider" />
          <div className="divider" />
        </CardContent>
      </Card>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <small>Employees</small>
          </div>
          <div className="card-header--actions">
            <Link
              to={{
                pathname: '/user/create?userType=employee'
              }}
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
                  <th style={{ width: '40%' }}>Email</th>
                  <th className="text-center">Admin</th>
                  <th className="text-center">Hourly Rate</th>
                  <th className="text-center">Employee Dashboard</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((user, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <Link
                            to={{
                              pathname: `/user/edit/${user.id}`
                            }}
                            className="font-weight-bold text-black"
                            title="...">
                            {user.email}
                          </Link>
                          <span className="text-black-50 d-block">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
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
        </CardContent>
      </Card>
    </>
  );
}

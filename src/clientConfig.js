import { ApiClient } from 'jsonapi-react';
import { useAuthHeader } from 'react-auth-kit';

const schema = {
  events: {
    types: 'events',
    fields: {
      start: 'date',
      end: 'date',
      title: 'string'
    }
  },
  users: {
    type: 'users',
    fields: {
      firstName: 'string', // shorthand
      lastName: 'string', // shorthand
      secondaryEmails: 'array',
      userType: 'string',
      company: 'string',
      employeeDashboard: {
        resolve: (status) => {
          return status === true;
        }
      },
      clientDashboard: {
        resolve: (status) => {
          return status === true;
        }
      },
      admin: {
        resolve: (status) => {
          return status === true;
        }
      },
      hourlyRate: 'string'
    }
  },
  tokens: {
    type: 'tokens',
    fields: {
      email: 'string', // shorthand
      password: 'string' // shorthand
    }
  }
};

export default {
  ssrMode: false,
  url: 'http://localhost:3000/api/',
  schema
};

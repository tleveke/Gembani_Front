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
  email: {
    types: 'emails',
    fields: {
      type: 'string',
      content: 'string'
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
  },
  /**
   * TODO
   * Schema que nous avons créé, peut-être le soucis vient d'ici ?
   */
  companies: {
    type: 'companies',
    fields: {
      id: 'string',
      name: 'string'
    },
    relationships: {
      bookings: {
        type: 'bookings'
      }
    }
  },
  bookingsCollections: {
    type: 'bookingsCollection',
    relationships: {
      bookings: {
        type: 'bookings'
      }
    }
  },

  bookings: {
    type: 'bookings',
    fields: {
      id: 'string',
      maxDate: 'string',
      minDate: 'string',
      priceOverwrite: 'number',
      price: 'number',
      hours: 'number',
      title: 'string',
      isChecked: 'boolean'
    },
    relationships: {
      employee: {
        type: 'users'
      }
    }
  }
};

export default {
  ssrMode: false,
  url: 'http://localhost:3000/api/',
  schema
};

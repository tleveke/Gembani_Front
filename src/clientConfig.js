import { ApiClient } from 'jsonapi-react';
import { useAuthHeader } from 'react-auth-kit';

const schema = {
  users: {
    type: 'users',
    fields: {
      first_name: 'string', // shorthand
      last_name: 'string', // shorthand
      email: 'string', // shorthand
    }
  },
  tokens:{
    type: 'tokens',
    fields: {
      email: 'string', // shorthand
      password: 'string', // shorthand

    }

  }
}

export default  {
  ssrMode: false,
  url: 'http://localhost:3000/api/',
  schema
}



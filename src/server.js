// src/server.js
import { createServer, Model, JSONAPISerializer } from 'miragejs';

const ApplicationSerializer = JSONAPISerializer.extend({
  keyForAttribute(attr, resource) {
    return attr;
  }
});

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    serializers: {
      application: ApplicationSerializer
    },
    models: {
      user: Model,
      company: Model,
      token: Model
    },

    seeds(server) {
      server.create('company', { name: 'Gembani' });
      server.create('user', {
        firstName: 'Tom',
        lastName: 'Stock',
        email: 'tom@gembani.comm',
        userType: 'employee',
        hourlyRate: '50',
        admin: true,
        clientDashboard: true,
        employeeDashboard: true,
        company: 1
      });

      server.create('user', {
        firstName: 'Nick',
        lastName: 'Stock',
        email: 'nick@gembani.comm',
        userType: 'employee',
        hourlyRate: '50',
        clientDashboard: true,
        company: 1
      });
      server.create('user', {
        firstName: 'Brady',
        lastName: 'Simmons',
        email: 'brady@test.comm',
        userType: 'client',
        clientDashboard: true,
        company: 1
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', (schema) => {
        return schema.users.all();
      });
      this.get('/users/:id');
      this.get('/companies', (schema) => {
        return schema.companies.all();
      });

      this.post('/users');
      this.patch('/users/:id');
      this.post('/tokens', (schema) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return schema.tokens.create({
          authState: { token: 'HelloWorld', expiresIn: 3600 }
        });
      });
      this.post('/companies');
    }
  });

  return server;
}

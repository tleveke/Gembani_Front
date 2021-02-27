// src/server.js
import {
  createServer,
  Model,
  JSONAPISerializer,
  hasMany,
  trait,
  belongsTo,
  Factory
} from 'miragejs';
import faker from 'faker';
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
      token: Model,
      secondaryEmail: Model.extend({
        user: belongsTo()
      }),
      event: Model.extend({
        attendees: hasMany(),
        employee: belongsTo('user')
      }),
      attendee: Model.extend({
        event: belongsTo()
      })
    },
    factories: {
      attendee: Factory.extend({
        email(email) {
          return faker.internet.email();
        }
      }),
      secondaryEmail: Factory.extend({
        email(email) {
          return faker.internet.email();
        }
      }),
      user: Factory.extend({
        email(email) {
          return faker.internet.email();
        },
        secondaryEmails() {
          return [faker.internet.email(), faker.internet.email()];
        },
        firstName() {
          return faker.name.firstName();
        },
        lastName() {
          return faker.name.lastName();
        },

        withEmployeeEvents: trait({
          afterCreate(employee, server) {
            server.createList('event', 10, 'withAttendees', {
              employee: employee
            });
          }
        })
      }),
      event: Factory.extend({
        title(i) {
          return `Event ${i}`;
        },

        allday() {
          return false;
        },
        description() {
          return faker.lorem.paragraph();
        },
        withAttendees: trait({
          afterCreate(event, server) {
            server.createList('attendee', 3, { event });
          }
        }),
        start() {
          var date = new Date();
          var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          return faker.date.between(firstDay, lastDay);
        },
        end() {
          let endDate = new Date(this.start);
          return endDate.setHours(endDate.getHours() + 4);
        }
      })
    },
    seeds(server) {
      server.create('company', { name: 'Gembani' });
      server.create('user', 'withEmployeeEvents', {
        firstName: 'Tom',
        lastName: 'Stock',
        emails: ['tom@gembani.com'],
        userType: 'employee',
        hourlyRate: '50',
        admin: true,
        clientDashboard: true,
        employeeDashboard: true,
        company: 1
      });

      server.create('user', 'withEmployeeEvents', {
        firstName: 'Nick',
        lastName: 'Stock',
        email: 'brady@test.com',
        userType: 'employee',
        hourlyRate: '50',
        clientDashboard: true,
        company: 1
      });
      server.create('user', {
        firstName: 'Brady',
        lastName: 'Simmons',
        email: 'brady@test.com',
        userType: 'client',
        clientDashboard: true,
        company: 1
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', (schema, req) => {
        const users = schema.users.all();
        if (req.queryParams['filter[userType]']) {
          console.log(users);
          const userFiltered = users.models.filter(
            (model) =>
              model.attrs.userType === req.queryParams['filter[userType]']
          );
          users.models = userFiltered;
        }
        return users;
      });

      this.get('/events');
      this.get('/events/:id');
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
      this.post('/secondaryEmails');
      this.post('/companies', (schema, req) => {
        const { data } = JSON.parse(req.requestBody);
        return schema.companies; //TODO
      });
    }
  });

  return server;
}

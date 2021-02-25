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
      booking: Model.extend({
        company: belongsTo(),
        employee: belongsTo('user')
      }),
      company: Model.extend({
        bookings: hasMany()
      }),
      token: Model,
      bookingsCollection: Model,

      event: Model.extend({
        attendees: hasMany(),
        employee: belongsTo('user')
      }),
      attendee: Model.extend({
        event: belongsTo()
      })
    },
    factories: {
      booking: Factory.extend({
        // email(email) {
        //   return faker.internet.domainName();
        // },
        withBookings: trait({
          afterCreate(booking, server) {
            // console.log("user", booking)
            server.createList('booking', 3, { booking });
          }
        }),
        withEmployee: trait({
          afterCreate(test, server) {
            console.log('azeaze');
            server.create('user', { aze: 456 });
            // server.createList('user', 3, { aze:123 });
          }
        })
      }),
      attendee: Factory.extend({
        email(email) {
          return faker.internet.email();
        }
      }),
      user: Factory.extend({
        withEmployeeEvents: trait({
          afterCreate(employee, server) {
            server.createList('event', 10, 'withAttendees', {
              employee: employee
            });
          }
        })
      }),
      company: Factory.extend({
        withCompanyBookings: trait({
          afterCreate(company, server) {
            new Array(10).fill().map(() =>
              server.create('booking', {
                company: company,
                isChecked: faker.random.boolean(),
                title: faker.name.jobTitle(),
                hours: faker.random.number({ min: 0, max: 2 }),
                price: faker.random.number({ min: 100, max: 300 }),
                priceOverwrite: faker.random.number({ min: 0, max: 300 }),
                minDate: faker.date.past(),
                maxDate: faker.date.future(),
                employee: server.create('user', { toto: 123 })
              })
            );
          }
        })
      }),
      // booking: Factory.extend({
      // }),
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
      server.create('company', 'withCompanyBookings', { name: 'Gembani' });
      server.create('company', 'withCompanyBookings', { name: 'Exxon' });
      // server.create('booking', { name: '123' });
      server.create('user', 'withEmployeeEvents', {
        firstName: 'Tom',
        lastName: 'Stock',
        email: 'tom@gembani.com',
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
        email: 'nick@gembani.com',
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

      this.get('/users', (schema) => {
        return schema.users.all();
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

      this.get('/bookings', (schema) => {
        return schema.bookings.all();
      });

      this.post('/bookingsCollections');
    }
  });

  return server;
}

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
      secondaryEmail: Model.extend({
        user: belongsTo()
      }),
      event: Model.extend({
        attendees: hasMany(),
        employee: belongsTo('user')
      }),
      attendee: Model.extend({
        event: belongsTo()
      }),
      email: Model,
      invoice: Model.extend({
        lines: hasMany()
      }),
      line: Model.extend({
        invoice: belongsTo()
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
      secondaryEmail: Factory.extend({
        email(email) {
          return faker.internet.email();
        }
      }),
      user: Factory.extend({
        email(email) {
          return faker.internet.email();
        },
        userType() {
          return faker.random.boolean() ? 'client' : 'employee';
        },
        hourlyRate() {
          if (this.userType == 'employee') {
            return faker.random.number(20, 200);
          } else {
            return undefined;
          }
        },
        afterCreate(user, server) {
          if (user.userType == 'client') {
            let company = server.create('company');
            user.update({
              companyId: company.id
            });
          }
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
      company: Factory.extend({
        name() {
          return faker.company.companyName();
        },
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
      server.create('email', {
        type: 'client',
        content: 'Voici ce mail client !'
      });
      server.create('email', {
        type: 'employee',
        content: 'Voici ce mail employé !'
      });

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

      let invoiceA = server.create('invoice', {
        numberID: '#INV49583',
        productID: '32456',
        issueDate: 'June 14, 2020',
        dueDate: 'March 12, 2021',
        billedTo: {
          company: 'CompanyName, Inc.',
          adress: '201 Something St., Something Town, YT 242, Country 6546',
          tel: '609-876-0996',
          mail: 'name@company.com'
        },
        billedFrom: {
          company: 'Maria P Quinn',
          adress: '182 Prospect Street, Camden, New Jersey',
          tel: '856-718-9505',
          mail: 'rlvs4eizeeo@tstspun.com'
        },
        tax: 0.05,
        paid: false
      });

      let invoiceB = server.create('invoice', {
        numberID: '#INV49584',
        productID: '56894',
        issueDate: 'June 16, 2020',
        dueDate: 'March 14, 2021',
        billedTo: {
          company: 'CompanyName, Inc.',
          adress: '201 Something St., Something Town, YT 242, Country 6546',
          tel: '609-876-0996',
          mail: 'name@company.com'
        },
        billedFrom: {
          company: 'Maria P Quinn',
          adress: '182 Prospect Street, Camden, New Jersey',
          tel: '856-718-9505',
          mail: 'rlvs4eizeeo@tstspun.com'
        },
        tax: 0.05,
        paid: true
      });

      server.create('line', {
        invoice: invoiceA,
        type: 'Design',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
        quantity: 2,
        unitPrice: 150
      });
      server.create('line', {
        invoice: invoiceA,
        type: 'Software development',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
        quantity: 3,
        unitPrice: 270
      });

      server.create('line', {
        invoice: invoiceB,
        type: 'Design',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
        quantity: 6,
        unitPrice: 322
      });
      server.create('line', {
        invoice: invoiceB,
        type: 'Software development',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
        quantity: 2,
        unitPrice: 187
      });
    },

    routes() {
      this.namespace = 'api';

      //this.passthrough('/users')

      /*this.get('/users', (schema, req) => {
        const users = schema.users.all();
        if (req.queryParams['filter[userType]']) {
          console.log(users);
          const userFiltered = users.models.filter(
            (model) =>
              model.attrs.userType === req.queryParams['filter[userType]']
          );
          users.models = userFiltered;
        }
        console.log(users);
        return users;
      });*/
      this.passthrough('/authentification/register');
      this.passthrough('/users');
      this.passthrough('/companies')

      /*this.get('/users', (schema, req) => {
        return fetch("http://localhost:7000/users/", {
          headers: {
            "accepts": "application/json"
          }
        })
          .then(res => {
            console.log(res);
            return res.json();
          })
          .then(json => {return json})
          .catch(a => { console.log(a) });
      });*/

      this.get('/invoices', (schema) => {
        return schema.invoices.all();
      });
      this.get('/invoices/:id');

      this.get('/events');
      this.get('/events/:id');
      this.get('/users/:id');
      
      /*this.get('/companies', (schema) => {
        return schema.companies.all();
      });*/

      //this.post('/users');
      this.get('/emails/:type', (schema, request) => {
        return schema.emails.findBy({ type: request.params.type });
      });
      this.patch('/emails/:type', (schema, request) => {
        let email = schema.emails.findBy({ type: request.params.type });
        return email.update(request.requestBody);
      });

      this.patch('/users/:id');
      this.post('/front_tokens', (schema) => {
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
      this.post('/secondaryEmails');
      //this.post('/companies');
    }
  });

  return server;
}

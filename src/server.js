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
      event: Model.extend({
        attendees: hasMany(),
        employee: belongsTo('user')
      }),
      attendee: Model.extend({
        event: belongsTo()
      }),
      invoice: Model.extend({
        invoiceLines: hasMany()
      }),
      invoiceLine: Model.extend({
        invoice: belongsTo()
      })
    },
    factories: {
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

      server.create('invoiceLine', {
        invoice: invoiceA,
        type: 'Design',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
        quantity: 2,
        unitPrice: 150
      });
      server.create('invoiceLine', {
        invoice: invoiceA,
        type: 'Software development',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
        quantity: 3,
        unitPrice: 270
      });

     
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', (schema) => {
        return schema.users.all();
      });

      this.get('/invoices', (schema) => {
        return schema.invoices.all();
      });
      this.get('/invoices/:id');
      this.get('/invoices/:id/invoiceLines', (schema, request) => {
        let invoiceId = request.params.id;
        let invoice = schema.invoices.find(invoiceId);
        return invoice.invoiceLines;
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
      this.post('/companies');
    }
  });

  return server;
}

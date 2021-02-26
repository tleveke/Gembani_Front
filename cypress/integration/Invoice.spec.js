import { makeServer } from '../../src/server';
let server;
beforeEach(() => {
  server = makeServer({ environment: 'test' });

  cy.login();
});

afterEach(() => {
  //server.shutdown();
});
describe('Invoice', () => {
  it('should have invoices in list', () => {
    server.create('invoice', {
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
      services: [
        {
          type: 'Design',
          description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
          quantity: 2,
          unitPrice: 150
        },
        {
          type: 'Software development',
          description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
          quantity: 3,
          unitPrice: 270
        }
      ],
      tax: 0.05,
      paid: false
    });

    server.create('invoice', {
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
      services: [
        {
          type: 'Design',
          description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
          quantity: 1,
          unitPrice: 168
        },
        {
          type: 'Software development',
          description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.	',
          quantity: 4,
          unitPrice: 222
        }
      ],
      tax: 0.05,
      paid: true
    });

    cy.visit('/invoice/list');

    cy.get('.invoices-table')
      .find('tbody .invoice-row')
      .should('have.length', 2);

    cy.get('.invoice-view-button')
      .first()
      .click()
      .url()
      .should('contains', 'invoice/view/1');
  });
});

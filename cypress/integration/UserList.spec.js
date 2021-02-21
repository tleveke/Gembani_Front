import { makeServer } from '../../src/server';
let server;
beforeEach(() => {
  server = makeServer({ environment: 'test' });

  cy.login();
});

afterEach(() => {
  server.shutdown();
});
describe('User List', () => {
  it('renders learn react link', () => {
    server.create('user', {
      firstName: 'Tom',
      lastName: 'Stock',
      email: 'tom@gembani.com'
    });
    server.create('user', {
      first_name: 'Tom',
      last_name: 'Stock',
      email: 'tom@gembani.com'
    });
    cy.visit('/user/list');
  });
});

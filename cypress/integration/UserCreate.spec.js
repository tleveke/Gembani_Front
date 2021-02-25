import { makeServer } from '../../src/server';
let server;
beforeEach(() => {
  server = makeServer({ environment: 'test' });
  cy.login();
});

afterEach(() => {
  server.shutdown();
});
describe('User Create', () => {
  it('renders learn react link', () => {
    server.create('company', { name: 'Client Company One' });

    cy.visit('/user/create');
    cy.get('.firstName').type('Nicholas');

    cy.get('.lastName').type('Stock');

    cy.get('.email-0').type('nick@gembani.com');

    cy.get('.addEmailBtn').click();

    cy.get('.email-1').type('jean@gembani.com');

    cy.get('.addEmailBtn').click();

    cy.get('.email-2').type('simon@gembani.com');

    cy.get('.userType').click();

    cy.get(
      '#menu-userType > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
    ).click();

    cy.get('.employeeDashboard').click();

    cy.get('.hourlyRate').type('50');
    cy.get('.submit').click();
  });
});

import { makeServer } from '../../../src/server';
let server;
beforeEach(() => {
  server = makeServer({ environment: 'test' });
  cy.login();
});

afterEach(() => {
  server.shutdown();
});

describe('edit email content in settings', () => {
  it('redirects to protected route', () => {
    server.create('email', { type: 'client', content: 'content of the email' });

    cy.visit('/settings');
    cy.get('.emailContent').type('Email content test');

    cy.get('.submit').click();
  });
});

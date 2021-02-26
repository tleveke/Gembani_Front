import { makeServer } from '../../../src/server';
let server;
beforeEach(() => {
  server = makeServer({ environment: 'test' });
  cy.login();
});

afterEach(() => {
  server.shutdown();
});

describe('Show type value from email in settings', () => {
  it('redirects to protected route', () => {
    server.create('email', { type: 'client', content: 'content of the email' });

    cy.visit('/settings');

    cy.get('.userType').type('client');
  });
});

describe('Show content value from email in settings', () => {
  it('redirects to protected route', () => {
    server.create('email', { type: 'client', content: 'content of the email' });

    cy.visit('/settings');

    cy.get('.emailContent').type('content of the email');
  });
});

describe('Show email content in settings', () => {
  it('redirects to protected route', () => {
    server.create('email', { type: 'client', content: 'content of the email' });

    cy.visit('/settings');

    cy.get('.saveButton').contains('Save');
  });
});

describe('Edit email content in settings', () => {
  it('redirects to protected route', () => {
    server.create('email', { type: 'client', content: 'content of the email' });

    cy.visit('/settings');

    cy.get('.emailContent').type('Email content test');

    cy.get('.submit').click();
  });
});

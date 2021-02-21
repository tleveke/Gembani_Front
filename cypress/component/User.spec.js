import React from 'react';
import User from '../../src/components/User';
import { mount } from '@cypress/react';
import { ApiClient, ApiProvider } from 'jsonapi-react';
import clientConfig from '../../src/clientConfig';
import { Provider } from 'react-redux';
import configureStore from '../../src/config/configureStore';
import { makeServer } from '../../src/server';
const store = configureStore();

describe('User', () => {
  let server, company;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    company = server.create('company', { name: 'Gembani' });
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('create', function () {
    it('Create employee user', () => {
      const client = new ApiClient(clientConfig);
      const spyObj = {
        onComplete(data) {
          console.log(data);
        }
      };
      let spy = cy.spy();

      mount(
        <Provider store={store}>
          <ApiProvider client={client}>
            <User onComplete={spy} />
          </ApiProvider>
        </Provider>
      );
      cy.get('.firstName').type('Nicholas');

      cy.get('.lastName').type('Stock');

      cy.get('.email').type('nick@gembani.com');

      cy.get('.userType').click();

      cy.get(
        '#menu-userType > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
      ).click();

      cy.get('.employeeDashboard').click();
      cy.get('.admin').click();
      cy.get('.hourlyRate').type('50');

      cy.get('.submit').click();
      cy.wait(1).then(() => {
        let returnData = spy.getCall(0).args[0].data;
        expect(returnData.firstName).to.eq('Nicholas');
        expect(returnData.lastName).to.eq('Stock');
        expect(returnData.email).to.eq('nick@gembani.com');
        expect(returnData.hourlyRate).to.eq('50');
        expect(returnData.userType).to.eq('employee');
        expect(returnData.employeeDashboard).to.eq(true);
        expect(returnData.admin).to.eq(true);
      });
    });

    it('Create customer user', () => {
      const client = new ApiClient(clientConfig);
      const spyObj = {
        onComplete(data) {
          console.log(data);
        }
      };
      let spy = cy.spy();

      mount(
        <Provider store={store}>
          <ApiProvider client={client}>
            <User onComplete={spy} />
          </ApiProvider>
        </Provider>
      );
      cy.get('.firstName').type('Nicholas');

      cy.get('.lastName').type('Stock');

      cy.get('.email').type('nick@gembani.com');

      cy.get('.userType').click();
      cy.get(
        '#menu-userType > .MuiPaper-root > .MuiList-root > [tabindex="-1"]'
      ).click();
      cy.get('.company').click();

      cy.get('.MuiList-root > .MuiButtonBase-root').click();
      cy.get('.clientDashboard').click().get('.submit').click();

      cy.wait(1).then(() => {
        let returnData = spy.getCall(0).args[0].data;
        expect(returnData.firstName).to.eq('Nicholas');
        expect(returnData.lastName).to.eq('Stock');
        expect(returnData.userType).to.eq('client');
        expect(returnData.email).to.eq('nick@gembani.com');
        expect(returnData.clientDashboard).to.eq(true);
      });
    });
  });

  describe('edit', function () {
    it('customer', () => {
      let user = server.create('user', {
        firstName: 'Tom',
        lastName: 'Stockish',
        email: 'tom@gembani.comm',
        userType: 'client',
        clientDashboard: false,
        company: company.id
      });
      const client = new ApiClient(clientConfig);
      const spyObj = {
        onComplete(data) {
          console.log(data);
        }
      };

      let spy = cy.spy();
      mount(
        <Provider store={store}>
          <ApiProvider client={client}>
            <User
              user={Object.assign(user.attrs, { id: company.id })}
              onComplete={spy}
            />
          </ApiProvider>
        </Provider>
      );
      cy.get('.firstName').type('{selectall}{backspace}Nicholas');

      cy.get('.lastName').type('{selectall}{backspace}Stock');

      cy.get('.email').type('{selectall}{backspace}nick@gembani.com');

      cy.get('.clientDashboard').click();
      cy.get('.submit').click();

      cy.wait(1).then(() => {
        let returnData = spy.getCall(0).args[0].data;
        expect(returnData.firstName).to.eq('Nicholas');
        expect(returnData.lastName).to.eq('Stock');
        expect(returnData.userType).to.eq('client');
        expect(returnData.email).to.eq('nick@gembani.com');
        expect(returnData.clientDashboard).to.eq(true);
      });
    });
  });
});

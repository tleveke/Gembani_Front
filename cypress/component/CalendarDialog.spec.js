import React from 'react';
import Dialog from '../../src/components/Calendar/Dialog';
import { mount } from '@cypress/react';
import { ApiClient, ApiProvider } from 'jsonapi-react';
import clientConfig from '../../src/clientConfig';
import { Provider } from 'react-redux';
import configureStore from '../../src/config/configureStore';
import { makeServer } from '../../src/server';

const store = configureStore();

describe('User', () => {
  let server, company, event;
  beforeEach(async () => {
    server = makeServer({ environment: 'test' });
    company = server.create('company', { name: 'Gembani' });
    let eventData = server.create('event', 'withAttendees');

    const client = new ApiClient(clientConfig);
    event = await client.fetch([
      'events',
      eventData.id,
      { include: ['attendees'] }
    ]);
    event = event.data;
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('edit', function () {
    it('customer', () => {
      let user = server.create('user', {
        firstName: 'Tom',
        lastName: 'Stock',
        email: 'tom@gembani.comm',
        userType: 'client',
        clientDashboard: true,
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
            <Dialog open={true} event={event} />
          </ApiProvider>
        </Provider>
      );

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

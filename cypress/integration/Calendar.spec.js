import { makeServer } from '../../src/server';
let server;
beforeEach(() => {
  server = makeServer({ environment: 'test' });
  cy.login();
});

afterEach(() => {
  server.shutdown();
});
describe('We see the events created', () => {
  it('Should display todays month.', () => {
    // server.create('company', { name: 'Client Company One' });
    let startDate = new Date();
    let endDate = new Date();
    endDate.setHours(endDate.getHours() + 4);
    server.create('event', {
      id: 0,
      allday: false,
      title: 'SebWorking',
      start: startDate,
      end: endDate
    });

    var d = new Date();
    var month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';
    var n = month[d.getMonth()];
    cy.visit('/calendar');

    cy.contains(n);
    cy.contains('SebWorking');
  });
});

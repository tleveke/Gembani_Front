describe('login works', () => {
  it('redirects to protected route', () => {
    cy.visit('/sessions/new');
    cy.get('.email').type('fake@email.com');
    cy.get('.password').type('password');

    cy.get('.submit').click();

    cy.contains(/Users/);
  });
});

export function login(){
    cy.viewport('macbook-15');
    cy.visit('/login');
    cy.request('POST', 'http://localhost:3000/api/dbutil/add-verified-user?name=test123&email=test@gmail.com&password=123456').then(()=>{
        cy.wait(2000); // wait to be added to the test db
        cy.get('[data-cy=login-email]').type('test123@gmail.com');
        cy.get('[data-cy=login-password]').type('123456');
        cy.get('[data-cy=login-submit]').click();
    });
}
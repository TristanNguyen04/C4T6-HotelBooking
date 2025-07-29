import React from "react";

// describe('Log in E2E', ()=>{
//     it('Log in', ()=>{
//         cy.viewport('macbook-15');
//         cy.visit('/');
//         cy.get('button.px-4.py-2\\.5.rounded-xl.ml-3.bg-\\[\\#FF6B6B\\].text-white').click();
//         cy.get('input[id="email"]').type('zhaohui@gmail.com');    
//         cy.get('.gap-3 > .flex-1').click();
//         cy.get('#name').type('Ng Zhao Hui');
//         cy.get('#password').type('123456');
//         cy.get('#confirmPassword').type('123456');
//         cy.get('.gap-3 > .bg-red-400').click();
//         cy.get('.gap-3 > .bg-red-400').click();
//     });
// });

describe('Header Register Button', () => {
  it('navigates to /register when clicked', () => {
    cy.visit('/'); // load the home page or page with Header
    
    // Wait for the button to be visible and clickable
    cy.get('[data-cy="register-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    
    // Check the URL after clicking
    cy.url().should('include', '/register');
  });
});

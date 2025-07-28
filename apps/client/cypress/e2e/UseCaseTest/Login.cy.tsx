import React from "react";

describe('Log in E2E', ()=>{
    it('Log in', ()=>{
        cy.visit('/login');
        cy.contains('StayEase').should('exist');
        cy.get('[data-cy=login-button]').should('be.visible').click();


        cy.contains('button', 'Register').click();
    });
});
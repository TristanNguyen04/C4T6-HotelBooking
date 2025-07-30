// cypress/component/SearchBar.cy.tsx
import SearchBar from '../../src/components/SearchBar';
import '../../src/index.css';
import { mount } from 'cypress/react';
import React from 'react';

// Define minimal types (or import from your types file)
interface Location {
  uid: string;
  term: string;
  type?: string;
}

describe('SearchBar component', () => {
  let onSubmit: Cypress.Agent<sinon.SinonSpy>;

  beforeEach(() => {
    onSubmit = cy.spy().as('onSubmit');
    mount(<SearchBar onSubmit={onSubmit} />);
  });

  it('Input Destination Calls API', () => {
    // Type destination
    cy.get('[data-cy=DestinationSearch]').type('London');
    // You will need to mock searchLocations API here for suggestions to appear
    // e.g. intercept API calls or stub the module if possible
    cy.wait(500);
    // Click on first suggestion if visible
    cy.get('ul li').first().click();
  });

  it('Stay Period Toggle: Date Selection', ()=>{
    // Open rooms & guests selector
    cy.get('[data-cy=stay-period-toggle]').should('exist');
    cy.get('[data-cy=stay-period-toggle]').click();

    // select today's date and end of the month
    cy.window().then(win => {
      const today = new Date();

      const formatMonth = (date: Date) => date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      const currentMonth = formatMonth(today);

      const next = new Date(today);
      next.setMonth(today.getMonth() + 1);
      const nextMonth = formatMonth(next);

      // Get previous month
      const previous = new Date(today);
      previous.setMonth(today.getMonth() - 1);
      const previousMonth = formatMonth(previous);

      const todayDate = today.getDate();

      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

      // Format dates to match your component's output (dd/MM/yyyy)
      const pad = (n) => (n < 10 ? '0' + n : n);

      const startDateStr = `${pad(todayDate)}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
      const endDateStr = `${pad(lastDayOfMonth)}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
      cy.log('start:', startDateStr);
      cy.log('end:', endDateStr);
      // Click the toggle to open the date picker
      cy.get('[data-cy=stay-period-toggle]').click();
      cy.get('[data-cy=stay-period-month').should('contain', currentMonth);
      cy.get('[data-cy=calendar-next-month]').click(); 
      cy.get('[data-cy=stay-period-month]').should('contain', nextMonth);
      cy.get('[data-cy=calendar-previous-month]').click(); 
      cy.get('[data-cy=calendar-previous-month]').click(); 
      cy.get('[data-cy=stay-period-month]').should('contain', previousMonth);
      cy.contains('button', `${todayDate}`).click();
      cy.contains('button', `${lastDayOfMonth}`).click();
      cy.contains('button', 'Done').click();
      cy.get('[data-cy=stay-period-toggle]').should('contain.text', `${startDateStr} - ${endDateStr}`);
    });
  });

  it('Selecting Adult , Children', ()=>{
    // decrease counter to test for room values lower than 1
    cy.get('[data-cy=room-guest-selector]').click();
    cy.get('[data-cy=decrement-rooms]').click();
    cy.get('[data-cy=occupancy-rooms]').should('contain', 1);

    // decrease counter to test for adult values lesser than 1
    cy.get('[data-cy=occupancy-adults]').should('contain', 2);
    cy.get('[data-cy=decrement-adults]').click();
    cy.get('[data-cy=room-guest-selector]').click();
    cy.get('[data-cy=occupancy-adults]').should('contain', 1);
    cy.get('[data-cy=room-guest-selector]').click();

    // increment counter fr rooms
    for(let i=1;i<=10;i++){
      // click room-guest-selector again because it will be re-rendered
      cy.get('[data-cy=room-guest-selector]').click();
      if(i < 5){
        cy.get('[data-cy=occupancy-rooms]').should('contain', i);
      }
      else{
        cy.get('[data-cy=occupancy-rooms]').should('contain', 4);
      }
      cy.get('[data-cy=increment-rooms]').click();
    }

    // decrement counter for rooms
    for(let j=0;j<=10;j++){
      // click room-guest-selector again because it will be re-rendered
      cy.get('[data-cy=room-guest-selector]').click();
      if(j<4){
        cy.get('[data-cy=occupancy-rooms]').should('contain', 4-j);
      }
      else{
        cy.get('[data-cy=occupancy-rooms]').should('contain', 1);
      }
      cy.get('[data-cy=decrement-rooms]').click();
    }

    cy.get('[data-cy=occupancy-children]').should('contain',0);
    cy.get('[data-cy=increment-children]').click();
    cy.get('[data-cy=room-guest-selector]').click();
    cy.get('[data-cy=children-1]').should('have.value', 5);

    // decrease age to 1
    for(let i = 1;i<=5;i++){
      cy.get('[data-cy=children-1]').focus().type('{downarrow}');
      cy.get('[data-cy=children-1]').should('have.value', 5-i);
    }
    // increase age to 17 
    for(let i = 1;i<=18;i++){
      cy.get('[data-cy=children-1]').focus().type('{uparrow}');
      if(i < 18){
        cy.get('[data-cy=children-1]').should('have.value', i);
      }
      else{
        cy.get('[data-cy=children-1]').should('have.value', 17);
      }
    }









  });
});


// cypress/component/SearchBar.cy.tsx
import SearchBar from '../../src/components/SearchBar';
import '../../src/index.css';
import { mount } from 'cypress/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Define minimal types (or import from your types file)
describe('SearchBar component', () => {
  let onSubmit: Cypress.Agent<sinon.SinonSpy>;

  beforeEach(() => {
    onSubmit = cy.spy().as('onSubmit');
    mount(
      <BrowserRouter>
        <SearchBar onSubmit={onSubmit} />
      </BrowserRouter>
    );
  });

  it('Input Destination Calls API', () => {
    // Type destination
    cy.get('[data-cy=DestinationSearch]').type('London');
    // You will need to mock searchLocations API here for suggestions to appear
    // e.g. intercept API calls or stub the module if possible
  });

  it('Stay Period Toggle: Date Selection', ()=>{
    cy.get('[data-cy=stay-period-toggle]').should('exist');
    cy.get('[data-cy=stay-period-toggle]').click();

    cy.window().then(() => {
      const today = new Date();
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 3);

      const formatMonth = (date) => date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      const targetMonth = formatMonth(minDate);

      cy.get('[data-cy=stay-period-toggle]').click();

      // Navigate to the correct month if needed
      function goToTargetMonth() {
        cy.get('[data-cy=stay-period-month]').invoke('text').then((displayedMonth) => {
          if (displayedMonth.trim() !== targetMonth) {
            // If the displayed month is before the target, click next
            const displayedDate = new Date(displayedMonth + ' 1');
            if (displayedDate < minDate) {
              cy.get('[data-cy=calendar-next-month]').click();
              goToTargetMonth();
            } else {
              // If the displayed month is after the target, click previous
              cy.get('[data-cy=calendar-previous-month]').click();
              goToTargetMonth();
            }
          }
        });
      }
      goToTargetMonth();

      // Now select the minDate and last day of month
      const pad = (n) => (n < 10 ? '0' + n : n);
      const startDateStr = `${pad(minDate.getDate())}/${pad(minDate.getMonth() + 1)}/${minDate.getFullYear()}`;
      const lastDayOfMonth = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0).getDate();
      const endDateStr = `${pad(lastDayOfMonth)}/${pad(minDate.getMonth() + 1)}/${minDate.getFullYear()}`;

      cy.contains('button', `${minDate.getDate()}`).should('not.be.disabled').click();
      cy.contains('button', `${lastDayOfMonth}`).should('not.be.disabled').click();
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


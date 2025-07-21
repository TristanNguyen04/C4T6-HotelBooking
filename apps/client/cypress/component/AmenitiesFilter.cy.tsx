import AmenityFilter from '../../src/components/filters/AmenityFilter';
import { mount } from 'cypress/react';
import type {Hotel} from '../../src/types/hotel';
import React from 'react';
import {mockHotels} from '../mock/hotelTest';


describe('AmenityFilter Component Test', () => {
  let setSelectedAmenities: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    setSelectedAmenities = cy.stub().as('setSelectedAmenities');

    mount(
      <AmenityFilter
        hotels={mockHotels}
        selectedAmenities={['Wifi']}
        setSelectedAmenities={setSelectedAmenities}
      />
    );
  });

  it('renders amenities with counts', () => {
    cy.contains('Room Facilities').should('be.visible');

    // Amenities checkboxes rendered
    cy.get('input[type="checkbox"]').should('have.length', 6);
    cy.contains('Wifi').should('not.exist');
    cy.get('[data-cy=show-all-button]').click();
    cy.get('input[type="checkbox"]').should('have.length', 8);

    // Check specific amenities text and counts
    cy.contains('Air Conditioning(2)').should('exist');
    cy.contains('Bar(2)').should('exist');
    cy.contains('Gym(1)').should('exist');
    cy.contains('Parking(2)').should('exist');
    cy.contains('Pool(1)').should('exist');
    cy.contains('Restaurant(2)').should('exist');
    cy.contains('Spa(1)').should('exist');
    cy.contains('Wifi(3)').should('exist');
  });

});
import AmenityFilter from '../../src/components/filters/AmenityFilter';
import type { FilterBarProps } from '../../src/types/hotel';
import { mount } from 'cypress/react';
import type {Hotel} from '../../src/types/hotel';
import React from 'react';


describe('AmenityFilter Component Test', () => {
  const mockHotels: Hotel[] = [
    {
      id: "1",
      name: "Hotel A",
      latitude: 1.28624,
      longitude: 103.852889,
      address: 'Hotel A address',
      currency: 'SGD',
      price: 120,
      totalPrice: 120,
      rating: 5.2,
      amenities: {'Wifi': true,'Pool': true,'Gym': false,'Parking': true,'Air Conditioning': false,'Restaurant': true,'Bar': true,'Spa': false},
      distance: 100,
      searchRank: 1,
      description: "Hotel A best",
      image_details: { suffix: ".jpg", count: 86, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
      categories: { overall: { name: "Overall", score: 90, popularity: 10 } },
    },
    {
      id: "2",
      name: "Hotel B",
      latitude: 1.48624,
      longitude: 103.952889,
      address: 'Hotel B address',
      currency: 'SGD',
      price: 220,
      totalPrice: 220,
      rating: 9.2,
      amenities: {'Wifi': true,'Pool': false,'Gym': false,'Parking': true,'Air Conditioning': true,'Restaurant': false,'Bar': true,'Spa': true},
      distance: 50,
      searchRank: 1,
      description: "Hotel B best",
      image_details: { suffix: ".jpg", count: 21, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
      categories: { overall: { name: "Overall", score: 10, popularity: 1 } },
    },
    {
      id: "3",
      name: "Hotel C",
      latitude: 1.68624,
      longitude: 103.352889,
      address: 'Hotel C address',
      currency: 'SGD',
      price: 330,
      totalPrice: 330,
      rating: 1.2,
      amenities: {'Wifi': true,'Pool': false,'Gym': true,'Parking': false,'Air Conditioning': true,'Restaurant': true,'Bar': false,'Spa': false},
      distance: 210,
      searchRank: 1,
      description: "Hotel C worst",
      image_details: { suffix: ".jpg", count: 86, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
      categories: { overall: { name: "Overall", score: 50, popularity: 9 } },
    }
  ];

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
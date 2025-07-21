import React from 'react';
import { mount } from 'cypress/react';
import AmenityFilter from '../../src/components/filters/AmenityFilter';
import type { Hotel } from '../../src/types/hotel';

describe('AmenityFilter Component', () => {
  const mockHotels: Hotel[] = [
    {
      id: '1',
      name: 'Hotel A',
      latitude: 1.28624,
      longitude: 103.852889,
      address: 'Hotel A address',
      currency: 'SGD',
      price: 120,
      totalPrice: 120,
      rating: 5.2,
      amenities: { Wifi: true, Pool: true },
      distance: 100,
      searchRank: 1,
      description: 'Hotel A best',
      image_details: { suffix: '.jpg', count: 86, prefix: 'https://d2ey9sqrvkqdfs.cloudfront.net/diH7/' },
      categories: { overall: { name: 'Overall', score: 90, popularity: 10 } },
    },
    {
      id: '2',
      name: 'Hotel B',
      latitude: 1.48624,
      longitude: 103.952889,
      address: 'Hotel B address',
      currency: 'SGD',
      price: 220,
      totalPrice: 220,
      rating: 9.2,
      amenities: { Wifi: false, Pool: true },
      distance: 50,
      searchRank: 1,
      description: 'Hotel B best',
      image_details: { suffix: '.jpg', count: 21, prefix: 'https://d2ey9sqrvkqdfs.cloudfront.net/diH7/' },
      categories: { overall: { name: 'Overall', score: 10, popularity: 1 } },
    },
    {
      id: '3',
      name: 'Hotel C',
      latitude: 1.68624,
      longitude: 103.352889,
      address: 'Hotel C address',
      currency: 'SGD',
      price: 330,
      totalPrice: 330,
      rating: 1.2,
      amenities: { Wifi: false, Pool: false },
      distance: 210,
      searchRank: 1,
      description: 'Hotel C worst',
      image_details: { suffix: '.jpg', count: 86, prefix: 'https://d2ey9sqrvkqdfs.cloudfront.net/diH7/' },
      categories: { overall: { name: 'Overall', score: 50, popularity: 9 } },
    },
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
    // Check Wifi and Pool labels and counts rendered
    cy.contains('Room Facilities').should('be.visible');

    cy.contains('Wifi').should('be.visible');
    cy.contains('(1)').should('exist'); // Count of hotels with Wifi === 1

    cy.contains('Pool').should('be.visible');
    cy.contains('(2)').should('exist'); // Count of hotels with Pool === 2
  });

  it('toggles amenity selection on checkbox click', () => {
    // Initially Wifi is selected; click it to deselect
    cy.get('input[type="checkbox"]')
      .check() // check all (just to confirm)
      .uncheck();

    // Alternatively click just Wifi checkbox
    cy.contains('Wifi').parent().find('input[type="checkbox"]').click();

    // Assert setSelectedAmenities stub was called with array without 'Wifi'
    cy.get('@setSelectedAmenities').should('have.been.called');

    // You can inspect arguments like this:
    cy.get('@setSelectedAmenities').then((stub) => {
      // stub is sinon stub, args[0] is the first argument of first call
      const callArg = (stub as unknown as sinon.SinonStub).getCall(0).args[0];
      expect(callArg).to.not.include('Wifi');
    });
  });

  it('shows "Show More" button if there are more than 6 amenities', () => {
    // This mock only has 2 amenities, so Show More should not exist
    cy.contains('Show More').should('not.exist');
  });
});
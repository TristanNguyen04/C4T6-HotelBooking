import GuestRatingFilter from '../../src/components/filters/GuestRatingFilter';
import { mount } from 'cypress/react';
import type {Hotel} from '../../src/types/hotel';
import React from 'react';
import { moveCursor } from 'readline';

describe('Guest Rating Filter', ()=>{
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
          rating: 4,
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
          rating: 3,
          amenities: {'Wifi': true,'Pool': false,'Gym': false,'Parking': true,'Air Conditioning': true,'Restaurant': false,'Bar': true,'Spa': true},
          distance: 50,
          searchRank: 1,
          description: "Hotel B best",
          image_details: { suffix: ".jpg", count: 21, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
          categories: { overall: { name: "Overall", score: 70, popularity: 1 } },
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
          rating: 3,
          amenities: {'Wifi': true,'Pool': false,'Gym': false,'Parking': true,'Air Conditioning': true,'Restaurant': false,'Bar': true,'Spa': true},
          distance: 50,
          searchRank: 1,
          description: "Hotel B best",
          image_details: { suffix: ".jpg", count: 21, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
          categories: { overall: { name: "Overall", score: 80, popularity: 1 } },
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
          rating: 2,
          amenities: {'Wifi': true,'Pool': false,'Gym': true,'Parking': false,'Air Conditioning': true,'Restaurant': true,'Bar': false,'Spa': false},
          distance: 210,
          searchRank: 1,
          description: "Hotel C worst",
          image_details: { suffix: ".jpg", count: 86, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
          categories: { overall: { name: "Overall", score: 60, popularity: 9 } },
        }
      ];

      let setSelectedGuestRatings: Cypress.Agent<sinon.SinonStub>;
      
      beforeEach(()=>{
        setSelectedGuestRatings = cy.stub().as('setSelectedGuestRatings');
        const defaultProps = {
          hotels: mockHotels,
          selectedGuestRatings: [],
          setSelectedGuestRatings: cy.stub().as('setSelectedGuestRatings'),
        }
        mount(<GuestRatingFilter {...defaultProps}/>);
      });
      it('renders all 4 guest rating options', () => {
        cy.contains('Outstanding').should('exist');
        cy.contains('Excellent').should('exist');
        cy.contains('Very Good').should('exist');
        cy.contains('Good').should('exist');
        cy.contains('Outstanding(1)').should('exist');
        cy.contains('Excellent(1)').should('exist');
        cy.contains('Very Good(1)').should('exist');
        cy.contains('Good(1)').should('exist');
    });

    


 


})
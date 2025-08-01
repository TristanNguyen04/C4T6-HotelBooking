import React from "react";
import { navigateToHotelListing } from "../../../helper/hotelTest";

describe('Sort Guest Rating', ()=>{
    beforeEach(()=>{
        navigateToHotelListing();
    });

    it('Sort Guest Rating from Low to High', ()=>{
        let score = -Infinity;
        cy.get('[data-cy=HotelListings]').each(($card) => {
        cy.wrap($card).within(() => {
            cy.get('[data-cy=rating-text]').then(($span) => {
            if ($span.length > 0) {
                cy.wrap($span).invoke('text').then((text) => {
                    const rating = Number(text.match(/\d+(\.\d+)?(?=\/)/)?.[0]);
                    if (!isNaN(rating)) {
                        cy.log(`Rating: ${rating}`);
                        if (rating >= score) {
                            score = rating;
                        }
                        else {
                            throw new Error('Fail');
                        }
                    }
                });
            }
            else{
                cy.log('No rating-text found in this card, skipping...');
            }
            });
        });
        });
    });

    it('Sort Guest Rating from High to Low',()=>{
        let score = Infinity;
        cy.get('#sort-select').select('Guest Rating (High to Low)');
        cy.wait(1000);
        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=rating-text]').each(($span)=>{
                    cy.wrap($span).invoke('text').then((text)=>{
                        const rating = Number(text.match(/\d+(?=\/)/));
                        cy.log(rating.toString());
                        if(score>=rating){score = rating}
                        else{throw new Error('Fail')}
                    })
                })
            })
        })
    });
})
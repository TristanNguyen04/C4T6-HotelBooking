import { navigateToHotelListing } from "../../helper/hotelTest";
import React from "react";

describe('Component Testing for Guest Rating', ()=>{
    it('Test Guest Rating Count', ()=>{
        navigateToHotelListing();
        const guestRatingMap = new Map();
        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=rating-text]').each(($span)=>{
                    cy.wrap($span).invoke('text').then((text)=>{
                        const rating = text.split(/\d+/)[0];
                        cy.log("rate", rating)
                        if(guestRatingMap.has(rating)){guestRatingMap.set(rating, guestRatingMap.get(rating) + 1)}
                        else{guestRatingMap.set(rating, 1)}
                    })
                })
            })
        }).then(()=>{

            cy.log(JSON.stringify(Object.fromEntries(guestRatingMap.entries())))
        })
        
        cy.get('[data-cy=rating-badge]').each(($badge)=>{
            cy.wrap($badge).within(()=>{
                cy.get('[data-cy=guest-rate]').invoke('text').then((ratingText)=>{
                    const rating = ratingText.trim();
                    cy.get('[data-cy=guest-rating-count]').invoke('text').then((countText)=>{
                        const count = parseInt(countText.replace(/[()]/g, ''));
                        cy.log('count', count);
                        cy.then(()=>{
                            expect(guestRatingMap.get(rating)).to.equal(count);
                        })
                    })
                })
            })
        })

    });
});
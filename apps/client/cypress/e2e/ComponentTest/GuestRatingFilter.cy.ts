import { navigateToHotelListing } from "../../helper/hotelTest";
import React from "react";

describe('Component Testing for Guest Rating', ()=>{
    it('Test Guest Rating Count', ()=>{
        navigateToHotelListing();
        const guestRatingMap = new Map();
        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('rating-text').invoke('text').then((text)=>{
                    if(guestRatingMap.has(text)){guestRatingMap.set(text, guestRatingMap.get(text) + 1)}
                    else{guestRatingMap.set(text, 1)}
                })
            })
        })

        cy.get('guest-rate').each((rate)=>{
            cy.wrap(rate).invoke('text').then((rating)=>{
                cy.get('[data-cy=guest-rating-count]').invoke('text').then((count)=>{
                    const c = parseInt(count.replace(/[()]/g,''));
                    expect(guestRatingMap.get(rating)).equal(c);
                })
            })
        })

    });
});
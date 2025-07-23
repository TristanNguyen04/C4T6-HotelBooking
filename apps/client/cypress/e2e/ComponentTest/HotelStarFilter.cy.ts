import { navigateToHotelListing } from "../../helper/hotelTest";
import React from "react";

describe('Component Testing for Hotel Star Filter', ()=>{
    it('Test Hotel Star Filter Count', ()=>{
        navigateToHotelListing();
        const starMap = new Map();
        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('span[star-rating]').then(($span)=>{
                    cy.wrap($span).invoke('text').then((starRating)=>{
                        const stars = parseInt(starRating.replace(/[()]/g, ''));
                        if(starMap.has(stars)){starMap.set(stars, starMap.get(stars) + 1);}
                        else{starMap.set(stars, 1);}
                    })
                })
            })
        })

        cy.get('[data-cy^="starsCount"]').each(($label)=>{
            cy.wrap($label).within(()=>{
                cy.get('[data.cy=^"hotel-count"]').invoke('text').then((count)=>{
                    const hotelCount = parseInt(count.replace(/[()]/g, ''));
                    expect(count).equal(hotelCount);
                })
            })
        })

    });
});
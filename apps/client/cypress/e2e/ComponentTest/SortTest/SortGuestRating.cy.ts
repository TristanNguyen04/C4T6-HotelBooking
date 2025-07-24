import React from "react";
import { navigateToHotelListing } from "../../../helper/hotelTest";

describe('Sort Guest Rating', ()=>{
    beforeEach(()=>{
        navigateToHotelListing();
    });

    it('Sort Guest Rating from Low to High', ()=>{
        let score = 0;
        cy.get('#sort-select').select('Guest Rating (Low to High)');
        cy.wait(1000);
        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=rating-text]').each(($span)=>{
                    cy.wrap($span).invoke('text').then((text)=>{
                        const rating = Number(text.match(/\d+(?=\/)/));
                        cy.log(rating.toString());
                        if(score<rating){score = rating}
                    })
                })
            })
        })

    });

    it('Sort Guest Rating from High to Low',()=>{
        let score = 0;
        cy.get('#sort-select').select('Guest Rating (High to Low)');
        cy.wait(1000);
        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=rating-text]').each(($span)=>{
                    cy.wrap($span).invoke('text').then((text)=>{
                        const rating = Number(text.match(/\d+(?=\/)/));
                        cy.log(rating.toString());
                        if(score>rating){score = rating}
                    })
                })
            })
        })
    });
})